# Themes & Preferences Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six selectable UI themes to the DM Panel, persisted in a `dm_prefs` cookie, with zero flash of unstyled content on page load.

**Architecture:** Theme data lives as a JS object in `app.js`. An inline `<script>` in `<head>` reads the cookie and applies CSS variables before first paint. `setTheme(id)` swaps vars at runtime and writes the cookie. The active theme is indicated in the Tools dropdown.

**Tech Stack:** Vanilla JS, CSS custom properties, `document.cookie`

> **Note on testing:** This feature is pure UI — CSS variable swapping and cookie read/write. There are no units to test in isolation. Verification is visual + cookie inspection in DevTools. Steps below include explicit verification commands instead of test files.

---

### Task 1: Add THEMES constant and theme functions to app.js

**Files:**
- Modify: `web/public/app.js` — insert after line 29 (end of state block), and after line 4150 (DOMContentLoaded body)

- [ ] **Step 1: Insert THEMES constant after the state block (after line 29)**

Open `web/public/app.js`. After the line `let shopStockDate = null;` (line 29), add:

```js
// ─── Themes ───────────────────────────────────────────────────────────────────

const THEMES = {
  mocha: {
    label: 'Mocha',
    swatch: '#cba6f7',
    vars: {
      '--bg':      '#1e1e2e',
      '--panel':   '#181825',
      '--overlay': '#313244',
      '--text':    '#cdd6f4',
      '--subtext': '#a6adc8',
      '--accent':  '#cba6f7',
      '--border':  '#45475a',
      '--red':     '#f38ba8',
    },
  },
  tavern: {
    label: 'Tavern',
    swatch: '#d4a849',
    vars: {
      '--bg':      '#1a1208',
      '--panel':   '#140e06',
      '--overlay': '#2e2010',
      '--text':    '#f0e0c0',
      '--subtext': '#b89060',
      '--accent':  '#d4a849',
      '--border':  '#4a3820',
      '--red':     '#d45a3a',
    },
  },
  midnight: {
    label: 'Midnight',
    swatch: '#5b8fff',
    vars: {
      '--bg':      '#0a0a0f',
      '--panel':   '#060608',
      '--overlay': '#141420',
      '--text':    '#e8f0ff',
      '--subtext': '#8898cc',
      '--accent':  '#5b8fff',
      '--border':  '#1e2a44',
      '--red':     '#ff4d6a',
    },
  },
  forest: {
    label: 'Forest',
    swatch: '#5cba6c',
    vars: {
      '--bg':      '#0e1a10',
      '--panel':   '#0a1209',
      '--overlay': '#1a2e1c',
      '--text':    '#c8dcc8',
      '--subtext': '#7a9e7a',
      '--accent':  '#5cba6c',
      '--border':  '#2a4a2e',
      '--red':     '#d45a5a',
    },
  },
  arcane: {
    label: 'Arcane',
    swatch: '#48d0c8',
    vars: {
      '--bg':      '#0d0a1a',
      '--panel':   '#080612',
      '--overlay': '#1a1430',
      '--text':    '#c8d8f0',
      '--subtext': '#7a88c8',
      '--accent':  '#48d0c8',
      '--border':  '#2a2050',
      '--red':     '#f05080',
    },
  },
  parchment: {
    label: 'Parchment',
    swatch: '#8b2020',
    vars: {
      '--bg':      '#f0e8d0',
      '--panel':   '#e8ddc0',
      '--overlay': '#d8c8a0',
      '--text':    '#2c1810',
      '--subtext': '#6a4a30',
      '--accent':  '#8b2020',
      '--border':  '#c0a878',
      '--red':     '#c82020',
    },
  },
};

function applyThemeVars(id) {
  const theme = THEMES[id] || THEMES.mocha;
  const root = document.documentElement;
  for (const [prop, val] of Object.entries(theme.vars)) {
    root.style.setProperty(prop, val);
  }
}

function readPrefs() {
  try {
    const entry = document.cookie.split('; ').find(r => r.startsWith('dm_prefs='));
    return entry ? JSON.parse(decodeURIComponent(entry.split('=')[1])) : {};
  } catch { return {}; }
}

function writePrefs(patch) {
  const prefs = { ...readPrefs(), ...patch };
  document.cookie = 'dm_prefs=' + encodeURIComponent(JSON.stringify(prefs))
    + '; path=/; max-age=31536000; SameSite=Lax';
}

function setTheme(id) {
  if (!THEMES[id]) id = 'mocha';
  applyThemeVars(id);
  writePrefs({ theme: id });
  // Update active indicator in the Tools dropdown
  document.querySelectorAll('.theme-item').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === id);
  });
}
```

