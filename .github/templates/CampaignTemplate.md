# **Game Master 5e XML Campaign Template**

## **Overview**

This template describes all major element types used in a Game Master 5e campaign XML file. Use this as a reference when creating or expanding campaign content.

---

## **Table of Contents**

1. [Campaign Root Structure](#campaign-root-structure)
2. [Player Characters](#player-characters)
3. [Non-Player Characters](#non-player-characters)
4. [Monsters & Statblocks](#monsters--statblocks)
5. [Adventures & Encounters](#adventures--encounters)
6. [Encounters In Detail](#encounters-in-detail)
7. [Items & Loot](#items--loot)
8. [Ability Scores & Modifiers](#ability-scores--modifiers)
9. [Skill IDs Reference](#skill-ids-reference)
10. [School IDs & Spell References](#school-ids--spell-references)

---

## **Campaign Root Structure**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<data version="5">
  <campaign>
    <!-- Campaign metadata -->
    <name>Campaign Name</name>
    <imageData>
      <uniqueID>###</uniqueID>  <!-- Unique image reference ID -->
    </imageData>
    
    <!-- Player Characters -->
    <pc>...</pc>
    <pc>...</pc>
    
    <!-- Non-Player Characters (friendly) -->
    <npc>...</npc>
    <npc>...</npc>
    
    <!-- Adventures (contain encounters) -->
    <adventure>...</adventure>
    <adventure>...</adventure>
    
    <!-- Items, equipment, loot -->
    <item>...</item>
    <item>...</item>
  </campaign>
</data>
```

**Important:** 
- Always start with `<?xml version="1.0" encoding="UTF-8"?>`
- Use `<data version="5">` as root (NOT `<compendium>`)
- All characters and NPCs are direct children of `<campaign>`
- Adventures contain encounters as children

---

## **Player Characters**

### **Basic PC Structure**

```xml
<pc>
  <uid>###</uid>                      <!-- Unique ID for this character -->
  <label>Display Name</label>         <!-- Name shown in lists -->
  <name>Race Class Level</name>       <!-- Full description (e.g., "Dwarf Fighter 5") -->
  <size>1</size>                      <!-- 0=medium, 1=small, 2=large, 3=huge, 4=gargantuan -->
  <ac>##</ac>                         <!-- Armor Class -->
  <armor>Armor Type</armor>           <!-- What armor they wear -->
  <hpMax>##</hpMax>                   <!-- Max hit points -->
  <hpCurrent>##</hpCurrent>           <!-- Current hit points -->
  <hd>XdY+mod</hd>                    <!-- Hit dice (e.g., "5d8+5") -->
  <speed>30 ft.</speed>               <!-- Movement speed -->
  <init>+#</init>                     <!-- Initiative modifier -->
  
  <!-- Ability Scores (STR, DEX, CON, INT, WIS, CHA) -->
  <abilities>10,14,12,10,10,10</abilities>
  
  <!-- Saving Throws for specific abilities -->
  <savingThrow>
    <ability>1</ability>              <!-- Ability ID (0=STR, 1=DEX, etc.) -->
    <modifier>+3</modifier>           <!-- Modifier -->
  </savingThrow>
  
  <!-- Skill Proficiencies -->
  <skill>
    <id>2</id>                        <!-- Skill ID -->
    <modifier>+5</modifier>           <!-- Modifier including proficiency -->
  </skill>
  
  <passive>##</passive>               <!-- Passive Perception (or Investigation) -->
  <languages>Common, Draconic</languages>
  
  <!-- Character Features/Traits -->
  <trait>
    <name>Trait Name</name>
    <text>Trait description and mechanics</text>
  </trait>
  
  <!-- Actions (attacks, spells, abilities) -->
  <action>
    <name>Longsword</name>
    <text>Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d8+3) slashing damage.</text>
    <attack>
      <name>Longsword</name>
      <atk>+5</atk>                  <!-- Attack roll bonus -->
      <dmg>1d8+3</dmg>               <!-- Damage dice -->
    </attack>
  </action>
  
  <!-- Spells (if spellcaster) -->
  <spell>
    <name>Magic Missile</name>
    <school>2</school>                <!-- School of magic ID -->
    <level>1</level>
    <time>1 action</time>
    <range>120 feet</range>
    <v>1</v>                          <!-- Verbal component -->
    <s>1</s>                          <!-- Somatic component -->
    <duration>Instantaneous</duration>
    <text>SPELL DESCRIPTION</text>
    <sclass>Sorcerer</sclass>
    <sclass>Wizard</sclass>
  </spell>
  
  <!-- Spell slots (if applicable) -->
  <slots>0,4,3,2,0,0,0,0,0,0</slots>
  <slotsCurrent>0,4,3,2,0,0,0,0,0,0</slotsCurrent>
</pc>
```

### **Key PC Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| `<uid>` | Unique identifier | `818` |
| `<label>` | Display name in lists | `"The Cleric"` |
| `<name>` | Full description | `"Dwarf, Hill Cleric 5"` |
| `<size>` | 0=medium, 1=small, 2=large, 3=huge | `0` |
| `<ac>` | Armor Class | `18` |
| `<abilities>` | STR,DEX,CON,INT,WIS,CHA separated by commas | `14,8,15,12,18,10` |
| `<speed>` | Movement per turn | `25 ft.` |
| `<passive>` | Passive Perception/Investigation | `14` |

---

## **Non-Player Characters**

### **Friendly NPC Structure**

```xml
<npc>
  <uid>###</uid>
  <label>Display Name</label>
  <name>Race Type</name>              <!-- e.g., "Human Commoner" -->
  <type>humanoid (human)</type>       <!-- Monster manual type -->
  <alignment>alignment</alignment>    <!-- e.g., "lawful good" -->
  <ac>##</ac>
  <armor>Armor Type</armor>
  <hpMax>##</hpMax>
  <hpCurrent>##</hpCurrent>
  <hd>XdY</hd>
  <speed>30 ft.</speed>
  <abilities>10,10,10,10,10,10</abilities>
  
  <savingThrow>
    <ability>#</ability>
    <modifier>+#</modifier>
  </savingThrow>
  
  <skill>
    <id>#</id>
    <modifier>+#</modifier>
  </skill>
  
  <senses>darkvision 60 ft.</senses>  <!-- Optional special senses -->
  <passive>##</passive>
  <languages>Common</languages>
  <cr>-3</cr>                         <!-- Challenge Rating -->
  
  <!-- Traits/Features -->
  <trait>
    <name>Trait Name</name>
    <text>Description</text>
  </trait>
  
  <!-- Actions -->
  <action>
    <name>Club</name>
    <text>Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.</text>
    <attack>
      <atk>+2</atk>
      <dmg>1d4</dmg>
    </attack>
  </action>
</npc>
```

### **Enemy NPC (with `<enemy>` tag)**

Add `<enemy>1</enemy>` to mark NPCs as hostile:

```xml
<npc>
  <uid>###</uid>
  <enemy>1</enemy>                    <!-- Marks as hostile/enemy -->
  <label>Enemy Name</label>
  <!-- rest of stat block -->
</npc>
```

---

## **Monsters & Statblocks**

### **Complete Monster Statblock**

Monsters use the same structure as NPCs but with richer detail:

```xml
<monster>
  <uid>###</uid>
  <enemy>1</enemy>                    <!-- Mark as hostile -->
  <label>Display Name</label>
  <name>Monster Name</name>
  <size>3</size>                      <!-- 0=tiny, 1=small, 2=medium, 3=large, 4=huge, 5=gargantuan -->
  <type>monstrosity</type>
  <alignment>chaotic evil</alignment>
  <ac>14</ac>
  <armor>natural armor</armor>
  <hpMax>68</hpMax>
  <hpCurrent>68</hpCurrent>
  <hd>8d10+24</hd>
  <speed>30 ft., fly 50 ft.</speed>
  
  <!-- Ability Scores -->
  <abilities>17,16,17,7,12,8</abilities>
  
  <!-- Saving Throws -->
  <savingThrow>
    <ability>1</ability>
    <modifier>+4</modifier>
  </savingThrow>
  
  <!-- Skills -->
  <skill>
    <id>2</id>                       <!-- Skill ID -->
    <modifier>+3</modifier>
  </skill>
  
  <!-- Damage Resistances -->
  <resist>cold, lightning</resist>
  
  <!-- Immunities -->
  <immune>poison</immune>
  <conditionImmune>poisoned</conditionImmune>
  
  <!-- Senses and languages -->
  <senses>darkvision 60 ft.</senses>
  <passive>11</passive>
  <languages>Draconic</languages>
  
  <!-- Challenge Rating -->
  <cr>3</cr>
  
  <!-- Traits (passive abilities) -->
  <trait>
    <name>Tail Spike Regrowth</name>
    <text>The manticore has twenty-four tail spikes. Used spikes regrow when the manticore finishes a long rest.</text>
  </trait>
  
  <!-- Actions -->
  <action>
    <name>Multiattack</name>
    <text>The manticore makes three attacks: one with its bite and two with its claws or three with its tail spikes.</text>
  </action>
  
  <action>
    <name>Bite</name>
    <text>Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage.</text>
    <attack>
      <atk>+5</atk>
      <dmg>1d8+3</dmg>
    </attack>
  </action>
  
  <action>
    <name>Claw</name>
    <text>Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage.</text>
    <attack>
      <atk>+5</atk>
      <dmg>1d6+3</dmg>
    </attack>
  </action>
  
  <action>
    <name>Tail Spike</name>
    <text>Ranged Weapon Attack: +5 to hit, range 100/200 ft., one target. Hit: 7 (1d8+3) piercing damage.</text>
    <attack>
      <atk>+5</atk>
      <dmg>1d8+3</dmg>
    </attack>
  </action>
  
  <!-- Legendary Actions (optional) -->
  <legendary>
    <name>Claw</name>
    <text>The manticore makes a claw attack.</text>
    <attack>
      <atk>+5</atk>
      <dmg>1d6+3</dmg>
    </attack>
  </legendary>
  
  <!-- Reactions (optional) -->
  <reaction>
    <name>Parry</name>
    <text>The monster adds 3 to its AC against one melee attack that would hit it.</text>
  </reaction>
  
  <!-- Spells (if applicable) -->
  <spell>
    <name>Fireball</name>
    <school>5</school>
    <level>3</level>
    <time>1 action</time>
    <range>150 feet</range>
    <v>1</v>
    <s>1</s>
    <m>1</m>
    <materials>a tiny ball of bat guano and sulfur</materials>
    <duration>Instantaneous</duration>
    <text>A bright streak flashes from your pointing finger to a point of your choice within range...</text>
    <roll>8d6</roll>
    <sclass>Sorcerer</sclass>
    <sclass>Wizard</sclass>
  </spell>
</monster>
```

---

## **Adventures & Encounters**

### **Adventure Structure**

```xml
<adventure>
  <uid>2015</uid>
  <name>Adventure Title</name>
  <imageData>
    <uniqueID>###</uniqueID>
  </imageData>
  
  <!-- Adventure overview text (use CDATA for long text) -->
  <text><![CDATA[
    Long adventure description goes here.
    Multiple paragraphs supported.
    Use CDATA tags for formatting preservation.
  ]]></text>
  
  <!-- One or more encounters -->
  <encounter>
    <name>Encounter 1 Name</name>
    <uid>2016</uid>
    <state>0</state>
    <current>0</current>
    <round>0</round>
    
    <!-- Combatants -->
    <combatant>
      <monster><!-- statblock --></monster>
    </combatant>
    
    <!-- Notes -->
    <note>
      <name>Description</name>
      <text>DM notes and tactical information</text>
    </note>
  </encounter>
  
  <!-- More encounters can follow -->
  <encounter>...</encounter>
</adventure>
```

---

## **Encounters In Detail**

### **Encounter with Multiple Combatants**

```xml
<encounter>
  <name>Barracks Combat</name>
  <uid>2116</uid>
  <state>1</state>                    <!-- 0=not started, 1=in progress, 2=finished -->
  <current>0</current>                <!-- Current round -->
  <round>0</round>
  
  <!-- First combatant (named reference to creature) -->
  <combatant>
    <initiative>11</initiative>       <!-- Initiative roll -->
    <monster>
      <uid>1002</uid>                 <!-- Reference to a predefined monster -->
    </monster>
  </combatant>
  
  <!-- Second combatant (custom creature) -->
  <combatant>
    <initiative>11</initiative>
    <monster>
      <uid>1003</uid>
      <label>Redbrand Ruffian 1</label>
      <enemy>1</enemy>
      <name>Redbrand Ruffian</name>
      <type>humanoid (human)</type>
      <alignment>neutral evil</alignment>
      <ac>14</ac>
      <armor>studded leather armor</armor>
      <hpMax>16</hpMax>
      <hpCurrent>16</hpCurrent>
      <hd>3d8+3</hd>
      <speed>30 ft.</speed>
      <abilities>11,14,12,9,9,11</abilities>
      <skill>
        <id>7</id>
        <modifier>+2</modifier>
      </skill>
      <passive>9</passive>
      <languages>Common</languages>
      <cr>0</cr>
      
      <action>
        <name>Multiattack</name>
        <text>The ruffian makes two melee attacks.</text>
      </action>
      
      <action>
        <name>Shortsword</name>
        <text>Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.</text>
        <attack>
          <name>Shortsword</name>
          <atk>+4</atk>
          <dmg>1d6+2</dmg>
        </attack>
      </action>
    </monster>
  </combatant>
  
  <!-- Player character as combatant -->
  <combatant>
    <monster>
      <uid>###</uid>                  <!-- Reference to a PC -->
    </monster>
  </combatant>
  
  <!-- DM Notes -->
  <note>
    <name>Tactics</name>
    <text>The ruffians use standard tactics: surround isolated targets, use cover, retreat if reduced to less than half HP.</text>
  </note>
  
  <note>
    <name>Loot</name>
    <text>Each ruffian carries 15 gp and a shortsword (5 gp).</text>
  </note>
</encounter>
```

### **Encounter with Hidden Combatants**

```xml
<combatant>
  <hidden>1</hidden>                  <!-- Mark as hidden until revealed -->
  <monster>
    <uid>###</uid>
    <label>Ambush Archer</label>
    <!-- stat block -->
  </monster>
</combatant>
```

### **Encounter State Values**

| State | Meaning |
|-------|---------|
| `0` | Not started |
| `1` | In progress / active |
| `2` | Finished / completed |

---

## **Items & Loot**

### **Basic Item Structure**

```xml
<item>
  <name>Item Name</name>
  <text>Item description and mechanical effects</text>
  <type>##</type>                    <!-- Item type ID (see types below) -->
  <weight>0.5</weight>               <!-- Weight in pounds (optional) -->
  <rarity>rare</rarity>              <!-- Rarity (optional) -->
</item>
```

### **Item Type IDs**

| ID | Type |
|----|----|
| `1` | Armor |
| `2` | Shield |
| `3` | Weapon |
| `4` | Wondrous Item |
| `12` | Potion |
| `13` | Scroll |
| `14` | Ring |
| `15` | Wand |
| `16` | Rod |

### **Example Items**

```xml
<item>
  <name>Potion of Healing</name>
  <text>You regain 2d4+2 hit points when you drink this potion. The potion's red liquid glimmers when agitated.</text>
  <type>12</type>
  <weight>0.5</weight>
  <rarity>common</rarity>
</item>

<item>
  <name>Longsword +1</name>
  <text>You have a +1 bonus to attack and damage rolls made with this magic weapon.</text>
  <type>3</type>
  <weight>3</weight>
  <rarity>uncommon</rarity>
</item>

<item>
  <name>Bag of Holding</name>
  <text>This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet.</text>
  <type>4</type>
  <rarity>uncommon</rarity>
</item>
```

---

## **Ability Scores & Modifiers**

### **Ability Score Order**

Abilities are always stored in this order, separated by commas:

```
STR, DEX, CON, INT, WIS, CHA
```

Example: `<abilities>15,10,14,8,13,12</abilities>`

### **Ability Index Reference**

| Index | Ability | Short |
|-------|---------|-------|
| 0 | Strength | STR |
| 1 | Dexterity | DEX |
| 2 | Constitution | CON |
| 3 | Intelligence | INT |
| 4 | Wisdom | WIS |
| 5 | Charisma | CHA |

### **Calculating Modifiers**

Modifier = (Ability Score - 10) / 2 (rounded down)

| Score | Modifier |
|-------|----------|
| 8 | -1 |
| 10 | +0 |
| 12 | +1 |
| 14 | +2 |
| 16 | +3 |
| 18 | +4 |
| 20 | +5 |

---

## **Skill IDs Reference**

Use these IDs in `<skill><id>###</id>` tags:

| ID | Skill | Ability |
|----|----|---------|
| 0 | Acrobatics | DEX |
| 1 | Animal Handling | WIS |
| 2 | Arcana | INT |
| 3 | Athletics | STR |
| 4 | Deception | CHA |
| 5 | History | INT |
| 6 | Insight | WIS |
| 7 | Intimidation | CHA |
| 8 | Investigation | INT |
| 9 | Medicine | WIS |
| 10 | Nature | INT |
| 11 | Perception | WIS |
| 12 | Performance | CHA |
| 13 | Persuasion | CHA |
| 14 | Religion | INT |
| 15 | Sleight of Hand | DEX |
| 16 | Stealth | DEX |
| 17 | Survival | WIS |

---

## **School IDs & Spell References**

### **School of Magic IDs**

Use these in `<spell><school>##</school>` tags:

| ID | School |
|----|--------|
| 0 | (Not defined) |
| 1 | Abjuration |
| 2 | Conjuration |
| 3 | Divination |
| 4 | Enchantment |
| 5 | Evocation |
| 6 | Illusion |
| 7 | Necromancy |
| 8 | Transmutation |

### **Spell Component Notation**

- `<v>1</v>` = Verbal component required
- `<s>1</s>` = Somatic component required
- `<m>1</m>` = Material component required (usually listed in `<materials>` tag)
- Omit tags for components not required

### **Spell Duration Examples**

- `<duration>Instantaneous</duration>`
- `<duration>1 minute</duration>`
- `<duration>Concentration, up to 1 minute</duration>`
- `<duration>1 hour</duration>`
- `<duration>24 hours</duration>`

### **Spell Time (Casting Time) Examples**

- `<time>1 action</time>` – Standard action
- `<time>1 bonus action</time>` – Bonus action
- `<time>1 reaction</time>` – Reaction (triggered)
- `<time>1 minute</time>` – 1 minute casting
- `<time>10 minutes</time>` – 10 minute casting

### **Spell Class Notation**

Include multiple `<sclass>` tags for each class that can use the spell:

```xml
<sclass>Bard</sclass>
<sclass>Cleric</sclass>
<sclass>Druid</sclass>
<sclass>Sorcerer</sclass>
<sclass>Wizard</sclass>
```

---

## **Image References**

Every campaign, adventure, and major element can have an `<imageData>` tag with a unique ID:

```xml
<imageData>
  <uniqueID>140</uniqueID>  <!-- Unique number for this image -->
</imageData>
```

Generate unique IDs when creating new elements. The system uses these to associate images with creatures, items, and locations.

---

## **CDATA for Long Text**

Use CDATA blocks for adventure descriptions, lengthy trait text, or notes with special formatting:

```xml
<text><![CDATA[
This is a long description that spans
multiple lines and preserves all
formatting exactly as written.

You can include line breaks and special characters
without XML escaping.
]]></text>
```

---

## **Complete Campaign Example**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<data version="5">
  <campaign>
    <name>Example Campaign</name>
    <imageData>
      <uniqueID>1</uniqueID>
    </imageData>
    
    <!-- Player Character -->
    <pc>
      <uid>100</uid>
      <label>Aragorn</label>
      <name>Human Ranger 5</name>
      <ac>15</ac>
      <armor>Leather Armor</armor>
      <hpMax>40</hpMax>
      <hpCurrent>40</hpCurrent>
      <hd>5d10</hd>
      <speed>30 ft.</speed>
      <abilities>15,16,14,10,13,11</abilities>
      <skill><id>1</id><modifier>+4</modifier></skill>
      <skill><id>11</id><modifier>+5</modifier></skill>
      <passive>15</passive>
      <languages>Common</languages>
    </pc>
    
    <!-- Friendly NPC -->
    <npc>
      <uid>101</uid>
      <label>Innkeeper Marta</label>
      <name>Human Commoner</name>
      <type>humanoid (human)</type>
      <alignment>neutral good</alignment>
      <hpCurrent>4</hpCurrent>
      <hd>1d8</hd>
      <abilities>10,10,10,10,10,10</abilities>
    </npc>
    
    <!-- Enemy NPC -->
    <npc>
      <uid>102</uid>
      <enemy>1</enemy>
      <label>Goblin Chief</label>
      <name>Goblin</name>
      <type>humanoid (goblinoid)</type>
      <alignment>neutral evil</alignment>
      <ac>15</ac>
      <hpMax>7</hpMax>
      <hpCurrent>7</hpCurrent>
      <hd>2d6</hd>
      <abilities>8,14,10,10,8,8</abilities>
      <cr>-1</cr>
      
      <action>
        <name>Scimitar</name>
        <text>Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.</text>
        <attack>
          <atk>+4</atk>
          <dmg>1d6+2</dmg>
        </attack>
      </action>
    </npc>
    
    <!-- Adventure -->
    <adventure>
      <uid>200</uid>
      <name>Goblin Ambush</name>
      <imageData>
        <uniqueID>200</uniqueID>
      </imageData>
      
      <text><![CDATA[
        The party encounters a group of goblins blocking the main road.
        They seem to be hunting for something specific.
      ]]></text>
      
      <encounter>
        <name>Forest Ambush</name>
        <uid>201</uid>
        <state>0</state>
        <current>0</current>
        <round>0</round>
        
        <combatant>
          <monster>
            <uid>102</uid>  <!-- Reference to Goblin Chief defined above -->
          </monster>
        </combatant>
        
        <note>
          <name>Battlefield</name>
          <text>The ambush happens in a forest clearing. Trees provide half cover. A small stream bisects the area.</text>
        </note>
      </encounter>
    </adventure>
    
    <!-- Item Loot -->
    <item>
      <name>Goblin Scimitar</name>
      <text>A poorly crafted but functional scimitar. Worth 5 gp.</text>
      <type>3</type>
      <weight>2</weight>
    </item>
  </campaign>
</data>
```

---

## **Common Patterns**

### **Referencing Existing Creatures in Encounters**

If a creature is defined elsewhere in the campaign, you can reference it by UID:

```xml
<combatant>
  <monster>
    <uid>102</uid>  <!-- References the Goblin Chief defined earlier -->
  </monster>
</combatant>
```

### **Creating Inline Creatures**

For one-off creatures only used in one encounter, you can define them inline:

```xml
<combatant>
  <monster>
    <uid>999</uid>
    <enemy>1</enemy>
    <label>Zombie</label>
    <!-- full stat block -->
  </monster>
</combatant>
```

### **Adding Multiple Instances of Same Creature**

Create labeled variants:

```xml
<combatant>
  <monster>
    <uid>103</uid>
    <label>Goblin 1</label>
    <name>Goblin</name>
    <!-- stat block -->
  </monster>
</combatant>

<combatant>
  <monster>
    <uid>104</uid>
    <label>Goblin 2</label>
    <name>Goblin</name>
    <!-- stat block (same or similar) -->
  </monster>
</combatant>
```

---

## **Validation Checklist**

Before considering a campaign file complete:

- [ ] `<?xml version="1.0" encoding="UTF-8"?>` declaration present
- [ ] Root element is `<data version="5">`
- [ ] All opening tags have closing tags
- [ ] All special characters in text are properly escaped or in CDATA
- [ ] All `<uid>` values are unique
- [ ] Ability scores listed in correct order: STR,DEX,CON,INT,WIS,CHA
- [ ] Skills reference valid skill IDs (0-17)
- [ ] Schools of magic reference valid IDs (1-8)
- [ ] Encounters are children of adventures
- [ ] Combatants are children of encounters
- [ ] Monsters are children of combatants
- [ ] Player characters are direct children of campaign
- [ ] NPCs are direct children of campaign
- [ ] Items are direct children of campaign

---

**Last Updated:** December 29, 2025

**Format Version:** Game Master 5e XML (v5)
