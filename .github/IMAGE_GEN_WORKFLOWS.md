# Image Generation Workflows

Improved asset generation patterns using the P40-optimized image-gen backend.

## NPC Portraits (Core Roster)

**Goal:** Consistent, high-quality faces for the recurring guild NPCs.

**Workflow:**
1. Draft a concise character brief: appearance, role, mood (e.g. "Marshal Brenna Thorne: weathered half-elf ranger, confident authority").
2. Call `generate_image_face_locked_hq()` with the prompt + `style="photoreal"` (clean).
3. If the first pass misses the mark, set `feedback=True` to enable batch critique:
   - The backend will automatically revise the prompt based on anatomy + vision feedback.
   - Run 2–3 iterations. Each adds ~30s but the refinement is often worth it.
4. Save final output to `npcs/core/<npc-name>/portrait.png`.

**Checkpoints:** `realisticVisionV60B1` (best for portrait detail).

**When to use HQ:** Always for core NPCs. The quality jump justifies the 2–3 min generation time.

---

## Battlemaps (Encounters)

**Goal:** Print-ready, grid-aligned tactical maps for complex scenes.

**Workflow:**
1. Describe the scene: terrain, layout, mood (e.g. "underground throne room in Salsvault ruins, crumbling stone pillars, glowing echo-runes on walls").
2. Call `generate_battlemap_topdown_sdxl_hq()` with the prompt + intended dimensions.
3. The pipeline auto-applies:
   - Hi-res fix (1.5× upscale mid-pass).
   - ESRGAN post-upscale to final size.
   - Grid overlay + page-tiling for print.
4. Output lands directly in `build/maps/<encounter-name>.png`.

**Checkpoints:** `dnd_battlemaps_sdxl_v1` (specialized for dungeon aesthetics).

**When to use HQ:** For key encounters (boss fights, secret lairs, major scenes). Fast battles / random encounters can skip HQ.

**Tip:** If a map feels off aesthetically after the first pass, set `feedback=True` to iterate. The vision critique often catches "off-brand" details (e.g. too modern, too dark, missing atmosphere).

---

## Book Covers (Novels)

**Goal:** Professional, evocative covers for *The Old Songs of Aevoria* series.

**Workflow:**
1. Write a thematic prompt grounded in the book's events and aesthetic (e.g. "A lone figure in ancient Aevoria, holding a memory stone, mountains at dawn, ethereal light, muted golds and deep blues").
2. Call `generate_image_flux()` (new Flux 1.0 backend) — it's the best for hero art.
3. Optional: enable feedback loop for 2–3 batch passes to refine lighting, composition, color harmony.
4. Save final to `Novels/<Book>/cover.png`.

**Style:** Use `style="fantasy"` for painterly, `style="photoreal"` for photorealistic fantasy.

**When to use Flux:** Always for covers. Flux 1.0 handles complex compositions and fine detail better than SDXL.

---

## Batch Iteration Pattern (Feedback Loop)

When you need 2–5 variations of a single asset (e.g. exploring different Brenna moods, testing map layouts):

1. Set `feedback=True` + `num_images=3` (or 5).
2. Each image after the first auto-critiques and refines the prompt.
3. Optional: set `rotate_enhance_lms=True` to rotate among 3 LLMs for diverse perspectives.
4. Review the batch in the web viewer, select the best, and use that.

**Cost:** Slower (~30s per image) but higher hit rate than rolling the dice 5 times independently.

**When to use:** Key NPCs, boss encounters, book cover iterations. Skip for one-off NPCs or minor maps.

---

## Viewer Gallery (Coming Soon)

Once the viewer enhancements land, you'll be able to:
- Browse generated assets by folder (maps, portraits, covers).
- Sort by date (newest), size, or alphabetically.
- Play a slideshow for quick review.
- **Face-lock from selected images:** pick a portrait and generate variations of it without re-running the whole prompt-to-face pipeline.

This will make batch iteration much faster.

---

## Quick Reference

| Asset Type | Pipeline | HQ Variant | Time | When |
|---|---|---|---|---|
| NPC portrait | `generate_npc_image` | `generate_image_face_locked_hq` | 45s / 2–3 min | Core NPCs always; minor NPCs optional |
| Battlemap | `generate_battlemap_mapcraft` | `generate_battlemap_topdown_sdxl_hq` | 1 min / 3 min | Key encounters always; filler optional |
| Book cover | `generate_image` | `generate_image_flux` | N/A | Always use Flux for covers |
| Batch (3–5 images) | Standard `num_images` | With `feedback=True` | 3–5 min / 8–12 min | Iteration on key assets only |

---

## Checkpoint Cheat Sheet

- **SDXL for battlemaps:** `dnd_battlemaps_sdxl_v1`, `juggernautXL_v9`.
- **SDXL for portraits:** `realisticVisionV60B1`, `realvisxlV50`, `rpg_v5`.
- **SDXL for painterly:** `dreamshaper_8`.
- **Flux 1.0 (GGUF):** Use for hero art, book covers, complex compositions — no checkpoint selection needed (model auto-loads).
