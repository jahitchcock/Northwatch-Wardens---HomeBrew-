---
name: validate-canon
description: Validate Northwatch Wardens content against campaign canon â€” geography names and NPC proper names. Use as a self-check step after generating new adventures or NPCs, or call directly for a quick canon scan. Runs geography and NPC checks in parallel. Triggers on: validate content, canon check, check locations, check NPC names.
argument-hint: [file-path | pasted-text]
allowed-tools: Read Grep Glob
---

Target: **$ARGUMENTS**

**Parallel:** load `canon-check/references/canonical-data.md` + `Season 1/DM_Resources/DM Guild Roster.md`

**Geography:** grep for location-ending nouns (`Village`, `Cave`, `Tower`, `Inn`, `Farm`, `Ruins`, `Keep`, `Pass`, `Forest`, `Mine`) and proper nouns after "in/at/near/to/from". Flag any not in the canonical list or off-map references.

**NPC names:** grep for specific proper names (not generic roles like "the innkeeper"). Flag any not in the roster or core guild NPCs.

Report: flagged name | line | suggested fix. Nothing flagged â†’ `Canon check passed.`

`skill-self-review validate-canon --agentic`
