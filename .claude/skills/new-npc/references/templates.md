# NPC Templates

## Homebrewery Stat Block

```
{{monster,frame
## NPC Name
*Medium humanoid (human), neutral*
___
**Armor Class** :: 12 (leather armor)
**Hit Points** :: 27 (5d8+5)
**Speed** :: 30 ft.
___
|STR|DEX|CON|INT|WIS|CHA|
|:---:|:---:|:---:|:---:|:---:|:---:|
|10 (+0)|14 (+2)|12 (+1)|13 (+1)|15 (+2)|11 (+0)|
___
**Skills** :: Perception +4, [others as appropriate]
**Senses** :: passive Perception 14
**Languages** :: Common, [others]
**Challenge** :: 1/2 (100 XP)
___
***Flavor Trait.*** One sentence about their personality or something subtly off about them.

### Actions
***Attack Name.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6+2) slashing damage.
}}

{{note
**Personality:** Voice description in one phrase (e.g., "speaks in clipped sentences, never finishes a thought aloud").

*"Example line of dialogue that sounds exactly like them."*

**Knows:** What they know that's useful or dangerous to the party.

**Wants:** Their immediate goal or driving motivation.

**Secret:** What the DM knows that the players don't.
}}
```

---

## XML NPC Entry (Game Master 5e v5)

```xml
<npc>
  <uid>XXXX</uid>
  <name>NPC Name</name>
  <size>M</size>
  <type>humanoid (human)</type>
  <alignment>neutral</alignment>
  <enemy>0</enemy>
  <!-- enemy: 0 = ally/neutral, 1 = hostile -->
  <ac>12</ac>
  <armor>leather armor</armor>
  <hpMax>27</hpMax>
  <hpCurrent>27</hpCurrent>
  <hd>5d8+5</hd>
  <speed>30</speed>
  <abilities>
    <str>10</str>
    <dex>14</dex>
    <con>12</con>
    <int>13</int>
    <wis>15</wis>
    <cha>11</cha>
  </abilities>
  <passive>14</passive>
  <languages>Common</languages>
  <cr>1/2</cr>
  <trait>
    <name>Trait Name</name>
    <text><![CDATA[Description of the trait.]]></text>
  </trait>
  <action>
    <name>Attack Name</name>
    <text><![CDATA[Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6+2) slashing damage.]]></text>
    <attack>
      <atk>4</atk>
      <dmg>1d6+2</dmg>
      <dmgType>slashing</dmgType>
    </attack>
  </action>
</npc>
```

### UID Assignment
- Grep `<uid>` in `LionsdenGameFiles/Northwatch_Wardens.xml` and find the highest value
- Assign the next integer
- UIDs must be unique across the entire campaign file

### enemy field
- `<enemy>0</enemy>` — allies, neutrals, quest-givers, townsfolk
- `<enemy>1</enemy>` — hostiles, monsters, antagonists
