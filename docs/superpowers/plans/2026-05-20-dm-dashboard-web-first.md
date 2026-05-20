# DM Dashboard — Web-First Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the DM Dashboard from Homebrewery print files to the existing web-native markdown structure, add a `marked`-based renderer with D&D-styled callouts, a modal reference system, and a Tools dropdown with world tables + 5etools integration.

**Architecture:** Server detects files under `adventures/`, `npcs/`, `locations/`, `factions/`, `arcs/`, `gm-lore/`, `player-lore/`, `timeline/`, `tables/` and renders them with `marked` after preprocessing `{{note}}` blocks into styled divs. Cross-reference links get `data-modal` attributes post-render; client JS intercepts them and opens content in a modal overlay without leaving the current adventure.

**Tech Stack:** Node.js 24, Express, `marked` ^12, native `fetch` (Node 18+), xterm.js (existing), vanilla JS/CSS

**Spec:** `docs/superpowers/specs/2026-05-20-dm-dashboard-web-first-overhaul-design.md`

---

## File Map

| Action | Path |
|--------|------|
| Modify | `web/package.json` |
| Modify | `web/server.js` |
| Modify | `web/public/index.html` |
| Modify | `web/public/app.js` |
| Modify | `web/public/style.css` |
| Create | `tables/_template.md` |
| Move+edit | `Season 1/DM_Resources/Random_Encounter_Tables_Downtime.md` → `tables/downtime-waystone-inn.md` |
| Move+edit | `Season 1/DM_Resources/Travel_Encounter_Library.md` → `tables/travel-encounters-northreach.md` |
| Move | `Season 1/DM_Resources/Campaign_Tracker.md` → `gm-lore/campaign-tracker.md` |
| Move | `Season 1/DM_Resources/Foreshadowing_Database.md` → `gm-lore/foreshadowing-database.md` |
| Move | `Season 1/DM_Resources/Seasonal_Event_Calendar.md` → `gm-lore/seasonal-event-calendar.md` |
| Move | `Season 1/DM_Resources/What_If_Quick_Guide.md` → `gm-lore/what-if-quick-guide.md` |
| Move | `Season 1/DM_Resources/Core_Mystery_Definition.md` → `gm-lore/core-mystery-definition.md` |
| Move | `Season 1/DM_Resources/Faction_Response_Document.md` → `gm-lore/faction-response-document.md` |
| Move | `Season 1/DM_Resources/NPC Roster — By Location & Adventure (DM).md` → `gm-lore/npc-roster-by-location.md` |
| Move | `Season 1/DM_Resources/Mystery_Investigation_Guide.md` → `gm-lore/mystery-investigation-guide.md` |
| Move | `Season 1/DM_Resources/Session_Prep_Guide.md` → `gm-lore/session-prep-guide.md` |
| Move | `Season 1/DM_Resources/Session_Prep_Master_Checklist.md` → `gm-lore/session-prep-checklist.md` |
| Move | `Season 1/` (remainder) → `_print/Season 1/` |
| Move | `Season 2/` → `_print/Season 2/` |
| Move | `Season 3/` … `Season 6/` → `_print/Season 3/` … `_print/Season 6/` |
| Move | `World Building/` → `_print/World Building/` |
| Move | `Characters/` → `_print/Characters/` |
| Move | `Premade PCs/` → `_print/Premade PCs/` |
| Comment | `build.js` — note that Season paths moved to `_print/` |

---

## Task 1: Install marked

**Files:** `web/package.json`

- [ ] **Add marked to dependencies**

Edit `web/package.json` — replace the dependencies block:
```json
{
  "name": "dm-panel",
  "version": "1.0.0",
  "description": "DM Control Panel for Northwatch Wardens",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "marked": "^12.0.0",
    "node-pty": "^1.0.0",
    "ws": "^8.17.0"
  }
}
```

- [ ] **Install**

```bash
cd web && npm install
```

Expected: `added N packages` with no errors.

- [ ] **Verify**

```bash
node -e "const { marked } = require('marked'); console.log(marked.parse('# Hello')); "
```

Expected: `<h1>Hello</h1>`

- [ ] **Commit**

```bash
git add web/package.json web/package-lock.json
git commit -m "feat: add marked dependency for web renderer"
```

---

## Task 2: Migrate DM resources to gm-lore/ and tables/

**Files:** multiple moves via git mv

- [ ] **Create tables/ directory marker**

```bash
mkdir -p tables
```

