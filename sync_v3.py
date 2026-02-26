#!/usr/bin/env python3
"""
Definitive sync v3: Use BUILD as ground truth for file boundaries,
SequenceMatcher for build->export mapping.

Strategy:
1. Walk the actual build to find per-file boundaries (matching source content)
2. SequenceMatcher aligns build lines to export lines
3. For each file, collect the export lines that correspond to its build lines
4. Write updated source files
"""

import json
import re
import sys
from pathlib import Path
from difflib import SequenceMatcher

BUILD_FILE = Path("build/A-DMs-guide-to-aevoria.txt")
EXPORT_FILE = Path("build/dmGuideTempPartial.txt")
TOC_FILE = Path("build/dms-guide-toc.json")
BUILD_DIR = Path("build")

DRY_RUN = "--dry-run" in sys.argv
APPLY = "--apply" in sys.argv

# Files removed/merged in export
REMOVED_FILES = {
    "../Season 1/Adventures/Frozen Sick/Frozen_Sick_Stat_Blocks.md",
    "../Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md",
}


def normalize_page_break(content):
    """Replicate build.js normalizePageBreak."""
    normalized = content.rstrip()
    normalized = re.sub(r'((?:\\page|\\\\page)\s*)+$', '', normalized)
    normalized = normalized.rstrip()
    normalized += '\n\n\\page'
    return normalized


def get_toc_structure():
    """Get TOC structure with chapter/subsection info."""
    with open(TOC_FILE, 'r', encoding='utf-8') as f:
        toc = json.load(f)
    
    # Build ordered list of items (files + injected titles)
    items = []  # list of (type, data)
    # type: 'chapter', 'subsection', 'file'
    
    for section in toc.get('sections', []):
        ch = section.get('chapter', '')
        if ch and ch != 'Northreach: Your Starting Point':
            items.append(('chapter', ch))
        
        if 'subsections' in section:
            for sub in section['subsections']:
                title = sub.get('title', '')
                items.append(('subsection', title))
                for rel_path in sub.get('files', []):
                    items.append(('file', rel_path))
        elif 'files' in section:
            for rel_path in section.get('files', []):
                items.append(('file', rel_path))
    
    return items


def find_build_boundaries(build_lines, toc_items):
    """
    Walk through actual build output matching against source file content
    to find exact per-file boundaries.
    Returns: dict rel_path -> (start, end) 0-based inclusive
    """
    results = {}
    build_pos = 0
    
    for item_type, data in toc_items:
        if item_type == 'chapter':
            # Find "# ChapterName" in build starting from build_pos
            target = f'# {data}'
            for i in range(build_pos, min(build_pos + 50, len(build_lines))):
                if build_lines[i].rstrip() == target:
                    build_pos = i + 2  # Skip chapter title + blank
                    break
        
        elif item_type == 'subsection':
            # Find "## SubsectionTitle" 
            target = f'## {data}'
            for i in range(build_pos, min(build_pos + 50, len(build_lines))):
                if build_lines[i].rstrip() == target:
                    build_pos = i + 2  # Skip title + blank
                    break
        
        elif item_type == 'file':
            source_path = (BUILD_DIR / data).resolve()
            if not source_path.exists():
                results[data] = None
                continue
            
            # Read source and normalize
            source_content = source_path.read_text(encoding='utf-8')
            normalized = normalize_page_break(source_content)
            normalized += '\n'  # build.js adds \n after each file
            source_lines = normalized.split('\n')
            
            # The source content should appear in the build starting near build_pos
            # But post-processing may have added waterstain lines or changed blank patterns
            # Find the first non-empty source line in the build
            first_source_line = None
            for sl in source_lines:
                if sl.strip():
                    first_source_line = sl.rstrip()
                    break
            
            if first_source_line is None:
                results[data] = None
                continue
            
            # Search for this line in build (within reasonable range)
            file_start = None
            search_limit = min(build_pos + len(source_lines) + 100, len(build_lines))
            for i in range(build_pos, search_limit):
                if build_lines[i].rstrip() == first_source_line:
                    file_start = i
                    break
            
            if file_start is None:
                # Try wider search
                for i in range(max(0, build_pos - 20), min(build_pos + len(source_lines) + 500, len(build_lines))):
                    if build_lines[i].rstrip() == first_source_line:
                        file_start = i
                        break
            
            if file_start is None:
                print(f"  WARNING: Could not find start of {Path(data).name} in build")
                results[data] = None
                continue
            
            # Now find the end: the last line of the normalized content in the build
            # We know approximately how many lines: len(source_lines) ± some waterstains
            expected_end = file_start + len(source_lines) - 1
            
            # The file should end with \page (from normalizePageBreak)
            # Find the \page that ends this file
            # It should be near expected_end
            file_end = None
            for i in range(max(file_start, expected_end - 100), min(expected_end + 100, len(build_lines))):
                if build_lines[i].rstrip() == '\\page':
                    # Verify: next non-blank line should be a chapter/subsection title or next file's first line
                    # For now, take the first \page near the expected end
                    file_end = i
                    # Include the \page and the blank after it
                    if i + 1 < len(build_lines) and not build_lines[i + 1].strip():
                        file_end = i + 1
                    break
            
            if file_end is None:
                # Last file might not have \page at the very end
                file_end = min(expected_end, len(build_lines) - 1)
            
            results[data] = (file_start, file_end)
            build_pos = file_end + 1
    
    return results


