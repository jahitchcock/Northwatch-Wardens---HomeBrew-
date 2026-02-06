# Player's Guide 2.0 - Sub-Issues to Create

This document outlines all the sub-issues that need to be created in GitHub for the Player's Guide 2.0 reorganization project. Each sub-issue is structured with title, description, labels, and acceptance criteria.

---

## Phase 1: Quick Win ✅

### ✅ Issue #1.1: Update players-guide-toc.json with new chapter order
**Status**: COMPLETE (already done)

---

## Phase 2: Character Creation Content (Priority 1)

### Issue #2.1: Create Character Creation Guide
**Title**: Create Creating_Your_Character.md with step-by-step character creation guide

**Description**:
Create a comprehensive character creation guide that helps players build characters specifically for the Northwatch Wardens campaign.

**Location**: `World Building/Character_Creation/Creating_Your_Character.md`

**Content Requirements**:
- Step-by-step character creation process (Ability Scores → Race → Class → Background → Equipment)
- How to tie character backstory into Northwatch Wardens
- Starting equipment recommendations by origin region
- Character motivation hooks for joining the Wardens
- Integration with existing 5e character creation rules (reference PHB)
- Example character creation walkthrough
- Character advancement and milestone expectations

**Formatting**:
- Use Homebrewery markdown syntax
- Include appropriate `\page` breaks (every ~70-85 lines)
- Use `{{descriptive}}` blocks for read-aloud character concepts
- Use tables for equipment recommendations

**Success Criteria**:
- [ ] File created with all required sections
- [ ] Integrates with Northwatch Wardens lore
- [ ] References appropriate PHB sections
- [ ] Includes at least one complete example
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, character-creation, priority-1, player-guide

**Dependencies**: None

---

### Issue #2.2: Create Regional Origins Guide
**Title**: Create Regional_Origins.md with background variants for each region

**Description**:
Create a guide that provides regional background variants and character origin options for all 10 regions of Aevoria, helping players ground their characters in the world.

**Location**: `World Building/Character_Creation/Regional_Origins.md`

**Content Requirements**:
- Background variant for each of the 10 regions:
  - Northreach (frontier/survivor)
  - Solaris Dominion (imperial/scholarly)
  - Nullwood Expanse (druidic/isolationist)
  - Stonebound Depths (dwarven/craftsman)
  - Vharoxis (draconic/ambitious)
  - Shattered Coast (mercantile/seafaring)
  - Emberlands (military/disciplined)
  - Verdant Marches (nomadic/agricultural)
  - Sunken Dominion (mysterious/water-adapted)
  - The Far North (hardy/traditional)
- "If you're from [Region]..." sections with:
  - Common backgrounds from that region
  - Cultural traits and quirks
  - Starting connections
  - Sample character concepts (2-3 per region)
- Character tie-in questions to help players integrate backstory
- Regional tensions and relationships

**Formatting**:
- Use Homebrewery markdown syntax
- One region per page (use `\page` breaks between regions)
- Use `{{note}}` blocks for "If you're from..." callouts
- Use tables for background feature variants

**Success Criteria**:
- [ ] All 10 regions covered with equal depth
- [ ] Each region has 2-3 sample character concepts
- [ ] Background variants align with existing 5e backgrounds
- [ ] Character questions prompt meaningful backstory integration
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 3-4 hours

**Labels**: content-creation, character-creation, priority-1, player-guide, worldbuilding

**Dependencies**: Review existing region files for consistency

---

### Issue #2.3: Create Languages and Culture Guide
**Title**: Create Languages_and_Culture.md with cultural practices for gameplay

**Description**:
Create a practical guide to languages, cultural practices, and social customs across Aevoria that players can reference during gameplay.

**Location**: `World Building/Character_Creation/Languages_and_Culture.md`

**Content Requirements**:
- **Languages Section**:
  - Common languages by region (which races/cultures speak what)
  - Exotic languages and where they're found
  - Language rarity and difficulty
  - Language choice recommendations by background
  - Written scripts (Common script, Dwarven runes, Draconic, etc.)
- **Cultural Practices Section**:
  - Greetings and social etiquette by region
  - Dining customs and food culture
  - Gift-giving traditions
  - Hospitality expectations
  - Business and trade practices
- **Social Customs and Taboos**:
  - What's considered polite/rude in each region
  - Religious observances that affect daily life
  - Superstitions and common beliefs
  - Conflict resolution customs
  - Death and mourning practices
