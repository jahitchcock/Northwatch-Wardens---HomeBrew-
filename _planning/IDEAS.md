# Ideas & Brainstorming

Project-level enhancements, workflow improvements, and feature ideas for the Northwatch Wardens repository and tooling.

---

## Format

Each entry should include:
- **Status:** `draft` / `ready` / `in-progress` / `done` / `declined`
- **Area:** What system this affects (DM Panel, Print Build, AGENTS.md, Skills, Workflow, etc.)

---

## Ideas

### DM Panel: Quick-roll hotbar for common checks

**Status:** draft | **Area:** DM Panel

Add a configurable hotbar in the DM Panel for rapid D&D rolls (Perception, Stealth, Initiative buttons). Rolling would broadcast to the WebSocket terminal.

**Related code:**
- WebSocket terminal: `web/server.js` (line 1654 — `wss` setup, broadcast pattern)
- Existing roll table infrastructure: `web/server.js` (`GET /tools/roll-table`, `parseRollableTable` ~line 759)
- Panel HTML entry point: `web/public/index.html`

---

### Print Build: Auto-fix TOC paths

**Status:** draft | **Area:** Print Build

Write a small script that reads the TOC JSON files and automatically prepends `_print/` to source paths so the build doesn't fail after content reorganization. Could be a build pre-step in `build.js`.

**Related code:**
- TOC configs: `build/players-guide-toc.json`, `build/dms-guide-toc.json`
- Build entry point: `build.js`

---

### Session recap auto-generation

**Status:** draft | **Area:** Workflow / Skills

A skill or script that reads the latest session log from `timeline/sessions/` and generates a structured recap (what happened, NPCs met, items gained, hooks for next session).

**Related code:**
- Session log files: `timeline/sessions/`
- Session tracker API: `web/server.js` (`GET/POST /api/tracker/sessions`, `GET/POST /api/tracker/session`)
- Session tracker UI: `web/public/app.js` (section `'sessions'` in `renderTrackerSection` ~line 1814)
- Session-scribe agent skill: `.claude/skills/session-scribe/`

---

### AGENTS.md: Auto-generated TOC

**Status:** draft | **Area:** AGENTS.md

As AGENTS.md grows, add a table of contents section at the top with links to each major section. Could be maintained manually or generated via a pre-commit hook.

**Related code:**
- Target file: `AGENTS.md`
- Hook config: `.claude/settings.json` (hooks section)

---

### DM Panel: Image lightbox for maps

**Status:** draft | **Area:** DM Panel

When clicking a map or image in the file browser, open a full-screen lightbox with zoom/pan. Useful for battle maps displayed to players on a second monitor.

**Related code:**
- File open handler: `web/public/app.js` (`openPath` ~line 137, handles `.md`, image paste ~line 674)
- File browser rendering: `web/public/app.js` (file list click handlers ~line 229)
- Panel layout: `web/public/index.html`

---

### Verify-build: Check XML well-formedness

**Status:** draft | **Area:** Print Build / CI

The verify-build script already checks for duplicate `\page` and TOC page numbers. Extend it to validate that `LionsdenGameFiles/Northwatch_Wardens.xml` is well-formed before deploying.

**Related code:**
- XML source: `LionsdenGameFiles/Northwatch_Wardens.xml`
- Build pipeline: `build.js`, `build.sh`
- CI: `.github/workflows/`

---

### Skill: Session prep generator

**Status:** draft | **Area:** Skills

A skill that reads the next adventure/encounter from `adventures/` or `encounters/` and generates a one-page DM prep sheet: expected NPCs, DCs, treasure, and story beats.

**Related code:**
- Adventure files: `adventures/season-1/*/index.md`
- NPC files: `npcs/core/`, `npcs/season-1/`
- Encounter files: `encounters/*.json`
- Existing session-prep skill stub: `.claude/skills/session-prep/` (if present)
- NPC API: `web/server.js` (`GET /api/npcs`)

