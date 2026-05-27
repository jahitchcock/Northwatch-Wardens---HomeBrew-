# NPC Stat Block Popup in Combat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clicking any combatant name in the combat tracker opens a popup showing their full stat block (NPC markdown, 5etools bestiary entry, or player character sheet).

**Architecture:** A new `GET /api/combatant-detail?name=&type=` endpoint searches NPC files, the 5etools bestiary cache, or player character files and returns a rendered HTML snippet. Client adds a click handler on `.ct-name` in `renderCombatList` that fetches the detail and shows it in a reusable modal overlay.

**Tech Stack:** Node.js/Express (server), vanilla JS DOM + `fetch` (client), CSS in `web/public/style.css`.

---

## File Map

| File | Change |
|---|---|
| `web/server.js` | Add `GET /api/combatant-detail` endpoint |
| `web/public/app.js` | Add `showStatBlockPopup` function; wire click on `.ct-name` in `renderCombatList` |
| `web/public/style.css` | Add `.sb-overlay`, `.sb-popup`, `.sb-close`, `.sb-body` styles |

---

## Task 1: `GET /api/combatant-detail` endpoint

**Files:**
- Modify: `web/server.js` (add after the `/api/npcs` block, ~line 1460)

**What it returns:** `{ html: '<rendered stat block string>' }` — HTML string ready to inject into the popup body.

- [ ] **Step 1: Write a manual test script**

Create `web/test-combatant-detail.js` (delete after verifying):

```javascript
const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => resolve({ status: r.statusCode, body: JSON.parse(d) }));
    }).on('error', reject);
  });
}

async function run() {
  // NPC lookup
  let r = await get('http://localhost:5050/api/combatant-detail?name=Marshal+Brenna+Thorne&type=npc');
  console.assert(r.status === 200, 'should 200');
  console.assert(typeof r.body.html === 'string', 'should return html string');
  console.assert(r.body.html.includes('Brenna'), 'html should mention Brenna');
  console.log('PASS: NPC lookup OK');

  // Unknown name falls back gracefully
  r = await get('http://localhost:5050/api/combatant-detail?name=Unknown+Goblin&type=monster');
  console.assert(r.status === 200, 'should 200 even if not found');
  console.assert(typeof r.body.html === 'string', 'should still return html');
  console.log('PASS: unknown name fallback OK');
}
run().catch(console.error);
```

