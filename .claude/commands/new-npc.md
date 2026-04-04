Create a new NPC for the Northwatch Wardens campaign.

The user will provide: NPC name, role/concept, and the adventure or location they appear in. Ask for anything missing.

Steps:

1. **Read** `Season 1/Campaign Assets/DM Guild Roster.md` to check for naming conflicts and understand the existing NPC roster style.

2. **Generate the NPC with two representations:**

   **A. Markdown stat block** (Homebrewery `{{monster,frame}}` format for the adventure guide):
   - Full stat block with STR/DEX/CON/INT/WIS/CHA scores and modifiers
   - Relevant skills, saves, senses, languages, CR
   - Traits and Actions with proper attack notation: `+# to hit, XdY+# damage`
   - A campaign-specific flavor trait that hints at personality or the Aeorian Echo if appropriate
   - Personality notes block (`{{note}}`) with: speech patterns, mannerisms, what they know, secrets

   **B. XML `<npc>` entry** (Game Master 5e v5 format):
   - `<uid>` — pick a number not already used in `LionsdenGameFiles/Northwatch_Wardens.xml`
   - `<enemy>0</enemy>` for allies/neutrals, `<enemy>1</enemy>` for hostiles
   - All required fields: ac, armor, hpMax, hpCurrent, hd, speed, abilities, passive, languages, cr
   - `<trait>` and `<action>` elements with `<attack><atk>` and `<dmg>` for all attacks
   - CDATA for any multi-line text fields

3. **Add to roster** — append the NPC entry to `Season 1/Campaign Assets/DM Guild Roster.md` using the existing format in that file.

4. **Ask the user** whether to also insert the XML entry into `LionsdenGameFiles/Northwatch_Wardens.xml`.

5. **Tone reminder:** Show character through behavior and speech examples, not descriptions. Provide 1–2 example dialogue lines matching their role.

After creating, show the user both representations and the roster entry.
