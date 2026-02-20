
# Extract specific sections from both versions to find source file changes
import re

with open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8') as f:
    homebrewery = f.read()

with open('Season_0_Character_Integration_Prompts.md', 'r', encoding='utf-8') as f:
    source_s0_prompts = f.read()

with open('README.md', 'r', encoding='utf-8') as f:
    source_readme = f.read()

with open('Season 1/SESSION_0_QUICK_START.md', 'r', encoding='utf-8') as f:
    source_s0_quickstart = f.read()

# Find Session_0_Character_Integration section in Homebrewery
s0_start = homebrewery.find('# Session 0: Character Integration')
s0_end = homebrewery.find('## Using Answers in Play', s0_start)

if s0_start > 0 and s0_end > 0:
    hb_s0 = homebrewery[s0_start:s0_end]
    
    # Compare first 500 chars
    print("=== SESSION 0 CHARACTER INTEGRATION COMPARISON ===\n")
    print("HOMEBREWERY (first 400 chars):")
    print(repr(hb_s0[:400]))
    print("\nSOURCE FILE (first 400 chars):")
    print(repr(source_s0_prompts[:400]))
    
    # Check if they're the same
    if hb_s0 == source_s0_prompts:
        print("\n✓ Session 0 Prompts SOURCE EXACTLY MATCHES Homebrewery")
    else:
        print("\n✗ Session 0 Prompts SOURCE DIFFERS from Homebrewery")
        # Find first difference
        for i, (h, s) in enumerate(zip(hb_s0, source_s0_prompts)):
            if h != s:
                print(f"  First diff at char {i}")
                print(f"  Homebrewery: {repr(hb_s0[max(0,i-50):i+100])}")
                print(f"  Source: {repr(source_s0_prompts[max(0,i-50):i+100])}")
                break

# Check README
readme_start = homebrewery.find('# Welcome to Aevoria')
readme_end = homebrewery.find('# Using This Guide', readme_start)

if readme_start > 0 and readme_end > 0:
    hb_readme = homebrewery[readme_start:readme_end]
    
    # Get README content (it starts with 'Welcome to Aevoria')
    readme_content_start = source_readme.find('# Welcome to Aevoria')
    readme_content_end = source_readme.find('# Using This Guide', readme_content_start)
    if readme_content_end < 0:
        readme_content_end = source_readme.find('##', readme_content_start + 50)
    
    if readme_content_start > 0:
        src_readme = source_readme[readme_content_start:readme_content_end] if readme_content_end > 0 else source_readme[readme_content_start:]
        
        print("\n\n=== README.md COMPARISON ===")
        if hb_readme == src_readme:
            print("✓ README SOURCE EXACTLY MATCHES Homebrewery")
        else:
            print("✗ README SOURCE DIFFERS from Homebrewery")
            print(f"  Homebrewery length: {len(hb_readme)}")
            print(f"  Source length: {len(src_readme)}")
