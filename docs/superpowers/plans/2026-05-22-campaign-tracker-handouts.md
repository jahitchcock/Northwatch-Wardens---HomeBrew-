# Campaign Tracker & Handouts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decompose `gm-lore/campaign-tracker.md` into an interactive dashboard Tracker tab (data in `timeline/` markdown) and individual print-ready handout files per adventure.

**Architecture:** New "Tracker" tab renders a purpose-built UI (not iframe) reading/writing markdown files in `timeline/` via new server endpoints. Handout `.md` files live in adventure subfolders; a `/print` endpoint serves them as standalone parchment-styled HTML pages. The Tracker tab replaces the viewer when active; switching away restores it.

**Tech Stack:** Express/server.js (new endpoints), vanilla JS (app.js tracker UI), HTML/CSS (index.html tracker panel + print styles), Markdown (timeline data files)

**Spec:** `docs/superpowers/specs/2026-05-22-campaign-tracker-handouts.md`

---

## File Map

**New files:**
- `timeline/party.md` — party roster table
- `timeline/contracts.md` — adventure outcome checklists
- `timeline/npcs.md` — NPC status + relationship table
- `timeline/clues.md` — Echo clue checklist + party theories
- `timeline/promises.md` — promises & open hooks
- `timeline/treasure.md` — items table + gold
- `timeline/MANIFEST.md` — sort order
- `timeline/sessions/` — one file per session (session-001.md, etc.)
- `adventures/season-1/opening-handouts/` — 2 handout files
- `adventures/season-1/wolves-of-welton-handouts/` — 5 handout files
- `adventures/season-1/the-pale-sickness/handouts/` — 4 handout files
- `adventures/season-1/the-wild-sheep-chase-handouts/` — 1 handout file
- `adventures/season-1/peril-in-pinebrook-handouts/` — 2 handout files
- `adventures/season-1/temple-of-the-dragonknights-handouts/` — 2 handout files
- `adventures/season-1/general-handouts/` — 3 handout files

**Modified files:**
- `web/server.js` — 6 new API endpoints + print endpoint
- `web/public/index.html` — Tracker tab button, panel-tracker div, btn-print button
- `web/public/app.js` — tracker UI logic (~300 lines added as new section)
- `gm-lore/campaign-tracker.md` → renamed to `gm-lore/campaign-tracker-archive.md`
- `gm-lore/MANIFEST.md` — update to reflect rename

---

## Task 1: Timeline data files

**Files:**
- Create: `timeline/MANIFEST.md`
- Create: `timeline/party.md`
- Create: `timeline/contracts.md`
- Create: `timeline/npcs.md`
- Create: `timeline/clues.md`
- Create: `timeline/promises.md`
- Create: `timeline/treasure.md`
- Create: `timeline/sessions/` (directory — create by writing `timeline/sessions/.gitkeep`)

- [ ] **Step 1: Create `timeline/MANIFEST.md`**

```markdown
# Timeline Manifest

- [party](party.md) — Party roster
- [contracts](contracts.md) — Adventure outcomes
- [npcs](npcs.md) — NPC status
- [clues](clues.md) — Aevorian Echo clues
- [promises](promises.md) — Promises & open hooks
- [treasure](treasure.md) — Items & gold
- [sessions](sessions) — Session logs
```

- [ ] **Step 2: Create `timeline/party.md`**

```markdown
# Party Roster

| Player | Character | Class / Level | Status |
|--------|-----------|---------------|--------|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
```

- [ ] **Step 3: Create `timeline/contracts.md`**

```markdown
# Contract Outcomes

## Opening — Wolves at the Waystone
- [ ] Completed

### Notes


## Wolves of Welton
- [ ] Completed
- [ ] Resolution: Negotiated
- [ ] Resolution: Combat
- [ ] Resolution: Mixed
- [ ] Flame: Killed
- [ ] Flame: Captured
- [ ] Flame: Fled
- [ ] Flame: Negotiated
- [ ] Bolt: Alive
- [ ] Bolt: Dead
- [ ] Bolt: Injured
- [ ] Wolf pups: Spared
- [ ] Wolf pups: Killed
- [ ] Welton Council vote: Passed
- [ ] Welton Council vote: Failed
- [ ] Payment received
- [ ] Level up (1→2)

### Notes


## The Pale Sickness
- [ ] Completed
- [ ] Urgon: Cured
- [ ] Urgon: Died
- [ ] Tulgi: Cured
- [ ] Tulgi: Died
- [ ] Tulgi: Arrested
- [ ] Hulil Lutan: Killed
- [ ] Hulil Lutan: Captured
- [ ] Hulil Lutan: Fled
- [ ] Salsvault Engine: Shut down
- [ ] Salsvault Engine: Left running
- [ ] Salsvault Engine: Destroyed
- [ ] Antidote secured
- [ ] Palebank cured
- [ ] Blue vial found
- [ ] Keycard found
- [ ] Research notes found
- [ ] Payment received
- [ ] Level up (2→3)

### Notes


## The Bleating Grimoire / Wild Sheep Chase
- [ ] Completed
- [ ] Finethir/Vaelora: Restored
- [ ] Finethir/Vaelora: Still sheep
- [ ] Finethir/Vaelora: Dead
- [ ] Noke/Theron: Killed
- [ ] Noke/Theron: Captured
- [ ] Noke/Theron: Fled
- [ ] Noke/Theron: Negotiated
- [ ] Polymorphed guards: Restored
- [ ] Modified wand: Destroyed
- [ ] Modified wand: Given to Elric
- [ ] Modified wand: Kept
- [ ] Payment received

### Notes


## Peril in Pinebrook
- [ ] Completed
- [ ] Captain Kole: Met
- [ ] Captain Kole: Allied
- [ ] Captain Kole: Hostile
- [ ] Baby dragon: Returned to mother
- [ ] Baby dragon: Kept
- [ ] Baby dragon: Dead
- [ ] Mother dragon: Allied
- [ ] Mother dragon: Hostile
- [ ] Mother dragon: Neutral
- [ ] Missing patrol: Rescued
- [ ] Missing patrol: Dead
- [ ] Payment received

### Notes


## Temple of the Dragonknights
- [ ] Completed
- [ ] Venomfang: Killed
- [ ] Venomfang: Fled
- [ ] Venomfang: Negotiated
- [ ] Cult leader: Killed
- [ ] Cult leader: Captured
- [ ] Cult leader: Fled
- [ ] Clementine Andersmith: Rescued
- [ ] Clementine Andersmith: Corrupted
- [ ] Clementine Andersmith: Dead
- [ ] Sera Gelanadel: Rescued
- [ ] Sera Gelanadel: Dead
- [ ] Kobolds: Killed
- [ ] Kobolds: Negotiated
- [ ] Kobolds: Avoided
- [ ] Payment received
- [ ] Level up (4→5)

### Notes

```

- [ ] **Step 4: Create `timeline/npcs.md`**

```markdown
# NPC Status

| NPC | Location | Status | Relationship | Notes |
|-----|----------|--------|--------------|-------|
| Marshal Brenna Thorne | Waystone Inn | Alive | Neutral | |
| Steward Mara Fenwick | Waystone Inn | Alive | Neutral | |
| Lorewarden Elric Vael | Waystone Inn | Alive | Neutral | |
| Corel | Welton | Alive | Neutral | |
| Father Merriksonn | Welton | Alive | Neutral | |
| Bolt (Awakened Wolf) | Western Woods | Alive | Neutral | |
| Flame (Awakened Wolf) | Western Woods | Alive | Neutral | |
| Elro Aldataur | Palebank | Alive | Neutral | |
| Tulgi | Palebank | Unknown | Neutral | |
| Captain Emmajeen Kole | Pinebrook | Alive | Neutral | |
| Finethir Shinebright | Wandering | Unknown | Neutral | |
| Joel Andersmith | Near Temple | Alive | Neutral | |
| Venomfang | Temple | Unknown | Neutral | |
```

- [ ] **Step 5: Create `timeline/clues.md`**

```markdown
# Aevorian Echo — Clue Tracker

- [ ] Wolves of Welton: Alexi's note — word "Aevorian" legible
- [ ] Wolves of Welton: Aevorian symbols at Westly's Farm
- [ ] Wolves of Welton: Transmutation magic residue at stone formation
- [ ] The Pale Sickness: Blue-vein plague caused by Aevorian relic (blue vial)
- [ ] The Pale Sickness: Salsvault ruins are active and leaking arcane energy
- [ ] The Pale Sickness: Perpetuation Engine still running after thousands of years
- [ ] Wild Sheep Chase: Corrupted wand causing random polymorphs
- [ ] Wild Sheep Chase: Elric's debrief — magical artifacts failing region-wide
- [ ] Temple of the Dragonknights: Dragon cult drawn to area by magical disturbances
- [ ] Elric's Theory: All disturbances trace to ancient arcane engine buried beneath Northreach
- [ ] Brenna's Letter: Northern contact warns of arcane disturbances spreading

## Party Theories

```

- [ ] **Step 6: Create `timeline/promises.md`**

```markdown
# Promises & Open Hooks

## Party Said They Would
- [ ] 

## Open Hooks
- [ ] 
```

- [ ] **Step 7: Create `timeline/treasure.md`**

```markdown
# Treasure & Magic Items

| Item | Found Where | Attuned By | Notes |
|------|-------------|------------|-------|
|  |  |  |  |

**Party Gold:** 0 gp
**Stored at Waystone:** 0 gp
```

- [ ] **Step 8: Create `timeline/sessions/.gitkeep`** (empty file to track directory in git)

- [ ] **Step 9: Commit**

```bash
git add timeline/
git commit -m "feat: add timeline data files for campaign tracker"
```

---

## Task 2: Server tracker endpoints

**Files:**
- Modify: `web/server.js` — add after the manifest editor API section (~line 835)

- [ ] **Step 1: Read `web/server.js` lines 830–840 to find the exact insertion point** (after `// ─── Manifest editor API` block, before `// ─── WebSocket terminal`)

- [ ] **Step 2: Add tracker + print endpoints to `web/server.js`**

Insert this block immediately before `// ─── WebSocket terminal ─────`:

