#!/usr/bin/env python3
import re

file_path = r'c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\build\A-DMs-guide-to-aevoria.txt'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# All remaining emojis to remove
remaining_emojis = ['📋', '🐺', '🗡️', '🌊', '🎭']

for emoji in remaining_emojis:
    # Handle emoji with variation selector and without
    content = content.replace(emoji + '\ufe0f', '')
    content = content.replace(emoji, '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All remaining emojis removed successfully")
