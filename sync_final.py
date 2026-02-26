#!/usr/bin/env python3
"""
Definitive sync: Export -> Source files.

Uses anchor-based search for most files, with hard-coded overrides
for Adventures section where restructuring occurred.
"""

import json
import re
import sys
from pathlib import Path

BUILD_FILE = Path("build/A-DMs-guide-to-aevoria.txt")
EXPORT_FILE = Path("build/dmGuideTempPartial.txt")
TOC_FILE = Path("build/dms-guide-toc.json")
BUILD_DIR = Path("build")

DRY_RUN = "--dry-run" in sys.argv
APPLY = "--apply" in sys.argv

# Files that were removed/merged in the Homebrewery export
REMOVED_FILES = {
    "../Season 1/Adventures/Frozen Sick/Frozen_Sick_Stat_Blocks.md",  # merged into Frozen Sick.md
    "../Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md",  # removed
}


def get_toc_files():
    """Get ordered list of (rel_path, chapter, subsection) from TOC."""
    with open(TOC_FILE, 'r', encoding='utf-8') as f:
        toc = json.load(f)
    files = []
    for section in toc.get('sections', []):
        ch = section.get('chapter', '')
        if 'subsections' in section:
            for sub in section['subsections']:
                title = sub.get('title', '')
                for rel_path in sub.get('files', []):
                    files.append((rel_path, ch, title))
        elif 'files' in section:
            for rel_path in section.get('files', []):
                files.append((rel_path, ch, ''))
    return files


def find_line(lines, text, start=0):
    """Find first line matching text (stripped), starting from position."""
    for i in range(start, len(lines)):
        if lines[i].rstrip() == text:
            return i
    return None


def find_first_nonempty_after(lines, pos):
    """Find first non-empty line at or after pos."""
    for i in range(pos, len(lines)):
        if lines[i].strip():
            return i
    return None


def get_anchor(source_path, count=3):
    """Get first `count` non-empty lines from source as search anchor."""
    content = source_path.read_text(encoding='utf-8')
    result = []
    for line in content.split('\n'):
        if line.strip():
            result.append(line.rstrip())
            if len(result) >= count:
                break
    return result


def find_anchor(lines, anchors, start=0, end=None):
    """Find position of anchor (first non-empty line matching) in lines."""
    end = end or len(lines)
    first = anchors[0] if anchors else None
    if not first:
        return None
    for i in range(start, end):
        if lines[i].rstrip() == first:
            return i
    return None


def strip_trailing_page(content_lines):
    """Remove trailing \\page and surrounding blanks (normalizePageBreak artifact)."""
    lines = list(content_lines)
    # Remove trailing empty
    while lines and not lines[-1].strip():
        lines.pop()
    # Remove \page
    if lines and lines[-1].rstrip() == '\\page':
        lines.pop()
    # Remove blanks before \page
    while lines and not lines[-1].strip():
        lines.pop()
    return lines


def extract_and_strip(export_lines, start, end):
    """Extract export[start:end], strip trailing build artifacts."""
    section = [l.rstrip('\r\n') for l in export_lines[start:end]]
    section = strip_trailing_page(section)
    return section


def write_source(source_path, content_lines, dry_run=False):
    """Write content to source file."""
    new_content = '\n'.join(content_lines)
    if not new_content.endswith('\n'):
        new_content += '\n'
    
    name = source_path.name
    old_content = source_path.read_text(encoding='utf-8') if source_path.exists() else ''
    
    if new_content == old_content:
        print(f"    {name}: already up to date")
        return False
    
    old_lc = len(old_content.split('\n'))
    new_lc = len(new_content.split('\n'))
    delta = new_lc - old_lc
    
    if dry_run:
        print(f"    {name}: {old_lc} -> {new_lc} lines (delta {delta:+d}) [DRY RUN]")
    else:
        source_path.write_text(new_content, encoding='utf-8')
        print(f"    {name}: {old_lc} -> {new_lc} lines (delta {delta:+d}) WRITTEN")
    return True


