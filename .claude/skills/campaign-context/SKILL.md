---
name: campaign-context
description: Read Northwatch Wardens campaign state â€” NPC roster, an active adventure file, canonical location data, and/or the current max XML UID. Use whenever a skill needs campaign context before generating content, so multiple files are read in one coordinated call rather than scattered sequential reads across a workflow.
argument-hint: [--roster] [--adventure <name>] [--canonical] [--uid]
allowed-tools: Read Grep Glob
---

**$ARGUMENTS** (omit flags â†’ read all)

Read all requested items in parallel:

- `--roster` â†’ `Season 1/DM_Resources/DM Guild Roster.md`
- `--adventure <name>` â†’ `Season 1/Adventures/<name>/<name>.md`
- `--canonical` â†’ `canon-check/references/canonical-data.md`
- `--uid` â†’ grep `<uid>` in `LionsdenGameFiles/Northwatch_Wardens.xml`, return highest + 1

Return labelled sections of raw context. No prose summary.

`skill-self-review campaign-context --agentic`
