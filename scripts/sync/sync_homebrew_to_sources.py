#!/usr/bin/env python3
"""
sync_homebrew_to_sources.py

Syncs changes from Homebrewery-edited combined file (dmGuideTempPartial.txt)
back to individual source markdown files.

This script:
1. Reads the TOC to understand file assembly order
2. Reads the clean build output (A-DMs-guide-to-aevoria.txt)
3. Reads the Homebrewery export (dmGuideTempPartial.txt)
4. Splits both using build-injected headers as anchors
5. Compares segments to find changes
6. For changed segments, extracts per-file content from Homebrewery
7. Writes updated content back to source files

Usage:
  1. Run `npm run build:dms` to generate clean build output
  2. Place Homebrewery-edited file as `build/dmGuideTempPartial.txt`
    3. Run `python scripts/sync/sync_homebrew_to_sources.py`
  4. Run `npm run build:dms` again to verify
"""

import json
import os
import re
import sys
import difflib

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))
BUILD_DIR = os.path.join(REPO_ROOT, 'build')
TOC_FILE = os.path.join(BUILD_DIR, 'dms-guide-toc.json')
BUILD_OUTPUT = os.path.join(BUILD_DIR, 'A-DMs-guide-to-aevoria.txt')
HOMEBREW_FILE = os.path.join(BUILD_DIR, 'dmGuideTempPartial.txt')
RESET_MARKER = '{{resetCounting}}'


def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()


def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def get_body_after_reset(text):
    """Extract body content after {{resetCounting}}."""
    pos = text.find(RESET_MARKER)
    if pos == -1:
        return None
    return text[pos + len(RESET_MARKER):]


def get_expected_headers(toc):
    """Build ordered list of build-injected headers from TOC."""
    headers = []
    for section in toc['sections']:
        chapter = section['chapter']
        if chapter != 'Northreach: Your Starting Point':
            headers.append(f"# {chapter}")
        if 'subsections' in section:
            for sub in section['subsections']:
                headers.append(f"## {sub['title']}")
    return headers


def find_header_positions(lines, expected_headers):
    """Find line positions of expected headers, searching in order."""
    positions = {}
    search_from = 0
    for header in expected_headers:
        for j in range(search_from, len(lines)):
            if lines[j].strip() == header:
                positions[header] = j
                search_from = j + 1
                break
    return positions


def build_segments(toc):
    """Build ordered list of segments from TOC.
    
    Each segment = one section or subsection, with its build-injected
    headers and list of source files.
    """
    segments = []
    for section in toc['sections']:
        chapter = section['chapter']
        ch_header = f"# {chapter}" if chapter != 'Northreach: Your Starting Point' else None

        if 'subsections' in section:
            for i, sub in enumerate(section['subsections']):
                sub_header = f"## {sub['title']}"
                if i == 0 and ch_header:
                    headers = [ch_header, sub_header]
                else:
                    headers = [sub_header]
                segments.append({
                    'headers': headers,
                    'files': sub['files'],
                    'label': f"{chapter} > {sub['title']}"
                })
        else:
            headers = [ch_header] if ch_header else []
            segments.append({
                'headers': headers,
                'files': section.get('files', []),
                'label': chapter
            })
    return segments


def get_file_anchor(filepath):
    """Get the first significant non-empty line of a source file."""
    try:
        content = read_file(filepath)
    except FileNotFoundError:
        return None
    for line in content.split('\n'):
        stripped = line.strip()
        if stripped and stripped not in ('\\page', '\\pagebreak', '\\column'):
            return stripped
    return None


def find_anchor_in_lines(lines, anchor, search_from):
    """Find an anchor line with exact match, then prefix fallback.
    Returns (position, match_type) or (-1, None)."""
    # Try exact match first
    for j in range(search_from, len(lines)):
        if lines[j].strip() == anchor:
            return j, 'exact'

    # Prefix fallback: match first 30+ chars
    if len(anchor) >= 20:
        prefix = anchor[:30]
        for j in range(search_from, len(lines)):
            stripped = lines[j].strip()
            if stripped.startswith(prefix) and stripped:
                return j, 'prefix'

    return -1, None


def strip_trailing_page(content):
    """Strip trailing \\page markers and whitespace from content."""
    result = content.rstrip()
    # Remove trailing \page markers (possibly multiple, with newlines between)
    result = re.sub(r'(\n*\\page\s*)+$', '', result)
    return result.rstrip()


def count_diff_lines(old_content, new_content):
    """Count added/removed lines between two content strings."""
    diff = list(difflib.unified_diff(
        old_content.split('\n'),
        new_content.split('\n'),
        lineterm='',
        n=0
    ))
    additions = sum(1 for l in diff if l.startswith('+') and not l.startswith('+++'))
    deletions = sum(1 for l in diff if l.startswith('-') and not l.startswith('---'))
    return additions, deletions


