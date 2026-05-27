# Combat Tracker: Buff/Debuff Duration + Condition Hover Text Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add timed buff/debuff tracking with auto-expiry on Next Turn, and add rules-text tooltips to condition pills in the combat tracker.

**Architecture:** Each combatant gains a `buffs: []` array (alongside the existing `conditions: []`). Each buff is `{ name, duration }` where duration is rounds remaining (-1 = permanent). The Next Turn handler decrements all durations and removes expired buffs before re-rendering. Condition pills get a `title` attribute with the rules summary. A "+ buff" button in the actions row opens a small inline form.

**Tech Stack:** Vanilla JS DOM (client), CSS in `web/public/style.css`. No server changes needed.

---

## File Map

| File | Change |
|---|---|
| `web/public/app.js` | Add `CONDITION_RULES` lookup; add `buffs: []` to all combatant push calls; add buff decrement to Next Turn handler; add buff UI to `renderCombatList`; add condition title tooltips |
| `web/public/style.css` | Add `.ct-buff`, `.ct-buff-wrap`, `.ct-buff-expired`, `.ct-buff-form` styles |

---

## Task 1: Condition hover rules text

**Files:**
- Modify: `web/public/app.js`

No server changes. Pure client.

- [ ] **Step 1: Add `CONDITION_RULES` lookup table**

Find the existing `CONDITIONS` array (~line 881):

```javascript
const CONDITIONS = ['Blinded','Charmed','Deafened','Frightened','Grappled',
  'Incapacitated','Invisible','Paralyzed','Petrified','Poisoned','Prone',
  'Restrained','Stunned','Unconscious','Exhaustion'];
```

Add this directly after it:

```javascript
const CONDITION_RULES = {
  Blinded:       'Can't see. Auto-fail sight checks. Attack rolls against it have advantage; its attacks have disadvantage.',
  Charmed:       'Can't attack the charmer. Charmer has advantage on social checks against it.',
  Deafened:      'Can't hear. Auto-fail hearing checks.',
  Frightened:    'Disadvantage on ability checks and attack rolls while source of fear is in sight. Can't willingly move closer.',
  Grappled:      'Speed = 0. Ends if grappler is incapacitated or creature is moved out of reach.',
  Incapacitated: 'Can't take actions or reactions.',
  Invisible:     'Can't be seen without magic. Heavily obscured for hiding. Attacks have advantage; attacks against it have disadvantage.',
  Paralyzed:     'Incapacitated, can't move or speak. Auto-fail STR/DEX saves. Attacks against have advantage. Hits from within 5 ft are critical.',
  Petrified:     'Transformed to stone. Incapacitated, can't move/speak. Resistance to all damage. Immune to poison/disease.',
  Poisoned:      'Disadvantage on attack rolls and ability checks.',
  Prone:         'Crawling costs extra movement. Attacks in melee have advantage; ranged attacks have disadvantage. Its attacks have disadvantage.',
  Restrained:    'Speed = 0. Attack rolls against have advantage. Its attacks/DEX saves have disadvantage.',
  Stunned:       'Incapacitated, can't move, can barely speak. Auto-fail STR/DEX saves. Attacks against have advantage.',
  Unconscious:   'Incapacitated, can't move/speak, unaware. Drop what's held, fall prone. Auto-fail STR/DEX saves. Attacks have advantage; hits within 5 ft are critical.',
  Exhaustion:    'Level 1: Disadv on ability checks. 2: Speed halved. 3: Disadv on attacks/saves. 4: HP max halved. 5: Speed = 0. 6: Death.',
};
```

- [ ] **Step 2: Wire condition tooltips in `renderCombatList`**

Find the condition pill creation block inside `renderCombatList` (~line 1462):

```javascript
      c.conditions.forEach(cond => {
        const pill = document.createElement('span');
        pill.className = 'ct-cond';
        pill.textContent = cond;
        pill.title = 'Click to remove';
```

Replace with:

```javascript
      c.conditions.forEach(cond => {
        const pill = document.createElement('span');
        pill.className = 'ct-cond';
        pill.textContent = cond;
        const rules = CONDITION_RULES[cond];
        pill.title = rules ? `${cond}: ${rules}\n\nClick to remove` : 'Click to remove';
```

- [ ] **Step 3: Verify in browser**

