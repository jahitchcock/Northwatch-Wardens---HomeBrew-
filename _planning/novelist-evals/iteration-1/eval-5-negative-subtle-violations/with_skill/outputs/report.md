# Eval-5: Negative Subtle Violations — Report

**Reviewer:** Quality Reviewer (novelist skill v1.0)
**Passage:** Scene excerpt — unnamed chapter, party en route to ruins
**Skill applied:** `.claude/skills/novelist/SKILL.md`
**Canon firewall:** `.claude/skills/novelist/references/canon-firewall.md`

---

## Violation 1 — Pervasive Wrong Tense (Narration)

| Field | Value |
|---|---|
| **Line(s)** | Every narration line: "I'm looking…", "Wren comes…", "she says…", "Corwin walks…", "Brannoc snorts…", "we hear…", "A sound that comes…", "We all go still…" |
| **Rule** | §1 Voice at a Glance — POV & tense: "First person, Elowen, **past tense**." |
| **Violation** | The entire passage is written in present tense ("comes," "says," "walks," "snorts," "hears," "goes"). The series voice requires past tense throughout. |
| **Severity** | **Hard** — structural voice failure |
| **Fix** | Rewrite all narration to past tense: "I was looking at the map…", "Wren came up beside me.", "she said…", "Corwin walked over.", "Brannoc snorted.", "we heard it.", "A sound that came…", "We all went still." |

---

## Violation 2 — Corwin Uses Contractions

| Field | Value |
|---|---|
| **Line** | `Corwin walks over. "I'm telling you, we don't need a map. I've been this way before. It's fine."` |
| **Rule** | §3 Character Dialogue Voices — Corwin: "**None.** Always 'I am,' 'I have,' 'I do not,' 'it does not,' 'you are,' 'there is,' 'I was not'" |
| **Violation** | Corwin uses four contractions in a single line: "I'm," "don't," "I've," "It's." He should use zero contractions under any emotional state. |
| **Severity** | **Hard** — character voice boundary broken |
| **Should read** | `"I am telling you, we do not need a map. I have been this way before. It is fine."` |

---

## Violation 3 — Corwin Uses Anti-Pattern Line

| Field | Value |
|---|---|
| **Line** | `"I'm telling you, we don't need a map. I've been this way before. It's fine."` |
| **Rule** | §3 Character Dialogue Voices — Corwin anti-patterns: "No 'all right,' 'don't worry about it,' 'forget I said anything,' 'I heal fast'" |
| **Violation** | "It's fine" belongs to the same casual-reassurance register as the explicitly forbidden anti-patterns. Corwin does not offer casual reassurance. |
| **Severity** | **Soft** — register boundary |
| **Should read** | `"I am telling you, we do not need a map. I have been this way before. The way is known to me."` |

---

## Violation 4 — Elowen Speaks in Full Forms (No Contractions)

| Field | Value |
|---|---|
| **Line(s)** | `"You are too optimistic," I say. "That is your flaw."` / `"It is not fine," I say. "It signifies nothing."` / `"You are not helping," I say.` |
| **Rule** | §3 Character Dialogue Voices — Elowen: Contractions are "Moderate ('don't,' 'I'm,' 'you've')" |
| **Violation** | Elowen uses zero contractions across all three dialogue lines. "You are" should be "You're," "That is" should be "That's," "It is not" should be "It's not," "You are not" should be "You're not." Her spoken voice here is indistinguishable from Corwin's formal-archaic register. |
| **Severity** | **Hard** — character voice boundary broken |
| **Should read** | `"You're too optimistic. That's your flaw."` / `"It's not fine."` / `"You're not helping."` (Note: "It signifies nothing" removed — see Violation 5.) |

---

## Violation 5 — Elowen Speaks Corwin's Signature Line

