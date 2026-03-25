<!--
  Tags: DM-Resource, Meta
  Status: Draft
  Type: DM-Resource
-->

# DM Guide Formatting Analysis

## Overview
This document identifies column break (`\column`) and wide block (`{{wide}}`) opportunities across all DM guide source files.

**Strategy:** Apply after long sections or before major headings with substantial preceding content. Wrap complex lists and callouts in `{{wide}}` to prevent awkward orphaning.

---

## Files Analyzed

### CHAPTER 1: Using This Guide
- **File:** README.md
- **Status:** ✅ COMPLETE
- **Changes Applied:**
  1. `\column` before "The Wider World of Aevoria"
  2. `\column` before "How to Use This Book"
  3. `{{wide}}` wrapper for "Ready to Adventure?" list

---

### CHAPTER 2: Quick Start

#### Session_0_Character_Integration_Prompts.md
- **Content:** 10 integration prompts with follow-ups, DM notes, examples
- **Length:** ~478 lines
- **Formatting Opportunities:**
  1. `\column` after Question 2 (~200 words in)
  2. `\column` after Question 4 (~350 words in)
  3. `{{wide}}` around "Guild Connection Types" bullet list (4 items)
  4. `{{wide}}` around "Multiple PC Connections" example callout
  
- **Recommended Changes:**
  - Add `\column` before **Q3: "What's Your First Memory of the Frontier?"** (natural long section break)
  - Add `\column` before **Q5: "Who in Northreach Do You Already Know?"** (another major category)
  - Mark any expanded callout lists with `{{wide}}`

#### SESSION_0_QUICK_START.md
- **Content:** Session prep checklists, NPC introduction scenes, mechanics
- **Length:** Unknown, needs sampling
- **Likely Opportunities:**
  - Column breaks between major sections
  - Wide blocks for prep checklists (multi-column unwanted)

---

### CHAPTER 3: Campaign Overview

#### Season 1/README.md
- **Content:** Campaign overview, adventure descriptions, geography, mechanics
- **Length:** ~414 lines
- **Identified Opportunities:**
  1. **After "Overview" section** (~150 words) → `\column` before "How It Works"
  2. **After all adventure descriptions** → `{{wide}}` around "Geography" table to ensure full render
  3. **"Adventures (Modular — Any Order)"** section is long with H3s → Consider `\column` before each adventure type grouping

- **High Priority Changes:**
  - Add `\column` before "Adventures (Modular — Any Order)" to balance layout
  - Wrap "Geography" table area in consideration (may auto-flow correctly)

---

### CHAPTER 4: DM Resources

#### DM_Resources/*.md files

**High-Priority (Long Lists/Complex Structure):**

1. **DM Guild Roster.md**
   - Multiple NPC entries with complex details
   - Likely candidates: `{{wide}}` around each NPC block or stats list
   - Column breaks between major NPC categories

2. **What_If_Quick_Guide.md**
   - ~714 lines, 5+ major scenarios
   - Each scenario has mechanics, story impact, outcomes
   - Opportunities: `\column` before each scenario (SCENARIO 1, 2, 3, 4, 5)
   - `{{wide}}` for scenario requirements lists

3. **NPC_Relationship_Diagram.md**
   - Likely contains web/diagram structure
   - May benefit from `{{wide}}` wrapper to preserve diagram

4. **Minor_NPC_Roster_Northreach.md**
   - Multiple NPC entries (~50+)
   - Could use `\column` breaks between location groups

5. **Foreshadowing_Database.md**
   - Multiple tables/lists of clues by adventure
   - `{{wide}}` for any multi-column tables

6. **Campaign_Tracker.md**
   - Session-by-session tracker
   - `{{wide}}` for session log tables

7. **Travel_Encounter_Library.md**
   - Encounter tables with multiple columns
   - `{{wide}}` for encounter tables to preserve formatting

8. **Random_Encounter_Tables_Downtime.md**
   - Multiple d100 tables
   - `{{wide}}` wrappers for each table

9. **Warden_Rank_System.md**
   - Rank progression details with stats/requirements
   - `{{wide}}` for rank table

10. **Seasonal_Event_Calendar.md**
    - Monthly/seasonal calendar events
    - `{{wide}}` for calendar if structured as table

**Medium Priority (Shorter, Reference-Only):**
- Core_Mystery_Definition.md
- Faction_Response_Document.md
- Player_Handouts_By_Adventure.md
- Mystery_Investigation_Guide.md
- Adventure_Quick_Reference.md
- NPC_Quick_Reference_Cards.md
- Session_Prep_Master_Checklist.md
- Session_Prep_Guide.md

---

### CHAPTER 5: Adventures

