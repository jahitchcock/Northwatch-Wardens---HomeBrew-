# Implementation Plan: Adventures, NPCs & Locations Tabs

## Context
The DM Panel (`web/`) has quick-access tabs: Home, Tracker, Party, Adventures, NPCs, Locations, Combat Tracker, Homebrew. Previously, Adventures, NPCs, and Locations just opened the generic file browser for their directories — not useful. This plan makes them rich, interactive views.

**Current branch state:** Code has been partially written but the tabs are broken. The server also has a startup issue when launched without a console.

---

## Files Involved

| File | Role |
|------|------|
| `web/server.js` | Express API server — enhanced `/api/adventures`, `/api/npcs`, new `/api/locations` |
| `web/public/index.html` | Tab buttons, `#panel-adventures` div, CSS for `.adv-*` and `.ref-*` classes |
| `web/public/app.js` | Tab event listeners, `renderAdventures()`, `showNpcsModal()`, `showLocationsModal()`, `renderRefModal()` |

---

## Current Bugs (Confirmed)

### Bug 1: Missing `escapeHtml` in `app.js`
`escapeHtml()` is called in `renderAdventures()` and `renderRefModal()` but **does not exist** in `app.js`. This causes a `ReferenceError` and breaks all three tabs.

**Fix:** Add at the top of `app.js` (near other utilities):
```javascript
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
```

### Bug 2: Server startup crash (node-pty / AttachConsole)
When `server.js` is started with `-WindowStyle Hidden` or as a background job, `node-pty` throws:
```
Error: AttachConsole failed
    at conpty_console_list_agent.js:13
```
This kills the server process because the terminal subsystem tries to attach to a non-existent console.

**Fix options (in order of preference):**
1. **Recommended:** Start the server from a terminal that keeps a console open. In PowerShell:
   ```powershell
   Start-Process powershell -ArgumentList "-NoExit","-Command","cd 'C:\...\web'; npm start"
   ```
   This opens a visible PowerShell window that stays alive.
   
2. Or, wrap the pty initialization in a try/catch in `server.js` so a failure doesn't crash the whole server. Currently line 19 has:
   ```javascript
   try { pty = require('node-pty'); } catch { console.warn('node-pty not found — terminal disabled'); }
   ```
   But the crash happens later at line 2040+ when `pty.spawn()` is called inside the WebSocket handler. Wrap that spawn in try/catch too.

### Bug 3: Adventures tab panel conflicts with generic tab handler
The generic tab click handler (line ~265) does:
```javascript
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab) return; // handled by dedicated tab listener
    ...
    openPath(tabPath(tab.dataset.path));
  }));
});
```
All three tabs now have `data-tab` attributes, so they correctly bypass the generic handler. BUT the Adventures tab also has a dedicated `hideAdventuresPanel` listener attached to all `.tab:not(#tab-adventures)` elements. Verify this doesn't cause issues with tab state.

### Bug 4: Modal body innerHTML rebuild loses event listeners
In `renderRefModal()`, the modal body is fully rebuilt with `innerHTML` on every filter/search change. This is actually fine because the function re-attaches listeners after each rebuild. BUT the initial `m.querySelector('.modal-body').innerHTML = 'Loading…'` before calling `renderRefModal` means the modal body's style is set with `cssText`, and then `renderRefModal` overwrites it. The style should persist.

---

## Implementation Steps

### Step 1: Add `escapeHtml` to `app.js`
Insert near the top of the file, after the `const $ = id => …` line:
```javascript
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
```

### Step 2: Fix server startup crash
Option A (minimal code change): In `server.js`, find the WebSocket terminal handler around line 2040-2060 and wrap the `pty.spawn()` call:
```javascript
let proc;
try {
  proc = pty.spawn(shell, [], { ... });
} catch (e) {
  console.warn('Failed to spawn PTY:', e.message);
  ws.send('\r\nTerminal unavailable: ' + e.message + '\r\n');
  ws.close();
  return;
}
```

Option B (recommended for user): Always start the server from a terminal with a visible console:
```powershell
Start-Process powershell -ArgumentList "-NoExit","-Command","cd 'C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\web'; npm start"
```

### Step 3: Verify HTML structure
Confirm in `index.html`:
- Tab buttons use `data-tab` not `data-path`:
  ```html
  <button class="tab" id="tab-adventures" data-tab="adventures">Adventures</button>
  <button class="tab" id="tab-npcs" data-tab="npcs">NPCs</button>
  <button class="tab" id="tab-locations" data-tab="locations">Locations</button>
  ```
