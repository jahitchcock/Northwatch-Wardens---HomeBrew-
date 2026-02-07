{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**Region Files Content Audit**

This document identifies player-inappropriate content in the 10 region files included in the Player's Guide. Each entry includes location, severity, and recommended action.

**Audit Date:** 2026-02-06
**Auditor:** GitHub Copilot (DMHelper Agent)
**Files Reviewed:** All 10 region files (00_Master_Index.md through 10_The_Far_North.md)
}}

# Region Content Audit for Player's Guide

## Executive Summary

**Total Issues Identified:** 6 items requiring action  
**Severity Breakdown:**
- **HIGH** (major campaign spoilers): 2 items
- **MEDIUM** (reveals too much context): 3 items
- **LOW** (minor concerns):  1 item

**Overall Assessment:** Most region files are player-appropriate. The main issues are explicit references to "Aeorian Echo" in ways that reveal its nature rather than treatingit as an in-world mystery. Several files also explain what the Echo "does" rather than describing its observed effects.

---

## HIGH Priority Issues (Major Campaign Spoilers)

These directly reveal central campaign secrets and should be addressed before distributing the Player's Guide.

### Issue #1: Master Index - Theme Line Reveals Campaign Secret

**File:** `World Building/Regions/00_Master_Index.md`  
**Line:** 17  
**Content:**
```markdown
- **Theme:** Frontier survival, awakening magic, Aeorian Echo
```

**Problem:** The Master Index is the first thing readers see in "The Wider World of Aevoria" chapter. Listing "Aeorian Echo" as a theme immediately tells players this is a central campaign element before they discover it through play.

**Severity:** HIGH - Spoils campaign mystery immediately

**Recommendation:** Remove "Aeorian Echo" from theme description

**Suggested Revision:**
```markdown
- **Theme:** Frontier survival, awakening magic, strange phenomena
```

**Alternative:** If "Aeorian Echo" is meant to be common knowledge (scholars' name for the phenomenon), this can stay. However, recommend rephrasing to not highlight it as a theme.

---

### Issue #2: Solaris Dominion - Reveals Echo's Nature and Effect

**File:** `World Building/Regions/02_Solaris_Dominion.md`  
**Line:** 21  
**Content:**
```markdown
This is where news travels fastest, where secrets become songs, and where the Aeorian Echo manifests as social upheaval rather than physical corruption.
```

**Problem:** This sentence explicitly states that:
1. The Aeorian Echo is a known phenomenon
2. It has different "manifestations" in different regions
3. It causes "physical corruption" elsewhere
4. Solaris experiences it as "social upheaval"

This is DM meta-knowledge explaining how the Echo works systemically, not player-discoverable information.

**Severity:** HIGH - Reveals Echo mechanics and regional variations

**Recommendation:** Remove or rephrase as rumors/observations

**Suggested Revision:**
```markdown
This is where news travels fastest, where secrets become songs, and where political tensions seem to be rising alongside strange reports from the frontier.
```

**Alternative:** Rephrase as "What You've Heard" rumor about unrest possibly connected to northern events.

---

## MEDIUM Priority Issues (Reveals Too Much Context)

These don't spoil the core mystery but provide too much explanatory context that should be discovered through play.

### Issue #3: Nullwood Expanse - Implies Elves Know About the Echo

**File:** `World Building/Regions/03_Nullwood_Expanse.md`  
**Line:** 207  
**Content:**
```markdown
**Northreach**  
Concern. The Aeorian Echo feels like an old wound reopening, though the elves don't quite know why.
```

**Problem:** This states that elves have a specific reaction to "the Aeorian Echo" and understand it relates to something historical ("old wound reopening"). This is DM narrative explaining NPC knowledge rather than player-discoverable content.

**Severity:** MEDIUM - Implies Echo is widely known and historically significant

**Recommendation:** Rephrase as vague unease without naming the Echo

**Suggested Revision:**
```markdown
**Northreach**  
Growing concern. Reports of strange magic in the frontier unsettle the elves, though they struggle to explain why it feels familiar.
```

**Alternative:** Move to DMEyesOnly section as "What Elves Actually Know (DM Info)"

---

### Issue #4: Stonebound Depths - Reveals Echo Connection to Ancient Events

**File:** `World Building/Regions/04_Stonebound_Depths.md`  
**Line:** 650  
**Content:**
```markdown
- The Aeorian Echo's tremors match patterns in ancient dwarven records
```

**Problem:** This explicitly connects "Aeorian Echo" to ancient records, implying:
1. Dwarves have encountered this before
2. It leaves documentable patterns
3. This isn't the first occurrence

This is DM lore-building, not player-facing content.

**Severity:** MEDIUM - Reveals historical precedent

**Recommendation:** Rephrase without naming Echo or implying direct knowledge

**Suggested Revision:**
```markdown
- Recent seismic tremors match patterns described in fragmentary ancient records—a fact that deeply unsettles dwarven elders
```

**Alternative:** Move specific Echo references to DM notes

---

### Issue #5: Verdant Marches - Explicitly Links Echo to Intelligence Awakening

**File:** `World Building/Regions/08_Verdant_Marches.md`  
**Line:** 318  
**Content:**
```markdown
The Aeorian Echo's effects in Northreach feel familiar to Marches druids—the intelligence awakening, the change in natural patterns, the sense of something ancient stirring. Information flows both ways through druidic messengers and ranger contacts.
```

**Problem:** This explicitly states that:
1. The Aeorian Echo has specific "effects"
2. One effect is "intelligence awakening"
3. Druids recognize these effects
4. There's an information network tracking it

This is pure DM exposition explaining the campaign arc to the reader.

**Severity:** MEDIUM - Directly spoils major adventure connection (Wolves of Welton)

**Recommendation:** Remove or significantly rephrase as vague druidic concern

**Suggested Revision:**
```markdown
Reports from Northreach trouble Marches druids—animals behaving strangely, plants growing unnaturally, the feeling that something ancient is stirring. Old stories speak of such times. Information flows through druidic messengers and ranger contacts, though no one understands the full picture.
```

**Alternative:** Move to DM notes as "Why Druids Are Concerned (DM Background)"

---

## LOW Priority Issues (Minor Concerns)

These are less problematic but worth reviewing.

### Issue #6: Multiple References to "Awakening" as Theme

**Files:** Multiple  
**Content:** Various lines describe things "awakening"

**Problem:** The repeated use of "awakening" as a descriptor (awakening magic, awakening ancient structures, awakening intelligence) creates a pattern that meta-communicates "things waking up" is the campaign theme.

**Severity:** LOW - Thematic consistency, not necessarily a spoiler

**Recommendation:** Add variety to descriptions; not everything needs to "awaken"

**Suggested Approach:**
- Some things "stir"
- Others "manifest"
- Some "resurface" or "emerge"
- Use "strange phenomena" or "unusual occurrences"

This prevents the guide from reading like an announcement of "The Awakening Campaign."

---

## Content That Is FINE (Player-Appropriate)

These elements were reviewed and are acceptable as-is:

### Far North Descriptions
The 10_The_Far_North.md file handles Salsvault and ruins excellently:
- Describes dangers and mysteries without explaining causes
- Presents everything as rumors and local knowledge
- Uses "what travelers say" and "what no one can prove"
- Perfect player-facing content that invites discovery

### General Aeorian References
Brief mentions of "old ruins" or "Aeorian artifacts" as historical facts are fine. The world's inhabitants do know:
- Aeor existed and fell
- Ruins exist in the Far North
- Old artifacts surface occasionally
- Exploring them is dangerous

What they DON'T know (and files shouldn't reveal):
- The Echo is active Aeorian technology reactivating
- There's a spreading pattern
- It's systematically awakening intelligence
- Its full extent or purpose

