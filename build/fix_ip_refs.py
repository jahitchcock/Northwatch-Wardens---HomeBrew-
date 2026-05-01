#!/usr/bin/env python3
"""Fix IP references in build/ content files for AEV-46."""

import os
import re
from pathlib import Path

BUILD_DIR = Path("C:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)/build")

# Replacement mappings based on AEV-17, AEV-16, AEV-19
REPLACEMENTS = [
    # Frozen Sick -> The Pale Sickness (AEV-17) - case insensitive
    (r"Frozen Sick", "The Pale Sickness"),
    (r"frozen sick", "the pale sickness"),
    (r"FROZEN SICK", "THE PALE SICKNESS"),
    (r"Frozen Sick", "The Pale Sickness"),
    # Exandria -> Aevoria (AEV-16) - case insensitive handled in loop
    (r"Exandria", "Aevoria"),
    (r"exandria", "aevoria"),
    (r"EXANDRIA", "AEVORIA"),
    # Aeor -> Aevoria (AEV-17 mentions Aeorian ruins)
    (r"Aeorian", "Aevorian"),
    (r"aeorian", "aevorian"),
    (r"AEORIAN", "AEVORIAN"),
    (r"Aeor", "Aevoria"),
    (r"aeor", "aevoria"),
    (r"AEOR", "AEVORIA"),
    # Eiselcross -> Icecross (original name)
    (r"Eiselcross", "Icecross"),
    (r"eiselcross", "icecross"),
    (r"EISELCRROSS", "ICECROSS"),
    # Uthodurn -> Uthar (original name)
    (r"Uthodurn", "Uthar"),
    (r"uthodurn", "uthar"),
    (r"UTHODURN", "UTHAR"),
    # D&D -> 5e (AEV-19)
    (r"\bD&D\b", "5e"),
    (r"\bDungeons and Dragons\b", "fifth edition"),
    (r"\bdungeons and dragons\b", "fifth edition"),
    # Explorer's Guide to Wildemount -> Campaign Guide to Aevoria
    (r"Explorer's Guide to Wildemount", "Campaign Guide to Aevoria"),
    (r"explorer's guide to wildemount", "campaign guide to aevoria"),
]

# Fan disclaimer to add
FAN_DISCLAIMER = """

---

## Fan Disclaimer

This content is a fan-made creation and is not affiliated with, endorsed by, or sponsored by Wizards of the Coast LLC.  
Dungeons & Dragons and the D&D logo are trademarks of Wizards of the Coast LLC.  
This work uses the 5th Edition SRD (System Reference Document) under the Open Game License.

This is an original campaign setting inspired by, but not using, proprietary content.
"""

def count_refs(content, patterns):
    """Count occurrences of patterns in content."""
    total = 0
    for pattern, _ in patterns:
        total += len(re.findall(pattern, content))
    return total

def fix_file(filepath):
    """Fix IP references in a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except (UnicodeDecodeError, PermissionError):
        return None, 0, 0
    
    original_content = content
    replacements_made = 0
    
    # Check if disclaimer already present
    has_disclaimer = "Fan Disclaimer" in content
    
    # If disclaimer present, extract it to preserve it
    disclaimer_text = ""
    content_to_fix = content
    if has_disclaimer:
        idx = content.find("---")
        if idx > 0 and "Fan Disclaimer" in content[idx:idx+200]:
            # Find the disclaimer section
            disclaimer_start = content.rfind("---", 0, len(content))
            if disclaimer_start > 0:
                content_to_fix = content[:disclaimer_start].rstrip()
                disclaimer_text = content[disclaimer_start:]
    
    # Apply replacements to content (not the disclaimer)
    for pattern, replacement in REPLACEMENTS:
        matches = list(re.finditer(pattern, content_to_fix))
        if matches:
            content_to_fix = re.sub(pattern, replacement, content_to_fix)
            replacements_made += len(matches)
    
    # Re-assemble
    content = content_to_fix
    if has_disclaimer:
        content += "\n\n" + disclaimer_text
    elif filepath.suffix in ['.md', '.markdown']:
        # Add fan disclaimer if not present and file is markdown
        content += FAN_DISCLAIMER
        replacements_made += 1  # Count disclaimer addition
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, replacements_made, 0
    
    return False, 0, 0

def main():
    print(f"Scanning {BUILD_DIR}...")
    
    # Count before
    total_before = 0
    files_to_process = []
    
    for ext in ['*.md', '*.html', '*.txt', '*.htm']:
        for filepath in BUILD_DIR.glob(f"**/{ext}"):
            if "node_modules" in str(filepath):
                continue
            files_to_process.append(filepath)
    
    print(f"Found {len(files_to_process)} files to process")
    
    total_fixed = 0
    total_replacements = 0
    
    for filepath in files_to_process:
        modified, reps, _ = fix_file(filepath)
        if modified:
            total_fixed += 1
            total_replacements += reps
            print(f"  Fixed: {filepath.name} ({reps} changes)")
    
    print(f"\nDone: {total_fixed} files modified, {total_replacements} total replacements")

if __name__ == "__main__":
    main()