- [ ] **Move table files to tables/**

```bash
git mv "Season 1/DM_Resources/Random_Encounter_Tables_Downtime.md" "tables/downtime-waystone-inn.md"
git mv "Season 1/DM_Resources/Travel_Encounter_Library.md" "tables/travel-encounters-northreach.md"
```

- [ ] **Add frontmatter to downtime-waystone-inn.md**

Open `tables/downtime-waystone-inn.md`. Prepend this block before the existing `<!--` comment (replace or remove the HTML comment header):

```markdown
---
name: Waystone Inn — Downtime & Social
season: 1
tags: [downtime, social, waystone-inn, northreach]
---

```

Remove the existing `<!--...-->` HTML comment block at the top (lines 1–6 of the original file).

- [ ] **Add frontmatter to travel-encounters-northreach.md**

Open `tables/travel-encounters-northreach.md`. Prepend before the existing `<!--` comment:

```markdown
---
name: Travel Encounters — Northreach
season: 1
tags: [travel, encounters, northreach, wilderness]
---

```

Remove the existing `<!--...-->` HTML comment block at the top.

- [ ] **Create tables/_template.md**

```markdown
---
name: Table Name Here
season: 1
tags: [tag1, tag2]
---

## Table Title

Brief description of when and how to use this table.

### TABLE 1: NAME (d20)

| d20 | Result |
|-----|--------|
| 1   | ...    |
| 2   | ...    |
```

- [ ] **Move DM resources to gm-lore/**

```bash
git mv "Season 1/DM_Resources/Campaign_Tracker.md"              "gm-lore/campaign-tracker.md"
git mv "Season 1/DM_Resources/Foreshadowing_Database.md"        "gm-lore/foreshadowing-database.md"
git mv "Season 1/DM_Resources/Seasonal_Event_Calendar.md"       "gm-lore/seasonal-event-calendar.md"
git mv "Season 1/DM_Resources/What_If_Quick_Guide.md"           "gm-lore/what-if-quick-guide.md"
git mv "Season 1/DM_Resources/Core_Mystery_Definition.md"       "gm-lore/core-mystery-definition.md"
git mv "Season 1/DM_Resources/Faction_Response_Document.md"     "gm-lore/faction-response-document.md"
git mv "Season 1/DM_Resources/NPC Roster — By Location & Adventure (DM).md"  "gm-lore/npc-roster-by-location.md"
git mv "Season 1/DM_Resources/Mystery_Investigation_Guide.md"   "gm-lore/mystery-investigation-guide.md"
git mv "Season 1/DM_Resources/Session_Prep_Guide.md"            "gm-lore/session-prep-guide.md"
git mv "Season 1/DM_Resources/Session_Prep_Master_Checklist.md" "gm-lore/session-prep-checklist.md"
```

- [ ] **Commit migrations**

```bash
git add -A
git commit -m "feat: migrate DM resources to gm-lore/ and tables/"
```

---

## Task 3: Archive print files to _print/

**Files:** bulk directory moves

- [ ] **Archive Season directories**

```bash
mkdir -p "_print"
git mv "Season 1"    "_print/Season 1"
git mv "Season 2"    "_print/Season 2"
git mv "Season 3"    "_print/Season 3"
git mv "Season 4"    "_print/Season 4"
git mv "Season 5"    "_print/Season 5"
git mv "Season 6"    "_print/Season 6"
git mv "World Building" "_print/World Building"
git mv "Characters"  "_print/Characters"
git mv "Premade PCs" "_print/Premade PCs"
```

- [ ] **Note broken build paths in build.js**

Open `build.js` (at campaign root). Add a comment near the top after `'use strict';`:

```js
// NOTE: Season 1-6, World Building, Characters, Premade PCs have moved to _print/.
// The TOC JSON paths in build/players-guide-toc.json and build/dms-guide-toc.json
// need updating before the build system will work again. Not a dashboard priority.
```

- [ ] **Verify dashboard still hides _print/**

The `showEntry` function in `web/server.js` already filters names starting with `_`:
```js
if (e.name.startsWith('.') || e.name.startsWith('_') || EXCLUDE.has(e.name)) return false;
```
No server change needed. Confirm `_print` does NOT appear in `web/server.js` EXCLUDE — it doesn't need to be there.

- [ ] **Commit**

```bash
git add -A
git commit -m "chore: archive print/Homebrewery files to _print/"
```

---

## Task 4: Add web renderer helpers to server.js

**Files:** `web/server.js`

- [ ] **Add marked require at top of server.js**

After the existing `const fs = require('fs');` line, add:

```js
const { marked } = require('marked');
```

- [ ] **Add WEB_DIRS set + isWebPath() after the EXCLUDE block**

After the closing of the EXCLUDE Set definition (after line 25), add:

```js
// Directories rendered with marked (web-native markdown)
const WEB_DIRS = new Set([
  'adventures', 'npcs', 'locations', 'factions',
  'arcs', 'gm-lore', 'player-lore', 'timeline', 'tables',
]);

function isWebPath(filePath) {
  const rel = path.relative(CAMPAIGN_ROOT, filePath).replace(/\\/g, '/');
  return WEB_DIRS.has(rel.split('/')[0]);
}
```

- [ ] **Add extractFrontmatter() after isWebPath()**

```js
function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    if (key) result[key] = val;
  }
  return result;
}
```

- [ ] **Add preprocessMarkdown() after extractFrontmatter()**

```js
function preprocessMarkdown(raw) {
  let md = raw;

  // Strip frontmatter
  md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');

  // Strip HTML comment headers (old format)
  md = md.replace(/^<!--[\s\S]*?-->\s*\n/, '');

  // {{note ...}} blocks → callout div (must run before generic strip)
  md = md.replace(/\{\{note[^\n]*\n([\s\S]*?)\n\}\}/g,
    (_, content) => `<div class="callout note">\n\n${content}\n\n</div>\n`);

  // {{descriptive ...}} blocks
  md = md.replace(/\{\{descriptive[^\n]*\n([\s\S]*?)\n\}\}/g,
    (_, content) => `<div class="callout descriptive">\n\n${content}\n\n</div>\n`);

  // {{wide ...}} blocks — strip wrapper, keep content
  md = md.replace(/\{\{wide[^\n]*\n([\s\S]*?)\n\}\}/g,
    (_, content) => `<div class="callout wide">\n\n${content}\n\n</div>\n`);

  // 5etools: links → raw anchor with data-modal-5e (before marked processes links)
  md = md.replace(/\[([^\]]+)\]\(5etools:([\w.]+)#([\w_-]+)\)/g,
    (_, text, page, hash) =>
      `<a href="#" data-modal-5e="http://localhost:2014/${page}.html#${hash}" class="link-5e">${esc(text)}</a>`);

  // Strip any remaining {{...}} blocks — keep inner content
  md = md.replace(/\{\{[\w,\s]*\n([\s\S]*?)\n\}\}/g, (_, content) => content + '\n');
  md = md.replace(/\{\{[^}\n]*\}\}/g, '');

  return md;
}
```

- [ ] **Verify helpers work with a quick node test**

```bash
cd web && node -e "
const fs = require('fs');
const path = require('path');

// inline copies for test
function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    result[line.slice(0,colon).trim()] = line.slice(colon+1).trim();
  }
  return result;
}

const sample = '---\nname: Test NPC\nseason: 1\n---\n\n## Hello\n\n{{note\nThis is a note\n}}\n';
const fm = extractFrontmatter(sample);
console.log('fm.name:', fm.name);     // Test NPC
console.log('fm.season:', fm.season); // 1
console.log('PASS');
"
```

Expected output: `fm.name: Test NPC`, `fm.season: 1`, `PASS`

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: add web renderer helpers (isWebPath, extractFrontmatter, preprocessMarkdown)"
```

---

## Task 5: Add web renderer + update /preview endpoint

**Files:** `web/server.js`

- [ ] **Add WEB_CONTENT_CSS constant after FRAME_SCREEN_CSS**

After the closing backtick of `FRAME_SCREEN_CSS`, add:

```js
const WEB_CONTENT_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: #f5f0e8;
    color: #1a1a1a;
    font-family: 'Palatino Linotype', Palatino, 'Book Antiqua', serif;
    font-size: 15px;
    line-height: 1.7;
  }
  .web-content { max-width: 760px; margin: 0 auto; padding: 28px 24px 60px; }
  h1 { font-size: 1.8em; color: #58180d; text-transform: uppercase;
       letter-spacing: 1px; border-bottom: 3px solid #c9ad6a; padding-bottom: 6px; margin-top: 0; }
  h2 { font-size: 1.35em; color: #58180d; border-bottom: 1px solid #c9ad6a; padding-bottom: 4px; }
  h3 { font-size: 1.1em; color: #58180d; font-variant: small-caps; }
  h4, h5 { font-size: 1em; color: #58180d; }
  a { color: #58180d; }
  a[data-modal], a[data-modal-5e] {
    color: #58180d; border-bottom: 1px dotted #58180d;
    text-decoration: none; cursor: pointer;
  }
  a[data-modal]:hover, a[data-modal-5e]:hover { border-bottom-style: solid; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 0.9em; }
  th { background: #58180d; color: #f5f0e8; padding: 6px 10px; text-align: left; }
  td { padding: 5px 10px; border-bottom: 1px solid #ddd; }
  tr:nth-child(even) td { background: #ede8da; }
  hr { border: none; border-top: 2px solid #c9ad6a; margin: 1.8em 0; }
  code { background: #ede8da; padding: 2px 5px; border-radius: 3px; font-size: 0.88em; font-family: Consolas, monospace; }
  blockquote { border-left: 4px solid #c9ad6a; margin: 1em 0; padding: 8px 16px; background: #ede8da; }
  strong { color: #3b0d0d; }
  .callout { border-radius: 3px; padding: 12px 16px; margin: 1.2em 0; }
  .callout.note {
    background: #fdf6e3; border: 1px solid #c9ad6a; border-left: 4px solid #c9ad6a;
  }
  .callout.descriptive {
    background: #ede8da; border: 1px solid #8b7d5a; border-left: 4px solid #8b7d5a;
    font-style: italic;
  }
  .callout.wide {
    background: #f5f0e8; border-top: 2px solid #c9ad6a; border-bottom: 2px solid #c9ad6a;
    padding: 12px 0;
  }
  .callout h4, .callout h5 { margin-top: 0; }
  img { max-width: 100%; height: auto; }
  ul, ol { padding-left: 1.4em; }
  li { margin: 0.2em 0; }
`;
```

- [ ] **Add webPreviewHtml() function after previewHtml()**

```js
function webPreviewHtml(title, bodyHtml) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${esc(title)}</title>
  <style>${WEB_CONTENT_CSS}</style>
</head>
<body data-title="${esc(title)}">
  <div class="web-content">${bodyHtml}</div>
</body>
</html>`;
}
```

- [ ] **Add renderWebMarkdown() function after webPreviewHtml()**

```js
function renderWebMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  const title = fm.name || path.basename(filePath, '.md').replace(/[-_]/g, ' ');
  const preprocessed = preprocessMarkdown(raw);
  let html = marked.parse(preprocessed);
  // Post-process: inject data-modal on cross-reference links
  html = html.replace(
    /<a href="((?:npcs|locations|factions|arcs)\/[^"]+)">/g,
    (_, p) => `<a href="#" data-modal="${esc(p)}">`
  );
  return { html, title };
}
```

- [ ] **Update the /preview endpoint to use web renderer for web paths**

Find the block in the `/preview` handler:
```js
    if (ext === '.md') {
      const content = fs.readFileSync(filePath, 'utf8');
      const season = req.query.season != null ? parseInt(req.query.season, 10) : null;
      res.send(previewHtml(renderPages(content, season)));
    }
```

Replace it with:
```js
    if (ext === '.md') {
      if (isWebPath(filePath)) {
        const { html, title } = renderWebMarkdown(filePath);
        res.send(webPreviewHtml(title, html));
      } else {
        const content = fs.readFileSync(filePath, 'utf8');
        const season = req.query.season != null ? parseInt(req.query.season, 10) : null;
        res.send(previewHtml(renderPages(content, season)));
      }
    }
```

- [ ] **Restart server and smoke test**

```bash
# Kill existing server
powershell.exe -Command "Get-NetTCPConnection -LocalPort 5050 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force -ErrorAction SilentlyContinue }; Start-Sleep 1"
cd web && node server.js &
sleep 2

# Test web path renders with marked (should return parchment-bg HTML, not Homebrewery)
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness.md" | grep -c "web-content"
```

Expected: `1` (the `web-content` div is present)

```bash
# Test callout rendering
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness.md" | grep -c "callout"
```

Expected: `>0` (callout divs present — the file has `{{note}}` blocks)

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: add marked web renderer for web-native content dirs"
```

---

## Task 6: Add /api/tables endpoint and update EXCLUDE

**Files:** `web/server.js`

- [ ] **Update EXCLUDE set**

Find the existing EXCLUDE definition and replace it:

```js
const EXCLUDE = new Set([
  '.git', '.github', 'dm-panel', 'web', 'node_modules', 'build',
  'logs', 'scratchpad', 'scripts', 'templates', 'LionsdenGameFiles',
  'temp', 'docs',
]);
```

(Added `temp` and `docs` — temp holds pasted images, docs holds specs/plans.)

- [ ] **Add /api/tables endpoint** — insert after the `/api/search` endpoint, before the WebSocket terminal section:

```js
// ─── Tables API ───────────────────────────────────────────────────────────────

app.get('/api/tables', (req, res) => {
  try {
    const dir = path.join(CAMPAIGN_ROOT, 'tables');
    if (!fs.existsSync(dir)) return res.json([]);
    const tables = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md') && !f.startsWith('_'))
      .map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const fm = extractFrontmatter(content);
        return {
          name: fm.name || file.replace(/\.md$/, '').replace(/[-_]/g, ' '),
          path: `tables/${file}`,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    res.json(tables);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

- [ ] **Verify /api/tables**

```bash
curl -s "http://localhost:5050/api/tables" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8'); const j=JSON.parse(d); console.log(j.map(t=>t.name).join(', '));"
```

Expected: something like `Travel Encounters — Northreach, Waystone Inn — Downtime & Social`

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: add /api/tables endpoint, update EXCLUDE list"
```

---

## Task 7: Add tool endpoints (Random Encounter + Treasure Hoard)

**Files:** `web/server.js`

- [ ] **Add tool endpoints** — insert after `/api/tables`, before WebSocket terminal section:

```js
// ─── Tool endpoints ────────────────────────────────────────────────────────────

app.get('/tools/random-encounter', async (req, res) => {
  const cr = encodeURIComponent(req.query.cr || '1');
  try {
    const r = await fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${cr}`);
    const data = await r.json();
    if (!data.results?.length) {
      return res.send(`<p style="color:#888;font-family:sans-serif;padding:8px">No monsters found for CR ${esc(req.query.cr || '1')}</p>`);
    }
    const pick = data.results[Math.floor(Math.random() * data.results.length)];
    const detail = await fetch(`https://www.dnd5eapi.co${pick.url}`);
    const m = await detail.json();
    const ac = Array.isArray(m.armor_class) ? m.armor_class[0]?.value : m.armor_class;
    const speed = Object.entries(m.speed || {}).map(([k, v]) => `${k} ${v}`).join(', ');
    const actions = (m.actions || []).slice(0, 4).map(a => esc(a.name)).join(', ');
    res.send(`
      <div style="font-family:'Palatino Linotype',serif;padding:4px">
        <h3 style="margin:0 0 6px;color:#58180d;font-size:1.2em">${esc(m.name)}</h3>
        <p style="margin:3px 0;font-size:0.9em;color:#555;font-style:italic">${esc(m.size)} ${esc(m.type)}, CR ${m.challenge_rating}</p>
        <hr style="border:none;border-top:1px solid #c9ad6a;margin:8px 0">
        <p style="margin:3px 0"><strong>AC</strong> ${ac ?? '—'} &nbsp;&nbsp; <strong>HP</strong> ${m.hit_points} &nbsp;&nbsp; <strong>Speed</strong> ${esc(speed)}</p>
        <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85em;text-align:center">
          <tr style="background:#58180d;color:#f5f0e8">
            <th style="padding:4px">STR</th><th style="padding:4px">DEX</th><th style="padding:4px">CON</th>
            <th style="padding:4px">INT</th><th style="padding:4px">WIS</th><th style="padding:4px">CHA</th>
          </tr>
          <tr>
            <td style="padding:4px">${m.strength}</td><td style="padding:4px">${m.dexterity}</td><td style="padding:4px">${m.constitution}</td>
            <td style="padding:4px">${m.intelligence}</td><td style="padding:4px">${m.wisdom}</td><td style="padding:4px">${m.charisma}</td>
          </tr>
        </table>
        ${actions ? `<p style="margin:4px 0;font-size:0.9em"><strong>Actions:</strong> ${actions}</p>` : ''}
      </div>`);
  } catch (e) {
    res.status(500).send(`<p style="color:red;font-family:sans-serif;padding:8px">${esc(e.message)}</p>`);
  }
});

app.get('/tools/treasure-hoard', (req, res) => {
  const level = Math.min(20, Math.max(1, parseInt(req.query.level, 10) || 1));
  const roll = (n, d) => Array.from({ length: n }, () => Math.ceil(Math.random() * d)).reduce((a, b) => a + b, 0);

  let coins, gems, art, magic;
  if (level <= 4) {
    coins = `${roll(6, 6)} cp, ${roll(3, 6) * 10} sp, ${roll(2, 6) * 10} gp`;
    gems  = roll(1, 6) >= 4 ? `${roll(2, 6)} × 10gp gems` : null;
    art   = null; magic = null;
  } else if (level <= 10) {
    coins = `${roll(2, 6) * 100} sp, ${roll(6, 6) * 100} gp`;
    gems  = `${roll(2, 4)} × 25gp gems`;
    art   = roll(1, 6) >= 4 ? `${roll(2, 4)} × 25gp art objects` : null;
    magic = roll(1, 6) >= 5 ? 'Roll on Magic Item Table A' : null;
  } else if (level <= 16) {
    coins = `${roll(4, 6) * 1000} gp, ${roll(5, 6) * 100} pp`;
    gems  = `${roll(2, 6)} × 500gp gems`;
    art   = `${roll(2, 4)} × 250gp art objects`;
    magic = `Roll on Magic Item Table ${['C', 'D', 'E'][roll(1, 3) - 1]}`;
  } else {
    coins = `${roll(12, 6) * 1000} gp, ${roll(8, 6) * 1000} pp`;
    gems  = `${roll(3, 6)} × 1000gp gems`;
    art   = `${roll(2, 4)} × 2500gp art objects`;
    magic = `Roll on Magic Item Tables ${['E', 'F', 'G', 'H', 'I'][roll(1, 5) - 1]}`;
  }

  const items = [coins, gems, art, magic].filter(Boolean);
  res.send(`
    <div style="font-family:'Palatino Linotype',serif;padding:4px">
      <h3 style="margin:0 0 8px;color:#58180d">Treasure Hoard — Level ${level}</h3>
      <ul style="margin:0;padding-left:20px;line-height:1.8">
        ${items.map(i => `<li>${esc(i)}</li>`).join('')}
      </ul>
      <p style="margin-top:12px;font-size:0.85em;color:#888;font-style:italic">Roll again for a new hoard.</p>
    </div>`);
});
```

- [ ] **Test random encounter endpoint**

```bash
curl -s "http://localhost:5050/tools/random-encounter?cr=1" | grep -c "STR"
```

Expected: `1`

- [ ] **Test treasure hoard endpoint**

```bash
curl -s "http://localhost:5050/tools/treasure-hoard?level=5" | grep -c "Treasure Hoard"
```

Expected: `1`

- [ ] **Commit**

```bash
git add web/server.js
git commit -m "feat: add /tools/random-encounter and /tools/treasure-hoard endpoints"
```

---

## Task 8: Add modal HTML and CSS

**Files:** `web/public/index.html`, `web/public/style.css`

- [ ] **Add modal HTML to index.html** — insert before `</body>`:

```html
  <!-- Modal overlay (primary) -->
  <div id="modal" class="modal-overlay" hidden>
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title"></span>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>

  <!-- Modal overlay (nested, max 2 deep) -->
  <div id="modal2" class="modal-overlay" hidden>
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title"></span>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
```

- [ ] **Add modal CSS to style.css** — append at end of file:

```css
/* ─── Modal ──────────────────────────────────────────────────────────────── */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.18s;
}
.modal-overlay[hidden] { display: none !important; }
.modal-overlay.visible { opacity: 1; }

