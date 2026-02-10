{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: NPC Relationships & Connections**

This document shows the web of relationships between NPCs across Season One. **DO NOT share this with players** unless they discover connections through gameplay.
}}

# NPC Relationship Web — Season One

This diagram shows the major relationships and connections between NPCs in the Northwatch Wardens campaign. Use this to understand how NPCs know each other and create dynamic interactions.

## Visual Diagram

```mermaid
graph TB
    %% Guild Leadership
    Brenna[Marshal Brenna Thorne<br/>Field Commander]
    Mara[Steward Mara Fenwick<br/>Quartermaster]
    Elric[Lorewarden Elric Vael<br/>Arcane Scholar]
    
    %% Wardens - Trailwardens
    Corel[Corel<br/>Senior Shepherd]
    Bordel[Bordel Barleywind<br/>Ranger]
    Rowan[Rowan Fairweather<br/>Druid]
    Mila[Mila Teno<br/>Rookie Scout]
    
    %% Wardens - Lantern Guard
    Takk[Takk Oaksplitter<br/>Barbarian]
    Galvena[Galvena Aballon<br/>Paladin]
    Ariodh[Ariodh Highwhirl<br/>Monk]
    Guz[Guz<br/>Reformed Thug]
    
    %% Wardens - Lorewatch
    Sera[Sera Gelanadel<br/>Apprentice Wizard]
    Aurixean[Aurixean Valignaak<br/>Dragonborn Sorcerer]
    Shinebright[Finethir Shinebright<br/>Polymorphed Wizard]
    Baleth[Baleth Cindermoon<br/>Tiefling Warlock]
    
    %% Wardens - Hearthwardens
    Flynt[Flynt Wymblen<br/>Gnome Bard]
    
    %% Welton NPCs
    Johan[Father Johan Merriksonn<br/>Village Priest]
    Alexi[Alexi Merriksonn<br/>Missing Sorcerer]
    Willen[Willen Featherock<br/>Traumatized Shepherd]
    Tillus[Tillus Merrion<br/>Council Member]
    Leanor[Leanor Slatebeard<br/>Innkeeper]
    Banteth[Banteth Slatebeard<br/>Innkeeper]
    
    %% Awakened Wolves
    Bolt[Bolt<br/>Alpha Wolf - Diplomatic]
    Flame[Flame<br/>Alpha Wolf - Aggressive]
    
    %% Pinebrook NPCs
    Emmajeen[Captain Emmajeen Kole<br/>Guard Captain]
    Rorn[Hysvearorn "Rorn"<br/>Adult Silver Dragon]
    
    %% Palebank NPCs
    Elro[Elro Aldataur<br/>Village Leader]
    Verla[Verla Pelc<br/>Merchant]
    Urgon[Urgon<br/>Blacksmith - Deceased]
    Tulgi[Tulgi<br/>Healer]
    
    %% Croaker Cave NPCs
    Hulil[Hulil Lutan<br/>Cult Operative]
    Raegrin[Raegrin Mau<br/>Cult Lieutenant]
    
    %% Salsvault NPCs
    Morgo[Morgo Delwur<br/>Guide]
    Orvo[Orvo Mustave<br/>Survivor]
    Buyer[The Buyer<br/>Relic Broker]
    
    %% Noke's Tower NPCs
    Noke[Ahmed Noke<br/>Antagonist Wizard]
    
    %% Temple NPCs
    Joel[Joel Andersmith<br/>Grieving Father]
    Clementine[Clementine Andersmith<br/>Kidnapped Child]
    Venomfang[Venomfang<br/>Green Dragon]
    
    %% Leadership Connections
    Brenna ---|Command Structure| Mara
    Brenna ---|Command Structure| Elric
    Mara ---|Command Structure| Elric
    
    %% Brenna's Connections
    Brenna ---|Former Comrades - Greywinter Hunts| Corel
    Brenna ---|Knows - Decades Ago| Shinebright
    Brenna ---|Suspects Magic| Bolt
    
    %% Mara's Connections
    Mara ---|Criminal Past - Uttolot Family| Verla
    Mara ---|Trading Contact| Emmajeen
    
    %% Elric's Connections
    Elric ---|Studies Anomalies| Sera
    Elric ---|Prophetic Dreams| Venomfang
    Elric ---|Recognizes Relics| Buyer
    Elric ---|Fascinated By| Shinebright
    
    %% Corel's Connections
    Corel ---|Respects| Willen
    Corel ---|Diplomatic Contact| Bolt
    Corel ---|Cousin in Palebank| Elro
    Corel ---|Trading Partner| Emmajeen
    
    %% Bordel's Connections
    Bordel ---|Ashamed Past| Bolt
    Bordel ---|Guides to Caves| Hulil
    
    %% Rowan's Connections
    Rowan ---|Senses Intelligence| Bolt
    Rowan ---|Visited Sacred Grove| Emmajeen
    
    %% Mila's Connections
    Mila ---|Knows| Verla
    Mila ---|Brother Taken By| Venomfang
    
    %% Takk's Connections
    Takk ---|Respects| Bolt
    Takk ---|Recognizes Symptoms| Urgon
    
    %% Galvena's Connections
    Galvena ---|Sworn Enemy| Venomfang
    Galvena ---|Divine Visions Corrupted| Elric
    
    %% Ariodh's Connections
    Ariodh ---|Master Trapped in| Buyer
    Ariodh ---|Recognizes Symbols| Elric
    
    %% Guz's Connections
    Guz ---|Reformed After| Noke
    Guz ---|Hears in Dreams| Noke
    Guz ---|Respects| Bolt
    
    %% Sera's Connections
    Sera ---|Apprentice Studies| Elric
    Sera ---|Mentor Connected To| Shinebright
    Sera ---|Can Translate| Buyer
    
    %% Aurixean's Connections
    Aurixean ---|Ancestor Served| Venomfang
    Aurixean ---|Resonates With| Venomfang
    Aurixean ---|Respects| Bolt
    
    %% Baleth's Connections
    Baleth ---|Patron Interested In| Buyer
    Baleth ---|Fascinated By| Bolt
    
    %% Flynt's Connections
    Flynt ---|Writing Ballad About| Brenna
    Flynt ---|Loves Story Of| Shinebright
    Flynt ---|Knows Sailor| Elro
    
    %% Welton Connections
    Johan ---|Brother| Alexi
    Johan ---|Ministers To| Willen
    Corel ---|Shepherd Mentor| Willen
    Leanor ---|Spouse| Banteth
    Leanor ---|Knows Everyone| Tillus
    Alexi ---|Spirit Lingers| Bolt
    
    %% Wolf Connections
    Bolt ---|Alpha Rivalry| Flame
    Bolt ---|Awakened By| Alexi
    Flame ---|Awakened By| Alexi
    
    %% Palebank Connections
    Elro ---|Pushes Party| Tulgi
    Verla ---|Dangerous Connections| Hulil
    Tulgi ---|Defensive About| Urgon
    
    %% Cult Connections
    Hulil ---|Commands| Raegrin
    Hulil ---|Deals With| Buyer
    
    %% Salsvault Connections
    Morgo ---|Guides| Orvo
    Buyer ---|Brokers| Elric
    
    %% Temple Connections
    Joel ---|Father Of| Clementine
    Clementine ---|Kidnapped By| Venomfang
    Venomfang ---|Uses| Clementine
    
    %% Guild Assignments
    Brenna -.Assigns Missions.-> Sera
    Brenna -.Assigns Missions.-> Bordel
    Brenna -.Assigns Missions.-> Rowan
    Brenna -.Assigns Missions.-> Mila
    Brenna -.Assigns Missions.-> Takk
    Brenna -.Assigns Missions.-> Galvena
    Brenna -.Assigns Missions.-> Ariodh
    
    %% Styling
    classDef leadership fill:#8b0000,stroke:#fff,stroke-width:2px,color:#fff
    classDef warden fill:#2e5090,stroke:#fff,stroke-width:2px,color:#fff
    classDef ally fill:#228b22,stroke:#fff,stroke-width:2px,color:#fff
    classDef neutral fill:#b8860b,stroke:#fff,stroke-width:2px,color:#fff
    classDef enemy fill:#8b0000,stroke:#fff,stroke-width:2px,color:#fff
    classDef mystery fill:#4b0082,stroke:#fff,stroke-width:2px,color:#fff
    
    class Brenna,Mara,Elric leadership
    class Corel,Bordel,Rowan,Mila,Takk,Galvena,Ariodh,Guz,Sera,Aurixean,Shinebright,Baleth,Flynt warden
    class Johan,Willen,Leanor,Banteth,Elro,Tulgi,Morgo,Orvo,Joel,Emmajeen ally
    class Tillus,Verla,Rorn neutral
    class Hulil,Raegrin,Noke,Venomfang enemy
    class Alexi,Bolt,Flame,Buyer mystery
```