def build_export_mapping(build_lines, export_lines):
    """
    Create build_line -> export_line mapping using SequenceMatcher.
    Returns: dict (build_0based_idx -> export_0based_idx)
    """
    # Normalize for comparison
    b_norm = [l.rstrip() for l in build_lines]
    e_norm = [l.rstrip() for l in export_lines]
    
    print("  Computing alignment (this may take a moment)...")
    sm = SequenceMatcher(None, b_norm, e_norm, autojunk=False)
    
    b2e = {}
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for offset in range(i2 - i1):
                b2e[i1 + offset] = j1 + offset
        elif tag == 'replace':
            # For replaced sections, try to map by relative position
            b_len = i2 - i1
            e_len = j2 - j1
            # Map proportionally
            for bi in range(b_len):
                ei = int(bi * e_len / b_len) if b_len > 0 else 0
                if ei < e_len:
                    b2e[i1 + bi] = j1 + ei
    
    return b2e, sm


def get_export_range_for_file(b2e, sm, b_start, b_end, export_len):
    """
    Given a file's build range, find the corresponding export range.
    Uses the opcodes directly for more precision.
    """
    # Find the export lines that correspond to build lines b_start..b_end
    e_min = None
    e_max = None
    
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        # Does this opcode overlap with our build range?
        overlap_start = max(i1, b_start)
        overlap_end = min(i2, b_end + 1)
        
        if overlap_start >= overlap_end:
            continue  # No overlap
        
        if tag == 'equal':
            # Direct mapping
            e_start = j1 + (overlap_start - i1)
            e_end = j1 + (overlap_end - i1) - 1
            if e_min is None or e_start < e_min:
                e_min = e_start
            if e_max is None or e_end > e_max:
                e_max = e_end
        
        elif tag == 'replace':
            # Proportional mapping
            b_len = i2 - i1
            e_len = j2 - j1
            rel_start = (overlap_start - i1) / b_len if b_len > 0 else 0
            rel_end = (overlap_end - i1) / b_len if b_len > 0 else 1
            e_start = j1 + int(rel_start * e_len)
            e_end = j1 + int(rel_end * e_len) - 1
            if e_min is None or e_start < e_min:
                e_min = e_start
            if e_max is None or e_end > e_max:
                e_max = e_end
        
        elif tag == 'delete':
            # Lines in build but not export - map to surrounding export position
            if e_min is None:
                e_min = j1
            if e_max is None or j1 > e_max:
                e_max = j1
        
        elif tag == 'insert':
            # Lines in export but not build - include them if they fall within range
            if i1 >= b_start and i1 <= b_end + 1:
                if e_min is None or j1 < e_min:
                    e_min = j1
                if e_max is None or j2 - 1 > e_max:
                    e_max = j2 - 1
    
    if e_min is not None and e_max is not None:
        return (e_min, e_max)
    return None


def strip_trailing_build_artifacts(lines):
    """Remove trailing \\page, blanks, chapter/subsection titles."""
    result = list(lines)
    
    # Remove trailing empty
    while result and not result[-1].strip():
        result.pop()
    
    # Remove trailing \page
    if result and result[-1].rstrip() == '\\page':
        result.pop()
    
    # Remove blanks before \page
    while result and not result[-1].strip():
        result.pop()
    
    return result


