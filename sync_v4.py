#!/usr/bin/env python3
"""
Definitive sync v4: Find file boundaries in BUILD using file order,
then SequenceMatcher for build->export mapping.

Key insight: file boundaries in the BUILD are reliable because build content
matches source exactly. We find each file's START, then each file ends
where the next item (file or chapter/subsection title) begins.
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

REMOVED_FILES = {
    "../Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md",
}

# Files whose content was merged INTO another file (map: merged_file -> target_file)
MERGED_INTO = {
    "../Season 1/Adventures/Frozen Sick/Frozen_Sick_Stat_Blocks.md": "../Season 1/Adventures/Frozen Sick/Frozen Sick.md",
}

# Files requiring explicit export anchors (where b2e mapping fails)
# {rel_path: anchor_text_to_search_in_export}
EXPORT_ANCHORS = {
    "../Season 1/Adventures/Frozen Sick/Frozen Sick.md": "# Frozen Sick",
}


def normalize_page_break(content):
    normalized = content.rstrip()
    normalized = re.sub(r'((?:\\page|\\\\page)\s*)+$', '', normalized)
    normalized = normalized.rstrip()
    normalized += '\n\n\\page'
    return normalized


def get_toc_items():
    """Get ordered list of (type, data) items representing the build structure."""
    with open(TOC_FILE, 'r', encoding='utf-8') as f:
        toc = json.load(f)
    
    items = []
    for section in toc.get('sections', []):
        ch = section.get('chapter', '')
        if ch and ch != 'Northreach: Your Starting Point':
            items.append(('chapter', f'# {ch}'))
        if 'subsections' in section:
            for sub in section['subsections']:
                title = sub.get('title', '')
                items.append(('subsection', f'## {title}'))
                for rel_path in sub.get('files', []):
                    items.append(('file', rel_path))
        elif 'files' in section:
            for rel_path in section.get('files', []):
                items.append(('file', rel_path))
    return items


def find_items_in_build(build_lines, toc_items):
    """
    Find the position of each TOC item in the build output.
    For chapters/subsections: find the injected title line.
    For files: find the first non-empty source line.
    Returns: list of (type, data, build_start_0based)
    """
    positions = []
    search_from = 0
    
    # Track expected position based on source file sizes
    expected_pos = search_from
    
    for item_type, data in toc_items:
        if item_type in ('chapter', 'subsection'):
            # Chapter/subsection titles are unique - search widely
            found = None
            for i in range(search_from, len(build_lines)):
                if build_lines[i].rstrip() == data:
                    found = i
                    break
            if found is not None:
                positions.append((item_type, data, found))
                search_from = found + 2  # Skip past title + blank line
                expected_pos = search_from
            else:
                positions.append((item_type, data, None))
        
        elif item_type == 'file':
            source_path = (BUILD_DIR / data).resolve()
            if not source_path.exists():
                positions.append(('file', data, None))
                continue
            
            # Get first few non-empty lines of source (for multi-line matching)
            content = source_path.read_text(encoding='utf-8')
            source_lines = content.split('\n')
            source_lines_count = len(source_lines)
            first_nonempty = []
            for line in source_lines:
                if line.strip():
                    first_nonempty.append(line.rstrip())
                    if len(first_nonempty) >= 3:
                        break
            
            if not first_nonempty:
                positions.append(('file', data, None))
                expected_pos += source_lines_count + 50
                continue
            
            first_line = first_nonempty[0]
            
            # Search entire remaining build (items are ordered, so search_from guarantees no backtrack)
            found = None
            for i in range(search_from, len(build_lines)):
                if build_lines[i].rstrip() == first_line:
                    # For non-unique first lines (like {{note), verify with additional lines
                    if first_line in ('{{note', '{{descriptive', '{{wide', '{{quote'):
                        # Check next non-empty lines match too
                        match = True
                        build_idx = i + 1
                        check_idx = 1
                        while check_idx < len(first_nonempty) and build_idx < len(build_lines):
                            if build_lines[build_idx].strip():
                                if build_lines[build_idx].rstrip() != first_nonempty[check_idx]:
                                    match = False
                                    break
                                check_idx += 1
                            build_idx += 1
                        if not match:
                            continue  # Try next occurrence
                    found = i
                    break
            
            if found is not None:
                positions.append(('file', data, found))
                # Advance search_from past this file's content
                # Use 90% of source lines to account for normalizePageBreak shrinkage
                search_from = found + max(int(source_lines_count * 0.9), 1)
                expected_pos = search_from + 50
            else:
                positions.append(('file', data, None))
                expected_pos += source_lines_count + 50
                print(f"  WARNING: {Path(data).name} not found in build (search from L{search_from+1})")
    
    return positions


def compute_file_ranges(positions, build_len):
    """
    Compute (start, end) ranges for each file. 
    A file starts at its position and ends just before the next item's position.
    """
    file_ranges = {}
    
    for idx, (item_type, data, pos) in enumerate(positions):
        if item_type != 'file' or pos is None:
            continue
        
        # Find next item's position
        next_pos = build_len
        for j in range(idx + 1, len(positions)):
            if positions[j][2] is not None:
                next_pos = positions[j][2]
                break
        
        # File range: from its start to just before the next item
        file_ranges[data] = (pos, next_pos - 1)
    
    return file_ranges


def strip_trailing_artifacts(lines, known_titles):
    """Remove trailing chapter/subsection titles, \\page, and blanks."""
    result = list(lines)
    
    # First strip build-generated watercolors from anywhere in the content
    result = [l for l in result if not l.strip().startswith('{{watercolor')]
    
    changed = True
    while changed:
        changed = False
        # Remove trailing empty lines
        while result and not result[-1].strip():
            result.pop()
            changed = True
        
        if not result:
            break
        
        last = result[-1].rstrip()
        
        # Remove known chapter/subsection titles
        if last in known_titles:
            result.pop()
            changed = True
            continue
        
        # Remove \page (normalizePageBreak artifact)
        if last == '\\page':
            result.pop()
            changed = True
            continue
    
    return result


def main():
    if not (DRY_RUN or APPLY):
        print("Usage: python sync_v4.py [--dry-run | --apply]")
        return
    
    mode = "DRY RUN" if DRY_RUN else "APPLY"
    print(f"=== Sync Export -> Source v4 ({mode}) ===\n")
    
    build_lines = BUILD_FILE.read_text(encoding='utf-8').split('\n')
    export_lines = EXPORT_FILE.read_text(encoding='utf-8').split('\n')
    print(f"Build: {len(build_lines)}, Export: {len(export_lines)}, Delta: {len(export_lines)-len(build_lines):+d}\n")
    
    # Get TOC items
    toc_items = get_toc_items()
    
    # Collect known titles for stripping
    known_titles = set()
    for t, d in toc_items:
        if t in ('chapter', 'subsection'):
            known_titles.add(d)
    
    # Phase 1: Find positions in BUILD
    print("Phase 1: Finding positions in build...")
    positions = find_items_in_build(build_lines, toc_items)
    
    # Compute file ranges
    file_ranges = compute_file_ranges(positions, len(build_lines))
    
    # Show file ranges
    for rel_path, (s, e) in file_ranges.items():
        name = Path(rel_path).name
        source = (BUILD_DIR / rel_path).resolve()
        src_lines = len(source.read_text(encoding='utf-8').split('\n')) if source.exists() else 0
        build_lines_count = e - s + 1
        print(f"  {name}: Build L{s+1}-L{e+1} ({build_lines_count} lines, source={src_lines})")
    
    # Phase 2: SequenceMatcher alignment
    print(f"\nPhase 2: Aligning build <-> export...")
    b_norm = [l.rstrip() for l in build_lines]
    e_norm = [l.rstrip() for l in export_lines]
    
    sm = SequenceMatcher(None, b_norm, e_norm, autojunk=False)
    opcodes = sm.get_opcodes()
    
    # Build b2e mapping
    b2e = {}
    for tag, i1, i2, j1, j2 in opcodes:
        if tag == 'equal':
            for offset in range(i2 - i1):
                b2e[i1 + offset] = j1 + offset
    
    mapped = len(b2e)
    print(f"  {mapped}/{len(build_lines)} build lines mapped to export\n")
    
    # Phase 3: Sequential export range assignment
    # Keep ALL files (including removed) in ordering so removed files act as separators
    print("Phase 3: Mapping to export ranges...\n")
    
    # Build ordered list of ALL files EXCEPT merged files
    # Merged files are excluded so their gap is absorbed by the target file
    ordered_files = []
    for rel_path, (b_start, b_end) in file_ranges.items():
        if rel_path in MERGED_INTO:
            print(f"  MERGED {Path(rel_path).name} -> {Path(MERGED_INTO[rel_path]).name}")
            continue
        ordered_files.append((rel_path, b_start, b_end))
    ordered_files.sort(key=lambda x: x[1])
    
    # Find export START for each file using b2e mapping
    export_starts = {}
    for rel_path, b_start, b_end in ordered_files:
        e_start = None
        for bi in range(b_start, b_end + 1):
            if bi in b2e:
                e_start = b2e[bi]
                break
        export_starts[rel_path] = e_start
    
    # Apply explicit export anchors for files where b2e mapping is unreliable
    for rel_path, anchor in EXPORT_ANCHORS.items():
        if rel_path not in export_starts or export_starts[rel_path] is None:
            continue
        # Search export for the anchor text
        for i in range(len(export_lines)):
            if export_lines[i].strip() == anchor:
                old_start = export_starts[rel_path]
                export_starts[rel_path] = i
                print(f"  ANCHOR {Path(rel_path).name}: E{old_start+1} -> E{i+1} ('{anchor}')")
                break
    
    # Validate export starts: for files with a H1 heading, verify the heading
    # appears near the computed start. If not, search the export for it and
    # backtrack to find the actual file start.
    for rel_path, b_start, b_end in ordered_files:
        if rel_path in REMOVED_FILES:
            continue
        source_path = (BUILD_DIR / rel_path).resolve()
        if not source_path.exists():
            continue
        content = source_path.read_text(encoding='utf-8')
        source_lines_list = content.split('\n')
        
        # Find the file's H1 heading (# Title) — skip generic/short headings
        h1 = None
        h1_line_idx = None
        for idx_l, line in enumerate(source_lines_list):
            stripped = line.strip()
            if stripped.startswith('# ') and len(stripped) > 10:
                h1 = stripped
                h1_line_idx = idx_l
                break
        if h1 is None:
            continue
        
        # Get first non-empty source lines for matching
        first_nonempty = []
        for line in source_lines_list:
            if line.strip():
                first_nonempty.append(line.rstrip())
                if len(first_nonempty) >= 3:
                    break
        
        e_start = export_starts[rel_path]
        if e_start is None:
            continue
        
        # Check if the H1 heading is near the computed export start
        # "Near" means within the file's expected content range
        search_range = max(len(source_lines_list) + 200, 500)
        found_near = False
        for i in range(e_start, min(e_start + search_range, len(export_lines))):
            if export_lines[i].strip() == h1:
                found_near = True
                break
        
        if found_near:
            continue  # b2e start is correct, H1 found within range
        
        # H1 not near computed start — search more broadly
        prev_start = e_start
        next_start = len(export_lines)
        idx_in_ordered = next(j for j, (rp, bs, be) in enumerate(ordered_files) if rp == rel_path)
        for j in range(idx_in_ordered + 1, len(ordered_files)):
            ns = export_starts[ordered_files[j][0]]
            if ns is not None:
                next_start = ns + 500
                break
        
        h1_pos = None
        for i in range(max(0, prev_start - 100), min(next_start, len(export_lines))):
            if export_lines[i].strip() == h1:
                h1_pos = i
                break
        
        if h1_pos is None:
            continue  # Can't find H1, keep b2e start
        
        # Found H1 — now backtrack to find the file's actual start
        # The file start is typically before the H1 ({{note block, etc.)
        # Search backward for the first source line
        actual_start = h1_pos  # Default to H1 position
        if first_nonempty and first_nonempty[0] != h1:
            # File doesn't start with H1 — search backward for file's first line
            search_back_limit = max(0, h1_pos - 100)
            for i in range(h1_pos - 1, search_back_limit - 1, -1):
                if export_lines[i].rstrip() == first_nonempty[0]:
                    # Verify with multi-line match if first line is non-unique
                    if first_nonempty[0] in ('{{note', '{{descriptive', '{{wide', '{{quote'):
                        match = True
                        ei = i + 1
                        ci = 1
                        while ci < len(first_nonempty) and ei < h1_pos:
                            if export_lines[ei].strip():
                                if export_lines[ei].rstrip() != first_nonempty[ci]:
                                    match = False
                                    break
                                ci += 1
                            ei += 1
                        if not match:
                            continue
                    actual_start = i
                    break
        
        # Don't go before the previous file's export start
        prev_e = None
        for j in range(idx_in_ordered - 1, -1, -1):
            pe = export_starts[ordered_files[j][0]]
            if pe is not None:
                prev_e = pe
                break
        if prev_e is not None and actual_start < prev_e:
            actual_start = h1_pos  # Fall back to H1 position
        
        if actual_start != e_start:
            print(f"  CORRECTED {Path(rel_path).name} export start: E{e_start+1} -> E{actual_start+1} (found '{h1}' at E{h1_pos+1})"  )
            export_starts[rel_path] = actual_start
    
    # Fill in missing export starts by interpolation
    for idx, (rel_path, b_start, b_end) in enumerate(ordered_files):
        if export_starts[rel_path] is not None:
            continue
        # Find previous file's last mapped export position
        prev_end = None
        for j in range(idx - 1, -1, -1):
            prev_path = ordered_files[j][0]
            if export_starts[prev_path] is not None:
                prev_b_start, prev_b_end = file_ranges[prev_path]
                for bi in range(prev_b_end, prev_b_start - 1, -1):
                    if bi in b2e:
                        prev_end = b2e[bi]
                        break
                if prev_end is not None:
                    break
        if prev_end is not None:
            export_starts[rel_path] = prev_end + 1
        else:
            export_starts[rel_path] = 0
    
    # Compute export ranges: each file runs from its start to next file's start - 1
    file_export_content = {}
    
    for idx, (rel_path, b_start, b_end) in enumerate(ordered_files):
        name = Path(rel_path).name
        is_removed = rel_path in REMOVED_FILES
        e_start = export_starts[rel_path]
        
        if e_start is None:
            if is_removed:
                print(f"  SKIP {name} (removed from export)")
            else:
                print(f"  {name}: NO EXPORT CONTENT FOUND")
            continue
        
        # Find next file's export start
        e_end = len(export_lines)
        for j in range(idx + 1, len(ordered_files)):
            next_e = export_starts[ordered_files[j][0]]
            if next_e is not None:
                e_end = next_e
                break
        
        if is_removed:
            print(f"  SKIP {name} (removed, export gap L{e_start+1}-L{e_end})")
            continue
        
        # Extract export content
        raw_section = export_lines[e_start:e_end]
        clean_section = strip_trailing_artifacts(raw_section, known_titles)
        
        source_path = (BUILD_DIR / rel_path).resolve()
        src_lines = len(source_path.read_text(encoding='utf-8').split('\n')) if source_path.exists() else 0
        e_count = len(clean_section)
        delta = e_count - src_lines
        
        print(f"  {name}: Export L{e_start+1}-L{e_end} -> {e_count} clean lines ({delta:+d})")
        file_export_content[rel_path] = clean_section
    
    # Phase 4: Write source files
    print(f"\n=== Phase 4: Writing ===\n")
    
    changes = 0
    for rel_path, content_lines in file_export_content.items():
        source_path = (BUILD_DIR / rel_path).resolve()
        if not source_path.exists():
            continue
        
        new_content = '\n'.join(l.rstrip('\r\n') for l in content_lines)
        if not new_content.endswith('\n'):
            new_content += '\n'
        
        old_content = source_path.read_text(encoding='utf-8')
        if new_content == old_content:
            continue
        
        old_lc = len(old_content.split('\n'))
        new_lc = len(new_content.split('\n'))
        delta = new_lc - old_lc
        name = source_path.name
        
        if DRY_RUN:
            print(f"  {name}: {old_lc} -> {new_lc} ({delta:+d}) [DRY RUN]")
        else:
            source_path.write_text(new_content, encoding='utf-8')
            print(f"  {name}: {old_lc} -> {new_lc} ({delta:+d}) WRITTEN")
        changes += 1
    
    print(f"\n=== {changes} files {'would change' if DRY_RUN else 'updated'} ===")
    
    print(f"\n=== Required TOC changes ===")
    print(f"  1. Move Frozen Sick.md from 'Frozen Sick' to 'Wolves of Welton' subsection")
    print(f"  2. Remove 'Frozen Sick' subsection entirely")
    print(f"  3. Remove 'Peril in Pinebrook' subsection entirely")


if __name__ == '__main__':
    main()
