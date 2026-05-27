# Welcome Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a welcome/landing page that auto-loads in the viewer on startup and is accessible via a Home tab.

**Architecture:** A single markdown file at `gm-lore/welcome.md` rendered by the existing web pipeline. A Home tab added to the header nav and one `openPath` call in DOMContentLoaded wire it up.

**Tech Stack:** Markdown (web format), Express/server.js (already handles gm-lore/ as WEB_DIRS), vanilla JS (app.js), HTML (index.html)

---

### Task 1: Create `gm-lore/welcome.md`

**Files:**
- Create: `gm-lore/welcome.md`

- [ ] **Step 1: Write the file**

Create `gm-lore/welcome.md` with this exact content:

```markdown
---
name: Welcome to Aevoria
---

# Welcome to Aevoria — DM Dashboard

**Northwatch Wardens** is a modular guild campaign set in Northreach, a cold frontier region of the world of Aevoria. The players are newly chartered Wardens — monster hunters, investigators, and problem-solvers — operating out of the Waystone Inn. The tone is grounded low-magic frontier: danger is real, trust is earned, and the wilderness doesn't care about heroism.

Beneath the mundane troubles of frontier life runs a deeper current: the **Aeorian Echo**, a spreading wave of arcane disturbance leaking from ancient buried ruins. It awakens animals, corrupts the sick, destabilizes magic, and draws dangerous factions toward Northreach. The players don't know this yet. You do.

Adventures are order-independent. Run them in any sequence that fits your group. Each plants a clue the players won't understand until later.

---

## The World at a Glance

**Northreach** — A cold, sparsely settled frontier. Waystone Inn is the guild hub. Key settlements: Welton, Pinebrook, Palebank Village. The Far North holds ancient Aevorian ruins including Salsvault.

**The Aeorian Echo** — Ancient magic awakening from dormant ruins. Observable effects: animal intelligence (Welton wolves), magical disease (Frigid Woe), reality distortion (Noke's wand), construct activation (Salsvault). Source: Salsvault and other buried facilities.

**Key Guild NPCs**
- **Marshal Brenna Thorne** — Field commander, tactical, protective of the Wardens
- **Steward Mara Fenwick** — Quartermaster, pragmatic, keeps the guild solvent
- **Lorewarden Elric Vael** — Arcane advisor, cautious, knows more than he says

**Factions at play** — Northwatch Wardens (players), Solace Trade Consortium (economic power), Covenant of the Silent Vigil (anti-unaccountable-magic), Archivists of Aevor (relic scholars), Freelance Brotherhood (neutral competitors). See [Faction Dynamics](factions/faction-dynamics.md) for stances and quest hooks.

---

## Using This Dashboard

### Navigation

| Control | What it does |
|---------|-------------|
| **Tabs** (Adventures, NPCs, Locations, GM Lore) | Jump directly to that section's file tree |
| **Season filter** | Scopes Adventures and NPCs tabs to a specific season — expands only that season's subdirectory |
| **Search bar** | Full-text search across every markdown file in the campaign |
| **File tree** | Click any folder to expand it; click any file to preview it in this viewer |

### Tools Menu (top-right)

| Tool | Use at table |
|------|-------------|
| **Random Encounter** | Pick a CR, roll a monster stat block |
| **Treasure Hoard** | Generate loot by party level |
| **World Tables** | Roll on any custom table in the `tables/` directory |
| **Seasonal Calendar** | Browse months, holidays, and weather events |
| **5etools links** | Open spells, conditions, rules in a popup overlay |

### Terminal (right panel)

The built-in terminal runs PowerShell in the campaign directory. Use it to run builds (`./build.sh`), git commands, or any script.

- **⌨ Path button** (top bar, appears when a file is open) — sends the current file's path to the terminal cursor. Useful for editing files by path.
- **Ctrl+V** — paste clipboard text into the terminal.

### Cross-Reference Links

Blue dotted links in NPC and location files open a popup overlay — you can read the detail without losing your place in the current document. NPC table rows are also clickable for inline stat popups.
```

- [ ] **Step 2: Commit**

```bash
git add gm-lore/welcome.md
git commit -m "feat: add welcome/landing page for DM dashboard"
```

---

### Task 2: Add Home tab to `index.html`

**Files:**
- Modify: `web/public/index.html` (line 18 — the `<nav class="tab-group">` block)

- [ ] **Step 1: Add the Home tab as the first button in the nav**

In `web/public/index.html`, change:

```html
    <nav class="tab-group">
      <button class="tab" data-path="adventures">Adventures</button>
```

to:

```html
    <nav class="tab-group">
      <button class="tab" data-path="gm-lore/welcome.md">Home</button>
      <button class="tab" data-path="adventures">Adventures</button>
```

- [ ] **Step 2: Commit**

```bash
git add web/public/index.html
git commit -m "feat: add Home tab to dashboard header"
```

---

### Task 3: Auto-load welcome page on startup

**Files:**
- Modify: `web/public/app.js` (the `DOMContentLoaded` handler, currently around line 926)

- [ ] **Step 1: Add `openPath` call after `fillTree`**

In `web/public/app.js`, change:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  initTerminal();
  loadWorldTables();
```

to:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  initTerminal();
  loadWorldTables();
```

- [ ] **Step 2: Verify in browser**

Reload the page. The viewer should immediately show the welcome page without clicking anything. The Home tab should also navigate back to it when clicked.

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: auto-load welcome page on dashboard startup"
```
