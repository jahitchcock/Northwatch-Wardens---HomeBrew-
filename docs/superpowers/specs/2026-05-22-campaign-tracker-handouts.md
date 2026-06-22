# Campaign Tracker & Handouts — Design Spec
**Date:** 2026-05-22  
**Status:** Approved

---

## Overview

Decompose `gm-lore/campaign-tracker.md` into two systems:

1. **Campaign Tracker** — a dedicated dashboard tab with interactive UI that reads/writes markdown files in `timeline/`
2. **Player Handouts** — individual print-ready markdown files in adventure folders, with a print endpoint

---

## 1. Timeline Folder Structure

```
timeline/
├── MANIFEST.md
├── party.md
├── contracts.md
├── npcs.md
├── clues.md
├── promises.md
├── treasure.md
└── sessions/
    ├── session-001.md
    ├── session-002.md
    └── ...
```

All files use standard markdown (tables and `- [x]`/`- [ ]` checkboxes). Git-tracked, human-readable outside the dashboard.

### File formats

**party.md**
```markdown
# Party Roster

| Player | Character | Class / Level | Status |
|--------|-----------|---------------|--------|
| | | | |
```

**contracts.md**
```markdown
# Contract Outcomes

## Wolves of Welton
- [ ] Completed
- [ ] Resolution: Negotiated
- [ ] Flame: Negotiated
- [ ] Bolt: Alive
...

### Notes
(freeform text)
```

**npcs.md**
```markdown
# NPC Status

| NPC | Location | Status | Relationship | Notes |
|-----|----------|--------|--------------|-------|
| Marshal Brenna Thorne | Waystone Inn | Alive | Ally | |
...
```

**clues.md**
```markdown
# Aevorian Echo — Clue Tracker

- [ ] Wolves of Welton: Alexi's note — word "Aevorian" legible
- [ ] The Pale Sickness: blue-vein plague caused by Aevorian relic
...

## Party Theories

(freeform text)
```

**promises.md**
```markdown
# Promises & Open Hooks

## Party Said They Would
- [ ] 

## Open Hooks
- [ ] 
```

**treasure.md**
```markdown
# Treasure & Magic Items

| Item | Found Where | Attuned By | Notes |
|------|-------------|------------|-------|
| | | | |

**Party Gold:** 0 gp  
**Stored at Waystone:** 0 gp
```

**sessions/session-NNN.md**
```markdown
---
session: 1
date: 
adventure: 
level: 
---

## Key Events


## MVP Moment

```

---

## 2. Tracker Tab UI

New "Tracker" tab added to the dashboard header nav (after Sessions tab position). When clicked:
- iframe is hidden
- `#panel-tracker` div is shown (full workspace width)

### Sub-navigation

Horizontal sub-nav inside the tracker panel:
```
[ Party ] [ Contracts ] [ NPCs ] [ Echo ] [ Promises ] [ Treasure ] [ Sessions ]
```

### Sub-sections

**Party**
- Editable table: player name, character name, class/level, status
- Add row / remove row buttons
- Saves to `timeline/party.md`

**Contracts**
- One collapsible block per adventure in campaign order
- Each outcome item = clickable checkbox with label
- Free-text notes textarea per contract
- Saves to `timeline/contracts.md`

**NPCs**
- Sortable table with inline editing
- Status: Alive / Dead / Unknown (dropdown)
- Relationship: Ally / Neutral / Enemy (dropdown)
- Notes: inline text field
- Saves to `timeline/npcs.md`

**Echo Clues**
- Checkbox list of known clue triggers (pre-populated from campaign data)
- Textarea for party theories
- Saves to `timeline/clues.md`

**Promises**
- Two checkbox lists: "Party Said They Would" / "Open Hooks"
- Inline add new item button
- Saves to `timeline/promises.md`

**Treasure**
- Editable table: item, found where, attuned by, notes
- Gold tracker: party gold field + stored at Waystone field
- Saves to `timeline/treasure.md`

**Sessions**
- List of past sessions (date, adventure, first line of key events)
- Click to expand/edit
- "＋ New Session" button — auto-increments session number, opens edit form
- Form fields: date, adventure (text), level, key events (textarea), MVP moment (text)
- Saves each session to `timeline/sessions/session-NNN.md`

