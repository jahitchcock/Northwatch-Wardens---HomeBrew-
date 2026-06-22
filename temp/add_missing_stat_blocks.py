"""
Add ## Stat Block Reference sections to all NPC files missing them.
Appends to the end of each file.
"""
import os
import re

BASE = r"c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)"

# ─── Stat block definitions ──────────────────────────────────────────────────

SB = {}

SB["veteran"] = """\
## Stat Block Reference

**Use:** Veteran (MM p. 350)
*CR 3 | Medium humanoid | AC 17 (splint) | HP 58 (9d8+18) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 16 (+3) | 13 (+1) | 14 (+2) | 10 (+0) | 11 (+0) | 10 (+0) |

**Skills:** Athletics +5, Perception +2
**Senses:** passive Perception 12 | **Languages:** Any two

**Multiattack.** Two longsword attacks; one shortsword attack (bonus action).
**Longsword.** *Melee:* +5 to hit, 1d8+3 slashing.
**Shortsword.** *Melee:* +5 to hit, 1d6+3 piercing.
**Heavy Crossbow.** *Ranged:* +3 to hit, 100/400 ft., 1d10+1 piercing."""

SB["scout"] = """\
## Stat Block Reference

**Use:** Scout (MM p. 349)
*CR 1/2 | Medium humanoid | AC 13 (leather) | HP 16 (3d8+3) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 11 (+0) | 14 (+2) | 12 (+1) | 11 (+0) | 13 (+1) | 11 (+0) |

**Skills:** Nature +4, Perception +5, Stealth +6, Survival +5
**Senses:** passive Perception 15 | **Languages:** Any one

**Keen Hearing and Sight.** Advantage on Perception checks using hearing or sight.
**Multiattack.** Two melee or ranged attacks.
**Shortsword.** *Melee:* +4 to hit, 1d6+2 piercing.
**Longbow.** *Ranged:* +4 to hit, 150/600 ft., 1d8+2 piercing."""

SB["commoner"] = """\
## Stat Block Reference

**Use:** Commoner (MM p. 345)
*CR 0 | Medium humanoid | AC 10 | HP 4 (1d8) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) | 10 (+0) |

**Senses:** passive Perception 10 | **Languages:** Any one

**Club.** *Melee:* +2 to hit, 1d4 bludgeoning."""

SB["noble"] = """\
## Stat Block Reference

**Use:** Noble (MM p. 348)
*CR 1/8 | Medium humanoid | AC 15 (breastplate) | HP 9 (2d8) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 11 (+0) | 12 (+1) | 11 (+0) | 12 (+1) | 14 (+2) | 16 (+3) |

**Skills:** Deception +5, Insight +4, Persuasion +5
**Senses:** passive Perception 12 | **Languages:** Any two

**Parry (Reaction).** Add 2 to AC against one melee attack (must see attacker).
**Rapier.** *Melee:* +3 to hit, 1d8+1 piercing."""

SB["spy"] = """\
## Stat Block Reference

**Use:** Spy (MM p. 349)
*CR 1 | Medium humanoid | AC 12 | HP 27 (6d8) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 10 (+0) | 15 (+2) | 10 (+0) | 12 (+1) | 14 (+2) | 16 (+3) |

**Skills:** Deception +5, Insight +4, Investigation +5, Perception +6, Persuasion +5, Sleight of Hand +4, Stealth +4
**Senses:** passive Perception 16 | **Languages:** Any two

**Cunning Action.** Bonus action: Dash, Disengage, or Hide.
**Sneak Attack (1/turn).** Extra 2d6 damage when attack has advantage or ally is adjacent to target.
**Multiattack.** Two melee attacks.
**Shortsword.** *Melee:* +4 to hit, 1d6+2 piercing.
**Hand Crossbow.** *Ranged:* +4 to hit, 30/120 ft., 1d6+2 piercing."""

