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

Example footer format:
    {{pageNumber,auto}}
    {{footnote SECTION NAME IN ALL CAPS}}
"""

import re
import sys
from pathlib import Path

def process_markdown_file(filepath):
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
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if this is a level 1 heading (# Title)
        heading_match = re.match(r'^#\s+(.+)$', line.strip())
        if heading_match:
            # Extract heading text and convert to uppercase
            heading_text = heading_match.group(1).strip()
            # Remove markdown formatting (bold, italic, code)
            heading_text = re.sub(r'\*\*?(.*?)\*\*?', r'\1', heading_text)
            heading_text = re.sub(r'`(.*?)`', r'\1', heading_text)
            current_heading = heading_text.upper()
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
            if j >= 1 and '{{footnote' in modified_lines[j]:
                # Found footnote line, check for pageNumber above it
                if '{{pageNumber' in modified_lines[j-1]:
                    # Remove pageNumber, footnote, and any empty lines before them
                    k = j - 1
                    while k > 0 and not modified_lines[k-1].strip():
                        k -= 1
                    # Remove from k to end
                    modified_lines = modified_lines[:k]
                    changes_made += 1
                else:
                    # Just footnote without pageNumber, remove it
                    modified_lines = modified_lines[:j]
                    changes_made += 1
            
            # Add new footer if we have a heading
            if current_heading:
                modified_lines.append('\n')
                modified_lines.append('{{pageNumber,auto}}\n')
                modified_lines.append(f'{{{{footnote {current_heading}}}}}\n')
                modified_lines.append('\n')
            
            # Add the \\page line
            modified_lines.append(line)
            i += 1
            continue
        
        # Regular line, just add it
        modified_lines.append(line)
        i += 1
    
    # Write back if changes were made
    if changes_made > 0:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(modified_lines)
            return changes_made
        except Exception as e:
            print(f"  ✗ Error writing {filepath}: {e}")
            return 0
    
    return 0

def main():
    """Process all markdown files in World Building directory."""
    base_path = Path('World Building')
    
    if not base_path.exists():
        print("Error: 'World Building' directory not found.")
        print("This script must be run from the repository root.")
        sys.exit(1)
    
    # Find all markdown files
    md_files = list(base_path.rglob('*.md'))
    
    # Filter to only player-facing files (exclude DMEyesOnly)
    player_files = [f for f in md_files if 'DMEyesOnly' not in str(f)]
    
    if not player_files:
        print("No markdown files found to process.")
        return
    
    print(f"Updating page footers in {len(player_files)} markdown files...")
    
    total_changes = 0
    files_changed = 0
    
    for filepath in sorted(player_files):
        changes = process_markdown_file(filepath)
        if changes > 0:
            files_changed += 1
            total_changes += changes
            print(f"  ✓ {filepath.relative_to(base_path)}: {changes} footer(s) updated")
    
    if total_changes > 0:
        print(f"\n✓ Updated {total_changes} page footer(s) in {files_changed} file(s)")
    else:
        print("\n✓ All page footers are up to date")

if __name__ == '__main__':
    main()
