#!/usr/bin/env python3
"""
Sync Homebrewery export back to source files.

Replays the build process to identify exact file boundaries in the build output,
then uses SequenceMatcher to map those ranges to the export. Extracts the export
content for each changed file and writes it back to the source file.
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
VERBOSE = "--verbose" in sys.argv


def normalize_page_break(content: str) -> str:
    """Replicate build.js normalizePageBreak."""
    normalized = content.rstrip()
    normalized = re.sub(r'((?:\\page|\\\\page)\s*)+$', '', normalized)
    normalized = normalized.rstrip()
    normalized += '\n\n\\page'
    return normalized


def simulate_build():
    """
    Simulate the build process and return:
    - combined: list of lines (the build output)
    - file_ranges: list of (source_path, start_line, end_line) tuples (1-based inclusive)
    - injected_ranges: list of (label, start_line, end_line) for chapter/subsection titles
    """
    with open(TOC_FILE, 'r', encoding='utf-8') as f:
        toc = json.load(f)

    combined_lines = []
    file_ranges = []
    injected_ranges = []

    def add_line(text):
        combined_lines.append(text)

    def current_line():
        return len(combined_lines)  # 0-based index of next line

    # Header: build.js adds various front matter before the sections
    # We'll skip tracking the header precisely since it varies
    # Instead we'll read the actual build output header later

    def process_file(rel_path):
        """Process a single file, applying normalizePageBreak."""
        file_path = BUILD_DIR / rel_path
        if not file_path.exists():
            print(f"  Warning: {file_path} not found")
            return
        content = file_path.read_text(encoding='utf-8')
        content = normalize_page_break(content)
        content += '\n'  # build.js adds \n after each file
        
        lines = content.split('\n')
        # split adds an extra empty string at end if content ends with \n
        # but we want to track all lines including empty ones
        start = current_line() + 1  # 1-based
        for line in lines:
            add_line(line)
        end = current_line()  # 1-based inclusive
        
        source_path = str(file_path.resolve())
        file_ranges.append((rel_path, start, end))

    # Read TOC and simulate build
    for section in toc.get('sections', []):
        chapter = section.get('chapter', '')
        
        # Inject chapter title (build.js does this for all except 'Northreach: Your Starting Point')
        if chapter != 'Northreach: Your Starting Point':
            inj_start = current_line() + 1
            add_line(f'# {chapter}')
            add_line('')
            injected_ranges.append((f'chapter:{chapter}', inj_start, current_line()))

        if 'subsections' in section:
            for sub in section['subsections']:
                title = sub.get('title', '')
                inj_start = current_line() + 1
                add_line(f'## {title}')
                add_line('')
                injected_ranges.append((f'subsection:{title}', inj_start, current_line()))
                
                for rel_path in sub.get('files', []):
                    process_file(rel_path)
        elif 'files' in section:
            for rel_path in section.get('files', []):
                process_file(rel_path)

    return combined_lines, file_ranges, injected_ranges


def find_export_ranges(build_lines, export_lines, file_ranges, injected_ranges):
    """
    Use SequenceMatcher to align build and export, then map file ranges.
    Returns dict: rel_path -> (export_start, export_end) (1-based inclusive)
    """
    # Normalize lines for matching
    def norm(line):
        return line.rstrip()
    
    build_norm = [norm(l) for l in build_lines]
    export_norm = [norm(l) for l in export_lines]
    
    # Build a mapping: build_line_index -> export_line_index
    sm = SequenceMatcher(None, build_norm, export_norm, autojunk=False)
    
    # Create build->export line mapping from matching blocks
    b2e = {}  # build 0-based index -> export 0-based index
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for offset in range(i2 - i1):
                b2e[i1 + offset] = j1 + offset
    
    # For each file range, find corresponding export range
    result = {}
    for rel_path, b_start, b_end in file_ranges:
        # Convert to 0-based
        b_s = b_start - 1
        b_e = b_end - 1
        
        # Find first and last matched export lines
        e_lines = []
        for bi in range(b_s, b_e + 1):
            if bi in b2e:
                e_lines.append(b2e[bi])
        
        if e_lines:
            e_start = min(e_lines) + 1  # back to 1-based
            e_end = max(e_lines) + 1
            result[rel_path] = (e_start, e_end)
        else:
            result[rel_path] = None  # completely changed - need manual review
    
    return result, b2e, sm


def extract_export_section(export_lines, e_start, e_end):
    """Extract lines from export (1-based inclusive to list of strings)."""
    return export_lines[e_start - 1: e_end]


def strip_trailing_page(lines):
    """
    Remove trailing \\page and blank lines (added by normalizePageBreak).
    Returns the content lines without the build-artifact trailing page.
    """
    # Work backwards from end
    result = list(lines)
    
    # Remove trailing empty strings/whitespace
    while result and not result[-1].strip():
        result.pop()
    
    # Remove trailing \page
    if result and result[-1].strip() == '\\page':
        result.pop()
    
    # Remove trailing empty lines before \page
    while result and not result[-1].strip():
        result.pop()
    
    return result


def main():
    print("=== Sync Export → Source Files ===\n")
    
    if DRY_RUN:
        print("DRY RUN MODE - no files will be written\n")
    
    # Read actual build and export
    build_actual = BUILD_FILE.read_text(encoding='utf-8').split('\n')
    export_actual = EXPORT_FILE.read_text(encoding='utf-8').split('\n')
    print(f"Build: {len(build_actual)} lines")
    print(f"Export: {len(export_actual)} lines")
    print(f"Delta: {len(export_actual) - len(build_actual):+d}\n")
    
    # Simulate build to get file ranges
    print("Simulating build process...")
    sim_lines, file_ranges, injected_ranges = simulate_build()
    print(f"  Simulated: {len(sim_lines)} lines, {len(file_ranges)} files, {len(injected_ranges)} injected sections")
    
    # The simulated build won't match the actual build exactly because:
    # 1. The actual build has a header (cover, TOC, metadata)
    # 2. The actual build has post-processing (waterstains, blank line normalization)
    # So we use the ACTUAL build for alignment, but use the simulation to know file order
    
    # Find where the simulated content starts in the actual build
    # Look for the first chapter title as anchor
    first_chapter = None
    first_sim_line = 0
    for label, start, end in injected_ranges:
        if label.startswith('chapter:'):
            first_chapter = label.split(':', 1)[1]
            first_sim_line = start - 1  # 0-based
            break
    
    if first_chapter is None:
        print("ERROR: No chapters found in TOC!")
        return
    
    # Find this chapter title in actual build
    chapter_line = f'# {first_chapter}'
    build_offset = None
    for i, line in enumerate(build_actual):
        if line.rstrip() == chapter_line:
            build_offset = i - first_sim_line
            break
    
    if build_offset is None:
        print(f"ERROR: Could not find '{chapter_line}' in build output!")
        return
    
    print(f"  Build offset: {build_offset} (header lines before first chapter)")
    
    # Adjust file ranges to actual build line numbers
    adjusted_ranges = []
    for rel_path, sim_start, sim_end in file_ranges:
        actual_start = sim_start + build_offset  # already 1-based
        actual_end = sim_end + build_offset
        adjusted_ranges.append((rel_path, actual_start, actual_end))
    
    # Verify adjustment by checking a few file starts
    print("\n  Verifying alignment:")
    for rel_path, a_start, a_end in adjusted_ranges[:3]:
        file_path = BUILD_DIR / rel_path
        if file_path.exists():
            src_first = file_path.read_text(encoding='utf-8').split('\n')[0].rstrip()
            build_first = build_actual[a_start - 1].rstrip() if a_start - 1 < len(build_actual) else '???'
            match = '✓' if src_first == build_first else '✗'
            print(f"    {match} {Path(rel_path).name}: src='{src_first[:60]}' build='{build_first[:60]}'")
    
    # Also check injected ranges
    for label, sim_start, sim_end in injected_ranges[:2]:
        actual_start = sim_start + build_offset
        expected = sim_lines[sim_start - 1]
        actual = build_actual[actual_start - 1].rstrip() if actual_start - 1 < len(build_actual) else '???'
        match = '✓' if expected == actual else '✗'
        print(f"    {match} {label}: expected='{expected[:60]}' actual='{actual[:60]}'")
    
    # Now align build with export
    print("\nAligning build ↔ export...")
    export_ranges, b2e, sm = find_export_ranges(build_actual, export_actual, adjusted_ranges, injected_ranges)
    
    # Find files with differences
    print("\n=== Files with Differences ===\n")
    changed_files = []
    
    for rel_path, b_start, b_end in adjusted_ranges:
        b_count = b_end - b_start + 1
        
        if rel_path not in export_ranges or export_ranges[rel_path] is None:
            print(f"  {Path(rel_path).name}: NO EXPORT MATCH FOUND - needs manual review")
            continue
        
        e_start, e_end = export_ranges[rel_path]
        e_count = e_end - e_start + 1
        
        if b_count != e_count:
            delta = e_count - b_count
            print(f"  {Path(rel_path).name}: build={b_count}, export={e_count}, delta={delta:+d}")
            print(f"    Build: L{b_start}-{b_end}, Export: L{e_start}-{e_end}")
            changed_files.append((rel_path, b_start, b_end, e_start, e_end))
        else:
            # Same line count but possibly content differences
            build_section = build_actual[b_start-1:b_end]
            export_section = export_actual[e_start-1:e_end]
            diffs = sum(1 for a, b in zip(build_section, export_section) if a.rstrip() != b.rstrip())
            if diffs > 0:
                print(f"  {Path(rel_path).name}: same line count ({b_count}) but {diffs} content diffs")
                print(f"    Build: L{b_start}-{b_end}, Export: L{e_start}-{e_end}")
                changed_files.append((rel_path, b_start, b_end, e_start, e_end))
    
    if not changed_files:
        print("  No differences found!")
        return
    
    # Extract and write updated source files
    print(f"\n=== Updating {len(changed_files)} Source Files ===\n")
    
    for rel_path, b_start, b_end, e_start, e_end in changed_files:
        file_path = BUILD_DIR / rel_path
        source_path = file_path.resolve()
        name = Path(rel_path).name
        
        print(f"--- {name} ---")
        print(f"  Source: {source_path}")
        print(f"  Export lines: L{e_start}-{e_end} ({e_end - e_start + 1} lines)")
        
        # Extract export content
        export_section = export_actual[e_start-1:e_end]
        
        # Strip the trailing \page (build artifact from normalizePageBreak)
        content_lines = strip_trailing_page(export_section)
        
        # Reconstruct as string
        new_content = '\n'.join(content_lines) + '\n'
        
        # Read current source for comparison
        if source_path.exists():
            old_content = source_path.read_text(encoding='utf-8')
            old_lines = old_content.split('\n')
            new_lines = new_content.split('\n')
            print(f"  Old: {len(old_lines)} lines → New: {len(new_lines)} lines (delta: {len(new_lines)-len(old_lines):+d})")
        else:
            print(f"  WARNING: Source file not found!")
            continue
        
        if DRY_RUN:
            print(f"  [DRY RUN] Would write {len(new_content)} bytes")
            # Show first diff
            for i, (old, new) in enumerate(zip(old_lines, new_lines)):
                if old.rstrip() != new.rstrip():
                    print(f"  First diff at line {i+1}:")
                    print(f"    old: {old.rstrip()[:80]}")
                    print(f"    new: {new.rstrip()[:80]}")
                    break
        else:
            source_path.write_text(new_content, encoding='utf-8')
            print(f"  ✓ Written ({len(new_content)} bytes)")
        print()
    
    print("=== Done ===")
    if DRY_RUN:
        print("(Dry run - no files were modified. Remove --dry-run to apply.)")


if __name__ == '__main__':
    main()