### Auto-save behaviour

All fields save on blur. Small "Saved ✓" toast confirms write. No submit button.

---

## 3. Player Handouts

### File locations

Single-file adventures: companion folder named `{adventure}-handouts/`
```
adventures/season-1/
├── wolves-of-welton.md
├── wolves-of-welton-handouts/
│   ├── ww-1-contract.md
│   ├── ww-2-westlys-statement.md
│   ├── ww-3-shepherds-journal.md
│   ├── ww-4-father-merriksons-letter.md
│   └── ww-5-alexis-field-journal.md
```

Multi-file adventures (already directories):
```
adventures/season-1/the-pale-sickness/
├── index.md
├── handouts/
│   ├── ps-1-contract.md
│   ├── ps-2-tulgis-notes.md
│   ├── ps-3-urgons-notes.md
│   └── ps-4-travelers-contract.md
```

Other adventure handout folders to create:
- `opening-handouts/` — recruitment poster, warden's oath
- `the-wild-sheep-chase-handouts/` — Finethir's letter
- `peril-in-pinebrook-handouts/` — contract, caravan report
- `temple-of-the-dragonknights-handouts/` — contract, cult message
- `general-handouts/` — seasonal/general items (Hearthfire invitation, wanted poster, Elric's letter)

### Handout frontmatter

```yaml
---
title: Contract W-17
type: handout
when: When players accept the Wolves of Welton contract
---
```

Body is standard markdown — the handout content as-is.

### Print flow

- `openPath()` checks frontmatter for `type: handout`
- If found: `🖨 Print` button appears in toolbar (alongside `⌨ Path`)
- Click opens `/print?path=...` in a new tab
- `/print` endpoint serves a standalone HTML page — no dashboard chrome

### Print page styling

```css
body {
  font-family: 'Palatino Linotype', Palatino, serif;
  background: #f4e8c1;
  color: #1a0a00;
  max-width: 680px;
  margin: 40px auto;
  padding: 40px;
  border: 2px solid #8b6914;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.08);
}

@media print {
  body { margin: 0; box-shadow: none; }
  .no-print { display: none; }
}
```

- Serif font, aged parchment background
- Thin double-rule decorative border
- Fits to one page where possible
- "When to reveal:" note rendered as a small italic subtitle, hidden at print with `.no-print`
- Browser native print dialog handles physical print and PDF export

---

## 4. New Server Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/tracker?section=X` | Read `timeline/X.md` |
| POST | `/api/tracker?section=X` | Write `timeline/X.md` |
| GET | `/api/tracker/sessions` | List sessions with parsed frontmatter |
| GET | `/api/tracker/session?id=001` | Read one session file |
| POST | `/api/tracker/session?id=001` | Write one session file |
| POST | `/api/tracker/session/new` | Create next session (auto-increment) |
| GET | `/print?path=...` | Print-optimised handout HTML |

---

## 5. App.js & index.html Changes

**index.html:**
- Add `<button class="tab" data-tab="tracker">Tracker</button>` to nav
- Add `<div id="panel-tracker" hidden>...</div>` to workspace
- Add `<button id="btn-print" hidden>🖨 Print</button>` to toolbar

**app.js:**
- Tab click handler: Tracker tab hides `#viewer`, shows `#panel-tracker`
- `loadTracker(section)` — fetch `/api/tracker?section=X`, parse markdown, render UI
- `saveTracker(section, content)` — POST markdown back, show toast
- `loadTrackerSessions()` — fetch session list, render clickable rows
- `openPath()` — detect `type: handout` in frontmatter, show/hide print button
- `btnPrint.addEventListener('click')` — open `/print?path=currentPath` in new tab

---

## 6. Migration

`gm-lore/campaign-tracker.md` is renamed to `gm-lore/campaign-tracker-archive.md` — kept as reference during migration, removed once tracker is live and data has been seeded into the timeline files.

Handout content extracted from `campaign-tracker.md` and written to individual files as described above.

---

## Out of Scope

- Multiplayer / real-time sync (single DM use)
- Import/export to other systems
- Image handouts (markdown text only for now)
- Mobile-optimised tracker layout
