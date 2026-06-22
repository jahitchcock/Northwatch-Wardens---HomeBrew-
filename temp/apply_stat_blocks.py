"""Apply real D&D 5e stat blocks to NPC files, replacing placeholder backtick lines."""
import os, re

ROOT = r"c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)"

# ── Stat block definitions ─────────────────────────────────────────────────────

SB = {}

SB['veteran'] = """\
**Veteran** · *Medium humanoid (any race), any alignment* · CR 3 (700 XP)

| | |
|---|---|
| **Armor Class** | 17 (splint armor) |
| **Hit Points** | 58 (9d8 + 18) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 16 (+3) | 13 (+1) | 14 (+2) | 10 (+0) | 11 (+0) | 10 (+0) |

**Skills** Athletics +5, Perception +2
**Senses** passive Perception 12
**Languages** any one language (usually Common)

**Actions**

**Multiattack.** The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.

**Longsword.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.

**Shortsword.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage.

**Heavy Crossbow.** *Ranged Weapon Attack:* +3 to hit, range 100/400 ft., one target. *Hit:* 6 (1d10 + 1) piercing damage."""

SB['mage'] = """\
**Mage** · *Medium humanoid (any race), any alignment* · CR 6 (2,300 XP)

| | |
|---|---|
| **Armor Class** | 12 (15 with mage armor) |
| **Hit Points** | 40 (9d8) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 9 (−1) | 14 (+2) | 11 (+0) | 17 (+3) | 12 (+1) | 11 (+0) |

**Saving Throws** Int +6, Wis +4
**Skills** Arcana +6, History +6
**Senses** passive Perception 11
**Languages** any four languages

**Spellcasting.** The mage is a 9th-level spellcaster (spell save DC 14, +6 to hit). Wizard spells prepared:

- Cantrips (at will): *fire bolt, light, mage hand, prestidigitation*
- 1st level (4 slots): *detect magic, mage armor, magic missile, shield*
- 2nd level (3 slots): *misty step, suggestion*
- 3rd level (3 slots): *counterspell, fireball, fly*
- 4th level (3 slots): *greater invisibility, ice storm*
- 5th level (1 slot): *cone of cold*

**Actions**

**Dagger.** *Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."""

SB['knight'] = """\
**Knight** · *Medium humanoid (any race), any alignment* · CR 3 (700 XP)

| | |
|---|---|
| **Armor Class** | 18 (plate armor) |
| **Hit Points** | 52 (8d8 + 16) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 16 (+3) | 11 (+0) | 14 (+2) | 11 (+0) | 11 (+0) | 15 (+2) |

**Saving Throws** Con +4, Wis +2
**Senses** passive Perception 10
**Languages** any one language (usually Common)

**Brave.** The knight has advantage on saving throws against being frightened.

**Actions**

**Multiattack.** The knight makes two melee attacks.

**Greatsword.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 10 (2d6 + 3) slashing damage.

**Heavy Crossbow.** *Ranged Weapon Attack:* +2 to hit, range 100/400 ft., one target. *Hit:* 5 (1d10) piercing damage.

**Leadership (Recharges after a Short or Long Rest).** For 1 minute, the knight can utter a special command or warning whenever a nonhostile creature within 30 ft. that it can see makes an attack roll or saving throw. That creature can add a d4 to its roll if it can hear and understand the knight.

**Reactions**

**Parry.** The knight adds 2 to its AC against one melee attack that would hit it. The knight must see the attacker and be wielding a melee weapon."""

SB['scout'] = """\
**Scout** · *Medium humanoid (any race), any alignment* · CR 1/2 (100 XP)

| | |
|---|---|
| **Armor Class** | 13 (leather armor) |
| **Hit Points** | 16 (3d8 + 3) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 (+0) | 14 (+2) | 12 (+1) | 11 (+0) | 13 (+1) | 11 (+0) |

**Skills** Nature +4, Perception +5, Stealth +6, Survival +5
**Senses** passive Perception 15
**Languages** any one language (usually Common)

**Keen Hearing and Sight.** The scout has advantage on Wisdom (Perception) checks that rely on hearing or sight.

**Actions**

**Multiattack.** The scout makes two melee attacks or two ranged attacks.

**Shortsword.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage.

**Longbow.** *Ranged Weapon Attack:* +4 to hit, range 150/600 ft., one target. *Hit:* 6 (1d8 + 2) piercing damage."""

