<!--
  Tags: DM-Resource, Meta
  Status: Canon
  Type: DM-Resource
-->

# DM Guide v3 - Issue Dependency Diagram

This document provides visual representations of issue dependencies for the DM Guide v3 implementation project.

## Legend

- `[PARENT]` - Container issue for a phase
- `[BLOCKER]` - Must be completed before other work can proceed
- `[PARALLEL]` - Can be worked on simultaneously with other tasks
- `→` - Dependency relationship (must wait for)
- `||` - Can run in parallel

---

## Overall Phase Dependencies

```
┌─────────────┐
│   Phase 1   │ [BLOCKER - Foundation & Structure]
│  Foundation │
└──────┬──────┘
       │
       ├──────────────────────────────┐
       │                              │
       ↓                              ↓
┌─────────────┐              ┌─────────────┐
│   Phase 2   │              │   Phase 3   │
│  Adventures │              │Mystery/NPCs │
└──────┬──────┘              └──────┬──────┘
       │                            │
       └────────────┬───────────────┘
                    │
                    ↓
            ┌───────────────┐
            │   Phase 4     │ [Navigation Fixes]
            │  Navigation   │
            └───────┬───────┘
                    │
       ┌────────────┼────────────┐
       │            │            │
       ↓            ↓            ↓
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Phase 5  │  │ Phase 6  │  │ Phase 7  │
│Visual Aid│  │ Content  │  │   Lore   │
│[PARALLEL]│  │[PARALLEL]│  │[PARALLEL]│
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │            │            │
     └────────────┼────────────┘
                  │
                  ↓
          ┌───────────────┐
          │   Phase 8     │ [Polish - SEQUENTIAL]
          │    Polish     │
          └───────┬───────┘
                  │
                  ↓
          ┌───────────────┐
          │   Phase 9     │
          │  Playtest     │
          └───────────────┘
```

---

## Phase 1: Foundation & Structure (START HERE)

```
Phase 1 [PARENT ISSUE P1]
│
├─► 1.1 Campaign Dashboard [BLOCKER] [QUICK-WIN]
│   (No dependencies - can start immediately)
│   Blocks: 1.3, Phase 2, Phase 3
│
├─► 1.2 Adventure Index [BLOCKER] [QUICK-WIN]
│   (No dependencies - can start immediately)
│   Blocks: 1.3, Phase 2
│
├─► 1.3 Master ToC Update
│   Depends on: 1.1 ✓ AND 1.2 ✓
│   (1.1 → 1.3 ← 1.2)
│
└─► 1.4 Information Hierarchy [PARALLEL]
    (No dependencies - can run alongside others)
```

**Parallel Opportunities**:
- 1.1, 1.2, and 1.4 can all start simultaneously
- 1.3 must wait for both 1.1 and 1.2 to complete

---

## Phase 2: Adventure Standardization

```
Phase 2 [PARENT ISSUE P2]
Depends on: Phase 1 ✓ (especially 1.1, 1.2)
│
├─► 2.1 Create Master Template [BLOCKER] [QUICK-WIN]
│   Depends on: 1.2 ✓
│   Blocks: ALL 2.2.x tasks
│
├─► 2.2.1 Wolves of Welton [PARALLEL]
│   │   Depends on: 2.1 ✓
│   │
├─► 2.2.2 Frozen Sick [PARALLEL]
│   │   Depends on: 2.1 ✓
│   │
├─► 2.2.3 Temple of Dragonknights [PARALLEL]
│   │   Depends on: 2.1 ✓
│   │
├─► 2.2.4 Wild Sheep Chase [PARALLEL]
│   │   Depends on: 2.1 ✓
│   │
├─► 2.2.5 Peril in Pinebrook [PARALLEL]
│   │   Depends on: 2.1 ✓
│   │
├─► 2.2.6 Opening Adventures [PARALLEL]
│   │   Depends on: 2.1 ✓
│   │
│   [All 2.2.x tasks can run in parallel]
│   │
└─► 2.3 Standardization Review
    Depends on: ALL 2.2.x tasks complete ✓
```

**Parallel Opportunities**:
- After 2.1 is complete, all 6 adventure standardization tasks (2.2.1-2.2.6) can proceed simultaneously
- 6 people could work on adventures at once
- 2.3 review must wait for all adventures

---

## Phase 3: Mystery Tools & NPC Enhancement