def show_diff_preview(old_content, new_content, max_lines=20):
    """Show a short preview of the differences."""
    diff = list(difflib.unified_diff(
        old_content.split('\n'),
        new_content.split('\n'),
        lineterm='',
        n=1
    ))
    shown = 0
    for line in diff:
        if line.startswith('@@') or line.startswith('---') or line.startswith('+++'):
            continue
        if shown >= max_lines:
            remaining = len([l for l in diff[diff.index(line):] 
                           if l.startswith('+') or l.startswith('-')])
            print(f"        ... and {remaining} more diff lines")
            break
        if line.startswith('+'):
            print(f"        + {line[1:][:100]}")
            shown += 1
        elif line.startswith('-'):
            print(f"        - {line[1:][:100]}")
            shown += 1


def update_source_file(source_path, new_content, fp_label):
    """Compare and update a source file. Returns 'updated', 'unchanged', or 'skipped'."""
    if not os.path.exists(source_path):
        print(f"    WARNING: Source not found: {source_path}")
        return 'skipped'

    new_clean = strip_trailing_page(new_content)
    current_content = read_file(source_path)
    current_clean = strip_trailing_page(current_content)

    if new_clean == current_clean:
        print(f"    = {fp_label} (unchanged)")
        return 'unchanged'

    # Show diff summary
    additions, deletions = count_diff_lines(current_clean, new_clean)
    print(f"    >>> {fp_label} (+{additions}/-{deletions} lines)")
    show_diff_preview(current_clean, new_clean)

    # Write updated content - preserve a trailing newline
    write_file(source_path, new_clean + '\n')
    return 'updated'


def process_single_file_segment(brew_file_lines, seg, build_dir):
    """Process a segment with a single source file."""
    fp = seg['files'][0]
    source_path = os.path.normpath(os.path.join(build_dir, fp))
    new_content = '\n'.join(brew_file_lines)
    return update_source_file(source_path, new_content, fp)


def process_multi_file_segment(brew_file_lines, seg, build_dir):
    """Process a segment with multiple source files using anchor matching."""
    results = []
    
    # Get anchors for each file
    file_info = []
    for fp in seg['files']:
        source_path = os.path.normpath(os.path.join(build_dir, fp))
        anchor = get_file_anchor(source_path) if os.path.exists(source_path) else None
        file_info.append((fp, source_path, anchor))

    # Find each anchor in the brew segment content (in order)
    anchor_positions = []
    search_from = 0
    for fp, source_path, anchor in file_info:
        if anchor is None:
            anchor_positions.append(-1)
            print(f"    WARNING: No anchor for {fp}")
            continue

        pos, match_type = find_anchor_in_lines(brew_file_lines, anchor, search_from)
        if pos >= 0:
            anchor_positions.append(pos)
            search_from = pos + 1
            if match_type == 'prefix':
                print(f"    NOTE: Prefix match for {fp}")
        else:
            anchor_positions.append(-1)
            anchor_preview = anchor[:80] + '...' if len(anchor) > 80 else anchor
            print(f"    WARNING: Anchor not found for {fp}: '{anchor_preview}'")

    # Extract and update each file
    for idx, (fp, source_path, anchor) in enumerate(file_info):
        if anchor_positions[idx] == -1:
            print(f"    SKIP: {fp} (anchor not found)")
            results.append('skipped')
            continue

        start = anchor_positions[idx]

        # Find end: next file's anchor or end of segment
        end = len(brew_file_lines)
        for next_idx in range(idx + 1, len(file_info)):
            if anchor_positions[next_idx] != -1:
                end = anchor_positions[next_idx]
                break

        extracted = '\n'.join(brew_file_lines[start:end])
        result = update_source_file(source_path, extracted, fp)
        results.append(result)

    return results


def strip_segment_headers(brew_segment, headers):
    """Strip build-injected headers from the beginning of a segment.
    Returns the remaining lines (file content only)."""
    content_start = 0

    for header in headers:
        for j in range(content_start, len(brew_segment)):
            if brew_segment[j].strip() == header:
                content_start = j + 1
                break

    # Skip blank lines after headers
    while content_start < len(brew_segment) and brew_segment[content_start].strip() == '':
        content_start += 1

    return brew_segment[content_start:]


