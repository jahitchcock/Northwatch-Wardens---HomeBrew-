# Combat Tracker — Add Combatants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tabbed panel to the Combat Tracker modal for quick-adding players, NPCs, and monsters (from adventures or 5etools bestiary).

**Architecture:** Three new server endpoints supply data; a persistent `ctAddPanel*` state object survives re-renders; `renderCombatTracker` renders the panel HTML and delegates to tab-specific async render functions. The existing manual add form moves into the Manual tab.

**Tech Stack:** Node.js/Express (server), vanilla JS DOM (client), `fetch` for API calls (Node 18+ built-in), CSS in `web/public/style.css`.

---

## File Map

| File | Change |
|---|---|
| `web/server.js` | Add 3 endpoints: `/api/npcs`, `/api/adventures`, `/api/5etools/search` |
| `web/public/app.js` | Replace add form with tabbed panel; add all tab render functions |
| `web/public/style.css` | Add `.ct-add-panel`, `.ct-add-tab`, `.ct-add-row`, `.ct-add-dim` styles |

---

## Task 1: `GET /api/npcs` endpoint

**Files:**
- Modify: `web/server.js` (add after the `/api/adventure-monsters` block, around line 1388)

**What it returns:** `[{ name, ac, hp, dexMod }, ...]` — ac/hp parsed from stat block table, dexMod from ability scores row (null if not found).

- [ ] **Step 1: Write a manual test script**

Create `web/test-npcs.js` (delete after verifying):

```javascript
const http = require('http');
http.get('http://localhost:5050/api/npcs', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const npcs = JSON.parse(d);
    console.assert(Array.isArray(npcs), 'should be array');
    console.assert(npcs.length >= 5, 'should have multiple NPCs, got ' + npcs.length);
    console.assert(npcs.find(n => n.name === 'Marshal Brenna Thorne'), 'Brenna Thorne should be present');
    const brenna = npcs.find(n => n.name === 'Marshal Brenna Thorne');
    console.assert(brenna.ac === 17, 'Brenna AC should be 17, got ' + brenna.ac);
    console.assert(brenna.hp === 58, 'Brenna HP should be 58, got ' + brenna.hp);
    console.log('PASS:', npcs.length, 'NPCs loaded');
    npcs.slice(0, 3).forEach(n => console.log(' ', n.name, 'AC', n.ac, 'HP', n.hp, 'dex', n.dexMod));
  });
});
```

- [ ] **Step 2: Confirm test fails (server doesn't have endpoint yet)**

```bash
cd web && node test-npcs.js
```
Expected: `Error: connect ECONNREFUSED` or HTTP 404.

- [ ] **Step 3: Add the endpoint to `web/server.js`**

Add this block after the `app.get('/api/adventure-monsters', ...)` block (after line 1388):

```javascript
// ─── NPC list API ─────────────────────────────────────────────────────────────

function parseNpcFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');

  // Name from frontmatter
  const nameMatch = raw.match(/^name:\s*(.+)$/m);
  if (!nameMatch) return null;
  const name = nameMatch[1].trim();

  // AC from stat block table: | **Armor Class** | 17 (splint) |
  const acMatch = raw.match(/\|\s*\*\*Armor Class\*\*\s*\|\s*(\d+)/i);
  const ac = acMatch ? parseInt(acMatch[1]) : null;

  // HP from stat block table: | **Hit Points** | 58 (9d8 + 18) |
  const hpMatch = raw.match(/\|\s*\*\*Hit Points\*\*\s*\|\s*(\d+)/i);
  const hp = hpMatch ? parseInt(hpMatch[1]) : null;

  // DEX mod from ability scores row: | 16 (+3) | 13 (+1) | ...
  // Find the first row with the pattern "| N (+X) | N (+Y) |"
  const abilityMatch = raw.match(/\|\s*\d+\s*\([^)]+\)\s*\|\s*\d+\s*\(([+-]?\d+)\)\s*\|/);
  const dexMod = abilityMatch ? parseInt(abilityMatch[1]) : null;

  return { name, ac, hp, dexMod };
}

app.get('/api/npcs', (req, res) => {
  try {
    const dirs = [
      path.join(CAMPAIGN_ROOT, 'npcs', 'core'),
      path.join(CAMPAIGN_ROOT, 'npcs', 'season-1'),
    ];
    const npcs = [];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.md') || file === 'index.md' || file === '_template.md') continue;
        try {
          const npc = parseNpcFile(path.join(dir, file));
          if (npc) npcs.push(npc);
        } catch { /* skip malformed files */ }
      }
    }
    npcs.sort((a, b) => a.name.localeCompare(b.name));
    res.json(npcs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

- [ ] **Step 4: Restart server and run test**

```bash
# Kill and restart server (or use the VS Code task "Start DM Panel")
node web/server.js &
node web/test-npcs.js
```
Expected: `PASS: N NPCs loaded` with Brenna showing AC 17, HP 58.

- [ ] **Step 5: Clean up test file and commit**

```bash
rm web/test-npcs.js
git add web/server.js
git commit -m "feat: add /api/npcs endpoint — scans npcs/core and npcs/season-1"
```

---

## Task 2: `GET /api/adventures` endpoint

**Files:**
- Modify: `web/server.js` (add after `/api/npcs` block)

**What it returns:** `[{ label, path }, ...]` — label is a human-readable name, path is relative to campaign root (for use with `/api/adventure-monsters`).

- [ ] **Step 1: Write manual test**

Create `web/test-adventures.js`:

```javascript
const http = require('http');
http.get('http://localhost:5050/api/adventures', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const advs = JSON.parse(d);
    console.assert(Array.isArray(advs), 'should be array');
    console.assert(advs.length >= 5, 'should have multiple adventures, got ' + advs.length);
    console.assert(advs.find(a => a.label === 'Wolves of Welton'), 'should include Wolves of Welton');
    console.log('PASS:', advs.length, 'adventures');
    advs.forEach(a => console.log(' ', a.label, '->', a.path));
  });
});
```

- [ ] **Step 2: Confirm test fails**

```bash
node web/test-adventures.js
```
Expected: HTTP 404.

- [ ] **Step 3: Add the endpoint to `web/server.js`**

Add after the `/api/npcs` block:

```javascript
// ─── Adventures list API ──────────────────────────────────────────────────────