- **Practical Gameplay Impact**:
  - When language barriers matter
  - When cultural knowledge affects Charisma checks
  - Regional reputation and prejudices

**Formatting**:
- Use Homebrewery markdown syntax
- Use `\page` breaks appropriately (~70-85 lines)
- Use tables for language distribution by region
- Use `{{note}}` blocks for important taboos

**Success Criteria**:
- [ ] Languages clearly mapped to regions and races
- [ ] Cultural practices are gameplay-relevant (not just flavor)
- [ ] Social customs affect mechanical interactions
- [ ] All 10 regions represented
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, character-creation, priority-1, player-guide, worldbuilding

**Dependencies**: Review existing region files for cultural details

---

### Issue #2.4: Add Character Creation Chapter to TOC
**Title**: Update players-guide-toc.json to include Character Creation chapter

**Description**:
Add the new Character Creation chapter to the player's guide table of contents, positioning it after "Welcome to Aevoria" and before "Northreach: Your Starting Point".

**Location**: `build/players-guide-toc.json`

**Changes Required**:
Insert new chapter after "Welcome to Aevoria" chapter:
```json
{
  "chapter": "Character Creation",
  "files": [
    "../World Building/Character_Creation/Creating_Your_Character.md",
    "../World Building/Character_Creation/Regional_Origins.md",
    "../World Building/Character_Creation/Languages_and_Culture.md"
  ]
}
```

**Success Criteria**:
- [ ] Chapter added in correct position (after Welcome, before Northreach)
- [ ] All three character creation files included
- [ ] JSON is valid (no syntax errors)
- [ ] Build script runs successfully
- [ ] PDF generates with new chapter in correct order

**Estimate**: 15 minutes

**Labels**: configuration, player-guide, priority-1

**Dependencies**: Issues #2.1, #2.2, #2.3 must be complete

---

## Phase 3: Practical Gameplay Information (Priority 2)

### Issue #3.1: Create Currency and Trade Guide
**Title**: Create Currency_and_Trade.md with money systems and costs

**Description**:
Create a practical reference for currency, trade, and typical costs across Aevoria that players can use during shopping and economic interactions.

**Location**: `World Building/Practical/Currency_and_Trade.md`

**Content Requirements**:
- **Currency Systems**:
  - Standard D&D currency (cp, sp, gp, pp)
  - Regional variations or special currencies
  - Coinage and physical money descriptions
  - Banking and letters of credit (for high-value transactions)
- **Exchange Rates**:
  - Currency exchange between regions (if applicable)
  - Money changers and their fees
  - Trade goods as currency alternatives
- **Typical Costs**:
  - Cost of living by settlement size (Poor/Modest/Comfortable/Wealthy/Aristocratic)
  - Food and drink prices (tavern meals, rations, etc.)
  - Lodging costs (per night, by quality)
  - Transportation costs (mounts, wagons, ships)
  - Common services (smith, tailor, healer, etc.)
  - Regional price variations (frontier vs. city)
- **Trade and Commerce**:
  - Major trade goods by region
  - Trade routes and merchant guilds
  - Buying and selling adventuring gear
  - Haggling and negotiation customs

**Formatting**:
- Use Homebrewery markdown syntax
- Use tables extensively for pricing
- Use `{{note}}` blocks for important economic notes
- Use `\page` breaks appropriately

**Success Criteria**:
- [ ] Comprehensive pricing table for common items
- [ ] Cost of living clearly defined by lifestyle
- [ ] Regional economic differences explained
- [ ] Practical for quick reference during play
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, practical-info, priority-2, player-guide

**Dependencies**: None

---

### Issue #3.2: Create Travel and Distance Guide
**Title**: Create Travel_and_Distance.md with travel times and methods

**Description**:
Create a practical guide for travel throughout Aevoria, including distances, travel times, costs, and seasonal considerations.

**Location**: `World Building/Practical/Travel_and_Distance.md`

**Content Requirements**:
- **Travel Times**:
  - Distance table between major settlements
  - Travel time by method (foot, horse, wagon, ship)
  - Overland travel speeds and daily distances
  - Difficult terrain modifiers
- **Travel Methods and Costs**:
  - Walking/hiking (free, slow)
  - Mounts (horses, riding lizards, etc.) with costs
  - Wagons and caravans (costs, speeds, capacity)
  - Ships and boats (passage costs, cargo rates)
  - Magical travel (if available to players)
