# New Adventure Requirements

## Canonical Geography — Northreach

**Single source of truth:** `canon-check/references/canonical-data.md`

Load that file for the authoritative location list and off-map references. Do not add locations here — update canonical-data.md instead.

---

## Adventure .md Checklist

Every adventure file must include all of the following:

- [ ] Front-matter comment: `<!-- Tags: Adventure, Season1 / Status: Draft / Type: Adventure -->`
- [ ] Header block: level range, estimated duration, setting location
- [ ] At least 3 adventure hooks (different entry points for different party backgrounds or prior sessions)
- [ ] Scenes with `{{descriptive}}` read-aloud blocks — 2–4 sentences, sensory-first, end with a hook
- [ ] `{{note}}` DM-only blocks for secrets, adjustments, and contingencies
- [ ] Combat encounters with explicit balancing notes: small party (2–3 players) and full party (4–5 players)
- [ ] At least one Aeorian Echo clue woven in naturally — **show, don't tell**, never announced
- [ ] Conclusion section with:
  - Success consequences
  - Partial success consequences
  - Failure consequences
  - 2 future hooks connecting to other adventures
- [ ] Page breaks: `\page`
- [ ] Footers on each page: `{{pageNumber,auto}}` + `{{footnote SECTION | ADVENTURE TITLE}}`

---

## Homebrewery Syntax Quick Reference

| Element | Syntax |
|---------|--------|
| Page break | `\page` |
| Column break | `\column` |
| Monster stat block | `{{monster,frame}}...{{}}` |
| DM note box | `{{note}}...{{}}` |
| Read-aloud text | `{{descriptive}}...{{}}` |

Page break heuristic: break at ~70–85 non-empty lines or ~450–550 words; prefer breaking just before a major `##` heading.

---

## Aeorian Echo Clue Design

The Echo is a spreading phenomenon tied to Salsvault and the buried Aeorian ruins. Clues should be:

- **Specific and sensory** — a behavior, a physical detail, an absence
- **Unexplained** — the party notices it; no NPC interprets it for them
- **Deniable** — could be coincidence, local folklore, or something mundane going wrong

Bad: *"You sense an ancient magical presence."*
Good: *"The sheep won't enter the eastern pasture. They mill at the fence line, ears flat, facing away from whatever is on the other side."*
