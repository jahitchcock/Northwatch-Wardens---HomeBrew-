#!/usr/bin/env python3
import os

file_path = r'build\A-DMs-guide-to-aevoria.txt'

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Emojis to remove
emojis = [
    '🧩', '🎯', '🔥', '📦', '🔮', '⚔️', '🗡️', '🌊', '🎭', '🛡️', 
    '📖', '📋', '📚', '🐺', '❄️', '🐉', '🌲', '🌑', '🌙', '🕯️', '⚱️',
    '🗺️', '🧭', '🏔️', '⛰️', '🌋', '🏜️', '🌳', '🌴', '💧', '⚡',
    '🌩️', '☔', '👑', '🗝️', '⛓️', '🔗', '💰', '🎁', '👸', '🤴',
    '🧝', '🧙', '😈', '💀', '📜', '👥', '🎪', '🪦', '🌍'
]

# Remove each emoji and its variations
for emoji in emojis:
    # Remove emoji with variation selector (U+FE0F)
    content = content.replace(emoji + '\ufe0f', '')
    # Remove emoji without variation selector
    content = content.replace(emoji, '')

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully removed all unwanted emojis from {file_path}")