- **Weather and Season Considerations**:
  - Seasonal travel challenges by region
  - Weather effects on travel time
  - Best/worst seasons for specific routes
  - Preparation requirements (cold weather gear, etc.)
- **Hazards and Encounters**:
  - Common travel dangers by region
  - Safe routes vs. dangerous shortcuts
  - When to hire guards or join caravans
  - Roadside services (inns, waystations)

**Formatting**:
- Use Homebrewery markdown syntax
- Large distance/time table as centerpiece
- Use `{{note}}` blocks for travel tips
- Use `\page` breaks appropriately

**Success Criteria**:
- [ ] Distance table covers major settlements
- [ ] Travel times calculable by method and terrain
- [ ] Seasonal considerations included
- [ ] Practical for quick reference during play
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, practical-info, priority-2, player-guide

**Dependencies**: Review existing region files for geography

---

### Issue #3.3: Create Organizations Overview
**Title**: Create Organizations_Overview.md with major factions guide

**Description**:
Create a player-facing overview of major organizations and factions in Aevoria, focusing on what players commonly know and how to interact with them.

**Location**: `World Building/Organizations/Organizations_Overview.md`

**Content Requirements**:
- **Major Organizations** (8-12 key factions):
  - Northwatch Wardens (brief overview, full details in dedicated chapter)
  - Regional governments and power structures
  - Trade guilds and merchant consortiums
  - Religious orders (cross-reference Religion chapter)
  - Arcane institutions (magic schools, wizard circles)
  - Military orders and knightly organizations
  - Criminal organizations (what players might encounter)
  - Adventuring companies and rival guilds
- **For Each Organization**:
  - Public reputation and common knowledge
  - What they do and why
  - How players can interact with them
  - Where to find representatives
  - Typical services or benefits
  - Known leaders (public figures only)
- **Faction Relationships**:
  - Alliances and rivalries (public knowledge)
  - Reputation with one faction affecting others
  - Neutral ground and safe havens

**Formatting**:
- Use Homebrewery markdown syntax
- One major organization per page (use `\page` breaks)
- Use `{{descriptive}}` blocks for organization descriptions
- Use tables for quick-reference faction summaries

**Success Criteria**:
- [ ] 8-12 major organizations covered
- [ ] Player knowledge only (no DM secrets)
- [ ] Interaction methods clearly explained
- [ ] Cross-references to other chapters where appropriate
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, practical-info, priority-2, player-guide, worldbuilding

**Dependencies**: Review existing organization files

---

### Issue #3.4: Create Religious Practices Guide
**Title**: Create Religious_Practices.md with practical worship information

**Description**:
Create a practical guide to religious practices in Aevoria, focusing on how religion affects gameplay rather than just theology and mythology.

**Location**: `World Building/Religion/Religious_Practices.md`

**Content Requirements**:
- **How Worship Works**:
  - Daily devotions and prayer
  - Temple attendance and services
  - Offerings and sacrifices
  - Pilgrimages and holy sites
  - Role of clergy in society
- **Temple Services and Costs**:
  - Healing and restoration services
  - Blessings and minor enchantments
  - Burial and funeral rites
  - Marriage and other ceremonies
  - Divination and guidance
  - Typical donation amounts
- **Religious Holidays**:
  - Major holidays by deity
  - How holidays are celebrated
  - Game mechanical effects (festivals, closures, etc.)
  - Holiday calendar by season
- **Divine Magic in Society**:
  - How common folk view divine casters
  - Clerics vs. priests (adventurers vs. temple clergy)
  - Religious symbols and holy items
  - Temples as safe havens and information sources
- **Interfaith Relations**:
  - Religious tolerance vs. conflicts
  - Syncretism (worshiping multiple gods)
  - Regional religious differences

**Formatting**:
- Use Homebrewery markdown syntax
- Use tables for temple services and costs
- Use `{{note}}` blocks for religious customs
- Use `\page` breaks appropriately

**Success Criteria**:
- [ ] Practical gameplay information emphasized
- [ ] Temple services clearly priced
- [ ] Holiday calendar useful for scheduling
- [ ] Complements existing pantheon document
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, practical-info, priority-2, player-guide, religion

**Dependencies**: Review `Divinitys_Beacon_Pantheon.md` for consistency

---

### Issue #3.5: Add Life in Aevoria Chapter to TOC
**Title**: Update players-guide-toc.json to include Life in Aevoria chapter

