---
name: new-adventure
description: Scaffold a new adventure for Northwatch Wardens Season One. Use when the user wants to create, design, write, or add a new adventure to the campaign.
disable-model-invocation: true
argument-hint: [adventure-name] [level-range] [location] [premise]
allowed-tools: Read Write Glob Bash
---

$ARGUMENTS

Infer name, level range, location, premise from $ARGUMENTS. Offer to suggest a premise if not given.

**Parallel:** `validate-canon <location>` + read `.github/templates/adventure_template.md`

Stop if location fails canon check — present the valid list and ask which to use.

Read [requirements.md](references/requirements.md) for the checklist, Homebrewery syntax, and tone rules.

**Parallel:** create `Season 1/Adventures/<Name>/<Name>.md` + `Season 1/Adventures/<Name>/<Name>.json`

`validate-canon` on generated files. Fix silently.

Ask once: "Add XML entry to `Northwatch_Wardens.xml`? Add to `build/dms-guide-toc.json`?"
→ XML: `xml-manager insert-adventure`

Report file paths. Remind: "Run `/build` to verify."

`skill-self-review new-adventure` (add `--agentic` if running inside an agent)
