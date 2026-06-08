# Combat Tracker: Conditions Reference + Spawn — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a right-click conditions quick-reference popover to combat tracker condition pills, and let the DM spawn NPCs into combat from the NPC viewer cards and a new "NPCs here" section in the Location detail view.

**Architecture:** Pure client-side changes in `web/public/app.js` + `web/public/style.css`. A shared `spawnToCombat()` helper centralizes combatant creation (init combat if needed, auto-roll initiative, re-render tracker if open, toast). No server changes — reuses `/api/npcs`.

**Tech Stack:** Vanilla JS, CSS. Combatant state lives in the module-level `combatState` object.

---

## Files

| File | Change |
|---|---|
| `web/public/app.js` | `showConditionPopover()`; `contextmenu` handler on condition pills; `spawnToCombat()` helper; refactor in-tracker NPC-add; `_npcStatsCache` + `getNpcStats()`; `⚔` buttons on NPC cards; "NPCs here" section in location detail |
| `web/public/style.css` | `.ct-cond-popover`, `.ref-card-spawn`, `.loc-npc-row` styles |

---

## Task 1 — Conditions right-click popover

**Files:**
- Modify: `web/public/app.js` (condition pill creation ~line 1773; add `showConditionPopover` function nearby)
- Modify: `web/public/style.css`

- [ ] **Step 1: Add `.ct-cond-popover` CSS**

In `web/public/style.css`, append at the end of the file:
```css
.ct-cond-popover {
  position: fixed;
  z-index: 10000;
  max-width: 280px;
  background: var(--panel);
  border: 1px solid var(--accent);
  border-radius: 6px;
  padding: 10px 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.55);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text);
}
.ct-cond-popover strong { display: block; color: var(--accent); margin-bottom: 4px; font-size: 13px; }
```

- [ ] **Step 2: Add `showConditionPopover()` function**

In `web/public/app.js`, immediately after the `CONDITION_RULES` object closes (after line ~1152, before `let combatState = null;`), add:
```javascript
function showConditionPopover(condName, anchorEl) {
  // Only one popover at a time
  document.querySelectorAll('.ct-cond-popover').forEach(p => p.remove());

  const rules = CONDITION_RULES[condName] || 'No reference available.';
  const pop = document.createElement('div');
  pop.className = 'ct-cond-popover';
  pop.innerHTML = `<strong>${escHtml(condName)}</strong>${escHtml(rules)}`;
  document.body.appendChild(pop);

  // Position below the anchor, clamped to viewport
  const r = anchorEl.getBoundingClientRect();
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  let left = r.left;
  let top  = r.bottom + 6;
  if (left + pw > window.innerWidth - 8)  left = window.innerWidth - pw - 8;
  if (top + ph > window.innerHeight - 8)  top = r.top - ph - 6; // flip above
  pop.style.left = Math.max(8, left) + 'px';
  pop.style.top  = Math.max(8, top) + 'px';

  // Dismiss on outside-click or Escape
  function dismiss(e) {
    if (e.type === 'keydown' && e.key !== 'Escape') return;
    if (e.type === 'mousedown' && pop.contains(e.target)) return;
    pop.remove();
    document.removeEventListener('mousedown', dismiss, true);
    document.removeEventListener('keydown', dismiss, true);
  }
  // Defer so the opening right-click doesn't immediately dismiss
  setTimeout(() => {
    document.addEventListener('mousedown', dismiss, true);
    document.addEventListener('keydown', dismiss, true);
  }, 0);
}
```

Note: `escHtml` is the existing escape helper used throughout the combat tracker (e.g. line 1797). Confirm it exists before relying on it.

- [ ] **Step 3: Add `contextmenu` handler on condition pills**

In `web/public/app.js`, in `renderCombatList`, find the condition pill creation block (~line 1773-1783):
```javascript
      c.conditions.forEach(cond => {
        const pill = document.createElement('span');
        pill.className = 'ct-cond';
        pill.textContent = cond;
        const rules = CONDITION_RULES[cond];
        pill.title = rules ? `${cond}: ${rules}\n\nClick to remove` : 'Click to remove';
        pill.addEventListener('click', () => {
          c.conditions = c.conditions.filter(x => x !== cond);
          renderCombatList(m, sorted, activeCombatant);
        });
        condRow.appendChild(pill);
      });
```

