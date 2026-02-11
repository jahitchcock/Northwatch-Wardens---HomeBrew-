# DM's Guide v3 - GitHub Issues Structure

This document provides the complete structure for creating GitHub issues from the `dm-guide-v3.md` implementation plan. Each issue includes title, description, labels, dependencies, and acceptance criteria.

**Source Document**: `dm-guide-v3.md`  
**Total Tasks**: 42 individual tasks across 9 phases  
**Total Issues to Create**: 51 (9 phase parent issues + 42 task issues)

---

## How to Use This Document

### Creating Issues in GitHub

1. **Create Phase Parent Issues First** (Issues P1-P9)
   - These are the 9 phases that serve as organizational containers
   - Each phase issue should list all child tasks
   - Use labels: `phase-N`, `parent`, `documentation`

2. **Create Task Issues** (Issues 1.1-9.3)
   - Reference parent phase in description
   - Add blocker/dependency references
   - Use specific labels for work type

3. **Link Issues Properly**
   - Child issues should reference parent: "Part of #[phase-issue]"
   - Blocked issues should reference blockers: "Blocked by #[blocker-issue]"
   - Parent issues should list children in description

4. **Use GitHub Projects**
   - Create project board: "DM Guide v3 Implementation"
   - Add all issues to project
   - Create columns: Backlog, In Progress, Review, Complete
   - Track phase completion

---

## Issue Labels

Create these labels in your repository:

- `phase-1` through `phase-9` - Phase identification
- `parent` - Parent/container issues
- `child` - Child issues that depend on parents
- `blocker` - Must be completed before other work can proceed
- `parallel` - Can be done simultaneously with other tasks
- `documentation` - Documentation work
- `enhancement` - Feature/content additions
- `template` - Template creation work
- `visual-aid` - Visual/diagram work
- `polish` - Final refinement work
- `playtest` - Testing and feedback
- `quick-win` - High-impact, achievable tasks

---

## Phase Overview

| Phase | Name | Type | Task Count | Dependencies |
|-------|------|------|------------|--------------|
| P1 | Foundation & Structure | Sequential | 4 | None - START HERE |
| P2 | Adventure Standardization | Sequential + Parallel | 10 | Requires P1 |
| P3 | Mystery Tools & NPC Enhancement | Sequential + Parallel | 5 | Requires P1 |
| P4 | Navigation & Cross-Reference | Sequential | 3 | Requires P1, P2, P3 |
| P5 | Visual Aids & Reference | All Parallel | 4 | Can start after P1-P4 |
| P6 | Content Enhancement | All Parallel | 4 | Can start after P1-P4 |
| P7 | Lore-to-Playable Conversion | All Parallel | 3 | Can start after P1-P4 |
| P8 | Polish & Consistency | Sequential | 6 | Requires ALL previous |
| P9 | Playtesting & Iteration | Parallel then Sequential | 3 | Requires P8 |

---

## Critical Path

**Must Complete in Order:**
1. Phase 1 (Foundation) - BLOCKER for all others
2. Phase 2 (Adventures) & Phase 3 (Mystery) - Can run parallel after P1
3. Phase 4 (Navigation) - Requires P1, P2, P3
4. Phases 5-7 (Visual/Content/Lore) - Can run parallel after P1-P4
5. Phase 8 (Polish) - Requires ALL content complete
6. Phase 9 (Playtest) - Final validation

**Quick Wins** (High-Impact Tasks):
- Issue 1.1: Campaign Dashboard
- Issue 1.2: Adventure Index
- Issue 2.1: Master Adventure Template
- Issue 3.1: Master Clue Bank
- Issue 6.1: Complete Appendix

---

## Phase Issues (Parents)

### Issue P1: Phase 1 - Foundation & Structure

**Title**: [Phase 1] Foundation & Structure - Campaign Dashboard and Navigation

**Description**:
Establish core navigation and reference framework for the DM's Guide. This phase creates the foundational elements that all other work depends on.

**Goal**: A new DM can understand the campaign and navigate the guide efficiently.

**Child Tasks**:
- #1.1 Campaign Dashboard [BLOCKER]
- #1.2 Adventure Index Table [BLOCKER]
- #1.3 Master Table of Contents Update
- #1.4 Information Hierarchy Documentation

**Acceptance Criteria**:
- [ ] All 4 child tasks completed
- [ ] Campaign Dashboard provides clear onboarding
- [ ] Adventure Index enables 2-minute adventure selection
- [ ] ToC reflects new structure
- [ ] Navigation hierarchy documented

**Labels**: `phase-1`, `parent`, `blocker`, `documentation`, `foundation`

**Estimate**: 2-3 weeks

**Dependencies**: None - START HERE

---

### Issue P2: Phase 2 - Adventure Standardization

**Title**: [Phase 2] Adventure Standardization - Consistent Format for All Adventures

**Description**:
Create and apply a master adventure template to ensure all adventures follow consistent format, include mystery integration, and provide clear DM guidance.

**Goal**: Every adventure is easy to prep and run, with consistent structure.

**Child Tasks**:
- #2.1 Create Master Adventure Template [BLOCKER]
- #2.2.1 Standardize "Wolves of Welton"
- #2.2.2 Standardize "Frozen Sick"
- #2.2.3 Standardize "Temple of the Dragonknights"
- #2.2.4 Standardize "Wild Sheep Chase"
- #2.2.5 Standardize "Peril in Pinebrook"
- #2.2.6 Standardize Opening Adventures
- #2.3 Adventure Standardization Review

**Acceptance Criteria**:
- [ ] Master template created and approved
- [ ] All 6 major adventures reformatted
- [ ] Opening adventures reformatted
- [ ] Review completed and issues addressed
- [ ] All adventures follow identical structure
- [ ] Mystery ratings consistent

**Labels**: `phase-2`, `parent`, `template`, `documentation`, `enhancement`

**Estimate**: 3-4 weeks

