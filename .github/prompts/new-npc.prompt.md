---
description: 'Create a new NPC with Homebrewery stat block, XML entry, and roster update for Northwatch Wardens'
---

# New NPC

Create a complete NPC for the Northwatch Wardens campaign with all three representations.

## Required Inputs

Collect from the user:
- **NPC name**
- **Role/concept** (e.g., "corrupt town guard captain", "anxious herbalist who knows too much")
- **Adventure or location** they appear in

## Step 1 — Research

1. Read `Season 1/Campaign Assets/DM Guild Roster.md` — check for naming conflicts
2. Scan `LionsdenGameFiles/Northwatch_Wardens.xml` for highest existing `<uid>` — assign next integer

## Step 2 — Generate Homebrewery Stat Block

Use `{{monster,frame}}` format:
- Full ability scores (STR/DEX/CON/INT/WIS/CHA) with modifiers
- Skills, saves, senses, languages, CR, XP
- Attack notation: `+X to hit, reach/range, XdY+Z [type] damage`
- One campaign-specific flavor trait

Follow with a `{{note}}` personality block:
- Speech pattern + 1 example dialogue line
- What they know (useful to party)
- What they want (goal/motivation)
- Secrets (DM only)

## Step 3 — Generate XML Entry

Game Master 5e v5 `<npc>` format:
- Required: `uid`, `name`, `enemy`, `ac`, `armor`, `hpMax`, `hpCurrent`, `hd`, `speed`, `abilities`, `passive`, `languages`, `cr`
- Include `<trait>` and `<action>` elements
- CDATA for multi-line text

## Step 4 — Update Roster

Append NPC to `Season 1/Campaign Assets/DM Guild Roster.md` using existing format.

## Step 5 — Offer XML Insertion

"Insert this NPC's XML entry into `LionsdenGameFiles/Northwatch_Wardens.xml`?"

## Quality Standard

Characters must feel specific — show who they are through behavior and speech, not descriptions. The example dialogue lines are required. No cardboard-cutout NPCs.
