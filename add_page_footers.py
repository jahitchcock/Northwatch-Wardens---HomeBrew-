#!/usr/bin/env python3
r"""
Add page numbers and dynamic footnotes before every \page break in markdown files.

This script scans all markdown files in the World Building directory (excluding DMEyesOnly)
and adds or updates page footers before each \page break. The footnote text is derived
from the last # heading (level 1) before each page break.

Usage:
    python add_page_footers.py

The script is idempotent - running it multiple times will update existing footers
rather than creating duplicates.

Example footer formats:
    **🚀 New DM?** See **Chapter 2: Quick Start** to prep and run Session 0 in under 1 hour.
    {{pageNumber,auto}}
    {{footnote Welcome to Aevoria}}

    {{pageNumber,auto}}
    {{footnote SECTION NAME IN ALL CAPS}}
"""

import json
import re
import sys
from pathlib import Path

CALLOUT_LINE = '**🚀 New DM?** See **Chapter 2: Quick Start** to prep and run Session 0 in under 1 hour.'

def process_markdown_file(filepath, include_callout=False, uppercase_footnote=True):
    """
    Process a single markdown file to add or update page footers.
    
    Args:
        filepath: Path to the markdown file
        
    Returns:
        Number of footers added or updated
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"  ✗ Error reading {filepath}: {e}")
        return 0
    
    # Track the current main heading
    current_heading = None
    modified_lines = []
    changes_made = 0
    modified = False
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if this is a level 1 heading (# Title)
        heading_match = re.match(r'^#\s+(.+)$', line.strip())
        if heading_match:
            # Extract heading text and remove markdown formatting
            heading_text = heading_match.group(1).strip()
            # Remove markdown formatting (bold, italic, code)
            heading_text = re.sub(r'\*\*?(.*?)\*\*?', r'\1', heading_text)
            heading_text = re.sub(r'`(.*?)`', r'\1', heading_text)
            current_heading = heading_text
            modified_lines.append(line)
            i += 1
            continue
        
        # Check if this is a \\page break
        if line.strip() == '\\page':
            # Look backwards to see if there's an existing footer
            # Skip empty lines before \\page
            j = len(modified_lines) - 1
            while j >= 0 and not modified_lines[j].strip():
                j -= 1
            
            # Check if we have an existing footer (footnote line)
            if j >= 0 and modified_lines[j].strip().startswith('{{footnote'):
                footnote_index = j
                # Look for pageNumber line above footnote
                k = footnote_index - 1
                while k >= 0 and not modified_lines[k].strip():
                    k -= 1
                page_index = k if k >= 0 and modified_lines[k].strip().startswith('{{pageNumber') else None

                start_index = footnote_index
                if page_index is not None:
                    start_index = page_index
                    # Optional callout line above page number
                    m = page_index - 1
                    while m >= 0 and not modified_lines[m].strip():
                        m -= 1
                    if m >= 0 and modified_lines[m].strip() == CALLOUT_LINE:
                        start_index = m

                # Remove blank lines immediately above the footer block
                n = start_index - 1
                while n >= 0 and not modified_lines[n].strip():
                    start_index = n
                    n -= 1

                modified_lines = modified_lines[:start_index]
                changes_made += 1
                modified = True
            
            # Add new footer if we have a heading
            if current_heading:
                footnote_text = current_heading.upper() if uppercase_footnote else current_heading
                add_callout = include_callout
                if include_callout:
                    last_non_empty = None
                    for prev_line in reversed(modified_lines):
                        if prev_line.strip():
                            last_non_empty = prev_line.strip()
                            break
                    if last_non_empty == CALLOUT_LINE:
                        add_callout = False
                modified_lines.append('\n')
                if add_callout:
                    modified_lines.append(f'{CALLOUT_LINE}\n')
                modified_lines.append('{{pageNumber,auto}}\n')
                modified_lines.append(f'{{{{footnote {footnote_text}}}}}\n')
                modified_lines.append('\n')
                modified = True
            
            # Add the \\page line
            modified_lines.append(line)
            i += 1
            continue
        
        # Regular line, just add it
        modified_lines.append(line)
        i += 1
    
    # Write back if changes were made
    if changes_made > 0 or modified:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(modified_lines)
            return changes_made
        except Exception as e:
            print(f"  ✗ Error writing {filepath}: {e}")
            return 0
    
    return 0

def collect_toc_files(toc_path):
    try:
        data = json.loads(toc_path.read_text(encoding='utf-8'))
    except Exception as e:
        print(f"Warning: Failed to read {toc_path}: {e}")
        return []

    collected = []
    base_dir = toc_path.parent

    def add_files(node):
        files = node.get('files') if isinstance(node, dict) else None
        if files:
            for rel_path in files:
                collected.append((base_dir / rel_path).resolve())
        subsections = node.get('subsections') if isinstance(node, dict) else None
        if subsections:
            for sub in subsections:
                add_files(sub)

    for section in data.get('sections', []):
        add_files(section)

    return collected


def main():
    """Process markdown files for player and DM guide footers."""
    repo_root = Path(__file__).resolve().parent
    world_building_path = repo_root / 'World Building'
    
    if not world_building_path.exists():
        print("Error: 'World Building' directory not found.")
        print("This script must be run from the repository root.")
        sys.exit(1)

    dm_toc_path = repo_root / 'build' / 'dms-guide-toc.json'
    dm_files = collect_toc_files(dm_toc_path) if dm_toc_path.exists() else []
    dm_files = [f for f in dm_files if f.exists()]

    # Player-facing files (exclude DMEyesOnly)
    player_files = [f for f in world_building_path.rglob('*.md') if 'DMEyesOnly' not in str(f)]

    files_processed = 0
    total_changes = 0
    files_changed = 0

    if player_files:
        print(f"Updating page footers in {len(player_files)} player-facing markdown files...")
        for filepath in sorted(player_files):
            changes = process_markdown_file(filepath, include_callout=False, uppercase_footnote=True)
            files_processed += 1
            if changes > 0:
                files_changed += 1
                total_changes += changes
                print(f"  ✓ {filepath.relative_to(world_building_path)}: {changes} footer(s) updated")

    if dm_files:
        print(f"\nUpdating page footers in {len(dm_files)} DM guide markdown files...")
        for filepath in sorted(set(dm_files)):
            changes = process_markdown_file(filepath, include_callout=False, uppercase_footnote=False)
            files_processed += 1
            if changes > 0:
                files_changed += 1
                total_changes += changes
                rel_path = filepath.relative_to(repo_root)
                print(f"  ✓ {rel_path}: {changes} footer(s) updated")

    if files_processed == 0:
        print("No markdown files found to process.")
        return

    if total_changes > 0:
        print(f"\n✓ Updated {total_changes} page footer(s) in {files_changed} file(s)")
    else:
        print("\n✓ All page footers are up to date")

if __name__ == '__main__':
    main()