#### Opening Adventures
- **THE MORNING AFTER.md** — Already has `{{wide}}` for opening narrative; check for additional opportunities
- **Open Skirmish.md** — Combat encounter; likely has encounter statblocks → `{{wide}}` breaks between encounter sections
- **Return_to_Waystone_Session0.md** — Social/logistics; scene breaks might benefit from `\column`
- **Wolves - Contract.md** — Brief contract posting; minimal formatting needed

#### Wolves of Welton
- **5E_Wolves_Of_Welton.md** — Major adventure (~multiple pages)
  - Opportunities: `\column` before each major encounter (Scene 1, 2, 3, etc.)
  - `{{wide}}` for NPC stat blocks or complex encounter maps

#### Frozen Sick
- **Frozen Sick.md** — Major adventure
  - Similar to Wolves: `\column` between major scenes/encounters
  - `{{wide}}` for any multi-column stat block groups
- **Frozen_Sick_Stat_Blocks.md** — Stat block reference
  - `{{wide}}` wrappers around stat block groups (creatures, NPCs)

#### The Wild Sheep Chase
- **892902-The_Wild_Sheep_Chase_V2.md** — Comedic adventure
  - Scene transitions: `\column` breaks
  - Encounter stat blocks: `{{wide}}` wrapping

#### Peril in Pinebrook
- **Peril_in_Pinebrook_COMPLETE.md** — Investigation adventure
  - Long form with multiple scenes/locations
  - `\column` between major location sections
  - `{{wide}}` for any complex encounter or location description callouts

#### Temple of the Dragonknights
- **Temple_of_the_Dragonknights.md** — Combat-focused adventure
  - Multi-part structure (Part I, II, III, IV)
  - `\column` before each Part heading
  - `{{wide}}` for stat blocks and location descriptions

---

### CHAPTER 6: World Secrets

**All files in World Building/DMEyesOnly/:**
- These are lore documents, typically long-form prose/reference
- Opportunities: `\column` breaks between major sections or regions
- `{{wide}}` for any tables, lists of secrets, faction icons, or diagrams
- Examples:
  - The_Aeorian_Echo.md — Complex lore; `\column` between major revelation phases
  - People_Secrets.md — NPC secrets; `\column` between character groupings
  - Places_Secrets.md — Location secrets; `\column` between regions

---

### CHAPTER 7: Appendix

- **Mystery_Investigation_Guide.md** — Investigation checklist; `{{wide}}` for checklist
- **Adventure_Quick_Reference.md** — Reference cards; `{{wide}}` for each adventure's reference block
- **NPC_Quick_Reference_Cards.md** — NPC reference; potentially `{{wide}}` wrappers per NPC card
- **Session_Prep_Master_Checklist.md** — Master checklist; `{{wide}}` for ordered steps
- **Session_Prep_Guide.md** — Session prep instructions; `\column` between major prep phase sections
- **NPC Roster — By Location & Adventure.md** — Organized NPC list; `\column` between location groupings
- **The_Story_So_Far.md** — Campaign recap; `\column` between session summaries

---

## Recommended Phased Approach

### PHASE 1: High-Impact (Start Here)
1. **Session_0_Character_Integration_Prompts.md** — Add column breaks between question groups
2. **What_If_Quick_Guide.md** — Add column breaks before each scenario
3. **Season 1/README.md** — Add column break before "Adventures" section

### PHASE 2: Adventure Formatting
1. All adventure files in `Season 1/Adventures/` — Add column breaks between scenes and `{{wide}}` for stat blocks
2. Stat block files — Wrap groups in `{{wide}}`

### PHASE 3: Resource Optimization
1. DM Guild Roster, NPC lists — Add column breaks between NPC groupings
2. Encounter tables, checklists — Wrap in `{{wide}}`

### PHASE 4: World Secrets & Appendix
1. DMEyesOnly files — Add column breaks between major lore sections
2. Reference cards and guides — Strategic `{{wide}}` wrapping

---

## Implementation Notes

- **Preserve Footnotes:** Keep one `{{pageNumber,auto}}{{footnote}}` block before each `\page`
- **Spacing:** Normalize blank lines (2 blank lines = 1 empty line in markdown)
- **Block Nesting:** Never nest blocks (e.g., `{{wide` inside `{{note}}`)
- **List Preservation:** Ensure lists remain intact; don't split within `{{wide}}`
- **Table Handling:** Tables should be wrapped in `{{wide}}` if they span multiple columns or are complex

---

## Success Criteria

✅ All changes maintain readability in Homebrewery export
✅ Column breaks align content naturally (no orphaned headings at bottom of page)
✅ Wide blocks prevent list/table splits across columns
✅ Rebuild output matches Homebrewery visual layout (no extraneous spacing)
✅ All footnotes and page numbers remain in correct positions