### Regional Effects Without Explanation
Descriptions like "strange lights," "animals behaving unusually," or "political tensions rising" are perfect examples of player-appropriate content.

---

## Implementation Recommendations

### Recommended Action Order:

**Before Next Player Distribution:**
1. Fix Issue #1 (Master Index theme) - 5 minutes
2. Fix Issue #2 (Solaris Echo manifestation line) - 10 minutes

**Before Campaign Start:**
3. Fix Issue #5 (Verdant Marches explicit connection) - 15 minutes
4. Fix Issues #3-4 (Nullwood and Stonebound references) - 20 minutes total

**Optional Polish:**
5. Issue #6 (diversify "awakening" language) - 30 minutes

### Alternative Approach: "What You've Heard" Sections

Instead of removing all Echo references, consider adding "Rumors and Reports" sections to each region that include:
- Vague connections to northern events
- Scholars debating what "Aeorian Echo" means
- Conflicting theories about causes
- Observable effects without explanations

This transforms spoilers into discovery hooks while keeping the terminology in play.

---

## Testing Recommendation

After implementing changes, have someone unfamiliar with the campaign read the Master Index and one or two region files. Ask them:
1. What do they think the campaign is about?
2. Do they feel like they already know major plot reveal?
3. Are they more curious or less curious after reading?

If they say "it's about ancient Aeorian magic reactivating," the files still reveal too much.  
If they say "there's weird stuff happening and no one knows why," the files are working correctly.

---

## Additional Considerations

### Should "Aeorian Echo" Be a Known Term?

**Decision Needed:** Is "Aeorian Echo" meant to be:
- **Option A:** A scholarly term that educated NPCs use (players can know the name but not what it is)
- **Option B:** A DM-only term that players discover midway through campaign
- **Option C:** The eventual name players give the phenomenon after investigation

**Current State:** Files use it inconsistently—sometimes as if it's common knowledge, sometimes as DM exposition.

**Recommendation:** Choose Option A or B and enforce consistently across all files.

---

**End of Audit**

**Next Steps:**
1. Review this audit with campaign DM
2. Decide on Echo terminology approach
3. Implement high-priority fixes
4. Update players-guide-toc.json build
5. Test revised content with fresh reader