```
Phase 3 [PARENT ISSUE P3]
Depends on: Phase 1 ✓
│
├─► 3.1 Master Clue Bank [PARENT] [QUICK-WIN]
│   Depends on: Phase 2 ✓ (needs standardized adventures)
│   Blocks: 3.2
│
├─► 3.2 Mystery Pacing Guide
│   Depends on: 3.1 ✓
│
├─► 3.3 NPC Quick Card Format [PARENT]
│   (Can start after Phase 1)
│   Blocks: 3.4
│
├─► 3.4 Create NPC Quick Cards [PARALLEL]
│   Depends on: 3.3 ✓
│   (Benefits from Phase 2 ✓ but not strictly required)
│
└─► 3.5 NPC Relationship Web [PARALLEL]
    (Can start after Phase 1)
    Benefits from: 3.4 ✓ (but can work from existing docs)
```

**Parallel Opportunities**:
- 3.1 and 3.3 can start simultaneously after Phase 1
- 3.5 can run parallel with 3.4 if needed
- Two tracks: Mystery (3.1 → 3.2) and NPCs (3.3 → 3.4, 3.5)

---

## Phase 4: Navigation & Cross-Reference Fixes

```
Phase 4 [PARENT ISSUE P4]
Depends on: Phases 1, 2, 3 ✓
│
Sequential chain:
│
└─► 4.1 Audit Cross-References [BLOCKER]
    │
    ↓
    4.2 Implement Fixes
    │
    ↓
    4.3 Add Navigation Aids
```

**Note**: Phase 4 is strictly sequential - each task must complete before the next begins.

---

## Phases 5-7: Parallel Work Streams

After Phases 1-4 complete, these three phases can all proceed in parallel:

```
Phase 4 ✓
│
├──────────────┬──────────────┐
│              │              │
↓              ↓              ↓
┌────────────┐ ┌────────────┐ ┌────────────┐
│  Phase 5   │ │  Phase 6   │ │  Phase 7   │
│Visual Aids │ │  Content   │ │    Lore    │
└────────────┘ └────────────┘ └────────────┘
```

### Phase 5: Visual Aids (ALL PARALLEL)

```
Phase 5 [PARENT ISSUE P5]
All tasks can run simultaneously:
│
├─► 5.1 Northreach Map [PARALLEL]
│
├─► 5.2 Mystery Connection Diagram [PARALLEL]
│   (Benefits from Phase 3 ✓)
│
├─► 5.3 Adventure Difficulty Chart [PARALLEL]
│   (Benefits from Phase 2 ✓)
│
└─► 5.4 Session Prep Flowchart [PARALLEL]
```

### Phase 6: Content Enhancement (ALL PARALLEL)

```
Phase 6 [PARENT ISSUE P6]
All tasks can run simultaneously:
│
├─► 6.1 Complete Appendix [PARENT] [QUICK-WIN]
│
├─► 6.2 Downtime Activities [PARALLEL]
│
├─► 6.3 Player Handout [PARALLEL]
│
└─► 6.4 First-Time DM Appendix [PARALLEL]
```

### Phase 7: Lore-to-Playable (ALL PARALLEL)

```
Phase 7 [PARENT ISSUE P7]
All tasks can run simultaneously:
│
├─► 7.1 Adventure Hooks [PARALLEL]
│
├─► 7.2 Echo Manifestation Tables [PARALLEL]
│   (Benefits from Phase 3 ✓)
│
└─► 7.3 Consequence Charts [PARALLEL]
    (Benefits from Phase 2 ✓)
```

**Parallel Opportunities**:
- Maximum parallelism: 11 tasks can proceed simultaneously
- Three-person team could each take a full phase
- Or distribute by skill: visual person takes Phase 5, writer takes Phase 6, game designer takes Phase 7

---

## Phase 8: Polish & Consistency (SEQUENTIAL)

```
Phase 8 [PARENT ISSUE P8]
Depends on: ALL previous phases (1-7) ✓
│
Sequential chain - NO PARALLEL WORK:
│
└─► 8.1 Terminology Consistency [BLOCKER]
    │
    ├─► 8.2 Beginner Content Placement
    │   (Depends on 8.1 ✓)
    │
    ├─► 8.3 Redundancy Elimination
    │   (Depends on 8.1 ✓)
    │
    ↓   [8.2 and 8.3 can run parallel after 8.1]
    │
    8.4 Page Numbers & References
    │   (Depends on 8.3 ✓)
    │
    ↓
    8.5 Homebrewery Verification
    │   (Depends on 8.4 ✓)
    │
    ↓
    8.6 Final Readthrough
        (Depends on 8.5 ✓)
```

**Note**: 
- 8.1 is a blocker for everything else in Phase 8
- After 8.1, tasks 8.2 and 8.3 can run in parallel
- After that, it's sequential again

---

## Phase 9: Playtesting & Iteration

```
Phase 9 [PARENT ISSUE P9]
Depends on: Phase 8 ✓ (guide must be polished)
│
├─► 9.1 Internal Playtest [PARALLEL]
│   │
│   │   (Both can run simultaneously)
│   │
├─► 9.2 External Playtest [PARALLEL]
│   │
│   └───┬───────────────┘
│       │
│       ↓
└─► 9.3 Implement Improvements
        Depends on: 9.1 ✓ AND 9.2 ✓
```