```javascript
// ─── Campaign Tracker API ─────────────────────────────────────────────────────

const TRACKER_SECTIONS = new Set(['party', 'contracts', 'npcs', 'clues', 'promises', 'treasure']);

app.get('/api/tracker', (req, res) => {
  const section = req.query.section;
  if (!TRACKER_SECTIONS.has(section)) return res.status(400).json({ error: 'Invalid section' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', `${section}.md`);
  try {
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tracker', express.text({ type: '*/*' }), (req, res) => {
  const section = req.query.section;
  if (!TRACKER_SECTIONS.has(section)) return res.status(400).json({ error: 'Invalid section' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', `${section}.md`);
  try {
    fs.writeFileSync(filePath, req.body, 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/tracker/sessions', (req, res) => {
  const dir = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions');
  try {
    if (!fs.existsSync(dir)) return res.json([]);
    const files = fs.readdirSync(dir)
      .filter(f => /^session-\d+\.md$/.test(f))
      .sort();
    const sessions = files.map(f => {
      const content = fs.readFileSync(path.join(dir, f), 'utf8');
      const fm = extractFrontmatter(content);
      const body = content.replace(/^---[\s\S]*?---\n?/, '');
      const preview = body.split('\n').find(l => l.trim() && !l.startsWith('#')) || '';
      return { id: f.replace('.md', ''), session: fm.session || '', date: fm.date || '',
               adventure: fm.adventure || '', level: fm.level || '',
               preview: preview.slice(0, 100) };
    });
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/tracker/session', (req, res) => {
  const id = req.query.id;
  if (!/^session-\d+$/.test(id)) return res.status(400).json({ error: 'Invalid session id' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions', `${id}.md`);
  try {
    const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tracker/session', express.text({ type: '*/*' }), (req, res) => {
  const id = req.query.id;
  if (!/^session-\d+$/.test(id)) return res.status(400).json({ error: 'Invalid session id' });
  const filePath = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions', `${id}.md`);
  try {
    fs.writeFileSync(filePath, req.body, 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/tracker/session/new', (req, res) => {
  const dir = path.join(CAMPAIGN_ROOT, 'timeline', 'sessions');
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const existing = fs.readdirSync(dir).filter(f => /^session-\d+\.md$/.test(f));
    const nums = existing.map(f => parseInt(f.match(/\d+/)[0], 10));
    const next = nums.length ? Math.max(...nums) + 1 : 1;
    const id = `session-${String(next).padStart(3, '0')}`;
    const content = `---\nsession: ${next}\ndate: \nadventure: \nlevel: \n---\n\n## Key Events\n\n\n## MVP Moment\n\n`;
    fs.writeFileSync(path.join(dir, `${id}.md`), content, 'utf8');
    res.json({ ok: true, id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Print endpoint (handouts) ────────────────────────────────────────────────

app.get('/print', (req, res) => {
  try {
    const filePath = safePath(req.query.path);
    const raw = fs.readFileSync(filePath, 'utf8');
    const fm = extractFrontmatter(raw);
    const body = raw.replace(/^---[\s\S]*?---\n?/, '');
    const html = marked.parse(body);
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(fm.title || 'Handout')}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Palatino Linotype', Palatino, 'Book Antiqua', serif;
      background: #f4e8c1;
      color: #1a0a00;
      max-width: 680px;
      margin: 40px auto;
      padding: 48px 56px;
      border: 1px solid #8b6914;
      outline: 3px double #c4a862;
      outline-offset: -8px;
      box-shadow: inset 0 0 60px rgba(139,105,20,0.06), 0 2px 12px rgba(0,0,0,0.15);
      min-height: calc(100vh - 80px);
    }
    h1, h2, h3 { font-weight: normal; margin-bottom: 0.75em; color: #3a1a00; }
    h1 { font-size: 1.4em; border-bottom: 1px solid #c4a862; padding-bottom: 0.4em; }
    h2 { font-size: 1.1em; }
    p { line-height: 1.75; margin-bottom: 0.85em; }
    pre {
      font-family: 'Courier New', Consolas, monospace;
      font-size: 0.82em; white-space: pre-wrap; line-height: 1.65;
      background: rgba(139,105,20,0.06); padding: 12px 16px;
      border-left: 3px solid #c4a862; margin-bottom: 0.85em;
    }
    ul, ol { margin: 0 0 0.85em 1.6em; line-height: 1.75; }
    hr { border: none; border-top: 1px solid #c4a862; margin: 1.2em 0; }
    .reveal-note {
      font-size: 0.78em; color: #7a5c1e; font-style: italic;
      margin-bottom: 1.8em; padding-bottom: 1em;
      border-bottom: 1px dashed #c4a862;
    }
    .print-btn {
      position: fixed; bottom: 24px; right: 24px;
      background: #58180d; color: #f5f0e8; border: none;
      padding: 10px 22px; font-family: inherit; font-size: 13px;
      cursor: pointer; border-radius: 3px; letter-spacing: 0.03em;
    }
    .print-btn:hover { background: #7a2010; }
    @media print {
      body { margin: 0; box-shadow: none; min-height: auto; }
      .reveal-note, .print-btn { display: none; }
    }
  </style>
</head>
<body>
  ${fm.when ? `<div class="reveal-note">⏱ Reveal when: ${esc(fm.when)}</div>` : ''}
  ${html}
  <button class="print-btn" onclick="window.print()">🖨 Print / Save PDF</button>
</body>
</html>`);
  } catch (e) {
    res.status(400).send(`<p style="color:red;font-family:sans-serif;padding:20px">${esc(e.message)}</p>`);
  }
});
```

- [ ] **Step 3: Restart server and verify endpoints with curl**

Kill old server process:
```bash
wmic process where "name='node.exe'" get ProcessId,CommandLine 2>/dev/null | grep server.js
wmic process where "ProcessId=XXXX" delete
```

Start server:
```bash
cd "C:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)/web" && node server.js &
sleep 2
```

Verify tracker read:
```bash
curl -s "http://localhost:5050/api/tracker?section=party" | python -c "import sys,json; d=json.load(sys.stdin); print('OK' if 'content' in d else 'FAIL')"
```
Expected: `OK`

Verify session list:
```bash
curl -s "http://localhost:5050/api/tracker/sessions"
```
Expected: `[]`

Verify new session:
```bash
curl -s -X POST "http://localhost:5050/api/tracker/session/new"
```
Expected: `{"ok":true,"id":"session-001"}`

Verify print endpoint:
```bash
curl -s "http://localhost:5050/print?path=gm-lore/welcome.md" | head -5
```
Expected: `<!DOCTYPE html>`

- [ ] **Step 4: Commit**

```bash
git add web/server.js
git commit -m "feat: add tracker API endpoints and print endpoint"
```

---

## Task 3: Handout files

**Files:** Create all handout directories and individual handout `.md` files.

Each file follows this format:
```markdown
---
title: [Handout Title]
type: handout
when: [Reveal timing]
---

[Handout content as markdown — use ``` code blocks for in-world documents]
```

- [ ] **Step 1: Create opening handouts**

Create `adventures/season-1/opening-handouts/o-1-recruitment-poster.md`:
```markdown
---
title: Warden Recruitment Poster
type: handout
when: Session 0 or when players first encounter the guild
---

```
NORTHWATCH WARDENS SEEK ABLE ADVENTURERS & GUARDS

The frontier needs brave souls!

  ✦ Fair Pay for Honest Work
  ✦ Food & Lodging Provided
  ✦ Training & Equipment Available
  ✦ Build Your Reputation

Contracts range from escort duty to wilderness exploration.

Inquire at the WAYSTONE INN
Ask for Marshal Brenna Thorne

"Protect the Frontier. Serve with Honor. Prosper Together."
```
```

Create `adventures/season-1/opening-handouts/o-2-wardens-oath.md`:
```markdown
---
title: The Warden's Oath
type: handout
when: During the charter signing ceremony
---

```
THE NORTHWATCH WARDENS CHARTER

I, [Name], do solemnly pledge:

• To uphold the peace and safety of Northreach and its settlements.

• To act with honor, integrity, and courage in all endeavors.

• To protect those who cannot protect themselves.

• To investigate threats to the frontier with diligence and wisdom.

• To respect the laws of the settlements I serve, while recognizing
  that justice sometimes requires more than law alone.

• To support my fellow Wardens and the communities they protect.

I understand that this guild serves the frontier, not kings or factions,
and that my loyalty is to the people who depend on our protection.

By my hand and honor,


[Signature]                                [Date]

Witnessed by: Marshal Brenna Thorne
Northwatch Wardens, Waystone Inn
```
```

Create `adventures/season-1/opening-handouts/MANIFEST.md`:
```markdown
# Opening Handouts
- [Recruitment Poster](o-1-recruitment-poster.md)
- [Warden's Oath](o-2-wardens-oath.md)
```

- [ ] **Step 2: Create Wolves of Welton handouts**

Create directory `adventures/season-1/wolves-of-welton-handouts/` and files:

`ww-1-contract.md`:
```markdown
---
title: Contract W-17 — Wolves of Welton
type: handout
when: When players accept the Wolves of Welton contract
---

```
NORTHWATCH WARDENS — CONTRACT NO. W-17

CLIENT:    Welton Village Council
CONTACT:   Tillus Merrion, Council Speaker
LOCATION:  Welton (2 days southwest of Waystone Inn)

SITUATION:
Livestock attacks have escalated over the past two weeks. Wolves are
behaving unusually — opening gates, targeting specific animals, and
demonstrating coordinated tactics. One shepherd (Westly) was injured
defending his flock.

OBJECTIVES:
1. Investigate the wolf attacks
2. Determine cause of unusual behavior
3. Resolve threat to livestock and people
4. Report findings to Waystone Inn

TERMS:
• Base Payment: 50 gold pieces (upon completion)
• Bonus: +25 gp if threat is permanently removed
• Housing: Shepherd's Crook Inn (covered)
• Supplies: Village provides basic provisions

NOTES:
Council emphasizes peaceful resolution if possible. Wolves are valued
for keeping other predators in check. Extermination should be last resort.

Authorized by: Marshal B. Thorne
Date: [Current Game Date]
```
```

`ww-2-westlys-statement.md`:
```markdown
---
title: Westly's Statement
type: handout
when: When players interview Westly at his farm
---

```
STATEMENT OF WESTLY, SHEPHERD
As recorded by Tillus Merrion, Council Speaker

"They opened the gate. I swear by the Seven, they opened it from the inside.

I heard the sheep panicking around midnight. Grabbed my staff and lantern.
When I got to the pen, the gate was swinging wide. Fresh claw marks on the
latch — four parallel gouges, like they were trying to figure out how it worked.

Six wolves inside. Big ones. Gray with amber eyes. They weren't just hunting
— they were selecting. Ignored the old ram, went straight for the ewes
carrying lambs. That's not normal.

When I shouted, they turned and looked at me. Really looked. Like they were
deciding what to do.

The big one — torn ear, white patch on its chest — it circled around behind
me while the others held their ground. They were coordinating.

I got the staff up just in time. Took a bite to the shoulder before Leanor's
dogs arrived. The wolves retreated in formation. Not a rout. A retreat.

I've been a shepherd thirty years. Wolves don't act like that.
Something's wrong with them."

[Signature: X — Westly's mark]
```
```

`ww-3-shepherds-journal.md`:
```markdown
---
title: Shepherd's Journal Fragment
type: handout
when: If players search Westly's farmhouse thoroughly
---

```
[Found in a leather-bound journal, water-damaged]

WESTLY'S NOTES — SHEEP COUNTS & OBSERVATIONS

--- [12 days ago] ---
Normal. 3 lambs born. Weather holding.

--- [10 days ago] ---
Wolf tracks near north fence. Not unusual for season.

--- [8 days ago] ---
MORE tracks. Different pattern — they're circling, not just passing
through. Set extra watches.

--- [6 days ago] ---
Gate latch bent. How? Too high for normal wolves to reach even standing.
Leanor says I'm imagining things.

--- [4 days ago] ---
Lost two ewes. Gate was OPEN when I arrived. I KNOW I latched it.
Pack moved like they'd PLANNED it.

[Margin note in shaky script: "Wizard? Curse? Ask Father Merrik?"]

[Later margin note: "Dreams again. Running through forest.
Seeing through THEIR eyes?"]
```
```

`ww-4-father-merriksons-letter.md`:
```markdown
---
title: Father Merrikson's Letter
type: handout
when: When Father Merrikson asks players to find his brother
---

```
[Sealed letter with chapel symbol]

To the Northwatch Wardens,

My brother, Alexi Merrikson, departed Welton three weeks ago on what
he called "important research." He mentioned strange magical phenomena
in the wilderness north of town — patterns in frost, animals behaving
oddly, and ruins he wished to investigate.

Alexi is a scholar of modest magical talent but considerable enthusiasm.
He planned a three-day journey and has not returned.

I commissioned search parties, but they found no trace. The wolves began
their attacks shortly after he disappeared.

I do not know if these events are connected, but the timing troubles me
deeply.

If you find him — alive or otherwise — please return word to me. If he
carries journals or notes, they may hold answers to the wolf problem.

He is my only family. I pray you bring him home.

In Faith and Hope,
Father Ambros Merrikson
Welton Chapel
```
```

`ww-5-alexis-field-journal.md`:
```markdown
---
title: Alexi's Field Journal
type: handout
when: If players discover Alexi's remains/camp OR find journal in wolf den
---

```
FIELD JOURNAL — ALEXI MERRIKSON
Arcane Phenomena Survey: North Welton Region

--- [Day 1] ---
Discovered ancient stone formation 8 miles north of Welton. Definitely
pre-Calamity. Geometric frost patterns on surfaces despite spring weather.
Magical residue detectable — Divination + Transmutation auras.

--- [Day 2] ---
Rubbings completed. Symbols match nothing in my references. Attempting
translation using phonetic approximation. One phrase repeats: "Awaken and Know."

Local animals drawn to the site. Three wolves, two foxes, deer.
Unafraid of my presence. Curious.

--- [Day 3] ---
BREAKTHROUGH. The stones aren't markers — they're focusing lenses for
ambient magic. Something beneath is projecting energy upward. When I
traced the glyphs aloud, the light intensified.

The wolves have been here all day. Just... watching.
One let me touch its head. Extraordinary.

--- [Day 4] ---
I've made a terrible mistake.

The spell completed on its own. I only meant to study it, but speaking
the words was enough. The wolves began changing — not physically, but I
can SEE intelligence awakening in their eyes.

They understand me now. One tried to speak.
Couldn't form words but the INTENT was clear.

What have I done?

--- [Day 5 — Final Entry] ---
Pack has grown. More wolves arriving daily, drawn by... something. The
leader (Bolt?) is organizing them. They look at the village lights at night.

They're HUNGRY. Not just for food. For understanding. For purpose. For safety.

I tried to explain they can't just take. That humans will fight back.
Bolt listened then growled. He understands THAT too.

I have to get to Welton. Warn them. Find a way to —

[Journal ends abruptly. Final pages water-damaged and illegible.]
```
```

Create `adventures/season-1/wolves-of-welton-handouts/MANIFEST.md`:
```markdown
# Wolves of Welton Handouts
- [Contract W-17](ww-1-contract.md)
- [Westly's Statement](ww-2-westlys-statement.md)
- [Shepherd's Journal Fragment](ww-3-shepherds-journal.md)
- [Father Merrikson's Letter](ww-4-father-merriksons-letter.md)
- [Alexi's Field Journal](ww-5-alexis-field-journal.md)
```

- [ ] **Step 3: Create The Pale Sickness handouts**

Create directory `adventures/season-1/the-pale-sickness/handouts/` and files:

`ps-1-contract.md`:
```markdown
---
title: Contract P-08 — The Pale Sickness
type: handout
when: When players accept The Pale Sickness contract
---

```
NORTHWATCH WARDENS — CONTRACT NO. P-08

CLIENT:    Palebank Village Council
CONTACT:   Pelc Dalton, Merchant & Council Rep
LOCATION:  Palebank Village (5 days northeast)

SITUATION:
Mysterious illness affecting villagers. Symptoms include blue-tinged
extremities, lethargy, and disturbing visions. Three dead, seven more sick.

Local healer suspects unnatural cause. Recent discovery: blue liquid vials
found in Urgon Wenth's smithy, believed connected to illness.

OBJECTIVES:
1. Identify source and nature of illness
2. Locate Urgon Wenth (missing)
3. Find cure or treatment
4. Eliminate ongoing threat

TERMS:
• Base Payment: 75 gold pieces
• Bonus: +50 gp if cure is found
• +25 gp for Urgon's safe return
• Housing: Jolly Dwarf Tavern (covered)

WARNINGS:
Illness may be contagious. Exercise caution.
Village is remote; winter supplies limited.

Authorized by: Marshal B. Thorne
Date: [Current Date]
```
```

`ps-2-tulgis-notes.md`:
```markdown
---
title: Tulgi's Medical Notes
type: handout
when: When Tulgi shares her findings with players
---

```
HEALER'S LOG — TULGI LUTAN
Palebank Village Medical Records

PATIENT: Irven Liel (Age 47, Trapper)

Day 1: Fever, chills, extreme fatigue. Frostbite-like discoloration on
fingers despite warm conditions.

Day 2: Blue tinge spreading up arms. Patient reports vivid dreams of
"frozen cities" and "voices in ice." Administered feverfew and warmth.
No improvement.

Day 3: Patient unresponsive. Skin cold to touch but internal temperature
elevated. Pulse erratic.

Day 4: Deceased. Body preserved for examination.

AUTOPSY FINDINGS:
- Crystalline formations in blood vessels
- Lungs show ice-like structures (impossible?)
- Brain tissue exhibits unusual blue discoloration
- NO known disease matches these symptoms

CONCLUSION: This is NOT natural illness.

---

ADDITIONAL PATIENTS (similar progression):
• Mila Teno (Age 34, Fisher) — DECEASED
• Korinn Tansi (Age 29, Hunter) — DECEASED
• Verla Pelc (Age 61, Merchant) — CRITICAL
• Four others showing early symptoms

COMMON FACTORS:
All victims visited Urgon's smithy within two weeks of symptom onset.
Urgon missing. Blue vials found in smithy suggest alchemical contamination.

RECOMMENDATION: Urgon must be found. Source must be destroyed.

— Tulgi Lutan, Healer
```
```

`ps-3-urgons-notes.md`:
```markdown
---
title: Urgon's Workshop Notes
type: handout
when: When players search Urgon's smithy
---

```
URGON WENTH — PERSONAL NOTES
[Found in locked drawer beneath workbench]

New commission from northern traveler. Well-paid. Strange request:
forge "containers" for volatile liquid. Traveler wouldn't say what
liquid was for. Coins were good. Real gold. Couldn't refuse.

---

Containers complete. Traveler returned with SEALED casks of blue liquid.
Transferred to vials I made. Liquid GLOWS faintly in darkness.
Cold to touch even through glass.

Traveler warned: Don't open. Don't touch. Don't ask.

I should have asked.

---

Elro Aldataur came by. Recognized the liquid's glow. Said it's
"pre-Calamity material." Aevorian. Dangerous. Forbidden.

He begged me to dispose of it. But traveler paid half up front — says
he'll return with second half when he retrieves vials next month.

I'll just... keep them sealed. What's the harm?

---

Vial cracked during grinding work. Liquid evaporated instantly.
Breathed the vapor before I realized.

Felt sick immediately. Blue tinge on hands within hours.
By the Third God...

Elro was right. Disposing of remaining vials — but where?

---

[Final Entry — shaky handwriting]

Can't stay. Illness spreading to others. It's my fault. Those vials...

Taking them north. Back to where they belong. If the glacier holds
ruins, maybe answers there too.

If you find this and I'm gone — look for Croaker Cave.
Bandit hideout, but better than village contamination.

Forgive me, Palebank.

— U.W.
```
```

`ps-4-travelers-contract.md`:
```markdown
---
title: The Traveler's Contract
type: handout
when: Found in Croaker Cave or on Urgon's body
---

```
[Official-looking document, partially burned]

COMMISSION CONTRACT

BUYER:  [Name deliberately obscured with ink]
SELLER: Urgon Wenth, Smith

TERMS:
- Fabricate twelve (12) reinforced glass vials
- Specifications: Cold-resistant, airtight seal
- Payment: 100 gold pieces (50 advance, 50 on delivery)
- Discretion: Seller will not inquire about contents
- Return Date: [One month from contract date]

SPECIAL CLAUSE:
Buyer reserves right to reclaim materials if Seller compromises
containment or security.

[Signature: Illegible scrawl]
[Witness: None]

---

[Margin note in different hand:]
"Salsvault expedition. Retrieval successful.
Market interest confirmed. Northreach distribution underway."
```
```

Create `adventures/season-1/the-pale-sickness/handouts/MANIFEST.md`:
```markdown
# The Pale Sickness Handouts
- [Contract P-08](ps-1-contract.md)
- [Tulgi's Medical Notes](ps-2-tulgis-notes.md)
- [Urgon's Workshop Notes](ps-3-urgons-notes.md)
- [The Traveler's Contract](ps-4-travelers-contract.md)
```

- [ ] **Step 4: Create remaining handout directories**

Create `adventures/season-1/the-wild-sheep-chase-handouts/wsc-1-finethirs-letter.md`:
```markdown
---
title: Finethir's Letter
type: handout
when: Given by the sheep (Finethir) or found in Noke's tower
---

```
TO WHOMEVER FINDS THIS,

My name is Finethir Shinebright, mage of moderate skill and
CONSIDERABLE bad judgment.

I was apprenticed to the wizard Noke — arrogant, brilliant, and utterly
paranoid. He became obsessed with immortality rituals and suspected
everyone (including me) of plotting to steal his research.

Two days ago, he confronted me with accusations of betrayal. Before I
could defend myself, he cast a Polymorph spell. I am now a SHEEP.

Worse: Noke has bound the spell with additional magic. I cannot dispel
it myself, and it will become permanent in THREE DAYS unless someone
stops him. He has fled to his tower with his spellbook.

I need adventurers brave (or foolish) enough to:

  1. Break into Noke's Tower
  2. Retrieve his spellbook (it contains the counter-spell)
  3. Force him to reverse the transformation

I can offer payment once I'm human again. My family's estate in
Solace Nexus is considerable.

PLEASE. I do not wish to spend eternity as livestock.

With Desperate Hope,
Finethir Shinebright

P.S. — If this reaches you after three days, please at least ensure
I go to a farm with good grazing.

[Later addition in hoofwriting:]
"DAY TWO. TRANSFORMATION ADVANCING. LOSING HUMAN THOUGHTS. PLEASE HURRY."
```
```

Create `adventures/season-1/the-wild-sheep-chase-handouts/MANIFEST.md`:
```markdown
# Wild Sheep Chase Handouts
- [Finethir's Letter](wsc-1-finethirs-letter.md)
```

Create `adventures/season-1/peril-in-pinebrook-handouts/pb-1-contract.md`:
```markdown
---
title: Contract PB-03 — Peril in Pinebrook
type: handout
when: When players accept the Peril in Pinebrook contract
---

```
NORTHWATCH WARDENS — CONTRACT NO. PB-03

CLIENT:    Pinebrook Village Council
CONTACT:   Garthok the Just, Village Elder
LOCATION:  Pinebrook (3 days southeast)

SITUATION:
Merchant caravan robbed on Pinebrook road. Survivors report bandits
operating with unusual organization and inside knowledge of caravan
schedules. Village suspects infiltration or informant.

Additionally: Strange lights seen in forest at night. Some villagers
report missing time and disturbing dreams after encountering lights.

OBJECTIVES:
1. Investigate bandit activity
2. Identify information source (if any)
3. Neutralize threat to trade routes
4. Investigate "lights" phenomenon (secondary)

TERMS:
• Base Payment: 60 gold pieces
• Bonus: +30 gp if infiltrator is identified
• +20 gp if lights phenomenon explained
• Housing: The Crossroads Inn (covered)

NOTES:
Village is trade hub. Extended bandit activity threatens regional economy.

Authorized by: Marshal B. Thorne
Date: [Current Date]
```
```

Create `adventures/season-1/peril-in-pinebrook-handouts/pb-2-caravan-report.md`:
```markdown
---
title: Caravan Master's Report
type: handout
when: Given by the surviving caravan master
---

```
INCIDENT REPORT
Filed by: Darvin Felasco, Caravan Master

Route:  Solace Nexus to Pinebrook
Cargo:  Textiles, tool steel, preserved foods
Guards: 4 hired swords (2 killed, 1 wounded, 1 fled)

ATTACK SUMMARY:
Ambushed at the Pine Bend, two miles west of town. Bandits (8–10
individuals) used pre-positioned obstacles to stop wagons.
Professional setup — they KNEW we were coming.

They called me by NAME. Knew what wagons held valuables.
Ignored decoy wagon entirely.

Leader wore a fox mask. Spoke with educated accent. Demanded specific
crates — not random raid. They had a LIST.

When we resisted, they attacked. Killed Hendrick and Mara without
hesitation. Rest of us surrendered.

They took:
- 3 crates of tool steel
- 1 crate of "medical supplies" (actually alchemical components — they KNEW)
- Coinage chest (obvious target)

Left everything else. Fled north into forest.

CONCLUSION:
Someone in supply chain is feeding information to bandits.
Review manifest access logs immediately.

— D. Felasco
```
```

Create `adventures/season-1/peril-in-pinebrook-handouts/MANIFEST.md`:
```markdown
# Peril in Pinebrook Handouts
- [Contract PB-03](pb-1-contract.md)
- [Caravan Master's Report](pb-2-caravan-report.md)
```

Create `adventures/season-1/temple-of-the-dragonknights-handouts/tdk-1-contract.md`:
```markdown
---
title: Contract TDK-01 — Temple of the Dragonknights
type: handout
when: When players accept the Temple of the Dragonknights contract
---

```
NORTHWATCH WARDENS — CONTRACT NO. TDK-01
[PRIORITY: HIGH]

CLIENT:   Northwatch Wardens (Internal Investigation)
CONTACT:  Marshal Brenna Thorne
LOCATION: Northwest Mountains (7–10 days travel)

SITUATION:
Multiple lines of evidence suggest organized cult operating from ruins
in northwest mountains. Cult linked to:
  • Aevorian artifact trafficking
  • Manipulation of local conflicts
  • Possible connection to recent regional instability

Recent scout reports identify structure as "Temple of the Dragonknights"
— pre-Calamity ruin believed abandoned for centuries.

OBJECTIVES:
1. Infiltrate and investigate temple
2. Identify cult leadership and goals
3. Assess threat level to region
4. Gather intelligence on Aevorian artifacts
5. Neutralize threat if possible

TERMS:
• Payment: 200 gold pieces (guild priority)
• Bonus: +100 gp for cult leadership capture/elimination
• +50 gp per significant artifact recovered
• Support: Guild will provide backup if requested

DANGER ASSESSMENT: EXTREME
This is a capstone mission. Expect organized resistance, magical
defenses, and high lethality. Prepare accordingly.

Authorized by: Marshal B. Thorne
Co-signed:     Lorewarden Elric Vael
Date:          [Current Date]
```
```

Create `adventures/season-1/temple-of-the-dragonknights-handouts/tdk-2-cult-message.md`:
```markdown
---
title: Intercepted Cult Communication
type: handout
when: Found as planted clue during earlier adventures
---

```
[Coded message, partially deciphered]

PRIORITY DIRECTIVE
To:   Cells [Regional Designations Redacted]
From: The Architect

The Assessment Phase nears completion. Our agents report successful
identification of THREE primary nodes across Northreach.
Activation sequence proceeds as planned.

ORDERS:
1. Continue artifact recovery from designated sites
2. Maintain surveillance of guild operations
3. Prepare for Phase Two (CONSOLIDATION) on signal
4. Eliminate interference as necessary

The Echo stirs.
Our masters' voices grow louder.
Soon, the world will understand what we have known:

        "The old gods are not dead.
         They merely slept.
         And we shall wake them."

Praise to the Silent City.
Praise to Those Who Endured.

— The Architect
  Temple of the Dragonknights

[Several lines deliberately burned away]
```
```

Create `adventures/season-1/temple-of-the-dragonknights-handouts/MANIFEST.md`:
```markdown
# Temple of the Dragonknights Handouts
- [Contract TDK-01](tdk-1-contract.md)
- [Intercepted Cult Communication](tdk-2-cult-message.md)
```

Create `adventures/season-1/general-handouts/gen-1-hearthfire-invitation.md`:
```markdown
---
title: Hearthfire Festival Invitation
type: handout
when: During the Hearthfire Festival seasonal event
---

```
═══════════════════════════════════════════════

           HEARTHFIRE FESTIVAL
          WELCOMING THE WARDENS

You are cordially invited to celebrate the founding of the
Northwatch Wardens Guild and the arrival of spring
to the frontier.

WHEN:  First full moon of Greenrise
WHERE: Waystone Inn Common Grounds

FESTIVITIES INCLUDE:
  ★ Feast prepared by local communities
  ★ Bardic performances and storytelling
  ★ Martial competitions and demonstrations
  ★ Dancing under the stars

Marshal Thorne will present commendations for
outstanding service. Bring your tales of adventure —
the frontier honors its heroes!

All residents of Northreach are welcome.

═══════════════════════════════════════════════
```
```

Create `adventures/season-1/general-handouts/gen-2-wanted-poster.md`:
```markdown
---
title: Wanted Poster — The Fox
type: handout
when: Posted in settlements during travel, especially near Pinebrook
---

```
╔═══════════════════════════════════════════╗
║                                           ║
║              ★  WANTED  ★                ║
║                                           ║
║          [Sketch of hooded figure]        ║
║                                           ║
║       "THE FOX" (Fox-Masked Bandit)       ║
║                                           ║
║  CRIMES:  Armed Robbery, Murder,          ║
║           Conspiracy                      ║
║                                           ║
║  DESCRIPTION:                             ║
║  - Wears distinctive fox mask             ║
║  - Educated speech                        ║
║  - Leads organized bandit gang            ║
║  - Last seen: Pinebrook region            ║
║                                           ║
║  REWARD: 50 Gold Pieces                   ║
║                                           ║
║  Report to local authorities or           ║
║  Northwatch Wardens                       ║
║                                           ║
╚═══════════════════════════════════════════╝
```
```

Create `adventures/season-1/general-handouts/gen-3-elrics-request.md`:
```markdown
---
title: Lorewarden Elric's Research Request
type: handout
when: After players mention Aevorian findings to Elric Vael
---

```
From the Desk of Lorewarden Elric Vael
Northwatch Wardens Research Division

Dear [Player Names],

Your recent findings regarding [Aevorian phenomenon] are of considerable
interest to our ongoing investigations into regional instability.

I would very much appreciate the opportunity to examine any artifacts,
journals, or unusual materials you have recovered during your contracts.

In exchange for your cooperation, I can offer:
  • Access to the guild research library
  • Translation and identification services
  • Potential leads on related contracts
  • Academic compensation (per item reviewed)

I understand adventurers prefer action to paperwork, but knowledge is
as vital as steel in protecting the frontier. What you bring me today
may save lives tomorrow.

Please visit when convenient. I keep late hours.

With Scholarly Regard,
Elric Vael
Lorewarden, Northwatch Wardens
```
```

Create `adventures/season-1/general-handouts/MANIFEST.md`:
```markdown
# General Handouts
- [Hearthfire Festival Invitation](gen-1-hearthfire-invitation.md)
- [Wanted Poster — The Fox](gen-2-wanted-poster.md)
- [Lorewarden Elric's Research Request](gen-3-elrics-request.md)
```

- [ ] **Step 5: Update season-1 MANIFEST.md to include handout folders**

In `adventures/season-1/MANIFEST.md`, add handout folder entries after each adventure:

```markdown
# Season 1 Adventures

- [Season Overview](index.md) — Arc structure, clue chain, and adventure notes
- [Session 0 — Character Integration](session-0-character-integration.md)
- [Opening — Wolves at the Waystone](opening-wolves-at-the-waystone.md)
- [Opening Handouts](opening-handouts)
- [Wolves of Welton](wolves-of-welton.md)
- [Wolves of Welton Handouts](wolves-of-welton-handouts)
- [Peril in Pinebrook](peril-in-pinebrook.md)
- [Peril in Pinebrook Handouts](peril-in-pinebrook-handouts)
- [The Bleating Grimoire](the-bleating-grimoire.md)
- [The Wild Sheep Chase](the-wild-sheep-chase.md)
- [Wild Sheep Chase Handouts](the-wild-sheep-chase-handouts)
- [The Pale Sickness](the-pale-sickness)
- [Temple of the Dragonknights](temple-of-the-dragonknights.md)
- [Temple Handouts](temple-of-the-dragonknights-handouts)
- [General Handouts](general-handouts)
```

- [ ] **Step 6: Commit**

```bash
git add adventures/season-1/
git commit -m "feat: add individual handout files for all Season 1 adventures"
```

---

## Task 4: Dashboard HTML — tracker panel and print button

**Files:**
- Modify: `web/public/index.html`

- [ ] **Step 1: Add Tracker tab to the nav (after the Home tab)**

Change:
```html
    <nav class="tab-group">
      <button class="tab" data-path="gm-lore/welcome.md">Home</button>
```

To:
```html
    <nav class="tab-group">
      <button class="tab" data-path="gm-lore/welcome.md">Home</button>
      <button class="tab" id="tab-tracker" data-tab="tracker">Tracker</button>
```

- [ ] **Step 2: Add Print button to toolbar (after the Manifest button)**

Change:
```html
    <button id="btn-manifest" title="Edit MANIFEST.md for current directory" hidden>✎ Manifest</button>
```

To:
```html
    <button id="btn-manifest" title="Edit MANIFEST.md for current directory" hidden>✎ Manifest</button>
    <button id="btn-print" title="Print this handout" hidden>🖨 Print</button>
```

- [ ] **Step 3: Add panel-tracker div inside `#workspace` after `<main id="panel-center">`**

After the closing `</main>` tag and before `<div class="rh" id="rh-r"`, add:

```html
    <div id="panel-tracker" hidden>
      <nav id="tracker-subnav">
        <button class="tr-tab active" data-section="contracts">Contracts</button>
        <button class="tr-tab" data-section="party">Party</button>
        <button class="tr-tab" data-section="npcs">NPCs</button>
        <button class="tr-tab" data-section="clues">Echo</button>
        <button class="tr-tab" data-section="promises">Promises</button>
        <button class="tr-tab" data-section="treasure">Treasure</button>
        <button class="tr-tab" data-section="sessions">Sessions</button>
        <span id="tracker-saved"></span>
      </nav>
      <div id="tracker-content"></div>
    </div>
```

- [ ] **Step 4: Add tracker CSS to `<style>` block or as inline styles**

Add before `</head>`:

```html
  <style>
    #panel-tracker {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg, #1a1a1a);
      min-width: 0;
    }
    #tracker-subnav {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 12px;
      background: #111;
      border-bottom: 1px solid #2a2a2a;
      flex-shrink: 0;
      flex-wrap: wrap;
    }
    .tr-tab {
      background: none;
      border: 1px solid transparent;
      color: #888;
      font-family: inherit;
      font-size: 12px;
      padding: 4px 12px;
      cursor: pointer;
      border-radius: 3px;
      letter-spacing: 0.03em;
    }
    .tr-tab:hover { color: #ccc; background: #1e1e1e; }
    .tr-tab.active { color: #f5f0e8; border-color: #444; background: #2a2a2a; }
    #tracker-saved {
      margin-left: auto;
      font-size: 11px;
      color: #558855;
      font-family: sans-serif;
    }
    #tracker-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px 28px;
      color: #cdd6f4;
      font-family: 'Palatino Linotype', Palatino, serif;
    }
    .tr-section { max-width: 900px; }
    .tr-section h2 {
      font-size: 1.1em; font-weight: normal; color: #f5f0e8;
      border-bottom: 1px solid #333; padding-bottom: 6px; margin-bottom: 16px;
    }
    .tr-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    .tr-table th {
      text-align: left; padding: 6px 10px; background: #222;
      color: #888; font-weight: normal; font-size: 11px;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .tr-table td { padding: 6px 10px; border-bottom: 1px solid #222; }
    .tr-table td input, .tr-table td select, .tr-table td textarea {
      background: transparent; border: none; color: #cdd6f4;
      font-family: inherit; font-size: 13px; width: 100%;
      outline: none; padding: 0;
    }
    .tr-table td input:focus, .tr-table td select:focus, .tr-table td textarea:focus {
      background: #222; border-radius: 2px; padding: 2px 4px;
    }
    .tr-table td select { cursor: pointer; }
    select option { background: #1a1a1a; }
    .tr-contract { margin-bottom: 24px; }
    .tr-contract-title {
      font-size: 1em; color: #f5f0e8; cursor: pointer;
      display: flex; align-items: center; gap: 8px;
      padding: 8px 0; border-bottom: 1px solid #2a2a2a;
      user-select: none;
    }
    .tr-contract-title .arrow { font-size: 10px; color: #666; transition: transform 0.15s; }
    .tr-contract-title.open .arrow { transform: rotate(90deg); }
    .tr-contract-body { padding: 12px 0 0 0; display: none; }
    .tr-contract-body.open { display: block; }
    .tr-checklist { list-style: none; padding: 0; margin: 0 0 12px 0; }
    .tr-checklist li {
      display: flex; align-items: center; gap: 8px;
      padding: 3px 0; font-size: 13px; cursor: pointer;
      color: #aaa;
    }
    .tr-checklist li.checked { color: #cdd6f4; text-decoration: none; }
    .tr-checklist li input[type=checkbox] { cursor: pointer; accent-color: #58180d; flex-shrink: 0; }
    .tr-notes {
      width: 100%; min-height: 60px; background: #161616;
      border: 1px solid #2a2a2a; border-radius: 3px;
      color: #cdd6f4; font-family: inherit; font-size: 13px;
      padding: 8px 10px; resize: vertical; margin-top: 8px;
      box-sizing: border-box;
    }
    .tr-notes:focus { outline: 1px solid #444; }
    .tr-add-btn {
      background: none; border: 1px dashed #444; color: #666;
      font-family: inherit; font-size: 12px; padding: 4px 12px;
      cursor: pointer; border-radius: 3px; margin-top: 8px;
    }
    .tr-add-btn:hover { border-color: #888; color: #aaa; }
    .tr-remove-btn {
      background: none; border: none; color: #555; cursor: pointer;
      font-size: 14px; padding: 0 4px; line-height: 1;
    }
    .tr-remove-btn:hover { color: #f38ba8; }
    .tr-gold-row { display: flex; gap: 24px; margin-bottom: 20px; align-items: center; font-size: 13px; }
    .tr-gold-row label { color: #888; }
    .tr-gold-row input {
      background: #161616; border: 1px solid #2a2a2a; border-radius: 3px;
      color: #cdd6f4; font-family: inherit; font-size: 13px;
      padding: 4px 8px; width: 120px;
    }
    .tr-session-list { list-style: none; padding: 0; margin: 0 0 16px 0; }
    .tr-session-item {
      padding: 10px 14px; border: 1px solid #2a2a2a; border-radius: 4px;
      margin-bottom: 8px; cursor: pointer; font-size: 13px;
    }
    .tr-session-item:hover { border-color: #444; background: #1e1e1e; }
    .tr-session-item .session-meta { color: #888; font-size: 11px; margin-bottom: 2px; }
    .tr-session-item .session-preview { color: #aaa; }
    .tr-session-form { border: 1px solid #333; border-radius: 4px; padding: 16px; margin-bottom: 16px; }
    .tr-session-form label { display: block; color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; margin-top: 12px; }
    .tr-session-form label:first-child { margin-top: 0; }
    .tr-session-form input, .tr-session-form textarea {
      width: 100%; background: #161616; border: 1px solid #2a2a2a;
      border-radius: 3px; color: #cdd6f4; font-family: inherit;
      font-size: 13px; padding: 6px 10px; box-sizing: border-box;
    }
    .tr-session-form textarea { min-height: 100px; resize: vertical; }
    .tr-session-save {
      background: #58180d; color: #f5f0e8; border: none;
      padding: 7px 18px; font-family: inherit; font-size: 13px;
      cursor: pointer; border-radius: 3px; margin-top: 12px;
    }
    .tr-session-save:hover { background: #7a2010; }
  </style>
```

- [ ] **Step 5: Verify HTML is valid (no unclosed tags)**

Open `web/public/index.html` and confirm:
- `#panel-tracker` is inside `#workspace`
- `#panel-tracker` is between `</main>` and `<div class="rh" id="rh-r">`
- `#btn-print` is in the header alongside `#btn-ctx` and `#btn-manifest`
- `<style>` block closes before `</head>`

- [ ] **Step 6: Commit**

```bash
git add web/public/index.html
git commit -m "feat: add tracker panel and print button to dashboard HTML"
```

---

## Task 5: App.js — tracker tab wiring and core save/load

**Files:**
- Modify: `web/public/app.js` — add new tracker section before `// ─── Init`

- [ ] **Step 1: Add tracker state variables and DOM refs at top of tracker section**

Add before `// ─── Init ──────`:

```javascript
// ─── Campaign Tracker ─────────────────────────────────────────────────────────

const panelTracker  = $('panel-tracker');
const trackerContent = $('tracker-content');
const trackerSaved  = $('tracker-saved');
const btnPrint      = $('btn-print');
const tabTracker    = $('tab-tracker');

let trackerSection  = 'contracts';
let trackerSaveTimer = null;

function showTrackerPanel() {
  viewer.hidden = true;
  panelTracker.hidden = false;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tabTracker.classList.add('active');
  loadTrackerSection(trackerSection);
}

function hideTrackerPanel() {
  panelTracker.hidden = true;
  viewer.hidden = false;
}

tabTracker.addEventListener('click', () => {
  hideTrackerPanel(); // reset first
  showTrackerPanel();
  setActive(null);
  if (isMobile()) closeDrawers();
});

// When any other tab is clicked, hide the tracker panel
document.querySelectorAll('.tab:not(#tab-tracker)').forEach(tab => {
  tab.addEventListener('click', hideTrackerPanel);
});

document.querySelectorAll('.tr-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tr-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    trackerSection = btn.dataset.section;
    loadTrackerSection(trackerSection);
  });
});
```

- [ ] **Step 2: Add core load/save functions**

```javascript
async function loadTrackerSection(section) {
  trackerContent.innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading…</div>';
  if (section === 'sessions') {
    await renderSessionsSection();
    return;
  }
  try {
    const r = await fetch(`/api/tracker?section=${section}`);
    const { content } = await r.json();
    renderTrackerSection(section, content);
  } catch (e) {
    trackerContent.innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">Error: ${e.message}</div>`;
  }
}

async function saveTrackerSection(section, content) {
  try {
    await fetch(`/api/tracker?section=${section}`, {
      method: 'POST', body: content, headers: { 'Content-Type': 'text/plain' }
    });
    trackerSaved.textContent = 'Saved ✓';
    clearTimeout(trackerSaveTimer);
    trackerSaveTimer = setTimeout(() => { trackerSaved.textContent = ''; }, 2000);
  } catch (e) {
    trackerSaved.textContent = 'Save failed';
  }
}

function scheduleSave(section, getContentFn) {
  clearTimeout(trackerSaveTimer);
  trackerSaveTimer = setTimeout(() => saveTrackerSection(section, getContentFn()), 600);
}
```

- [ ] **Step 3: Add markdown parse/serialize helpers**

```javascript
// Parse "- [x] label" lines from a markdown string
function parseCheckboxBlock(text) {
  return text.split('\n')
    .filter(l => /^- \[[ x]\]/.test(l))
    .map(l => ({ checked: l[3] === 'x', label: l.slice(6).trim() }));
}

// Serialize checkbox items back to markdown lines
function serializeCheckboxBlock(items) {
  return items.map(i => `- [${i.checked ? 'x' : ' '}] ${i.label}`).join('\n');
}

// Parse a markdown table into { headers, rows }
function parseMarkdownTable(text) {
  const lines = text.split('\n').filter(l => l.trim().startsWith('|'));
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
  const rows = lines.slice(2).map(l =>
    l.split('|').slice(1, -1).map(c => c.trim())
  );
  return { headers, rows };
}

// Serialize { headers, rows } back to a markdown table
function serializeMarkdownTable({ headers, rows }) {
  const sep = headers.map(h => '-'.repeat(Math.max(h.length, 3)));
  const fmt = cells => '| ' + cells.join(' | ') + ' |';
  return [fmt(headers), fmt(sep), ...rows.map(fmt)].join('\n');
}
```

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add tracker tab wiring and core save/load to app.js"
```

---

## Task 6: Tracker UI — Contracts and Party sections

**Files:**
- Modify: `web/public/app.js` — add `renderTrackerSection` dispatcher and individual renderers

- [ ] **Step 1: Add `renderTrackerSection` dispatcher**

```javascript
function renderTrackerSection(section, content) {
  const renderers = { party: renderParty, contracts: renderContracts,
    npcs: renderNpcs, clues: renderClues, promises: renderPromises,
    treasure: renderTreasure };
  const fn = renderers[section];
  if (fn) fn(content);
  else trackerContent.innerHTML = `<div class="tr-section"><p style="color:#888">Unknown section: ${section}</p></div>`;
}
```

- [ ] **Step 2: Add `renderContracts` function**

```javascript
function renderContracts(content) {
  // Split content into per-adventure blocks by ## headings
  const blocks = content.split(/^## /m).filter(Boolean);
  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Contract Outcomes</h2>';

  blocks.forEach(block => {
    const lines = block.split('\n');
    const title = lines[0].trim();
    const rest = lines.slice(1).join('\n');

    // Split checkboxes from notes
    const notesMatch = rest.match(/^### Notes\n([\s\S]*?)(?=^### |\Z)/m);
    const notesText = notesMatch ? notesMatch[1].trim() : '';
    const checkboxText = rest.replace(/^### Notes[\s\S]*/, '').trim();
    const items = parseCheckboxBlock(checkboxText);

    const contract = document.createElement('div');
    contract.className = 'tr-contract';

    const titleEl = document.createElement('div');
    titleEl.className = 'tr-contract-title';
    titleEl.innerHTML = `<span class="arrow">▶</span> ${title}`;
    titleEl.addEventListener('click', () => {
      titleEl.classList.toggle('open');
      body.classList.toggle('open');
    });

    const body = document.createElement('div');
    body.className = 'tr-contract-body';

    // Checkboxes
    const ul = document.createElement('ul');
    ul.className = 'tr-checklist';
    items.forEach((item, idx) => {
      const li = document.createElement('li');
      if (item.checked) li.classList.add('checked');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = item.checked;
      cb.addEventListener('change', () => {
        items[idx].checked = cb.checked;
        li.classList.toggle('checked', cb.checked);
        serializeAndSaveContracts(div);
      });
      li.appendChild(cb);
      li.appendChild(document.createTextNode(item.label));
      ul.appendChild(li);
    });
    body.appendChild(ul);

    // Notes
    const notesLabel = document.createElement('div');
    notesLabel.style.cssText = 'font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px';
    notesLabel.textContent = 'Notes';
    const notes = document.createElement('textarea');
    notes.className = 'tr-notes';
    notes.value = notesText;
    notes.placeholder = 'Session notes…';
    notes.addEventListener('input', () => serializeAndSaveContracts(div));

    body.appendChild(notesLabel);
    body.appendChild(notes);
    contract.appendChild(titleEl);
    contract.appendChild(body);
    div.appendChild(contract);
  });

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

function serializeAndSaveContracts(div) {
  const blocks = [];
  div.querySelectorAll('.tr-contract').forEach(contract => {
    const title = contract.querySelector('.tr-contract-title').textContent.replace('▶', '').replace('▼', '').trim();
    const items = [...contract.querySelectorAll('.tr-checklist li')].map(li => {
      const cb = li.querySelector('input[type=checkbox]');
      const label = li.textContent.trim();
      return `- [${cb.checked ? 'x' : ' '}] ${label}`;
    });
    const notes = contract.querySelector('.tr-notes').value;
    blocks.push(`## ${title}\n${items.join('\n')}\n\n### Notes\n${notes}`);
  });
  saveTrackerSection('contracts', '# Contract Outcomes\n\n' + blocks.join('\n\n'));
}
```

- [ ] **Step 3: Add `renderParty` function**

```javascript
function renderParty(content) {
  const { headers, rows } = parseMarkdownTable(content);
  const workingRows = rows.length ? rows.map(r => [...r]) : [['','','',''],['','','',''],['','','',''],['','','',''],['','','','']];

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Party Roster</h2>';

  const table = document.createElement('table');
  table.className = 'tr-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + (headers.length ? headers : ['Player','Character','Class / Level','Status']).map(h => `<th>${h}</th>`).join('') + '<th></th></tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const saveParty = () => {
    const rows = [...tbody.querySelectorAll('tr')].map(tr =>
      [...tr.querySelectorAll('input')].map(i => i.value)
    );
    const hdrs = headers.length ? headers : ['Player','Character','Class / Level','Status'];
    saveTrackerSection('party', '# Party Roster\n\n' + serializeMarkdownTable({ headers: hdrs, rows }));
  };

  const addRow = (cells) => {
    const tr = document.createElement('tr');
    cells.forEach(cell => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cell;
      input.addEventListener('blur', saveParty);
      td.appendChild(input);
      tr.appendChild(td);
    });
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tr-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => { tr.remove(); saveParty(); });
    removeTd.appendChild(removeBtn);
    tr.appendChild(removeTd);
    tbody.appendChild(tr);
  };

  workingRows.forEach(row => addRow(row));
  table.appendChild(tbody);
  div.appendChild(table);

  const addBtn = document.createElement('button');
  addBtn.className = 'tr-add-btn';
  addBtn.textContent = '+ Add player';
  addBtn.addEventListener('click', () => { addRow(['','','','']); });
  div.appendChild(addBtn);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}
```

- [ ] **Step 4: Reload dashboard, click Tracker tab, verify Contracts and Party sections render and checkboxes save**

```bash
# Restart server if needed, then open http://localhost:5050
# Click Tracker tab → contracts section should show adventure blocks
# Click a contract title to expand it
# Check a checkbox → wait 600ms → check timeline/contracts.md has been updated
```

Expected: contracts.md updates with `- [x]` for checked items.

- [ ] **Step 5: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add Contracts and Party tracker sections"
```

---

## Task 7: Tracker UI — NPCs, Echo, Promises

**Files:**
- Modify: `web/public/app.js`

- [ ] **Step 1: Add `renderNpcs` function**

```javascript
function renderNpcs(content) {
  const { headers, rows } = parseMarkdownTable(content);
  const hdrs = headers.length ? headers : ['NPC','Location','Status','Relationship','Notes'];
  const workingRows = rows.length ? rows.map(r => [...r]) : [['','','Alive','Neutral','']];

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>NPC Status</h2>';

  const table = document.createElement('table');
  table.className = 'tr-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + hdrs.map(h => `<th>${h}</th>`).join('') + '<th></th></tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const saveNpcs = () => {
    const rows = [...tbody.querySelectorAll('tr')].map(tr => {
      return [...tr.querySelectorAll('input, select')].map(el => el.value);
    });
    saveTrackerSection('npcs', '# NPC Status\n\n' + serializeMarkdownTable({ headers: hdrs, rows }));
  };

  const addRow = (cells) => {
    const tr = document.createElement('tr');
    // NPC name (0), Location (1) — text inputs
    // Status (2) — select
    // Relationship (3) — select
    // Notes (4+) — text input
    cells.forEach((cell, i) => {
      const td = document.createElement('td');
      if (i === 2) {
        const sel = document.createElement('select');
        ['Alive','Dead','Unknown'].forEach(opt => {
          const o = document.createElement('option');
          o.value = o.textContent = opt;
          if (cell === opt) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', saveNpcs);
        td.appendChild(sel);
      } else if (i === 3) {
        const sel = document.createElement('select');
        ['Ally','Neutral','Enemy','Unknown'].forEach(opt => {
          const o = document.createElement('option');
          o.value = o.textContent = opt;
          if (cell === opt) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', saveNpcs);
        td.appendChild(sel);
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = cell;
        input.addEventListener('blur', saveNpcs);
        td.appendChild(input);
      }
      tr.appendChild(td);
    });
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tr-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => { tr.remove(); saveNpcs(); });
    removeTd.appendChild(removeBtn);
    tr.appendChild(removeTd);
    tbody.appendChild(tr);
  };

  workingRows.forEach(row => {
    // Pad to 5 columns
    while (row.length < 5) row.push('');
    addRow(row);
  });
  table.appendChild(tbody);
  div.appendChild(table);

  const addBtn = document.createElement('button');
  addBtn.className = 'tr-add-btn';
  addBtn.textContent = '+ Add NPC';
  addBtn.addEventListener('click', () => { addRow(['','','Alive','Neutral','']); });
  div.appendChild(addBtn);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}
```

- [ ] **Step 2: Add `renderClues` function**

```javascript
function renderClues(content) {
  // Split: checkbox section (before ## Party Theories) and theories textarea
  const theoriesMatch = content.match(/^## Party Theories\n([\s\S]*)/m);
  const theoriesText = theoriesMatch ? theoriesMatch[1].trim() : '';
  const checkboxText = content.replace(/^## Party Theories[\s\S]*/m, '').replace(/^# .*\n/m, '').trim();
  const items = parseCheckboxBlock(checkboxText);

  const saveClues = () => {
    const cbLines = [...ul.querySelectorAll('li')].map(li => {
      const cb = li.querySelector('input[type=checkbox]');
      const label = li.textContent.trim();
      return `- [${cb.checked ? 'x' : ' '}] ${label}`;
    }).join('\n');
    const theories = textarea.value;
    saveTrackerSection('clues', `# Aevorian Echo — Clue Tracker\n\n${cbLines}\n\n## Party Theories\n\n${theories}`);
  };

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Aevorian Echo — Clue Tracker</h2>';

  const ul = document.createElement('ul');
  ul.className = 'tr-checklist';
  items.forEach(item => {
    const li = document.createElement('li');
    if (item.checked) li.classList.add('checked');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = item.checked;
    cb.addEventListener('change', () => {
      li.classList.toggle('checked', cb.checked);
      saveClues();
    });
    li.appendChild(cb);
    li.appendChild(document.createTextNode(item.label));
    ul.appendChild(li);
  });
  div.appendChild(ul);

  const theoriesHeading = document.createElement('div');
  theoriesHeading.style.cssText = 'font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.05em;margin:16px 0 6px';
  theoriesHeading.textContent = 'Party Theories';
  div.appendChild(theoriesHeading);

  const textarea = document.createElement('textarea');
  textarea.className = 'tr-notes';
  textarea.style.minHeight = '120px';
  textarea.value = theoriesText;
  textarea.placeholder = 'What do the players think is going on…';
  textarea.addEventListener('input', saveClues);
  div.appendChild(textarea);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}
```

- [ ] **Step 3: Add `renderPromises` function**

```javascript
function renderPromises(content) {
  // Two sections: ## Party Said They Would and ## Open Hooks
  const sections = [
    { key: 'party', heading: 'Party Said They Would', placeholder: 'Something the party promised to do…' },
    { key: 'hooks', heading: 'Open Hooks', placeholder: 'A dangling thread for a future session…' },
  ];

  const parseSection = (heading) => {
    const re = new RegExp(`^## ${heading}\\n([\\s\\S]*?)(?=^## |\\Z)`, 'm');
    const m = content.match(re);
    return m ? parseCheckboxBlock(m[1]) : [];
  };

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Promises & Open Hooks</h2>';

  const sectionData = {};
  const sectionUls = {};

  const savePromises = () => {
    const blocks = sections.map(s => {
      const lines = [...sectionUls[s.key].querySelectorAll('li')].map(li => {
        const cb = li.querySelector('input[type=checkbox]');
        const span = li.querySelector('span');
        return `- [${cb.checked ? 'x' : ' '}] ${span.textContent}`;
      }).join('\n');
      return `## ${s.heading}\n${lines}`;
    }).join('\n\n');
    saveTrackerSection('promises', `# Promises & Open Hooks\n\n${blocks}`);
  };

  sections.forEach(s => {
    sectionData[s.key] = parseSection(s.heading);

    const heading = document.createElement('h3');
    heading.style.cssText = 'font-size:0.95em;font-weight:normal;color:#f5f0e8;margin:20px 0 8px';
    heading.textContent = s.heading;
    div.appendChild(heading);

    const ul = document.createElement('ul');
    ul.className = 'tr-checklist';
    sectionUls[s.key] = ul;

    const addItem = (item) => {
      const li = document.createElement('li');
      if (item.checked) li.classList.add('checked');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = item.checked;
      cb.addEventListener('change', () => { li.classList.toggle('checked', cb.checked); savePromises(); });

      const span = document.createElement('span');
      span.contentEditable = true;
      span.textContent = item.label;
      span.style.cssText = 'outline:none;flex:1;';
      span.addEventListener('blur', savePromises);
      span.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); span.blur(); } });

      const removeBtn = document.createElement('button');
      removeBtn.className = 'tr-remove-btn';
      removeBtn.textContent = '✕';
      removeBtn.addEventListener('click', () => { li.remove(); savePromises(); });

      li.appendChild(cb);
      li.appendChild(span);
      li.appendChild(removeBtn);
      ul.appendChild(li);
    };

    (sectionData[s.key].length ? sectionData[s.key] : [{ checked: false, label: '' }]).forEach(addItem);
    div.appendChild(ul);

    const addBtn = document.createElement('button');
    addBtn.className = 'tr-add-btn';
    addBtn.textContent = '+ Add item';
    addBtn.addEventListener('click', () => { addItem({ checked: false, label: '' }); });
    div.appendChild(addBtn);
  });

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}
```

- [ ] **Step 4: Reload and verify NPCs, Echo, and Promises sections render correctly and save to their respective timeline files**

- [ ] **Step 5: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add NPCs, Echo clues, and Promises tracker sections"
```

---

## Task 8: Tracker UI — Treasure and Sessions

**Files:**
- Modify: `web/public/app.js`

- [ ] **Step 1: Add `renderTreasure` function**

```javascript
function renderTreasure(content) {
  const { headers, rows } = parseMarkdownTable(content);
  const hdrs = headers.length ? headers : ['Item','Found Where','Attuned By','Notes'];

  // Extract gold lines
  const goldMatch = content.match(/\*\*Party Gold:\*\* (.+)/);
  const storedMatch = content.match(/\*\*Stored at Waystone:\*\* (.+)/);
  const goldVal = goldMatch ? goldMatch[1].trim() : '0 gp';
  const storedVal = storedMatch ? storedMatch[1].trim() : '0 gp';

  const workingRows = rows.length ? rows.map(r => [...r]) : [['','','','']];

  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Treasure & Magic Items</h2>';

  // Gold row
  const goldRow = document.createElement('div');
  goldRow.className = 'tr-gold-row';
  goldRow.innerHTML = `
    <label>Party Gold: <input id="tr-gold" type="text" value="${goldVal}" style="margin-left:6px"></label>
    <label>Stored at Waystone: <input id="tr-stored" type="text" value="${storedVal}" style="margin-left:6px"></label>
  `;
  div.appendChild(goldRow);

  const table = document.createElement('table');
  table.className = 'tr-table';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + hdrs.map(h => `<th>${h}</th>`).join('') + '<th></th></tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  const saveTreasure = () => {
    const rows = [...tbody.querySelectorAll('tr')].map(tr =>
      [...tr.querySelectorAll('input')].map(i => i.value)
    );
    const gold = div.querySelector('#tr-gold').value;
    const stored = div.querySelector('#tr-stored').value;
    const tableStr = serializeMarkdownTable({ headers: hdrs, rows });
    saveTrackerSection('treasure', `# Treasure & Magic Items\n\n${tableStr}\n\n**Party Gold:** ${gold}\n**Stored at Waystone:** ${stored}`);
  };

  div.querySelector('#tr-gold').addEventListener('blur', saveTreasure);
  div.querySelector('#tr-stored').addEventListener('blur', saveTreasure);

  const addRow = (cells) => {
    const tr = document.createElement('tr');
    cells.forEach(cell => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cell;
      input.addEventListener('blur', saveTreasure);
      td.appendChild(input);
      tr.appendChild(td);
    });
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'tr-remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => { tr.remove(); saveTreasure(); });
    removeTd.appendChild(removeBtn);
    tr.appendChild(removeTd);
    tbody.appendChild(tr);
  };

  workingRows.forEach(row => { while (row.length < 4) row.push(''); addRow(row); });
  table.appendChild(tbody);
  div.appendChild(table);

  const addBtn = document.createElement('button');
  addBtn.className = 'tr-add-btn';
  addBtn.textContent = '+ Add item';
  addBtn.addEventListener('click', () => { addRow(['','','','']); });
  div.appendChild(addBtn);

  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}
```

- [ ] **Step 2: Add `renderSessionsSection` function**

```javascript
async function renderSessionsSection() {
  const div = document.createElement('div');
  div.className = 'tr-section';
  div.innerHTML = '<h2>Session Logs</h2>';

  let sessions = [];
  try {
    const r = await fetch('/api/tracker/sessions');
    sessions = await r.json();
  } catch (e) { /* show empty */ }

  const newBtn = document.createElement('button');
  newBtn.className = 'tr-add-btn';
  newBtn.style.marginBottom = '16px';
  newBtn.textContent = '＋ New Session';
  newBtn.addEventListener('click', async () => {
    const r = await fetch('/api/tracker/session/new', { method: 'POST' });
    const { id } = await r.json();
    await renderSessionsSection();
    // Open the new session for editing
    const item = trackerContent.querySelector(`[data-session-id="${id}"]`);
    if (item) item.click();
  });
  div.appendChild(newBtn);

  const list = document.createElement('ul');
  list.className = 'tr-session-list';

  const openSessionForm = async (id, listItem) => {
    // Remove any existing open form
    const existing = div.querySelector('.tr-session-form');
    if (existing) existing.remove();

    const r = await fetch(`/api/tracker/session?id=${id}`);
    const { content } = await r.json();
    const fm = content.match(/^---\n([\s\S]*?)\n---/) ? extractFrontmatterClient(content) : {};
    const body = content.replace(/^---[\s\S]*?---\n?/, '');
    const eventsMatch = body.match(/^## Key Events\n([\s\S]*?)(?=^## |\Z)/m);
    const mvpMatch = body.match(/^## MVP Moment\n([\s\S]*)/m);

    const form = document.createElement('div');
    form.className = 'tr-session-form';
    form.innerHTML = `
      <label>Date</label>
      <input type="text" id="sf-date" value="${fm.date || ''}" placeholder="e.g. 2026-05-22">
      <label>Adventure</label>
      <input type="text" id="sf-adventure" value="${fm.adventure || ''}" placeholder="e.g. Wolves of Welton">
      <label>Party Level</label>
      <input type="text" id="sf-level" value="${fm.level || ''}" placeholder="e.g. 2">
      <label>Key Events</label>
      <textarea id="sf-events" placeholder="What happened this session…">${(eventsMatch ? eventsMatch[1] : '').trim()}</textarea>
      <label>MVP Moment</label>
      <input type="text" id="sf-mvp" value="${(mvpMatch ? mvpMatch[1] : '').trim()}" placeholder="The standout moment">
      <button class="tr-session-save">Save Session</button>
    `;

    form.querySelector('.tr-session-save').addEventListener('click', async () => {
      const date = form.querySelector('#sf-date').value;
      const adventure = form.querySelector('#sf-adventure').value;
      const level = form.querySelector('#sf-level').value;
      const events = form.querySelector('#sf-events').value;
      const mvp = form.querySelector('#sf-mvp').value;
      const sessionNum = id.replace('session-', '');
      const fileContent = `---\nsession: ${sessionNum}\ndate: ${date}\nadventure: ${adventure}\nlevel: ${level}\n---\n\n## Key Events\n\n${events}\n\n## MVP Moment\n\n${mvp}\n`;
      await fetch(`/api/tracker/session?id=${id}`, {
        method: 'POST', body: fileContent, headers: { 'Content-Type': 'text/plain' }
      });
      showToast('Session saved');
      await renderSessionsSection();
    });

    listItem.insertAdjacentElement('afterend', form);
  };

  sessions.forEach(s => {
    const li = document.createElement('li');
    li.className = 'tr-session-item';
    li.dataset.sessionId = s.id;
    li.innerHTML = `
      <div class="session-meta">Session ${s.session}${s.date ? ' — ' + s.date : ''}${s.adventure ? ' · ' + s.adventure : ''}${s.level ? ' · Level ' + s.level : ''}</div>
      <div class="session-preview">${s.preview || '(no content yet)'}</div>
    `;
    li.addEventListener('click', () => openSessionForm(s.id, li));
    list.appendChild(li);
  });

  if (!sessions.length) {
    list.innerHTML = '<li style="color:#555;font-size:13px;padding:8px 0">No sessions logged yet. Click ＋ New Session to start.</li>';
  }

  div.appendChild(list);
  trackerContent.innerHTML = '';
  trackerContent.appendChild(div);
}

// Client-side frontmatter parser (mirrors server's extractFrontmatter)
function extractFrontmatterClient(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const result = {};
  for (const line of m[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon < 1) continue;
    result[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
  }
  return result;
}
```

- [ ] **Step 3: Reload and verify Treasure and Sessions sections work end-to-end**

```
1. Click Tracker → Treasure
   - Table rows should be editable
   - Edit gold field, click away → timeline/treasure.md updates

2. Click Sessions
   - Click "＋ New Session"
   - Fill in date, adventure, events
   - Click Save Session
   - Session appears in list
   - Check timeline/sessions/session-001.md was created
```

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add Treasure and Sessions tracker sections"
```

---

## Task 9: Print button wiring

**Files:**
- Modify: `web/public/app.js`

- [ ] **Step 1: Add frontmatter detection to `openPath` and print button handler**

In `openPath`, after `btnCtx.hidden = false;` add:

```javascript
  // Detect handout frontmatter for print button — fetch preview to read type
  btnPrint.hidden = true;
  fetch(`/preview?path=${encodeURIComponent(p)}&__head=1`).catch(() => {});
  // Simpler: check path pattern — files in *-handouts/ dirs or handouts/ dirs
  const isHandout = /[\\/]handouts[\\/]|[\\/][^/]+-handouts[\\/]/.test(p) && p.endsWith('.md');
  btnPrint.hidden = !isHandout;
```

- [ ] **Step 2: Add print button click handler** (add near btnManifest event listener)

```javascript
btnPrint.addEventListener('click', () => {
  if (currentPath) window.open(`/print?path=${encodeURIComponent(currentPath)}`, '_blank');
});
```

- [ ] **Step 3: Verify print flow**

```
1. Open http://localhost:5050
2. Navigate to adventures/season-1/wolves-of-welton-handouts/ww-1-contract.md
3. "🖨 Print" button should appear in toolbar
4. Click it → new tab opens with parchment-styled handout
5. Use browser's Ctrl+P / Cmd+P → handout prints cleanly (no nav chrome)
6. "Reveal when:" note should be visible on screen, hidden when printing
```

- [ ] **Step 4: Commit**

```bash
git add web/public/app.js
git commit -m "feat: add print button for handout files"
```

---

## Task 10: Archive and cleanup

**Files:**
- Rename: `gm-lore/campaign-tracker.md` → `gm-lore/campaign-tracker-archive.md`
- Modify: `gm-lore/MANIFEST.md`

- [ ] **Step 1: Rename campaign-tracker.md**

```bash
cd "C:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)"
mv gm-lore/campaign-tracker.md gm-lore/campaign-tracker-archive.md
```

- [ ] **Step 2: Update `gm-lore/MANIFEST.md`**

Replace the `[Campaign Tracker](campaign-tracker.md)` line with:

```markdown
- [Campaign Tracker Archive](campaign-tracker-archive.md) — Original combined file, superseded by Tracker tab
```

- [ ] **Step 3: Verify the gm-lore file tree no longer shows campaign-tracker.md**

```bash
curl -s "http://localhost:5050/api/files?path=gm-lore" | python -c "import sys,json; [print(e['name']) for e in json.load(sys.stdin)]"
```

Expected: `campaign-tracker-archive.md` appears, `campaign-tracker.md` does not.

- [ ] **Step 4: Final commit**

```bash
git add gm-lore/
git commit -m "feat: archive campaign-tracker.md — tracker tab is now the live system"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|---|---|
| Tracker tab in header nav | Task 4 Step 1 |
| Sub-nav: Party/Contracts/NPCs/Echo/Promises/Treasure/Sessions | Task 4 Step 3, Tasks 5–8 |
| Auto-save on blur, "Saved ✓" indicator | Task 5 Step 2 |
| `timeline/` markdown files, git-tracked | Task 1 |
| Session files in `timeline/sessions/session-NNN.md` | Task 1 Step 8, Task 2 Step 2 |
| `GET/POST /api/tracker?section=X` | Task 2 Step 2 |
| `GET/POST /api/tracker/session` + `/new` | Task 2 Step 2 |
| Individual handout files per adventure | Task 3 |
| `type: handout` frontmatter | Task 3 Step 1–4 |
| Print endpoint `/print?path=...` | Task 2 Step 2 |
| Parchment styling, reveal note hidden at print | Task 2 Step 2 |
| Print button in toolbar | Task 4 Step 2, Task 9 |
| Archive campaign-tracker.md | Task 10 |
| MANIFEST sort ordering for new dirs | Task 3 (MANIFEST.md per handout dir) |

**No placeholders found.** All render functions contain complete code.

**Type consistency confirmed:** `saveTrackerSection(section, content)`, `loadTrackerSection(section)`, `extractFrontmatterClient(content)` used consistently across tasks 5–9.