## Relationship Legend

### Connection Types

- **Solid Lines**: Direct relationships (family, allies, enemies, contacts)
- **Dashed Lines**: Organizational connections (command structure, assignments)

### Color Coding

- **Dark Red**: Guild Leadership
- **Blue**: Wardens (Guild Members)
- **Green**: Allies & Friendly NPCs
- **Gold**: Neutral/Complicated NPCs
- **Red**: Antagonists & Enemies
- **Purple**: Mystery-Connected (Aeorian Echo related)

## Key Relationship Networks

### 1. The Greywinter Connection
**NPCs**: Brenna Thorne, Corel

The only two survivors of the "Greywinter Hunts," a brutal season when monsters spilled from the northern woods. Both lost people they cared about. This shared trauma makes them instinctively wary of "easy solutions" to monster problems.

**Campaign Hook**: Both recognize unnatural patterns in the awakened wolves and the Frozen Sick outbreak.

### 2. The Criminal Network
**NPCs**: Mara Fenwick, Verla Pelc, Hulil Lutan

Mara fled Shadycreek Run after crossing the Uttolot family. Verla has dangerous connections to smuggling operations. Hulil works for cult operations that overlap with criminal networks.

**Campaign Hook**: Mara can identify criminal signatures and warn about Uttolot involvement. She has a bounty on her head that becomes dangerous if party travels to Shadycreek Run.

