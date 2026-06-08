# Combat Tracker: Conditions Reference + Spawn — Design Spec
_Date: 2026-06-08_

## Goal

Two independent quality-of-life features for the DM panel combat tracker:

1. **Conditions quick-reference** — right-click a condition pill to see what the D&D 5e condition does.
2. **Spawn to combat** — add an NPC to the combat tracker from outside the tracker (NPC viewer tab, Location NPCs), auto-rolling initiative.

Both live in `web/public/app.js` (combat tracker is fully client-side; combatants are held in the module-level `combatState` object). No server changes required — the spawn feature reuses the existing `/api/npcs` endpoint.

---

## Existing context (already built)

- `CONDITION_RULES` (app.js ~line 1136) — object mapping all 15 condition names to rules text. Currently surfaced ONLY as a plain `title=` hover tooltip on condition pills.
- Condition pills (`renderCombatList`, ~line 1773): left-click removes the condition. This behaviour is preserved.
- `combatState` shape: `{ round, turnIndex, combatants: [] }`. Each combatant: `{ id, name, initiative, ac, hpMax, hpCur, type, conditions: [], buffs: [] }`.
- The combat tracker's internal add-panel already adds combatants from: manual entry, players, NPCs (via `/api/npcs`, resolving `name/ac/hp/dexMod`), adventure monsters, and **5etools bestiary search**. Each path independently builds the combatant object and pushes it (duplicated logic at ~lines 1379, 1442, 1554, 1613).
- `/api/npcs` returns NPCs with `{ name, ac, hp, dexMod }`.

---

## Feature 1 — Conditions quick-reference (right-click popover)

### Behaviour
- **Left-click** a condition pill → removes it (unchanged).
- **Right-click** (`contextmenu` event) a condition pill → opens a styled popover anchored near the pill, showing the condition name (heading) and its `CONDITION_RULES` text.
- Popover closes on: outside-click, Escape key, or right-clicking a different pill (only one open at a time).
- The browser's native context menu is suppressed on the pill (`e.preventDefault()`).

### Implementation
- New function `showConditionPopover(condName, anchorEl)` in app.js:
  - Removes any existing `.ct-cond-popover` first.
  - Builds a `div.ct-cond-popover` with `<strong>${condName}</strong>` + rules text (escaped).
  - Positions it fixed near the anchor's bounding rect (below the pill, clamped to viewport).
  - Appends to `document.body`.
  - Registers one-shot outside-click and Escape listeners that remove it.
- In `renderCombatList`, where each condition pill is created (~line 1774), add:
  ```js
  pill.addEventListener('contextmenu', e => { e.preventDefault(); showConditionPopover(cond, pill); });
  ```
- Keep the existing `pill.title` tooltip as a fallback (no harm).

### Styling (`style.css`)
- `.ct-cond-popover`: fixed position, dark themed panel (`var(--panel)`, `var(--border)`), rounded, padded, max-width ~280px, `z-index` above the combat modal, small drop shadow. Heading in `var(--accent)`.

---

## Feature 2 — Spawn to combat from outside the tracker

### Shared helper (refactor of duplicated add logic)
New function `spawnToCombat({ name, ac, hp, dexMod, type })` in app.js:

```js
function spawnToCombat({ name, ac = 10, hp = 1, dexMod = 0, type = 'npc' }) {
  if (!combatState) initCombatState();
  const initiative = Math.floor(Math.random() * 20) + 1 + (dexMod || 0);
  combatState.combatants.push({
    id: ctUid(), name,
    initiative, ac: ac ?? 10,
    hpMax: hp ?? 1, hpCur: hp ?? 1,
    type, conditions: [], buffs: [],
  });
  // Re-render the tracker only if its modal is currently open
  const openModal = document.querySelector('.modal .modal-title');
  if (openModal && openModal.textContent === 'Combat Tracker') {
    const m = openModal.closest('.modal');
    renderCombatList(
      m,
      [...combatState.combatants].sort((a, b) => b.initiative - a.initiative),
      combatState.combatants[combatState.turnIndex % Math.max(combatState.combatants.length, 1)]
    );
  }
  showToast(`Added ${name} to combat (init ${initiative})`);
}
```

The existing in-tracker NPC-add path (~line 1610) is refactored to call `spawnToCombat(...)` instead of duplicating the push+render. (The other three in-tracker paths — manual/players/monsters — are left as-is to keep this change focused; only the NPC path is touched because it shares the exact shape and is adjacent to the new work.)

### Spawn buttons

**NPC viewer tab** (renders from `/api/npcs`, which carries `name/ac/hp/dexMod`):
- Each NPC entry gets a `⚔ Add to Combat` button calling `spawnToCombat({ name, ac, hp, dexMod, type: 'npc' })` directly from the already-loaded data.

**Location NPCs** (NPCs listed within a location's content — name only, no stats):
- Each NPC name gets a `⚔` button. On click, resolve the name against the `/api/npcs` list:
  - If a stat block is found → spawn with its `ac/hp/dexMod`.
  - If not found → spawn with defaults (`ac: 10, hp: 1, dexMod: 0`); the toast still fires and the DM can edit stats in the tracker.
- The `/api/npcs` list is fetched once and cached in a module variable (`_npcStatsCache`) to avoid re-fetching per click.

**5etools bestiary** — NO CHANGE. Already available inside the combat tracker's add-panel ("Search bestiary…"). There is no panel-native bestiary view outside the tracker (the Tools→Bestiary link opens the external 5etools iframe app, which cannot be injected into).

### Styling (`style.css`)
- `.spawn-combat-btn`: small inline button matching existing panel button styles (`var(--overlay)` background, `var(--accent)` on hover), ⚔ icon.

---

## Edge cases

| Case | Handling |
|---|---|
| Combat not started (combatState null) | `spawnToCombat` calls `initCombatState()` first |
| Tracker modal closed when spawning | Combatant added to state silently; toast confirms; appears when tracker opened |
| Location NPC has no stat block | Spawn with defaults (AC 10, HP 1), toast still fires |
| `/api/npcs` fetch fails for location resolve | Spawn with defaults |
| Same NPC spawned twice | Allowed — each gets a unique `ctUid()`; DM may want duplicates (e.g. two guards) |

---

## Files Changed

| File | Change |
|---|---|
| `web/public/app.js` | Add `showConditionPopover()`; add `contextmenu` handler on condition pills; add `spawnToCombat()` helper; refactor in-tracker NPC-add to use it; add spawn buttons to NPC viewer + Location NPCs; add `_npcStatsCache` |
| `web/public/style.css` | Add `.ct-cond-popover` and `.spawn-combat-btn` styles |

## Out of Scope

- Spawning players or adventure monsters from outside the tracker (NPC-focused for now)
- A standalone panel-native bestiary browser
- Refactoring the manual/players/monster in-tracker add paths (only the NPC path is unified with the new helper)