.modal-box {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  width: min(700px, 92vw);
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  transform: scale(0.95);
  transition: transform 0.18s;
  overflow: hidden;
}
.modal-overlay.visible .modal-box { transform: scale(1); }
.modal-box--tall { width: min(980px, 96vw); height: 85vh; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  background: var(--panel);
}
.modal-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-close {
  background: none;
  border: none;
  color: var(--subtext);
  cursor: pointer;
  font-size: 15px;
  padding: 2px 7px;
  border-radius: 4px;
  flex-shrink: 0;
  margin-left: 8px;
}
.modal-close:hover { background: var(--overlay); color: var(--text); }

.modal-body {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  background: #f5f0e8;
}
.modal-body iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* ─── Tools dropdown ──────────────────────────────────────────────────────── */

#tools-wrap {
  position: relative;
  flex-shrink: 0;
}

#btn-tools {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--subtext);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  padding: 4px 14px;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  white-space: nowrap;
}
#btn-tools:hover, #btn-tools.open {
  background: var(--overlay);
  border-color: var(--border);
  color: var(--text);
}

#tools-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  min-width: 230px;
  z-index: 150;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
#tools-dropdown[hidden] { display: none; }

.tools-section {
  padding: 6px 0 2px;
}
.tools-section + .tools-section {
  border-top: 1px solid var(--border);
}
.tools-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  color: var(--subtext);
  padding: 4px 12px 2px;
}
.tool-item {
  display: block;
  width: 100%;
  padding: 7px 12px;
  color: var(--text);
  font-size: 12px;
  font-family: inherit;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.1s;
}
.tool-item:hover { background: var(--overlay); color: var(--accent); }
```

- [ ] **Commit**

```bash
git add web/public/index.html web/public/style.css
git commit -m "feat: add modal DOM structure and CSS, tools dropdown CSS"
```

---

## Task 9: Add modal JavaScript

**Files:** `web/public/app.js`

- [ ] **Add modal state vars** — after `const toast = $('toast');` add:

```js
const modal1 = $('modal');
const modal2 = $('modal2');
```

- [ ] **Add modal functions** — insert before the `// ─── Search ───` section:

