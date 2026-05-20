import re, glob

files = glob.glob(r"C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\build\*.*")

# Case-insensitive replacements using regex
replacements = [
    (r'Frozen Sick', 'The Pale Sickness', True),
    (r'frozen sick', 'the Pale Sickness', True),
    (r'Aeorian', 'Aevorian', True),
    (r'Aeor', 'Aevor', True),
    (r'Exandria', 'Aevoria', True),
    (r'Eiselcross', 'Northreach', True),
    (r'Uthodurn', 'Oakhaven', True),
    (r'D&D 5e', '5e', True),
    (r'D&D', '5e', True),
    (r'Dungeons & Dragons', 'this tabletop RPG', True),
    (r'Dungeons and Dragons', 'this tabletop RPG', True),
    (r'Critical Role', 'fan-created content', True),
]

disclaimer = """\n---\n## Fan Content Disclaimer\n\nThis is unofficial fan content permitted under the Wizards of the Coast Fan Content Policy. This content is not approved or endorsed by Wizards of the Coast.  It is original work inspired by Dungeons & Dragons (5th Edition SRD) and is not derived from any Wizards of the Coast published campaign setting.\n\n© 2026 Northwatch Wardens. This work uses the 5e SRD (System Reference Document) under the terms of the Open Gaming License.\n---\n"""

for filepath in files:
    if not (filepath.endswith('.md') or filepath.endswith('.txt') or filepath.endswith('.html')):
        continue

    print(f"Processing: {filepath}")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(filepath, 'r', encoding='latin-1') as f:
                content = f.read()
        except:
            print(f"  SKIP: cannot read file")
            continue

    original_len = len(content)

    for pattern, replacement, case_insensitive in replacements:
        if case_insensitive:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        else:
            content = content.replace(pattern, replacement)

    # Add disclaimer if not present (for markdown files)
    if filepath.endswith('.md') and 'Fan Content Disclaimer' not in content:
        content += disclaimer

    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

    print(f"  Done. Size: {original_len} -> {len(content)}")
