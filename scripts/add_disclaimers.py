import re, glob

files = glob.glob(r"C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\build\*.*")

disclaimer_txt = """\n\n---\nFAN CONTENT DISCLAIMER\n\nThis is unofficial fan content permitted under the Wizards of the Coast Fan Content Policy. This content is not approved or endorsed by Wizards of the Coast. It is original work inspired by Dungeons & Dragons (5th Edition SRD) and is not derived from any Wizards of the Coast published campaign setting.\n\n© 2026 Northwatch Wardens. This work uses the 5e SRD (System Reference Document) under the terms of the Open Gaming License.\n"""

disclaimer_html = """\n<div class="fan-disclaimer">\n<hr>\n<h2>Fan Content Disclaimer</h2>\n<p>This is unofficial fan content permitted under the Wizards of the Coast Fan Content Policy. This content is not approved or endorsed by Wizards of the Coast. It is original work inspired by Dungeons & Dragons (5th Edition SRD) and is not derived from any Wizards of the Coast published campaign setting.</p>\n<p>© 2026 Northwatch Wardens. This work uses the 5e SRD (System Reference Document) under the terms of the Open Gaming License.</p>\n</div>\n"""

for filepath in files:
    if not (filepath.endswith('.txt') or filepath.endswith('.html')):
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

    # Check if disclaimer already present
    if 'FAN CONTENT DISCLAIMER' in content or 'Fan Content Disclaimer' in content:
        print(f"  SKIP: disclaimer already present")
        continue

    original_len = len(content)

    if filepath.endswith('.txt'):
        content += disclaimer_txt
    elif filepath.endswith('.html'):
        content += disclaimer_html

    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

    print(f"  Done. Size: {original_len} -> {len(content)}")
