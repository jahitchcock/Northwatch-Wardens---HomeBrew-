---
name: session-prep
description: Generate a focused one-page session prep document for an upcoming Northwatch Wardens session. Use when the DM asks to prep for a session, wants a session summary, needs to know what to run next, or says "what do I need for tonight."
disable-model-invocation: true
argument-hint: [adventure-name] [party-level] [session-notes]
allowed-tools: Read Glob
---

Generate a focused session prep document for the Northwatch Wardens campaign.

$ARGUMENTS

## Step 1 — Gather context

Ask for anything not provided in $ARGUMENTS:
- Which adventure(s) are currently active?
- Approximate party level?
- What happened last session? (1–2 sentences is fine)

## Step 2 — Research

Read these files in order:
1. The active adventure's `.md` file: `Season 1/Adventures/<AdventureName>/<AdventureName>.md`
2. `Season 1/Campaign Assets/DM Guild Roster.md` — for NPC voices and secrets
3. `Season 1/DM_Resources/Session_Prep_Guide.md` — for format guidance (skip if it doesn't exist)

Focus on what's *immediately* relevant to the next session, not the whole adventure.

## Step 3 — Generate the document

Produce exactly the six sections defined in [output-format.md](references/output-format.md). Keep the whole document under 600 words — this is a quick-reference tool, not an essay.

## Step 4 — Offer to save

Ask: "Want me to save this to `Season 1/DM_Resources/Session_<date>_Prep.md`, or is this just for the conversation?"