- [ ] **Step 2: Call setTheme in DOMContentLoaded**

In `web/public/app.js`, find the DOMContentLoaded block (around line 4144 — now shifted down by the lines you inserted in Step 1). It looks like:

```js
document.addEventListener('DOMContentLoaded', () => {
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  loadWorldTables();
  if (window.SoundPlayer) SoundPlayer.init();
});
```

Add `setTheme(readPrefs().theme || 'mocha');` as the first line inside the handler:

```js
document.addEventListener('DOMContentLoaded', () => {
  setTheme(readPrefs().theme || 'mocha');
  fillTree('', fileTree);
  openPath('gm-lore/welcome.md');
  updateManifestBtn();
  initTerminal();
  loadWorldTables();
  if (window.SoundPlayer) SoundPlayer.init();
});
```

- [ ] **Step 3: Verify — open DevTools console and check**

With the server running (`cd web && node server.js`), open `http://localhost:5050` and run in the console:

```js
// Should print the current theme's bg value
getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
// Expected (mocha default): "#1e1e2e"

// Switch to Tavern and verify
setTheme('tavern');
getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
// Expected: "#1a1208"

// Verify cookie was written
document.cookie
// Expected to contain: dm_prefs=%7B%22theme%22%3A%22tavern%22%7D
```

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: THEMES constant, applyThemeVars, setTheme, readPrefs, writePrefs"
```

---

### Task 2: Add no-flash inline script to index.html

**Files:**
- Modify: `web/public/index.html` — add inline script in `<head>` before the `style.css` link

The inline script must be self-contained: it cannot call `applyThemeVars` (which lives in `app.js`, not yet loaded). It embeds a compact version of the vars and applies them directly.

- [ ] **Step 1: Insert inline script before the style.css link**

In `web/public/index.html`, find:

```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css">
  <link rel="stylesheet" href="style.css">
```

Replace with:

```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css">
  <script>
    (function () {
      var T = {
        mocha:     { '--bg':'#1e1e2e','--panel':'#181825','--overlay':'#313244','--text':'#cdd6f4','--subtext':'#a6adc8','--accent':'#cba6f7','--border':'#45475a','--red':'#f38ba8' },
        tavern:    { '--bg':'#1a1208','--panel':'#140e06','--overlay':'#2e2010','--text':'#f0e0c0','--subtext':'#b89060','--accent':'#d4a849','--border':'#4a3820','--red':'#d45a3a' },
        midnight:  { '--bg':'#0a0a0f','--panel':'#060608','--overlay':'#141420','--text':'#e8f0ff','--subtext':'#8898cc','--accent':'#5b8fff','--border':'#1e2a44','--red':'#ff4d6a' },
        forest:    { '--bg':'#0e1a10','--panel':'#0a1209','--overlay':'#1a2e1c','--text':'#c8dcc8','--subtext':'#7a9e7a','--accent':'#5cba6c','--border':'#2a4a2e','--red':'#d45a5a' },
        arcane:    { '--bg':'#0d0a1a','--panel':'#080612','--overlay':'#1a1430','--text':'#c8d8f0','--subtext':'#7a88c8','--accent':'#48d0c8','--border':'#2a2050','--red':'#f05080' },
        parchment: { '--bg':'#f0e8d0','--panel':'#e8ddc0','--overlay':'#d8c8a0','--text':'#2c1810','--subtext':'#6a4a30','--accent':'#8b2020','--border':'#c0a878','--red':'#c82020' },
      };
      try {
        var entry = document.cookie.split('; ').find(function(r){ return r.startsWith('dm_prefs='); });
        var prefs = entry ? JSON.parse(decodeURIComponent(entry.split('=')[1])) : {};
        var vars = T[prefs.theme];
        if (vars) {
          var root = document.documentElement;
          for (var k in vars) root.style.setProperty(k, vars[k]);
        }
      } catch(e) {}
    })();
  </script>
  <link rel="stylesheet" href="style.css">
```

- [ ] **Step 2: Verify no flash**

1. In DevTools Application → Cookies, set `dm_prefs` to `%7B%22theme%22%3A%22tavern%22%7D`
2. Hard-reload the page (`Ctrl+Shift+R`)
3. The page should render in Tavern colors immediately — no purple flash visible

- [ ] **Step 3: Commit**

```bash
git add web/public/index.html
git commit -m "feat: no-flash theme apply inline script in head"
```

---

### Task 3: Add Theme section to the Tools dropdown

**Files:**
- Modify: `web/public/index.html` — add theme section HTML to `#tools-dropdown`
- Modify: `web/public/style.css` — add `.theme-item` active state style

