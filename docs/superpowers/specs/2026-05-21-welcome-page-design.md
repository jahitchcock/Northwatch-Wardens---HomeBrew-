# Welcome Page Design

**Date:** 2026-05-21  
**Status:** Approved

## Goal

Add a landing page to the DM dashboard that auto-loads on startup and is accessible via a Home tab. Content is split equally between an Aevoria world intro and a session-reference guide to the panel's most-used features.

## File

`gm-lore/welcome.md` — rendered by the existing web markdown pipeline (same style as all gm-lore files).

## Content Structure

1. Campaign header — Northwatch Wardens / Aevoria tagline, tone, premise (3–4 sentences)
2. The World at a Glance — Northreach geography, the Aeorian Echo mystery, faction overview as 1-line bullets
3. Using This Dashboard — session-reference (not tutorial):
   - Tabs — what each opens
   - Season filter — scopes Adventures + NPCs tree
   - Search — full-text across all files
   - Tools menu — random encounter, treasure hoard, world tables, calendar
   - Terminal — build commands; `⊞` button sends current file path
   - Blue dotted links — open NPC/location popups without leaving current file

## Wiring

- `index.html`: add `<button class="tab" data-path="gm-lore/welcome.md">Home</button>` as the leftmost tab
- `app.js` DOMContentLoaded: call `openPath('gm-lore/welcome.md')` after `fillTree`