SB['priest'] = """\
**Priest** · *Medium humanoid (any race), any alignment* · CR 2 (450 XP)

| | |
|---|---|
| **Armor Class** | 13 (chain shirt) |
| **Hit Points** | 27 (5d8 + 5) |
| **Speed** | 25 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 (+0) | 10 (+0) | 12 (+1) | 13 (+1) | 16 (+3) | 13 (+1) |

**Skills** Medicine +7, Persuasion +3, Religion +4
**Senses** passive Perception 13
**Languages** any two languages

**Divine Eminence.** As a bonus action, the priest can expend a spell slot to cause its melee weapon attacks to deal an extra 10 (3d6) radiant damage on a hit until the end of the turn (1d6 extra per slot level above 1st).

**Spellcasting.** The priest is a 5th-level spellcaster (spell save DC 13, +5 to hit). Cleric spells prepared:

- Cantrips (at will): *light, sacred flame, thaumaturgy*
- 1st level (4 slots): *cure wounds, guiding bolt, sanctuary*
- 2nd level (3 slots): *lesser restoration, spiritual weapon*
- 3rd level (2 slots): *dispel magic, spirit guardians*

**Actions**

**Mace.** *Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 3 (1d6) bludgeoning damage."""

SB['wolf_awakened'] = """\
**Awakened Wolf** · *Medium beast, neutral* · CR 1/2 (100 XP)

| | |
|---|---|
| **Armor Class** | 13 (natural armor) |
| **Hit Points** | 11 (2d8 + 2) |
| **Speed** | 40 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 12 (+1) | 15 (+2) | 12 (+1) | 10 (+0) | 12 (+1) | 6 (−2) |

**Skills** Perception +3, Stealth +4
**Senses** passive Perception 13
**Languages** Common (can speak)

**Keen Hearing and Smell.** The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.

**Pack Tactics.** The wolf has advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated.

**Actions**

**Bite.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."""

SB['wolf_awakened_int12'] = """\
**Awakened Wolf (Alpha)** · *Medium beast, neutral* · CR 1 (200 XP)

| | |
|---|---|
| **Armor Class** | 13 (natural armor) |
| **Hit Points** | 22 (4d8 + 4) |
| **Speed** | 40 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 14 (+2) | 15 (+2) | 12 (+1) | 12 (+1) | 13 (+1) | 8 (−1) |

**Skills** Perception +5, Stealth +4
**Senses** passive Perception 15
**Languages** Common (can speak)

**Keen Hearing and Smell.** The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.

**Pack Tactics.** The wolf has advantage on attack rolls against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated.

**Actions**

**Bite.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Strength saving throw or be knocked prone.

**Terrifying Howl.** Each creature within 30 ft. that can hear the wolf must succeed on a DC 11 Wisdom saving throw or be frightened until the end of its next turn."""

SB['ogre'] = """\
**Ogre** · *Large giant, chaotic evil* · CR 2 (450 XP)

| | |
|---|---|
| **Armor Class** | 11 (hide armor) |
| **Hit Points** | 59 (7d10 + 21) |
| **Speed** | 40 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 19 (+4) | 8 (−1) | 16 (+3) | 5 (−3) | 7 (−2) | 7 (−2) |

**Senses** darkvision 60 ft., passive Perception 8
**Languages** Common, Giant

**Actions**

**Greatclub.** *Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 13 (2d8 + 4) bludgeoning damage.

**Javelin.** *Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 30/120 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage."""