SB["priest"] = """\
## Stat Block Reference

**Use:** Priest (MM p. 348)
*CR 2 | Medium humanoid | AC 13 (chain shirt) | HP 27 (5d8+5) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 10 (+0) | 10 (+0) | 12 (+1) | 13 (+1) | 16 (+3) | 13 (+1) |

**Skills:** Medicine +7, Persuasion +3, Religion +4
**Senses:** passive Perception 13 | **Languages:** Any two

**Spellcasting** (Wis, save DC 13, +5 to hit). Cantrips: *sacred flame*, *thaumaturgy*. 1st (4): *cure wounds*, *guiding bolt*, *sanctuary*. 2nd (3): *lesser restoration*, *spiritual weapon*. 3rd (2): *dispel magic*, *spirit guardians*.
**Divine Eminence (Bonus Action).** Expend spell slot to give next attack roll magic weapon (extra 10 (3d6) radiant on hit).
**Mace.** *Melee:* +2 to hit, 1d6 bludgeoning."""

SB["druid"] = """\
## Stat Block Reference

**Use:** Druid (MM p. 346)
*CR 2 | Medium humanoid | AC 11 (leather) | HP 27 (5d8+5) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 10 (+0) | 12 (+1) | 13 (+1) | 12 (+1) | 15 (+2) | 11 (+0) |

**Skills:** Medicine +4, Nature +5, Perception +4
**Senses:** passive Perception 14 | **Languages:** Druidic + any two

**Spellcasting** (Wis, save DC 12, +4 to hit). Cantrips: *druidcraft*, *produce flame*, *shillelagh*. 1st (4): *entangle*, *longstrider*, *speak with animals*, *thunderwave*. 2nd (3): *animal messenger*, *barkskin*. 3rd (2) (save DC 12): *conjure animals*, *plant growth*.
**Quarterstaff.** *Melee:* +2 to hit (or +4 with shillelagh), 1d6 (1d8+2 with shillelagh) bludgeoning."""

SB["mage"] = """\
## Stat Block Reference

**Use:** Mage (MM p. 347)
*CR 6 | Medium humanoid | AC 12 (15 with mage armor) | HP 40 (9d8) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 9 (-1) | 14 (+2) | 11 (+0) | 17 (+3) | 12 (+1) | 11 (+0) |

**Skills:** Arcana +7, History +7
**Senses:** passive Perception 11 | **Languages:** Any four

**Spellcasting** (Int, save DC 14, +6 to hit). Cantrips: *fire bolt*, *light*, *mage hand*, *prestidigitation*. 1st (4): *detect magic*, *mage armor*, *magic missile*, *shield*. 2nd (3): *misty step*, *suggestion*. 3rd (3): *counterspell*, *fireball*, *fly*. 4th (3): *greater invisibility*, *ice storm*. 5th (1): *cone of cold*.
**Dagger.** *Melee or Ranged:* +4 to hit, 5 ft. or 20/60 ft., 1d4+2 piercing."""

SB["knight"] = """\
## Stat Block Reference

**Use:** Knight (MM p. 347)
*CR 3 | Medium humanoid | AC 18 (plate) | HP 52 (8d8+16) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 16 (+3) | 11 (+0) | 14 (+2) | 11 (+0) | 11 (+0) | 15 (+2) |

**Skills:** — | **Senses:** passive Perception 10 | **Languages:** Any two

**Brave.** Advantage on saving throws against being frightened.
**Parry (Reaction).** Add 2 to AC against one melee attack.
**Multiattack.** Two melee attacks.
**Greatsword.** *Melee:* +5 to hit, 2d6+3 slashing.
**Heavy Crossbow.** *Ranged:* +2 to hit, 100/400 ft., 1d10 piercing.**Leadership (Recharge 5-6).** For 1 min, allies within 30 ft. add 1d4 to attack rolls and saves when knight is not incapacitated."""

SB["gladiator"] = """\
## Stat Block Reference

**Use:** Gladiator (MM p. 346)
*CR 5 | Medium humanoid | AC 16 (studded leather + shield) | HP 112 (15d8+45) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 18 (+4) | 15 (+2) | 16 (+3) | 10 (+0) | 12 (+1) | 15 (+2) |

**Skills:** Athletics +10, Intimidation +5
**Senses:** passive Perception 11 | **Languages:** Any one

**Brave.** Advantage on saves vs. frightened.
**Brute.** Melee weapons deal one extra die of damage (included).
**Parry (Reaction).** Add 3 to AC against one melee attack.
**Multiattack.** Three melee (spear) attacks or two ranged.
**Spear.** *Melee:* +7 to hit, 2d6+4 piercing; *Ranged:* 20/60 ft., 2d6+4 piercing.
**Shield Bash.** *Melee:* +7 to hit, 2d4+4 bludgeoning; DC 15 Str or knocked prone."""