```js
// ─── Modal ────────────────────────────────────────────────────────────────────

function getTopModal() {
  if (modal2 && !modal2.hidden) return modal2;
  if (modal1 && !modal1.hidden) return modal1;
  return null;
}

function getFreeModal() {
  if (!modal1 || modal1.hidden) return modal1;
  return modal2;
}

async function openModal(relPath) {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = '…';
  m.querySelector('.modal-body').innerHTML =
    '<div style="padding:24px;color:#888;font-family:sans-serif;font-size:13px">Loading…</div>';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch(`/preview?path=${encodeURIComponent(relPath)}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const html = await r.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const title = doc.body?.dataset.title || doc.title ||
      relPath.split('/').pop().replace(/\.md$/, '').replace(/[-_]/g, ' ');
    const content = doc.querySelector('.web-content');
    m.querySelector('.modal-title').textContent = title;
    m.querySelector('.modal-body').innerHTML = content
      ? `<div class="web-content" style="padding:20px 24px">${content.innerHTML}</div>`
      : doc.body?.innerHTML || '';
  } catch (err) {
    m.querySelector('.modal-title').textContent = 'Error';
    m.querySelector('.modal-body').innerHTML =
      `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${err.message}</div>`;
  }
}

function open5eModal(url) {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = '5etools';
  m.querySelector('.modal-body').innerHTML = `<iframe src="${url}" title="5etools"></iframe>`;
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
}