**Description**:
Add the new "Life in Aevoria" chapter to the player's guide table of contents, positioning it after "The Northwatch Wardens" and before "The Wider World of Aevoria".

**Location**: `build/players-guide-toc.json`

**Changes Required**:
Insert new chapter after "The Northwatch Wardens" chapter:
```json
{
  "chapter": "Life in Aevoria",
  "files": [
    "../World Building/Practical/Currency_and_Trade.md",
    "../World Building/Practical/Travel_and_Distance.md",
    "../World Building/Organizations/Organizations_Overview.md",
    "../World Building/Religion/Religious_Practices.md"
  ]
}
```

**Success Criteria**:
- [ ] Chapter added in correct position
- [ ] All four practical info files included
- [ ] JSON is valid (no syntax errors)
- [ ] Build script runs successfully
- [ ] PDF generates with new chapter in correct order

**Estimate**: 15 minutes

**Labels**: configuration, player-guide, priority-2

**Dependencies**: Issues #3.1, #3.2, #3.3, #3.4 must be complete

---

## Phase 4: Reference Materials (Priority 3)

### Issue #4.1: Create How To Use This Book Guide
**Title**: Create How_To_Use_This_Book.md with navigation and usage guide

**Description**:
Create an introduction that explains how to use the player's guide, distinguishing player-facing from DM-only content, and providing navigation guidance.

**Location**: `World Building/Introduction/How_To_Use_This_Book.md`

**Content Requirements**:
- **Purpose of This Book**:
  - What this guide contains
  - Who should read it (players)
  - When to reference it (character creation, during play)
- **How to Navigate**:
  - Chapter overview and purpose of each section
  - What to read first (character creation)
  - What to reference during play (Life in Aevoria)
  - What to read for deeper lore (The Wider World)
- **Player vs. DM Content**:
  - What's in this book vs. the DM's Guide
  - "Your character would know..." framing
  - When to ask your DM questions
  - Avoiding spoilers and meta-gaming
- **Quick Reference Guide**:
  - "I need to..." quick-reference index
    - "...create a character" → Character Creation chapter
    - "...know travel time" → Travel and Distance section
    - "...find an item price" → Currency and Trade section
    - "...learn about a region" → The Wider World chapter
    - etc.
- **Reading Tips**:
  - You don't need to read everything before playing
  - Chapter dependency (what to read in order)
  - Skippable sections for different play styles

**Formatting**:
- Use Homebrewery markdown syntax
- Keep concise (2-3 pages maximum)
- Use lists and callouts for quick reference index
- Use `{{note}}` blocks for important navigation tips

**Success Criteria**:
- [ ] Clear explanation of book purpose
- [ ] Navigation guidance provided
- [ ] Player vs. DM content distinction clear
- [ ] Quick reference index useful
- [ ] Concise (not overwhelming)
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 1-2 hours

**Labels**: content-creation, reference, priority-3, player-guide

**Dependencies**: All Phase 2 and 3 issues should be complete for accurate chapter references

---

### Issue #4.2: Create Common Goods and Services Guide
**Title**: Create Common_Goods_and_Services.md with shopping reference

**Description**:
Create a detailed shopping reference for common goods and services available in different settlements throughout Aevoria.

**Location**: `World Building/Practical/Common_Goods_and_Services.md`

**Content Requirements**:
- **By Settlement Size**:
  - What's available in different settlement sizes
  - Village (population <1,000)
  - Town (population 1,000-6,000)
  - City (population 6,000-25,000)
  - Metropolis (population 25,000+)
- **Common Goods**:
  - Food and provisions
  - Clothing and textiles
  - Tools and equipment
  - Animals and tack
  - Books and writing materials
  - Alchemical items (basic)
- **Common Services**:
  - Skilled labor (blacksmith, carpenter, etc.)
  - Professional services (scribe, lawyer, sage)
  - Entertainment and leisure
  - Magical services (spellcasting for hire)
  - Transportation and guides
- **Hireling Costs**:
  - Unskilled labor (per day)
  - Skilled labor (per day/per job)
  - Mercenaries and guards (per day)
  - Specialists (healer, translator, etc.)
  - Retainers and followers
- **Regional Specialties**:
  - Unique goods available only in specific regions
  - Regional crafts and exports
  - Cultural items

