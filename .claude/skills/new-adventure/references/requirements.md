# New Adventure Requirements

## Canonical Geography — Northreach

**Only use locations from this table.** If a new location is needed, ask the user before proceeding.

| Location | Purpose |
|----------|---------|
| Waystone Inn | Guild HQ, mission hub |
| Welton | Town — Wolves of Welton adventure |
| Westly's Farm | Farm outside Welton |
| Shepherd's Crook Inn | Inn in the Welton area |
| Pinebrook | Town — Peril in Pinebrook adventure |
| Palebank Village | Village — Frozen Sick adventure |
| Croaker Cave | Cave — Frozen Sick adventure |
| Salsvault | Buried Aeorian ruins (source of the Echo mystery) |
| Temple of the Dragonknights | Capstone adventure, northwest mountains |
| Noke's Tower | Wild Sheep Chase adventure |

**Acceptable off-map references** (exist in Aevoria, but the party doesn't go there in Season One):
Solaris, Nullwood/Vaeltharyn, Stonebound Depths/Khardûn-Tharum, Vharoxis, Solace Nexus, Divinity's Beacon

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