### 3. The Arcane Investigation
**NPCs**: Elric Vael, Sera Gelanadel, Ariodh Highwhirl, The Buyer

These NPCs are all investigating the magical disturbances across the frontier from different angles. Elric suspects an ancient arcane engine. Sera is cataloging anomalies. Ariodh's master is trapped in Salsvault. The Buyer collects Aeorian relics.

**Campaign Hook**: These NPCs can piece together the Aeorian Echo mystery if players share information.

### 4. The Merriksonn Tragedy
**NPCs**: Father Johan Merriksonn, Alexi Merriksonn, Bolt, Flame

Johan's brother Alexi was the sorcerer who accidentally awakened the wolves. His spirit lingers near the den. Johan's grief makes him distrust wizards deeply, affecting his reactions to Shinebright and magical solutions.

**Campaign Hook**: Revealing Alexi's fate to Johan is a major emotional beat. His spirit might provide clues about the awakening.

### 5. The Venomfang Network
**NPCs**: Venomfang, Galvena Aballon, Aurixean Valignaak, Mila Teno, Clementine Andersmith

The green dragon Venomfang is deeply connected to multiple NPCs. Galvena has sworn to hunt him. Aurixean's bloodline resonates painfully when he's near. Mila's brother was taken by his kobolds. Clementine is kidnapped by his cult.

**Campaign Hook**: Multiple Wardens have personal stakes in confronting Venomfang, making Temple of the Dragonknights deeply personal.

### 6. The Awakened Wolves
**NPCs**: Bolt, Flame, Alexi Merriksonn (spirit), Bordel Barleywind, Corel, Rowan Fairweather

The awakened wolves are central to multiple character arcs. Bordel feels shame for fighting them before. Corel can sense their intelligence. Rowan urges peace. Multiple Wardens recognize their significance.

**Campaign Hook**: The wolves can become recurring allies or rivals depending on player choices. They represent the "awakening magic" theme of the campaign.

## NPC Appearance Cross-Reference

See next section for detailed "appears in these adventures" notes for each major NPC.

\page

# NPC Adventure Appearances

## Guild Leadership

