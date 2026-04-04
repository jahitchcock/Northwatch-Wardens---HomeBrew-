"""Repaginate Places_Secrets.md with proper Homebrewery page and column breaks."""
import re

filepath = r"c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\World Building\DMEyesOnly\Places_Secrets.md"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original length: {len(content)} chars, {content.count(chr(10))+1} lines")
print(f"Existing \\page: {content.count(chr(92)+'page')}")

# ============ PASS 1: Remove existing pagination markers ============
# Pattern: {{pageNumber,auto}}\n{{footnote ...}}\n\n\page
content = re.sub(
    r'\n*\{\{pageNumber,auto\}\}\n\{\{footnote Places of Northreach: DM Secrets\}\}\n+\\page\n*',
    '\n\n',
    content
)

# Normalize excessive blank lines (4+ newlines → 3)
content = re.sub(r'\n{4,}', '\n\n\n', content)

lines = content.split('\n')
print(f"After cleanup: {len(lines)} lines")

# ============ Find headings and separators ============
heading_pos = {}
for i, line in enumerate(lines):
    s = line.strip()
    if re.match(r'^#{1,3}\s', s):
        heading_pos.setdefault(s, []).append(i)

seps = sorted([i for i, l in enumerate(lines) if l.strip() == '---'])

# ============ Define page boundaries ============
# Each entry = the heading that starts a new page (page break goes before it)
ps_headings = [
    "## The Waystone Inn: Hidden Depths",        # Page 2
    "### The Inn's Secret Spaces",                # Page 3
    "### What Happened Here Before",              # Page 4
    "## Welton: Dark Undercurrents",              # Page 5
    "### Westly's Farm: Ground Zero",             # Page 6
    "### The Shepherd's Crook Inn: Information Hub",# Page 7
    "### The Old Woods North of Welton",          # Page 8
    "## Pinebrook: Commerce and Conspiracy",      # Page 9
    "### The Pine Lodge: Watching Eyes",           # Page 10
    "### Abandoned Logging Camp (North of Pinebrook)", # Page 11
    "## Palebank Village: Death and Secrets",      # Page 12
    "### Urgon's Cabin: What He Brought Back",    # Page 13
    "### The Frostwatch: Compromised Security",   # Page 14
    "## Croaker Cave: Criminal Base",             # Page 15
    "### Hulil's Knowledge",                      # Page 16
    "### Current State",                          # Page 17 (Salsvault's, first occurrence)
    "### The Command Center",                     # Page 18
    "## Temple of the Dragonknights: Heroic Tomb",# Page 19
    "### Adventure Hooks",                        # Page 20
    "### The Tower's Contents",                   # Page 21
    "### Potential Alliance",                     # Page 22
    "### The Old Places",                         # Page 23
    "## The Pattern of Sites",                    # Page 24
    "## Regional Threats and Connections",         # Page 25
    "### The Entity's Nature",                    # Page 26
    "## Using Location Secrets",                  # Page 27
    "### Multiple Paths",                         # Page 28
    "## Campaign Integration",                    # Page 29
]

# Resolve each heading to its line index (first unused match)
used = set()
ps_lines = []
for h in ps_headings:
    found = False
    for idx in heading_pos.get(h, []):
        if idx not in used:
            ps_lines.append(idx)
            used.add(idx)
            found = True
            break
    if not found:
        print(f"  WARNING: heading not found: '{h}'")

ps_set = set(ps_lines)
print(f"Page start headings resolved: {len(ps_lines)}")

# For each page-start heading, find the nearest preceding --- (within 8 lines)
sep_for = {}  # heading_line_idx -> separator_line_idx
for h_idx in ps_lines:
    for s in reversed(seps):
        if h_idx - 8 <= s < h_idx:
            sep_for[h_idx] = s
            break

# Track which separators are "break separators"
break_seps = set(sep_for.values())

# ============ Build output with page breaks (no \column yet) ============
out = []
i = 0
while i < len(lines):
    line = lines[i]

    # Is this a --- that is a page-break separator?
    if line.strip() == '---' and i in break_seps:
        # Find which heading this separator precedes
        target_h = None
        for h_idx, s_idx in sep_for.items():
            if s_idx == i:
                target_h = h_idx
                break

        out.append(line)  # output the ---
        out.append('')
        out.append('{{pageNumber,auto}}')
        out.append('{{footnote Places of Northreach: DM Secrets}}')
        out.append('')
        out.append('\\page')
        out.append('')
        # Skip blank lines between --- and heading
        i = target_h
        continue

    # Is this a page-start heading with NO preceding ---?
    if i in ps_set and sep_for.get(i) is None:
        # Trim trailing blanks from output
        while out and out[-1].strip() == '':
            out.pop()
        out.append('')
        out.append('{{pageNumber,auto}}')
        out.append('{{footnote Places of Northreach: DM Secrets}}')
        out.append('')
        out.append('\\page')
        out.append('')

    out.append(line)
    i += 1