- [ ] **Step 1: Add theme section HTML to the dropdown**

In `web/public/index.html`, find the closing tag of `#tools-dropdown`:

```html
    </div>
  </div>
```

That's the last `</div>` inside `<div id="tools-dropdown" hidden>`. The full dropdown currently ends with:

```html
    <div class="tools-section">
      <div class="tools-section-label">5etools</div>
      <button class="tool-item tool-5e" data-5e-path="">🎲 5etools</button>
      <button class="tool-item tool-5e" data-5e-path="bestiary.html">🐉 Bestiary</button>
      <button class="tool-item tool-5e" data-5e-path="spells.html">✨ Spells</button>
    </div>
  </div>
```

Replace it with (adding the Theme section before the closing `</div>`):

```html
    <div class="tools-section">
      <div class="tools-section-label">5etools</div>
      <button class="tool-item tool-5e" data-5e-path="">🎲 5etools</button>
      <button class="tool-item tool-5e" data-5e-path="bestiary.html">🐉 Bestiary</button>
      <button class="tool-item tool-5e" data-5e-path="spells.html">✨ Spells</button>
    </div>
    <div class="tools-section">
      <div class="tools-section-label">Theme</div>
      <button class="tool-item theme-item" data-theme="mocha">
        <span class="theme-swatch" style="background:#cba6f7"></span> Mocha
      </button>
      <button class="tool-item theme-item" data-theme="tavern">
        <span class="theme-swatch" style="background:#d4a849"></span> Tavern
      </button>
      <button class="tool-item theme-item" data-theme="midnight">
        <span class="theme-swatch" style="background:#5b8fff"></span> Midnight
      </button>
      <button class="tool-item theme-item" data-theme="forest">
        <span class="theme-swatch" style="background:#5cba6c"></span> Forest
      </button>
      <button class="tool-item theme-item" data-theme="arcane">
        <span class="theme-swatch" style="background:#48d0c8"></span> Arcane
      </button>
      <button class="tool-item theme-item" data-theme="parchment">
        <span class="theme-swatch" style="background:#8b2020"></span> Parchment
      </button>
    </div>
  </div>
```

- [ ] **Step 2: Add theme-item and theme-swatch styles to style.css**

In `web/public/style.css`, find the `/* ─── Tools dropdown ──────────────────────────────────────────────────────── */` section. After the existing `.tool-item:hover` rule, add:

```css
.theme-item { display: flex; align-items: center; gap: 8px; }
.theme-item.active { color: var(--accent); }
.theme-item.active::after { content: '✓'; margin-left: auto; font-size: 11px; color: var(--accent); }
.theme-swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.15);
}
```

- [ ] **Step 3: Wire up click handlers in app.js**

In `web/public/app.js`, find the `btnTools.addEventListener('click', ...)` block (around line 854 — may shift from earlier edits). After it, add:

```js
// Theme picker — delegated click on the dropdown
toolsDropdown.addEventListener('click', e => {
  const item = e.target.closest('.theme-item');
  if (!item) return;
  setTheme(item.dataset.theme);
  closeTools();
});
```

- [ ] **Step 4: Verify full flow**

1. Open `http://localhost:5050`, click **Tools ▾**
2. You should see a **Theme** section at the bottom with 6 options and coloured swatches
3. The active theme should have a ✓ checkmark
4. Click **Tavern** — the UI immediately re-colours, dropdown closes
5. Reload the page — Tavern should persist (cookie survived reload, no flash)
6. Open DevTools → Application → Cookies → confirm `dm_prefs` = `{"theme":"tavern"}`
7. Click **Parchment** — verify the light theme renders correctly
8. Click **Mocha** — verify the original purple theme is restored

- [ ] **Step 5: Commit**

```bash
git add web/public/index.html web/public/style.css web/public/app.js
git commit -m "feat: theme picker in Tools dropdown with swatch indicators"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| 6 named themes with correct moods | Task 1 — THEMES constant |
| CSS var–based swapping | Task 1 — `applyThemeVars` |
| `dm_prefs` cookie, JSON, 1-year persistence | Task 1 — `readPrefs`/`writePrefs` |
| No flash on load | Task 2 — inline script |
| Theme picker in Tools dropdown | Task 3 |
| Active indicator (checkmark) | Task 3 |
| Coloured swatches | Task 3 |
| Only 3 files changed (app.js, index.html, style.css) | All tasks ✓ |

**Placeholder scan:** None found.

**Type consistency:** `setTheme(id)` used consistently across all tasks. `readPrefs()` returns `{}` on failure — safe for `readPrefs().theme` (returns `undefined`, which `|| 'mocha'` handles).