### Marshal Brenna Thorne
**Appears In:**
- Opening: Return to Waystone (Session 0) — Introduces the guild
- Wolves of Welton — Pushes party to investigate thoroughly, recognizes wrong behavior
- Frozen Sick — Immediately recognizes blue-vein symptoms as unnatural
- Wild Sheep Chase — Suspicious of Shinebright's mishap
- **Recurring**: Available at Waystone between all adventures for briefings

**Role**: Quest giver, tactical advisor, voice of caution

### Steward Mara Fenwick
**Appears In:**
- Opening: Return to Waystone (Session 0) — Handles supplies and logistics
- Frozen Sick — Warns about Uttolot family connections
- Peril in Pinebrook — Knows Pinebrook merchants
- Wolves of Welton — Suspects organized manipulation
- **Recurring**: Available at Waystone for supplies, contracts, and underworld information

**Role**: Logistics, criminal network intelligence, contract negotiations

### Lorewarden Elric Vael
**Appears In:**
- Opening: Return to Waystone (Session 0) — Explains magical threats
- Wild Sheep Chase — Delighted to study the Wand of True Polymorph
- Frozen Sick — Recognizes Aeorian relics instantly, pushes for samples
- Temple of the Dragonknights — Has studied the Dragonknights extensively
- **Recurring**: Available at Waystone for arcane research, clue connections

**Role**: Mystery investigator, arcane expert, connects dots between adventures

\page

## Wardens — Trailwardens

### Corel (Senior Shepherd)
**Appears In:**
- Wolves of Welton — Emotional anchor, shepherd mentor, diplomatic advisor
- Frozen Sick — Has cousin in Palebank Village
- Peril in Pinebrook — Trading partner with merchants
- **Available**: Can accompany party on wilderness missions

**Role**: Wolf expert, moral compass, wilderness guide

### Bordel Barleywind
**Appears In:**
- Wolves of Welton — Reveals ashamed past with the wolf pack
- Frozen Sick — Knows northern trails, can guide to Croaker Cave
- Temple of the Dragonknights — Recognizes kobold tracks
- **Available**: Can accompany party as scout

**Role**: Tracker, survivor, redemption arc

### Rowan Fairweather
**Appears In:**
- Wolves of Welton — Senses wolves' intelligence, urges peace
- Frozen Sick — Recognizes disease as unnatural
- Peril in Pinebrook — Knows local druids and sacred grove
- **Available**: Can accompany party on nature-related missions

**Role**: Nature expert, diplomatic voice, arcane sensitivity

### Mila Teno (Glassblade Rookie)
**Appears In:**
- Wolves of Welton — Begs party to kill wolves (trauma response)
- Frozen Sick — Knows Verla Pelc, devastated by her fate
- Temple of the Dragonknights — Brother disappeared near ruins (major hook)
- **Available**: Eager to prove herself on missions

**Role**: Emotional beats, personal stakes, rookie perspective

\page

## Wardens — Lantern Guard

### Takk Oaksplitter
**Appears In:**
- Wolves of Welton — Respects wolves, hesitates to kill
- Frozen Sick — Recognizes symptoms from dead tribe member
- Wild Sheep Chase — Finds Shinebright hilarious
- **Available**: Always volunteers first for dangerous missions

**Role**: Muscle, comic relief, surprising wisdom

### Galvena Aballon
**Appears In:**
- Temple of the Dragonknights — Major emotional anchor (sworn to hunt Venomfang)
- Frozen Sick — Sees disease as test of faith
- Wolves of Welton — Pushes for justice, not slaughter
- **Available**: Accepts missions requiring discipline and moral clarity

**Role**: Moral authority, Venomfang antagonist, divine corruption subplot

### Ariodh Highwhirl
**Appears In:**
- Frozen Sick — Recognizes Aeorian symbols (master vanished investigating ruins)
- Wild Sheep Chase — Offended by Noke's misuse of magic
- Wolves of Welton — Attempts diplomacy first
- **Available**: Joins missions requiring investigation or philosophy

**Role**: Diplomat, Aeorian mystery connection, master-in-Salsvault subplot

### Guz (Reformed)
**Appears In:**
- Wild Sheep Chase — Can become recurring ally after redemption
- Wolves of Welton — Respects Bolt and Flame's intelligence
- Frozen Sick — Fears Aeorian relics deeply
- **Available**: Seeks redemption, trying to prove himself

