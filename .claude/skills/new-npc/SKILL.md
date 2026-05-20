---
name: new-npc
description: Create a new NPC for the Northwatch Wardens campaign. Use when the user wants to add a character, create a villain or ally, design a named NPC, or populate an adventure with someone specific.
disable-model-invocation: true
argument-hint: [name] [role/concept] [adventure-or-location]
allowed-tools: Read Write Grep Glob
---

$ARGUMENTS

Infer name, role, location, hostile/ally from $ARGUMENTS. Generate a frontier-appropriate name if none given. Ask only for what's genuinely missing.

**Parallel:** `campaign-context --roster --uid`

`npc-generator <name> <role> <location> <uid> <hostile|ally>`

**Parallel:** append roster entry to `Season 1/DM_Resources/DM Guild Roster.md` + `validate-canon` on output. Fix any issues silently.

Present stat block, `{{note}}`, XML entry, roster confirmation.

Ask once: "Insert XML into `LionsdenGameFiles/Northwatch_Wardens.xml`?" â†’ if yes, `xml-manager insert-npc`.

`skill-self-review new-npc` (add `--agentic` if running inside an agent)