---

### AI notes

**Status:** ready | **Area:** Skills

Expose a skill endpoint that the DM Panel calls to narrativize DM notes into player-facing recaps. Input: bullet-point DM notes → Output: prose paragraph with story flavor.

**Related code:**
- Session tracker UI (where notes live): `web/public/app.js` (`renderTrackerSection` ~line 1875)
- Session tracker API: `web/server.js` (`GET/POST /api/tracker?section=sessions`)
- Author agent skill (prose writing): `.claude/skills/author/`

---

### Switch-claude: Auto-detect project context

**Status:** draft | **Area:** Workflow

Enhance the `switch-claude` profile function to auto-detect what project the terminal is in and set the model accordingly (Sonnet for D&D work, a faster model for simple scripting).

---

### DM Panel: Initiative tracker

**Status:** done | **Area:** DM Panel

A simple initiative order widget in the DM Panel — add combatants, roll initiative, cycle turns, track HP, and show saving throw info per combatant (display save bonuses, quick-click to roll a save). Syncs via WebSocket to the terminal.

HP adjustment has two modes:
- **Quick-click:** `+` and `-` buttons next to HP that increment/decrement by 1 per click — no typing needed for common small adjustments.
- **Precise entry:** Clicking the HP number opens a popup with a text box for a number and two buttons — **Damage** (subtracts) and **Heal** (adds). The popup auto-closes on submission.

Buff/debuff tracking alongside conditions — add/remove buffs per combatant, show remaining duration (e.g., "Bless — 3 more rounds"), auto-expiry on turn end. Conditions as separate trackable afflictions (stunned, poisoned, prone, etc.) with rules text on hover.

**Location:**
- Combat tracker logic: `web/public/app.js` (`combatState`, `renderCombatTracker`, `renderCombatList`, `ctUid` — from ~line 884)
- Add panel (Players/NPCs/Monsters/Manual tabs): `web/public/app.js` (`renderAddTab`, `renderAddPlayers`, `renderAddNpcs`, `renderAddMonsters`, `renderAddManual` — after `renderCombatTracker`)
- Styles: `web/public/style.css` (`.ct-*` classes)
- Encounter save/load API: `web/server.js` (`GET/POST/DELETE /api/encounters`)
- NPC data API: `web/server.js` (`GET /api/npcs`, `parseNpcFile`)
- Adventure monster API: `web/server.js` (`GET /api/adventure-monsters`, `GET /api/adventures`)
- 5etools search API: `web/server.js` (`GET /api/5etools/search`, `load5etoolsBestiary`, `searchOpen5e`)
- Spec: `docs/superpowers/specs/2026-05-25-combat-tracker-add-combatants-design.md`

---

### Adventure soundboard

**Status:** done | **Area:** DM Panel / Adventures

Support custom audio files alongside adventures. A sounds folder per adventure (e.g., `adventures/wolves-of-welton/sounds/`) with a soundboard UI — click a button in the adventure view to trigger the sound. Useful for ambient tracks, battle stingers, NPC voice clips, etc.

**Location:**
- Audio engine: `web/public/sounds.js` (`SoundPlayer` module — init, play, stop, crossfade, suggest, quick buttons)
- Scene manifest: `web/public/sounds/sounds.json` (scene definitions with file lists and keywords)
- Bundled audio files: `web/public/sounds/*.mp3/.wav/.wav` (ambient loops) and `web/public/sounds/sfx/` (one-shot effects)
- Custom drop-in folder: `web/public/sounds/custom/` (user-supplied files served via API)
- Custom sounds API: `web/server.js` (`GET /api/sounds/custom` — line 1643)
- Sound bar HTML: `web/public/index.html` (`#sound-bar` footer element)
- Sound bar + effects panel styles: `web/public/style.css` (`#sound-bar`, `#snd-fx-panel`, `.snd-*` classes)
- Inline adventure cue buttons: `adventures/season-1/the-pale-sickness/` (e.g. `[▶ Cave Drip]` markup)
- Spec: `docs/superpowers/specs/2026-05-25-ambient-sounds-design.md`

