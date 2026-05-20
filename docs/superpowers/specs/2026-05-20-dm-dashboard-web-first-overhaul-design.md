# DM Dashboard — Web-First Overhaul

**Date:** 2026-05-20  
**Status:** Approved  
**Scope:** Full migration from Homebrewery-based file structure to web-native content, with modal reference system, tools dropdown, and 5etools integration.

---

## Context

The DM Dashboard (`web/`) is a local Express server providing a 3-panel UI: file tree, content preview, terminal. Currently it points at `Season 1/`, `Season 2/`, etc. — Homebrewery V3 files designed for PDF print layout. These render poorly in a browser (two-column overflow, fixed page heights) and are the wrong format for at-the-table use.

A parallel web-native structure already exists and is partially populated:

| Folder | Content |
|--------|---------|
| `adventures/season-1/`, `adventures/season-2/` | Adventure files (standard markdown + YAML frontmatter) |
| `npcs/core/`, `npcs/season-1/`, etc. | One file per NPC |
| `locations/northreach/` | Location files |
| `factions/` | Faction files |
| `arcs/` | Campaign arc documents |
| `gm-lore/` | DM-only secrets, world state |
| `player-lore/` | Player-facing lore |
| `timeline/` | Sessions and world events |

This overhaul makes the web-native structure the primary surface, archives the print files, and adds a modal reference system + tools layer.

---

## 1. Archive — Print Files

### What moves

Move the following into `_print/` at the campaign root:

- `Season 1/` → `_print/Season 1/`
- `Season 2/` → `_print/Season 2/`
- `Season 3/` through `Season 6/` → `_print/Season 3/` … `_print/Season 6/`
- `World Building/` → `_print/World Building/`
- `Characters/` → `_print/Characters/`
- `Premade PCs/` → `_print/Premade PCs/`

### Why `_print/` is safe

`server.js` already filters any entry whose name starts with `_`:
```js
if (e.name.startsWith('.') || e.name.startsWith('_') || EXCLUDE.has(e.name)) return false;
```
No server changes needed for hiding. `_print/` is also excluded from the search index (`walkMd`).

### Build system

`build.js` and `scripts/build/` reference `Season 1/` paths. These paths break after the move. The build system is print-only and not a dashboard priority. Add a comment to `build.js` noting the new paths in `_print/`.

### DM Resources — split destination

`Season 1/DM_Resources/` contains two types of content:

| File | Destination |
|------|-------------|
| `Random_Encounter_Tables_Downtime.md` | `tables/` |
| `Travel_Encounter_Library.md` | `tables/` |
| `Campaign_Tracker.md` | `gm-lore/` |
| `Foreshadowing_Database.md` | `gm-lore/` |
| `Seasonal_Event_Calendar.md` | `gm-lore/` |
| `What_If_Quick_Guide.md` | `gm-lore/` |
| `Core_Mystery_Definition.md` | `gm-lore/` |
| `Faction_Response_Document.md` | `gm-lore/` |
| `NPC Roster — By Location & Adventure (DM).md` | `gm-lore/` |
| `Mystery_Investigation_Guide.md` | `gm-lore/` |
| `Session_Prep_Guide.md` | `gm-lore/` |
| `Session_Prep_Master_Checklist.md` | `gm-lore/` |
| Everything else (3D printing, IP review, etc.) | `_print/Season 1/DM_Resources/` |

---

## 2. New `tables/` Folder

Home for all world-specific random tables. Auto-enumerated by the server for the Tools dropdown.

### Structure

```
tables/
  _template.md
  downtime-waystone-inn.md        (from Random_Encounter_Tables_Downtime.md)
  travel-encounters-northreach.md (from Travel_Encounter_Library.md)
```

### Frontmatter convention

Each table file requires:
```yaml
---
name: Waystone Inn — Downtime & Social
season: 1
tags: [downtime, social, waystone-inn]
---
```

The `name` field is what appears in the Tools dropdown menu. The server scans `tables/` and reads frontmatter to build the menu — dropping a new file into `tables/` automatically adds it to the dropdown.

---

## 3. Web Renderer

### Renderer selection

Server chooses renderer by file path prefix. Files under these directories use the `marked` pipeline:

```
adventures/  npcs/       locations/  factions/
arcs/        gm-lore/    player-lore/ timeline/
tables/
```

All other `.md` files fall back to the existing homebrewery-renderer (or raw `<pre>` if unavailable).

### Preprocessing pipeline

**Before `marked`** (operate on raw markdown text):

