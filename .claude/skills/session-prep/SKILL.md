---
name: session-prep
description: Generate a focused one-page session prep document for an upcoming Northwatch Wardens session. Use when the DM asks to prep for a session, wants a session summary, needs to know what to run next, or says "what do I need for tonight."
disable-model-invocation: true
argument-hint: [adventure-name] [party-level] [session-notes]
allowed-tools: Read Glob
---

$ARGUMENTS

`campaign-context --roster --adventure <name if given>`

Ask for anything still missing: adventure name, party level, last session recap (1–2 sentences — the one thing files can't provide).

Produce the six sections from [output-format.md](references/output-format.md). Under 600 words total.

Ask: "Save to `Season 1/DM_Resources/Session_<date>_Prep.md`?"

`skill-self-review session-prep` (add `--agentic` if running inside an agent)
