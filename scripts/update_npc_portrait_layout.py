#!/usr/bin/env python3
"""
Update NPC files to use float:right portrait in Profile section.
- Adds portrait image (float:right) right after ## Profile heading
- Removes large portrait image from bottom of file
"""

import os
import re
import sys

NPC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "npcs")


def parse_frontmatter(content):
    """Extract frontmatter values from file content."""
    match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
    if not match:
        return {}
    fm = {}
    for line in match.group(1).splitlines():
        if ':' in line:
            key, _, value = line.partition(':')
            fm[key.strip()] = value.strip()
    return fm


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    fm = parse_frontmatter(content)
    portrait = fm.get('portrait', '').strip()
    name = fm.get('name', '').strip()

    if not portrait:
        return False, "no portrait"

    # Check if already has float:right portrait
    if '{float:right' in content or 'float:right' in content:
        return False, "already updated"

    # Find and remove bottom image line (the standalone ![...](portrait_url) line at end of file)
    # Match lines like: ![Name](url) possibly with trailing whitespace
    bottom_image_pattern = re.compile(
        r'\n!\[([^\]]*)\]\(' + re.escape(portrait) + r'\)\s*$',
        re.MULTILINE
    )
    new_content, n_removed = bottom_image_pattern.subn('', content)

    if n_removed == 0:
        # Try matching any bottom image with same URL (different alt text)
        bottom_image_pattern2 = re.compile(
            r'\n!\[[^\]]*\]\(' + re.escape(portrait) + r'\)\s*$',
            re.MULTILINE
        )
        new_content, n_removed = bottom_image_pattern2.subn('', content)

    # Insert float:right image after ## Profile heading
    profile_pattern = re.compile(r'(## Profile\n\n)')
    portrait_inline = f'![{name}]({portrait}) {{width:130px,float:right,margin:"0 0 10px 15px"}}\n\n'

    new_content, n_inserted = profile_pattern.subn(
        r'\1' + portrait_inline,
        new_content,
        count=1
    )

    if n_inserted == 0:
        return False, "no ## Profile section found"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, f"removed={n_removed}, inserted=1"


def main():
    updated = []
    skipped = []
    errors = []

    for root, dirs, files in os.walk(NPC_DIR):
        # Skip minor NPCs (they don't have portraits)
        dirs[:] = [d for d in dirs if d != 'minor']
        for fname in sorted(files):
            if not fname.endswith('.md') or fname in ('MANIFEST.md', '_template.md', 'index.md'):
                continue
            filepath = os.path.join(root, fname)
            try:
                ok, msg = process_file(filepath)
                if ok:
                    updated.append(f"  ✓ {os.path.relpath(filepath, NPC_DIR)} ({msg})")
                else:
                    skipped.append(f"  - {os.path.relpath(filepath, NPC_DIR)} ({msg})")
            except Exception as e:
                errors.append(f"  ✗ {os.path.relpath(filepath, NPC_DIR)}: {e}")

    print(f"\nUpdated ({len(updated)}):")
    for line in updated:
        print(line)

    print(f"\nSkipped ({len(skipped)}):")
    for line in skipped:
        print(line)

    if errors:
        print(f"\nErrors ({len(errors)}):")
        for line in errors:
            print(line)


if __name__ == '__main__':
    main()