Replace with (adds the `contextmenu` handler; updates the title hint):
```javascript
      c.conditions.forEach(cond => {
        const pill = document.createElement('span');
        pill.className = 'ct-cond';
        pill.textContent = cond;
        const rules = CONDITION_RULES[cond];
        pill.title = rules ? `${cond}: ${rules}\n\nLeft-click to remove · Right-click for reference` : 'Left-click to remove';
        pill.addEventListener('click', () => {
          c.conditions = c.conditions.filter(x => x !== cond);
          renderCombatList(m, sorted, activeCombatant);
        });
        pill.addEventListener('contextmenu', e => {
          e.preventDefault();
          showConditionPopover(cond, pill);
        });
        condRow.appendChild(pill);
      });
```

- [ ] **Step 4: Verify manually**

1. Restart server: kill the node process on port 5050, then `cd web && node server.js`
2. Open `http://localhost:5050`, log in, open **Combat Tracker** tab
3. Add a combatant (any method), click **± cond**, add e.g. *Grappled*
4. **Left-click** the Grappled pill → it is removed (unchanged behaviour)
5. Re-add it, then **right-click** the pill → a dark popover appears showing "Grappled" + its rules text
6. Press **Escape** or click elsewhere → popover closes
7. Right-click a pill near the bottom/right edge → popover stays within the viewport

- [ ] **Step 5: Commit**

```bash
git add web/public/app.js web/public/style.css
git commit -m "feat: right-click condition pill shows 5e rules popover"
```

---

## Task 2 — `spawnToCombat()` helper + refactor NPC-add + spawn button CSS

**Files:**
- Modify: `web/public/app.js` (add helper near `initCombatState` ~line 1161; refactor NPC-add ~line 1610)
- Modify: `web/public/style.css`

- [ ] **Step 1: Add `spawnToCombat()` helper**

In `web/public/app.js`, immediately after the `initCombatState` function (after line ~1163), add:
```javascript
function spawnToCombat({ name, ac = 10, hp = 1, dexMod = 0, type = 'npc' }) {
  if (!combatState) initCombatState();
  const initiative = Math.floor(Math.random() * 20) + 1 + (dexMod || 0);
  combatState.combatants.push({
    id: ctUid(), name,
    initiative, ac: ac ?? 10,
    hpMax: hp ?? 1, hpCur: hp ?? 1,
    type, conditions: [], buffs: [],
  });
  // Re-render the combat tracker only if its modal is currently open
  const titleEl = [...document.querySelectorAll('.modal .modal-title')]
    .find(t => t.textContent === 'Combat Tracker');
  if (titleEl) {
    const m = titleEl.closest('.modal');
    renderCombatList(
      m,
      [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
      combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]
    );
  }
  showToast(`Added ${name} to combat (init ${initiative})`);
}
```

Note: relies on existing `ctUid()`, `initCombatState()`, `renderCombatList()`, `showToast()` — all already defined in app.js.

- [ ] **Step 2: Refactor the in-tracker NPC-add to use the helper**

In `web/public/app.js`, find the in-tracker NPC-add handler (~line 1610-1621):
```javascript
    row.querySelector('.ct-npc-add-btn').addEventListener('click', () => {
      const dexMod = npc.dexMod ?? 0;
      const initiative = Math.floor(Math.random() * 20) + 1 + dexMod;
      combatState.combatants.push({
        id: ctUid(), name: npc.name,
        initiative, ac: npc.ac ?? 10,
        hpMax: npc.hp ?? 1, hpCur: npc.hp ?? 1,
        type: 'npc', conditions: [], buffs: [],
      });
      renderCombatList(m, [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
        combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]);
    });
```

Replace with:
```javascript
    row.querySelector('.ct-npc-add-btn').addEventListener('click', () => {
      spawnToCombat({ name: npc.name, ac: npc.ac, hp: npc.hp, dexMod: npc.dexMod, type: 'npc' });
    });
```