Open Combat Tracker → add a combatant → click `± cond` → select "Poisoned" → hover the Poisoned pill → tooltip shows the rules text. No console errors.

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: condition pills now show rules text on hover"
```

---

## Task 2: Add `buffs: []` to combatant shape

**Files:**
- Modify: `web/public/app.js` — all `combatState.combatants.push(...)` calls

Every combatant push must include `buffs: []`. There are 5 call sites.

- [ ] **Step 1: Add `buffs: []` to all push calls**

Find and update each of these five push calls:

**Manual tab** (inside `renderAddManual`):
```javascript
    combatState.combatants.push({ id: ctUid(), name, initiative: init, ac, hpMax: hp, hpCur: hp, type, conditions: [], buffs: [] });
```

**Players tab** (inside `renderAddPlayers`):
```javascript
        combatState.combatants.push({
          id: ctUid(), name: ch.name,
          initiative: init, ac: ch.ac,
          hpMax: ch.maxHp, hpCur: ch.maxHp,
          type: 'player', conditions: [], buffs: [],
        });
```

**NPCs tab** (inside `renderAddNpcs`):
```javascript
        combatState.combatants.push({
          id: ctUid(), name: npc.name,
          initiative, ac: npc.ac ?? 10,
          hpMax: npc.hp ?? 1, hpCur: npc.hp ?? 1,
          type: 'npc', conditions: [], buffs: [],
        });
```

**Monsters > Adventure** (inside `addMonsterRows`):
```javascript
          combatState.combatants.push({
            id: ctUid(), name, initiative, ac, hpMax: hp, hpCur: hp, type: 'monster', conditions: [], buffs: [],
          });
```

**Monsters > 5etools** (inside `renderAddMonsters5etools` click handler):
```javascript
          combatState.combatants.push({
            id: ctUid(), name: mon.name,
            initiative, ac: mon.ac,
            hpMax: mon.hp, hpCur: mon.hp,
            type: 'monster', conditions: [], buffs: [],
          });
```

- [ ] **Step 2: Commit**

```bash
git add web/public/app.js
git commit -m "refactor: add buffs: [] to all combatant push calls"
```

---

## Task 3: Buff UI — display and add form

**Files:**
- Modify: `web/public/app.js` (inside `renderCombatList`)
- Modify: `web/public/style.css` (append)

- [ ] **Step 1: Add buff styles to `web/public/style.css`**

```css
/* ── Combat Tracker Buffs ────────────────────────────── */
.ct-buff-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 2px 8px 4px 28px;
}
.ct-buff {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #1e3a5f;
  border: 1px solid #89b4fa44;
  border-radius: 3px;
  padding: 1px 6px;
  font-size: 10px;
  color: #89b4fa;
  cursor: default;
}
.ct-buff-dur {
  color: #89b4fa99;
  font-size: 9px;
}
.ct-buff-remove {
  background: none;
  border: none;
  color: #89b4fa66;
  cursor: pointer;
  font-size: 10px;
  padding: 0;
  line-height: 1;
}
.ct-buff-remove:hover { color: #f38ba8; }
.ct-buff-form {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 8px 4px 28px;
  flex-wrap: wrap;
}
.ct-buff-input {
  background: #111;
  border: 1px solid #444;
  border-radius: 3px;
  color: #cdd6f4;
  font-size: 11px;
  padding: 2px 6px;
  font-family: inherit;
}
.ct-buff-dur-input {
  width: 44px;
  text-align: center;
}
```

- [ ] **Step 2: Add `+ buff` button to the actions row HTML**

Inside `renderCombatList`, find the actions row HTML:

```javascript
      <div class="ct-actions">
        <button class="ct-cond-btn" title="Add condition">± cond</button>
        <button class="ct-remove-btn" title="Remove combatant">✕</button>
      </div>`;
```

Replace with:

```javascript
      <div class="ct-actions">
        <button class="ct-cond-btn" title="Add condition">± cond</button>
        <button class="ct-buff-btn" title="Add buff/debuff">+ buff</button>
        <button class="ct-remove-btn" title="Remove combatant">✕</button>
      </div>`;
```

- [ ] **Step 3: Render buff pills after the condition row**

Find the block that renders the condition pills row (ending with `list.appendChild(condRow);`). After the closing `}` of that block, add:

```javascript
    // Buff pills row
    if (c.buffs && c.buffs.length) {
      const buffRow = document.createElement('div');
      buffRow.className = 'ct-buff-wrap';
      c.buffs.forEach(buff => {
        const pill = document.createElement('span');
        pill.className = 'ct-buff';
        const durText = buff.duration === -1 ? '∞' : `${buff.duration}r`;
        pill.innerHTML = `<span>${buff.name}</span><span class="ct-buff-dur">${durText}</span><button class="ct-buff-remove" title="Remove buff">✕</button>`;
        pill.querySelector('.ct-buff-remove').addEventListener('click', () => {
          c.buffs = c.buffs.filter(b => b !== buff);
          renderCombatList(m, sorted, activeCombatant);
        });
        buffRow.appendChild(pill);
      });
      list.appendChild(buffRow);
    }