def main():
    print("=" * 60)
    print("Homebrewery → Source File Sync")
    print("=" * 60)
    print()

    # Validate input files exist
    for path, label in [(TOC_FILE, 'TOC'), (BUILD_OUTPUT, 'Build output'), (HOMEBREW_FILE, 'Homebrewery export')]:
        if not os.path.exists(path):
            print(f"ERROR: {label} not found: {path}")
            sys.exit(1)

    # Read inputs
    toc = json.loads(read_file(TOC_FILE))
    build_text = read_file(BUILD_OUTPUT)
    brew_text = read_file(HOMEBREW_FILE)

    print(f"Build output:     {len(build_text):,} chars, {len(build_text.split(chr(10))):,} lines")
    print(f"Homebrewery file: {len(brew_text):,} chars, {len(brew_text.split(chr(10))):,} lines")
    print()

    # Extract bodies (content after {{resetCounting}})
    build_body = get_body_after_reset(build_text)
    brew_body = get_body_after_reset(brew_text)

    if build_body is None:
        print(f"ERROR: {RESET_MARKER} not found in build output")
        sys.exit(1)
    if brew_body is None:
        print(f"ERROR: {RESET_MARKER} not found in Homebrewery export")
        sys.exit(1)

    build_lines = build_body.split('\n')
    brew_lines = brew_body.split('\n')

    print(f"Body (after reset): build={len(build_lines)} lines, brew={len(brew_lines)} lines")
    print()

    # Find expected headers in both files
    expected_headers = get_expected_headers(toc)
    build_header_pos = find_header_positions(build_lines, expected_headers)
    brew_header_pos = find_header_positions(brew_lines, expected_headers)

    print(f"Headers found: build={len(build_header_pos)}/{len(expected_headers)}, "
          f"brew={len(brew_header_pos)}/{len(expected_headers)}")

    # Report any missing headers
    for h in expected_headers:
        if h not in build_header_pos:
            print(f"  MISSING in build: {h}")
        if h not in brew_header_pos:
            print(f"  MISSING in brew:  {h}")
    print()

    # Build segments
    segments = build_segments(toc)

    # Assign boundaries to each segment
    for i, seg in enumerate(segments):
        # Start: position of first header
        if seg['headers']:
            first_h = seg['headers'][0]
            seg['build_start'] = build_header_pos.get(first_h, -1)
            seg['brew_start'] = brew_header_pos.get(first_h, -1)
        else:
            seg['build_start'] = 0
            seg['brew_start'] = 0

        # End: start of next segment (or end of body)
        if i + 1 < len(segments):
            next_seg = segments[i + 1]
            next_h = next_seg['headers'][0] if next_seg['headers'] else None
            seg['build_end'] = build_header_pos.get(next_h, len(build_lines)) if next_h else len(build_lines)
            seg['brew_end'] = brew_header_pos.get(next_h, len(brew_lines)) if next_h else len(brew_lines)
        else:
            seg['build_end'] = len(build_lines)
            seg['brew_end'] = len(brew_lines)

    # Process each segment
    total_updated = 0
    total_unchanged = 0
    total_skipped = 0

    for seg in segments:
        if seg['build_start'] == -1 or seg['brew_start'] == -1:
            print(f"  SKIP: {seg['label']} (header not found in one or both files)")
            total_skipped += len(seg['files'])
            continue

        build_segment = build_lines[seg['build_start']:seg['build_end']]
        brew_segment = brew_lines[seg['brew_start']:seg['brew_end']]

        # Quick check: identical segments?
        if build_segment == brew_segment:
            print(f"  = {seg['label']} ({len(seg['files'])} file(s), no changes)")
            total_unchanged += len(seg['files'])
            continue

        # Segment has changes!
        seg_additions, seg_deletions = count_diff_lines(
            '\n'.join(build_segment), '\n'.join(brew_segment)
        )
        print(f"  * {seg['label']} ({len(seg['files'])} file(s), +{seg_additions}/-{seg_deletions})")

        # Strip build-injected headers from brew segment
        brew_file_lines = strip_segment_headers(brew_segment, seg['headers'])

        if len(seg['files']) == 1:
            result = process_single_file_segment(brew_file_lines, seg, BUILD_DIR)
            if result == 'updated':
                total_updated += 1
            elif result == 'unchanged':
                total_unchanged += 1
            else:
                total_skipped += 1
        else:
            results = process_multi_file_segment(brew_file_lines, seg, BUILD_DIR)
            for r in results:
                if r == 'updated':
                    total_updated += 1
                elif r == 'unchanged':
                    total_unchanged += 1
                else:
                    total_skipped += 1

    # Summary
    print()
    print("=" * 60)
    print(f"Sync complete:")
    print(f"  {total_updated} file(s) UPDATED")
    print(f"  {total_unchanged} file(s) unchanged")
    if total_skipped:
        print(f"  {total_skipped} file(s) skipped")
    print()
    if total_updated > 0:
        print("Next steps:")
        print("  1. Review changes: git diff")
        print("  2. Rebuild to verify: npm run build:dms")
        print("  3. Commit if satisfied")
    print("=" * 60)


if __name__ == '__main__':
    main()