**Formatting**:
- Use Homebrewery markdown syntax
- Extensive tables for goods and services
- Organize by category, then by settlement size
- Use `\page` breaks between major categories

**Success Criteria**:
- [ ] Comprehensive item and service list
- [ ] Settlement availability clearly indicated
- [ ] Hireling costs standardized
- [ ] Regional specialties included
- [ ] Practical for quick reference during play
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2 hours

**Labels**: content-creation, reference, priority-3, player-guide

**Dependencies**: Issue #3.1 (Currency and Trade) should be complete for consistency

---

### Issue #4.3: Create Glossary
**Title**: Create Glossary.md with terms and pronunciation guide

**Description**:
Create a comprehensive glossary of terms, places, organizations, and names with pronunciation guides and brief definitions.

**Location**: `World Building/Appendix/Glossary.md`

**Content Requirements**:
- **Terms and Concepts**:
  - Unique world terms (Aeorian, Echo, etc.)
  - Magic-related terminology
  - Cultural concepts
  - Historical terms
- **Places**:
  - Regions (all 10)
  - Major settlements
  - Notable landmarks
  - Geographical features
- **Organizations**:
  - Northwatch Wardens
  - Other major factions
  - Historical organizations
- **People** (major NPCs only):
  - Guild leadership
  - Regional rulers (public knowledge)
  - Historical figures
  - Deities
- **Pronunciation Guide**:
  - Phonetic spellings for difficult names
  - Common pronunciation mistakes
  - Regional accent notes
- **Cross-References**:
  - "See also..." references to other sections
  - Page numbers (if possible)

**Formatting**:
- Use Homebrewery markdown syntax
- Alphabetical organization
- Two-column layout where appropriate
- Bold headwords for easy scanning
- Use `\page` breaks to avoid orphaned entries

**Success Criteria**:
- [ ] Comprehensive coverage of important terms
- [ ] Alphabetically organized
- [ ] Pronunciation guides for difficult names
- [ ] Brief but informative definitions
- [ ] Cross-references to main content
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 2-3 hours

**Labels**: content-creation, reference, priority-3, player-guide

**Dependencies**: All content chapters should be complete for comprehensive glossary

---

### Issue #4.4: Update Welcome Chapter with Introduction
**Title**: Update players-guide-toc.json to include How To Use This Book

**Description**:
Update the "Welcome to Aevoria" chapter to include the new "How To Use This Book" introduction as the first file.

**Location**: `build/players-guide-toc.json`

**Changes Required**:
Update "Welcome to Aevoria" chapter to include introduction first:
```json
{
  "chapter": "Welcome to Aevoria",
  "files": [
    "../World Building/Introduction/How_To_Use_This_Book.md",
    "../World Building/Regions/00_Master_Index.md"
  ]
}
```

Also update "Appendix" chapter to include new glossary:
```json
{
  "chapter": "Appendix",
  "files": [
    "../World Building/Regions/Northreach/SongsOfTheNorthreach.md",
    "../World Building/Regions/Northreach/Northreach_Journal_and_Lore.md",
    "../World Building/Appendix/Glossary.md"
  ]
}
```

**Success Criteria**:
- [ ] How To Use This Book added as first file in Welcome chapter
- [ ] Glossary added to Appendix chapter
- [ ] JSON is valid (no syntax errors)
- [ ] Build script runs successfully
- [ ] PDF generates with files in correct order

**Estimate**: 15 minutes

**Labels**: configuration, player-guide, priority-3

**Dependencies**: Issues #4.1 and #4.3 must be complete

---

## Phase 5: Content Review and Cleanup

### Issue #5.1: Review Region Files for DM-Only Secrets
**Title**: Audit all region files for DM-only content and mark for potential separation

**Description**:
Review all 10 region files in the player's guide to identify content that should potentially be moved to the DM's guide, particularly related to the Aeorian Echo and other campaign secrets.

**Files to Review**:
- `World Building/Regions/01_Northreach.md`
- `World Building/Regions/02_Solaris_Dominion.md`
- `World Building/Regions/03_Nullwood_Expanse.md`
- `World Building/Regions/04_Stonebound_Depths.md`
- `World Building/Regions/05_Vharoxis.md`
- `World Building/Regions/06_Shattered_Coast.md`
- `World Building/Regions/07_Emberlands.md`
- `World Building/Regions/08_Verdant_Marches.md`
- `World Building/Regions/09_Sunken_Dominion.md`
- `World Building/Regions/10_The_Far_North.md`

