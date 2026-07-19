# Eval 4: Elder-Elowen Seam Register Violations

**Source passage tested**: The pass scene (anonymous excerpt)
**Rules source**: `SKILL.md` §1 "The Seam" + "Three Registers" + "House Rules" + "Anaphoric Tic Prevention"
**Review date**: 2026-06-27

---

## Seam #1 — "I was young. I still believed a thing kept was a thing saved."

This is the skill's own canonical example of a correct seam in *content* — elder-Elowen's hindsight bleeding into a young scene, one sentence, aphoristic, emotional. However:

### Violation: Formatting — not italicized

The SKILL.md is explicit: "Format: always **italicized** to distinguish from young-Elowen narration." This seam appears as plain body text. Rule reference: §1, "The Seam" paragraph 2.

**Fix required**: Enclose in asterisks: `*I was young. I still believed a thing kept was a thing saved.*`

---

## Seam #2 — "I did not know then that I would remember that sky. That particular gray. That exact weight of the air before rain. I did not know that I would spend years trying to return to this moment. I did not know that I would come back here alone, years later, and stand on this same pass and find the wind still sounded the same. I did not know that the mountains would outlast everyone I loved. I did not know that I would return to the Nullwood and find the grove where Wren and I had buried our losses and that the grove would be gone, burned in a fire the forest had not seen in three hundred years. I did not know."

This paragraph contains **five distinct rule violations**, making it a compound failure of the elder-Elowen register.

### Violation 2a: Formatting — not italicized
Same as Violation 1. The entire paragraph must be italicized per §1 "The Seam." None of it is.

### Violation 2b: Severe length violation (register violation)
SKILL.md states: "One or two sentences, rarely a paragraph." And explicitly: "If the seam runs longer than 3 sentences, it is a register violation (prose has slipped into pure reflection and stopped telling the story)."

This paragraph is **8 sentences** (counting the fragments "That particular gray" and "That exact weight" as dependent clauses of the first sentence: functionally 6-8 independent or independent-clause structures). It is unquestionably a full paragraph of reflection — the exact thing the rule prohibits.

### Violation 2c: Anaphoric tic (craft violation)
SKILL.md §2 "Anaphoric Tic Prevention" states: "If a paragraph has 3+ sentences starting with the same structure, the first may be deliberate but the rest are the tic."

Six sentences begin with "I did not know" in rapid succession. The allowed triple-anaphora exception (§2, bullet 2) permits deliberate repetition that *builds meaning*. Here the repetition does not build — it sprawls. Each "I did not know" adds a *more specific* future detail rather than intensifying a single emotional note, which shifts the passage from craft into tic.

### Violation 2d: Lore-dump from the future (register violation)
SKILL.md §1, "The Seam": "Never a lore-dump or lecture from the future." And House Rule #3: "Earn the mythic through the personal. Cosmology only ever arrives *felt*, through one person in one moment. No lore for its own sake."

The clause "burned in a fire the forest had not seen in three hundred years" is a **specific future plot datum** delivered as exposition from elder-Elowen's vantage point. It is not emotional hindsight ("I did not know the mountains would outlast everyone I loved" is emotional); it is a lore-dump — a named event with a quantified timeframe that tells the reader a plot point from later in the timeline. This shifts the seam from *feeling* to *information delivery*.

### Violation 2e: Pure reflection without storytelling (register violation)
SKILL.md §1: "The voice's key move: elder-Elowen's hindsight bleeding into a young scene." The seam is meant to be a *bleed*, not a *stop*. An entire paragraph of backward-looking "I did not know" without any forward narrative momentum halts the story entirely. The passage does not return to the young scene after the seam begins — it stays in elder-Elowen's future for 8 sentences. This violates the principle that the seam is a brief intersection of two tenses, not a full retreat into the future.

---

## Context Violation: Two seams too close together

While not an explicit hard rule, SKILL.md says "Aim for one such seam per chapter" (under "The Seam"). The first seam appears at line 5 of the passage; the second begins at line 11. With only one narration paragraph between them, the effect is dilutive — neither seam lands with the weight a single, placed seam would carry. This is a **craft judgment** call but worth flagging.

---

## Character Voice Check

### Corwin: "There is something wrong with this place."
**PASS.** Zero contractions ("is," not "there's"). Bimodal sentence — appropriately short. Clean formal-archaic register.

### Brannoc: "Aye. Mountains don't stare back."
**BORDERLINE PASS.** "Aye" is within pattern for dwarven exclamations. "Don't" is appropriate for his colloquial-storyteller register (frequent contractions). The sentence is shorter than Brannoc's typical medium-long accumulative style, but "punchy declarations" is explicitly listed as one of his patterns. Not a violation, but worth noting it's at the short end of his range.

---

## Summary of Required Fixes

| # | Location | Violation | Severity | Required Action |
|---|---|---|---|---|
| 1 | "I was young. I still believed a thing kept was a thing saved." | Not italicized | Fix required | Add italics |
| 2a | "I did not know then..." entire paragraph | Not italicized | Fix required | Add italics |
| 2b | Same paragraph | Length — 8 sentences (max 3) | Register violation | Cut to 2-3 sentences max |
| 2c | Same paragraph | Anaphoric tic (6× "I did not know") | Craft violation | Reduce repetition; vary structure |
| 2d | Same paragraph — "burned in a fire..." | Lore-dump from the future | Register violation | Remove specific future plot datum; keep emotional register only |
| 2e | Same paragraph | Pure reflection, story halted | Register violation | Restore narrative momentum; let seam bleed into young scene |

**Total violations: 6** (1 formatting, 1 format+length+tic+lore+register compound, 1 format+length+tic+lore+register compound)

---

## Clean Rewrite (Suggested)

The emotional core of the passage — elder-Elowen's knowledge that these mountains and this moment will outlast everyone — is strong and worth keeping. A compliant version would collapse the 8-sentence seam into, e.g.:

> *I was young. I still believed a thing kept was a thing saved.*
>
> [narration interrupted here by Corwin]
>
> *I did not know then that the mountains would outlast everyone I loved. That I would spend years trying to return to this sky.*

This preserves the emotional beat without violating length, formatting, tic, or lore-dump rules.