SB["berserker"] = """\
## Stat Block Reference

**Use:** Berserker (MM p. 344)
*CR 2 | Medium humanoid | AC 13 (hide) | HP 67 (9d8+27) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 16 (+3) | 12 (+1) | 17 (+3) | 9 (-1) | 11 (+0) | 9 (-1) |

**Senses:** passive Perception 10 | **Languages:** Any one

**Reckless.** At the start of each turn, can grant advantage on all melee attacks this turn; attacks against the berserker also have advantage until next turn.
**Greataxe.** *Melee:* +5 to hit, 1d12+3 slashing."""

SB["assassin"] = """\
## Stat Block Reference

**Use:** Assassin (MM p. 343)
*CR 8 | Medium humanoid | AC 15 (studded leather) | HP 78 (12d8+24) | Speed 30 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 11 (+0) | 16 (+3) | 14 (+2) | 13 (+1) | 11 (+0) | 10 (+0) |

**Skills:** Acrobatics +6, Deception +3, Perception +3, Stealth +9
**Damage Immunities:** poison | **Condition Immunities:** poisoned
**Senses:** passive Perception 13 | **Languages:** Thieves' cant + any two

**Assassinate.** Advantage on attacks vs. creatures that haven't acted; surprise hit auto-crits.
**Evasion.** On Dex save for half damage, take none on success, half on fail.
**Sneak Attack (1/turn).** Extra 4d6 damage.
**Multiattack.** Two shortsword attacks.
**Shortsword.** *Melee:* +6 to hit, 1d6+3 piercing + 7 (2d6) poison (DC 15 Con or also poisoned 1 hr).
**Hand Crossbow.** *Ranged:* +6 to hit, 30/120 ft., 1d6+3 piercing + 7 (2d6) poison (DC 15 Con or poisoned)."""

SB["no_combat"] = """\
## Stat Block Reference

*This NPC has no combat role. Use Commoner (MM p. 345) as a base if stats are ever required.*"""

SB["no_combat_historical"] = """\
## Stat Block Reference

*Historical/legendary figure — no stat block applicable. Individual members would vary; consult appropriate MM entries if needed.*"""

# ─── File -> stat block mapping ───────────────────────────────────────────────

