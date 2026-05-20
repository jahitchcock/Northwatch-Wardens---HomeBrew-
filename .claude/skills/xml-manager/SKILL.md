---
name: xml-manager
description: Handle Northwatch Wardens XML file operations — scan for the highest NPC UID or insert new NPC/adventure entries into LionsdenGameFiles/Northwatch_Wardens.xml. Use whenever a skill needs to read or write the campaign XML file. Triggers on: insert XML, add to campaign file, assign UID, xml-manager.
argument-hint: [scan-uid | insert-npc "<xml>" | insert-adventure "<xml>"]
allowed-tools: Read Write Grep
---

$ARGUMENTS

### scan-uid — grep `<uid>` in `LionsdenGameFiles/Northwatch_Wardens.xml`, return `Next available UID: <n+1>`

### insert-npc — read file, insert block after last `</npc>`, write. Confirm: `Inserted NPC [name] (UID [n]).`

### insert-adventure — read file, insert block before `</adventures>`, write. Confirm: `Inserted adventure [name].`

Show insertion content before writing unless calling skill already has approval.

`skill-self-review xml-manager --agentic`