**Role**: Redemption arc, moral complexity, haunted by past

\page

## Wardens — Lorewatch

### Sera Gelanadel
**Appears In:**
- Temple of the Dragonknights — Major recurring NPC, arcane support
- Frozen Sick — Can translate Aeorian script
- Wild Sheep Chase — Fascinated by Wand of True Polymorph
- **Available**: Eager assistant for magical investigations

**Role**: Translator, arcane expert, connects to Shinebright subplot

### Aurixean Valignaak
**Appears In:**
- Temple of the Dragonknights — Senses Venomfang before anyone else (bloodline resonance)
- Frozen Sick — Fire magic especially effective in Salsvault
- Wolves of Welton — Respects Bolt's leadership
- **Available**: Dramatic volunteer for high-stakes missions

**Role**: Draconic subplot, Venomfang connection, theatrical presence

### Finethir Shinebright (Polymorphed)
**Appears In:**
- Wild Sheep Chase — Central NPC (starts as sheep)
- **Recurring**: Can become magical contact/resource after restoration
- References in other adventures through Brenna, Elric, Sera

**Role**: Chaos engine, magical expertise, recurring comic relief

### Baleth Cindermoon
**Appears In:**
- Frozen Sick — Senses Aeorian magic as "wrong"
- Wolves of Welton — Fascinated by awakened wolves
- Temple of the Dragonknights — Patron wants something in ruins
- **Available**: Mysterious volunteer with hidden agendas

**Role**: Warlock mystery, patron subplot, ambiguous ally

\page

## Wardens — Hearthwardens

### Flynt Wymblen
**Appears In:**
- Wolves of Welton — Can accompany party if invited
- Frozen Sick — Knows sailor who can reach Far North
- Wild Sheep Chase — Loves Shinebright's story
- **Available**: Joins adventures for "ballad material"

**Role**: Bard, rumor mill, prophetic songs, comic relief

\page

## Welton NPCs

### Father Johan Merriksonn
**Appears In:**
- Wolves of Welton — Grieving father, emotional anchor, moral voice
- Frozen Sick — Begs party to save infected
- Wild Sheep Chase — Distrusts wizards deeply
- **Available**: Can provide spiritual guidance, village perspective

**Role**: Moral complexity, grief, brother subplot

### Alexi Merriksonn (Missing/Spirit)
**Appears In:**
- Wolves of Welton — Central mystery (missing sorcerer who awakened wolves)
- **Spirit lingers**: Near wolf den, can provide clues
- References in other adventures through Johan

**Role**: Tragic catalyst, awakening magic mystery, spiritual subplot

### Willen Featherock
**Appears In:**
- Wolves of Welton — Traumatized witness, emotional heart
- Frozen Sick — Knows trader who dealt with Verla Pelc
- Temple of the Dragonknights — Family once guarded ruins
- **Available**: Recovering, can provide local knowledge

**Role**: Ordinary person perspective, latent magic, witness

### Tillus Merrion
**Appears In:**
- Wolves of Welton — Council member, political obstacle/ally
- **Available**: Represents political/economic interests

**Role**: Politics, pragmatism, leverage point

### Leanor Slatebeard
**Appears In:**
- Wolves of Welton — Innkeeper, knows everyone's business
- **Available**: Social hub, gossip source

**Role**: Information broker, suspicious of outsiders

### Banteth Slatebeard
**Appears In:**
- Wolves of Welton — Innkeeper, steadier temperament than Leanor
- **Available**: Kindness, defuses tension

**Role**: Comfort, practical wisdom

\page

## Awakened Wolves

### Bolt (Alpha Wolf)
**Appears In:**
- Wolves of Welton — Diplomatic alpha, terrified of what awakened him
- **Recurring**: Can become ally/rival depending on resolution
- References in other adventures through Wardens

**Role**: Awakening magic mystery, recurring nonhuman faction leader

### Flame (Alpha Wolf)
**Appears In:**
- Wolves of Welton — Aggressive alpha, tempted by domination
- **Recurring**: Can become rival faction leader
- References in other adventures through Wardens

