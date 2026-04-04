#!/usr/bin/env python3
# Final emoji cleanup
path = r'c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\build\A-DMs-guide-to-aevoria.txt'

with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Remove using Unicode escape sequences
text = text.replace('\U0001f43a', '')  # 🐺 wolf
text = text.replace('\U0001f5e1\ufe0f', '')  # 🗡️ sword with variation
text = text.replace('\U0001f5e1', '')  # 🗡 sword without variation
text = text.replace('\U0001f30a', '')  # 🌊 water
text = text.replace('\U0001f3ad', '')  # 🎭 theater

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Final cleanup complete")
