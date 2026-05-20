# Northwatch Wardens — Voice Guide

The campaign voice is grounded frontier realism. The world is cold, material, and indifferent. Magic is old and wrong. People survive by working hard and not asking too many questions.

---

## Core techniques

### 1. Observe, don't interpret

The narrator describes what's there. The narrator does not explain what it means or how the players should feel about it.

**Wrong:** "You sense that something terrible happened here."
**Right:** "The fire in the hearth is out. There's still food on the table."

**Wrong:** "The wolves seem unnaturally intelligent, as if guided by a dark force."
**Right:** "The wolves don't charge. They circle. One of them — the grey one — keeps watching the door behind you."

### 2. Sensory specificity over atmospheric vagueness

Choose a texture, a smell, a sound over a mood word. The mood follows from the detail; the detail doesn't follow from the mood.

**Wrong:** "The cave has an eerie, oppressive atmosphere."
**Right:** "The cave smells like old pennies. The walls are slick. Your torchlight doesn't reach the back."

**Wrong:** "The inn feels welcoming."
**Right:** "The fire is going. Someone left a mug on the bar with half a drink still in it."

### 3. The detail that doesn't fit

Echo clues and menace both work the same way: one specific thing that's wrong, unexplained, left for the players to sit with.

**Echo clue examples:**
- "The sheep won't enter the eastern pasture. They mill at the fence line, ears flat, facing away."
- "The innkeeper's cat hasn't blinked in three days."
- "Three crows on the fence post. None of them have moved since you arrived."
- "The grain in the mill is frozen. The mill itself is not."
- "The river downstream runs clear. Upstream, where nothing has changed, it runs grey."

What makes these work: **specific** (not "animals act strangely"), **deniable** (could be coincidence), **no explanation given**.

### 4. Ending on action, not description

Read-aloud text ends with something that demands a player response — a gap, a question, a presence.

**Wrong ending:** "The village square is empty and silent."
**Right ending:** "The village square is empty. One of the windows above the smithy is open. The curtain moves — but there's no wind."

**Wrong ending:** "You can see the road ahead continues north."
**Right ending:** "The road north continues. Something on it, half a mile out, isn't moving."

### 5. NPC voice through specificity

Don't describe how an NPC speaks — show it in one line of dialogue. The mannerism is the characterization.

**Wrong:** "He's a nervous man who speaks in fragments."
**Right:** "He says: 'There were — look, I don't know what I saw. Okay? I don't know.'"

**Wrong:** "She speaks bluntly and is used to command."
**Right:** "She says: 'You have until morning. Don't make me say it twice.'"

---

## Read-aloud template

```
{{descriptive
[Establish the space — one physical anchor: floor, ceiling, air, smell.]
[The detail that doesn't fit — one thing out of place or wrong.]
[The action hook — what demands a response.]
}}
```

**Example:**
```
{{descriptive
The barn smells like hay and something under it — something that's been warm and then wasn't.
Three lanterns hang from the beam. One is still swinging.
The ladder to the loft is on its side.
}}
```

---

## Homebrewery wrappers reference

| Content type | Wrapper |
|-------------|---------|
| Player read-aloud | `{{descriptive` ... `}}` |
| DM-only note | `{{note` ... `}}` |
| NPC stat block | `{{monster,frame` ... `}}` |
| Page break | `\page` |
| Column break | `\column` |

---

## What to avoid

| Avoid | Because |
|-------|---------|
| "you feel / sense / notice a feeling of" | Dictates player emotion |
| "ancient evil", "dark forces", "eldritch" | Generic; earned by no specific detail |
| "mystical power", "arcane energy" (vague) | Says nothing |
| 3+ adjectives on one noun | Sounds desperate; one good noun beats three weak ones |
| NPC explains the Echo clue | Removes player agency over interpretation |
| Read-aloud that ends on a static description | Gives players nothing to act on |
