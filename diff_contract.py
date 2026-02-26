import difflib

bl = open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8').readlines()
el = open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8').readlines()

bc = next(i for i,l in enumerate(bl) if 'Contract: W' in l and l.startswith('# **'))
ec = next(i for i,l in enumerate(el) if 'Contract: W' in l and l.startswith('# **'))
be = next(i for i,l in enumerate(bl) if 'Wolves of Welton' in l and l.startswith('## Wolves'))
ee = next(i for i,l in enumerate(el) if 'Wolves of Welton' in l and l.startswith('## Wolves'))

bsec = bl[bc:be]
esec = el[ec:ee]
print(f'Contract section: build={len(bsec)} lines, export={len(esec)} lines')

def norm(s):
    return s.replace('\u2019', "'").replace('\u2018', "'").replace('\u201c', '"').replace('\u201d', '"')

diffs = list(difflib.unified_diff(esec, bsec, n=0, lineterm=''))
structural = 0
quote_only = 0
blank = 0
for d in diffs:
    if d.startswith('---') or d.startswith('+++') or d.startswith('@@'):
        continue
    line = d[1:]
    if line.strip() == '':
        blank += 1
    elif norm(line) != line:
        quote_only += 1
    else:
        structural += 1
        print(f'STRUCT: {repr(d[:100])}')

print(f'Quote-only: {quote_only}, Blank: {blank}, Structural: {structural}')