function labelFromFilename(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

app.get('/api/adventures', (req, res) => {
  try {
    const adventuresRoot = path.join(CAMPAIGN_ROOT, 'adventures');
    const results = [];

    // Walk season subdirectories only
    const seasonDirs = fs.readdirSync(adventuresRoot)
      .filter(d => /^season-\d+$/i.test(d))
      .map(d => ({ season: d, full: path.join(adventuresRoot, d) }))
      .filter(d => fs.statSync(d.full).isDirectory());

    const SKIP = new Set(['index.md', '_template.md', 'MANIFEST.md', 'session-0-character-integration.md']);

    for (const { season, full } of seasonDirs) {
      for (const entry of fs.readdirSync(full)) {
        const entryPath = path.join(full, entry);
        const stat = fs.statSync(entryPath);

        if (stat.isFile() && entry.endsWith('.md') && !SKIP.has(entry) && !entry.endsWith('-handouts')) {
          const rel = path.relative(CAMPAIGN_ROOT, entryPath).replace(/\\/g, '/');
          results.push({ label: labelFromFilename(entry), path: rel, season });
        } else if (stat.isDirectory() && !entry.endsWith('-handouts') && entry !== 'general-handouts') {
          // Multi-part adventures: look for index.md inside
          const indexFile = path.join(entryPath, 'index.md');
          if (fs.existsSync(indexFile)) {
            const rel = path.relative(CAMPAIGN_ROOT, indexFile).replace(/\\/g, '/');
            results.push({ label: labelFromFilename(entry), path: rel, season });
          }
        }
      }
    }

    results.sort((a, b) => a.season.localeCompare(b.season) || a.label.localeCompare(b.label));
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

- [ ] **Step 4: Restart server and run test**

```bash
node web/test-adventures.js
```
Expected: `PASS: N adventures` with "Wolves of Welton" in the list.

- [ ] **Step 5: Clean up and commit**

```bash
rm web/test-adventures.js
git add web/server.js
git commit -m "feat: add /api/adventures endpoint — lists adventure files by season"
```

---

## Task 3: `GET /api/5etools/search` endpoint

**Files:**
- Modify: `web/server.js` (add after `/api/adventures` block)

**What it returns:** `[{ name, ac, hp, cr }, ...]` — searches 5etools JSON at port 2014 first, falls back to open5e API.

- [ ] **Step 1: Write manual test**

Create `web/test-5esearch.js`:

```javascript
const http = require('http');
http.get('http://localhost:5050/api/5etools/search?q=wolf', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const monsters = JSON.parse(d);
    console.assert(Array.isArray(monsters), 'should be array');
    console.assert(monsters.length > 0, 'should find wolves');
    console.assert(monsters.find(m => m.name.toLowerCase().includes('wolf')), 'results should include wolf');
    console.log('PASS:', monsters.length, 'results for "wolf"');
    monsters.slice(0, 3).forEach(m => console.log(' ', m.name, 'AC', m.ac, 'HP', m.hp, 'CR', m.cr));
  });
});
```

- [ ] **Step 2: Confirm test fails**

```bash
node web/test-5esearch.js
```
Expected: HTTP 404.

- [ ] **Step 3: Add the endpoint to `web/server.js`**

Add after the `/api/adventures` block. Note: `fetch` requires Node 18+. The server also needs the `https` module for the open5e fallback.

```javascript
// ─── 5etools / open5e bestiary search API ─────────────────────────────────────

let bestiaryCache = null; // [{ name, ac, hp, cr }]

async function load5etoolsBestiary() {
  if (bestiaryCache) return bestiaryCache;
  // 5etools stores an index at /data/bestiary/index.json mapping source codes to filenames
  const indexRes = await fetch('http://localhost:2014/data/bestiary/index.json');
  const index = await indexRes.json();
  const files = Object.values(index);

  const fetches = files.map(f =>
    fetch(`http://localhost:2014/data/bestiary/${f}`)
      .then(r => r.json())
      .catch(() => null)
  );
  const results = await Promise.all(fetches);

  const monsters = [];
  for (const data of results) {
    if (!data || !Array.isArray(data.monster)) continue;
    for (const m of data.monster) {
      const ac = Array.isArray(m.ac) ? (m.ac[0]?.ac ?? m.ac[0] ?? 10) : (m.ac ?? 10);
      const hp = m.hp?.average ?? 0;
      const cr = m.cr?.cr ?? m.cr ?? '?';
      monsters.push({ name: m.name, ac: parseInt(ac) || 10, hp: parseInt(hp) || 0, cr: String(cr) });
    }
  }
  bestiaryCache = monsters;
  return monsters;
}

async function searchOpen5e(q) {
  const url = `https://api.open5e.com/v1/monsters/?search=${encodeURIComponent(q)}&limit=20`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).map(m => ({
    name: m.name,
    ac: typeof m.armor_class === 'number' ? m.armor_class : 10,
    hp: m.hit_points ?? 0,
    cr: String(m.challenge_rating ?? '?'),
  }));
}

app.get('/api/5etools/search', async (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (q.length < 2) return res.json([]);

  // Try 5etools local first
  try {
    const all = await load5etoolsBestiary();
    const results = all
      .filter(m => m.name.toLowerCase().includes(q))
      .slice(0, 20);
    if (results.length > 0) return res.json(results);
  } catch { /* fall through to open5e */ }

  // Fallback: open5e SRD API
  try {
    const results = await searchOpen5e(q);
    return res.json(results);
  } catch (e) {
    res.status(502).json({ error: 'Bestiary search unavailable: ' + e.message });
  }
});
```

- [ ] **Step 4: Restart server and run test**

```bash
node web/test-5esearch.js
```
Expected: `PASS: N results for "wolf"` — wolves listed with AC/HP/CR.

- [ ] **Step 5: Clean up and commit**

```bash
rm web/test-5esearch.js
git add web/server.js
git commit -m "feat: add /api/5etools/search endpoint — 5etools local + open5e fallback"
```

---

## Task 4: Add panel CSS

**Files:**
- Modify: `web/public/style.css`

- [ ] **Step 1: Add styles to bottom of `web/public/style.css`**

```css
/* ── Combat Tracker Add Panel ────────────────────────── */
.ct-add-panel {
  border-top: 2px solid #89b4fa;
  background: #0a0a0a;
  flex-shrink: 0;
}
.ct-add-tabs {
  display: flex;
  border-bottom: 1px solid #1e1e2e;
}
.ct-add-tab {
  padding: 6px 14px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}
.ct-add-tab:hover { color: #cdd6f4; }
.ct-add-tab.active { color: #89b4fa; border-bottom-color: #89b4fa; }
.ct-add-sub-tabs {
  display: flex;
  gap: 4px;
  padding: 6px 10px;
  border-bottom: 1px solid #1a1a2a;
}
.ct-add-sub-tab {
  padding: 2px 10px;
  background: none;
  border: 1px solid #333;
  border-radius: 3px;
  color: #666;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
}
.ct-add-sub-tab.active { background: #1e3a5f; color: #89b4fa; border-color: #89b4fa; }
.ct-add-body {
  padding: 8px 10px;
  max-height: 180px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.ct-add-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: #1e1e2e;
  border-radius: 3px;
  font-size: 12px;
}
.ct-add-row.ct-add-dim { opacity: 0.45; }
.ct-add-name { flex: 1; color: #cdd6f4; }
.ct-add-sub { color: #888; font-size: 10px; }
.ct-add-stat { color: #888; font-size: 11px; white-space: nowrap; }
.ct-add-check { color: #a6e3a1; font-size: 10px; white-space: nowrap; }
.ct-add-init-wrap { display: flex; align-items: center; gap: 4px; }
.ct-add-init {
  width: 50px;
  padding: 2px 4px;
  background: #111;
  border: 1px solid #444;
  border-radius: 3px;
  color: #cdd6f4;
  font-size: 11px;
  text-align: center;
}
.ct-add-init.error { border-color: #f38ba8; }
.ct-add-btn-sm {
  padding: 2px 8px;
  background: #313244;
  border: none;
  border-radius: 3px;
  color: #cdd6f4;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
}
.ct-add-btn-sm:hover { background: #45475a; }
.ct-add-loading { color: #666; font-size: 12px; padding: 8px; }
.ct-add-error { color: #f38ba8; font-size: 12px; padding: 8px; }
.ct-add-adv-select {
  width: 100%;
  background: #1e1e2e;
  border: 1px solid #444;
  border-radius: 3px;
  color: #cdd6f4;
  padding: 4px 6px;
  font-size: 12px;
  margin-bottom: 6px;
  font-family: inherit;
}
.ct-add-search {
  width: 100%;
  background: #1e1e2e;
  border: 1px solid #444;
  border-radius: 3px;
  color: #cdd6f4;
  padding: 4px 8px;
  font-size: 12px;
  margin-bottom: 6px;
  font-family: inherit;
  box-sizing: border-box;
}
.ct-add-count {
  width: 40px;
  padding: 2px 4px;
  background: #111;
  border: 1px solid #444;
  border-radius: 3px;
  color: #cdd6f4;
  font-size: 11px;
  text-align: center;
}
.ct-add-all-btn {
  padding: 2px 10px;
  background: #1e3a1e;
  border: 1px solid #a6e3a1;
  border-radius: 3px;
  color: #a6e3a1;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  margin-left: auto;
}
.ct-add-all-btn:hover { background: #2a4a2a; }
.ct-add-toggle-btn {
  padding: 3px 10px;
  background: #89b4fa;
  border: none;
  border-radius: 3px;
  color: #1e1e2e;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}
.ct-add-toggle-btn.open { background: #313244; color: #cdd6f4; }
```

- [ ] **Step 2: Verify styles load without errors**

Open the DM Panel at `http://localhost:5050`, open Combat Tracker. No console errors.

- [ ] **Step 3: Commit**

```bash
git add web/public/style.css
git commit -m "feat: add CSS for combat tracker add panel"
```

---

## Task 5: Add panel scaffold + toggle wiring

**Files:**
- Modify: `web/public/app.js`

Add state variables and replace the `ct-add-form` HTML with the tabbed panel. Wire the toggle button. The tab-specific render functions come in later tasks.

- [ ] **Step 1: Add state variables near the top of the Combat Tracker section (around line 884)**

Find the line:
```javascript
let combatState = null; // { round, turnIndex, combatants: [] }
```

Add below it:
```javascript
let ctAddPanelOpen = false;
let ctAddPanelTab = 'players'; // 'players' | 'npcs' | 'monsters' | 'manual'
let ctAddMonsterTab = 'adventure'; // 'adventure' | '5etools'
let ctAddAdventurePath = ''; // selected adventure file path
let ctAddSearchQuery = ''; // 5etools search query
```

- [ ] **Step 2: Replace the add form HTML inside `renderCombatTracker`**

Find this block (around line 941):
```javascript
      <div class="ct-add-form" id="ct-add-form">
        <label>Name</label><input name="name" placeholder="Goblin" autocomplete="off">
        <label>Init</label><input name="init" type="number" placeholder="12" style="width:48px">
        <label>AC</label><input name="ac" type="number" placeholder="13" style="width:44px">
        <label>HP</label><input name="hp" type="number" placeholder="7" style="width:52px">
        <select class="ct-type-sel" name="type">
          <option value="monster">Monster</option>
          <option value="player">Player</option>
          <option value="npc">NPC</option>
        </select>
        <button class="ct-add-submit" id="ct-add-btn">+ Add</button>
        <button class="ct-from-adv-btn" id="ct-from-adv" title="Import monsters from current adventure"${currentPath && currentPath.startsWith('adventures/') && currentPath.endsWith('.md') ? '' : ' hidden'}>From Adventure</button>
      </div>
      <div id="ct-import-panel"></div>
```

Replace with:
```javascript
      <div class="ct-add-panel" id="ct-add-panel"${ctAddPanelOpen ? '' : ' hidden'}>
        <div class="ct-add-tabs" id="ct-add-tabs">
          <button class="ct-add-tab${ctAddPanelTab==='players'?' active':''}" data-tab="players">Players</button>
          <button class="ct-add-tab${ctAddPanelTab==='npcs'?' active':''}" data-tab="npcs">NPCs</button>
          <button class="ct-add-tab${ctAddPanelTab==='monsters'?' active':''}" data-tab="monsters">Monsters</button>
          <button class="ct-add-tab${ctAddPanelTab==='manual'?' active':''}" data-tab="manual">Manual</button>
        </div>
        <div class="ct-add-body" id="ct-add-body"></div>
      </div>
```

Also update the header HTML. Find (around line 933):
```javascript
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
          <button class="ct-load-btn" id="ct-load">Load</button>
          <button class="ct-save-btn" id="ct-save">Save</button>
          <button class="ct-reset-btn" id="ct-reset">Reset</button>
        </div>
```

Replace with:
```javascript
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
          <button class="ct-load-btn" id="ct-load">Load</button>
          <button class="ct-save-btn" id="ct-save">Save</button>
          <button class="ct-reset-btn" id="ct-reset">Reset</button>
          <button class="ct-add-toggle-btn${ctAddPanelOpen?' open':''}" id="ct-add-toggle">${ctAddPanelOpen ? '✕ Close' : '+ Add'}</button>
        </div>
```

- [ ] **Step 3: Wire toggle button and tab buttons — add after the existing `#ct-reset` listener block (around line 970)**

Add this block:
```javascript
  m.querySelector('#ct-add-toggle').addEventListener('click', () => {
    ctAddPanelOpen = !ctAddPanelOpen;
    renderCombatTracker(m);
    if (ctAddPanelOpen) renderAddTab(m);
  });

  if (ctAddPanelOpen) {
    m.querySelectorAll('.ct-add-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        ctAddPanelTab = tab.dataset.tab;
        m.querySelectorAll('.ct-add-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderAddTab(m);
      });
    });
    renderAddTab(m);
  }
```

- [ ] **Step 4: Add the `renderAddTab` dispatcher function — add after `renderCombatTracker` function closes (around line 1035)**

```javascript
function renderAddTab(m) {
  switch (ctAddPanelTab) {
    case 'players':   renderAddPlayers(m);  break;
    case 'npcs':      renderAddNpcs(m);     break;
    case 'monsters':  renderAddMonsters(m); break;
    case 'manual':    renderAddManual(m);   break;
  }
}
```

- [ ] **Step 5: Remove the old `#ct-add-btn` and `#ct-from-adv` listener blocks**

Find and delete from `renderCombatTracker`:
```javascript
  m.querySelector('#ct-add-btn').addEventListener('click', () => {
    ...
  });

  m.querySelector('#ct-add-form [name=hp]').addEventListener('keydown', e => {
    if (e.key === 'Enter') m.querySelector('#ct-add-btn').click();
  });

  const fromAdvBtn = m.querySelector('#ct-from-adv');
  if (fromAdvBtn) {
    fromAdvBtn.addEventListener('click', () => {
      ...
    });
  }
```

- [ ] **Step 6: Verify in browser**

Open Combat Tracker. Header should show `+ Add` button. Clicking it opens the panel with four tabs. Clicking again closes it. No console errors. Tab buttons switch the active tab (body will be empty until Task 6+).

- [ ] **Step 7: Commit**

```bash
git add web/public/app.js
git commit -m "feat: combat tracker add panel scaffold — toggle + tab navigation"
```

---

## Task 6: Players tab

**Files:**
- Modify: `web/public/app.js` (add `renderAddPlayers` function after `renderAddTab`)

- [ ] **Step 1: Add `renderAddPlayers` function**

```javascript
async function renderAddPlayers(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;
  body.innerHTML = '<div class="ct-add-loading">Loading…</div>';
  let chars;
  try {
    const r = await fetch('/api/characters');
    if (!r.ok) throw new Error('Failed to load party');
    chars = await r.json();
  } catch (e) {
    body.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  const inCombat = new Set(
    combatState.combatants.filter(c => c.type === 'player').map(c => c.name)
  );

  body.innerHTML = '';
  chars.forEach(ch => {
    const already = inCombat.has(ch.name);
    const row = document.createElement('div');
    row.className = 'ct-add-row' + (already ? ' ct-add-dim' : '');
    row.innerHTML = `
      <span class="ct-add-name">${ch.name} <span class="ct-add-sub">${ch.classLevel || ''}</span></span>
      <span class="ct-add-stat">AC ${ch.ac} · HP ${ch.maxHp}</span>
      ${already
        ? '<span class="ct-add-check">✓ in combat</span>'
        : `<div class="ct-add-init-wrap">
             <input class="ct-add-init" type="number" placeholder="Init" min="-5" max="30" aria-label="Initiative">
             <button class="ct-add-btn-sm ct-player-add-btn">+ Add</button>
           </div>`
      }`;
    body.appendChild(row);

    if (already) return;

    const initInput = row.querySelector('.ct-add-init');
    const addBtn = row.querySelector('.ct-player-add-btn');

    const doAdd = () => {
      const init = parseInt(initInput.value);
      if (isNaN(init)) {
        initInput.classList.add('error');
        initInput.focus();
        return;
      }
      combatState.combatants.push({
        id: ctUid(), name: ch.name,
        initiative: init, ac: ch.ac,
        hpMax: ch.maxHp, hpCur: ch.maxHp,
        type: 'player', conditions: [],
      });
      renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
        combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
      renderAddPlayers(m); // refresh to show "in combat"
    };

    addBtn.addEventListener('click', doAdd);
    initInput.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
    initInput.addEventListener('input', () => initInput.classList.remove('error'));
  });
}
```

- [ ] **Step 2: Verify in browser**

Open Combat Tracker → click `+ Add` → Players tab shows party members with AC/HP. Entering initiative and clicking `+ Add` adds them to the tracker list. Already-added players show ✓ dimmed. Red border on empty init field.

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: combat tracker Players tab — quick-add party members with manual initiative"
```

---

## Task 7: NPCs tab

**Files:**
- Modify: `web/public/app.js` (add `renderAddNpcs` function after `renderAddPlayers`)

- [ ] **Step 1: Add `renderAddNpcs` function**

```javascript
async function renderAddNpcs(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;
  body.innerHTML = '<div class="ct-add-loading">Loading…</div>';
  let npcs;
  try {
    const r = await fetch('/api/npcs');
    if (!r.ok) throw new Error('Failed to load NPCs');
    npcs = await r.json();
  } catch (e) {
    body.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  if (!npcs.length) {
    body.innerHTML = '<div class="ct-add-loading">No NPC stat blocks found.</div>';
    return;
  }

  body.innerHTML = '';
  npcs.forEach(npc => {
    const row = document.createElement('div');
    row.className = 'ct-add-row';
    const acLabel = npc.ac != null ? `AC ${npc.ac}` : 'AC ?';
    const hpLabel = npc.hp != null ? `HP ${npc.hp}` : 'HP ?';
    row.innerHTML = `
      <span class="ct-add-name">${npc.name}</span>
      <span class="ct-add-stat">${acLabel} · ${hpLabel}</span>
      <button class="ct-add-btn-sm ct-npc-add-btn">+ Add</button>`;
    body.appendChild(row);

    row.querySelector('.ct-npc-add-btn').addEventListener('click', () => {
      const dexMod = npc.dexMod ?? 0;
      const initiative = Math.floor(Math.random() * 20) + 1 + dexMod;
      combatState.combatants.push({
        id: ctUid(), name: npc.name,
        initiative, ac: npc.ac ?? 10,
        hpMax: npc.hp ?? 1, hpCur: npc.hp ?? 1,
        type: 'npc', conditions: [],
      });
      renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
        combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
    });
  });
}
```

- [ ] **Step 2: Verify in browser**

NPCs tab shows all NPCs with stat blocks. Clicking `+ Add` adds them to the tracker with a rolled initiative. NPCs without AC/HP show `AC ? · HP ?` and default to 10/1.

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: combat tracker NPCs tab — quick-add from campaign roster with auto-roll initiative"
```

---

## Task 8: Monsters tab — Adventure sub-tab

**Files:**
- Modify: `web/public/app.js` (add `renderAddMonsters` and `renderAddMonstersAdventure` functions)

- [ ] **Step 1: Add `renderAddMonsters` dispatcher and `renderAddMonstersAdventure` function**

```javascript
function renderAddMonsters(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;

  body.innerHTML = `
    <div class="ct-add-sub-tabs">
      <button class="ct-add-sub-tab${ctAddMonsterTab==='adventure'?' active':''}" data-mtab="adventure">Adventure</button>
      <button class="ct-add-sub-tab${ctAddMonsterTab==='5etools'?' active':''}" data-mtab="5etools">5etools</button>
    </div>
    <div id="ct-add-monster-body"></div>`;

  body.querySelectorAll('.ct-add-sub-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      ctAddMonsterTab = tab.dataset.mtab;
      body.querySelectorAll('.ct-add-sub-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderAddMonstersBody(m);
    });
  });

  renderAddMonstersBody(m);
}

function renderAddMonstersBody(m) {
  if (ctAddMonsterTab === 'adventure') renderAddMonstersAdventure(m);
  else renderAddMonsters5etools(m);
}

async function renderAddMonstersAdventure(m) {
  const wrap = m.querySelector('#ct-add-monster-body');
  if (!wrap) return;
  wrap.innerHTML = '<div class="ct-add-loading">Loading adventures…</div>';

  let adventures;
  try {
    const r = await fetch('/api/adventures');
    if (!r.ok) throw new Error('Failed to load adventures');
    adventures = await r.json();
  } catch (e) {
    wrap.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  // Seed selection to first adventure if not set
  if (!ctAddAdventurePath && adventures.length) ctAddAdventurePath = adventures[0].path;

  const options = adventures.map(a =>
    `<option value="${a.path}"${a.path === ctAddAdventurePath ? ' selected' : ''}>${a.season.replace('season-', 'S')} — ${a.label}</option>`
  ).join('');

  wrap.innerHTML = `
    <select class="ct-add-adv-select" id="ct-adv-select">${options}</select>
    <div id="ct-adv-monsters"></div>`;

  wrap.querySelector('#ct-adv-select').addEventListener('change', e => {
    ctAddAdventurePath = e.target.value;
    loadAdvMonsters(m);
  });

  loadAdvMonsters(m);
}

async function loadAdvMonsters(m) {
  const wrap = m.querySelector('#ct-adv-monsters');
  if (!wrap) return;
  if (!ctAddAdventurePath) { wrap.innerHTML = '<div class="ct-add-loading">Select an adventure.</div>'; return; }
  wrap.innerHTML = '<div class="ct-add-loading">Loading monsters…</div>';

  let monsters;
  try {
    const r = await fetch(`/api/adventure-monsters?path=${encodeURIComponent(ctAddAdventurePath)}`);
    if (!r.ok) throw new Error('Failed to load monsters');
    monsters = await r.json();
  } catch (e) {
    wrap.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
    return;
  }

  if (!monsters.length) {
    wrap.innerHTML = '<div class="ct-add-loading">No parseable monsters found in this adventure.</div>';
    return;
  }

  wrap.innerHTML = `
    <div style="display:flex;justify-content:flex-end;margin-bottom:4px">
      <button class="ct-add-all-btn" id="ct-adv-add-all">Add All</button>
    </div>
    ${monsters.map((mon, i) => `
      <div class="ct-add-row" data-idx="${i}">
        <span class="ct-add-name">${mon.name}</span>
        <span class="ct-add-stat">AC ${mon.ac} · HP ${mon.hp}${mon.cr ? ` · CR ${mon.cr}` : ''}</span>
        <input class="ct-add-count" type="number" value="${mon.count}" min="1" max="20">
        <button class="ct-add-btn-sm ct-adv-add-btn">+ Add</button>
      </div>`).join('')}`;

  const addMonsterRows = (subset) => {
    subset.forEach(({ name, ac, hp, count }) => {
      for (let i = 0; i < count; i++) {
        const initiative = Math.floor(Math.random() * 20) + 1;
        combatState.combatants.push({
          id: ctUid(), name, initiative, ac, hpMax: hp, hpCur: hp, type: 'monster', conditions: [],
        });
      }
    });
    renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
      combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
  };

  wrap.querySelector('#ct-adv-add-all').addEventListener('click', () => {
    const rows = [...wrap.querySelectorAll('.ct-add-row')];
    addMonsterRows(rows.map((row, i) => ({
      ...monsters[i],
      count: Math.max(1, parseInt(row.querySelector('.ct-add-count').value) || 1),
    })));
  });

  wrap.querySelectorAll('.ct-adv-add-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const count = Math.max(1, parseInt(btn.closest('.ct-add-row').querySelector('.ct-add-count').value) || 1);
      addMonsterRows([{ ...monsters[i], count }]);
    });
  });
}
```

- [ ] **Step 2: Verify in browser**

Monsters tab → Adventure sub-tab shows a dropdown of adventures. Selecting one loads its monster list with count controls. `+ Add` and `Add All` add combatants with rolled initiative.

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: combat tracker Monsters > Adventure tab — pick adventure, count controls, add all"
```

---

## Task 9: Monsters tab — 5etools sub-tab

**Files:**
- Modify: `web/public/app.js` (add `renderAddMonsters5etools` function)

- [ ] **Step 1: Add `renderAddMonsters5etools` function**

```javascript
function renderAddMonsters5etools(m) {
  const wrap = m.querySelector('#ct-add-monster-body');
  if (!wrap) return;
  wrap.innerHTML = `
    <input class="ct-add-search" id="ct-5e-search" placeholder="Search bestiary (e.g. wolf, goblin, dragon)…" value="${ctAddSearchQuery}">
    <div id="ct-5e-results"></div>`;

  const searchInput = wrap.querySelector('#ct-5e-search');
  const resultsWrap = wrap.querySelector('#ct-5e-results');

  let debounceTimer;
  searchInput.addEventListener('input', () => {
    ctAddSearchQuery = searchInput.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => run5eSearch(resultsWrap), 350);
  });

  if (ctAddSearchQuery.length >= 2) run5eSearch(resultsWrap);
  else searchInput.focus();

  async function run5eSearch(wrap) {
    const q = ctAddSearchQuery.trim();
    if (q.length < 2) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = '<div class="ct-add-loading">Searching…</div>';
    let monsters;
    try {
      const r = await fetch(`/api/5etools/search?q=${encodeURIComponent(q)}`);
      if (!r.ok) throw new Error((await r.json()).error || 'Search failed');
      monsters = await r.json();
    } catch (e) {
      wrap.innerHTML = `<div class="ct-add-error">Error: ${e.message}</div>`;
      return;
    }
    if (!monsters.length) {
      wrap.innerHTML = '<div class="ct-add-loading">No results.</div>';
      return;
    }
    wrap.innerHTML = '';
    monsters.forEach(mon => {
      const row = document.createElement('div');
      row.className = 'ct-add-row';
      row.innerHTML = `
        <span class="ct-add-name">${mon.name}</span>
        <span class="ct-add-stat">AC ${mon.ac} · HP ${mon.hp} · CR ${mon.cr}</span>
        <button class="ct-add-btn-sm ct-5e-add-btn">+ Add</button>`;
      wrap.appendChild(row);

      row.querySelector('.ct-5e-add-btn').addEventListener('click', () => {
        const initiative = Math.floor(Math.random() * 20) + 1;
        combatState.combatants.push({
          id: ctUid(), name: mon.name,
          initiative, ac: mon.ac,
          hpMax: mon.hp, hpCur: mon.hp,
          type: 'monster', conditions: [],
        });
        renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
          combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
      });
    });
  }
}
```

- [ ] **Step 2: Verify in browser**

Monsters tab → 5etools sub-tab shows a search box. Typing "wolf" (with 350ms debounce) shows results with AC/HP/CR. `+ Add` adds to tracker with rolled initiative.

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: combat tracker Monsters > 5etools tab — bestiary search with debounce"
```

---

## Task 10: Manual tab (move existing form)

**Files:**
- Modify: `web/public/app.js` (add `renderAddManual` function)

- [ ] **Step 1: Add `renderAddManual` function**

This moves the existing manual add form into the tab. The logic is identical to the old `#ct-add-btn` handler.

```javascript
function renderAddManual(m) {
  const body = m.querySelector('#ct-add-body');
  if (!body) return;
  body.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:4px 0">
      <label style="font-size:11px;color:#888">Name</label>
      <input name="name" placeholder="Goblin" autocomplete="off"
        style="flex:1;min-width:80px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 6px;font-size:12px;font-family:inherit">
      <label style="font-size:11px;color:#888">Init</label>
      <input name="init" type="number" placeholder="12"
        style="width:48px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit;text-align:center">
      <label style="font-size:11px;color:#888">AC</label>
      <input name="ac" type="number" placeholder="13"
        style="width:44px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit;text-align:center">
      <label style="font-size:11px;color:#888">HP</label>
      <input name="hp" type="number" placeholder="7"
        style="width:52px;background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit;text-align:center">
      <select name="type"
        style="background:#1e1e2e;border:1px solid #444;border-radius:3px;color:#cdd6f4;padding:3px 4px;font-size:12px;font-family:inherit">
        <option value="monster">Monster</option>
        <option value="player">Player</option>
        <option value="npc">NPC</option>
      </select>
      <button class="ct-add-btn-sm" id="ct-manual-add-btn">+ Add</button>
    </div>`;

  const doAdd = () => {
    const name = body.querySelector('[name=name]').value.trim() || 'Unknown';
    const init = parseInt(body.querySelector('[name=init]').value) || 0;
    const ac   = parseInt(body.querySelector('[name=ac]').value)   || 10;
    const hp   = parseInt(body.querySelector('[name=hp]').value)   || 1;
    const type = body.querySelector('[name=type]').value;
    combatState.combatants.push({ id: ctUid(), name, initiative: init, ac, hpMax: hp, hpCur: hp, type, conditions: [] });
    body.querySelector('[name=name]').value = '';
    body.querySelector('[name=init]').value = '';
    body.querySelector('[name=ac]').value   = '';
    body.querySelector('[name=hp]').value   = '';
    renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
      combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
    body.querySelector('[name=name]').focus();
  };

  body.querySelector('#ct-manual-add-btn').addEventListener('click', doAdd);
  body.querySelector('[name=hp]').addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
}
```

- [ ] **Step 2: Verify in browser**

Manual tab shows the name/init/AC/HP form. Adding a combatant works exactly as before. Tab state persists when combat list updates.

- [ ] **Step 3: Final end-to-end check**

- [ ] Open Combat Tracker, click `+ Add`
- [ ] Players tab: add Perkia with initiative 15 → appears in tracker
- [ ] Players tab: John and Kuetis (if previously added) show dimmed ✓
- [ ] NPCs tab: add Brenna Thorne → appears with rolled initiative, AC 17, HP 58
- [ ] Monsters tab > Adventure: select "Wolves of Welton" → wolves appear → `Add All` adds them
- [ ] Monsters tab > 5etools: search "goblin" → results appear → `+ Add` works
- [ ] Manual tab: add a custom entry
- [ ] Close and reopen tracker — panel state (open/tab) persists
- [ ] Close tracker → main viewer stays on its current page (no ENOENT error)

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: combat tracker Manual tab — moves existing form into add panel"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by task |
|---|---|
| Add panel at bottom, toggled by `+ Add` button | Task 5 |
| Opens to last-used tab | `ctAddPanelTab` state variable (Task 5) |
| Adding doesn't close panel | `renderCombatList` used instead of full re-render (Tasks 6-10) |
| Players: fetch `/api/characters` | Task 6 |
| Players: dim already-in-combat | Task 6 `inCombat` Set |
| Players: manual initiative input | Task 6 |
| NPCs: new `/api/npcs` endpoint | Task 1 |
| NPCs: auto-roll initiative | Task 7 |
| Monsters > Adventure sub-tab | Task 8 |
| Adventures dropdown: new `/api/adventures` | Task 2 |
| Adventure monsters with count controls | Task 8 |
| Monsters > 5etools sub-tab | Task 9 |
| `GET /api/5etools/search` endpoint | Task 3 |
| 5etools results: name, AC, HP, CR | Task 3 + 9 |
| Manual tab: existing form preserved | Task 10 |
| Auto-roll for monsters/NPCs | Tasks 7, 8, 9 |
| Initiative set once, never re-rolled | State only written on add (all tasks) |