def main():
    if not (DRY_RUN or APPLY):
        print("Usage: python sync_final.py [--dry-run | --apply]")
        return
    
    mode = "DRY RUN" if DRY_RUN else "APPLY"
    print(f"=== Sync Export -> Source ({mode}) ===\n")
    
    build = BUILD_FILE.read_text(encoding='utf-8').split('\n')
    export = EXPORT_FILE.read_text(encoding='utf-8').split('\n')
    print(f"Build: {len(build)} lines, Export: {len(export)} lines, Delta: {len(export)-len(build):+d}\n")
    
    toc_files = get_toc_files()
    
    # === Phase 1: Find key markers in export ===
    print("Finding markers in export...")
    
    # Subsection markers (injected by build.js)
    markers = {}
    for text in [
        '## Opening Adventures',
        '## Wolves of Welton',
        '## Frozen Sick',  # May not exist
        '## The Wild Sheep Chase',
        '## Peril in Pinebrook',  # May not exist
        '## Temple of the Dragonknights',
        '# Adventures',
        '# World Secrets',
        '# Appendix: Reference Materials',
        '# Using This Guide',
        '# Quick Start',
        '# Campaign Overview',
        '# DM Resources',
    ]:
        pos = find_line(export, text)
        markers[text] = pos
        found = f"L{pos+1}" if pos is not None else "NOT FOUND"
        if 'Frozen Sick' in text or 'Peril' in text:
            print(f"  {text}: {found}")
    
    # Find # Frozen Sick (file heading, not subsection)
    frozen_sick_heading = find_line(export, '# Frozen Sick')
    markers['# Frozen Sick (file)'] = frozen_sick_heading
    print(f"  # Frozen Sick (file heading): L{frozen_sick_heading+1}" if frozen_sick_heading else "  # Frozen Sick (file heading): NOT FOUND")
    
    print()
    
    # === Phase 2: Determine file boundaries in export ===
    
    # For Adventures section, use known markers
    # For everything else, use anchor search
    
    file_export_ranges = {}  # rel_path -> (start_0based, end_0based_exclusive)
    
    # Process files in TOC order, tracking search position
    search_pos = 0
    
    for idx, (rel_path, chapter, subsection) in enumerate(toc_files):
        name = Path(rel_path).name
        source_path = (BUILD_DIR / rel_path).resolve()
        
        # Skip removed files
        if rel_path in REMOVED_FILES:
            file_export_ranges[rel_path] = None
            print(f"  SKIP {name} (removed from export)")
            continue
        
        if not source_path.exists():
            file_export_ranges[rel_path] = None
            print(f"  SKIP {name} (source not found)")
            continue
        
        # === Special handling for Adventures files ===
        
        if name == '5E_Wolves_Of_Welton.md':
            # Starts after "## Wolves of Welton" + blank
            ww_marker = markers.get('## Wolves of Welton')
            if ww_marker is not None:
                start = find_first_nonempty_after(export, ww_marker + 1)
                # Ends before "# Frozen Sick" (file heading)
                end = frozen_sick_heading if frozen_sick_heading else None
                if start and end:
                    file_export_ranges[rel_path] = (start, end)
                    print(f"  {name}: export L{start+1}-L{end} (Adventures override)")
                    search_pos = end
                    continue
        
        elif name == 'Frozen Sick.md':
            # Starts at "# Frozen Sick" (file heading)
            if frozen_sick_heading is not None:
                start = frozen_sick_heading
                # Ends before "## The Wild Sheep Chase"
                wsc_marker = markers.get('## The Wild Sheep Chase')
                end = wsc_marker if wsc_marker else None
                if end:
                    file_export_ranges[rel_path] = (start, end)
                    print(f"  {name}: export L{start+1}-L{end} (Adventures override)")
                    search_pos = end
                    continue
        
        elif name == '892902-The_Wild_Sheep_Chase_V2.md':
            wsc_marker = markers.get('## The Wild Sheep Chase')
            if wsc_marker is not None:
                start = find_first_nonempty_after(export, wsc_marker + 1)
                # Ends before "## Temple of the Dragonknights"
                temple_marker = markers.get('## Temple of the Dragonknights')
                end = temple_marker if temple_marker else None
                if start and end:
                    file_export_ranges[rel_path] = (start, end)
                    print(f"  {name}: export L{start+1}-L{end} (Adventures override)")
                    search_pos = end
                    continue
        
        elif name == 'Temple_of_the_Dragonknights.md':
            temple_marker = markers.get('## Temple of the Dragonknights')
            if temple_marker is not None:
                start = find_first_nonempty_after(export, temple_marker + 1)
                # Ends before "# World Secrets"
                ws_marker = markers.get('# World Secrets')
                end = ws_marker if ws_marker else None
                if start and end:
                    file_export_ranges[rel_path] = (start, end)
                    print(f"  {name}: export L{start+1}-L{end} (Adventures override)")
                    search_pos = end
                    continue
        
        # === Default: anchor-based search ===
        
        anchors = get_anchor(source_path, 3)
        
        # Determine search region: from current position to next file's likely position
        # Use a generous search window
        next_file_start = None
        for j in range(idx + 1, min(idx + 3, len(toc_files))):
            next_rel = toc_files[j][0]
            if next_rel in REMOVED_FILES:
                continue
            next_source = (BUILD_DIR / next_rel).resolve()
            if next_source.exists():
                next_anchors = get_anchor(next_source, 1)
                next_pos = find_anchor(export, next_anchors, search_pos + 100)
                if next_pos:
                    next_file_start = next_pos
                    break
        
        # Also check for chapter/subsection titles as boundaries
        for ch_title in ['# Adventures', '# World Secrets', '# Appendix: Reference Materials']:
            ch_pos = markers.get(ch_title)
            if ch_pos and ch_pos > search_pos and (next_file_start is None or ch_pos < next_file_start):
                next_file_start = ch_pos
        
        # Find this file's anchor
        pos = find_anchor(export, anchors, search_pos)
        
        if pos is not None:
            start = pos
            end = next_file_start if next_file_start else len(export)
            file_export_ranges[rel_path] = (start, end)
            search_pos = start + 1
        else:
            file_export_ranges[rel_path] = None
            print(f"  WARNING: {name} anchor not found in export!")
    
    # === Phase 3: Extract and write ===
    print(f"\n=== Extracting and writing ===\n")
    
    changes = 0
    for rel_path, chapter, subsection in toc_files:
        name = Path(rel_path).name
        source_path = (BUILD_DIR / rel_path).resolve()
        
        if rel_path in REMOVED_FILES:
            continue
        
        ranges = file_export_ranges.get(rel_path)
        if ranges is None:
            continue
        
        start, end = ranges
        content = extract_and_strip(export, start, end)
        
        if content:
            if write_source(source_path, content, DRY_RUN):
                changes += 1
    
    # === Phase 4: TOC update summary ===
    print(f"\n=== TOC Changes Needed ===")
    print(f"  1. Remove 'Frozen Sick' subsection (stat blocks merged into Frozen Sick.md)")
    print(f"  2. Move Frozen Sick.md into 'Wolves of Welton' subsection")
    print(f"  3. Remove 'Peril in Pinebrook' subsection (content removed from export)")
    
    print(f"\n=== Summary: {changes} files {'would be ' if DRY_RUN else ''}updated ===")


if __name__ == '__main__':
    main()
