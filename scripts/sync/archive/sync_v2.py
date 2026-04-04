#!/usr/bin/env python3
"""
Sync Homebrewery export back to source files.

Strategy: Use each source file's first content lines as anchors to find 
exact positions in both build and export, then extract and replace.
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
VERBOSE = "--verbose" in sys.argv
APPLY = "--apply" in sys.argv


def get_toc_files():
    """Get ordered list of (rel_path, source_path) from TOC."""
    with open(TOC_FILE, 'r', encoding='utf-8') as f:
        toc = json.load(f)
    
    files = []
    for section in toc.get('sections', []):
        if 'subsections' in section:
            for sub in section['subsections']:
                for rel_path in sub.get('files', []):
                    source = (BUILD_DIR / rel_path).resolve()
                    files.append((rel_path, source))
        elif 'files' in section:
            for rel_path in section.get('files', []):
                source = (BUILD_DIR / rel_path).resolve()
                files.append((rel_path, source))
    return files


def get_anchor_lines(source_path, count=3):
    """Get first `count` non-empty lines from source as search anchor."""
    lines = source_path.read_text(encoding='utf-8').split('\n')
    anchors = []
    for line in lines:
        stripped = line.rstrip()
        if stripped:
            anchors.append(stripped)
            if len(anchors) >= count:
                break
    return anchors


def find_anchor_in_text(text_lines, anchors, start_from=0):
    """Find the position where anchor lines appear in text_lines."""
    if not anchors:
        return None
    first_anchor = anchors[0]
    for i in range(start_from, len(text_lines)):
        if text_lines[i].rstrip() == first_anchor:
            # Verify subsequent anchors
            match = True
            matched_anchor_idx = 1
            for j in range(i + 1, min(i + 20, len(text_lines))):
                if matched_anchor_idx >= len(anchors):
                    break
                if text_lines[j].rstrip() == anchors[matched_anchor_idx]:
                    matched_anchor_idx += 1
                elif text_lines[j].strip():  # non-empty non-matching line
                    # Skip some noise lines (footers, watercolors)
                    pass
            if matched_anchor_idx >= min(2, len(anchors)):
                return i  # 0-based
    return None


def find_file_boundaries(text_lines, toc_files):
    """
    Find (start, end) 0-based positions for each file in text_lines.
    Returns list of (rel_path, start, end) tuples.
    """
    # First, find start positions for all files
    file_starts = []
    search_from = 0
    
    for rel_path, source_path in toc_files:
        if not source_path.exists():
            file_starts.append((rel_path, None))
            continue
        
        anchors = get_anchor_lines(source_path, 3)
        pos = find_anchor_in_text(text_lines, anchors, search_from)
        
        if pos is not None:
            file_starts.append((rel_path, pos))
            search_from = pos + 1
        else:
            # Try with just first anchor
            anchors_1 = get_anchor_lines(source_path, 1)
            pos = find_anchor_in_text(text_lines, anchors_1, search_from)
            if pos is not None:
                file_starts.append((rel_path, pos))
                search_from = pos + 1
            else:
                file_starts.append((rel_path, None))
    
    # Now compute end positions for each file
    # End = line before next file's start (or end of document)
    # But "next file's start" might be preceded by chapter/subsection titles
    # So we look for the \page that ends the file, then include everything up to
    # that \page + the blank line after it
    results = []
    for idx, (rel_path, start) in enumerate(file_starts):
        if start is None:
            results.append((rel_path, None, None))
            continue
        
        # Find next file's start
        next_start = None
        for j in range(idx + 1, len(file_starts)):
            if file_starts[j][1] is not None:
                next_start = file_starts[j][1]
                break
        
        if next_start is not None:
            # End is just before the next file's content starts
            # But there may be chapter titles, subsection titles, \page, blanks between
            # Walk backwards from next_start to find the \page that ends this file
            end = next_start - 1
            # The file's actual content ends at the \page from normalizePageBreak
            # After that there may be blanks and chapter/subsection titles
            
            # Actually, just set end to next_start - 1 for now
            # We'll strip trailing non-content (chapter titles, blanks, \page) when extracting
        else:
            end = len(text_lines) - 1
        
        results.append((rel_path, start, end))
    
    return results


def extract_file_content(text_lines, start, end):
    """
    Extract file content from text_lines[start:end+1].
    Strip trailing:
    - Chapter titles (# ...) that build.js injects
    - Subsection titles (## ...) that build.js injects
    - The \page from normalizePageBreak
    - Trailing blank lines
    """
    section = list(text_lines[start:end + 1])
    
    # Work backwards to strip build artifacts
    # Pattern at end: ...\n\n\page\n[blank]\n[# ChapterTitle]\n[blank]\n[## SubTitle]\n[blank]
    
    while section:
        last = section[-1].rstrip()
        if not last:
            section.pop()
        elif last.startswith('## ') and len(last) > 3:
            # Subsection title injected by build.js
            section.pop()
        elif last.startswith('# ') and len(last) > 2 and not last.startswith('# '):
            # Wait, we need to be careful not to strip real content headings
            # Chapter titles from build.js are simple: "# Chapter Name"
            # Real content headings could also start with #
            # Only strip if it matches a known chapter name
            section.pop()  # We'll refine this
        elif last == '\\page':
            section.pop()
            break  # Stop after removing the normalizePageBreak \page
        else:
            break
    
    # Also strip any trailing blank lines after removing \page
    while section and not section[-1].strip():
        section.pop()
    
    return section


def strip_trailing_page_and_titles(section_lines, known_chapter_titles, known_subsection_titles):
    """
    Strip trailing build artifacts from a file section.
    Removes: blank lines, chapter titles, subsection titles, and the trailing \page.
    """
    lines = list(section_lines)
    
    # Work backwards
    while lines:
        last = lines[-1].rstrip()
        
        if not last:
            lines.pop()
            continue
        
        # Check for known chapter/subsection titles
        if last in known_chapter_titles or last in known_subsection_titles:
            lines.pop()
            continue
        
        # Check for {{note blocks that might be at chapter boundaries
        if last == '{{note':
            # This is ambiguous - could be file content or build injection
            # Check if preceded by a chapter title
            check_idx = len(lines) - 2
            while check_idx >= 0 and not lines[check_idx].strip():
                check_idx -= 1
            if check_idx >= 0 and lines[check_idx].rstrip() in known_chapter_titles:
                lines.pop()  # Remove {{note that follows chapter title
                continue
            break
        
        if last == '\\page':
            lines.pop()
            # Remove blank lines before \page too
            while lines and not lines[-1].strip():
                lines.pop()
            break
        
        break
    
    return lines


def main():
    print("=== Sync Export → Source Files (v2) ===\n")
    
    if DRY_RUN:
        print("DRY RUN MODE - showing changes only\n")
    elif APPLY:
        print("APPLY MODE - writing files\n")
    else:
        print("Usage: python sync_v2.py [--dry-run | --apply] [--verbose]\n")
        print("  --dry-run   Show changes without writing")
        print("  --apply     Write changes to source files")
        print("  --verbose   Show detailed output")
        return
    
    # Read files
    build_lines = BUILD_FILE.read_text(encoding='utf-8').split('\n')
    export_lines = EXPORT_FILE.read_text(encoding='utf-8').split('\n')
    print(f"Build: {len(build_lines)} lines")
    print(f"Export: {len(export_lines)} lines")
    print(f"Delta: {len(export_lines) - len(build_lines):+d}\n")
    
    # Get TOC file list
    toc_files = get_toc_files()
    print(f"TOC: {len(toc_files)} files\n")
    
    # Get known chapter and subsection titles
    with open(TOC_FILE, 'r', encoding='utf-8') as f:
        toc = json.load(f)
    
    known_chapter_titles = set()
    known_subsection_titles = set()
    for section in toc.get('sections', []):
        ch = section.get('chapter', '')
        if ch and ch != 'Northreach: Your Starting Point':
            known_chapter_titles.add(f'# {ch}')
        for sub in section.get('subsections', []):
            title = sub.get('title', '')
            if title:
                known_subsection_titles.add(f'## {title}')
    
    # Find file boundaries in both build and export
    print("Finding file boundaries in build...")
    build_boundaries = find_file_boundaries(build_lines, toc_files)
    
    print("Finding file boundaries in export...")
    export_boundaries = find_file_boundaries(export_lines, toc_files)
    
    # Verify boundaries
    if VERBOSE:
        print("\nBoundary Verification:")
        for (b_rel, b_start, b_end), (e_rel, e_start, e_end) in zip(build_boundaries, export_boundaries):
            name = Path(b_rel).name
            b_s = f"L{b_start+1}" if b_start is not None else "N/A"
            b_e = f"L{b_end+1}" if b_end is not None else "N/A"
            e_s = f"L{e_start+1}" if e_start is not None else "N/A"
            e_e = f"L{e_end+1}" if e_end is not None else "N/A"
            print(f"  {name}: Build {b_s}-{b_e}, Export {e_s}-{e_e}")
    
    # Process each file
    print("\n=== Processing Files ===\n")
    changes_made = 0
    
    for idx, ((b_rel, b_start, b_end), (e_rel, e_start, e_end)) in enumerate(zip(build_boundaries, export_boundaries)):
        name = Path(b_rel).name
        source_path = (BUILD_DIR / b_rel).resolve()
        
        if b_start is None or e_start is None:
            if VERBOSE:
                print(f"  SKIP {name}: boundary not found")
            continue
        
        # Extract sections from build and export
        build_section = strip_trailing_page_and_titles(
            build_lines[b_start:b_end + 1], 
            known_chapter_titles, known_subsection_titles
        )
        export_section = strip_trailing_page_and_titles(
            export_lines[e_start:e_end + 1],
            known_chapter_titles, known_subsection_titles
        )
        
        # Compare
        build_stripped = [l.rstrip() for l in build_section]
        export_stripped = [l.rstrip() for l in export_section]
        
        if build_stripped == export_stripped:
            if VERBOSE:
                print(f"  OK {name}: no changes ({len(build_section)} lines)")
            continue
        
        # Count structural diffs (ignoring blank-only differences)
        structural_diffs = 0
        max_lines = max(len(build_stripped), len(export_stripped))
        for i in range(max_lines):
            b = build_stripped[i] if i < len(build_stripped) else ''
            e = export_stripped[i] if i < len(export_stripped) else ''
            if b != e and (b.strip() or e.strip()):
                structural_diffs += 1
        
        delta = len(export_section) - len(build_section)
        print(f"  CHANGED {name}:")
        print(f"    Build section: {len(build_section)} lines (L{b_start+1}-?)")
        print(f"    Export section: {len(export_section)} lines (L{e_start+1}-?)")
        print(f"    Delta: {delta:+d} lines, {structural_diffs} structural diffs")
        
        # The new source file content is the export section
        new_content = '\n'.join(l.rstrip('\r') for l in export_section)
        if not new_content.endswith('\n'):
            new_content += '\n'
        
        # Read current source for comparison
        old_content = source_path.read_text(encoding='utf-8') if source_path.exists() else ''
        
        if new_content == old_content:
            print(f"    Source already matches export (no write needed)")
            continue
        
        old_line_count = len(old_content.split('\n'))
        new_line_count = len(new_content.split('\n'))
        
        # Show first few diffs
        if DRY_RUN or VERBOSE:
            old_lines = old_content.split('\n')
            new_lines = new_content.split('\n')
            diff_count = 0
            for i in range(min(len(old_lines), len(new_lines))):
                if old_lines[i].rstrip() != new_lines[i].rstrip():
                    if diff_count < 3:
                        print(f"    Diff at line {i+1}:")
                        print(f"      old: {old_lines[i].rstrip()[:80]}")
                        print(f"      new: {new_lines[i].rstrip()[:80]}")
                    diff_count += 1
            if diff_count > 3:
                print(f"    ... and {diff_count - 3} more line diffs")
            if len(old_lines) != len(new_lines):
                print(f"    Line count: {old_line_count} → {new_line_count}")
        
        if APPLY:
            source_path.write_text(new_content, encoding='utf-8')
            print(f"    ✓ Written {len(new_content)} bytes to {source_path}")
        
        changes_made += 1
        print()
    
    print(f"\n=== {changes_made} files {'would be ' if DRY_RUN else ''}changed ===")
    
    if DRY_RUN:
        print("\nRe-run with --apply to write changes.")


if __name__ == '__main__':
    main()