def write_source(source_path, content_lines, dry_run=False):
    """Write content to source file."""
    new_content = '\n'.join(l.rstrip('\r\n') for l in content_lines)
    if not new_content.endswith('\n'):
        new_content += '\n'
    
    name = source_path.name
    old_content = source_path.read_text(encoding='utf-8') if source_path.exists() else ''
    
    if new_content == old_content:
        return False
    
    old_lc = len(old_content.split('\n'))
    new_lc = len(new_content.split('\n'))
    delta = new_lc - old_lc
    
    if dry_run:
        print(f"    {name}: {old_lc} -> {new_lc} lines ({delta:+d}) [DRY RUN]")
    else:
        source_path.write_text(new_content, encoding='utf-8')
        print(f"    {name}: {old_lc} -> {new_lc} lines ({delta:+d}) WRITTEN")
    return True


def main():
    if not (DRY_RUN or APPLY):
        print("Usage: python sync_v3.py [--dry-run | --apply]")
        return
    
    mode = "DRY RUN" if DRY_RUN else "APPLY"
    print(f"=== Sync Export -> Source v3 ({mode}) ===\n")
    
    build_lines = BUILD_FILE.read_text(encoding='utf-8').split('\n')
    export_lines = EXPORT_FILE.read_text(encoding='utf-8').split('\n')
    print(f"Build: {len(build_lines)}, Export: {len(export_lines)}, Delta: {len(export_lines)-len(build_lines):+d}\n")
    
    # Get TOC structure
    toc_items = get_toc_structure()
    file_items = [(d, ) for t, d in toc_items if t == 'file']
    print(f"TOC: {len(file_items)} files\n")
    
    # Phase 1: Find per-file boundaries in BUILD
    print("Phase 1: Finding file boundaries in build...")
    build_ranges = find_build_boundaries(build_lines, toc_items)
    
    found = sum(1 for v in build_ranges.values() if v is not None)
    print(f"  Found {found}/{len(build_ranges)} files\n")
    
    # Show ranges
    for rel_path, rng in build_ranges.items():
        name = Path(rel_path).name
        if rng:
            s, e = rng
            print(f"  {name}: Build L{s+1}-L{e+1} ({e-s+1} lines)")
        else:
            print(f"  {name}: NOT FOUND")
    
    # Phase 2: Align build <-> export
    print(f"\nPhase 2: Aligning build <-> export...")
    b2e, sm = build_export_mapping(build_lines, export_lines)
    print(f"  Mapped {len(b2e)} build lines to export positions\n")
    
    # Phase 3: Map file build ranges to export ranges
    print("Phase 3: Mapping file ranges to export...\n")
    
    export_ranges = {}
    for rel_path, b_range in build_ranges.items():
        name = Path(rel_path).name
        
        if rel_path in REMOVED_FILES:
            export_ranges[rel_path] = None
            print(f"  SKIP {name} (removed)")
            continue
        
        if b_range is None:
            export_ranges[rel_path] = None
            continue
        
        b_start, b_end = b_range
        e_range = get_export_range_for_file(b2e, sm, b_start, b_end, len(export_lines))
        
        if e_range:
            e_start, e_end = e_range
            e_count = e_end - e_start + 1
            b_count = b_end - b_start + 1
            delta = e_count - b_count
            if delta != 0:
                print(f"  {name}: Export L{e_start+1}-L{e_end+1} ({e_count} lines, {delta:+d})")
            export_ranges[rel_path] = e_range
        else:
            print(f"  {name}: NO EXPORT RANGE FOUND")
            export_ranges[rel_path] = None
    
    # Phase 4: Extract and write
    print(f"\n=== Phase 4: Extracting and writing ===\n")
    
    changes = 0
    for rel_path, e_range in export_ranges.items():
        if e_range is None:
            continue
        
        source_path = (BUILD_DIR / rel_path).resolve()
        if not source_path.exists():
            continue
        
        e_start, e_end = e_range
        section = export_lines[e_start:e_end + 1]
        content = strip_trailing_build_artifacts(section)
        
        if content and write_source(source_path, content, DRY_RUN):
            changes += 1
    
    print(f"\n=== {changes} files {'would be ' if DRY_RUN else ''}updated ===")
    
    # TOC changes
    print(f"\n=== TOC Changes Needed ===")
    print(f"  1. Move Frozen Sick.md into 'Wolves of Welton' subsection")
    print(f"  2. Remove 'Frozen Sick' subsection (stat blocks merged)")
    print(f"  3. Remove 'Peril in Pinebrook' subsection")


if __name__ == '__main__':
    main()
