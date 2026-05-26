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

---

### Print Build: Auto-fix TOC paths

**Status:** draft | **Area:** Print Build

Write a small script that reads the TOC JSON files and automatically prepends `_print/` to source paths so the build doesn't fail after content reorganization. Could be a build pre-step in `build.js`.

---

### Session recap auto-generation

**Status:** draft | **Area:** Workflow / Skills

A skill or script that reads the latest session log from `timeline/sessions/` and generates a structured recap (what happened, NPCs met, items gained, hooks for next session).

---

### AGENTS.md: Auto-generated TOC

**Status:** draft | **Area:** AGENTS.md

As AGENTS.md grows, add a table of contents section at the top with links to each major section. Could be maintained manually or generated via a pre-commit hook.

---

### DM Panel: Image lightbox for maps

**Status:** draft | **Area:** DM Panel

When clicking a map or image in the file browser, open a full-screen lightbox with zoom/pan. Useful for battle maps displayed to players on a second monitor.

---

### Verify-build: Check XML well-formedness

**Status:** draft | **Area:** Print Build / CI

The verify-build script already checks for duplicate `\page` and TOC page numbers. Extend it to validate that `LionsdenGameFiles/Northwatch_Wardens.xml` is well-formed before deploying.

---

### Skill: Session prep generator

**Status:** draft | **Area:** Skills

A skill that reads the next adventure/encounter from `adventures/` or `encounters/` and generates a one-page DM prep sheet: expected NPCs, DCs, treasure, and story beats.

---

### AI notes

**Status:** ready | **Area:** Skills

Expose a skill endpoint that the DM Panel calls to narrativize DM notes into player-facing recaps. Input: bullet-point DM notes → Output: prose paragraph with story flavor.

---

### Switch-claude: Auto-detect project context

**Status:** draft | **Area:** Workflow

Enhance the `switch-claude` profile function to auto-detect what project the terminal is in and set the model accordingly (Sonnet for D&D work, a faster model for simple scripting).

---

### DM Panel: Initiative tracker

**Status:** draft | **Area:** DM Panel

A simple initiative order widget in the DM Panel — add combatants, roll initiative, cycle turns, track HP, and show saving throw info per combatant (display save bonuses, quick-click to roll a save). Syncs via WebSocket to the terminal.

HP adjustment has two modes:
- **Quick-click:** `+` and `-` buttons next to HP that increment/decrement by 1 per click — no typing needed for common small adjustments.
- **Precise entry:** Clicking the HP number opens a popup with a text box for a number and two buttons — **Damage** (subtracts) and **Heal** (adds). The popup auto-closes on submission.

Buff/debuff tracking alongside conditions — add/remove buffs per combatant, show remaining duration (e.g., "Bless — 3 more rounds"), auto-expiry on turn end. Conditions as separate trackable afflictions (stunned, poisoned, prone, etc.) with rules text on hover.

---

### Adventure soundboard

**Status:** draft | **Area:** DM Panel / Adventures

Support custom audio files alongside adventures. A sounds folder per adventure (e.g., `adventures/wolves-of-welton/sounds/`) with a soundboard UI — click a button in the adventure view to trigger the sound. Useful for ambient tracks, battle stingers, NPC voice clips, etc.

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

---

### DM login gate

**Status:** draft | **Area:** DM Panel

All DM-facing routes (adventure notes, NPC stats, combat tracker, encounter builder, maps) protected behind an initial login. Player-facing routes (maps, initiative order only) remain open. Default password: `TPK`. Configurable via `.env`.

Login state stored in a session cookie — clears when the browser closes. No persistent auth, no database needed. Server validates against the configured password on each protected route or API call.

---

### Party sheet

**Status:** draft | **Area:** DM Panel

Quick-reference card per player character: AC, max HP, passives (Perception/Insight/Investigation), spell save DC, key skills, proficiencies. Import from `player-characters/` directory. Editable during session for level-ups or magic item changes.

### Inspiration & rest tracker

**Status:** draft | **Area:** DM Panel

Track who has inspiration, hand it out, mark when used. Short/long rest buttons that reset abilities, hit dice, spell slots, and expiration-based buffs per character. Party-wide rest option for one-click reset.

### Downtime tracker

**Status:** draft | **Area:** DM Panel

Track in-game days, what each player is doing during downtime (training, crafting, research, carousing), roll results, and outcomes. Timeline view showing elapsed days.

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

---

### Combat Tracker: Buff/Debuff & Condition Enhancements

**Status:** draft | **Area:** DM Panel

Buff/debuff duration tracking with auto-expiry on turn end (e.g., "Bless — 3 more rounds"). Hover rules text on conditions (stunned, poisoned, prone, etc.). Quick save DC roll buttons per combatant showing their save bonuses.

---

### Combat Tracker: NPC Stat Block Popup

**Status:** draft | **Area:** DM Panel

Click any NPC or monster name in the combat tracker to open their full stat block in a popup — no need to hunt for the file mid-combat. Pulls from `npcs/core/`, `npcs/season-1/`, or 5etools bestiary data.

---

### Weather & Environment Widget

**Status:** draft | **Area:** DM Panel

Track current weather, time of day, and visibility conditions — Northreach-flavored (blizzard, dense fog, midnight, overcast). Displayed as a persistent widget in the panel. Affects encounter narration cues and can trigger ambient sound suggestions.

---

### Spell & Item Quick Lookup

**Status:** draft | **Area:** DM Panel

A search bar (global hotkey or panel header) that queries 5etools data for spells, magic items, and conditions. Shows a popup with full rules text in place. No page navigation or tab-switching needed mid-session.

---

### Encounter Templates

**Status:** draft | **Area:** DM Panel

Save a named encounter setup (combatants, HP, type) as a reusable template. One click loads a standard wolf pack, bandit patrol, or boss encounter into the combat tracker. Templates stored as JSON alongside saved encounters.

---
