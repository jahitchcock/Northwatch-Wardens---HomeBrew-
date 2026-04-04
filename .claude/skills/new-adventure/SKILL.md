---
name: new-adventure
description: Scaffold a new adventure for Northwatch Wardens Season One. Use when the user wants to create, design, write, or add a new adventure to the campaign.
disable-model-invocation: true
argument-hint: [adventure-name] [level-range] [location] [premise]
allowed-tools: Read Write Glob Bash
---

Scaffold a new adventure for Northwatch Wardens: Season One.

$ARGUMENTS

## Step 1 — Gather inputs

Collect anything not in $ARGUMENTS:
- Adventure name?
- Level range?
- Setting location? *(must be from the canonical list in [requirements.md](references/requirements.md))*
- Brief premise? (or ask if you should suggest one based on the location)

## Step 2 — Canonical fit check

Look up the location in the canonical geography table in [requirements.md](references/requirements.md).

If it's **not listed**, stop and ask:
> "That location isn't in canonical Northreach. Available locations: [list]. Use one of these, or should we discuss adding a new one?"

Do not proceed until the location is confirmed canonical.

## Step 3 — Read the template

Read `.github/templates/adventure_template.md` to understand the required structure before generating content.

## Step 4 — Create the adventure files

Create:
- `Season 1/Adventures/<AdventureName>/<AdventureName>.md` — full Homebrewery-formatted adventure
- `Season 1/Adventures/<AdventureName>/<AdventureName>.json` — companion JSON with NPC/creature stat blocks

See [requirements.md](references/requirements.md) for the complete adventure `.md` checklist and tone guidance.

Key tone rules (applied throughout):
- Grounded frontier realism: tactile, visceral, understated menace
- Read-aloud text: 2–4 sentences, sensory-first, end with a hook
- Avoid: dictating PC emotions, "ancient evil", "mystical power", overwrought adjectives

## Step 5 — Ask about optional additions

After the files are created:
1. "Add an `<adventure>` XML entry to `LionsdenGameFiles/Northwatch_Wardens.xml`?"
2. "Add this adventure to `build/dms-guide-toc.json`?"

## Step 6 — Report

Show the file paths created. Remind the user to run `/build` to verify the adventure compiles correctly.