**Review Criteria**:
- **DM-Only Content** (mark for removal or relocation):
  - True nature of the Aeorian Echo
  - Secret motivations of NPCs
  - Hidden agendas of organizations
  - Specific dungeon/adventure details
  - Mechanical secrets (hidden stats, special abilities)
  - Plot hooks and story secrets
- **Player-Appropriate Content** (can stay):
  - Geography and climate
  - Major settlements and landmarks
  - Common knowledge about culture and politics
  - Public history and legends
  - "What you've heard" rumors (even if false)
  - General NPC descriptions (personality, appearance, public role)

**Output**:
Create a document `World Building/DMEyesOnly/Region_Content_Audit.md` that lists:
- Content identified as DM-only by file and section
- Recommendation (remove, move to DM guide, or rephrase as rumor)
- Priority (high/medium/low based on spoiler severity)

**Success Criteria**:
- [ ] All 10 region files reviewed
- [ ] DM-only content identified
- [ ] Audit document created with recommendations
- [ ] No changes made to files yet (just identification)
- [ ] Priority assigned to each identified item

**Estimate**: 3-4 hours

**Labels**: content-review, dm-secrets, priority-medium, player-guide

**Dependencies**: None

---

### Issue #5.2: Update Master Index as Player Primer
**Title**: Reframe 00_Master_Index.md as "Aevoria at a Glance" player primer

**Description**:
Edit the `00_Master_Index.md` file to reframe it as a high-level player-facing primer about Aevoria, removing DM-only information and making it more welcoming for new players.

**Location**: `World Building/Regions/00_Master_Index.md`

**Changes Required**:
- **Reframe Opening**:
  - Change from encyclopedia/index tone to welcoming introduction
  - "Welcome, adventurer" framing
  - Set expectations for what players are about to discover
- **Content Adjustments**:
  - Keep: High-level world overview, geography, major regions
  - Keep: Common knowledge about history and current state
  - Keep: General tone and feel of the world
  - Remove: DM-only secrets or campaign spoilers
  - Rephrase: Any plot-relevant information as "rumors" or "what you've heard"
- **Add Sections**:
  - Brief explanation of where the campaign starts (Northreach)
  - Why adventurers come to this world
  - What makes Aevoria unique and interesting
- **Structure**:
  - Make scannable with clear headings
  - Use callout boxes for key information
  - Add "What to Read Next" pointers

**Success Criteria**:
- [ ] Tone is welcoming and player-focused
- [ ] DM-only content removed or rephrased
- [ ] Clear introduction to what Aevoria is
- [ ] Maintains useful overview information
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 1 hour

**Labels**: content-edit, player-guide, priority-medium

**Dependencies**: Issue #5.1 should be complete to identify DM-only content

---

### Issue #5.3: Review Northreach Setting Primer
**Title**: Ensure Northreach_Setting_Primer.md contains only player knowledge

**Description**:
Review and edit the `Northreach_Setting_Primer.md` file to ensure it contains only player-appropriate information, adding "Common Knowledge" sections if needed.

**Location**: `World Building/Regions/Northreach/Northreach_Setting_Primer.md`

**Review Focus**:
- Does it reveal campaign secrets? (Aeorian Echo, etc.)
- Does it contain adventure spoilers?
- Are NPC descriptions player-appropriate?
- Is the tone right for player-facing content?

**Potential Additions**:
- **"Common Knowledge" Section**:
  - What everyone in Northreach knows
  - Local legends and superstitions
  - Recent events (last year)
- **"What You've Heard" Section**:
  - Rumors and gossip (may or may not be true)
  - Stories from other adventurers
  - News from neighboring regions
- **Player-Useful Information**:
  - Where to buy supplies
  - Where to find work
  - Important NPCs and their public roles
  - Local customs and etiquette

**Success Criteria**:
- [ ] File reviewed for player-appropriateness
- [ ] DM-only content removed or rephrased
- [ ] Common Knowledge section added (if needed)
- [ ] What You've Heard section added (if helpful)
- [ ] Practical player information emphasized
- [ ] Properly formatted for Homebrewery
- [ ] Builds successfully in PDF

**Estimate**: 1 hour

**Labels**: content-edit, player-guide, priority-medium, northreach

**Dependencies**: Issue #5.1 should be complete to identify DM-only content

---

## Phase 6: Build Testing and Validation