---

## Critical Path Summary

The absolute minimum sequence that determines project duration:

```
1. Phase 1 (1.1, 1.2 parallel → 1.3)
   ↓
2. Phase 2 (2.1 → all 2.2.x parallel → 2.3)
   ‖
   Phase 3 (3.1 → 3.2; 3.3 → 3.4)
   ↓
3. Phase 4 (4.1 → 4.2 → 4.3) [SEQUENTIAL]
   ↓
4. Phases 5-7 [ALL PARALLEL]
   ↓
5. Phase 8 (8.1 → [8.2‖8.3] → 8.4 → 8.5 → 8.6) [MOSTLY SEQUENTIAL]
   ↓
6. Phase 9 ([9.1‖9.2] → 9.3)
```

**Critical Path Duration** (assuming full-time work):
- Phase 1: 2 weeks
- Phase 2: 3 weeks
- Phase 3: 2 weeks (parallel with Phase 2)
- Phase 4: 2 weeks
- Phases 5-7: 3 weeks (parallel)
- Phase 8: 4 weeks (mostly sequential)
- Phase 9: 6 weeks (playtesting takes calendar time)
- **Total**: ~18-20 weeks minimum

---

## Work Distribution Scenarios

### Scenario 1: Solo Developer

```
Week 1-2:   Phase 1 (sequential: 1.1, 1.2, 1.3; parallel: 1.4)
Week 3-5:   Phase 2 (sequential by necessity)
Week 6-7:   Phase 3 (sequential by necessity)
Week 8-9:   Phase 4 (sequential)
Week 10-12: Phases 5-7 (pick tasks by preference)
Week 13-16: Phase 8 (sequential)
Week 17-24: Phase 9 (actual playtesting takes time)
Total: 24 weeks
```

### Scenario 2: Two-Person Team

```
Week 1-2:   Both: Phase 1 together
Week 3-5:   Person A: Phase 2 | Person B: Phase 3
Week 6-7:   Both: Phase 4 together
Week 8-10:  Person A: Phases 5+7 | Person B: Phase 6
Week 11-14: Both: Phase 8 together (review work)
Week 15-20: Both: Phase 9 playtesting
Total: 20 weeks
```

### Scenario 3: Three-Person Team

```
Week 1-2:   All: Phase 1 together
Week 3-5:   Person A: Phase 2 | Person B: Phase 3 | Person C: Draft Phase 5-7
Week 6-7:   All: Phase 4 together
Week 8-10:  Person A: Phase 5 | Person B: Phase 6 | Person C: Phase 7
Week 11-14: All: Phase 8 together (review and polish)
Week 15-18: All: Phase 9 playtesting
Total: 18 weeks
```

---

## Blocker Issues That Must Be Prioritized

These issues block significant downstream work:

1. **Issue 1.1** - Campaign Dashboard
   - Blocks: Phase 2, Phase 3, Phase 4
   - Impact: HIGH
   - Priority: CRITICAL

2. **Issue 1.2** - Adventure Index
   - Blocks: Issue 2.1, Phase 4
   - Impact: HIGH
   - Priority: CRITICAL

3. **Issue 2.1** - Master Adventure Template
   - Blocks: All Phase 2 adventure work (6 tasks)
   - Impact: HIGH
   - Priority: CRITICAL

4. **Issue 3.1** - Master Clue Bank
   - Blocks: Issue 3.2, Phase 5.2
   - Impact: MEDIUM
   - Priority: HIGH

5. **Issue 3.3** - NPC Quick Card Format
   - Blocks: Issue 3.4
   - Impact: MEDIUM
   - Priority: HIGH

6. **Issue 4.1** - Audit Cross-References
   - Blocks: Issues 4.2, 4.3
   - Impact: MEDIUM
   - Priority: HIGH

7. **Issue 8.1** - Terminology Consistency
   - Blocks: All remaining Phase 8 work
   - Impact: HIGH
   - Priority: CRITICAL (but late in project)

---

## Quick-Win Issues (High Impact, Achievable)

These issues provide significant value and should be prioritized:

- **Issue 1.1** - Campaign Dashboard (6-8 hours, unblocks Phase 2-3)
- **Issue 1.2** - Adventure Index (4-6 hours, unblocks Phase 2)
- **Issue 2.1** - Master Template (6-8 hours, unblocks 6 adventures)
- **Issue 3.1** - Master Clue Bank (6-8 hours, key mystery tool)
- **Issue 6.1** - Complete Appendix (10-12 hours, major reference value)

---

**Last Updated**: 2026-02-11  
**For**: DM Guide v3 Implementation Project  
**Total Issues**: 51 (9 parent + 42 tasks)