# Add final page footer at end of file
while out and out[-1].strip() == '':
    out.pop()
out.append('')
out.append('{{pageNumber,auto}}')
out.append('{{footnote Places of Northreach: DM Secrets}}')

# Join and normalize blank lines
content2 = '\n'.join(out)
content2 = re.sub(r'\n{4,}', '\n\n\n', content2)

print(f"After page breaks: {content2.count(chr(92) + 'page')} \\page markers")

# ============ PASS 2: Insert column markers ============
# Split by \page, process each page, rejoin
parts = re.split(r'(\\page)', content2)
# parts alternates: [page_content, '\\page', page_content, '\\page', ...]

def find_column_pos(plines, content_start, content_end):
    """Find the best position for \\column at ~50% of the page content.
    Prefers section breaks (bold headers, ### headings) over mid-list positions."""
    size = content_end - content_start + 1
    if size < 50:
        return None

    mid = content_start + size // 2
    lo = max(content_start + 3, mid - 15)
    hi = min(content_end - 3, mid + 15)

    # Priority 1: blank line before a bold header (**Something:**) or ### heading
    cands = []
    for j in range(lo, hi):
        if plines[j].strip() == '':
            for k in range(j + 1, min(j + 3, len(plines))):
                nxt = plines[k].strip()
                if nxt:
                    if (nxt.startswith('**') and ':**' in nxt) or nxt.startswith('###') or nxt == '---':
                        cands.append((abs(j - mid), j))
                    break
    if cands:
        cands.sort()
        return cands[0][1]

    # Priority 2: blank line before any bold text
    cands = []
    for j in range(lo, hi):
        if plines[j].strip() == '':
            for k in range(j + 1, min(j + 3, len(plines))):
                nxt = plines[k].strip()
                if nxt:
                    if nxt.startswith('**'):
                        cands.append((abs(j - mid), j))
                    break
    if cands:
        cands.sort()
        return cands[0][1]

    # Priority 3: blank line NOT between list items
    cands = []
    for j in range(lo, hi):
        if plines[j].strip() == '':
            prev_list = any(plines[k].strip().startswith('- ') for k in range(max(0, j-2), j) if plines[k].strip())
            next_list = any(plines[k].strip().startswith('- ') for k in range(j+1, min(len(plines), j+3)) if plines[k].strip())
            if not (prev_list and next_list):
                cands.append((abs(j - mid), j))
    if cands:
        cands.sort()
        return cands[0][1]

    # Priority 4: any blank line (fallback)
    cands = []
    for j in range(lo, hi):
        if plines[j].strip() == '':
            cands.append((abs(j - mid), j))
    if cands:
        cands.sort()
        return cands[0][1]

    return None

final_parts = []
col_count = 0

for pidx, part in enumerate(parts):
    if part == '\\page':
        final_parts.append(part)
        continue

    plines = part.split('\n')

    # Find actual content boundaries (skip blanks and {{...}} footer lines)
    content_start = 0
    for j in range(len(plines)):
        if plines[j].strip() and not plines[j].strip().startswith('{{'):
            content_start = j
            break

    content_end = len(plines) - 1
    for j in range(len(plines) - 1, -1, -1):
        if plines[j].strip() and not plines[j].strip().startswith('{{'):
            content_end = j
            break

    pos = find_column_pos(plines, content_start, content_end)
    if pos is not None:
        plines.insert(pos + 1, '\\column')
        col_count += 1

    final_parts.append('\n'.join(plines))

result = ''.join(final_parts)

# Final cleanup of excessive blank lines
result = re.sub(r'\n{4,}', '\n\n\n', result)

# Ensure file ends with single newline
result = result.rstrip('\n') + '\n'

# ============ Write result ============
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(result)

# ============ Report ============
page_count = result.count('\\page') + 1
print(f"\n=== RESULTS ===")
print(f"Total pages: {page_count}")
print(f"\\page breaks: {result.count(chr(92) + 'page')}")
print(f"\\column breaks: {col_count}")
print(f"Total lines: {len(result.split(chr(10)))}")

# Per-page breakdown
page_parts = re.split(r'\\page', result)
print(f"\nPage breakdown:")
for i, p in enumerate(page_parts):
    pl = len(p.split('\n'))
    has_col = '\\column' in p
    # Find first heading
    first_h = ""
    for ln in p.split('\n'):
        if re.match(r'^#{1,3}\s', ln.strip()):
            first_h = ln.strip()[:60]
            break
    print(f"  Page {i+1:2d}: {pl:3d} lines | col: {'Y' if has_col else 'N'} | {first_h}")