SB['adult_silver_dragon'] = """\
**Adult Silver Dragon** · *Huge dragon, lawful good* · CR 16 (15,000 XP)

| | |
|---|---|
| **Armor Class** | 19 (natural armor) |
| **Hit Points** | 243 (18d12 + 126) |
| **Speed** | 40 ft., fly 80 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 27 (+8) | 10 (+0) | 25 (+7) | 16 (+3) | 13 (+1) | 21 (+5) |

**Saving Throws** Dex +5, Con +12, Wis +6, Cha +10
**Skills** Arcana +8, History +8, Perception +11, Stealth +5
**Damage Immunities** cold
**Senses** blindsight 60 ft., darkvision 120 ft., passive Perception 21
**Languages** Common, Draconic

**Legendary Resistance (3/Day).** If the dragon fails a saving throw, it can choose to succeed instead.

**Actions**

**Multiattack.** The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.

**Bite.** *Melee Weapon Attack:* +13 to hit, reach 10 ft., one target. *Hit:* 19 (2d10 + 8) piercing damage.

**Claw.** *Melee Weapon Attack:* +13 to hit, reach 5 ft., one target. *Hit:* 15 (2d6 + 8) slashing damage.

**Tail.** *Melee Weapon Attack:* +13 to hit, reach 15 ft., one target. *Hit:* 17 (2d8 + 8) bludgeoning damage.

**Frightful Presence.** Each creature of the dragon's choice within 120 ft. that is aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute.

**Breath Weapons (Recharge 5–6).** The dragon uses one of the following:
- **Cold Breath.** 60-foot cone. DC 20 Con save, 58 (13d8) cold damage on a failed save, half on a success.
- **Paralyzing Breath.** 60-foot cone. DC 20 Con save or paralyzed for 1 minute.

**Legendary Actions** (3/turn)

**Detect.** The dragon makes a Wisdom (Perception) check.

**Tail Attack.** The dragon makes a tail attack.

**Wing Attack (Costs 2 Actions).** Each creature within 10 ft. must succeed on a DC 22 Dex save or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can fly up to half its flying speed."""

SB['young_green_dragon'] = """\
**Young Green Dragon** · *Large dragon, lawful evil* · CR 8 (3,900 XP)

| | |
|---|---|
| **Armor Class** | 18 (natural armor) |
| **Hit Points** | 136 (16d10 + 48) |
| **Speed** | 40 ft., fly 80 ft., swim 40 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 19 (+4) | 12 (+1) | 17 (+3) | 16 (+3) | 13 (+1) | 15 (+2) |

**Saving Throws** Dex +4, Con +6, Wis +4, Cha +5
**Skills** Deception +5, Perception +7, Stealth +4
**Damage Immunities** poison
**Condition Immunities** poisoned
**Senses** blindsight 30 ft., darkvision 120 ft., passive Perception 17
**Languages** Common, Draconic

**Amphibious.** The dragon can breathe air and water.

**Actions**

**Multiattack.** The dragon makes three attacks: one with its bite and two with its claws.

**Bite.** *Melee Weapon Attack:* +7 to hit, reach 10 ft., one target. *Hit:* 15 (2d10 + 4) piercing damage plus 7 (2d6) poison damage.

**Claw.** *Melee Weapon Attack:* +7 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) slashing damage.

**Poison Breath (Recharge 5–6).** The dragon exhales poisonous gas in a 30-foot cone. Each creature in that area must make a DC 14 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much on a successful one."""

SB['archmage'] = """\
**Archmage** · *Medium humanoid (any race), any alignment* · CR 12 (8,400 XP)

| | |
|---|---|
| **Armor Class** | 12 (15 with mage armor) |
| **Hit Points** | 99 (18d8 + 18) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 (+0) | 14 (+2) | 12 (+1) | 20 (+5) | 15 (+2) | 16 (+3) |

**Saving Throws** Int +9, Wis +6
**Skills** Arcana +13, History +13
**Damage Resistances** damage from spells; bludgeoning, piercing, and slashing from nonmagical attacks (from stoneskin)
**Senses** passive Perception 12
**Languages** any six languages

**Magic Resistance.** The archmage has advantage on saving throws against spells and other magical effects.

**Spellcasting.** The archmage is an 18th-level spellcaster (spell save DC 17, +9 to hit). At will: *disguise self, invisibility*. Prepared wizard spells:

- Cantrips: *fire bolt, light, mage hand, prestidigitation, shocking grasp*
- 1st (4 slots): *detect magic, identify, mage armor\*, magic missile*
- 2nd (3 slots): *detect thoughts, mirror image, misty step*
- 3rd (3 slots): *counterspell, fly, lightning bolt*
- 4th (3 slots): *banishment, fire shield, stoneskin\**
- 5th (3 slots): *cone of cold, scrying, wall of force*
- 6th (1 slot): *globe of invulnerability*
- 7th (1 slot): *teleport*
- 8th (1 slot): *mind blank\**
- 9th (1 slot): *time stop*

*\*Cast on self before combat.*

**Actions**

**Dagger.** *Melee or Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 4 (1d4 + 2) piercing damage."""