---

### Dungeon map builder

**Status:** draft | **Area:** DM Panel

An in-panel map editor for building dungeon layouts — grid-based room/ corridor placement, wall tiles, doors, secret doors, traps, and encounter markers. Export as an image or overlay for display in the DM Panel. Could start as a simple tile palette and grow into a full editor.

---

### Player-facing screen

**Status:** draft | **Area:** DM Panel

A stripped-down second-monitor view for players. Shows only:
- Initiative order (names, no HP/stats)
- Current map/battlemap (full-screen)
- Status messages ("DM is rolling...")
- No DM controls visible

Accessible at a separate URL or toggled from the main panel.

**Related code:**
- Combat state (initiative order to expose): `web/public/app.js` (`combatState` ~line 884)
- WebSocket server (for pushing updates): `web/server.js` (line 1654)
- Current file path state (for map display): `web/public/app.js` (`currentPath` ~line 137)
- Express server entry point for new route: `web/server.js`

---

### DM login gate

**Status:** draft | **Area:** DM Panel

All DM-facing routes (adventure notes, NPC stats, combat tracker, encounter builder, maps) protected behind an initial login. Player-facing routes (maps, initiative order only) remain open. Default password: `TPK`. Configurable via `.env`.

Login state stored in a session cookie — clears when the browser closes. No persistent auth, no database needed. Server validates against the configured password on each protected route or API call.

**Related code:**
- All routes to protect: `web/server.js` (Express `app.get`/`app.post` handlers)
- Entry point for middleware: `web/server.js` (near top, after `app` is created)

---

### Party sheet

**Status:** done | **Area:** DM Panel

Quick-reference card per player character: AC, max HP, passives (Perception/Insight/Investigation), spell save DC, key skills, proficiencies. Import from `player-characters/` directory. Editable during session for level-ups or magic item changes.

**Location:**
- Character data files: `player-characters/*.md` (frontmatter: name, class, level, ac, maxHp, etc.)
- Characters API: `web/server.js` (`GET /api/characters` — line 1156, parses frontmatter from `player-characters/`)
- Viewer: NPC viewer tab in `web/public/app.js` (characters appear alongside NPCs; type `player` distinguishes them)
- Used by combat tracker Players tab: `web/public/app.js` (`renderAddPlayers` fetches `/api/characters`)

### Inspiration & rest tracker

**Status:** draft | **Area:** DM Panel

Track who has inspiration, hand it out, mark when used. Short/long rest buttons that reset abilities, hit dice, spell slots, and expiration-based buffs per character. Party-wide rest option for one-click reset.

**Related code:**
- Character data: `player-characters/*.md` (hp, spell slots, hit dice in frontmatter)
- Characters API: `web/server.js` (`GET /api/characters` ~line 1156)
- Campaign tracker (where this could live as a section): `web/public/app.js` (`renderTrackerSection` ~line 1875)
- Tracker persistence API: `web/server.js` (`GET/POST /api/tracker`)

### Downtime tracker

**Status:** draft | **Area:** DM Panel

Track in-game days, what each player is doing during downtime (training, crafting, research, carousing), roll results, and outcomes. Timeline view showing elapsed days.

**Related code:**
- Timeline data: `timeline/` (session logs, calendar)
- Campaign tracker sections: `web/public/app.js` (`renderTrackerSection` ~line 1875 — could add a downtime section)
- Tracker persistence API: `web/server.js` (`GET/POST /api/tracker`)

---

### Session log from OMI transcript import

**Status:** draft | **Area:** DM Panel / Workflow

