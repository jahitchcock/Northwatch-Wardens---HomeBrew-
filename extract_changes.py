import re
import difflib

# Load both versions
with open('build/A-DMs-guide-to-aevoria.txt.backup', 'r', encoding='utf-8') as f:
    original = f.read()
    
with open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8') as f:
    homebrewery = f.read()

# Split by lines for comparison
orig_lines = original.split('\n')
hw_lines = homebrewery.split('\n')

print(f"Original: {len(orig_lines)} lines")
print(f"Homebrewery: {len(hw_lines)} lines")
print(f"Difference: {len(hw_lines) - len(orig_lines)} lines\n")

# Find meaningful differences (skip pagination and metadata)
changes = []
for i in range(min(len(orig_lines), len(hw_lines))):
    if i > 50:  # Skip metadata at top
        orig = orig_lines[i].rstrip()
        hb = hw_lines[i].rstrip()
        
        if orig != hb:
            # Skip pure page number changes
            if not (orig.endswith('**') and hb.endswith('**') and 
                    re.match(r'^.*—\s+\*\*\d+\*\*$', orig) and 
                    re.match(r'^.*—\s+\*\*\d+\*\*$', hb)):
                changes.append({
                    'line': i,
                    'orig': orig,
                    'new': hb
                })

print(f"Total meaningful changes: {len(changes)}\n")

# Show changes grouped by type
content_changes = [c for c in changes if c['orig'] and c['new'] and len(c['orig']) > 10 and len(c['new']) > 10]
additions = [c for c in changes if not c['orig'] and c['new']]
deletions = [c for c in changes if c['orig'] and not c['new']]

print(f"Content modifications: {len(content_changes)}")
print(f"Additions: {len(additions)}")
print(f"Deletions: {len(deletions)}\n")

if content_changes:
    print("=== CONTENT CHANGES ===")
    for change in content_changes[:15]:
        print(f"\nLine {change['line']}:")
        print(f"  OLD: {change['orig'][:90]}")
        print(f"  NEW: {change['new'][:90]}")

if additions:
    print("\n=== ADDITIONS ===")
    for change in additions[:15]:
        print(f"  Line {change['line']}: {change['new'][:100]}")

if deletions:
    print("\n=== DELETIONS ===")
    for change in deletions[:15]:
        print(f"  Line {change['line']}: {change['orig'][:100]}")