| Field | Value |
|---|---|
| **Line** | `"It is not fine," I say. "It signifies nothing."` |
| **Rule** | §3 Character Dialogue Voices — the skill's Corwin example writes: `**Write:** "I am looking for fragments. I have been looking a long time. **It signifies nothing.**"` |
| **Violation** | "It signifies nothing" is the *exact sample line* the skill uses to demonstrate Corwin's formal-archaic diction. Having Elowen say this is a hard voice boundary violation — it is Corwin's verbal fingerprint, not Elowen's. Elowen's spoken voice is interrogative-echo, short fragments, moderate contractions — not archaic formality. |
| **Severity** | **Hard** — character voice boundary broken |
| **Should read** | `"It's not fine. That means something."` or simply `"It's not fine."` (allowing the silence to carry weight per the Restraint house rule) |

---

## Violation 6 — "The Echo" (Exandrian Phenomenon)

| Field | Value |
|---|---|
| **Line** | `A sound that comes not from the world but from the crack between worlds. The Echo.` |
| **Rule** | §4 Canon Firewall — Excluded entirely: "The dimensional rift / Echo." Canon-firewall.md §Subtle/Edge-Case: "'the rift in the sky' / 'the crack between worlds' → **The Echo** → Hard." |
| **Violation** | "The Echo" is named directly, and "the crack between worlds" is the descriptive identifier mapped in the firewall. Both reference the Exandrian dimensional rift phenomenon. Neither has a place in Aevoria deep-time. |
| **Severity** | **Hard** — canon firewall breach |
| **Suggested native replacement** | Replace "the crack between worlds" / "The Echo" with a native Aevoria phenomenon. Options: "the Thinning" (already in Book One geography — a boundary between realms native to Aevoria), "the Hollow Choir" (a sound-based phenomenon native to Nullwood lore), or "a resonance-slip" (a geomancy-based event tied to dwarven magic traditions). For example: *"A sound that came not from the world but from the Thinning. The Hollow Choir."* |

---

## Violation 7 — "The Aeorian Ruins" (Exandrian Location)

| Field | Value |
|---|---|
| **Line** | `"The Aeorian ruins are close," Corwin says.` |
| **Rule** | §4 Canon Firewall — Excluded entirely: "Aeor and anything Aeorian." Canon-firewall.md: "'the flying city' / 'the city of mages that fell' → **Aeor** → Hard." |
| **Violation** | "Aeorian ruins" directly uses the excluded proper name. Aeor is Exandrian geography and must be replaced. |
| **Severity** | **Hard** — canon firewall breach |
| **Suggested native replacement** | Replace with a native Aevoria deep-time ruin. Options: "the Emberlands ruin" (fire-shaping civilization remnants), "the sunken spires" (coastal/sunken peoples' ruins), or "the Hollow Choir" (already established in Book One geography). For example: *"The sunken spires are close," Corwin said.* (Note: "said" not "says" — see Violation 1.) |

---

## Summary Table

| # | Violation | Severity | Classification |
|---|---|---|---|
| 1 | Pervasive present tense in narration | Hard | Voice — tense |
| 2 | Corwin uses four contractions | Hard | Voice — character |
| 3 | Corwin uses casual-reassurance register | Soft | Voice — character (register) |
| 4 | Elowen uses zero contractions | Hard | Voice — character |
| 5 | Elowen speaks Corwin's signature line | Hard | Voice — character (boundary) |
| 6 | "The Echo" / "crack between worlds" | Hard | Canon firewall |
| 7 | "The Aeorian ruins" | Hard | Canon firewall |

**Total: 7 violations (6 hard, 1 soft)**

---

## Passed Checks

- **Anaphoric tic:** No chain of 3+ same-structure sentence starts. ✓
- **Brannoc's voice:** Contractions natural, uses "elf"/"human," drops subject. ✓
- **Wren's voice:** Contractions appropriate, short lines. ✓
- **Dialogue tags:** Simple ("said"/"says"). ✓ (tense aside)
- **Profanity:** None. ✓
- **Anachronism:** None detected. ✓
- **Purple prose:** None. ✓