(The helper handles the push, sort, re-render, and now also adds a toast. Behaviour is equivalent — this add path runs while the tracker modal is open, so the helper's "re-render if open" branch fires.)

- [ ] **Step 3: Add spawn button CSS**

In `web/public/style.css`, append at the end of the file:
```css
.ref-card-spawn {
  position: absolute;
  top: 8px;
  right: 40px;
  background: var(--overlay);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text);
  font-size: 13px;
  width: 26px; height: 26px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.12s, border-color 0.12s;
}
.ref-card-spawn:hover { background: var(--accent); color: var(--panel); border-color: var(--accent); }
.loc-npc-section { padding: 4px 20px 16px; }
.loc-npc-label { color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin: 8px 0 6px; font-family: sans-serif; }
.loc-npc-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px; border: 1px solid var(--border); border-radius: 4px;
  margin-bottom: 4px; font-size: 13px;
}
.loc-npc-row .loc-npc-name { flex: 1; }
.loc-npc-row .loc-npc-stat { color: var(--subtext); font-size: 11px; }
.loc-npc-spawn {
  background: var(--overlay); border: 1px solid var(--border); border-radius: 4px;
  color: var(--text); font-size: 11px; padding: 3px 8px; cursor: pointer;
}
.loc-npc-spawn:hover { background: var(--accent); color: var(--panel); border-color: var(--accent); }
```

Note: `.ref-card-spawn` is positioned at `right: 40px` to sit left of the existing `.ref-card-send` (📺) button. Verify `.ref-card-send` position in style.css and adjust `right` so the two don't overlap.

- [ ] **Step 4: Verify the refactor didn't break in-tracker NPC add**

1. Restart server, open Combat Tracker
2. Open the add panel → NPCs tab → click **+ Add** on an NPC
3. The NPC appears in the combat list AND a toast "Added <name> to combat (init N)" shows
4. Initiative is a number 1-20 (+dex)

- [ ] **Step 5: Commit**

```bash
git add web/public/app.js web/public/style.css
git commit -m "feat: spawnToCombat helper + refactor NPC add, spawn button styles"
```

---

## Task 3 — `⚔` spawn button on NPC viewer cards

**Files:**
- Modify: `web/public/app.js` (`renderRefModal` card markup ~line 2689; card wiring ~line 2742)

- [ ] **Step 1: Add the `⚔` button to NPC cards**

In `web/public/app.js`, in `renderRefModal`, find the `sendBtn` definition (~line 2689-2691):
```javascript
      const sendBtn = isNpc
        ? `<button class="ref-card-send" data-portrait="${item.portrait ? escapeHtml(item.portrait) : ''}" data-caption="${escapeHtml(item.name)}" title="Send to player screen">📺</button>`
        : '';
```

Replace with (adds a `spawnBtn` for NPCs carrying stat data):
```javascript
      const sendBtn = isNpc
        ? `<button class="ref-card-send" data-portrait="${item.portrait ? escapeHtml(item.portrait) : ''}" data-caption="${escapeHtml(item.name)}" title="Send to player screen">📺</button>`
        : '';
      const spawnBtn = isNpc
        ? `<button class="ref-card-spawn" data-name="${escapeHtml(item.name)}" data-ac="${item.ac ?? ''}" data-hp="${item.hp ?? ''}" data-dexmod="${item.dexMod ?? ''}" title="Add to combat tracker">⚔</button>`
        : '';
```

Then find the card template return (~line 2693-2701) and add `${spawnBtn}` next to `${sendBtn}`:
```javascript
      return `<div class="ref-card${isNpc ? ' ref-card--npc' : ''}" data-path="${escapeHtml(item.path)}" data-idx="${escapeHtml(String(items.indexOf(item)))}">
        ${thumb}
        <div class="ref-card-body">
          <div class="ref-title">${escapeHtml(item.name)}</div>
          <div class="ref-meta">${metaItems.join('')}</div>
          ${item.synopsis ? `<div class="ref-synopsis">${escapeHtml(item.synopsis)}</div>` : ''}
        </div>
        ${spawnBtn}
        ${sendBtn}
      </div>`;
```

- [ ] **Step 2: Wire the `⚔` button click**

In `web/public/app.js`, find the send-button wiring block (~line 2742-2751) and add a spawn-button wiring block immediately after it:
```javascript
    // Wire NPC send-to-screen buttons (stopPropagation so card click doesn't fire)
    m.querySelectorAll('.ref-card-send').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (btn.dataset.portrait) {
          sendToPlayerScreen({ type: 'image', url: btn.dataset.portrait, caption: btn.dataset.caption });
        } else {
          sendToPlayerScreen({ type: 'text', content: btn.dataset.caption });
        }
      });
    });

    // Wire NPC add-to-combat buttons
    m.querySelectorAll('.ref-card-spawn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        spawnToCombat({
          name: btn.dataset.name,
          ac: btn.dataset.ac !== '' ? Number(btn.dataset.ac) : 10,
          hp: btn.dataset.hp !== '' ? Number(btn.dataset.hp) : 1,
          dexMod: btn.dataset.dexmod !== '' ? Number(btn.dataset.dexmod) : 0,
          type: 'npc',
        });
      });
    });
```

- [ ] **Step 3: Verify manually**

1. Restart server, open the **NPCs** tab
2. Each NPC card shows a `⚔` button (left of the `📺`)
3. Click `⚔` → toast "Added <name> to combat (init N)"; the card detail does NOT open (stopPropagation works)
4. Open **Combat Tracker** → the NPC is in the list with correct AC/HP
5. Click the card body (not a button) → NPC detail still opens normally

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add-to-combat button on NPC viewer cards"
```

---

## Task 4 — "NPCs here" section in Location detail

**Files:**
- Modify: `web/public/app.js` (add `_npcStatsCache`/`getNpcStats` near top of combat/NPC code; extend `showLocationDetail` ~line 2828)

- [ ] **Step 1: Add an NPC-list cache helper**

In `web/public/app.js`, add near the other module-level state (e.g. just before `async function showNpcsModal()` ~line 2596):
```javascript
let _npcStatsCache = null;
async function getNpcStats() {
  if (_npcStatsCache) return _npcStatsCache;
  try {
    const r = await fetch('/api/npcs');
    _npcStatsCache = r.ok ? await r.json() : [];
  } catch {
    _npcStatsCache = [];
  }
  return _npcStatsCache;
}
```

- [ ] **Step 2: Add the "NPCs here" section to the location detail view**

In `web/public/app.js`, in `showLocationDetail`, find the end of the function where location content loads (~line 2864-2877):
```javascript
  try {
    const r = await fetch(`/api/location-content?path=${encodeURIComponent(loc.path)}`);
    const data = await r.json();
    const el = m.querySelector('.npc-stat-block');
    if (el && data.html) {
      el.innerHTML = `<div class="npc-stat-html loc-content-html">${data.html}</div>`;
    } else if (el) {
      el.innerHTML = '';
    }
  } catch {
    const el = m.querySelector('.npc-stat-block');
    if (el) el.innerHTML = '';
  }
}
```

Replace with (renders an "NPCs at this location" section above the content):
```javascript
  // NPCs whose recorded location matches this location → spawnable list
  try {
    const allNpcs = await getNpcStats();
    const locName = (loc.name || '').toLowerCase();
    const here = allNpcs.filter(n =>
      locName && (n.location || '').toLowerCase().includes(locName));
    if (here.length) {
      const rowsHtml = here.map(n => {
        const stat = [n.ac != null ? `AC ${n.ac}` : null, n.hp != null ? `HP ${n.hp}` : null]
          .filter(Boolean).join(' · ');
        return `<div class="loc-npc-row">
          <span class="loc-npc-name">${escapeHtml(n.name)}</span>
          <span class="loc-npc-stat">${escapeHtml(stat)}</span>
          <button class="loc-npc-spawn"
            data-name="${escapeHtml(n.name)}"
            data-ac="${n.ac ?? ''}" data-hp="${n.hp ?? ''}" data-dexmod="${n.dexMod ?? ''}"
            title="Add to combat tracker">⚔ Add</button>
        </div>`;
      }).join('');
      const section = document.createElement('div');
      section.className = 'loc-npc-section';
      section.innerHTML = `<div class="loc-npc-label">NPCs at this location</div>${rowsHtml}`;
      const host = m.querySelector('.npc-stat-block');
      if (host) host.parentNode.insertBefore(section, host);
      section.querySelectorAll('.loc-npc-spawn').forEach(btn => {
        btn.addEventListener('click', () => {
          spawnToCombat({
            name: btn.dataset.name,
            ac: btn.dataset.ac !== '' ? Number(btn.dataset.ac) : 10,
            hp: btn.dataset.hp !== '' ? Number(btn.dataset.hp) : 1,
            dexMod: btn.dataset.dexmod !== '' ? Number(btn.dataset.dexmod) : 0,
            type: 'npc',
          });
        });
      });
    }
  } catch { /* NPC list optional */ }

  try {
    const r = await fetch(`/api/location-content?path=${encodeURIComponent(loc.path)}`);
    const data = await r.json();
    const el = m.querySelector('.npc-stat-block');
    if (el && data.html) {
      el.innerHTML = `<div class="npc-stat-html loc-content-html">${data.html}</div>`;
    } else if (el) {
      el.innerHTML = '';
    }
  } catch {
    const el = m.querySelector('.npc-stat-block');
    if (el) el.innerHTML = '';
  }
}
```

- [ ] **Step 3: Verify manually**

1. Restart server, open the **Locations** tab, click a location that has NPCs (e.g. one matching an NPC's recorded location like "Waystone Inn")
2. An **"NPCs at this location"** section appears above the location text, listing matching NPCs with AC/HP and a `⚔ Add` button
3. Click `⚔ Add` → toast fires; open Combat Tracker → NPC is present with correct stats
4. Open a location with no matching NPCs → no section appears (no empty header)

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: NPCs-here section in location detail with add-to-combat"
```