FILE_MAP = {
    # Core NPCs (without stat blocks yet)
    "npcs/core/ariodh-highwhirl.md":        "gladiator",
    "npcs/core/aurixean-valignaak.md":      "mage",
    "npcs/core/baleth-cindermoon.md":       "mage",
    "npcs/core/bordel-barleywind.md":       "scout",
    "npcs/core/corel.md":                   "veteran",
    "npcs/core/elro-aldataur.md":           "veteran",
    "npcs/core/father-johan-merriksonn.md": "priest",
    "npcs/core/finethir-shinebright.md":    "mage",
    "npcs/core/flynt-wymblen.md":           "spy",
    "npcs/core/galvena-aballon.md":         "knight",
    "npcs/core/guz.md":                     "no_combat",  # Ogre - placeholder, actual ogre block separate
    "npcs/core/joel-andersmith.md":         "commoner",
    "npcs/core/leanor-slatebeard.md":       "scout",
    "npcs/core/mila-teno.md":               "scout",
    "npcs/core/rowan-fairweather.md":       "druid",
    "npcs/core/sera-gelanadel.md":          "mage",
    "npcs/core/takk-oaksplitter.md":        "berserker",
    "npcs/core/tillus-merrion.md":          "noble",
    "npcs/core/tulgi-lutan.md":             "scout",
    "npcs/core/urgon-wenth.md":             "scout",
    "npcs/core/verla-pelc.md":              "noble",
    "npcs/core/westly.md":                  "commoner",
    "npcs/core/willen-featherock.md":       "commoner",
    "npcs/core/the-dragonknights.md":       "no_combat_historical",
    "npcs/core/the-first-settlers.md":      "no_combat_historical",

    # Minor NPCs — Waystone Inn
    "npcs/season-1/minor/garth-ironfoot.md":      "veteran",
    "npcs/season-1/minor/sylra-moonwhisper.md":   "no_combat",
    "npcs/season-1/minor/torven-steady-grasp.md": "veteran",
    "npcs/season-1/minor/pim-tosscoin.md":        "scout",
    "npcs/season-1/minor/marta-keenblade.md":     "veteran",
    "npcs/season-1/minor/elira-dawntracker.md":   "druid",

    # Minor NPCs — Welton Village
    "npcs/season-1/minor/brindle-tossbrew.md":    "no_combat",
    "npcs/season-1/minor/rorin-ironplow.md":      "veteran",
    "npcs/season-1/minor/kasira-wellborn.md":     "no_combat",
    "npcs/season-1/minor/old-tam.md":             "no_combat",

    # Minor NPCs — Pinebrook Village
    "npcs/season-1/minor/korrin-shale.md":        "commoner",
    "npcs/season-1/minor/mira-frostborn.md":      "scout",
    "npcs/season-1/minor/olan-mesk.md":           "commoner",
    "npcs/season-1/minor/jessamine-coldwater.md": "no_combat",
    "npcs/season-1/minor/garthok-the-just.md":    "noble",
    "npcs/season-1/minor/seraphine-goldleaf.md":  "noble",
    "npcs/season-1/minor/drake-thornwood.md":     "scout",
    "npcs/season-1/minor/lyssa-brightsong.md":    "veteran",

    # Minor NPCs — Traveling / Wilderness
    "npcs/season-1/minor/rendal-keenwhistle.md":        "spy",
    "npcs/season-1/minor/sister-amara.md":              "priest",
    "npcs/season-1/minor/vex-nighthollow.md":           "assassin",
    "npcs/season-1/minor/haggard-ironfist.md":          "veteran",
    "npcs/season-1/minor/merrick-the-miser-blackcoin.md": "noble",
    "npcs/season-1/minor/syla-thorngage.md":             "veteran",
    "npcs/season-1/minor/grimbosh-the-unfortunate.md":   "berserker",
    "npcs/season-1/minor/fenwick-old-moss.md":          "druid",
    "npcs/season-1/minor/kael-swiftarrow.md":           "scout",
    "npcs/season-1/minor/pip-underhill.md":              "no_combat",
    "npcs/season-1/minor/torbin-ashfall.md":             "no_combat",
    "npcs/season-1/minor/elara-moonstone.md":            "no_combat",
}

# Override for Guz — he's an ogre bruiser, give him actual ogre stats
SB["ogre_npc"] = """\
## Stat Block Reference

**Use:** Ogre (MM p. 237) — reskinned as a loyal Lantern Guard bruiser
*CR 2 | Large giant | AC 11 (hide) | HP 59 (7d10+21) | Speed 40 ft.*

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 19 (+4) | 8 (-1) | 16 (+3) | 5 (-3) | 7 (-2) | 7 (-2) |

**Senses:** darkvision 60 ft., passive Perception 8 | **Languages:** Common, Giant

**Greatclub.** *Melee:* +6 to hit, reach 5 ft., 2d8+4 bludgeoning.
**Javelin.** *Melee or Ranged:* +6 to hit, 5 ft. or 30/120 ft., 2d6+4 piercing.

*Note: Guz is unusual — loyal, gentle with allies, and surprisingly disciplined under Brenna Thorne's command. Treat his INT/WIS scores as reflective of communication style, not insight.*"""

FILE_MAP["npcs/core/guz.md"] = "ogre_npc"


def has_stat_block(content):
    return "## Stat Block Reference" in content


def process_file(rel_path, sb_key):
    full_path = os.path.join(BASE, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print(f"MISSING FILE: {rel_path}")
        return

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    if has_stat_block(content):
        print(f"SKIP (already has stat block): {rel_path}")
        return

    sb_text = SB.get(sb_key)
    if not sb_text:
        print(f"ERROR: unknown stat block key '{sb_key}' for {rel_path}")
        return

    # Append with a blank line before the section
    separator = "\n\n" if not content.endswith("\n\n") else "\n"
    new_content = content.rstrip("\n") + "\n\n" + sb_text + "\n"

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"OK: {rel_path} -> {sb_key}")


if __name__ == "__main__":
    for rel_path, sb_key in FILE_MAP.items():
        process_file(rel_path, sb_key)
    print("\nDone.")