function closeTopModal() {
  const m = getTopModal();
  if (!m) return;
  m.classList.remove('visible');
  setTimeout(() => {
    m.hidden = true;
    m.querySelector('.modal-body').innerHTML = '';
    m.querySelector('.modal-box').classList.remove('modal-box--tall');
  }, 180);
}

// Document-level click handler for modal links and close targets
document.addEventListener('click', e => {
  // data-modal links (NPC, location, faction cross-refs)
  const modalLink = e.target.closest('[data-modal]');
  if (modalLink) { e.preventDefault(); openModal(modalLink.dataset.modal); return; }

  // data-modal-5e links (5etools)
  const e5Link = e.target.closest('[data-modal-5e]');
  if (e5Link) { e.preventDefault(); open5eModal(e5Link.dataset.modal5e); return; }

  // Close button
  if (e.target.closest('.modal-close')) { closeTopModal(); return; }

  // Backdrop click (click on overlay itself, not the box)
  if (e.target.classList.contains('modal-overlay')) closeTopModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeTopModal();
});
```

- [ ] **Commit**

```bash
git add web/public/app.js
git commit -m "feat: add modal open/close JS with 2-deep nesting support"
```

---

## Task 10: Replace nav and add Tools dropdown

**Files:** `web/public/index.html`, `web/public/app.js`

- [ ] **Replace the nav in index.html**

Replace the entire `<nav class="tab-group">` block with:

```html
    <nav class="tab-group">
      <button class="tab" data-path="adventures">Adventures</button>
      <button class="tab" data-path="npcs">NPCs</button>
      <button class="tab" data-path="locations">Locations</button>
      <button class="tab" data-path="gm-lore">GM Lore</button>
      <div id="tools-wrap">
        <button id="btn-tools">Tools ▾</button>
        <div id="tools-dropdown" hidden>
          <div class="tools-section">
            <div class="tools-section-label">World Tables</div>
            <div id="tools-world-tables">
              <div class="tool-item" style="color:var(--subtext);cursor:default;font-style:italic">Loading…</div>
            </div>
          </div>
          <div class="tools-section">
            <div class="tools-section-label">SRD Tools</div>
            <button id="tool-random-encounter" class="tool-item">⚔ Random Encounter</button>
            <button id="tool-treasure-hoard" class="tool-item">💰 Treasure Hoard</button>
          </div>
          <div class="tools-section">
            <div class="tools-section-label">5etools</div>
            <button class="tool-item tool-5e" data-5e-url="http://localhost:2014">🎲 5etools</button>
            <button class="tool-item tool-5e" data-5e-url="http://localhost:2014/bestiary.html">🐉 Bestiary</button>
            <button class="tool-item tool-5e" data-5e-url="http://localhost:2014/spells.html">✨ Spells</button>
          </div>
        </div>
      </div>
    </nav>
