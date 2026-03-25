"""Repaginate the Glossary from ~22 pages (one per letter) to ~6 dense pages.
Uses section-based split/reassemble for reliability."""
import re
import os

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
filepath = os.path.join(base, "World Building", "Appendix", "Glossary.md")

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

FOOTER = '{{pageNumber,auto}}\n{{footnote GLOSSARY OF AEVORIA}}'

# Split the file into sections using the footer+\page pattern as delimiter
DELIM_PATTERN = r'\{\{pageNumber,auto\}\}\s*\n\{\{footnote GLOSSARY OF AEVORIA\}\}\s*\n+\\page\s*\n*'
sections = re.split(DELIM_PATTERN, content)

# Remove empty trailing sections
sections = [s for s in sections if s.strip()]

# Debug: print section count and first line of each
print(f"Found {len(sections)} sections:")
for i, s in enumerate(sections):
    first_line = s.strip().split('\n')[0][:60]
    lines = len(s.strip().split('\n'))
    print(f"  [{i}] ({lines} lines) {first_line}")

# Page groupings (section indices):
#   0=Intro+A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J, 10=K
#   11=L, 12=M, 13=N, 14=O, 15=P, 16=Q, 17=R, 18=S, 19=T, 20=U, 21=V
#   22=W, 23=X, 24=Y, 25=Z+Pronunciation+CrossReference

pages = [
    {'sections': [0, 1, 2],    'col_before': [1]},      # P1: col before B
    {'sections': [3, 4, 5, 6], 'col_before': [5]},      # P2: col before F
    {'sections': [7, 8, 9, 10, 11, 12, 13, 14], 'col_before': [12]},  # P3: col before M
    {'sections': [15, 16, 17, 18], 'col_before': [18]},  # P4: col before S
    {'sections': [19, 20, 21, 22, 23, 24], 'col_before': [22]}, # P5: col before W
    {'sections': [25],         'col_before': []},         # P6: Pronunciation+CrossRef
]

# Verify we have enough sections
max_idx = max(idx for page in pages for idx in page['sections'])
if max_idx >= len(sections):
    print(f"\nERROR: Expected at least {max_idx+1} sections, got {len(sections)}")
    print("Aborting. File NOT modified.")
    exit(1)

# Reassemble
output_parts = []
for page in pages:
    page_content = []
    for sec_idx in page['sections']:
        sec = sections[sec_idx].strip()
        
        # Remove any leading --- separator (cosmetic, before Pronunciation)
        if sec.startswith('---\n'):
            sec = sec[4:].strip()
        
        # Insert column break before this section if specified
        if sec_idx in page['col_before']:
            page_content.append('\\column')
        
        page_content.append(sec)
    
    # Join sections within the page with blank line separator
    page_text = '\n\n'.join(page_content)
    
    # Add footer at end of page
    page_text += '\n\n' + FOOTER
    
    output_parts.append(page_text)

# Join pages with \page separator
result = '\n\n\\page\n\n'.join(output_parts)

# Add final \page
result += '\n\n\\page\n'

# Cleanup: collapse 3+ consecutive blank lines
result = re.sub(r'\n{3,}', '\n\n', result)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(result)

# Report
new_pages = result.count('\\page')
new_cols = result.count('\\column')
new_lines = result.count('\n') + 1
print(f"\nGlossary repaginated: {new_pages} pages, {new_cols} column breaks")
print(f"Output: {new_lines} lines")