Import an OMI (Overheard Meeting Intelligence) transcript and auto-generate a structured session log. Parse the transcript to extract:
- PCs present with XP earned
- NPCs met
- Enemies defeated
- Loot/treasure found
- Plot hooks/decisions made
- Key moments and quotes

Save the result to `timeline/sessions/` as a structured session note. Optionally edit before finalizing.

**Related code:**
- Session output destination: `timeline/sessions/`
- Session tracker API: `web/server.js` (`POST /api/tracker/session/new`, `POST /api/tracker/session?id=`)
- Session-scribe agent skill: `.claude/skills/session-scribe/`

---

### Combat Tracker: Buff/Debuff & Condition Enhancements

**Status:** draft | **Area:** DM Panel

Buff/debuff duration tracking with auto-expiry on turn end (e.g., "Bless — 3 more rounds"). Hover rules text on conditions (stunned, poisoned, prone, etc.). Quick save DC roll buttons per combatant showing their save bonuses.

**Related code:**
- CONDITIONS array: `web/public/app.js` (line 881 — `['Blinded','Charmed',…]`)
- Condition picker + rendering: `web/public/app.js` (`renderCombatList` ~line 1458–1525)
- Combatant data shape: `web/public/app.js` (`combatState.combatants` — each has `conditions: []`)
- Next turn handler (where auto-expiry would fire): `web/public/app.js` (`#ct-next` click handler ~line 964)

---

### Combat Tracker: NPC Stat Block Popup

**Status:** draft | **Area:** DM Panel

Click any NPC or monster name in the combat tracker to open their full stat block in a popup — no need to hunt for the file mid-combat. Pulls from `npcs/core/`, `npcs/season-1/`, or 5etools bestiary data.

**Related code:**
- NPC files: `npcs/core/*.md`, `npcs/season-1/*.md`
- NPC API: `web/server.js` (`GET /api/npcs`, `parseNpcFile`)
- Combatant row rendering: `web/public/app.js` (`renderCombatList`)
- 5etools bestiary cache: `web/server.js` (`load5etoolsBestiary`, `bestiaryCache`)

---

### Weather & Environment Widget

**Status:** draft | **Area:** DM Panel

Track current weather, time of day, and visibility conditions — Northreach-flavored (blizzard, dense fog, midnight, overcast). Displayed as a persistent widget in the panel. Affects encounter narration cues and can trigger ambient sound suggestions.

**Related code:**
- Sound suggestion hook (weather could feed this): `web/public/sounds.js` (`SoundPlayer.suggest`)
- Sound scene manifest (weather scenes exist): `web/public/sounds/sounds.json`
- Panel header HTML: `web/public/index.html`
- Campaign tracker persistence (for storing current weather): `web/server.js` (`GET/POST /api/tracker`)

---

### Spell & Item Quick Lookup

**Status:** draft | **Area:** DM Panel

A search bar (global hotkey or panel header) that queries 5etools data for spells, magic items, and conditions. Shows a popup with full rules text in place. No page navigation or tab-switching needed mid-session.

**Related code:**
- Existing 5etools bestiary search: `web/server.js` (`GET /api/5etools/search`, `load5etoolsBestiary`)
- 5etools data server (port 2014): spells at `/data/spells/`, items at `/data/items/`
- Panel header HTML: `web/public/index.html`
- `openPath` / modal pattern to follow: `web/public/app.js` (~line 137)

---

### Encounter Templates

**Status:** draft | **Area:** DM Panel

Save a named encounter setup (combatants, HP, type) as a reusable template. One click loads a standard wolf pack, bandit patrol, or boss encounter into the combat tracker. Templates stored as JSON alongside saved encounters.

**Related code:**
- Encounter save/load API: `web/server.js` (`GET/POST/DELETE /api/encounters`, stores in `encounters/*.json`)
- Encounter list UI: `web/public/app.js` (`renderEncounterList` ~line 1036)
- Combat state shape to template: `web/public/app.js` (`combatState.combatants`)

---