```

- [ ] **Add Tools dropdown JS** — insert before `// ─── Init` at end of app.js:

```js
// ─── Tools dropdown ───────────────────────────────────────────────────────────

const btnTools       = $('btn-tools');
const toolsDropdown  = $('tools-dropdown');
const worldTablesDiv = $('tools-world-tables');

function closeTools() {
  toolsDropdown.hidden = true;
  btnTools.classList.remove('open');
}

btnTools.addEventListener('click', e => {
  e.stopPropagation();
  const opening = toolsDropdown.hidden;
  toolsDropdown.hidden = !opening;
  btnTools.classList.toggle('open', opening);
});

document.addEventListener('click', () => closeTools());

// Populate World Tables from /api/tables
async function loadWorldTables() {
  try {
    const r = await fetch('/api/tables');
    const tables = await r.json();
    if (tables.length === 0) {
      worldTablesDiv.innerHTML =
        '<div class="tool-item" style="color:var(--subtext);cursor:default;font-style:italic">No tables found</div>';
      return;
    }
    worldTablesDiv.innerHTML = '';
    for (const t of tables) {
      const btn = document.createElement('button');
      btn.className = 'tool-item';
      btn.textContent = t.name;
      btn.addEventListener('click', () => { closeTools(); openModal(t.path); });
      worldTablesDiv.appendChild(btn);
    }
  } catch {
    worldTablesDiv.innerHTML =
      '<div class="tool-item" style="color:var(--red);cursor:default">Failed to load</div>';
  }
}

// Random Encounter tool
$('tool-random-encounter').addEventListener('click', () => {
  closeTools();
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Random Encounter';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-body').innerHTML = `
    <div style="padding:16px;font-family:'Segoe UI',sans-serif">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <label style="font-size:12px;color:var(--subtext)">Challenge Rating</label>
        <select id="re-cr" style="background:var(--overlay);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;font-size:12px">
          ${[0,'1/8','1/4','1/2',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
            .map(cr => `<option value="${cr}">${cr}</option>`).join('')}
        </select>
        <button onclick="rollEncounter()" style="background:var(--accent);border:none;color:#1e1e2e;padding:5px 12px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Roll</button>
      </div>
      <div id="re-result"></div>
    </div>`;
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
});

window.rollEncounter = async function() {
  const cr = $('re-cr')?.value || '1';
  const el = $('re-result');
  if (!el) return;
  el.innerHTML = '<div style="color:var(--subtext);font-size:12px">Rolling…</div>';
  try {
    const r = await fetch(`/tools/random-encounter?cr=${encodeURIComponent(cr)}`);
    el.innerHTML = await r.text();
  } catch (e) {
    el.innerHTML = `<div style="color:var(--red);font-size:12px">${e.message}</div>`;
  }
};

// Treasure Hoard tool
$('tool-treasure-hoard').addEventListener('click', () => {
  closeTools();
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Treasure Hoard';
  m.querySelector('.modal-box').classList.remove('modal-box--tall');
  m.querySelector('.modal-body').innerHTML = `
    <div style="padding:16px;font-family:'Segoe UI',sans-serif">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <label style="font-size:12px;color:var(--subtext)">Party Level</label>
        <select id="th-level" style="background:var(--overlay);border:1px solid var(--border);color:var(--text);padding:4px 8px;border-radius:4px;font-size:12px">
          ${Array.from({ length: 20 }, (_, i) => i + 1)
            .map(l => `<option value="${l}">${l}</option>`).join('')}
        </select>
        <button onclick="rollHoard()" style="background:var(--accent);border:none;color:#1e1e2e;padding:5px 12px;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600">Generate</button>
      </div>
      <div id="th-result"></div>
    </div>`;
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));
});

window.rollHoard = async function() {
  const level = $('th-level')?.value || '1';
  const el = $('th-result');
  if (!el) return;
  el.innerHTML = '<div style="color:var(--subtext);font-size:12px">Generating…</div>';
  try {
    const r = await fetch(`/tools/treasure-hoard?level=${level}`);
    el.innerHTML = await r.text();
  } catch (e) {
    el.innerHTML = `<div style="color:var(--red);font-size:12px">${e.message}</div>`;
  }
};

// 5etools buttons
document.querySelectorAll('.tool-5e').forEach(btn => {
  btn.addEventListener('click', () => {
    closeTools();
    open5eModal(btn.dataset['5eUrl']);
  });
});
```

- [ ] **Update DOMContentLoaded in app.js to call loadWorldTables()**

Find:
```js
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  initTerminal();
});
```

Replace with:
```js
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  initTerminal();
  loadWorldTables();
});
```

- [ ] **Commit**

```bash
git add web/public/index.html web/public/app.js
git commit -m "feat: replace nav with web-first tabs and Tools dropdown"
```

---

## Task 11: Restart and full smoke test

- [ ] **Kill and restart server**

```bash
powershell.exe -Command "Get-NetTCPConnection -LocalPort 5050 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force -ErrorAction SilentlyContinue }; Start-Sleep 1; Write-Host done"
cd web && node server.js &
sleep 2
```

- [ ] **Verify server is up**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:5050/
```

Expected: `200`

- [ ] **Test web renderer renders The Pale Sickness**

```bash
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness.md" | grep -c "web-content"
```

Expected: `1`

- [ ] **Test callout divs appear**

```bash
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness.md" | grep -c "callout note"
```

Expected: `>0`

- [ ] **Test /api/tables returns results**

```bash
curl -s http://localhost:5050/api/tables
```

Expected: JSON array with at least 2 items (downtime-waystone-inn, travel-encounters-northreach)

- [ ] **Test /tools/random-encounter**

```bash
curl -s "http://localhost:5050/tools/random-encounter?cr=2" | grep -c "STR"
```

Expected: `1`

- [ ] **Test /tools/treasure-hoard**

```bash
curl -s "http://localhost:5050/tools/treasure-hoard?level=8" | grep -c "Treasure Hoard"
```

Expected: `1`

- [ ] **Open browser and verify manually**

Open `http://localhost:5050` and check:
1. Tabs show: Adventures · NPCs · Locations · GM Lore · Tools ▾
2. Click Adventures → file tree shows `season-1/`, `season-2/` subfolders
3. Open `adventures/season-1/the-pale-sickness.md` → parchment-style render, no two-column overflow
4. `{{note` blocks render as styled callout boxes
5. Tools ▾ dropdown opens with World Tables section populated
6. Random Encounter tool opens modal, Roll button fetches a monster
7. Treasure Hoard modal generates loot
8. 5etools Bestiary button opens iframe modal

- [ ] **Final commit**

```bash
git add -A
git commit -m "feat: DM Dashboard web-first overhaul complete

- Archive print files to _print/
- Migrate DM resources to gm-lore/ and tables/
- Add marked renderer for web-native content dirs
- Add modal reference system (data-modal + data-modal-5e)
- Add Tools dropdown (world tables, SRD tools, 5etools)
- Replace nav tabs with Adventures/NPCs/Locations/GM Lore/Tools"
```

---

## Self-Review Notes

- `esc()` is already defined in `server.js` — used correctly in new endpoints
- `extractFrontmatter()` defined in Task 4 before it is called in Task 6 (`/api/tables`) ✓
- `isWebPath()` and `WEB_DIRS` defined in Task 4 before used in Task 5 ✓
- `getFreeModal()` defined in Task 9 before called in Task 10 ✓
- `open5eModal()` defined in Task 9 before `.tool-5e` buttons wire it in Task 10 ✓
- `closeTools()` defined before used in all tool button handlers ✓
- Node 24 has native `fetch` — no node-fetch dependency needed ✓
- `_print/` auto-excluded by existing `startsWith('_')` filter — no server change required ✓
- `tables/` is in `WEB_DIRS` so table files render with marked ✓
