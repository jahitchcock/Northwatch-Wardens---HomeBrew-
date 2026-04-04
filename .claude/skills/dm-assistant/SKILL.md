---
name: dm-assistant
description: DM Assistant router for Northwatch Wardens. Use when the user asks for DM help or campaign management without specifying a workflow. Routes to session-prep, new-adventure, new-npc, or canon-check based on intent.
disable-model-invocation: true
argument-hint: [session-prep|new-adventure|new-npc|canon-check] [details]
---

DM Assistant for the Northwatch Wardens campaign.

User said: **$ARGUMENTS**

## Routing

If the intent is clear from $ARGUMENTS, invoke the appropriate skill immediately using the Skill tool — pass any relevant details as arguments:

| User wants... | Invoke |
|---------------|--------|
| Prep for a session / what to know for next session | `session-prep` |
| Write / create / scaffold a new adventure | `new-adventure` |
| Create / generate / add a new NPC or character | `new-npc` |
| Review / check / validate content for canon | `canon-check` |

## If no clear intent

Present this menu and ask which they need:

---

**DM Assistant — Northwatch Wardens**

| Skill | Purpose |
|-------|---------|
| `/session-prep` | Generate a one-page session prep document |
| `/new-adventure` | Scaffold a new adventure with full structure |
| `/new-npc` | Create an NPC with stat block, XML, and roster entry |
| `/canon-check [file/"check all"]` | Verify geography, NPCs, player-facing rules, and tone |
