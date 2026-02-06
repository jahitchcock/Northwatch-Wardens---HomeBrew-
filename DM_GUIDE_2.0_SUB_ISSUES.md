# DM's Guide 2.0 - Sub-Issues to Create

This document outlines all the sub-issues that need to be created in GitHub for the DM's Guide 2.0 reorganization project. Each sub-issue is structured with title, description, labels, acceptance criteria, and estimates.

**Parent Issue**: [DM guide 2.0 - Reorganization](#) (replace with actual issue number)

**Project Goal**: Transform the DM's Guide from a repository README into a practical, table-ready reference that prioritizes usability and helps DMs run sessions quickly and effectively.

---

## Implementation Phases Overview

- **Phase 1**: Quick Reorganization (This Week) - Immediate TOC improvements
- **Phase 2**: Essential Content (Next 2 Weeks) - Priority 1 files critical for usability
- **Phase 3**: Enhancement (Following 2 Weeks) - Priority 2 files that greatly improve usability
- **Phase 4**: Polish (Final Week) - Priority 3 files and final refinements

---

## Phase 1: Quick Reorganization (This Week)

### Issue #1.1: Reorganize dms-guide-toc.json with improved chapter structure

**Title**: Update dms-guide-toc.json to prioritize DM usability over completeness

**Description**:
Reorganize the DM's Guide table of contents to put critical campaign framework and running tools before adventures, and separate Northreach secrets from wider world secrets.

**Changes Required**:
1. Remove/reduce "Using This Guide" chapter (move README to appendix)
2. Move "Campaign Arc" from DM Resources to a new "Campaign Framework" chapter (early position)
3. Create new "Running the Game" chapter consolidating session tools
4. Move NPCs to dedicated "NPCs and Factions" chapter
5. Split "World Secrets" into two chapters:
   - "World Secrets: Northreach" (immediate relevance)
   - "World Secrets: Known World" (future campaigns)
6. Create "DM Reference" chapter for quick-lookup tools
7. Enhance Appendix with templates and forms

**File to Edit**: `build/dms-guide-toc.json`

**Success Criteria**:
- [ ] Campaign Arc appears in first 3 chapters
- [ ] All session-running tools grouped together
- [ ] Northreach secrets separate from wider world secrets
- [ ] Adventures chapter remains comprehensive
- [ ] README moved to appendix/reference
- [ ] JSON validates and builds successfully
- [ ] Page count reduced by removing redundant intro content
- [ ] New structure tested with a rebuild

**Estimate**: 1-2 hours

**Labels**: enhancement, dm-guide, phase-1, toc-structure, quick-win

**Priority**: Critical

**Dependencies**: None

---

## Phase 2: Essential Content (Next 2 Weeks)

These are **Priority 1** files marked as "Critical" and "Very Important" for usability.

---

### Issue #2.1: Create DM Quick Start Guide

**Title**: Create DM_Quick_Start.md - "Read This First" guide for new DMs

**Description**:
Create a comprehensive quick-start guide that helps new DMs understand what makes this campaign special and how to prepare for their first session.

**Location**: `Season 1/DM_Resources/DM_Quick_Start.md`

**Content Requirements**:
- **What Makes This Campaign Special** (1 page)
  - Guild-based modular structure
  - Order-independent adventures
  - Variable attendance support (2-5 players)
  - Contract-based mission system
  - Central mystery (Aeorian Echo overview)
  
- **Preparing Session 0/1** (1 page)
  - What to read first (this guide + Campaign Arc + First Session Guide)
  - Materials needed (dice, character sheets, Opening adventure)
  - Session 0 vs Session 1 decision
  - Player expectation setting
  
- **Navigating This Book** (1 page)
  - Chapter guide: what's in each section
  - When to read what (before campaign, before session, at table)
  - Quick reference locations
  - What players should vs shouldn't know
  
- **First-Time DM Tips** (1 page)
  - "It's okay to make mistakes"
  - Using the Triad NPCs as narrative guides
  - How to use session prep templates
  - When to improvise vs stick to the script
  - Building confidence through preparation

**Formatting**:
- Use Homebrewery markdown syntax
- Maximum 4 pages
- Use `{{note}}` blocks for important tips
- Use `{{descriptive}}` blocks for example scenarios
- Page breaks after each section

**Success Criteria**:
- [ ] File created with all required sections
- [ ] No more than 4 pages
- [ ] References other critical guides (Campaign Arc, First Session Guide)
- [ ] Provides clear navigation guidance
- [ ] Encouraging tone for new DMs
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, critical, getting-started

**Dependencies**: None (but should be written with awareness of First Session Guide content)

---

### Issue #2.2: Create Campaign At A Glance Reference

**Title**: Create Campaign_At_A_Glance.md - One-page campaign overview

**Description**:
Create a single-page quick reference that DMs can glance at to remember the core campaign elements, key NPCs, adventure list, and essential stats.

**Location**: `Season 1/DM_Resources/Campaign_At_A_Glance.md`

**Content Requirements**:
- **Campaign Premise** (quarter page)
  - Guild: Northwatch Wardens
  - Location: Waystone Inn, Northreach
  - Structure: Modular, order-independent contracts
  - Levels: 1-5 (Season 1)
  - Players: 2-5, drop-in friendly
  
- **The Leadership Triad** (quarter page)
  - Marshal Brenna Thorne (human fighter, field commander)
  - Steward Mara Fenwick (half-elf ranger, quartermaster)
  - Lorewarden Elric Vael (high elf wizard, scholar)
  - Quick personality notes and voices
  
- **Core Mystery** (quarter page)
  - The Aeorian Echo: Rising magical energy
  - Source: Salsvault ruins (buried Aeorian facility)
  - Effects: Intelligence awakening, arcane instability, ancient magic resurfacing
  - Revelation pacing: Gradual across multiple adventures
  
- **Adventure List** (quarter page table)
  | Adventure | Level | Sessions | Echo Clue |
  |-----------|-------|----------|-----------|
  | Opening Adventures | 1 | 1 | Introduction to frontier |
  | Wolves of Welton | 1-3 | 2-3 | Intelligence awakening |
  | Wild Sheep Chase | 1-2 | 1 | Magic destabilizing |
  | Peril in Pinebrook | 1-3 | 2-3 | Frontier fragility |
  | Frozen Sick | 2-4 | 3-4 | Aeorian spores from Salsvault |
  | Temple of Dragonknights | 4-5 | 3-4 | Factions exploiting rising magic |
  
- **Quick Stats** (sidebar)
  - Starting gold: 50 gp per player
  - Milestone leveling: Level 2 after opening, Level 3 after 2 adventures
  - Magic item rarity: Uncommon max (Season 1)
  - Waystone Inn: Free room & board for Wardens

**Formatting**:
- Use Homebrewery markdown syntax
- Exactly 1 page (tight layout)
- Use tables for adventure list
- Use two-column layout with sidebar for quick stats
- Bold key terms

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Fits on exactly 1 page
- [ ] All 6 adventures listed with accurate levels
- [ ] Triad NPCs personality notes included
- [ ] Echo mystery summarized without spoilers
- [ ] Quick stats complete and accurate
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, critical, quick-reference

**Dependencies**: None

---

### Issue #2.3: Create First Session Guide

**Title**: Create First_Session_Guide.md - Step-by-step Session 0 and Session 1 guide

**Description**:
Create a comprehensive guide that walks DMs through running Session 0 (optional) and Session 1, including character creation guidance, charter signing, and the opening adventure.

**Location**: `Season 1/DM_Resources/First_Session_Guide.md`

**Content Requirements**:
- **Session 0: Character Creation** (2 pages)
  - When to run Session 0 vs jumping into Session 1
  - Character creation process for Northwatch Wardens
  - How to integrate player backstories
  - Group character connections
  - Setting player expectations
  - Safety tools and table agreements
  
- **Session 1: Opening Scene** (2 pages)
  - Read-aloud: Wolf attack on the road
  - Running "Open Skirmish" encounter
  - Arrival at Waystone Inn
  - Meeting the Triad NPCs
  - Tone-setting for the campaign
  
- **Charter Signing Ceremony** (1 page)
  - Roleplay the charter signing
  - Establishing guild membership
  - Explaining the contract system
  - First contract assignment
  
- **First Contract Briefing** (1 page)
  - How to present contract options
  - Using "Wolves of Welton" or alternate opening
  - Setting stakes and rewards
  - Departure logistics
  
- **Session 1 Pacing Guide** (1 page)
  - Minute-by-minute timeline (3-4 hour session)
  - When to take breaks
  - Ending the session on a cliffhook
  - Between-session homework for players
  
- **Troubleshooting Common Issues** (1 page)
  - Players who don't engage with charter
  - Analysis paralysis on contract choice
  - Players who want to leave Waystone immediately
  - Pacing too slow or too fast

**Formatting**:
- Use Homebrewery markdown syntax
- 7-8 pages total
- Use `{{descriptive}}` blocks for read-aloud text
- Use `{{note}}` blocks for DM tips
- Include timing suggestions throughout
- Page break between major sections

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Session 0 guidance is comprehensive but optional
- [ ] Session 1 scene-by-scene breakdown included
- [ ] Charter signing ceremony has roleplay guidance
- [ ] Contract briefing format explained
- [ ] Pacing guide with time estimates
- [ ] Troubleshooting section addresses common issues
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 4-5 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, critical, session-guide

**Dependencies**: 
- Should reference Campaign_At_A_Glance for NPC details
- Should reference existing Opening adventure files

---

### Issue #2.4: Create Mystery Revelation Guide

**Title**: Create Mystery_Revelation_Guide.md - Pacing the Aeorian Echo mystery

**Description**:
Create a guide that helps DMs pace the revelation of the Aeorian Echo mystery across multiple adventures, balancing player discovery with narrative coherence.

**Location**: `Season 1/DM_Resources/Mystery_Revelation_Guide.md`

**Content Requirements**:
- **The Aeorian Echo: Full Truth** (1 page)
  - Complete explanation for DMs
  - Salsvault: Buried Aeorian research facility
  - The Echo: Escaping magical energy
  - Effects on Northreach (awakening, instability, ancient magic)
  - Long-term campaign implications
  
- **Mystery Clues by Adventure** (2 pages)
  - **Opening Adventures**: Frontier setting, no clues yet
  - **Wolves of Welton**: Intelligence awakening in animals
  - **Wild Sheep Chase**: Magical items behaving strangely
  - **Peril in Pinebrook**: Settlement vulnerability patterns
  - **Frozen Sick**: Direct connection to Salsvault and Aeorian spores
  - **Temple of Dragonknights**: Factions exploiting the Echo
  - For each: What players learn, what they might infer, what to hold back
  
- **Revelation Pacing Principles** (1 page)
  - Order-independence: How to reveal consistently regardless of adventure order
  - Player agency: Discovery vs exposition
  - Foreshadowing techniques
  - When to answer questions vs create more mystery
  
- **Lorewarden Elric's Role** (1 page)
  - Using Elric for controlled information delivery
  - How much he knows vs reveals
  - Elric's investigation progressing in background
  - Session-by-session Elric knowledge progression
  
- **Player-Driven Discovery** (1 page)
  - Rewarding player investigation
  - Handling unexpected connections
  - What to do if players guess the truth early
  - What to do if players ignore the mystery
  
- **Revelation Timeline Example** (1 page)
  - Example campaign showing mystery progression
  - Sessions 1-15 sample with clues revealed
  - Shows order-independent approach working

**Formatting**:
- Use Homebrewery markdown syntax
- 6-7 pages total
- Use tables for clues-by-adventure
- Use `{{note}}` blocks for DM tips
- Use `{{warning}}` blocks for spoiler-sensitive info

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Full Echo explanation clear for DMs
- [ ] Each adventure's clues catalogued
- [ ] Order-independent pacing guidance included
- [ ] Elric's role as information conduit explained
- [ ] Player agency principles emphasized
- [ ] Example timeline demonstrates approach
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 3-4 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, very-important, mystery, campaign-arc

**Dependencies**: 
- Should align with Campaign Arc content
- Should reference all adventures' Echo clues

---

### Issue #2.5: Create Encounter Scaling Guide

**Title**: Create Encounter_Scaling_Guide.md - Scaling encounters for 2-5 players

**Description**:
Create a practical guide for scaling encounters on-the-fly to accommodate variable party sizes (2-5 players) and player absences.

**Location**: `Season 1/DM_Resources/Encounter_Scaling_Guide.md`

**Content Requirements**:
- **Scaling Principles** (1 page)
  - Action economy is king
  - HP adjustments vs enemy count
  - When to scale vs when to let it ride
  - Difficulty expectations (2 players = harder, 5 players = easier)
  
- **Scaling by Party Size** (2 pages)
  - **2 Players**: Reduce enemy count by 50%, or reduce HP by 40%
  - **3 Players**: Reduce enemy count by 25%, or reduce HP by 20%
  - **4 Players**: As written (baseline)
  - **5 Players**: Add 1-2 minions, or increase boss HP by 25%
  - Quick reference table for common creatures
  
- **On-The-Fly Adjustments** (1 page)
  - Reading the table: when fight is too easy/hard
  - Mid-combat adjustments (reinforcements, retreats)
  - HP fudging guidelines (when it's okay)
  - Using environment to balance encounters
  
- **Solo Player Guidelines** (1 page)
  - Running for 1 player (with companion NPC)
  - Which adventures work best solo
  - Scaling principles for solo play
  - Companion NPC behavior guidelines
  
- **Adventure-Specific Notes** (2 pages)
  - Key encounters in each adventure
  - Pre-scaled variations for each
  - Which encounters are flexible vs fixed
  - Boss fight scaling considerations

**Formatting**:
- Use Homebrewery markdown syntax
- 6-7 pages total
- Use tables for scaling quick reference
- Use `{{note}}` blocks for tips
- Include example calculations

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Clear scaling principles for 2-5 players
- [ ] Quick reference table for common creatures
- [ ] On-the-fly adjustment techniques included
- [ ] Solo player guidance comprehensive
- [ ] Adventure-specific notes for all 6 adventures
- [ ] Examples demonstrate principles
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 3-4 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, very-important, encounter-design, scaling

**Dependencies**: 
- Should reference stat blocks from all adventures
- Should align with Session Prep Guide

---

### Issue #2.6: Create DM Notes for Opening Adventures

**Title**: Create DM_Notes.md for Opening Adventures (Skirmish, Morning After, Wolves Contract)

**Description**:
Create a DM notes file that provides context, running guidance, and scaling information for the three opening adventure segments.

**Location**: `Season 1/Adventures/Opening/DM_Notes.md`

**Content Structure** (following template):
```markdown
# Opening Adventures - DM Notes

## Quick Reference
- **Recommended Level**: 1
- **Session Length**: 3-4 hours (all three segments)
- **Key NPCs**: The Triad (Brenna, Mara, Elric)
- **Echo Clue**: None (establishes frontier setting)
- **Consequences**: Sets tone for campaign

## Running These Adventures
- Purpose: Establish setting, introduce guild, deliver first contract
- Pacing: Fast-paced skirmish → downtime → contract briefing
- Tone: Frontier danger → safe haven → adventure hooks

## Segment Breakdown

### Open Skirmish (30 minutes)
- Running the wolf encounter
- Common player approaches
- When to start vs skip

### The Morning After (1 hour)
- Waystone Inn arrival
- Meeting the Triad (roleplay tips)
- Charter signing ceremony

### Wolves Contract (30 minutes)
- Presenting contract options
- Answering player questions
- Transition to first adventure

## Scaling Guidelines
- 2 players: 2 wolves in Open Skirmish
- 3-4 players: As written (3 wolves)
- 5 players: 4 wolves or wolves + dire wolf

## Prep Checklist
- [ ] Review Triad NPC personalities
- [ ] Prepare Waystone Inn description
- [ ] Print Wolves of Welton contract
- [ ] Decide Session 0 vs Session 1 approach
```

**Success Criteria**:
- [ ] File created following template
- [ ] All three opening segments covered
- [ ] Quick reference section complete
- [ ] Scaling guidance provided
- [ ] Prep checklist included
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 1-2 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, important, dm-notes, adventures

**Dependencies**: 
- References existing Opening adventure files
- Should align with First Session Guide

---

### Issue #2.7: Create DM Notes for Wolves of Welton

**Title**: Create DM_Notes.md for Wolves of Welton

**Description**:
Create DM notes for the Wolves of Welton adventure following the established template.

**Location**: `Season 1/Adventures/Wolves_Of_Welton/DM_Notes.md`

**Content Requirements** (following template):
- Quick Reference (level, session length, NPCs, Echo clue, consequences)
- Running This Adventure (common approaches, tricky encounters, improvisation)
- Echo Clue: Intelligence awakening in wolves
- Scaling Guidelines (by party size)
- Key Encounters: Westly's Farm investigation, wolf pack combat, Ulfgar confrontation
- Prep Checklist

**Specific Notes for This Adventure**:
- Moral complexity: Wolves aren't evil, they're awakened
- Multiple resolution paths (combat, negotiation, relocation)
- Consequences affect Welton's relationship with players
- Ulfgar (awakened wolf leader) roleplay guidance

**Success Criteria**:
- [ ] File created following template
- [ ] Quick reference complete
- [ ] Moral complexity emphasized
- [ ] Multiple resolution paths explained
- [ ] Scaling guidance for key encounters
- [ ] Ulfgar roleplay tips included
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, important, dm-notes, adventures

**Dependencies**: References existing Wolves of Welton adventure

---

### Issue #2.8: Create DM Notes for Frozen Sick

**Title**: Create DM_Notes.md for Frozen Sick

**Description**:
Create DM notes for the Frozen Sick adventure following the established template.

**Location**: `Season 1/Adventures/Frozen Sick/DM_Notes.md`

**Content Requirements** (following template):
- Quick Reference
- Running This Adventure
- Echo Clue: Aeorian spores from Salsvault (critical mystery revelation)
- Scaling Guidelines
- Key Encounters: Palebank Village investigation, Croaker Cave infiltration, Salsvault descent
- Prep Checklist

**Specific Notes for This Adventure**:
- Major mystery revelation: Direct connection to Aeorian ruins
- Survival elements: Cold weather, exhaustion
- Dungeon crawl structure (Croaker Cave and Salsvault)
- Urgrem Magebane (frigid woe cure quest)
- Salsvault reveals Echo source

**Success Criteria**:
- [ ] File created following template
- [ ] Quick reference complete
- [ ] Echo revelation guidance (most important clue)
- [ ] Survival mechanics explained
- [ ] Dungeon crawl tips included
- [ ] Scaling guidance for Salsvault
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, important, dm-notes, adventures

**Dependencies**: References existing Frozen Sick adventure

---

### Issue #2.9: Create DM Notes for Wild Sheep Chase

**Title**: Create DM_Notes.md for Wild Sheep Chase

**Description**:
Create DM notes for the Wild Sheep Chase adventure following the established template.

**Location**: `Season 1/Adventures/The_Wild_Sheep_Chase_V2/DM_Notes.md`

**Content Requirements** (following template):
- Quick Reference
- Running This Adventure
- Echo Clue: Magic items destabilizing
- Scaling Guidelines
- Key Encounters: Shinebright awakened sheep, Noke's Tower exploration, Guz polymorphed wizard battle
- Prep Checklist

**Specific Notes for This Adventure**:
- Comedic tone (lighter adventure between heavier ones)
- Polymorph chaos and magical mishaps
- Fast-paced one-shot structure
- Echo connection: Noke's experiments affected by Echo
- Shinebright the sheep roleplay

**Success Criteria**:
- [ ] File created following template
- [ ] Quick reference complete
- [ ] Comedic tone guidance
- [ ] Polymorph mechanics tips
- [ ] Shinebright roleplay included
- [ ] Echo connection explained
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 1-2 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, important, dm-notes, adventures

**Dependencies**: References existing Wild Sheep Chase adventure

---

### Issue #2.10: Create DM Notes for Peril in Pinebrook

**Title**: Create DM_Notes.md for Peril in Pinebrook

**Description**:
Create DM notes for the Peril in Pinebrook adventure following the established template.

**Location**: `Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/DM_Notes.md`

**Content Requirements** (following template):
- Quick Reference
- Running This Adventure
- Echo Clue: Frontier settlements vulnerable to awakened creatures
- Scaling Guidelines
- Key Encounters: Pinebrook investigation, awakened creatures, culprit confrontation
- Prep Checklist

**Specific Notes for This Adventure**:
- Investigation-heavy adventure
- Social encounters and NPC interviews
- Multiple suspects and red herrings
- Echo connection: Pattern of awakening spreading
- Consequences for Pinebrook's survival

**Success Criteria**:
- [ ] File created following template
- [ ] Quick reference complete
- [ ] Investigation guidance included
- [ ] Social encounter tips
- [ ] Multiple resolution paths
- [ ] Echo pattern connection explained
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, important, dm-notes, adventures

**Dependencies**: References existing Peril in Pinebrook adventure

---

### Issue #2.11: Create DM Notes for Temple of the Dragonknights

**Title**: Create DM_Notes.md for Temple of the Dragonknights

**Description**:
Create DM notes for the Temple of the Dragonknights adventure following the established template.

**Location**: `Season 1/Adventures/Temple_of_the_Dragonknights/DM_Notes.md`

**Content Requirements** (following template):
- Quick Reference
- Running This Adventure
- Echo Clue: Factions exploiting rising magic (capstone revelation)
- Scaling Guidelines
- Key Encounters: Temple infiltration, cult confrontation, final boss battle
- Prep Checklist

**Specific Notes for This Adventure**:
- Capstone adventure (highest level content)
- Infiltration + combat structure
- Dragonknight cult motivations
- Faction implications for future campaigns
- Climactic confrontation with cult leader
- Season 1 conclusion guidance

**Success Criteria**:
- [ ] File created following template
- [ ] Quick reference complete
- [ ] Capstone adventure tone emphasized
- [ ] Infiltration guidance included
- [ ] Boss encounter scaling detailed
- [ ] Season 1 wrap-up suggestions
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-2, priority-1, important, dm-notes, adventures

**Dependencies**: References existing Temple of the Dragonknights adventure

---

## Phase 3: Enhancement (Following 2 Weeks)

These are **Priority 2** files that greatly improve usability.

---

### Issue #3.1: Create Adventure Sequencing Guide

**Title**: Create Adventure_Sequencing.md - Order-independent adventure guidance

**Description**:
Create a guide that helps DMs sequence adventures based on party level, player interests, and thematic flow while maintaining order-independence.

**Location**: `Season 1/DM_Resources/Adventure_Sequencing.md`

**Content Requirements**:
- **Recommended Sequence for New DMs** (1 page)
  - Linear progression: Opening → Wolves → Pinebrook → Wild Sheep → Frozen Sick → Temple
  - Why this order works (level progression, mystery revelation)
  
- **Order-Independent Principles** (1 page)
  - How adventures work in any order
  - Adjusting Echo clue delivery
  - Level scaling between adventures
  - Maintaining narrative coherence
  
- **Thematic Connections** (2 pages)
  - How adventures connect thematically
  - Branching paths based on player choices
  - Using contracts to guide sequencing
  - Callbacks and foreshadowing
  
- **Player-Driven Sequencing** (1 page)
  - Letting players choose contracts
  - Reading the table's interests
  - Balancing variety (combat, investigation, social)
  - When to introduce new contracts

**Formatting**:
- Use Homebrewery markdown syntax
- 4-5 pages total
- Use flowcharts/diagrams for sequencing options
- Use tables for thematic connections

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Recommended sequence clear for new DMs
- [ ] Order-independent principles explained
- [ ] Thematic connections mapped
- [ ] Player-driven approach supported
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-3, priority-2, campaign-structure

**Dependencies**: Should reference all adventures and Campaign Arc

---

### Issue #3.2: Create Milestone Leveling Guide

**Title**: Create Milestone_Leveling.md - Level progression guidance

**Description**:
Create a guide for milestone-based leveling that accommodates variable attendance and order-independent adventures.

**Location**: `Season 1/DM_Resources/Milestone_Leveling.md`

**Content Requirements**:
- **Milestone Philosophy** (1 page)
  - Why milestones over XP for this campaign
  - Accommodating variable attendance
  - Group leveling (everyone levels together)
  
- **Progression from Levels 1-5** (2 pages)
  - Level 1: After Opening (Session 1)
  - Level 2: After 1st contract adventure (Session 3-4)
  - Level 3: After 2nd contract adventure (Session 6-7)
  - Level 4: After 3rd-4th contract adventure (Session 10-12)
  - Level 5: Before Temple of Dragonknights (Session 13-15)
  
- **Milestone Suggestions by Adventure** (1 page)
  - When to level within each adventure
  - Significant accomplishments as milestones
  - Order-independent milestone placement
  
- **Variable Attendance Handling** (1 page)
  - Players who miss sessions
  - Players who join late
  - Keeping everyone at same level
  - Narrative explanations for leveling

**Formatting**:
- Use Homebrewery markdown syntax
- 4-5 pages total
- Use tables for milestone placement
- Use progression chart graphic

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Clear milestone philosophy explained
- [ ] Progression 1-5 mapped out
- [ ] Adventure-specific milestones suggested
- [ ] Variable attendance solutions provided
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-3, priority-2, leveling, progression

**Dependencies**: Should reference all adventures

---

### Issue #3.3: Create Session Opening Templates

**Title**: Create Session_Opening_Templates.md - Templates for every session start

**Description**:
Create ready-to-use templates for opening every session, including return to Waystone Inn, contract briefings, and adventure transitions.

**Location**: `Season 1/DM_Resources/Session_Opening_Templates.md`

**Content Requirements**:
- **Session Opening Checklist** (1 page)
  - Recap previous session (template questions)
  - Check attendance and adjust encounters
  - Set the scene (Waystone or adventure location)
  - Review character status (HP, resources, inventory)
  
- **Waystone Inn Arrival Scenes** (2 pages)
  - Template 1: Returning from adventure
  - Template 2: Starting new session at Waystone
  - Template 3: Mid-adventure check-in
  - Including: Weather, time of day, NPCs present, atmosphere
  
- **Contract Briefing Format** (2 pages)
  - Template structure for presenting contracts
  - What information to include
  - How to answer player questions
  - Transitioning to adventure departure
  - Example contract briefings (2-3)
  
- **Adventure-to-Adventure Transitions** (1 page)
  - Downtime at Waystone between contracts
  - Passing time narration
  - Guild activities and NPC interactions
  - Foreshadowing next contracts

**Formatting**:
- Use Homebrewery markdown syntax
- 5-6 pages total
- Use `{{descriptive}}` blocks for read-aloud templates
- Use `{{note}}` blocks for DM guidance
- Make templates easily adaptable

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Session opening checklist comprehensive
- [ ] 3+ Waystone arrival scene templates
- [ ] Contract briefing format clear
- [ ] Example briefings included
- [ ] Transition guidance provided
- [ ] Templates easily adaptable
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-3, priority-2, session-tools, templates

**Dependencies**: Should reference Campaign Arc and Contract system

---

### Issue #3.4: Create Improvisation Toolkit

**Title**: Create Improvisation_Toolkit.md - Tools for handling unexpected player choices

**Description**:
Create a toolkit of improvisation techniques, random generators, and guidelines for handling when players go off-script.

**Location**: `Season 1/DM_Resources/Improvisation_Toolkit.md`

**Content Requirements**:
- **Improvisation Principles** (1 page)
  - "Yes, and..." technique for DMs
  - When to say yes vs redirect
  - Using player ideas to enhance story
  - Maintaining campaign coherence
  
- **Random NPC Generator** (2 pages)
  - Name tables (by region/culture)
  - Personality traits
  - Motivations
  - Quirks and mannerisms
  - Quick stat blocks
  
- **Unplanned Contract Ideas** (2 pages)
  - 20 quick contract hooks
  - Fitting contracts to Echo mystery
  - Scaling to party level
  - Contract reward guidelines
  
- **Handling Unexpected Choices** (2 pages)
  - Players skip suggested adventure
  - Players kill important NPCs
  - Players ignore the Echo mystery
  - Players go to unplanned locations
  - Players split the party
  
- **Quick Random Tables** (1 page)
  - Weather
  - Road encounters
  - Waystone Inn happenings
  - Complication generator

**Formatting**:
- Use Homebrewery markdown syntax
- 7-8 pages total
- Use tables extensively for generators
- Use `{{note}}` blocks for tips
- Make all generators d20 or d100 tables

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Improvisation principles clear
- [ ] NPC generator comprehensive
- [ ] 20+ contract ideas included
- [ ] Unexpected choice guidance practical
- [ ] Random tables ready to use
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 3-4 hours

**Labels**: content-creation, dm-guide, phase-3, priority-2, improvisation, random-tables

**Dependencies**: Should align with Campaign Arc and existing NPCs

---

### Issue #3.5: Create NPC Roleplay Guide

**Title**: Create NPC_Roleplay_Guide.md - Quick reference for playing key NPCs

**Description**:
Create a quick reference guide for roleplaying all key NPCs in the campaign, with personality notes, voices, and motivations.

**Location**: `Season 1/DM_Resources/NPC_Roleplay_Guide.md`

**Content Requirements**:
- **The Leadership Triad** (3 pages, 1 per NPC)
  - **Brenna Thorne**: Voice, personality, motivations, secrets, how to play
  - **Mara Fenwick**: Voice, personality, motivations, secrets, how to play
  - **Elric Vael**: Voice, personality, motivations, secrets, how to play
  - Include: Speech patterns, body language, typical phrases
  
- **Key Recurring NPCs** (3 pages)
  - **Shinebright** (awakened sheep)
  - **Ulfgar** (awakened wolf leader)
  - **Urgrem Magebane** (dwarf merchant)
  - Other notable NPCs from adventures
  
- **NPC Reaction Tables** (1 page)
  - How NPCs react to player choices
  - Reputation effects
  - Building relationships over time
  
- **Quick Voice Reference** (1 page)
  - At-a-glance voice descriptions
  - Accent notes
  - Pitch and tone guidance

**Formatting**:
- Use Homebrewery markdown syntax
- 7-8 pages total
- Use consistent NPC stat block format
- Use `{{descriptive}}` for voice examples
- Include portrait/artwork references if available

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Triad NPCs comprehensively covered
- [ ] Key recurring NPCs included
- [ ] Voice and personality guidance clear
- [ ] Reaction tables provided
- [ ] Quick reference format easy to scan
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 3 hours

**Labels**: content-creation, dm-guide, phase-3, priority-2, npcs, roleplay

**Dependencies**: Should reference existing NPC rosters and Guild Roster

---

### Issue #3.6: Create Faction Tracker

**Title**: Create Faction_Tracker.md - Track player reputation and faction relationships

**Description**:
Create a tracking system for player reputation with various factions and how player choices affect faction relationships.

**Location**: `Season 1/DM_Resources/Faction_Tracker.md`

**Content Requirements**:
- **Factions in Northreach** (2 pages)
  - Northwatch Wardens (player guild)
  - Palebank Village leaders
  - Welton village council
  - Pinebrook residents
  - Dragonknight cult
  - Other regional factions
  - For each: Goals, allies, enemies, influence
  
- **Reputation System** (1 page)
  - Reputation scales (-5 to +5)
  - How actions affect reputation
  - Reputation benefits and consequences
  - Tracking multiple factions
  
- **Faction Relationship Map** (1 page)
  - Visual map of faction relationships
  - Allied, neutral, hostile connections
  - How one faction's reputation affects another
  
- **Player Choice Consequences** (2 pages)
  - Decision matrix for key choices
  - Long-term faction effects
  - How to incorporate into future adventures
  - Example: Wolves of Welton resolution effects
  
- **Tracking Template** (1 page)
  - Blank faction tracker for DM use
  - Reputation log by session

**Formatting**:
- Use Homebrewery markdown syntax
- 6-7 pages total
- Use tables for reputation tracking
- Include visual faction map
- Provide blank tracking template

**Success Criteria**:
- [ ] File created with all required sections
- [ ] All major factions described
- [ ] Reputation system clear and usable
- [ ] Faction relationship map included
- [ ] Consequence guidance comprehensive
- [ ] Blank tracking template provided
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-3, priority-2, factions, tracking

**Dependencies**: Should reference Campaign Arc and all adventures

---

## Phase 4: Polish (Final Week)

These are **Priority 3** files and final refinements.

---

### Issue #4.1: Create Reward Guidelines

**Title**: Create Reward_Guidelines.md - Gold, magic items, and non-monetary rewards

**Description**:
Create comprehensive guidelines for rewarding players throughout the campaign, including contract pay, magic items, and non-monetary benefits.

**Location**: `Season 1/DM_Resources/Reward_Guidelines.md`

**Content Requirements**:
- **Gold per Contract** (1 page)
  - Level-appropriate contract payment
  - Base pay + hazard bonuses
  - Guild stipend (room/board at Waystone)
  - Wealth by level guidelines
  
- **Magic Item Progression** (2 pages)
  - Rarity limits by level (Season 1: Common to Uncommon)
  - Suggested items per adventure
  - Balancing magic item distribution
  - Custom Northwatch Wardens items
  
- **Non-Monetary Rewards** (2 pages)
  - Guild rank advancement
  - Reputation benefits
  - Access to resources (Lorewarden's library, etc.)
  - Downtime benefits
  - Story rewards (NPC allies, information, etc.)
  
- **Treasure by Adventure** (1 page)
  - Quick reference table
  - Suggested treasure for each adventure
  - How to adjust for party size

**Formatting**:
- Use Homebrewery markdown syntax
- 5-6 pages total
- Use tables for treasure by level
- Include magic item suggestions

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Gold guidelines by level clear
- [ ] Magic item progression appropriate
- [ ] Non-monetary rewards compelling
- [ ] Adventure-specific treasure tables included
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-4, priority-3, rewards, treasure

**Dependencies**: Should reference all adventures

---

### Issue #4.2: Create Random Tables Collection

**Title**: Create Random_Tables.md - Comprehensive random tables for campaign

**Description**:
Create a collection of random tables for encounters, events, names, and other campaign elements.

**Location**: `Season 1/DM_Resources/Random_Tables.md`

**Content Requirements**:
- **Random Encounters by Region** (2 pages)
  - Northreach wilderness
  - Road travel between settlements
  - By danger level (easy, medium, hard)
  - d20 or d100 tables
  
- **Weather Tables** (1 page)
  - By season
  - Frontier weather effects
  - Mechanical impacts
  
- **NPC Name Generator** (1 page)
  - Names by culture/region
  - d100 first names
  - d100 last names
  
- **Contract Ideas** (2 pages)
  - 50 quick contract hooks
  - By type (combat, investigation, social)
  - Scalable by level
  
- **Waystone Inn Events** (1 page)
  - Things happening when players return
  - NPC interactions
  - Guild notices
  
- **Complication Generator** (1 page)
  - Things that go wrong
  - Plot twists
  - Unexpected developments

**Formatting**:
- Use Homebrewery markdown syntax
- 7-8 pages total
- All tables d20 or d100
- Use consistent table format

**Success Criteria**:
- [ ] File created with all required sections
- [ ] All tables complete and rollable
- [ ] Encounters appropriate for levels 1-5
- [ ] 50+ contract ideas included
- [ ] Tables immediately usable at table
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 3 hours

**Labels**: content-creation, dm-guide, phase-4, priority-3, random-tables, reference

**Dependencies**: Should align with existing campaign content

---

### Issue #4.3: Create Troubleshooting Guide

**Title**: Create Troubleshooting_Guide.md - Solutions for common campaign problems

**Description**:
Create a guide that addresses common problems DMs face running this campaign and provides practical solutions.

**Location**: `Season 1/DM_Resources/Troubleshooting_Guide.md`

**Content Requirements**:
- **Campaign Structure Issues** (2 pages)
  - "Players don't engage with the guild"
  - "Players want to leave Northreach"
  - "Players ignore all contracts"
  - "Variable attendance is causing problems"
  - "New player joining mid-campaign"
  
- **Mystery and Story Issues** (2 pages)
  - "Players ignore the Echo mystery"
  - "Players solved the mystery too early"
  - "Elric is giving away too much"
  - "Adventures feel disconnected"
  
- **Encounter and Pacing Issues** (2 pages)
  - "Encounters are too easy/hard"
  - "Sessions drag or rush"
  - "Players always choose combat"
  - "Players avoid all combat"
  
- **NPC and Roleplay Issues** (1 page)
  - "Players kill important NPCs"
  - "Can't differentiate NPC voices"
  - "Players distrust the Triad"
  
- **Player Behavior Issues** (1 page)
  - "Party splits constantly"
  - "One player dominates"
  - "Players argue about contracts"
  - "Analysis paralysis on choices"

**Formatting**:
- Use Homebrewery markdown syntax
- 7-8 pages total
- Use Q&A format (Problem → Solution)
- Use `{{note}}` blocks for additional tips

**Success Criteria**:
- [ ] File created with all required sections
- [ ] 20+ common problems addressed
- [ ] Solutions practical and actionable
- [ ] Organized by problem category
- [ ] Tone supportive and helpful
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, dm-guide, phase-4, priority-3, troubleshooting, support

**Dependencies**: Should reference Campaign Arc and all adventures

---

### Issue #4.4: Create Northreach Secrets Overview

**Title**: Create Northreach_Secrets_Overview.md - How Northreach secrets connect to Season 1

**Description**:
Create an overview document that explains how the Northreach-specific secrets connect to Season 1 adventures and when to reveal them.

**Location**: `World Building/DMEyesOnly/Northreach_Secrets_Overview.md`

**Content Requirements**:
- **Secrets by Adventure** (2 pages)
  - Which secrets are relevant to which adventure
  - When to reveal each secret
  - How secrets interconnect
  
- **The Aeorian Echo Connection** (1 page)
  - How Echo secrets tie into adventures
  - Revelation pacing
  - Player discovery moments
  
- **People Secrets Relevance** (1 page)
  - Which NPC secrets matter for Season 1
  - When they become relevant
  - How to incorporate them
  
- **Places Secrets Relevance** (1 page)
  - Which location secrets affect Season 1
  - Exploration opportunities
  - Future campaign hooks

**Formatting**:
- Use Homebrewery markdown syntax
- 4-5 pages total
- Use tables for secrets-by-adventure
- Cross-reference existing secret files

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Clear adventure connections established
- [ ] Revelation timing guidance provided
- [ ] Cross-references to other secret files
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-4, priority-3, world-secrets, northreach

**Dependencies**: References existing secret files

---

### Issue #4.5: Create World Secrets Overview

**Title**: Create World_Secrets_Overview.md - How wider world secrets connect to future campaigns

**Description**:
Create an overview document that explains the wider world secrets and how they can be used in future campaigns beyond Season 1.

**Location**: `World Building/DMEyesOnly/World_Secrets_Overview.md`

**Content Requirements**:
- **Regions Beyond Northreach** (2 pages)
  - Brief overview of each region's secrets
  - How they connect to Aevoria lore
  - Future campaign potential
  
- **Season 2+ Hooks** (2 pages)
  - Adventure seeds from each region
  - How to expand beyond Northreach
  - Thematic connections to Season 1
  
- **Long-Term Campaign Arcs** (1 page)
  - Multi-season story possibilities
  - How regions interconnect
  - Escalating threats and mysteries
  
- **Using These Secrets** (1 page)
  - When to introduce wider world
  - Foreshadowing techniques
  - Keeping focus on Northreach (Season 1)

**Formatting**:
- Use Homebrewery markdown syntax
- 5-6 pages total
- Use tables for region overview
- Forward-looking tone

**Success Criteria**:
- [ ] File created with all required sections
- [ ] All world secret regions covered
- [ ] Future campaign hooks compelling
- [ ] Guidance for DMs planning ahead
- [ ] Cross-references to other secret files
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, dm-guide, phase-4, priority-3, world-secrets, future-campaigns

**Dependencies**: References existing world secret files

---

### Issue #4.6: Final TOC Update and Polish

**Title**: Final update to dms-guide-toc.json with all new content integrated

**Description**:
Make final updates to the DM's Guide table of contents to integrate all newly created content from Phases 2-4, ensuring optimal chapter organization and flow.

**Changes Required**:
1. Verify all new files are included in appropriate chapters
2. Ensure chapter order matches final design
3. Update "Getting Started" chapter with all Priority 1 quick-start files
4. Update "Campaign Framework" with mystery and sequencing guides
5. Update "Running the Game" with all session tools
6. Update "DM Reference" with all reference materials
7. Verify all DM_Notes files are integrated into Adventures chapter
8. Final page count optimization
9. Remove any remaining redundant content

**File to Edit**: `build/dms-guide-toc.json`

**Success Criteria**:
- [ ] All Phase 2-4 files included
- [ ] Chapter structure matches proposed design
- [ ] "Getting Started" chapter complete (Quick Start, At a Glance, First Session)
- [ ] All 6 adventures have DM_Notes files listed
- [ ] "Running the Game" has all session tools
- [ ] "DM Reference" has all reference materials
- [ ] JSON validates successfully
- [ ] PDF builds without errors
- [ ] Final page count under 200 pages
- [ ] Usability tested with a DM

**Estimate**: 2-3 hours

**Labels**: enhancement, dm-guide, phase-4, toc-structure, polish, final

**Priority**: High

**Dependencies**: 
- All Phase 2 content creation issues (#2.1 - #2.11)
- All Phase 3 content creation issues (#3.1 - #3.6)
- All Phase 4 content creation issues (#4.1 - #4.5)

---

## Summary Statistics

### By Phase:
- **Phase 1**: 1 issue (TOC reorganization)
- **Phase 2**: 11 issues (6 priority 1 guides + 5 adventure DM notes)
- **Phase 3**: 6 issues (priority 2 enhancements)
- **Phase 4**: 6 issues (priority 3 polish + final TOC)

**Total: 24 sub-issues**

### By Priority:
- **Critical** (Priority 1): 11 issues
- **Important** (Priority 2): 6 issues
- **Nice to Have** (Priority 3): 6 issues
- **Polish**: 1 issue (final TOC)

### Estimated Time:
- **Phase 1**: 1-2 hours
- **Phase 2**: 26-35 hours
- **Phase 3**: 14-18 hours
- **Phase 4**: 13-16 hours

**Total Estimated Time: 54-71 hours**

---

## Creating These Issues in GitHub

To create these issues in GitHub:

1. Navigate to the repository's Issues page
2. For each issue above, click "New Issue"
3. Copy the **Title** as the issue title
4. Copy the **Description** section as the issue body
5. Add the **Labels** specified
6. Set **Milestone** to "DM's Guide v2.0"
7. Link to parent issue in the description
8. Assign as appropriate

### Label Creation Required:

If these labels don't exist, create them first:
- `dm-guide`
- `phase-1`, `phase-2`, `phase-3`, `phase-4`
- `priority-1`, `priority-2`, `priority-3`
- `critical`, `very-important`, `important`
- `content-creation`
- `toc-structure`
- `quick-win`
- `getting-started`
- `session-guide`
- `mystery`
- `campaign-arc`
- `encounter-design`
- `scaling`
- `dm-notes`
- `adventures`
- `quick-reference`
- `campaign-structure`
- `leveling`
- `progression`
- `session-tools`
- `templates`
- `improvisation`
- `random-tables`
- `npcs`
- `roleplay`
- `factions`
- `tracking`
- `rewards`
- `treasure`
- `reference`
- `troubleshooting`
- `support`
- `world-secrets`
- `northreach`
- `future-campaigns`
- `polish`
- `final`

---

## Project Management Notes

### Parallel Work Opportunities:
- Phase 2 adventure DM_Notes issues (#2.6 - #2.11) can be done in parallel by different contributors
- Phase 3 enhancement issues can start before all Phase 2 complete (but after core guides)
- World secret overviews (Phase 4) can be done independently

### Critical Path:
1. Phase 1 TOC reorganization (#1.1) should complete first
2. DM Quick Start (#2.1), Campaign At a Glance (#2.2), First Session Guide (#2.3) are critical blockers
3. Mystery Revelation Guide (#2.4) and Encounter Scaling (#2.5) should complete early
4. Adventure DM_Notes can be added incrementally
5. Phase 3 and 4 can proceed once Phase 2 core guides are complete
6. Final TOC update (#4.6) must be last

### Testing/Validation:
- After Phase 1: Test TOC build and structure
- After Phase 2 core (issues #2.1-#2.5): Test with a new DM running Session 0/1
- After Phase 2 complete: Full usability test with DM running first adventure
- After Phase 4: Final comprehensive test and page count verification

---

**Document Version**: 1.0  
**Created**: 2026-02-06  
**Last Updated**: 2026-02-06