**Dependencies**: Requires Phase 1 complete (especially #1.1, #1.2)

---

### Issue P3: Phase 3 - Mystery Tools & NPC Enhancement

**Title**: [Phase 3] Mystery Tools & NPC Enhancement - Clue Tracking and Character Cards

**Description**:
Build tools for managing the central mystery (Aeorian Echo) and create quick-reference cards for major NPCs.

**Goal**: DMs can track mystery revelation and roleplay NPCs consistently.

**Child Tasks**:
- #3.1 Build Master Clue Bank [PARENT]
- #3.2 Create Mystery Revelation Pacing Guide
- #3.3 Design NPC Quick Card Format [PARENT]
- #3.4 Create NPC Quick Cards for Core Cast
- #3.5 Create NPC Relationship Web Visual

**Acceptance Criteria**:
- [ ] All 5 child tasks completed
- [ ] Clue Bank tracks all mystery clues across adventures
- [ ] Pacing guide prevents premature/delayed reveals
- [ ] NPC Quick Cards created for 12+ major NPCs
- [ ] Relationship web shows NPC connections

**Labels**: `phase-3`, `parent`, `documentation`, `enhancement`, `mystery`

**Estimate**: 2-3 weeks

**Dependencies**: Requires Phase 1 complete

---

### Issue P4: Phase 4 - Navigation & Cross-Reference Fixes

**Title**: [Phase 4] Navigation & Cross-Reference Fixes - Eliminate Circular References

**Description**:
Audit and fix all cross-references in the guide to eliminate circular references, reduce multi-hop lookups, and add navigation aids.

**Goal**: Any information findable in under 2 minutes with no dead ends.

**Child Tasks**:
- #4.1 Audit Current Cross-References [BLOCKER]
- #4.2 Implement Cross-Reference Fixes
- #4.3 Add Navigation Aids

**Acceptance Criteria**:
- [ ] All 3 child tasks completed
- [ ] No circular references remain
- [ ] Multi-hop references reduced by 50%+
- [ ] Navigation breadcrumbs added throughout
- [ ] Back-to-top links on long pages

**Labels**: `phase-4`, `parent`, `documentation`, `navigation`, `polish`

**Estimate**: 2 weeks

**Dependencies**: Requires Phases 1, 2, and 3 complete

---

### Issue P5: Phase 5 - Visual Aids & Reference Materials

**Title**: [Phase 5] Visual Aids & Reference Materials - Maps, Diagrams, and Charts

**Description**:
Create visual reference materials to help DMs understand geography, adventure connections, and session preparation flow.

**Goal**: Visual learners have diagrams; all DMs have quick reference charts.

**Child Tasks** (ALL PARALLEL):
- #5.1 Create Northreach Region Map
- #5.2 Create Mystery Connection Diagram
- #5.3 Create Adventure Difficulty Progression Chart
- #5.4 Create Session Prep Flowchart

**Acceptance Criteria**:
- [ ] All 4 visual aids created
- [ ] All diagrams Homebrewery-compatible
- [ ] Maps show canonical geography only
- [ ] Charts aid in decision-making

**Labels**: `phase-5`, `parent`, `visual-aid`, `documentation`, `parallel`

**Estimate**: 2-3 weeks (all tasks can run simultaneously)

**Dependencies**: Can start after Phases 1-4 complete

---

### Issue P6: Phase 6 - Content Enhancement & Gap Filling

**Title**: [Phase 6] Content Enhancement & Gap Filling - Appendix, Downtime, Handouts

**Description**:
Fill content gaps with comprehensive appendix, downtime activities system, player handouts, and first-time DM guidance.

**Goal**: Cover all edge cases and provide resources for various play styles.

**Child Tasks** (ALL PARALLEL):
- #6.1 Build Complete Appendix (Chapter 7) [PARENT]
- #6.2 Add Downtime Activities System
- #6.3 Create Player Handout Document
- #6.4 Add "First-Time DM" Appendix

**Acceptance Criteria**:
- [ ] All 4 child tasks completed
- [ ] Appendix is comprehensive reference
- [ ] Downtime system supports variable attendance
- [ ] Player handout spoiler-free
- [ ] First-time DM guidance reassuring and practical

**Labels**: `phase-6`, `parent`, `enhancement`, `documentation`, `parallel`

**Estimate**: 2-3 weeks (all tasks can run simultaneously)

**Dependencies**: Can start after Phases 1-4 complete

---

### Issue P7: Phase 7 - Lore-to-Playable Conversion

**Title**: [Phase 7] Lore-to-Playable Conversion - Adventure Hooks, Manifestations, Consequences

**Description**:
Convert passive lore into active DM tools: adventure hooks for regions, Echo manifestation tables, and consequence tracking charts.

**Goal**: Every piece of lore has immediate table utility.

**Child Tasks** (ALL PARALLEL):
- #7.1 Add Adventure Hooks to Major Regions
- #7.2 Add Echo Manifestation Tables
- #7.3 Add Consequence Charts

**Acceptance Criteria**:
- [ ] All 3 child tasks completed
- [ ] Every major region has 3+ adventure hooks
- [ ] Echo manifestations support improvisation
- [ ] Consequence charts track player choices

**Labels**: `phase-7`, `parent`, `enhancement`, `documentation`, `parallel`

**Estimate**: 2 weeks (all tasks can run simultaneously)

**Dependencies**: Can start after Phases 1-4 complete

---

### Issue P8: Phase 8 - Polish & Consistency

**Title**: [Phase 8] Polish & Consistency - Final Refinements and Verification

**Description**:
Final polish pass: terminology consistency, beginner content placement, redundancy elimination, page numbering, Homebrewery verification, and complete readthrough.

**Goal**: Guide is polished, consistent, and ready for playtesting.

**Child Tasks** (SEQUENTIAL):
- #8.1 Terminology Consistency Pass
- #8.2 Beginner Content Placement Pass
- #8.3 Redundancy Elimination Pass
- #8.4 Page Number & Reference Update
- #8.5 Homebrewery Formatting Verification
- #8.6 Final Readthrough

**Acceptance Criteria**:
- [ ] All 6 child tasks completed in order
- [ ] All terms used consistently throughout
- [ ] Beginner content helpful but not obstructive
- [ ] No duplicate content remains
- [ ] All page references accurate
- [ ] Homebrewery renders without errors
- [ ] Complete guide reviewed cover-to-cover

**Labels**: `phase-8`, `parent`, `polish`, `documentation`

**Estimate**: 2-3 weeks

**Dependencies**: Requires ALL previous phases complete

---

### Issue P9: Phase 9 - Playtesting & Iteration

**Title**: [Phase 9] Playtesting & Iteration - Validation and Improvement

**Description**:
Conduct internal and external playtests, gather feedback, and implement improvements based on real-table use.

**Goal**: Guide validated by actual DMs running actual sessions.

**Child Tasks**:
- #9.1 Internal Playtest (parallel with #9.2)
- #9.2 External Playtest (parallel with #9.1)
- #9.3 Implement Playtest Improvements

**Acceptance Criteria**:
- [ ] Internal playtest conducted (2+ sessions)
- [ ] External playtest conducted (2+ DMs, 4+ sessions)
- [ ] Feedback collected and analyzed
- [ ] Critical issues resolved
- [ ] Guide validated by playtest DMs

**Labels**: `phase-9`, `parent`, `playtest`, `feedback`

**Estimate**: 4-6 weeks

**Dependencies**: Requires Phase 8 complete

---

## Phase 1 Task Issues

### Issue 1.1: Campaign Dashboard

**Title**: [Phase 1.1] Create Campaign Dashboard - DM Onboarding Tool

**Parent Issue**: #P1

**Type**: BLOCKER (other phases depend on this)

**Description**:
Create a 2-page "DM Campaign Dashboard" that serves as the primary onboarding tool for new DMs. Combines campaign overview, mystery summary, navigation guide, and escalation tracker.

**Input Files**:
- Current Chapter 1 (Welcome to Aevoria)
- Current Chapter 3 (Campaign Overview, lines 590-900)
- Chapter 6 (Aeorian Echo section, lines 9445-9598)

**Output**:
New section: "Campaign Dashboard" (insert after Welcome, before Quick Start)

**Page 1 - Campaign at a Glance**:
- 1-paragraph premise
- Information Flowchart ("How to Find What You Need")
- Central mystery overview (3-4 sentences)
- Starter adventure recommendations with mystery ratings

**Page 2 - DM Reference Card**:
- Key factions (1 sentence each)
- Escalation timeline (what changes at different campaign stages)
- Tone & themes
- Common pitfalls & solutions

**Acceptance Criteria**:
- [ ] A new DM can read these 2 pages and understand how to start
- [ ] Contains clear navigation to other chapters
- [ ] Mystery is explained without spoiling specifics
- [ ] Flowchart answers "where do I find X?" for common questions
- [ ] Formatted in Homebrewery-compatible markdown
- [ ] Total length exactly 2 pages

**AI Prompt Template**:
```
Read the following sections from A DM's Guide to Aevoria:
[paste relevant sections]

Create a 2-page Campaign Dashboard with:
1. One-paragraph campaign premise
2. Information flowchart (how to navigate the guide)
3. Mystery overview (no spoilers, just what it is)
4. Starter adventures with mystery rating stars
5. Key factions list
6. Escalation timeline
7. Common DM pitfalls

Format in Homebrewery-compatible markdown.
```

**Labels**: `phase-1`, `blocker`, `documentation`, `enhancement`, `quick-win`

**Estimate**: 6-8 hours

**Dependencies**: None - can start immediately

**Blocks**: #1.3, #2.1, #3.1 (other phases need this reference point)

---

### Issue 1.2: Adventure Index Table

**Title**: [Phase 1.2] Create Adventure Index Table - Sortable Adventure Reference

**Parent Issue**: #P1

**Type**: BLOCKER (other phases depend on this)

**Description**:
Create a sortable reference table for all adventures, enabling DMs to select appropriate content in under 2 minutes.

**Input Files**:
- All adventure modules in Chapter 5
- Current adventure summaries in Chapter 3 (lines 646-703)

**Output**:
New section: "Adventure Index" (add to Chapter 7 Appendix)

**Table Format**:
```markdown
| Adventure | Level | Sessions | Mystery★ | Type | Key NPCs | Echo Clue | Consequences |
|-----------|-------|----------|----------|------|----------|-----------|--------------|
| Wolves of Welton | 1-3 | 2-3 | ★★☆☆☆ | Investigation | Dornan, Werethekau | Intelligence awakening | Village saved/lost |
```

**Columns Required**:
- Adventure name (linked to full module)
- Level range
- Estimated sessions
- Mystery rating (★★★★★ scale)
- Type (Investigation, Combat, Social, Exploration)
- Key NPCs (3-4 names)
- Primary Echo clue revealed
- Major consequence branches

**Acceptance Criteria**:
- [ ] All current adventures included
- [ ] Mystery ratings accurate and consistent
- [ ] Consequence branches clear
- [ ] Table fits on 1-2 pages
- [ ] Links to full adventure modules work
- [ ] DMs can select adventure in under 2 minutes using this table

**Labels**: `phase-1`, `blocker`, `documentation`, `enhancement`, `quick-win`

**Estimate**: 4-6 hours

**Dependencies**: None - can start immediately

**Blocks**: #2.1, #2.2.1-2.2.6 (adventure standardization uses this as reference)

---

### Issue 1.3: Master Table of Contents Update

**Title**: [Phase 1.3] Update Master Table of Contents

**Parent Issue**: #P1

**Type**: CHILD (depends on #1.1, #1.2)

**Description**:
Update the master table of contents to reflect new Campaign Dashboard and Adventure Index sections, plus any other structural changes from Phase 1.

**Input Files**:
- Completed Campaign Dashboard (#1.1)
- Completed Adventure Index (#1.2)
- Current table of contents file

**Output**:
- Updated table of contents
- New sections properly ordered
- Page references accurate (preliminary, will be updated in Phase 8)

**Acceptance Criteria**:
- [ ] Campaign Dashboard listed after Welcome
- [ ] Adventure Index listed in Appendix
- [ ] All new sections have preliminary page numbers
- [ ] Chapter structure logical
- [ ] ToC reflects Phase 1 changes

**Labels**: `phase-1`, `child`, `documentation`

**Estimate**: 2 hours

**Dependencies**: 
- Blocked by #1.1 (needs Campaign Dashboard complete)
- Blocked by #1.2 (needs Adventure Index complete)

---

### Issue 1.4: Information Hierarchy Documentation

**Title**: [Phase 1.4] Document Information Hierarchy

**Parent Issue**: #P1

**Type**: PARALLEL (can be done alongside other Phase 1 tasks)

**Description**:
Create internal documentation explaining the guide's information hierarchy: what content goes where, how chapters relate, and navigation principles.

**Purpose**: 
Guide future content additions and maintain consistency throughout implementation.

**Output**:
Internal document: `DM_GUIDE_V3_INFORMATION_HIERARCHY.md`

**Content Required**:
- **Chapter Purpose Definitions**: What each chapter should contain
- **Content Placement Rules**: Where different types of information belong
- **Navigation Principles**: How cross-references should work
- **Priority Hierarchy**: Campaign Framework > Session Tools > Adventures > Secrets
- **Beginner vs Advanced Content**: When to introduce complex concepts
- **Reference vs Narrative**: Tables vs prose guidelines

**Acceptance Criteria**:
- [ ] Clear rules for placing new content
- [ ] Chapter purposes defined
- [ ] Navigation principles documented
- [ ] Examples provided for edge cases
- [ ] Will be used to guide Phase 4 work

**Labels**: `phase-1`, `parallel`, `documentation`, `internal`

**Estimate**: 3-4 hours

**Dependencies**: None - can start immediately

---

## Phase 2 Task Issues

### Issue 2.1: Create Master Adventure Template

**Title**: [Phase 2.1] Create Master Adventure Template

**Parent Issue**: #P2

**Type**: PARENT, BLOCKER (all 2.2.x tasks depend on this)

**Description**:
Create a standardized adventure template that will be applied to all adventures in the campaign. This template ensures consistent structure, clear mystery integration, and practical DM guidance.

**Input Files**:
- dm-guide-v3.md (lines 205-285) for template structure
- Current adventure modules to understand existing patterns
- Issue #1.2 Adventure Index for mystery ratings reference

**Output**:
New file: `Season 1/DM_Resources/ADVENTURE_TEMPLATE.md`

**Template Structure**:
```markdown
# [Adventure Name]

## Adventure Overview
- **Level Range**: X-Y
- **Duration**: N sessions
- **Mystery Rating**: ★★★★☆
- **Type**: Investigation/Combat/Social/Exploration
- **Tone**: [Serious/Light/Horror/etc.]

## Mystery Integration
**The Mystery Box**: What players should discover about the Aeorian Echo
- Primary Clue: [specific Echo-related discovery]
- Secondary Clues: [supporting evidence]
- Fail-Forward: How players get clues even if they fail checks

## Scene Breakdown
### Scene 1: [Name]
- **Objective**: What must happen
- **Key NPCs**: Who's involved
- **Clues Available**: What can be discovered
- **Scaling Notes**: 2 players vs 5 players adjustments

## Key NPCs (Quick Reference)
[Name cards for major NPCs in this adventure]

## Encounter Scaling
[Table showing how to adjust for 2/3/4/5 players]

## Rewards & Consequences
**Success Outcomes**: What happens if players succeed
**Failure Outcomes**: What happens if players fail/partially succeed
**Echo Impact**: How this adventure affects the spreading magic

## DM Preparation Checklist
- [ ] Read full adventure once
- [ ] Review NPC motivations
- [ ] Prepare encounter maps
- [ ] Note 3 possible player approaches
```

**Acceptance Criteria**:
- [ ] Template includes all required sections
- [ ] Mystery Box section clear and spoiler-free in summaries
- [ ] Scaling guidelines practical for variable party size
- [ ] Can be applied to existing adventures without total rewrite
- [ ] Approved by project lead before proceeding to 2.2.x tasks

**Labels**: `phase-2`, `parent`, `blocker`, `template`, `documentation`, `quick-win`

**Estimate**: 6-8 hours

**Dependencies**: 
- Requires #1.2 complete (Adventure Index provides mystery rating reference)

**Blocks**: #2.2.1, #2.2.2, #2.2.3, #2.2.4, #2.2.5, #2.2.6

---

### Issue 2.2.1: Standardize "Wolves of Welton"

**Title**: [Phase 2.2.1] Standardize "Wolves of Welton" Adventure

**Parent Issue**: #P2

**Type**: CHILD, PARALLEL (can be done with other 2.2.x tasks)

**Description**:
Apply the Master Adventure Template to "Wolves of Welton", the campaign's first major investigation adventure.

**Input Files**:
- Master Adventure Template (#2.1)
- Current Wolves of Welton content (lines 2596-3500 in current guide)
- Chapter 6 Welton secrets

**Output**:
- Reformatted Wolves of Welton adventure following template
- Mystery Box with clue tracking
- Updated scaling guidelines
- Visual connection to other adventures noted

**Mystery Focus**:
This adventure reveals intelligence awakening in wolves as an early Echo symptom. Mystery rating: ★★☆☆☆

**Acceptance Criteria**:
- [ ] Follows template exactly
- [ ] Mystery clues explicitly called out in Mystery Box
- [ ] Scaling for 2-5 players specified in table format
- [ ] Consequences section covers all major player choices
- [ ] Integrates with Adventure Index entry
- [ ] Dornan and Werethekau have Quick Reference cards

**Labels**: `phase-2`, `child`, `parallel`, `adventure`, `documentation`

**Estimate**: 4-6 hours

**Dependencies**: 
- Blocked by #2.1 (requires template)

---

### Issue 2.2.2: Standardize "Frozen Sick"

**Title**: [Phase 2.2.2] Standardize "Frozen Sick" Adventure

**Parent Issue**: #P2

**Type**: CHILD, PARALLEL

**Description**:
Apply the Master Adventure Template to "Frozen Sick", the campaign's primary Echo revelation adventure.

**Input Files**:
- Master Adventure Template (#2.1)
- Current Frozen Sick content
- Chapter 6 Salsvault secrets

**Output**:
- Reformatted Frozen Sick adventure following template

**Mystery Focus**:
This is THE major Echo revelation adventure - Aeorian spores from Salsvault. Mystery rating: ★★★★★

**Acceptance Criteria**:
- [ ] Follows template exactly
- [ ] Emphasizes this as THE major Echo revelation adventure
- [ ] ★★★★★ mystery rating justified in Mystery Box
- [ ] Salsvault connection clear
- [ ] Can still be run in any order without breaking mystery

**Labels**: `phase-2`, `child`, `parallel`, `adventure`, `documentation`

**Estimate**: 6-8 hours (most complex adventure)

**Dependencies**: 
- Blocked by #2.1 (requires template)

---

### Issue 2.2.3: Standardize "Temple of the Dragonknights"

**Title**: [Phase 2.2.3] Standardize "Temple of the Dragonknights" Adventure

**Parent Issue**: #P2

**Type**: CHILD, PARALLEL

**Description**:
Apply the Master Adventure Template to "Temple of the Dragonknights", the campaign's capstone adventure.

**Input Files**:
- Master Adventure Template (#2.1)
- Current Temple content
- Chapter 6 Temple secrets

**Output**:
- Reformatted Temple adventure following template

**Mystery Focus**:
Shows factions exploiting rising magic for power. Mystery rating: ★★★★☆

**Acceptance Criteria**:
- [ ] Follows template exactly
- [ ] Multiple resolution paths clearly outlined (destruction/negotiation/exposure)
- [ ] Consequences section covers all three major approaches
- [ ] Cult motivations clear
- [ ] Capstone nature emphasized

**Labels**: `phase-2`, `child`, `parallel`, `adventure`, `documentation`

**Estimate**: 6-8 hours (complex multi-path adventure)

**Dependencies**: 
- Blocked by #2.1 (requires template)

---

### Issue 2.2.4: Standardize "Wild Sheep Chase"

**Title**: [Phase 2.2.4] Standardize "Wild Sheep Chase" Adventure

**Parent Issue**: #P2

**Type**: CHILD, PARALLEL

**Description**:
Apply the Master Adventure Template to "Wild Sheep Chase", the campaign's comic relief one-shot.

**Input Files**:
- Master Adventure Template (#2.1)
- Current Wild Sheep Chase content
- Chapter 6 Shinebright secrets

**Output**:
- Reformatted Wild Sheep Chase following template

**Mystery Focus**:
Magic destabilization causing wild transformations. Mystery rating: ★★☆☆☆

**Acceptance Criteria**:
- [ ] Follows template exactly
- [ ] Tone section notes this is comic relief
- [ ] Mystery connection to magic instability clear but not heavy-handed
- [ ] Works as palate cleanser between serious adventures

**Labels**: `phase-2`, `child`, `parallel`, `adventure`, `documentation`

**Estimate**: 3-4 hours (simpler adventure)

**Dependencies**: 
- Blocked by #2.1 (requires template)

---

### Issue 2.2.5: Standardize "Peril in Pinebrook"

**Title**: [Phase 2.2.5] Standardize "Peril in Pinebrook" Adventure

**Parent Issue**: #P2

**Type**: CHILD, PARALLEL

**Description**:
Apply the Master Adventure Template to "Peril in Pinebrook", a frontier investigation side quest.

**Input Files**:
- Master Adventure Template (#2.1)
- Current Peril in Pinebrook content
- Chapter 6 Pinebrook secrets

**Output**:
- Reformatted Peril in Pinebrook following template

**Mystery Focus**:
Shows frontier vulnerability to Echo effects. Mystery rating: ★★☆☆☆

**Acceptance Criteria**:
- [ ] Follows template exactly
- [ ] Side quest nature clear in Overview
- [ ] Lower mystery rating (★★☆☆☆) justified
- [ ] Serves as example of wider Echo impact

**Labels**: `phase-2`, `child`, `parallel`, `adventure`, `documentation`

**Estimate**: 3-4 hours

**Dependencies**: 
- Blocked by #2.1 (requires template)

---

### Issue 2.2.6: Standardize Opening Adventures

**Title**: [Phase 2.2.6] Standardize Opening Adventures

**Parent Issue**: #P2

**Type**: CHILD, PARALLEL

**Description**:
Apply the Master Adventure Template to the campaign opening encounters: "Wolves at Waystone", "Morning After", and "Wolves Contract".

**Input Files**:
- Master Adventure Template (#2.1)
- Current opening encounters (lines 706-725 in guide)

**Output**:
- Reformatted opening adventures following template
- Each opening clearly connected to first full adventure

**Acceptance Criteria**:
- [ ] Each opening (Wolves at Waystone, Morning After, Wolves Contract) follows template
- [ ] Connected to Wolves of Welton adventure clearly
- [ ] Can transition smoothly to campaign proper
- [ ] Guild introduction handled well

**Labels**: `phase-2`, `child`, `parallel`, `adventure`, `documentation`

**Estimate**: 4-5 hours (3 short adventures)

**Dependencies**: 
- Blocked by #2.1 (requires template)

---

### Issue 2.3: Adventure Standardization Review

**Title**: [Phase 2.3] Review Adventure Standardization

**Parent Issue**: #P2

**Type**: CHILD (depends on all 2.2.x tasks)

**Description**:
Review all standardized adventures to ensure consistency, catch errors, and verify template application.

**Input Files**:
- All completed 2.2.x adventure standardizations
- Master Adventure Template (#2.1)
- Adventure Index (#1.2)

**Review Checklist**:
- [ ] All adventures follow template structure exactly
- [ ] Mystery ratings consistent across adventures
- [ ] Scaling tables use same format
- [ ] NPC Quick Cards consistent style
- [ ] Consequence sections complete
- [ ] Cross-references between adventures accurate
- [ ] No contradictions in lore/timeline
- [ ] Mystery Box sections spoiler-appropriate

**Output**:
- Issue report for any inconsistencies found
- Approval to proceed to Phase 3
- Updated Adventure Index if needed

**Acceptance Criteria**:
- [ ] All 6+ adventures reviewed
- [ ] Consistency issues documented and assigned
- [ ] Template application quality verified
- [ ] Phase 2 marked complete

**Labels**: `phase-2`, `child`, `review`, `documentation`

**Estimate**: 4-6 hours

**Dependencies**: 
- Blocked by #2.2.1, #2.2.2, #2.2.3, #2.2.4, #2.2.5, #2.2.6 (all adventures must be standardized first)

---

## Phase 3 Task Issues

### Issue 3.1: Build Master Clue Bank

**Title**: [Phase 3.1] Build Master Clue Bank - Aeorian Echo Clue Tracking

**Parent Issue**: #P3

**Type**: PARENT, QUICK-WIN

**Description**:
Create a comprehensive clue bank that tracks all Aeorian Echo clues across all adventures, organized by campaign tier and revelation stage.

**Input Files**:
- All standardized adventures from Phase 2
- Chapter 6 (Aeorian Echo section, lines 9445-9598)
- Adventure Index (#1.2)

**Output**:
New section in guide: "Master Clue Bank"

**Structure Required**:
```markdown
## Master Clue Bank

### Tier 1: Early Campaign (Strange Symptoms)
**Adventures**: Wolves of Welton, Wild Sheep Chase, Peril in Pinebrook

**Clues Available**:
- Animals displaying unusual intelligence
- Magic behaving unpredictably
- Localized strange occurrences
- No clear pattern yet

### Tier 2: Mid Campaign (The Source)
**Adventures**: Frozen Sick

**Clues Available**:
- Aeorian ruins connection
- Spores and contamination
- Ancient magic leaking
- Salsvault as ground zero

### Tier 3: Late Campaign (The Threat)
**Adventures**: Temple of the Dragonknights

**Clues Available**:
- Factions exploiting power
- Escalating manifestations
- Region-wide impact
- Stakes of inaction

## Reveal Ladder
[Progression of understanding from Tier 1 → Tier 3]

## Fail-Forward Policy
How to ensure players get clues even with failed rolls
```

**Acceptance Criteria**:
- [ ] All adventures mapped to tiers
- [ ] All major clues catalogued
- [ ] Fail-forward guidelines for each clue
- [ ] Works regardless of adventure order
- [ ] Prevents premature revelation
- [ ] Prevents mystery stalling

**Labels**: `phase-3`, `parent`, `mystery`, `documentation`, `enhancement`, `quick-win`

**Estimate**: 6-8 hours

**Dependencies**: 
- Requires Phase 2 complete (needs standardized adventures)

**Blocks**: #3.2 (pacing guide needs clue bank)

---

### Issue 3.2: Create Mystery Revelation Pacing Guide

**Title**: [Phase 3.2] Create Mystery Revelation Pacing Guide

**Parent Issue**: #P3

**Type**: CHILD (depends on #3.1)

**Description**:
Create a pacing guide that helps DMs reveal the Aeorian Echo mystery at an appropriate rate, preventing both premature revelation and frustrating delays.

**Input Files**:
- Master Clue Bank (#3.1)
- Standardized adventures
- Campaign arc documentation

**Output**:
New section: "Mystery Pacing Guide"

**Structure Required**:
```markdown
## Mystery Pacing Guide

### Sessions 1-5: Strange Symptoms
**What Players Know**: Something weird is happening
**Clues Revealed**: Local oddities, individual events
**DM Goal**: Build curiosity without answers
**Pacing Tip**: Don't explain yet - just show

### Sessions 6-10: The Source
**What Players Know**: Ancient magic is involved
**Clues Revealed**: Aeorian connection, Salsvault
**DM Goal**: Provide "aha!" moment of understanding
**Pacing Tip**: This is the reveal tier

### Sessions 11-15: The Threat
**What Players Know**: The full scope and danger
**Clues Revealed**: Escalation, stakes, factions
**DM Goal**: Build urgency for climax
**Pacing Tip**: Show consequences of inaction

### Session 16+: The Choice
**What Players Know**: Everything
**Clues Revealed**: Final pieces, player agency
**DM Goal**: Let players shape resolution
**Pacing Tip**: Their choices matter most

## Sample Revelation Timeline
[Example session-by-session progression]

## Adjusting for Your Table
- **Fast Progression**: Players solve quickly (15 sessions)
- **Standard**: Average pace (20-25 sessions)
- **Slow Burn**: Deep investigation (30+ sessions)
```

**Acceptance Criteria**:
- [ ] Clear guidance for each campaign stage
- [ ] Adjustable for different table paces
- [ ] Sample timeline provided
- [ ] DM can gauge if revealing too fast/slow
- [ ] Works with any adventure order

**Labels**: `phase-3`, `child`, `mystery`, `documentation`, `enhancement`

**Estimate**: 4-6 hours

**Dependencies**: 
- Blocked by #3.1 (needs Master Clue Bank)

---

### Issue 3.3: Design NPC Quick Card Format

**Title**: [Phase 3.3] Design NPC Quick Card Format

**Parent Issue**: #P3

**Type**: PARENT (blocks #3.4)

**Description**:
Create a standardized NPC Quick Card format that provides DMs with everything needed to roleplay an NPC: personality, voice, goals, secrets, and connections.

**Input Files**:
- Current NPC descriptions from various chapters
- dm-guide-v3.md NPC card format (lines 582-635)

**Output**:
Template file: `Season 1/DM_Resources/NPC_QUICK_CARD_TEMPLATE.md`

**Format Required**:
```markdown
## [NPC Name]
**Role**: [Guild Leader / Merchant / Antagonist]
**First Impression**: [One-sentence visual/personality hook]

### Roleplaying
**Voice/Mannerisms**: [How they talk, distinctive traits]
**Personality**: [3-4 adjectives]
**Values**: What they care about most
**Fears**: What they avoid/dread

### Practical Info
**Where Found**: [Usual locations]
**Function**: What they do for the story
**Can Provide**: Information/resources they offer
**Wants from PCs**: What they need from players

### Secrets & Connections
**Hidden Motivation**: [Spoiler territory]
**Relationships**: Connections to other NPCs
**Adventure Appearances**: Which modules feature them

### At The Table
**Quick Improv**: 3 phrases they'd say
**Body Language**: How to physically portray them
**If Players Ask About**: Key topics and responses
```

**Acceptance Criteria**:
- [ ] Format fits on 1 page per NPC
- [ ] Quick-reference friendly
- [ ] Includes roleplay guidance
- [ ] Separates spoilers from safe info
- [ ] Easy to scan during session
- [ ] Approved before creating cards in #3.4

**Labels**: `phase-3`, `parent`, `template`, `documentation`, `npc`

**Estimate**: 4 hours

**Dependencies**: None - can start immediately after Phase 1

**Blocks**: #3.4 (NPC card creation needs this format)

---

### Issue 3.4: Create NPC Quick Cards for Core Cast

**Title**: [Phase 3.4] Create NPC Quick Cards for Core Cast

**Parent Issue**: #P3

**Type**: CHILD, PARALLEL (can create multiple cards simultaneously)

**Description**:
Create NPC Quick Cards for all major NPCs using the standardized format from #3.3.

**Input Files**:
- NPC Quick Card Template (#3.3)
- Current NPC descriptions across all chapters
- Guild roster
- Adventure modules

**NPCs Requiring Cards** (minimum 12):
1. **Guild Leadership**: Marshal Brenna Thorne, Steward Mara Fenwick, Lorewarden Elric Vael
2. **Welton**: Dornan, Werethekau (the awakened wolf)
3. **Pinebrook**: Key NPCs from that adventure
4. **Palebank**: Urgon Wenth, key Frozen Sick NPCs
5. **Temple**: Cult leaders
6. **Waystone Inn**: Innkeeper, recurring staff
7. **Antagonists**: Major recurring villains

**Output**:
- Individual NPC Quick Card files in `Season 1/DM_Resources/NPC_Quick_Cards/`
- OR: Single compiled file with all cards
- Cross-referenced in relevant adventure modules

**Acceptance Criteria**:
- [ ] Minimum 12 major NPCs have cards
- [ ] All cards follow template exactly
- [ ] Consistent quality and detail level
- [ ] Roleplay guidance practical and specific
- [ ] Secrets clearly marked
- [ ] Referenced in Adventure Index where relevant

**Labels**: `phase-3`, `child`, `parallel`, `documentation`, `npc`, `enhancement`

**Estimate**: 10-15 hours (12+ cards at ~1 hour each)

**Dependencies**: 
- Blocked by #3.3 (needs template)
- Benefits from Phase 2 complete (standardized adventures provide NPC context)

---

### Issue 3.5: Create NPC Relationship Web Visual

**Title**: [Phase 3.5] Create NPC Relationship Web Visual

**Parent Issue**: #P3

**Type**: PARALLEL (can be done alongside #3.4)

**Description**:
Create a visual diagram showing relationships between major NPCs: allies, rivals, secrets, and faction connections.

**Input Files**:
- NPC Quick Cards (#3.4)
- Guild roster
- Adventure modules
- dm-guide-v3.md relationship web structure (lines 683-740)

**Output**:
Visual diagram: "NPC Relationship Web"

**Structure Required**:
```
## NPC Relationship Web

### Guild Core
[Triad NPCs and their internal relationships]

### Mystery Holders vs Seekers
[NPCs who know about the Echo vs those investigating]

### Compromised Agents
[NPCs influenced by Echo/factions]

### Faction Connections
[External faction relationships]

### Lines Show**:
- Solid: Open alliance/friendship
- Dashed: Secret connection
- Red: Rivalry/opposition
- Blue: Information flow
- Green: Family/close bond
```

**Visual Format Options**:
- Homebrewery-compatible ASCII art
- Markdown table/matrix
- Simple text diagram
- Reference to external tool (e.g., "Use Miro/Mural to create")

**Acceptance Criteria**:
- [ ] All major NPCs included
- [ ] Relationships clearly shown
- [ ] Spoiler-level connections marked
- [ ] Easy to reference during session
- [ ] Homebrewery-compatible format
- [ ] Helps DMs improvise NPC interactions

**Labels**: `phase-3`, `parallel`, `visual-aid`, `documentation`, `npc`

**Estimate**: 4-6 hours

**Dependencies**: 
- Best started after #3.4 (NPC Quick Cards provide full relationship details)
- Can proceed in parallel if working from existing NPC docs

---

## Phase 4 Task Issues

### Issue 4.1: Audit Current Cross-References

**Title**: [Phase 4.1] Audit Current Cross-References

**Parent Issue**: #P4
**Type**: PARENT, BLOCKER

**Description**:
Audit all cross-references in the guide to identify circular references, multi-hop lookups, redundant content, and broken links.

**Input**: Entire guide content from Phases 1-3
**Output**: Audit report documenting all cross-reference issues

**Acceptance Criteria**:
- [ ] All chapters audited
- [ ] Circular references catalogued
- [ ] Multi-hop references (>2 jumps) identified
- [ ] Redundant content locations noted
- [ ] Recommendations for fixes provided
- [ ] Priority assigned to each issue

**Labels**: `phase-4`, `parent`, `blocker`, `audit`, `navigation`
**Estimate**: 6-8 hours
**Dependencies**: Requires Phases 1, 2, 3 complete
**Blocks**: #4.2

---

### Issue 4.2: Implement Cross-Reference Fixes

**Title**: [Phase 4.2] Implement Cross-Reference Fixes

**Parent Issue**: #P4
**Type**: CHILD

**Description**:
Fix all cross-reference issues identified in audit: eliminate circular references, reduce multi-hop lookups, consolidate redundant content.

**Input**: Audit report from #4.1
**Output**: Updated guide with corrected cross-references

**Acceptance Criteria**:
- [ ] Zero circular references remain
- [ ] Multi-hop references reduced by 50%+
- [ ] Redundant content consolidated
- [ ] All internal links verified working
- [ ] Cross-reference pattern documented for future additions

**Labels**: `phase-4`, `child`, `documentation`, `navigation`
**Estimate**: 8-12 hours
**Dependencies**: Blocked by #4.1
**Blocks**: #4.3

---

### Issue 4.3: Add Navigation Aids

**Title**: [Phase 4.3] Add Navigation Aids Throughout Guide

**Parent Issue**: #P4
**Type**: CHILD

**Description**:
Add navigation aids: breadcrumb trails, back-to-top links, chapter cross-links, "see also" sections, and quick-jump navigation.

**Navigation Elements**:
- Breadcrumb trails at chapter starts
- Back-to-top links on long pages
- "See Also" boxes for related content
- Quick-jump table of contents on long chapters
- Chapter cross-reference links in footers

**Acceptance Criteria**:
- [ ] Breadcrumbs added to all chapters
- [ ] Back-to-top links on pages > 2 pages
- [ ] "See Also" boxes for key content
- [ ] Quick-jump ToC on chapters > 10 pages
- [ ] Navigation consistent throughout

**Labels**: `phase-4`, `child`, `documentation`, `navigation`, `enhancement`
**Estimate**: 6-8 hours
**Dependencies**: Blocked by #4.2

---

## Phase 5 Task Issues (ALL PARALLEL)

### Issue 5.1: Create Northreach Region Map

**Title**: [Phase 5.1] Create Northreach Region Map

**Parent Issue**: #P5
**Type**: PARALLEL

**Description**:
Create a visual map of the Northreach region showing all canonical locations used in the campaign.

**Locations to Include**:
- Waystone Inn (center)
- Welton, Pinebrook, Palebank Village
- Salsvault, Temple of the Dragonknights
- Westly's Farm, Croaker Cave, Noke's Tower
- Major geographical features

**Acceptance Criteria**:
- [ ] All canonical locations shown
- [ ] Distances/relationships clear
- [ ] Homebrewery-compatible format
- [ ] No locations invented without approval
- [ ] Scale and compass included

**Labels**: `phase-5`, `parallel`, `visual-aid`, `map`
**Estimate**: 6-8 hours
**Dependencies**: Can start after Phase 1-4 complete

---

### Issue 5.2: Create Mystery Connection Diagram

**Title**: [Phase 5.2] Create Mystery Connection Diagram

**Parent Issue**: #P5
**Type**: PARALLEL

**Description**:
Create visual diagram showing how adventures connect to the Aeorian Echo mystery and to each other.

**Structure**:
- Central node: Aeorian Echo
- Adventure nodes: Each adventure
- Connection lines: What clues each provides
- Tier groupings: Early/Mid/Late campaign
- Optional paths shown

**Acceptance Criteria**:
- [ ] All adventures connected to mystery
- [ ] Clue flow visible
- [ ] Order-independence apparent
- [ ] Mystery progression clear
- [ ] Homebrewery-compatible

**Labels**: `phase-5`, `parallel`, `visual-aid`, `mystery`
**Estimate**: 4-6 hours
**Dependencies**: Requires Phase 3 complete (needs Clue Bank)

---

### Issue 5.3: Create Adventure Difficulty Progression Chart

**Title**: [Phase 5.3] Create Adventure Difficulty Progression Chart

**Parent Issue**: #P5
**Type**: PARALLEL

**Description**:
Create chart showing recommended adventure progression paths based on player experience and preferences.

**Paths to Show**:
- Linear Path (recommended for new tables)
- Flexible Path (experienced tables)
- Mystery-Focused Path (investigation-heavy)
- Combat-Focused Path (action-oriented)

**Acceptance Criteria**:
- [ ] Multiple valid paths shown
- [ ] Level ranges indicated
- [ ] Mystery revelation balanced in all paths
- [ ] New DM guidance included
- [ ] Fits on 1-2 pages

**Labels**: `phase-5`, `parallel`, `visual-aid`, `reference`
**Estimate**: 4-5 hours
**Dependencies**: Requires Phase 2 complete

---

### Issue 5.4: Create Session Prep Flowchart

**Title**: [Phase 5.4] Create Session Prep Flowchart

**Parent Issue**: #P5
**Type**: PARALLEL

**Description**:
Create flowchart guiding DMs through session prep: what to read, what to prepare, how to adapt on the fly.

**Flowchart Sections**:
1. Pre-Campaign Prep (one-time)
2. Before Each Session (recurring)
3. At The Table (during play)
4. After Session (notes/follow-up)

**Acceptance Criteria**:
- [ ] Clear decision points
- [ ] Time estimates for each step
- [ ] Beginner-friendly
- [ ] Covers variable attendance scenarios
- [ ] Homebrewery-compatible format

**Labels**: `phase-5`, `parallel`, `visual-aid`, `reference`, `session-prep`
**Estimate**: 5-6 hours
**Dependencies**: Can start after Phase 1-4 complete

---

## Phase 6 Task Issues (ALL PARALLEL)

### Issue 6.1: Build Complete Appendix (Chapter 7)

**Title**: [Phase 6.1] Build Complete Appendix (Chapter 7)

**Parent Issue**: #P6
**Type**: PARENT, QUICK-WIN

**Description**:
Create comprehensive appendix with quick-reference materials: NPC index, location index, item list, spell modifications, condition references, etc.

**Appendix Sections**:
- NPC Index (alphabetical with page refs)
- Location Index
- Item Compendium
- Spell Modifications
- Condition Quick Reference
- Random Tables (encounters, names, hooks)
- Blank Forms (session tracker, character sheet)
- Glossary of Terms

**Acceptance Criteria**:
- [ ] All sections complete
- [ ] Page references accurate (preliminary)
- [ ] Quick-reference friendly format
- [ ] Tables easy to use at table
- [ ] Fits within reasonable page count (10-15 pages)

**Labels**: `phase-6`, `parent`, `appendix`, `reference`, `quick-win`
**Estimate**: 10-12 hours
**Dependencies**: Requires Phases 1-4 complete

---

### Issue 6.2: Add Downtime Activities System

**Title**: [Phase 6.2] Add Downtime Activities System

**Parent Issue**: #P6
**Type**: PARALLEL

**Description**:
Create downtime activities system that supports variable attendance and provides meaningful character development between missions.

**System Requirements**:
- Activities players can do between sessions
- Supports absent players (catch-up mechanics)
- Guild-themed activities
- Mystery investigation options
- Character development opportunities
- Simple resolution mechanics

**Acceptance Criteria**:
- [ ] 8-10 downtime activities defined
- [ ] Clear mechanics for each
- [ ] Supports variable attendance
- [ ] Guild integration logical
- [ ] Can advance mystery investigation
- [ ] Quick to resolve (5-10 min per player)

**Labels**: `phase-6`, `parallel`, `enhancement`, `mechanics`, `guild`
**Estimate**: 6-8 hours
**Dependencies**: Can start after Phase 1-4 complete

---

### Issue 6.3: Create Player Handout Document

**Title**: [Phase 6.3] Create Player Handout Document

**Parent Issue**: #P6
**Type**: PARALLEL

**Description**:
Create player-facing handout with campaign info, guild rules, Northreach overview, and session expectations - all spoiler-free.

**Content Required**:
- Campaign premise (no mystery spoilers)
- Guild charter and rules
- Northreach region overview
- Session structure and expectations
- Character creation guidance
- Table etiquette
- What players should/shouldn't know

**Acceptance Criteria**:
- [ ] Completely spoiler-free
- [ ] Sets appropriate expectations
- [ ] Guild information clear
- [ ] Character creation guidance helpful
- [ ] Can be shared in Session 0
- [ ] 4-6 pages total

**Labels**: `phase-6`, `parallel`, `player-facing`, `documentation`, `handout`
**Estimate**: 6-8 hours
**Dependencies**: Can start after Phase 1 complete

---

### Issue 6.4: Add "First-Time DM" Appendix

**Title**: [Phase 6.4] Add "First-Time DM" Appendix

**Parent Issue**: #P6
**Type**: PARALLEL

**Description**:
Create appendix specifically for first-time DMs: reassurance, common pitfalls, improvisation tips, when to use rules vs. rulings.

**Content Required**:
- "It's okay to make mistakes"
- Common new DM pitfalls
- Improvisation techniques
- Using NPCs as guides
- Rules vs. Rulings philosophy
- When to say "yes"
- How to handle player surprises
- Session 0 guidance
- Building confidence

**Acceptance Criteria**:
- [ ] Reassuring tone throughout
- [ ] Practical, actionable advice
- [ ] Specific to this campaign
- [ ] Addresses common fears
- [ ] Encourages creativity
- [ ] 3-4 pages

**Labels**: `phase-6`, `parallel`, `documentation`, `beginner`, `appendix`
**Estimate**: 4-6 hours
**Dependencies**: Can start after Phase 1 complete

---

## Phase 7 Task Issues (ALL PARALLEL)

### Issue 7.1: Add Adventure Hooks to Major Regions

**Title**: [Phase 7.1] Add Adventure Hooks to Major Regions

**Parent Issue**: #P7
**Type**: PARALLEL

**Description**:
Add 3-5 adventure hooks to each major region in Northreach, converting passive lore into playable content prompts.

**Regions**:
- Welton
- Pinebrook  
- Palebank Village
- Waystone Inn surroundings
- Northwest mountains
- Northern wilderness

**Hook Format (per region)**:
```markdown
## [Region Name]

### Adventure Hooks for This Region
1. **Hook Name** (Level X-Y): One-sentence premise
   - **Conflict**: What's wrong
   - **Stakes**: What happens if ignored
   - **Echo Connection**: How it ties to mystery
   
2. [Additional hooks...]
```

**Acceptance Criteria**:
- [ ] Each major region has 3-5 hooks
- [ ] Hooks span level ranges 1-5
- [ ] Mix of investigation/combat/social
- [ ] All connect to Echo somehow
- [ ] Can be run as one-shots or woven in

**Labels**: `phase-7`, `parallel`, `lore`, `adventure-hooks`, `enhancement`
**Estimate**: 6-8 hours
**Dependencies**: Can start after Phase 1-4 complete

---

### Issue 7.2: Add Echo Manifestation Tables

**Title**: [Phase 7.2] Add Echo Manifestation Tables

**Parent Issue**: #P7
**Type**: PARALLEL

**Description**:
Create random tables for Echo manifestations in each region, enabling DMs to improvise consequences and show spreading magic.

**Tables Required (per region)**:
- Minor manifestations (cosmetic/flavor)
- Moderate manifestations (mechanical effects)
- Major manifestations (encounter-worthy)
- Escalation over time (early/mid/late campaign)

**Table Format**:
```markdown
### Echo Manifestations in [Region]

**Early Campaign** (Sessions 1-5)
| d10 | Manifestation | Effect |
|-----|---------------|--------|
| 1-3 | Animals act strangely | Roleplay only |
| ... | ... | ... |

**Mid Campaign** (Sessions 6-10)
[Escalated manifestations]

**Late Campaign** (Sessions 11+)
[Severe manifestations]
```

**Acceptance Criteria**:
- [ ] Tables for each major region
- [ ] Escalation over campaign clear
- [ ] Mix of minor/moderate/major
- [ ] Improvisation-friendly
- [ ] Consistent with established lore

**Labels**: `phase-7`, `parallel`, `tables`, `mystery`, `enhancement`
**Estimate**: 6-8 hours
**Dependencies**: Requires Phase 3 complete (Clue Bank provides context)

---

### Issue 7.3: Add Consequence Charts

**Title**: [Phase 7.3] Add Consequence Charts

**Parent Issue**: #P7
**Type**: PARALLEL

**Description**:
Create charts tracking consequences of major player decisions: which adventures affected, how outcomes ripple across campaign.

**Charts for Major Decisions**:
- Wolves of Welton outcomes
- Frozen Sick outcomes
- Temple of Dragonknights outcomes
- Guild reputation changes
- NPC relationship shifts
- Region stability changes

**Chart Format**:
```markdown
### Consequence: [Decision Point]

**If Players [Action A]**:
- Immediate: [What happens in this adventure]
- Short-term: [Effects in next 2-3 sessions]
- Long-term: [Campaign-wide implications]
- NPCs Affected: [Who remembers]

**If Players [Action B]**:
[Alternative consequences]
```

**Acceptance Criteria**:
- [ ] Major decision points covered
- [ ] Multiple outcomes tracked
- [ ] Ripple effects clear
- [ ] DM can reference quickly
- [ ] Supports improvisation
- [ ] Shows player agency matters

**Labels**: `phase-7`, `parallel`, `consequences`, `player-choice`, `enhancement`
**Estimate**: 6-8 hours
**Dependencies**: Requires Phase 2 complete (standardized adventures)

---

## Phase 8 Task Issues (SEQUENTIAL)

### Issue 8.1: Terminology Consistency Pass

**Title**: [Phase 8.1] Terminology Consistency Pass

**Parent Issue**: #P8
**Type**: CHILD (blocks all other Phase 8 tasks)

**Description**:
Review entire guide for terminology consistency: ensure locations, NPCs, items, and concepts use identical names and descriptions throughout.

**Consistency Checks**:
- Location names (canonical geography)
- NPC names and titles
- Item names
- Guild terminology
- Mystery terminology (Aeorian Echo vs. Echo vs. The Echo)
- Mechanical terms (standard D&D usage)

**Output**: 
- Terminology consistency report
- Style guide for future additions
- Corrections applied throughout guide

**Acceptance Criteria**:
- [ ] All terms standardized
- [ ] Style guide created
- [ ] No naming conflicts remain
- [ ] Capitalization consistent
- [ ] Abbreviations defined on first use

**Labels**: `phase-8`, `child`, `polish`, `documentation`
**Estimate**: 8-10 hours
**Dependencies**: Requires ALL content phases complete (1-7)
**Blocks**: #8.2, #8.3

---

### Issue 8.2: Beginner Content Placement Pass

**Title**: [Phase 8.2] Beginner Content Placement Pass

**Parent Issue**: #P8
**Type**: CHILD

**Description**:
Review placement of beginner-focused content: ensure helpful but not obstructive, properly marked, and easy to skip for experienced DMs.

**Review Criteria**:
- First-time DM content appropriately placed
- Beginner tips marked with clear icons/formatting
- Advanced content not buried behind basics
- "Skip if experienced" notes where appropriate
- Tutorial content optional

**Output**: Repositioned/reformatted beginner content

**Acceptance Criteria**:
- [ ] Beginner content helpful but unobtrusive
- [ ] Visual markers consistent
- [ ] Experienced DMs can skip easily
- [ ] New DMs guided effectively
- [ ] Balance achieved

**Labels**: `phase-8`, `child`, `polish`, `beginner`, `documentation`
**Estimate**: 4-6 hours
**Dependencies**: Blocked by #8.1

---

### Issue 8.3: Redundancy Elimination Pass

**Title**: [Phase 8.3] Redundancy Elimination Pass

**Parent Issue**: #P8
**Type**: CHILD

**Description**:
Identify and eliminate redundant content: information repeated unnecessarily across chapters, consolidate to single authoritative location.

**Redundancy Types**:
- Same information in multiple chapters
- Duplicate stat blocks
- Repeated adventure summaries
- Overlapping NPC descriptions
- Multiple versions of same rules

**Output**: Streamlined content with cross-references replacing duplication

**Acceptance Criteria**:
- [ ] Major redundancies eliminated
- [ ] Single source of truth for each fact
- [ ] Cross-references point to authoritative location
- [ ] Page count reduced
- [ ] Content easier to maintain

**Labels**: `phase-8`, `child`, `polish`, `documentation`
**Estimate**: 6-8 hours
**Dependencies**: Blocked by #8.1

---

### Issue 8.4: Page Number & Reference Update

**Title**: [Phase 8.4] Page Number & Reference Update

**Parent Issue**: #P8
**Type**: CHILD

**Description**:
Update all page numbers and references throughout guide to reflect final pagination after all content changes.

**Tasks**:
- Generate final Homebrewery build
- Capture actual page numbers
- Update table of contents
- Update all internal page references
- Update index page numbers
- Verify all cross-reference accuracy

**Acceptance Criteria**:
- [ ] All page numbers accurate
- [ ] Table of contents matches actual pages
- [ ] Internal references correct
- [ ] Index accurate
- [ ] No "TBD" or placeholder page numbers remain

**Labels**: `phase-8`, `child`, `polish`, `documentation`, `pagination`
**Estimate**: 4-6 hours
**Dependencies**: Blocked by #8.3 (needs content finalized)
**Blocks**: #8.5

---

### Issue 8.5: Homebrewery Formatting Verification

**Title**: [Phase 8.5] Homebrewery Formatting Verification

**Parent Issue**: #P8
**Type**: CHILD

**Description**:
Verify guide renders correctly in Homebrewery: check formatting, page breaks, stat blocks, tables, and visual elements.

**Verification Checklist**:
- [ ] All page breaks render correctly
- [ ] Stat blocks format properly
- [ ] Tables fit on pages without breaking
- [ ] Images/diagrams display correctly
- [ ] Font sizes consistent
- [ ] No orphaned headers
- [ ] Columns balance properly
- [ ] Print-friendly rendering
- [ ] No formatting errors or warnings

**Output**: 
- Formatting error report
- Corrections applied
- Clean Homebrewery render

**Acceptance Criteria**:
- [ ] Zero Homebrewery rendering errors
- [ ] Professional appearance throughout
- [ ] Print-ready quality
- [ ] Consistent styling

**Labels**: `phase-8`, `child`, `polish`, `formatting`, `homebrewery`
**Estimate**: 6-8 hours
**Dependencies**: Blocked by #8.4 (needs pagination finalized)
**Blocks**: #8.6

---

### Issue 8.6: Final Readthrough

**Title**: [Phase 8.6] Final Readthrough - Cover to Cover Review

**Parent Issue**: #P8
**Type**: CHILD

**Description**:
Complete cover-to-cover readthrough of the entire guide, catching any remaining errors, inconsistencies, or quality issues.

**Review Focus**:
- Grammar and spelling
- Clarity and flow
- Logical organization
- Completeness
- Usability
- Professional quality

**Reviewers**: 
- Primary author
- Fresh eyes (someone not involved in writing)

**Output**:
- Final issue list
- Corrections applied
- Sign-off for playtesting phase

**Acceptance Criteria**:
- [ ] Complete guide read cover-to-cover
- [ ] All identified issues resolved
- [ ] Second reviewer sign-off
- [ ] Publication-ready quality confirmed
- [ ] Ready for Phase 9 playtesting

**Labels**: `phase-8`, `child`, `polish`, `review`, `final`
**Estimate**: 10-12 hours (slow, thorough read)
**Dependencies**: Blocked by #8.5 (needs all polish complete)
**Blocks**: Phase 9

---

## Phase 9 Task Issues

### Issue 9.1: Internal Playtest

**Title**: [Phase 9.1] Conduct Internal Playtest

**Parent Issue**: #P9
**Type**: PARALLEL (can run with #9.2)

**Description**:
Conduct internal playtest with project team or close collaborators: run 2+ sessions using the guide, gather feedback on usability.

**Playtest Requirements**:
- Run 2-4 sessions
- Use guide as primary reference
- Test different adventures
- Mix of new/experienced players
- Track time to find information
- Note pain points and confusion
- Test variable attendance scenarios

**Feedback Collection**:
- DM experience survey
- Player experience survey
- Time-to-find-info metrics
- Specific pain points
- Suggestions for improvement

**Output**: Internal playtest report

**Acceptance Criteria**:
- [ ] Minimum 2 sessions completed
- [ ] DM used guide exclusively (no prior knowledge fallback)
- [ ] Feedback collected systematically
- [ ] Issues prioritized
- [ ] Report delivered for #9.3

**Labels**: `phase-9`, `parallel`, `playtest`, `internal`, `feedback`
**Estimate**: 4-6 weeks (actual play time)
**Dependencies**: Requires Phase 8 complete

---

### Issue 9.2: External Playtest

**Title**: [Phase 9.2] Conduct External Playtest

**Parent Issue**: #P9
**Type**: PARALLEL (can run with #9.1)

**Description**:
Recruit 2-3 external DMs unfamiliar with the campaign to run sessions using the guide: validate usability for "cold start" DMs.

**Playtest Requirements**:
- 2-3 different DM groups
- DMs not involved in development
- Run 2+ sessions each
- Mix of experience levels
- Comprehensive feedback surveys
- Check onboarding effectiveness

**Recruitment**:
- Post in D&D communities
- Offer early access credit
- Provide support but not hand-holding
- Remote/online acceptable

**Feedback Collection**:
- Pre-playtest DM interview (experience level)
- Session feedback forms
- Post-playtest survey
- Follow-up interview
- Usability metrics

**Output**: External playtest report

**Acceptance Criteria**:
- [ ] Minimum 2 external DM groups
- [ ] Each runs 2+ sessions
- [ ] Mix of new/experienced DMs
- [ ] Comprehensive feedback collected
- [ ] "Cold start" success validated
- [ ] Report delivered for #9.3

**Labels**: `phase-9`, `parallel`, `playtest`, `external`, `feedback`
**Estimate**: 6-8 weeks (actual play time + coordination)
**Dependencies**: Requires Phase 8 complete

---

### Issue 9.3: Implement Playtest Improvements

**Title**: [Phase 9.3] Implement Playtest Improvements

**Parent Issue**: #P9
**Type**: CHILD (depends on #9.1, #9.2)

**Description**:
Review playtest feedback, prioritize issues, and implement critical improvements before publication.

**Process**:
1. Compile feedback from #9.1 and #9.2
2. Categorize issues: critical/important/nice-to-have
3. Prioritize fixes
4. Implement critical and important fixes
5. Document nice-to-have for post-publication
6. Verify fixes don't introduce new issues

**Improvement Categories**:
- **Critical** (blocks publication): Major usability issues, broken content, missing essential info
- **Important** (should fix): Significant confusion points, suboptimal organization
- **Nice-to-have** (defer): Minor suggestions, style preferences, edge cases

**Output**:
- Prioritized improvement list
- Critical and important fixes implemented
- Final guide ready for publication
- Post-publication roadmap for nice-to-haves

**Acceptance Criteria**:
- [ ] All playtest feedback reviewed
- [ ] Critical issues resolved (100%)
- [ ] Important issues resolved (80%+)
- [ ] Nice-to-have issues documented for future
- [ ] No new issues introduced
- [ ] Playtest DMs validate improvements
- [ ] Guide approved for publication

**Labels**: `phase-9`, `child`, `playtest`, `implementation`, `final`
**Estimate**: 2-3 weeks
**Dependencies**: Blocked by #9.1, #9.2 (needs feedback)

---

## Issue Creation Instructions

### Step 1: Create Labels

Before creating issues, ensure these labels exist in your GitHub repository:

```bash
# Phase labels
gh label create "phase-1" --color "0E8A16" --description "Phase 1: Foundation & Structure"
gh label create "phase-2" --color "1D76DB" --description "Phase 2: Adventure Standardization"
gh label create "phase-3" --color "5319E7" --description "Phase 3: Mystery Tools & NPC Enhancement"
gh label create "phase-4" --color "D93F0B" --description "Phase 4: Navigation & Cross-Reference Fixes"
gh label create "phase-5" --color "FBCA04" --description "Phase 5: Visual Aids & Reference Materials"
gh label create "phase-6" --color "0052CC" --description "Phase 6: Content Enhancement & Gap Filling"
gh label create "phase-7" --color "C2E0C6" --description "Phase 7: Lore-to-Playable Conversion"
gh label create "phase-8" --color "F9D0C4" --description "Phase 8: Polish & Consistency"
gh label create "phase-9" --color "C5DEF5" --description "Phase 9: Playtesting & Iteration"

# Work type labels
gh label create "parent" --color "000000" --description "Parent/container issue"
gh label create "child" --color "CCCCCC" --description "Child issue dependent on parent"
gh label create "blocker" --color "B60205" --description "Blocks other work"
gh label create "parallel" --color "0E8A16" --description "Can be done in parallel"
gh label create "documentation" --color "0075CA" --description "Documentation work"
gh label create "enhancement" --color "A2EEEF" --description "New feature or enhancement"
gh label create "template" --color "D876E3" --description "Template creation"
gh label create "visual-aid" --color "FBCA04" --description "Visual/diagram work"
gh label create "polish" --color "FEF2C0" --description "Final refinement"
gh label create "playtest" --color "C5DEF5" --description "Testing and feedback"
gh label create "quick-win" --color "7057FF" --description "High-impact, achievable task"
```

### Step 2: Create Phase Parent Issues (P1-P9)

Create these 9 parent issues first. Each phase issue should:
- Use the title and description from the "Phase Issues (Parents)" section
- Include list of all child tasks in description
- Add appropriate labels
- Link to this planning document in description

**Example command for Phase 1**:
```bash
gh issue create \
  --title "[Phase 1] Foundation & Structure - Campaign Dashboard and Navigation" \
  --body "See DM_GUIDE_V3_ISSUES.md for full description" \
  --label "phase-1,parent,blocker,documentation,foundation"
```

### Step 3: Create Task Issues (1.1-9.3)

After parent issues are created, create child issues. Each should:
- Reference parent issue number in description: "Parent Issue: #[P1-P9]"
- Reference blocking issues in description
- Include acceptance criteria
- Add appropriate labels
- Include estimate

**Example command for Issue 1.1**:
```bash
gh issue create \
  --title "[Phase 1.1] Create Campaign Dashboard - DM Onboarding Tool" \
  --body "Parent Issue: #1 [paste full description from above]" \
  --label "phase-1,blocker,documentation,enhancement,quick-win"
```

### Step 4: Create Issue Dependencies

After all issues are created, add blocking relationships:

```bash
# Example: Issue 1.3 is blocked by issues 1.1 and 1.2
gh issue edit [issue-number-for-1.3] --add-label "blocked"
# Add comment: "Blocked by #[issue-for-1.1] and #[issue-for-1.2]"
```

### Step 5: Create GitHub Project Board

1. Create new project: "DM Guide v3 Implementation"
2. Add columns:
   - Backlog
   - Ready (dependencies met)
   - In Progress
   - Review
   - Complete
3. Add all issues to project
4. Configure automation:
   - Move to "In Progress" when assigned
   - Move to "Review" on PR submission
   - Move to "Complete" when closed

### Step 6: Set Milestones

Create milestones for each phase to track completion:

```bash
gh milestone create "Phase 1: Foundation" --due-date "2026-03-15"
gh milestone create "Phase 2: Adventures" --due-date "2026-04-15"
gh milestone create "Phase 3: Mystery & NPCs" --due-date "2026-04-30"
# ... etc for all phases
```

Then assign issues to appropriate milestones.

---

## Quick Reference: Issue Dependency Map

```
Phase 1 (START HERE - No dependencies)
├── 1.1 Campaign Dashboard [BLOCKER]
├── 1.2 Adventure Index [BLOCKER]
├── 1.3 ToC Update [depends on 1.1, 1.2]
└── 1.4 Info Hierarchy [PARALLEL]

Phase 2 (Requires Phase 1)
├── 2.1 Master Template [BLOCKER, requires 1.2]
├── 2.2.1-2.2.6 Standardize Adventures [PARALLEL, requires 2.1]
└── 2.3 Review [requires all 2.2.x]

Phase 3 (Requires Phase 1)
├── 3.1 Clue Bank [BLOCKER]
├── 3.2 Mystery Pacing [requires 3.1]
├── 3.3 NPC Card Format [BLOCKER]
├── 3.4 Create NPC Cards [PARALLEL, requires 3.3]
└── 3.5 NPC Relationship Web [PARALLEL, benefits from 3.4]

Phase 4 (Requires Phases 1, 2, 3)
├── 4.1 Audit Cross-Refs [BLOCKER]
├── 4.2 Implement Fixes [requires 4.1]
└── 4.3 Add Navigation [requires 4.2]

Phase 5-7 (Can start after Phases 1-4 complete)
├── All Phase 5 tasks [PARALLEL]
├── All Phase 6 tasks [PARALLEL]
└── All Phase 7 tasks [PARALLEL]

Phase 8 (Requires ALL previous phases)
├── 8.1 Terminology [BLOCKER]
├── 8.2 Beginner Content [requires 8.1]
├── 8.3 Redundancy [requires 8.1]
├── 8.4 Page Numbers [requires 8.3]
├── 8.5 Homebrewery [requires 8.4]
└── 8.6 Final Read [requires 8.5]

Phase 9 (Requires Phase 8)
├── 9.1 Internal Playtest [PARALLEL]
├── 9.2 External Playtest [PARALLEL]
└── 9.3 Implement Improvements [requires 9.1, 9.2]
```

---

## Issue Count Summary

- **Phase Parent Issues**: 9 (P1-P9)
- **Phase 1 Tasks**: 4 (1.1-1.4)
- **Phase 2 Tasks**: 10 (2.1, 2.2.1-2.2.6, 2.3)
- **Phase 3 Tasks**: 5 (3.1-3.5)
- **Phase 4 Tasks**: 3 (4.1-4.3)
- **Phase 5 Tasks**: 4 (5.1-5.4)
- **Phase 6 Tasks**: 4 (6.1-6.4)
- **Phase 7 Tasks**: 3 (7.1-7.3)
- **Phase 8 Tasks**: 6 (8.1-8.6)
- **Phase 9 Tasks**: 3 (9.1-9.3)

**Total Issues**: 51 (9 parent + 42 task issues)

---

## Work Distribution Suggestions

### For Solo Work
- Follow critical path strictly
- Complete Phases 1-4 sequentially
- Then choose from Phases 5-7 based on strengths
- Complete Phase 8-9 last

### For 2-Person Team
- **Person A**: Phases 1-2 (structure and adventures)
- **Person B**: Phase 3 (mystery and NPCs)
- **Together**: Phases 4, 8, 9
- **Parallel**: Phases 5-7 (divide visual/content/lore work)

### For 3+ Person Team
- **Lead**: Phase 1 + coordination
- **Adventure Specialist**: Phase 2 (all adventures)
- **Mystery/NPC Specialist**: Phase 3
- **Everyone**: Phase 4 together
- **Parallel**: Divide Phases 5-7 by expertise
  - Visual person: Phase 5
  - Content writer: Phase 6
  - Lore expert: Phase 7
- **Everyone**: Phase 8 review together
- **Lead + External**: Phase 9

### For AI-Assisted Work
- Use AI for: Templates, formatting, initial drafts, consistency checks
- Human review for: Approval, creative decisions, playtesting, final sign-off
- Best AI tasks: 1.1, 1.2, 2.1, 3.1, 3.3, 6.1, 8.1, 8.3
- Best human tasks: 2.3, 4.1, 8.6, 9.1-9.3

---

## Timeline Estimates

### Aggressive Schedule (Full-Time Work)
- Phases 1-4: 6-8 weeks
- Phases 5-7: 3-4 weeks (parallel)
- Phase 8: 3-4 weeks
- Phase 9: 6-8 weeks
- **Total**: ~18-24 weeks (4.5-6 months)

### Moderate Schedule (Part-Time Work)
- Phases 1-4: 10-12 weeks
- Phases 5-7: 6-8 weeks (parallel)
- Phase 8: 4-6 weeks
- Phase 9: 8-10 weeks
- **Total**: ~28-36 weeks (7-9 months)

### Relaxed Schedule (Hobby Pace)
- Phases 1-4: 16-20 weeks
- Phases 5-7: 10-12 weeks (parallel)
- Phase 8: 6-8 weeks
- Phase 9: 10-12 weeks
- **Total**: ~42-52 weeks (10-12 months)

---

## Success Checklist

Before marking the project complete, verify:

- [ ] All 51 issues created in GitHub
- [ ] All parent-child relationships documented
- [ ] All blocking dependencies noted
- [ ] Project board configured and populated
- [ ] Milestones created and assigned
- [ ] Labels created and applied
- [ ] Critical path clearly visible in project
- [ ] Team roles/assignments clear (if applicable)
- [ ] This document linked from parent issues

**Once this setup is complete, work can begin on Phase 1!**

---

**Document Created**: 2026-02-11  
**Source**: `dm-guide-v3.md`  
**For**: DM's Guide v3 - Publication-Ready Implementation  
**Total Estimated Effort**: 400-500 hours (solo work)  
**Recommended Team Size**: 2-3 people  
**Expected Duration**: 6-12 months depending on pace