- `#panel-adventures` div exists inside `#panel-center`:
  ```html
  <main id="panel-center">
    <iframe id="viewer" ...></iframe>
    <div id="panel-tracker" hidden>...</div>
    <div id="panel-adventures" hidden>
      <div id="adventures-content"></div>
    </div>
  </main>
  ```
- CSS blocks exist for `.adv-*` and `.ref-*` classes.

### Step 4: Verify `app.js` tab handlers
Confirm these sections exist and are in this order:

1. Generic tab handler (~line 265) — should have `if (tab.dataset.tab) return;` to skip custom tabs.
2. Tracker panel show/hide (~line 1899).
3. Adventures panel show/hide (~line 1924) — MUST come after tracker code.
4. `renderAdventures()` function (~line 1955).
5. NPC modal `showNpcsModal()` (~line 2030).
6. Location modal `showLocationsModal()` (~line 2052).
7. Shared `renderRefModal()` (~line 2073).
8. Event listeners for `#tab-npcs` and `#tab-locations` (~line 2157).

### Step 5: Verify server API endpoints
In `server.js`, confirm:
- `parseAdventureFrontmatter()` handles arrays (for `tags`)
- `extractSynopsis()` pulls first paragraph after `## Quick Brief`
- `getAdventureStatuses()` reads `timeline/sessions/session-*.md` and maps adventure names to `completed` / `current` / `upcoming`
- `/api/adventures` returns: `label, path, season, sortKey, levels, sessions, duration, type, mysteryRating, arc, tags, synopsis, status`
- `parseNpcFile()` now uses `extractFrontmatter()` and returns: `name, ac, hp, dexMod, role, affiliation, location, status, introduced, tags, synopsis, path`
- `/api/npcs` returns the expanded NPC objects
- `parseLocationFile()` uses `extractFrontmatter()` and returns: `name, type, region, introduced, status, tags, synopsis, path, regionDir`
- `/api/locations` walks `locations/*/*.md` and returns location objects

### Step 6: Test end-to-end
1. Start server with visible console
2. Open `http://localhost:5050` in browser
3. Log in with DM password
4. **Adventures tab:** Should show Season 1 adventure cards with:
   - Title, status badge (upcoming/current/completed)
   - Levels, Sessions, Duration, Type metadata
   - Mystery rating dots (1-5)
   - Arc badge
   - Quick Brief synopsis (truncated)
   - Clicking a card opens the adventure in the viewer
5. **NPCs tab:** Should open a modal with:
   - Search box
   - Filter buttons by affiliation
   - NPC cards showing name, role, status, location, synopsis
   - Clicking a card opens the NPC in the viewer and closes modal
6. **Locations tab:** Should open a modal with:
   - Search box
   - Filter buttons by region
   - Location cards showing name, type, status, region, synopsis
   - Clicking a card opens the location in the viewer and closes modal

---

## Acceptance Criteria

- [ ] `escapeHtml` function exists in `app.js` and prevents XSS
- [ ] Server starts reliably without crashing
- [ ] Adventures tab shows rich dashboard (not file browser)
- [ ] NPCs tab opens searchable/filterable modal
- [ ] Locations tab opens searchable/filterable modal
- [ ] All three tabs integrate cleanly with existing tab switching (other tabs hide Adventures panel, modals close properly)
- [ ] Clicking any card in any view opens the content in the main viewer
- [ ] Browser console shows no JavaScript errors when using these tabs

---

## Notes for Executor

- The `node-pty` crash is a Windows-specific issue. If testing on Linux/Mac, it may not reproduce.
- The auth cookie is required for all `/api/*` routes except login/logout. Browser testing must be done through an authenticated session.
- If you need to test APIs from PowerShell, add the cookie:
  ```powershell
  $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
  $cookie = New-Object System.Net.Cookie("dm_auth", "<cookie-value>", "/", "localhost")
  $session.Cookies.Add($cookie)
  Invoke-WebRequest "http://localhost:5050/api/adventures" -WebSession $session
  ```
- The Adventures panel uses the center panel (like Tracker). NPCs/Locations use modals (like Party/Combat Tracker). This is intentional — Adventures is a "home dashboard" view, while NPCs/Locations are quick-reference lookups.