SB['lich'] = """\
**Lich** · *Medium undead, any evil alignment* · CR 21 (33,000 XP)

| | |
|---|---|
| **Armor Class** | 17 (natural armor) |
| **Hit Points** | 135 (18d8 + 54) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 (+0) | 16 (+3) | 16 (+3) | 20 (+5) | 14 (+2) | 16 (+3) |

**Saving Throws** Con +10, Int +12, Wis +9
**Skills** Arcana +18, History +12, Insight +9, Perception +9
**Damage Resistances** cold, lightning, necrotic
**Damage Immunities** poison; bludgeoning, piercing, and slashing from nonmagical weapons
**Condition Immunities** charmed, exhaustion, frightened, paralyzed, poisoned
**Senses** truesight 120 ft., passive Perception 19
**Languages** Common plus up to five other languages

**Legendary Resistance (3/Day).** If the lich fails a saving throw, it can choose to succeed instead.

**Rejuvenation.** If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its hit points.

**Turn Resistance.** The lich has advantage on saving throws against any effect that turns undead.

**Spellcasting.** The lich is an 18th-level spellcaster (spell save DC 20, +12 to hit). Wizard spells prepared:

- Cantrips: *mage hand, prestidigitation, ray of frost*
- 1st (4 slots): *detect magic, magic missile, shield, thunderwave*
- 2nd (3 slots): *acid arrow, detect thoughts, invisibility, mirror image*
- 3rd (3 slots): *animate dead, counterspell, dispel magic, fireball*
- 4th (3 slots): *blight, dimension door*
- 5th (3 slots): *cloudkill, scrying*
- 6th (1 slot): *disintegrate, globe of invulnerability*
- 7th (1 slot): *finger of death, plane shift*
- 8th (1 slot): *dominate monster, power word stun*
- 9th (1 slot): *power word kill*

**Actions**

**Paralyzing Touch.** *Melee Spell Attack:* +12 to hit, reach 5 ft., one creature. *Hit:* 10 (3d6) cold damage. The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute.

**Legendary Actions** (3/turn)

**Cantrip.** The lich casts a cantrip.

**Paralyzing Touch (Costs 2 Actions).** The lich uses its Paralyzing Touch.

**Frightening Gaze (Costs 2 Actions).** The lich fixes its gaze on one creature within 10 ft. DC 18 Wisdom save or frightened for 1 minute.

**Disrupt Life (Costs 3 Actions).** Each living creature within 20 ft. makes a DC 18 Constitution saving throw, taking 21 (6d6) necrotic damage on a failed save, half on a success."""

SB['assassin'] = """\
**Assassin** · *Medium humanoid (any race), any non-good alignment* · CR 8 (3,900 XP)

| | |
|---|---|
| **Armor Class** | 15 (studded leather armor) |
| **Hit Points** | 78 (12d8 + 24) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 (+0) | 16 (+3) | 14 (+2) | 13 (+1) | 11 (+0) | 10 (+0) |

**Saving Throws** Dex +6, Int +4
**Skills** Acrobatics +6, Deception +3, Perception +3, Stealth +9
**Damage Resistances** poison
**Senses** passive Perception 13
**Languages** Thieves' cant plus any two languages

**Assassinate.** During its first turn, the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit against a surprised creature is a critical hit.

**Evasion.** If the assassin makes a Dexterity saving throw for half damage, it takes no damage on a success and half on a failure.

**Sneak Attack (1/Turn).** The assassin deals an extra 13 (4d6) damage when it hits with a weapon attack and has advantage, or when the target is adjacent to an ally of the assassin.

**Actions**

**Multiattack.** The assassin makes two shortsword attacks.

**Shortsword.** *Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 6 (1d6 + 3) piercing damage plus DC 15 Con save or 24 (7d6) poison damage.

**Light Crossbow.** *Ranged Weapon Attack:* +6 to hit, range 80/320 ft., one target. *Hit:* 7 (1d8 + 3) piercing damage plus DC 15 Con save or 24 (7d6) poison damage."""