1. **Strip frontmatter** — remove `---...---` block
2. **`{{note}}` blocks** → `<div class="callout note">...</div>`
3. **`{{descriptive}}` blocks** → `<div class="callout descriptive">...</div>`
4. **`{{wide}}` blocks** → `<div class="callout wide">...</div>` (strip layout intent, keep content)
5. **Remaining `{{...}}` blocks** — strip the delimiters, keep inner content as plain markdown
6. **`5etools:` links** — `[Name](5etools:bestiary#name_source)` → raw HTML anchor with `data-modal-5e="http://localhost:2014/bestiary.html#name_source"` (must be raw HTML so `marked` doesn't touch it)

**After `marked`** (operate on rendered HTML string):

7. **Cross-reference links** — any `<a href="...">` whose `href` starts with `npcs/`, `locations/`, `factions/`, or `arcs/` → add `data-modal` attribute set to that path value

### Callout CSS (injected into web-rendered pages)

Three callout types, all D&D-styled:

| Class | Visual | Use |
|-------|--------|-----|
| `.callout.note` | Parchment background, tan rule-line border, bold header | DM mechanics, rules reminders |
| `.callout.descriptive` | Darker parchment, italic text, inset border | Read-aloud text |
| `.callout.wide` | Full-width, subtle background | Tables, wide content |

### `marked` dependency

Add to `web/package.json`:
```json
"marked": "^12.0.0"
```

---

## 4. Modal System

### DOM structure

One modal element always present in `index.html`:

```html
<div id="modal" class="modal-overlay" hidden>
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-title"></span>
      <button class="modal-close">✕</button>
    </div>
    <div class="modal-body"></div>
  </div>
</div>
```

A second identical element `id="modal2"` handles nested modals (max 2 deep).

### Triggering

Client JS in `app.js` listens at document level:

```js
document.addEventListener('click', e => {
  const a = e.target.closest('[data-modal]');
  if (a) { e.preventDefault(); openModal(a.dataset.modal); }

  const b = e.target.closest('[data-modal-5e]');
  if (b) { e.preventDefault(); open5eModal(b.dataset.modal5e); }
});
```

### `openModal(path)`

1. Fetch `/preview?path=<path>`
2. Parse response HTML — server wraps web-rendered content in `<div data-title="...">` where the value is the frontmatter `name` field (or the filename if absent)
3. Inject inner content into `.modal-body`; set `.modal-title` text from `data-title`
4. Show modal (remove `hidden`, add `visible` class)
5. If a modal is already open, use `modal2` instead

### `open5eModal(url)`

1. Create `<iframe src="url">` sized to fill modal body
2. Use the tall modal variant (CSS class `modal-box--tall`)
3. Show modal

### Dismissal

- Click backdrop → close top modal
- ESC key → close top modal
- ✕ button → close top modal
- When `modal2` closes, focus returns to `modal`

### Modal CSS

- Overlay: `position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:200`
- Box: `max-width:680px; max-height:85vh; overflow-y:auto; background:var(--panel)`
- Tall variant (5etools): `max-width:960px; height:85vh`
- Entrance animation: fade + slight scale up (0.18s)

---

## 5. Nav Overhaul

### New tab structure in `index.html`

Replace existing hardcoded path tabs with:

```
Adventures  |  NPCs  |  Locations  |  GM Lore  |  Tools ▾
```

| Tab | Opens |
|-----|-------|
| Adventures | `adventures/` directory listing |
| NPCs | `npcs/` directory listing |
| Locations | `locations/` directory listing |
| GM Lore | `gm-lore/` directory listing |
| Tools ▾ | Popover dropdown (see below) |

### Tools dropdown — two sections

**World Tables** (auto-enumerated from `tables/`)  
Server exposes `/api/tables` → returns `[{ name, path }]` scanned from `tables/*.md` frontmatter.  
Client populates this section of the dropdown on page load.

**SRD Tools** (static entries, server-side API calls)  
- Random Encounter — server endpoint `/tools/random-encounter?cr=<cr>&terrain=<terrain>` calls `https://www.dnd5eapi.co/api/monsters?challenge_rating=<cr>`, picks randomly, returns formatted HTML modal fragment
- Treasure Hoard — server endpoint `/tools/treasure-hoard?level=<level>` returns generated treasure result as HTML modal fragment

**5etools**  
- 5etools → opens `http://localhost:2014` in a tall iframe modal
- Bestiary → opens `http://localhost:2014/bestiary.html` directly
- Spells → opens `http://localhost:2014/spells.html` directly

### Dropdown behavior

- Click Tools → popover appears below button
- Click outside → popover closes
- Popover uses `position:absolute` relative to toolbar, `z-index:150`

---

## 6. 5etools Integration

### Assumptions

- 5etools runs at `http://localhost:2014`
- Local origin — no X-Frame-Options block, iframe embedding works
- No auth required

### Link syntax in markdown

Authors can write:
```markdown
[Goblin](5etools:bestiary#goblin_mm)
[Fireball](5etools:spells#fireball_phb)
```

Server preprocessor converts to `data-modal-5e` attributes before `marked` runs.

### Monster stat blocks in adventures

When an adventure file references a monster by name, authors add the 5etools link inline. No automatic lookup — explicit linking keeps it intentional and avoids false matches on NPC names.

---

## 7. Server Changes Summary

| Change | File |
|--------|------|
| Add `marked` renderer, path-based detection | `web/server.js` |
| Add `{{note}}` preprocessor | `web/server.js` |
| Add `data-modal` link injection | `web/server.js` |
| Add `5etools:` link preprocessor | `web/server.js` |
| Add `/api/tables` endpoint | `web/server.js` |
| Add `marked` dependency | `web/package.json` |

## 8. Client Changes Summary

| Change | File |
|--------|------|
| Replace hardcoded tabs with new nav | `web/public/index.html` |
| Add modal DOM elements | `web/public/index.html` |
| Add modal open/close logic | `web/public/app.js` |
| Add Tools dropdown populate logic | `web/public/app.js` |
| Add document-level modal click handler | `web/public/app.js` |
| Add modal + callout styles | `web/public/style.css` |
| Add Tools dropdown styles | `web/public/style.css` |

---

## Out of Scope

- Migrating individual adventure content (the web files already have good content)
- Editing files from within the dashboard (separate feature)
- Build system path updates (noted broken, not a priority)
- Converting all `{{note}}` blocks in existing files (preprocessor handles them at render time)
