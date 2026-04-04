---
name: new-npc
description: Create a new NPC for the Northwatch Wardens campaign. Use when the user wants to add a character, create a villain or ally, design a named NPC, or populate an adventure with someone specific.
disable-model-invocation: true
argument-hint: [name] [role/concept] [adventure-or-location]
allowed-tools: Read Write Grep Glob
---

Create a new NPC for the Northwatch Wardens campaign.

$ARGUMENTS

## Step 1 — Gather inputs

Collect anything not in $ARGUMENTS:
- NPC name?
- Role/concept? (e.g., "corrupt town guard captain", "anxious herbalist who knows too much")
- Which adventure or location do they appear in?

## Step 2 — Research

1. Read `Season 1/Campaign Assets/DM Guild Roster.md` — check for naming conflicts and understand existing roster tone
2. Scan `LionsdenGameFiles/Northwatch_Wardens.xml` for the highest existing `<uid>` value — assign the next integer

## Step 3 — Generate both representations

See [templates.md](references/templates.md) for exact formats.

### A. Homebrewery stat block (`{{monster,frame}}`)

Include:
- Full ability scores (STR/DEX/CON/INT/WIS/CHA) with modifiers
- Skills, saves, senses, languages, CR, XP
- Attack notation: `+X to hit, reach/range, XdY+Z [type] damage`
- Traits and Actions
- One campaign-specific flavor trait hinting at personality (or a subtle Aeorian Echo connection if thematically appropriate)

Follow with a `{{note}}` personality block:
- Speech pattern / verbal mannerism — include 1 example line of dialogue
- What they know (useful to the party)
- What they want (their goal or motivation)
- Secrets (DM only)

### B. XML `<npc>` entry (Game Master 5e v5 format)

Required fields: `uid`, `name`, `enemy` (0=ally/neutral, 1=hostile), `ac`, `armor`, `hpMax`, `hpCurrent`, `hd`, `speed`, `abilities`, `passive`, `languages`, `cr`

Include `<trait>` and `<action>` elements with `<attack><atk>` and `<dmg>` for attacks.
Use CDATA for multi-line text: `<![CDATA[...]]>`

## Step 4 — Update the roster

Append the NPC to `Season 1/Campaign Assets/DM Guild Roster.md` using the existing format in that file.

## Step 5 — Ask about XML insertion

"Should I also insert this NPC's XML entry into `LionsdenGameFiles/Northwatch_Wardens.xml`?"

## Step 6 — Present results

Show:
1. The Homebrewery stat block + `{{note}}` personality block
2. The XML entry
3. Confirmation that the roster entry was appended

Character should feel specific — show who they are through behavior and speech, not descriptions. The 1–2 example dialogue lines are required.