SB['druid'] = """\
**Druid** · *Medium humanoid (any race), any alignment* · CR 2 (450 XP)

| | |
|---|---|
| **Armor Class** | 11 (16 with barkskin) |
| **Hit Points** | 27 (5d8 + 5) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 (+0) | 12 (+1) | 13 (+1) | 12 (+1) | 15 (+2) | 11 (+0) |

**Skills** Medicine +4, Nature +3, Perception +4
**Senses** passive Perception 14
**Languages** Druidic plus any two languages

**Spellcasting.** The druid is a 4th-level spellcaster (spell save DC 12, +4 to hit). Druid spells prepared:

- Cantrips (at will): *druidcraft, produce flame, shillelagh*
- 1st level (4 slots): *entangle, longstrider, speak with animals, thunderwave*
- 2nd level (3 slots): *animal messenger, barkskin*

**Actions**

**Quarterstaff.** *Melee Weapon Attack:* +2 to hit (+4 with shillelagh), reach 5 ft., one target. *Hit:* 3 (1d6) bludgeoning damage, or 6 (1d8 + 2) bludgeoning damage with shillelagh."""

SB['acolyte'] = """\
**Acolyte** · *Medium humanoid (any race), any alignment* · CR 1/4 (50 XP)

| | |
|---|---|
| **Armor Class** | 10 |
| **Hit Points** | 9 (2d8) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) | 14 (+2) | 11 (+0) |

**Skills** Medicine +4, Religion +2
**Senses** passive Perception 12
**Languages** any one language (usually Common)

**Spellcasting.** The acolyte is a 1st-level spellcaster (spell save DC 12, +4 to hit). Cleric spells prepared:

- Cantrips (at will): *light, sacred flame, thaumaturgy*
- 1st level (3 slots): *bless, cure wounds, sanctuary*

**Actions**

**Club.** *Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) bludgeoning damage."""

SB['berserker'] = """\
**Berserker** · *Medium humanoid (any race), any chaotic alignment* · CR 2 (450 XP)

| | |
|---|---|
| **Armor Class** | 13 (hide armor) |
| **Hit Points** | 67 (9d8 + 27) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 16 (+3) | 12 (+1) | 17 (+3) | 9 (−1) | 11 (+0) | 9 (−1) |

**Senses** passive Perception 10
**Languages** any one language (usually Common)

**Reckless.** At the start of its turn, the berserker can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.

**Actions**

**Greataxe.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 9 (1d12 + 3) slashing damage."""

SB['gladiator'] = """\
**Gladiator** · *Medium humanoid (any race), any alignment* · CR 5 (1,800 XP)

| | |
|---|---|
| **Armor Class** | 16 (studded leather, shield) |
| **Hit Points** | 112 (15d8 + 45) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 18 (+4) | 15 (+2) | 16 (+3) | 10 (+0) | 12 (+1) | 15 (+2) |

**Saving Throws** Str +7, Dex +5, Con +6
**Skills** Athletics +10, Intimidation +5
**Senses** passive Perception 11
**Languages** any one language (usually Common)

**Brave.** The gladiator has advantage on saving throws against being frightened.

**Brute.** A melee weapon deals one extra die of damage when the gladiator hits with it.

**Actions**

**Multiattack.** The gladiator makes three melee attacks or two ranged attacks.

**Spear.** *Melee or Ranged Weapon Attack:* +7 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) if used with two hands in melee.

**Shield Bash.** *Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 9 (2d4 + 4) bludgeoning damage. If target is Medium or smaller, DC 15 Strength save or be knocked prone.

**Reactions**

**Parry.** The gladiator adds 3 to its AC against one melee attack that would hit it. Must see the attacker and be wielding a melee weapon."""

SB['cult_fanatic'] = """\
**Cult Fanatic** · *Medium humanoid (any race), any non-good alignment* · CR 2 (450 XP)

| | |
|---|---|
| **Armor Class** | 13 (leather armor) |
| **Hit Points** | 33 (6d8 + 6) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 (+0) | 14 (+2) | 12 (+1) | 10 (+0) | 13 (+1) | 14 (+2) |

**Skills** Deception +4, Persuasion +4, Religion +2
**Senses** passive Perception 11
**Languages** any one language (usually Common)

**Dark Devotion.** The fanatic has advantage on saving throws against being charmed or frightened.

**Spellcasting.** The fanatic is a 4th-level spellcaster (spell save DC 11, +3 to hit). Cleric spells prepared:

- Cantrips (at will): *light, sacred flame, thaumaturgy*
- 1st level (4 slots): *command, inflict wounds, shield of faith*
- 2nd level (3 slots): *hold person, spiritual weapon*

**Actions**

**Multiattack.** The fanatic makes two melee attacks.

**Dagger.** *Melee or Ranged Weapon Attack:* +4 to hit, reach 5 ft. or range 20/60 ft., one creature. *Hit:* 4 (1d4 + 2) piercing damage."""