- [ ] **Step 2: Confirm test fails (endpoint doesn't exist yet)**

```bash
node web/test-combatant-detail.js
```
Expected: connection error or HTTP 404.

- [ ] **Step 3: Add the endpoint to `web/server.js`**

Add this block after the `/api/npcs` block (~line 1460):

```javascript
// ─── Combatant detail API ──────────────────────────────────────────────────────

function markdownToStatBlockHtml(raw) {
  // Convert Homebrewery stat block markdown to readable HTML
  return raw
    // Strip frontmatter
    .replace(/^---[\s\S]*?---\n?/, '')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Table rows → div rows
    .replace(/^\|(.+)\|$/gm, (_, cells) => {
      const cols = cells.split('|').map(c => c.trim()).filter(Boolean);
      return `<div class="sb-row">${cols.map(c => `<span>${c}</span>`).join('')}</div>`;
    })
    // Separator rows (---|---) → hr
    .replace(/<div class="sb-row">(<span>-+<\/span>)+<\/div>/g, '<hr>')
    // Headings
    .replace(/^#{1,3}\s+(.+)$/gm, '<h4>$1</h4>')
    // Blank lines → paragraph breaks
    .replace(/\n{2,}/g, '<br><br>')
    .trim();
}

app.get('/api/combatant-detail', async (req, res) => {
  const name = (req.query.name || '').trim();
  const type = (req.query.type || '').trim(); // 'npc' | 'player' | 'monster'
  if (!name) return res.status(400).json({ error: 'name required' });

  // 1. Try NPC files (npc or monster type)
  if (type !== 'player') {
    const dirs = [
      path.join(CAMPAIGN_ROOT, 'npcs', 'core'),
      path.join(CAMPAIGN_ROOT, 'npcs', 'season-1'),
    ];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.md')) continue;
        try {
          const raw = fs.readFileSync(path.join(dir, file), 'utf8');
          const nameMatch = raw.match(/^name:\s*(.+)$/m);
          if (nameMatch && nameMatch[1].trim().toLowerCase() === name.toLowerCase()) {
            return res.json({ html: markdownToStatBlockHtml(raw), source: 'npc' });
          }
        } catch { /* skip */ }
      }
    }
  }

  // 2. Try player characters
  if (type === 'player' || type !== 'monster') {
    const pcDir = path.join(CAMPAIGN_ROOT, 'player-characters');
    if (fs.existsSync(pcDir)) {
      for (const file of fs.readdirSync(pcDir)) {
        if (!file.endsWith('.md')) continue;
        try {
          const raw = fs.readFileSync(path.join(pcDir, file), 'utf8');
          const nameMatch = raw.match(/^name:\s*(.+)$/m);
          if (nameMatch && nameMatch[1].trim().toLowerCase() === name.toLowerCase()) {
            return res.json({ html: markdownToStatBlockHtml(raw), source: 'player' });
          }
        } catch { /* skip */ }
      }
    }
  }

  // 3. Try 5etools bestiary cache (monsters)
  if (bestiaryCache) {
    const entry = bestiaryCache.find(m => m.name.toLowerCase() === name.toLowerCase());
    if (entry) {
      const html = `<h4>${entry.name}</h4>
        <div class="sb-row"><span><strong>AC</strong> ${entry.ac}</span><span><strong>HP</strong> ${entry.hp}</span><span><strong>CR</strong> ${entry.cr}</span></div>
        <p style="color:#888;font-size:11px;margin-top:8px">Full stat block available in 5etools at port 2014.</p>`;
      return res.json({ html, source: '5etools' });
    }
  }

  // 4. Fallback: show basic info from name alone
  const html = `<h4>${name}</h4><p style="color:#888">No stat block found for this combatant.</p>`;
  res.json({ html, source: 'none' });
});
```

- [ ] **Step 4: Restart server and run test**

The server must be restarted to pick up changes (ask the DM to restart via the App, or kill and relaunch).

```bash
node web/test-combatant-detail.js
```
Expected: `PASS: NPC lookup OK` and `PASS: unknown name fallback OK`.

- [ ] **Step 5: Clean up test and commit**

```bash
rm web/test-combatant-detail.js
git add web/server.js
git commit -m "feat: add /api/combatant-detail endpoint — NPC/player/5etools stat block lookup"
```

---

## Task 2: Popup CSS

**Files:**
- Modify: `web/public/style.css` (append to end)

- [ ] **Step 1: Append styles**

```css
/* ── Stat Block Popup ────────────────────────────────── */
.sb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sb-popup {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 8px;
  width: min(520px, 90vw);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}
.sb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid #313244;
  font-size: 13px;
  font-weight: bold;
  color: #cdd6f4;
}
.sb-source {
  font-size: 10px;
  color: #666;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.sb-close {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 6px;
  line-height: 1;
}
.sb-close:hover { color: #cdd6f4; }
.sb-body {
  padding: 12px 14px;
  overflow-y: auto;
  font-size: 12px;
  color: #cdd6f4;
  line-height: 1.5;
}
.sb-body h4 {
  color: #89b4fa;
  margin: 0 0 8px;
  font-size: 14px;
}
.sb-body hr { border: none; border-top: 1px solid #313244; margin: 8px 0; }
.sb-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 3px 0;
  font-size: 11px;
}
.sb-loading { color: #666; padding: 16px; text-align: center; }
```

- [ ] **Step 2: Commit**

```bash
git add web/public/style.css
git commit -m "feat: add CSS for stat block popup overlay"
```

---

## Task 3: Client popup function + name click wiring

**Files:**
- Modify: `web/public/app.js`
  - Add `showStatBlockPopup(name, type)` function after `renderAddTab`
  - Wire click handler on `.ct-name` inside `renderCombatList`

- [ ] **Step 1: Add `showStatBlockPopup` function**

Find the line `function renderAddTab(m) {` and add this function directly before it:

```javascript
async function showStatBlockPopup(name, type) {
  // Remove any existing popup
  document.querySelector('.sb-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'sb-overlay';
  overlay.innerHTML = `
    <div class="sb-popup">
      <div class="sb-header">
        <span>${name}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="sb-source" id="sb-source"></span>
          <button class="sb-close" id="sb-close">✕</button>
        </div>
      </div>
      <div class="sb-body" id="sb-body"><div class="sb-loading">Loading…</div></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#sb-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  try {
    const r = await fetch(`/api/combatant-detail?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`);
    const data = await r.json();
    overlay.querySelector('#sb-body').innerHTML = data.html;
    const sourceLabels = { npc: 'NPC file', player: 'Character sheet', '5etools': '5etools', none: '' };
    overlay.querySelector('#sb-source').textContent = sourceLabels[data.source] || '';
  } catch (e) {
    overlay.querySelector('#sb-body').innerHTML = `<p style="color:#f38ba8">Error: ${e.message}</p>`;
  }
}
```

- [ ] **Step 2: Wire the click handler on `.ct-name` inside `renderCombatList`**

Find this existing listener in `renderCombatList` (~line 1483):

```javascript
    // Name edit
    row.querySelector('.ct-name').addEventListener('blur', e => {
      c.name = e.target.textContent.trim() || c.name;
    });
```

Replace with:

```javascript
    // Name edit
    row.querySelector('.ct-name').addEventListener('blur', e => {
      c.name = e.target.textContent.trim() || c.name;
    });

    // Name click → stat block popup
    row.querySelector('.ct-name').addEventListener('click', e => {
      // Don't open popup when user is editing (contenteditable focus)
      if (document.activeElement === e.target) return;
      showStatBlockPopup(c.name, c.type);
    });
```

- [ ] **Step 3: Verify in browser**

1. Open Combat Tracker, add any combatant (e.g. "Marshal Brenna Thorne" as type NPC)
2. Click the name → popup opens with stat block
3. Add a monster from 5etools tab (e.g. "Wolf") → click name → popup shows AC/HP/CR
4. Click outside the popup or ✕ to close
5. No console errors

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: NPC stat block popup — click combatant name in tracker to view full stat block"
```

---

## Self-Review

| Spec requirement | Task |
|---|---|
| Click name → popup | Task 3 (click handler on `.ct-name`) |
| NPC markdown shown | Task 1 (searches `npcs/core/`, `npcs/season-1/`) |
| Player character shown | Task 1 (searches `player-characters/`) |
| 5etools monster fallback | Task 1 (queries `bestiaryCache`) |
| Graceful fallback if not found | Task 1 (returns "No stat block found" HTML) |
| Close on ✕ or outside click | Task 3 (`sb-close` + overlay click handler) |
| No double-add when editing name | Task 3 (`activeElement` guard) |