```

- [ ] **Step 4: Wire the `+ buff` button to show an inline form**

After the condition picker wire-up block (after the `insertAdjacentElement` call), add:

```javascript
    // Buff form toggle
    row.querySelector('.ct-buff-btn').addEventListener('click', () => {
      const existingForm = list.querySelector(`.ct-buff-form[data-for="${c.id}"]`);
      if (existingForm) { existingForm.remove(); return; }

      const form = document.createElement('div');
      form.className = 'ct-buff-form';
      form.dataset.for = c.id;
      form.innerHTML = `
        <input class="ct-buff-input" placeholder="Bless, Bane, Haste…" style="flex:1;min-width:100px">
        <input class="ct-buff-input ct-buff-dur-input" type="number" placeholder="rnds" min="-1" title="-1 = permanent">
        <button class="ct-add-btn-sm">+ Add</button>`;
      const buffRow = list.querySelector(`.ct-buff-wrap[data-for="${c.id}"]`);
      const insertAfter = buffRow || list.querySelector(`.ct-cond-wrap[data-for="${c.id}"]`) || row;
      insertAfter.insertAdjacentElement('afterend', form);

      const nameInput = form.querySelector('[placeholder="Bless, Bane, Haste…"]');
      const durInput  = form.querySelector('.ct-buff-dur-input');
      const addBtn    = form.querySelector('button');

      const doAdd = () => {
        const name = nameInput.value.trim();
        if (!name) return;
        const duration = parseInt(durInput.value);
        c.buffs = c.buffs || [];
        c.buffs.push({ name, duration: isNaN(duration) ? -1 : duration });
        renderCombatList(m, sorted, activeCombatant);
      };
      addBtn.addEventListener('click', doAdd);
      nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') durInput.focus(); });
      durInput.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
      nameInput.focus();
    });
```

- [ ] **Step 5: Verify in browser**

1. Add a combatant → click `+ buff` → type "Bless", duration 3 → Enter → blue "Bless 3r" pill appears
2. Type "Invisible", duration -1 → "Invisible ∞" pill appears
3. Click ✕ on a buff pill → pill removed
4. Click `+ buff` again → form toggles closed

- [ ] **Step 6: Commit**

```bash
git add web/public/app.js web/public/style.css
git commit -m "feat: combat tracker buff/debuff pills — add named buffs with round duration"
```

---

## Task 4: Auto-decrement buff durations on Next Turn

**Files:**
- Modify: `web/public/app.js` — `#ct-next` click handler

- [ ] **Step 1: Update the Next Turn handler**

Find the `#ct-next` click handler (~line 961):

```javascript
  m.querySelector('#ct-next').addEventListener('click', () => {
    s.turnIndex++;
    if (s.turnIndex >= s.combatants.length) { s.turnIndex = 0; s.round++; }
    renderCombatTracker(m);
  });
```

Replace with:

```javascript
  m.querySelector('#ct-next').addEventListener('click', () => {
    // Decrement buff durations on the combatant whose turn just ended
    const ending = s.combatants[s.turnIndex % Math.max(s.combatants.length, 1)];
    if (ending && ending.buffs) {
      ending.buffs = ending.buffs
        .map(b => b.duration === -1 ? b : { ...b, duration: b.duration - 1 })
        .filter(b => b.duration !== 0);
    }
    s.turnIndex++;
    if (s.turnIndex >= s.combatants.length) { s.turnIndex = 0; s.round++; }
    renderCombatTracker(m);
  });
```

- [ ] **Step 2: Verify in browser**

1. Add a combatant, add buff "Bless" with duration 2
2. Click "Next Turn" twice on that combatant's turn → buff disappears after 2 rounds
3. Permanent buff (∞) never disappears

- [ ] **Step 3: Commit**

```bash
git add web/public/app.js
git commit -m "feat: buff durations auto-decrement and expire on Next Turn"
```

---

## Self-Review

| Spec requirement | Task |
|---|---|
| Condition hover shows rules text | Task 1 |
| `buffs: []` on all combatants | Task 2 |
| Buff pills displayed | Task 3 |
| `+ buff` button + inline form | Task 3 |
| Duration field (-1 = permanent) | Task 3 |
| Remove buff via ✕ | Task 3 |
| Auto-decrement on Next Turn | Task 4 |
| Permanent buffs never expire | Task 4 (`b.duration === -1` guard) |