**Role**: Awakening magic mystery, moral complexity, potential antagonist

\page

## Pinebrook NPCs

### Captain Emmajeen Kole
**Appears In:**
- Peril in Pinebrook — Guard captain, quest giver
- **Available**: Direct, disciplined authority figure

**Role**: Law enforcement, practical perspective

### Hysvearorn "Rorn" (Adult Silver Dragon)
**Appears In:**
- Peril in Pinebrook — Protective mother, intelligent negotiator
- **Recurring**: Can become powerful ally/enemy based on baby's fate

**Role**: High-stakes moral choice, powerful ally/enemy

\page

## Palebank Village NPCs

### Elro Aldataur
**Appears In:**
- Frozen Sick — Quest giver, village leader
- **Available**: Careful, protective leadership voice

**Role**: Authority figure, pushes party into Salsvault mystery

### Verla Pelc
**Appears In:**
- Frozen Sick — Merchant with dangerous connections
- **Available**: Leverage, desperation, criminal network

**Role**: Moral complexity, Uttolot subplot, information source

### Urgon (Deceased Blacksmith)
**Appears In:**
- Frozen Sick — Funeral hook, community loss
- **Role**: Stakes, community impact

### Tulgi (Healer)
**Appears In:**
- Frozen Sick — Tense healer, defensive, knows more than she admits
- **Available**: Ally or suspect depending on approach

**Role**: Medical expert, potential ally, defensive NPC

\page

## Croaker Cave NPCs

### Hulil Lutan
**Appears In:**
- Frozen Sick — Cult operative, smart and ruthless
- **Role**: Antagonist, cult connection, escape artist

### Raegrin Mau
**Appears In:**
- Frozen Sick — Cult lieutenant, zealous
- **Role**: Antagonist, can crack under pressure

\page

## Salsvault NPCs

### Morgo Delwur
**Appears In:**
- Frozen Sick — Expedition guide, calm competence
- **Available**: Hard truths about survival and risk

**Role**: Guide, practical wisdom, survival expert

### Orvo Mustave
**Appears In:**
- Frozen Sick — Anxious survivor, witness
- **Role**: Urgency, time pressure, emotional impact

### The Buyer
**Appears In:**
- Frozen Sick — Mysterious patron, relic broker
- **Recurring**: Long-term faction contact, Aeorian mystery connection

**Role**: Mystery broker, faction representative, morally ambiguous patron

\page

## Noke's Tower NPCs

### Ahmed Noke
**Appears In:**
- Wild Sheep Chase — Antagonist, petty genius
- **Recurring**: Can haunt Guz's dreams

**Role**: Antagonist, magical mishap, pathetic/terrifying

\page

## Temple of the Dragonknights NPCs

### Joel Andersmith
**Appears In:**
- Temple of the Dragonknights — Grieving parent, emotional pressure
- Wolves of Welton — Begs party to save families
- Frozen Sick — Knows trader who handled blue vials

**Role**: Moral stakes, personal investment

### Clementine Andersmith
**Appears In:**
- Temple of the Dragonknights — Kidnapped child, rescue stakes
- **Future**: Potential campaign hook if magic awakens

**Role**: Rescue mission, future subplot

### Venomfang (Green Dragon)
**Appears In:**
- Temple of the Dragonknights — Campaign-tier threat, intelligent predator
- References through Galvena, Aurixean, Mila subplots

**Role**: Major antagonist, multiple character connections

\page

## Using This Web

### For Adventure Prep
1. Check which NPCs appear in the adventure you're running
2. Review their connections to other NPCs
3. Plan callbacks to previous adventures through relationships
4. Use connections to create dynamic interactions

### For Player Choices
- If players help/antagonize an NPC, check their connections
- Related NPCs should react accordingly
- Build reputation through relationship networks
- Create consequences that ripple through connections

### For Long-Term Planning
- Track which NPCs players bond with
- Develop those relationships across multiple adventures
- Use connections to tie adventures together
- Create emotional investment through recurring relationships

### For Mystery Revelation
- NPCs in "Arcane Investigation" network can help piece together clues
- Each connection reveals different aspects of the Aeorian Echo
- Players who cultivate relationships get better information
- Some secrets only revealed through specific NPC relationships