### Issue #6.1: Complete Build Test with All New Content
**Title**: Test full PDF build with all new content and validate formatting

**Description**:
Perform a complete build test of the updated player's guide with all new content chapters, reviewing the PDF output for formatting issues, page breaks, and overall quality.

**Tasks**:
1. Ensure all new markdown files exist and are complete
2. Verify `players-guide-toc.json` includes all new chapters
3. Run build script: `./build.sh --players`
4. Review generated PDF thoroughly:
   - Check table of contents
   - Verify chapter order and flow
   - Check page breaks and pagination
   - Verify Homebrewery formatting (tables, callouts, etc.)
   - Check for orphaned headings or awkward breaks
   - Verify images render correctly
   - Check for formatting inconsistencies
5. Create list of formatting issues to fix
6. Fix identified issues
7. Rebuild and retest

**Success Criteria**:
- [ ] Build completes successfully without errors
- [ ] PDF generates without warnings
- [ ] All chapters present in correct order
- [ ] Table of contents accurate
- [ ] Page breaks appropriate
- [ ] Homebrewery formatting correct throughout
- [ ] No major formatting issues
- [ ] Document is professional quality

**Estimate**: 1 hour

**Labels**: testing, build, priority-high, player-guide

**Dependencies**: All Phase 2, 3, and 4 issues must be complete

---

### Issue #6.2: User Testing with New Players
**Title**: Conduct user testing with new players and gather feedback

**Description**:
Test the updated player's guide with actual new players to validate that it meets the goals of being a practical, usable reference for character creation and gameplay.

**Testing Procedure**:
1. **Recruit testers** (2-3 new players who haven't played in this campaign)
2. **Character Creation Test**:
   - Give players the PDF
   - Ask them to create a character using only the guide
   - Observe where they struggle or get confused
   - Note what questions they ask
   - Time how long it takes
3. **Reference Test**:
   - Ask testers to find specific information:
     - "How much does a night at an inn cost?"
     - "How long does it take to travel from Waystone Inn to Welton?"
     - "What languages are common in Northreach?"
     - "How do I interact with the Northwatch Wardens?"
   - Time how long it takes to find each answer
   - Note if they look in the right places
4. **General Feedback**:
   - What did they like?
   - What was confusing?
   - What was missing?
   - Did they feel prepared to play?
   - Would they reference this during play?

**Feedback Document**:
Create `World Building/Campaign Assets/Player_Guide_Testing_Feedback.md` with:
- Tester profiles (experience level)
- Character creation observations
- Reference finding results
- General feedback and quotes
- Recommended changes

**Success Criteria**:
- [ ] 2-3 testers recruited
- [ ] Character creation test completed
- [ ] Reference test completed
- [ ] General feedback collected
- [ ] Feedback document created
- [ ] Major issues identified for fixing

**Estimate**: 2-3 hours (not including tester time)

**Labels**: testing, user-feedback, priority-high, player-guide

**Dependencies**: Issue #6.1 must be complete (need finalized PDF)

---

## Summary

### Total Issues: 22

**Phase 1** (Complete): 1 issue
**Phase 2** (Priority 1): 4 issues
**Phase 3** (Priority 2): 5 issues
**Phase 4** (Priority 3): 4 issues
**Phase 5** (Review): 3 issues
**Phase 6** (Testing): 2 issues

### Estimated Total Time: 40-50 hours

### Milestone: Player's Guide v2.0

### Labels to Create:
- `content-creation`
- `content-edit`
- `content-review`
- `character-creation`
- `practical-info`
- `reference`
- `player-guide`
- `worldbuilding`
- `configuration`
- `testing`
- `user-feedback`
- `build`
- `priority-1`
- `priority-2`
- `priority-3`
- `priority-high`
- `priority-medium`
- `dm-secrets`
- `northreach`
- `religion`

---

## Next Steps

1. **Create all issues in GitHub** using the templates above
2. **Assign milestone** "Player's Guide v2.0" to all issues
3. **Begin with Phase 2** (Priority 1) - Character Creation content
4. **Work through phases sequentially** to ensure dependencies are met
5. **Test regularly** as new content is added
6. **Iterate based on feedback** from testing phases

---

## Notes

- Issues are designed to be granular and independently completable
- Each issue has clear acceptance criteria and estimates
- Dependencies are explicitly noted
- Phases can overlap if dependencies allow
- Testing should happen throughout, not just at the end
