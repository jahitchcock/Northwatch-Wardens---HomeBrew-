# The Homebrewery *V3*
Welcome traveler from an antique land. Please sit and tell us of what you have seen. The unheard of monsters, who slither and bite. Tell us of the wondrous items and and artifacts you have found, their mysteries yet to be unlocked. Of the vexing vocations and surprising skills you have seen.

### Homebrew D&D made easy
The Homebrewery makes the creation and sharing of authentic looking Fifth-Edition homebrews easy. It uses [Markdown](https://help.github.com/articles/markdown-basics/) with a little CSS magic to make your brews come to life.

**Try it!** Simply edit the text on the left and watch it *update live* on the right. Note that not every button is visible on this demo page. Click New {{fas,fa-plus-square}} in the navbar above to start brewing with all the features!

### Editing and Sharing
When you create a new homebrew document ("brew"), your document will be given a *edit link* and a *share link*.

The *edit link* is where you write your brew. If you edit a brew while logged in, you are added as one of the brew's authors, and no one else can edit that brew until you add them as a new author via the {{fa,fa-info-circle}} **Properties** tab. Brews without any author can still be edited by anyone with the *edit link*, so be careful about who you share it with if you prefer to work without an account.

Anyone with the *share url* will be able to access a read-only version of your homebrew.

{{note
##### PDF Creation
PDF Printing works best in Google Chrome. If you are having quality/consistency issues, try using Chrome to print instead.

After clicking the "Print" item in the navbar a new page will open and a print dialog will pop-up.
* Set the **Destination** to "Save as PDF"
* Set **Paper Size** to "Letter"
* If you are printing on A4 paper, make sure to have the **PRINT → {{far,fa-file}} A4 Pagesize** snippet in your brew
* In **Options** make sure "Background Images" is selected.
* Hit print and enjoy! You're done!

If you want to save ink or have a monochrome printer, add the **PRINT → {{fas,fa-tint}} Ink Friendly** snippet to your brew!
}}

![homebrew mug](https://i.imgur.com/hMna6G0.png) {position:absolute,bottom:20px,left:130px,width:220px}

{{artist,bottom:160px,left:100px
##### Homebrew Mug
[naturalcrit](https://homebrew.naturalcrit.com)
}}

{{pageNumber 1}}
{{footnote PART 1 | FANCINESS}}

\column

## V3 vs Legacy
The Homebrewery has two renderers: Legacy and V3. The V3 renderer is recommended for all users because it is more powerful, more customizable, and continues to receive new feature updates while Legacy does not. However Legacy mode will remain available for older brews and veteran users.
	
At any time, any individual brew can be changed to your renderer of choice via the {{fa,fa-info-circle}} **Properties** tab on your brew. However, converting between Legacy and V3 may require heavily tweaking the document; while both renderers can use raw HTML, V3 prefers a streamlined curly bracket syntax that avoids the complex HTML structures required by Legacy.


Scroll down to the next page for a brief summary of the changes and features available in V3!
#### New Things All The Time!
Check out the latest updates in the full changelog [here](/changelog).

### Helping out
Like this tool? Head over to our [Patreon](https://www.patreon.com/Naturalcrit) to help us keep the servers running.


This tool will **always** be free, never have ads, and we will never offer any "premium" features or whatever.

### Bugs, Issues, Suggestions?
- Check the [Frequently Asked Questions](/faq) page first for quick answers.
- Get help or the right look for your brew by posting on [r/Homebrewery](https://www.reddit.com/r/homebrewery/submit?selftext=true&title=%5BIssue%5D%20Describe%20Your%20Issue%20Here) or joining the [Discord Of Many Things](https://discord.gg/by3deKx).
- Report technical issues or provide feedback on the [GitHub Repo](https://github.com/naturalcrit/homebrewery/).

### Legal Junk
The Homebrewery is licensed using the [MIT License](https://github.com/naturalcrit/homebrewery/blob/master/license). Which means you are free to use The Homebrewery codebase any way that you want, except for claiming that you made it yourself.

If you wish to sell or in some way gain profit for what's created on this site, it's your responsibility to ensure you have the proper licenses/rights for any images or resources used.
#### Crediting Us
If you'd like to credit us in your brew, we'd be flattered! Just reference that you made it with The Homebrewery.

### More Homebrew Resources
[![Discord](/assets/discordOfManyThings.svg){width:50px,float:right,padding-left:10px}](https://discord.gg/by3deKx)

If you are looking for more 5e Homebrew resources check out [r/UnearthedArcana](https://www.reddit.com/r/UnearthedArcana/) and their list of useful resources [here](https://www.reddit.com/r/UnearthedArcana/wiki/resources). The [Discord Of Many Things](https://discord.gg/by3deKx) is another great resource to connect with fellow homebrewers for help and feedback.


{{position:absolute;top:20px;right:20px;width:auto
[![Discord](/assets/discord.png){height:30px}](https://discord.gg/by3deKx)
[![Github](/assets/github.png){height:30px}](https://github.com/naturalcrit/homebrewery)
[![Patreon](/assets/patreon.png){height:30px}](https://patreon.com/NaturalCrit)
[![Reddit](/assets/reddit.png){height:30px}](https://www.reddit.com/r/homebrewery/)
}}

\page

## Markdown+
The Homebrewery aims to make homebrewing as simple as possible, providing a live editor with Markdown syntax that is more human-readable and faster to write with than raw HTML.

From version 3.0.0, with a goal of adding maximum flexibility without users resorting to complex HTML to accomplish simple tasks, Homebrewery provides an extended verision of Markdown with additional syntax.

### Curly Brackets
Standard Markdown lacks several equivalences to HTML. Hence, we have introduced `{{ }}` as a replacement for `<span></span>` and `<div></div>` for a cleaner custom formatting. Inline spans and block elements can be created and given ID's and Classes, as well as CSS properties, each of which are comma separated with no spaces. Use double quotes if a value requires spaces. Spans and Blocks start the same:

#### Span
My favorite author is {{pen,#author,color:orange,font-family:"trebuchet ms" Brandon Sanderson}}.  The orange text has a class of `pen`, an id of `author`, is colored orange, and given a new font. The first space outside of quotes marks the beginning of the content.


#### Block
{{purple,#book,text-align:center,background:#aa88aa55
My favorite book is Wheel of Time. This block has a class of `purple`, an id of `book`, and centered text with a colored background. The opening and closing brackets are on lines separate from the block contents.
}}

#### Injection
For any element not inside a span or block, you can *inject* attributes using the same syntax but with single brackets in a single line immediately after the element.

Inline elements like *italics* {color:#D35400} or images require the injection on the same line.

Block elements like headers require the injection to start on the line immediately following.

##### A Purple Header
{color:purple,text-align:center}

\* *this does not currently work for tables yet*

### Vertical Spacing
A blank line can be achieved with a run of one or more `:` alone on a line. More `:`'s will create more space.

::


Much nicer than `<br><br><br><br><br>`

### Definition Lists
**Example** :: V3 uses HTML *definition lists* to create "lists" with hanging indents.



### Column Breaks
Column and page breaks with `\column` and `\page`.

\column
### Tables
Tables now allow column & row spanning between cells. This is included in some updated snippets, but a simplified example is given below.

A cell can be spanned across columns by grouping multiple pipe `|` characters at the end of a cell.

Row spanning is achieved by adding a `^` at the end of a cell just before the `|`.  

These can be combined to span a cell across both columns and rows. Cells must have the same colspan if they are to be rowspan'd.

##### Example
| Head A | Spanned Header ||
| Head B | Head C | Head D |
|:-------|:------:|:------:|
| 1A     |    1B  |    1C  |
| 2A    ^|    2B  |    2C  |
| 3A    ^|    3B       3C ||
| 4A     |    4B       4C^||
| 5A    ^|    5B  |    5C  |
| 6A     |    6B ^|    6C  |

## Images
Images must be hosted online somewhere, like [Imgur](https://www.imgur.com). You use the address to that image to reference it in your brew\*.

Using *Curly Injection* you can assign an id, classes, or inline CSS properties to the Markdown image syntax.

![alt-text](https://s-media-cache-ak0.pinimg.com/736x/4a/81/79/4a8179462cfdf39054a418efd4cb743e.jpg) {width:100px,border:"2px solid",border-radius:10px}

\* *When using Imgur-hosted images, use the "direct link", which can be found when you click into your image in the Imgur interface.*

## Snippets
Homebrewery comes with a series of *code snippets* found at the top of the editor pane that make it easy to create brews as quickly as possible.  Just set your cursor where you want the code to appear in the editor pane, choose a snippet, and make the adjustments you need.

## Style Editor Panel
{{fa,fa-paint-brush}} Usually overlooked or unused by some users, the **Style Editor** tab is located on the right side of the Snippet bar. This editor accepts CSS for styling without requiring `<style>` tags-- anything that would have gone inside style tags before can now be placed here, and snippets that insert CSS styles are now located on that tab.

{{pageNumber 2}}
{{footnote PART 2 | BORING STUFF}}

\page

{{quote
The elf queen stood atop her castle walls, surveying the kingdom below with a mix of pride and sadness. She knew that the coming war would be brutal, but she was determined to protect her people at all costs.

{{attribution Drogathar Bonecrusher, *The Bard's Tale*}}
}}

{{note
##### Time to Drop Knowledge
Use notes to point out some interesting information.

**Tables and lists** both work within a note.
}}

{{descriptive
##### Time to Drop Knowledge
Use descriptive boxes to highlight text that should be read aloud.

**Tables and lists** both work within a descriptive box.
}}

{{monster
## Necrotic Halitosis Angel
*Large annoyance, unaligned*
___
**Armor Class** :: 11 (chain mail, shield)
**Hit Points**  :: 85 (1d4 + 5)
**Speed**       :: 32 ft.
___
|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|6 (-2)|12 (+1)|14 (+2)|11 (+1)|4 (-3)|3 (-3)|
___
**Condition Immunities** :: melancholy, drunk, groggy
**Senses**               :: darkvision 60 ft., passive Perception 18
**Languages**            :: None
**Challenge**            :: 4 (451 XP) {{bonus **Proficiency Bonus** +5}}
___
***Onion Stench.*** Any creatures within 5 feet of this thing develops an irrational craving for onion rings.
:
***Fowl Appearance.*** While the creature remains motionless, it is indistinguishable from a normal chicken.
:
***Full of Detergent.*** This creature has swallowed an entire bottle of dish detergent and is actually having a pretty good time.

While walking near this creature, you must make a dexterity check or become "a soapy mess" for three hours, after which your skin will get all dry and itchy.
### Actions
***Scorpion Flurry.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Tilt-a-whirl Eye Takedown.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
}}

\column
{{monster,frame
## Mind Ferret
*Large annoyance, unoriginal neutral*
___
**Armor Class** :: 18 (chain mail, shield)
**Hit Points**  :: 129 (1d4 + 5)
**Speed**       :: 7 ft.
___
|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|1 (-4)|15 (+3)|13 (+2)|9 (+0)|1 (-4)|10 (+0)|
___
**Condition Immunities** :: None
**Senses**               :: darkvision 60 ft., passive Perception 10
**Languages**            :: None
**Challenge**            :: 6 (663 XP) {{bonus **Proficiency Bonus** +6}}
___
***Big Jerk.*** Whenever this creature makes an attack, it starts telling you how much cooler it is than you.
:
***Pack Tactics.*** These guys work together like peanut butter and jelly.
:
***Hangriness.*** This creature is angry, and hungry. It will refuse to do anything with you until its hunger is satisfied.

When in visual contact with this creature, you must purchase an extra order of fries, even if they say they aren't hungry.
### Actions
***Team Elbow.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Super Hip Submission.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
}}

\page

{{partCover}}

# PART X
## Lost City Ruins

{{imageMaskEdge6,--offset:10cm,--rotation:180
  ![Background image](https://i.imgur.com/9TU96xY.jpg){position:absolute,bottom:0,left:0,height:100%}
}}

\page

{{insideCover}}

# Evil Lake of the Merfolk
## Sands of Fate
___

{{imageMaskCenter8,--offsetX:0%,--offsetY:0%,--rotation:0
  ![background image](https://i.imgur.com/IsfUnFR.jpg){position:absolute,bottom:0,left:0,height:100%}
}}

{{logo ![](/assets/naturalCritLogoRed.svg)}}

\page

{{backCover}}

# The Necromancer

Enter a world of wonder and danger, where you can find allies and enemies among the various races and factions that inhabit it. You can choose to join or oppose any of them, or forge your own path. The game world is alive and responsive to your actions.
:
Experience a rich and immersive story that adapts to your actions and decisions. Every choice you make has consequences, for good or ill. Will you be a hero or a villain? A leader or a follower? A friend or a foe? The choice is yours.
:
Embark on a thrilling journey across a vast and varied world, where magic and mystery await you at every turn. Encounter strange creatures and ancient secrets, and forge your own destiny with your choices. The world is yours to shape and explore.
___

For use with any fantasy roleplaying ruleset. Play the best game of your life!

![background image](https://i.imgur.com/MJ4YHu7.jpg){position:absolute,bottom:0,left:0,height:100%}

{{logo
![](/assets/naturalCritLogoWhite.svg)

Homebrewery.Naturalcrit.com
}}

{{frontCover}}

{{logo ![](/assets/naturalCritLogoRed.svg)}}

# Vecna's Hidden Sage
## Dragon's Lair
___

{{banner HOMEBREW}}

{{footnote
  In an ominous empire, in an age of hate, two philosophers and a student try to find justice and battle a mob of mages intent on stealing the souls of the innocent.
}}

![background image](https://i.imgur.com/IwHRrbF.jpg){position:absolute,bottom:0,left:0,height:100%}

\page

{{monster,frame,wide
## Bored Avalanche Sheep of the Wasteland
*Small beast, manic-depressive evil*
___
**Armor Class** :: 15 (chain mail, shield)
**Hit Points**  :: 107 (1d4 + 5)
**Speed**       :: 17 ft.
___
|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|1 (-4)|16 (+3)|13 (+2)|1 (-4)|2 (-4)|5 (-2)|
___
**Condition Immunities** :: None
**Senses**               :: darkvision 60 ft., passive Perception 12
**Languages**            :: None
**Challenge**            :: 10 (5030 XP) {{bonus **Proficiency Bonus** +2}}
___
***Big Jerk.*** Whenever this creature makes an attack, it starts telling you how much cooler it is than you.
:
***Fowl Appearance.*** While the creature remains motionless, it is indistinguishable from a normal chicken.
:
***Pack Tactics.*** These guys work together like peanut butter and jelly.
:
***Enormous Nose.*** This creature gains advantage on any check involving putting things in its nose.
:
***Fowl Appearance.*** While the creature remains motionless, it is indistinguishable from a normal chicken.
:
***Sassiness.*** When questioned, this creature will talk back instead of answering.
:
***Full of Detergent.*** This creature has swallowed an entire bottle of dish detergent and is actually having a pretty good time.

While walking near this creature, you must make a dexterity check or become "a soapy mess" for three hours, after which your skin will get all dry and itchy.
### Actions
***Crossface Suplex.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Turnbuckle Roll.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Crossface Suplex.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Turnbuckle Roll.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Atomic Death Throw.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
:
***Team Elbow.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6 + 2) 
}}

\page

{{spellList,wide
##### Cantrips (0 Level) 
- Divine Spell of Crossdressing
- Extra-Planar Spell of Irritation
- Create Acne
- Sorcerous Dandruff Globe
- Call Fangirl
- Sorcerous Enchantment of the Chimneysweep
- Irritate Peanut Butter Fairy
- Luminous Erruption of Tea
- Illusionary Transfiguration of the Babysitter 

##### 1st Level 
- Cursed Ritual of Bad Hair
- Astral Rite of Acne
- Ultimate Ritual of Mouthwash
- Astounding Pasta Puddle
- Astonishing Chant of Chocolate
- Spiritual Invocation of the Costumers
- Occult Transfiguration of Foot Fetish
- Luminous Erruption of Tea
- Create Nervousness 

##### 2nd Level 
- Heal Bad Hygene
- Necromantic Armor of Salad Dressing
- Astounding Pasta Puddle
- Create Acne
- Overwhelming Enchantment of the Chocolate Fairy 

##### 3rd Level 
- Create Acne
- Cursed Ritual of Bad Hair
- Astounding Pasta Puddle
- Astral Rite of Acne
- Sorcerous Enchantment of the Chimneysweep
- Invoke Complaining
- Necromantic Armor of Salad Dressing
- Overwhelming Enchantment of the Chocolate Fairy
- Dispell Piles in Dentist
- Heavenly Transfiguration of the Cream Devil 

##### 4th Level 
- Heal Bad Hygene
- Eliminate Florists
- Sorcerous Dandruff Globe
- Ball of Annoyance 

##### 5th Level 
- Spiritual Invocation of the Costumers
- Magical Enchantment of Arrogance
- Extra-Planar Spell of Irritation
- Cage of Yarn
- Tinsel Blast
- Occult Transfiguration of Foot Fetish
- Occult Globe of Salad Dressing
- Divine Spell of Crossdressing
- Erruption of Immaturity
- Alchemical Evocation of the Goths 

##### 6th Level 
- Create Nervousness
- Eliminate Vindictiveness in Gym Teacher
- Luminous Erruption of Tea
- Astounding Pasta Puddle
- Talk to Groupie
- Dark Chant of the Dentists
- Divine Spell of Crossdressing
- Occult Transfiguration of Foot Fetish
- Call Fangirl 

##### 7th Level 
- Create Nervousness
- Occult Transfiguration of Foot Fetish
- Extra-Planar Spell of Irritation
- Cage of Yarn 

##### 8th Level 
- Hellish Cage of Mucus
- Irritate Peanut Butter Fairy
- Protection from Mucus Giant
- Flaming Disc of Inconvenience
- Control Noodles Elemental
- Talk to Groupie
- Ultimate Rite of the Confetti Angel 

##### 9th Level 
- Heavenly Transfiguration of the Cream Devil
- Create Acne
- Occult Globe of Salad Dressing
- Control Noodles Elemental
- Ball of Annoyance
- Astounding Pasta Puddle 

}}

\page
#### Heal Bad Hygene
*9th-level transmutation*

**Casting Time:** :: 1 action
**Range:**        :: 30 feet
**Components:**   :: V, S, M (discarded gum wrapper)
**Duration:**     :: Concentration, up to 10 minutes

A flame, equivalent in brightness to a torch, springs from an object that you touch. 
The effect look like a regular flame, but it creates no heat and doesn't use oxygen. 
A *continual flame* can be covered or hidden but not smothered or quenched.



## Class Features

As a linguist, you gain the following class features

#### Hit Points
**Hit Dice:**                    :: 1d10 per linguist level
**Hit Points at 1st Level:**     :: 10 + your Constitution modifier
**Hit Points at Higher Levels:** :: 1d10 (or 6) + your Constitution modifier per linguist level after 1st

#### Proficiencies
**Armor:**   :: None
**Weapons:** :: Squeegee
**Tools:**   :: Thieves' tools, one musical instrument

**Saving Throws:** :: Wisdom, Charisma
**Skills:**        :: Choose two from Acrobatics, Insight, Persuasion, Stealth, Animal Handling

#### Spellcasting Ability
{{text-align:center
**Spell save DC**:: = 8 + your proficiency bonus + your Intelligence modifier

**Spell attack modifier**:: = your proficiency bonus + your Intelligence modifier
}}

#### Equipment
You start with the following equipment, in addition to the equipment granted by your background:
- (*a*) a martial weapon and a shield or (*b*) two martial weapons
- (*a*) five javelins or (*b*) any simple melee weapon
- a cherished lost sock

\column

[Click here](#p3) to go to page 3
<!-- This is a comment that will not be rendered into your brew. Hotkey (Ctrl/Cmd + /). -->

{{homebreweryCredits
Made With

{{homebreweryIcon}}

The Homebrewery  
[Homebrewery.Naturalcrit.com](https://homebrewery.naturalcrit.com)
}}



::::


 {{width:100px}} 
 
 ![](https://api.qrserver.com/v1/create-qr-code/?data=https://homebrewery.naturalcrit.com&amp;size=100x100) {width:100px;mix-blend-mode:multiply}
 
 
{{watercolor2,top:20px,left:30px,width:300px,background-color:#BBAD82,opacity:80%}}

\page


 ![cat warrior](https://s-media-cache-ak0.pinimg.com/736x/4a/81/79/4a8179462cfdf39054a418efd4cb743e.jpg) {width:325px,mix-blend-mode:multiply}
 
\page

 
 ![homebrewery_mug](http://i.imgur.com/hMna6G0.png) 
{width:280px,margin-right:-3cm,wrapLeft}

\page
 
 ![homebrewery_mug](http://i.imgur.com/hMna6G0.png) {width:280px,margin-left:-3cm,wrapRight}
 
\page
 ![homebrew mug](http://i.imgur.com/hMna6G0.png) {position:absolute,top:50px,right:30px,width:280px}
 







\page

##### Character Advancement
| Experience Points | Level | Proficiency Bonus |
|:------------------|:-----:|:-----------------:|
| 0                 | 1     | +2                |
| 300               | 2     | +2                |
| 900               | 3     | +2                |
| 2,700             | 4     | +2                |
| 6,500             | 5     | +3                |
| 14,000            | 6     | +3                |


{{wide
##### Weapons
| Name                    | Cost  | Damage          | Weight  | Properties |
|:------------------------|:-----:|:----------------|--------:|:-----------|
| *Simple Melee Weapons*  |       |                 |         |            |
| &emsp; Club             | 1 sp  | 1d4 bludgeoning | 2 lb.   | Light      |
| &emsp; Dagger           | 2 gp  | 1d4 piercing    | 1 lb.   | Finesse    |
| &emsp; Spear            | 1 gp  | 1d6 piercing    | 3 lb.   | Thrown     |
| *Simple Ranged Weapons* |       |                 |         |            |
| &emsp; Dart             | 5 cp  | 1d4 piercig     | 1/4 lb. | Finesse    |
| &emsp; Shortbow         | 25 gp | 1d6 piercing    | 2 lb.   | Ammunition |
| &emsp; Sling            | 1 sp  | 1d4 bludgeoning | &mdash; | Ammunition |
}}


##### Typical Difficulty Classes
{{column-count:2
| Task Difficulty | DC |
|:----------------|:--:|
| Very easy       | 5  |
| Easy            | 10 |
| Medium          | 15 |

| Task Difficulty   | DC |
|:------------------|:--:|
| Hard              | 20 |
| Very hard         | 25 |
| Nearly impossible | 30 |
}}

{{classTable,frame,decoration
##### The Weirkeeper
| Level | Proficiency Bonus | Features | Plasma Gunslinger     |
|:-----:|:-----------------:|:---------|:---------------------:|
|  1st  |  +2  | Statistical Occultism |          2            |
|  2nd  |  +2  | Malefic Chemist       |          2            |
|  3rd  |  +2  | Malefic Chemist       |          3            |
|  4th  |  +2  | Phased Linguist       |          3            |
|  5th  |  +3  | Civil Divination      |          3            |
|  6th  |  +3  | Immunological Cultist |          4            |
|  7th  |  +3  | Biochemical Sorcery   |          4            |
|  8th  |  +3  | Orbital Gravedigger   |          4            |
|  9th  |  +4  | Consecrated Augury    |          4            |
| 10th  |  +4  | Seismological Alchemy |          4            |
| 11th  |  +4  | Seismological Alchemy |          4            |
| 12th  |  +4  | Gunpowder Torturer    |          5            |
| 13th  |  +5  | Seismological Alchemy |          5            |
| 14th  |  +5  | Phased Linguist       |          5            |
| 15th  |  +5  | Civil Divination      |          5            |
| 16th  |  +5  | Biochemical Sorcery   |          5            |
| 17th  |  +6  | Pharmaceutical Outlaw |          6            |
| 18th  |  +6  | Astrological Botany   |          6            |
| 19th  |  +6  | Torque Interfacer     |          6            |
| 20th  |  +6  | Hermetic Geography    |      unlimited        |
}}

\page

{{classTable,wide
##### The Fishmonger
| Level | Proficiency | Features     | Cantrips | --- Spell Slots Per Spell Level ---|||||||||
|      ^| Bonus      ^|             ^| Known   ^|1st |2nd |3rd |4th |5th |6th |7th |8th |9th |
|:-----:|:-----------:|:-------------|:--------:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|  1st  | +2 | Ritual Astronomy      |    2     | 2  | —  | —  | —  | —  | —  | —  | —  | —  |
|  2nd  | +2 | Torque Interfacer     |    2     | 3  | —  | —  | —  | —  | —  | —  | —  | —  |
|  3rd  | +2 | Pharmaceutical Outlaw |    2     | 4  | 2  | —  | —  | —  | —  | —  | —  | —  |
|  4th  | +2 | Biochemical Sorcery   |    3     | 4  | 3  | —  | —  | —  | —  | —  | —  | —  |
|  5th  | +3 | Gunpowder Torturer    |    3     | 4  | 3  | 2  | —  | —  | —  | —  | —  | —  |
|  6th  | +3 | Genetic Banishing     |    3     | 4  | 3  | 3  | —  | —  | —  | —  | —  | —  |
|  7th  | +3 | Spell Analyst         |    3     | 4  | 3  | 3  | 1  | —  | —  | —  | —  | —  |
|  8th  | +3 | Spell Analyst         |    3     | 4  | 3  | 3  | 2  | —  | —  | —  | —  | —  |
|  9th  | +4 | Police Necromancer    |    3     | 4  | 3  | 3  | 2  | 1  | —  | —  | —  | —  |
| 10th  | +4 | Torque Interfacer     |    3     | 4  | 3  | 3  | 2  | 1  | —  | —  | —  | —  |
| 11th  | +4 | Astrological Botany   |    4     | 4  | 3  | 3  | 2  | 1  | 1  | —  | —  | —  |
| 12th  | +4 | Sixgun Poisoner       |    4     | 4  | 3  | 3  | 2  | 1  | 1  | —  | —  | —  |
| 13th  | +5 | Exo Interfacer        |    4     | 4  | 3  | 3  | 2  | 1  | 1  | 1  | —  | —  |
| 14th  | +5 | Astrological Botany   |    4     | 4  | 3  | 3  | 2  | 1  | 1  | 1  | —  | —  |
| 15th  | +5 | Hermetic Geography    |    4     | 4  | 3  | 3  | 2  | 1  | 1  | 1  | 1  | —  |
| 16th  | +5 | Immunological Cultist |    4     | 4  | 3  | 3  | 2  | 1  | 1  | 1  | 1  | —  |
| 17th  | +6 | Biochemical Sorcery   |    4     | 4  | 3  | 3  | 2  | 1  | 1  | 1  | 1  | 1  |
| 18th  | +6 | Civil Divination      |    4     | 4  | 3  | 3  | 3  | 1  | 1  | 1  | 1  | 1  |
| 19th  | +6 | Biochemical Sorcery   |    4     | 4  | 3  | 3  | 3  | 2  | 2  | 1  | 1  | 1  |
| 20th  | +6 | Spiritual Illusionism |    4     | 4  | 3  | 3  | 3  | 2  | 2  | 2  | 1  | 1  |
}}



{{classTable,frame,decoration,wide
##### The Weirkeeper
| Level | Proficiency | Features     | Spells |--- Spell Slots Per Spell Level ---|||||
|      ^| Bonus      ^|             ^| Known ^|  1st  |  2nd  |  3rd  |  4th  |  5th  |
|:-----:|:-----------:|:-------------|:------:|:-----:|:-----:|:-----:|:-----:|:-----:|
|  1st  | +2 | Divinatory Mineralogy |   —    |   —   |   —   |   —   |   —   |   —   |
|  2nd  | +2 | Pharmaceutical Outlaw |   2    |   2   |   —   |   —   |   —   |   —   |
|  3rd  | +2 | Orbital Gravedigger   |   3    |   3   |   —   |   —   |   —   |   —   |
|  4th  | +2 | Phased Linguist       |   3    |   3   |   —   |   —   |   —   |   —   |
|  5th  | +3 | Malefic Chemist       |   4    |   4   |   2   |   —   |   —   |   —   |
|  6th  | +3 | Orbital Gravedigger   |   4    |   4   |   2   |   —   |   —   |   —   |
|  7th  | +3 | Plasma Gunslinger     |   5    |   4   |   3   |   —   |   —   |   —   |
|  8th  | +3 | Mathematical Pharmacy |   5    |   4   |   3   |   —   |   —   |   —   |
|  9th  | +4 | Mathematical Pharmacy |   6    |   4   |   3   |   2   |   —   |   —   |
| 10th  | +4 | Immunological Cultist |   6    |   4   |   3   |   2   |   —   |   —   |
| 11th  | +4 | Pharmaceutical Outlaw |   7    |   4   |   3   |   3   |   —   |   —   |
| 12th  | +4 | Nuclear Biochemistry  |   7    |   4   |   3   |   3   |   —   |   —   |
| 13th  | +5 | Pharmaceutical Outlaw |   8    |   4   |   3   |   3   |   1   |   —   |
| 14th  | +5 | Seismological Alchemy |   8    |   4   |   3   |   3   |   1   |   —   |
| 15th  | +5 | Pharmaceutical Outlaw |   9    |   4   |   3   |   3   |   2   |   —   |
| 16th  | +5 | Pharmaceutical Outlaw |   9    |   4   |   3   |   3   |   2   |   —   |
| 17th  | +6 | Ritual Astronomy      |   10   |   4   |   3   |   3   |   3   |   1   |
| 18th  | +6 | Orbital Gravedigger   |   10   |   4   |   3   |   3   |   3   |   1   |
| 19th  | +6 | Police Necromancer    |   11   |   4   |   3   |   3   |   3   |   2   |
| 20th  | +6 | Hermetic Geography    |   11   |   4   |   3   |   3   |   3   |   2   |
}}

\page
##### Dwarvish Runes: Sample Alphabet
{{runeTable,wide,frame,font-family:Davek
| a | b | c | d | e | f | g | h | i | j | k | l | m |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| a | b | c | d | e | f | g | h | i | j | k | l | m |
:
| n | o | p | q | r | s | t | u | v | w | x | y | z |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| n | o | p | q | r | s | t | u | v | w | x | y | z |
}}


##### Elvish Runes: Sample Alphabet
{{runeTable,wide,frame,font-family:Rellanic
| a | b | c | d | e | f | g | h | i | j | k | l | m |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| a | b | c | d | e | f | g | h | i | j | k | l | m |
:
| n | o | p | q | r | s | t | u | v | w | x | y | z |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| n | o | p | q | r | s | t | u | v | w | x | y | z |
}}

##### Draconic Runes: Sample Alphabet
{{runeTable,wide,frame,font-family:Iokharic
| a | b | c | d | e | f | g | h | i | j | k | l | m |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| a | b | c | d | e | f | g | h | i | j | k | l | m |
:
| n | o | p | q | r | s | t | u | v | w | x | y | z |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| n | o | p | q | r | s | t | u | v | w | x | y | z |
}}

\page
{{license,wide
Copyright \<YEAR\> \<COPYRIGHT HOLDER\>
:
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
:
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
}}