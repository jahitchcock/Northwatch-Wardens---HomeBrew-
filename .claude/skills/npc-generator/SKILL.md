---
name: npc-generator
description: Generate a complete Northwatch Wardens NPC — Homebrewery stat block, personality note block, and GM5e XML entry — all in one pass. Use whenever any skill needs to produce a campaign NPC, whether standalone or embedded inside an adventure. Triggers on: create NPC, generate character, new villain, new ally, add NPC to adventure.
argument-hint: [name] [role/concept] [location] [uid] [hostile|ally]
allowed-tools: Read
---

$ARGUMENTS

Read [templates.md](../new-npc/references/templates.md) for exact formats. Generate all three in one pass:

- **Stat block** (`{{monster,frame}}`): calibrated ability scores, skills, saves, senses, languages, CR/XP, attacks (`+X to hit, XdY+Z [type]`), one behavioral flavor trait (Aeorian Echo if resonant — shown, never named)
- **Personality note** (`{{note}}`): voice in one phrase, one dialogue line that sounds exactly like this person, Knows / Wants / Secret
- **XML** (GM5e v5): provided UID, `<enemy>` 0=ally/1=hostile, `<trait>`/`<action>` with `<attack>` sub-elements, CDATA for multi-line text

Show personality through behavior and dialogue, not adjectives.

`skill-self-review npc-generator --agentic`