SB['noble'] = """\
**Noble** · *Medium humanoid (any race), any alignment* · CR 1/8 (25 XP)

| | |
|---|---|
| **Armor Class** | 15 (breastplate) |
| **Hit Points** | 9 (2d8) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 (+0) | 12 (+1) | 11 (+0) | 12 (+1) | 14 (+2) | 16 (+3) |

**Skills** Deception +5, Insight +4, Persuasion +5
**Senses** passive Perception 12
**Languages** any two languages

**Actions**

**Rapier.** *Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 5 (1d8 + 1) piercing damage.

**Reactions**

**Parry.** The noble adds 2 to its AC against one melee attack that would hit it. Must see the attacker and be wielding a melee weapon."""

SB['spy'] = """\
**Spy** · *Medium humanoid (any race), any alignment* · CR 1 (200 XP)

| | |
|---|---|
| **Armor Class** | 12 |
| **Hit Points** | 27 (6d8) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 (+0) | 15 (+2) | 10 (+0) | 12 (+1) | 14 (+2) | 16 (+3) |

**Skills** Deception +5, Insight +4, Investigation +5, Perception +6, Persuasion +5, Stealth +4
**Senses** passive Perception 16
**Languages** any two languages

**Cunning Action.** On each of its turns, the spy can use a bonus action to Dash, Disengage, or Hide.

**Sneak Attack (1/Turn).** The spy deals an extra 7 (2d6) damage when it hits a target with a weapon attack and has advantage, or when the target is adjacent to an ally of the spy.

**Actions**

**Multiattack.** The spy makes two melee attacks.

**Shortsword.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage.

**Hand Crossbow.** *Ranged Weapon Attack:* +4 to hit, range 30/120 ft., one target. *Hit:* 5 (1d6 + 2) piercing damage."""

SB['commoner'] = """\
**Commoner** · *Medium humanoid (any race), any alignment* · CR 0 (10 XP)

| | |
|---|---|
| **Armor Class** | 10 |
| **Hit Points** | 4 (1d8) |
| **Speed** | 30 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) |

**Senses** passive Perception 10
**Languages** any one language (usually Common)

**Actions**

**Club.** *Melee Weapon Attack:* +2 to hit, reach 5 ft., one target. *Hit:* 2 (1d4) bludgeoning damage."""

SB['faerie_dragon'] = """\
**Faerie Dragon (Violet — Spell Level 5–6)** · *Tiny dragon, chaotic good* · CR 2 (450 XP)

| | |
|---|---|
| **Armor Class** | 13 |
| **Hit Points** | 14 (4d4 + 4) |
| **Speed** | 10 ft., fly 60 ft. |

| STR | DEX | CON | INT | WIS | CHA |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 3 (−4) | 20 (+5) | 13 (+1) | 14 (+2) | 12 (+1) | 16 (+3) |

**Skills** Arcana +4, Perception +3, Stealth +7
**Damage Immunities** none
**Senses** darkvision 60 ft., passive Perception 13
**Languages** Common, Draconic, Sylvan

**Magic Resistance.** The faerie dragon has advantage on saving throws against spells and other magical effects.

**Superior Invisibility.** As a bonus action, the faerie dragon can magically turn invisible until its concentration ends (as a spell). Anything it wears or carries is also invisible.

**Spellcasting.** The faerie dragon is a 5th-level spellcaster (spell save DC 13, +5 to hit). Innate spells (no material components):

- At will: *dancing lights, mage hand, minor illusion*
- 1/day each: *faerie fire, hallucinatory terrain, mirror image, suggestion*

**Actions**

**Bite.** *Melee Weapon Attack:* +7 to hit, reach 5 ft., one creature. *Hit:* 1 piercing damage.

**Euphoric Breath (Recharge 5–6).** The faerie dragon exhales a puff of euphoric gas in a 5-foot cone. Each creature in that area must succeed on a DC 11 Wisdom saving throw or be incapacitated for 1 minute. An incapacitated creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."""

SB['no_combat'] = "*No combat role — use Commoner statistics if needed.*"
SB['no_combat_deceased'] = "*Deceased NPC — no stat block.*"
SB['no_combat_future'] = "*No Season 1 combat role. Stat block to be defined when faction is revealed.*"

# ── File → stat block key mapping ─────────────────────────────────────────────
# (relative to CAMPAIGN_ROOT, forward slashes)

FILE_MAP = {
    "npcs/core/brenna-thorne.md":              "veteran",
    "npcs/core/elric-vael.md":                 "mage",
    "npcs/core/mara-fenwick.md":               "spy",

    "npcs/season-1/ahmed-noke.md":             "mage",
    "npcs/season-1/ariodh-highwhirl.md":       "gladiator",
    "npcs/season-1/arl-bortock.md":            "commoner",
    "npcs/season-1/aurixean-valignaak.md":     "mage",
    "npcs/season-1/banteth-slatebeard.md":     "commoner",
    "npcs/season-1/bolt.md":                   "wolf_awakened",
    "npcs/season-1/bordel-barleywind.md":      "scout",
    "npcs/season-1/clementine-andersmith.md":  "no_combat",
    "npcs/season-1/corel.md":                  "commoner",
    "npcs/season-1/dew.md":                    "faerie_dragon",
    "npcs/season-1/elro-aldataur.md":          "veteran",
    "npcs/season-1/emmajeen-kole.md":          "knight",
    "npcs/season-1/father-johan-merriksonn.md":"priest",
    "npcs/season-1/fenton-tethwick.md":        "spy",
    "npcs/season-1/ferol-sal.md":              "lich",
    "npcs/season-1/finethir-shinebright.md":   "archmage",
    "npcs/season-1/flame.md":                  "wolf_awakened_int12",
    "npcs/season-1/flynt-wymblen.md":          "spy",
    "npcs/season-1/galvena-aballon.md":        "knight",
    "npcs/season-1/guz.md":                    "ogre",
    "npcs/season-1/hulil-lutan.md":            "assassin",
    "npcs/season-1/hysvearorn.md":             "adult_silver_dragon",
    "npcs/season-1/irven-liel.md":             "commoner",
    "npcs/season-1/joel-andersmith.md":        "commoner",
    "npcs/season-1/leanor-slatebeard.md":      "commoner",
    "npcs/season-1/marta-henwick.md":          "commoner",
    "npcs/season-1/mila-teno.md":              "scout",
    "npcs/season-1/morgo-delwur.md":           "veteran",
    "npcs/season-1/orvo-mustave.md":           "no_combat",
    "npcs/season-1/raegrin-mau.md":            "cult_fanatic",
    "npcs/season-1/rowan-fairweather.md":      "druid",
    "npcs/season-1/sera-gelanadel.md":         "mage",
    "npcs/season-1/takk-oaksplitter.md":       "berserker",
    "npcs/season-1/the-buyer.md":              "no_combat_future",
    "npcs/season-1/tillus-merrion.md":         "noble",
    "npcs/season-1/tulgi.md":                  "acolyte",
    "npcs/season-1/urgon.md":                  "no_combat_deceased",
    "npcs/season-1/venomfang.md":              "young_green_dragon",
    "npcs/season-1/verla-pelc.md":             "noble",
    "npcs/season-1/willen-featherock.md":      "commoner",
    "npcs/season-1/minor/haggard-ironfist.md": "veteran",
    "npcs/season-1/minor/syla-thorngage.md":   "noble",
}

# ── Replacement logic ──────────────────────────────────────────────────────────

PLACEHOLDER_RE = re.compile(r"`\[(?:Use |No )[^\]]+\]`|`\[Commoner[^\]]+\]`|`\[Veteran[^\]]+\]`|`\[Noble[^\]]+\]`")

replaced = 0
skipped = 0

for rel_path, sb_key in FILE_MAP.items():
    abs_path = os.path.join(ROOT, rel_path.replace("/", os.sep))
    if not os.path.exists(abs_path):
        print(f"MISSING: {rel_path}")
        skipped += 1
        continue

    with open(abs_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the placeholder line (backtick-wrapped bracket text)
    pattern = re.compile(r'`\[[^\]`]+\]`')
    match = pattern.search(content)
    if not match:
        print(f"NO MATCH: {rel_path}")
        skipped += 1
        continue

    sb_text = SB[sb_key]
    new_content = content[:match.start()] + sb_text + content[match.end():]

    with open(abs_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"OK: {rel_path} -> {sb_key}")
    replaced += 1

print(f"\nDone: {replaced} replaced, {skipped} skipped")
