# Battlemap Generation Design

**Goal:** Add TTRPG battlemap generation to the image-gen pipeline and DM Panel, with two styles (top-down tactical and illustrated scene), exposed as MCP tools and a Maps tab in the web dashboard.

**Architecture:** Two new ComfyUI workflow JSONs in the image-gen project. Two pipeline functions + two MCP tools follow the existing pattern exactly. The DM Panel Node.js server calls ComfyUI directly at `http://127.0.0.1:8000` (same machine) — no extra process, no subprocess spawning.

**Tech Stack:** ComfyUI (port 8000), Node.js/Express (DM Panel, port 5050), Python MCP server (image-gen), SD 1.5-based dedicated battlemap checkpoints.

---

## 1. ComfyUI Workflows

Two new workflow JSON files in `f:/NewProject/image-gen/workflows/`:

### `txt2img_battlemap_topdown.json`

Same node graph as `txt2img_sd15.json` but **without** the hires-fix second KSampler pass (no nodes 9 and 10 — single pass is sufficient at 512×512). Output prefix `mapgen_topdown`. Images saved to ComfyUI's default output directory.

Node map (same IDs as txt2img_sd15 for consistency):
- `"1"` → `CheckpointLoaderSimple` — `ckpt_name`: placeholder `"battlemap_topdown.safetensors"` (overridden at runtime)
- `"3"` → `CLIPTextEncode` (positive) — default text: `"top-down dungeon battlemap, stone floor tiles, tactical RPG encounter map, bird's eye view, D&D style, detailed, clean lines, grid-compatible"`
- `"4"` → `CLIPTextEncode` (negative) — default: `"isometric, perspective view, 3d render, people, tokens, figures, text, watermark, blurry, low quality"`
- `"5"` → `EmptyLatentImage` — width: 512, height: 512, batch_size: 1
- `"6"` → `KSampler` — seed: 42, steps: 25, cfg: 7.0, sampler_name: `"euler_a"`, scheduler: `"normal"`, denoise: 1.0
- `"7"` → `VAEDecode`
- `"8"` → `SaveImage` — filename_prefix: `"mapgen_topdown"`

No VAELoader node — uses the checkpoint's built-in VAE.

### `txt2img_battlemap_scene.json`

Same minimal structure. Output prefix `mapgen_scene`.

- `"1"` → `CheckpointLoaderSimple` — `ckpt_name`: placeholder `"battlemap_scene.safetensors"`
- `"3"` → `CLIPTextEncode` (positive) — default: `"fantasy environment concept art, atmospheric scene, dramatic lighting, painterly, epic landscape, detailed environment, D&D fantasy setting"`
- `"4"` → `CLIPTextEncode` (negative) — default: `"grid, top-down, map, overhead view, photorealistic, text, watermark, nsfw, low quality"`
- `"5"` → `EmptyLatentImage` — width: 512, height: 512
- `"6"` → `KSampler` — seed: 42, steps: 25, cfg: 8.0, sampler_name: `"dpmpp_2m_sde"`, scheduler: `"karras"`, denoise: 1.0
- `"7"` → `VAEDecode`
- `"8"` → `SaveImage` — filename_prefix: `"mapgen_scene"`

---

## 2. workflow_runner.py

Add two functions to `f:/NewProject/image-gen/workflow_runner.py`:

```python
def run_battlemap_topdown(
    prompt: str,
    negative_prompt: str,
    seed: int,
    steps: int,
    cfg: float,
    ckpt_name: str | None = None,
) -> dict:
    wf = _load_workflow("txt2img_battlemap_topdown")
    if ckpt_name:
        wf["1"]["inputs"]["ckpt_name"] = ckpt_name
    wf["3"]["inputs"]["text"] = prompt
    wf["4"]["inputs"]["text"] = negative_prompt
    wf["6"]["inputs"]["seed"] = seed
    wf["6"]["inputs"]["steps"] = steps
    wf["6"]["inputs"]["cfg"] = cfg
    return run_and_save(wf, prefix="mapgen_topdown")


def run_battlemap_scene(
    prompt: str,
    negative_prompt: str,
    seed: int,
    steps: int,
    cfg: float,
    ckpt_name: str | None = None,
) -> dict:
    wf = _load_workflow("txt2img_battlemap_scene")
    if ckpt_name:
        wf["1"]["inputs"]["ckpt_name"] = ckpt_name
    wf["3"]["inputs"]["text"] = prompt
    wf["4"]["inputs"]["text"] = negative_prompt
    wf["6"]["inputs"]["seed"] = seed
    wf["6"]["inputs"]["steps"] = steps
    wf["6"]["inputs"]["cfg"] = cfg
    return run_and_save(wf, prefix="mapgen_scene")
```

`run_and_save` already handles output path and base64 encoding — no changes needed there.

---

## 3. image_pipeline.py

Add two public functions to `f:/NewProject/image-gen/image_pipeline.py`:

```python
BATTLEMAP_TOPDOWN_NEGATIVE = (
    "isometric, perspective view, 3d render, people, tokens, figures, "
    "text, watermark, blurry, low quality, worst quality"
)

BATTLEMAP_SCENE_NEGATIVE = (
    "grid, top-down, map, overhead view, photorealistic, "
    "text, watermark, nsfw, low quality, worst quality"
)

def generate_battlemap_topdown(
    prompt: str,
    negative_prompt: str | None = None,
    seed: int | None = None,
    steps: int = 25,
    cfg: float = 7.0,
    model: str | None = None,
) -> dict:
    import random
    seed = seed if seed is not None else random.randint(0, 2**32 - 1)
    neg = negative_prompt or BATTLEMAP_TOPDOWN_NEGATIVE
    _log(f"generate_battlemap_topdown seed={seed} steps={steps} cfg={cfg}")
    return run_battlemap_topdown(
        prompt=prompt, negative_prompt=neg,
        seed=seed, steps=steps, cfg=cfg, ckpt_name=model,
    )


def generate_battlemap_scene(
    prompt: str,
    negative_prompt: str | None = None,
    seed: int | None = None,
    steps: int = 25,
    cfg: float = 8.0,
    model: str | None = None,
) -> dict:
    import random
    seed = seed if seed is not None else random.randint(0, 2**32 - 1)
    neg = negative_prompt or BATTLEMAP_SCENE_NEGATIVE
    _log(f"generate_battlemap_scene seed={seed} steps={steps} cfg={cfg}")
    return run_battlemap_scene(
        prompt=prompt, negative_prompt=neg,
        seed=seed, steps=steps, cfg=cfg, ckpt_name=model,
    )
```

Add `run_battlemap_topdown, run_battlemap_scene` to the existing `from workflow_runner import ...` line.

---

## 4. mcp_server.py

### list_tools() additions

Two new `types.Tool` entries:

**`generate_battlemap_topdown`**
- Description: "Generate a top-down tactical battlemap using a TTRPG-trained checkpoint. Output is 512×512, bird's-eye view, suitable for VTT grids (Roll20, Foundry). Returns path and base64-encoded PNG. Generation takes 30-90 seconds."
- Required: `prompt`
- Optional: `negative_prompt` (str), `seed` (int), `steps` (int, default 25), `guidance_scale` (float, default 7.0), `model` (str — checkpoint filename override)

**`generate_battlemap_scene`**
- Description: "Generate an illustrated fantasy scene / environment art using a TTRPG-trained checkpoint. Output is 512×512, painterly atmospheric style. Suitable for handouts and theater-of-mind. Returns path and base64-encoded PNG."
- Required: `prompt`
- Optional: same as above, `guidance_scale` default 8.0

### call_tool() additions

Two new branches in the `call_tool` handler mirroring the existing `generate_image` pattern:

```python
elif name == "generate_battlemap_topdown":
    result = await loop.run_in_executor(
        _executor,
        lambda: image_pipeline.generate_battlemap_topdown(
            prompt=args["prompt"],
            negative_prompt=args.get("negative_prompt"),
            seed=args.get("seed"),
            steps=args.get("steps", 25),
            cfg=args.get("guidance_scale", 7.0),
            model=args.get("model"),
        ),
    )
    return [types.TextContent(type="text", text=json.dumps(result))]

elif name == "generate_battlemap_scene":
    result = await loop.run_in_executor(
        _executor,
        lambda: image_pipeline.generate_battlemap_scene(
            prompt=args["prompt"],
            negative_prompt=args.get("negative_prompt"),
            seed=args.get("seed"),
            steps=args.get("steps", 25),
            cfg=args.get("guidance_scale", 8.0),
            model=args.get("model"),
        ),
    )
    return [types.TextContent(type="text", text=json.dumps(result))]
```

---

## 5. DM Panel — Server (web/server.js)

### Output path constant

```javascript
const MAPS_OUTPUT_DIR = 'f:/NewProject/image-gen/output/maps';
```

The Node.js server reads maps from this directory. Maps are saved here by the `run_and_save` calls (see Section 6 — output routing).

### `GET /api/maps`

Returns list of generated map files, newest first:

```javascript
app.get('/api/maps', requireAuth, (req, res) => {
  if (!fs.existsSync(MAPS_OUTPUT_DIR)) return res.json([]);
  const files = fs.readdirSync(MAPS_OUTPUT_DIR)
    .filter(f => /\.(png|jpg|webp)$/i.test(f))
    .map(f => ({
      filename: f,
      url: `/maps-output/${encodeURIComponent(f)}`,
      mtime: fs.statSync(path.join(MAPS_OUTPUT_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);
  res.json(files);
});
```

### `GET /maps-output/:filename`

Serves map images as static files:

```javascript
app.use('/maps-output', requireAuth, express.static(MAPS_OUTPUT_DIR));
```

### `POST /api/maps/generate`

Accepts `{ style: "topdown"|"scene", prompt, negative_prompt?, seed?, steps?, cfg?, model? }`. Calls ComfyUI directly at `http://127.0.0.1:8000` by:

1. Loading the appropriate workflow JSON from `f:/NewProject/image-gen/workflows/`
2. Patching prompt, negative, seed, steps, cfg, ckpt_name
3. Generating a random `client_id`
4. POST to `http://127.0.0.1:8000/prompt` with `{ client_id, prompt: workflow }`
5. Poll `http://127.0.0.1:8000/history/{prompt_id}` until the job appears (max 120s, 2s interval)
6. Fetch output image from `http://127.0.0.1:8000/view?filename={filename}&type=output`
7. Save to `MAPS_OUTPUT_DIR/{style}_{timestamp}_{seed}.png`
8. Return `{ filename, url: "/maps-output/..." }`

Workflow JSON files loaded from `f:/NewProject/image-gen/workflows/txt2img_battlemap_topdown.json` and `txt2img_battlemap_scene.json`.

This is a long-running request (30-90s). The endpoint streams progress via SSE or simply holds the connection open and returns when done. The client shows a spinner during generation.

---

## 6. Output Routing — maps subfolder

`run_and_save` in `comfyui_client.py` currently saves to `output/`. To route battlemap outputs to `output/maps/`, override the `OUTPUT_DIR` per call or — simpler — accept a `subdir` parameter in `run_and_save`.

Change `run_and_save` signature:

```python
def run_and_save(workflow: dict, prefix: str = "gen", subdir: str = "") -> dict:
    out_dir = OUTPUT_DIR / subdir if subdir else OUTPUT_DIR
    out_dir.mkdir(exist_ok=True)
    # ... rest unchanged, save to out_dir instead of OUTPUT_DIR
```

`run_battlemap_topdown` and `run_battlemap_scene` call `run_and_save(wf, prefix="mapgen_topdown", subdir="maps")`.

The DM Panel's `MAPS_OUTPUT_DIR` points to this same `output/maps/` folder.

---

## 7. DM Panel — Client (web/public/app.js + index.html)

### Maps tab button

```html
<button class="tab" id="tab-maps" data-tab="maps">Maps</button>
```

Placed between Homebrew and Tools in the tab bar.

### `showMapsModal()`

Opens a modal with two sections:

**Generator form** (top):
- Style toggle: `[Top-down] [Scene]` (radio-style buttons)
- Prompt textarea (positive)
- Negative prompt textarea (collapsed by default, expandable)
- Generate button → POST `/api/maps/generate`, shows spinner, on success prepends new map to gallery

**Gallery** (below form):
- Fetches `GET /api/maps` on open
- Renders thumbnail grid (same `.ref-grid` pattern as NPCs/Locations)
- Each thumbnail is clickable → opens full-size image in a lightbox (new modal layer, just the image + close button)
- Map filename shown below thumbnail, truncated

### CSS additions (index.html `<style>`)

```css
.maps-form { padding: 16px; border-bottom: 1px solid #2a2a2a; }
.maps-style-toggle { display: flex; gap: 8px; margin-bottom: 12px; }
.maps-style-btn { padding: 6px 16px; border: 1px solid #444; background: #1a1a1a; color: #aaa; border-radius: 4px; cursor: pointer; }
.maps-style-btn.active { background: #2a4a6a; border-color: #4a8abf; color: #e8e0d0; }
.maps-prompt { width: 100%; background: #111; border: 1px solid #333; color: #e8e0d0; border-radius: 4px; padding: 8px; resize: vertical; min-height: 60px; font-family: inherit; font-size: 13px; }
.maps-generate-btn { margin-top: 10px; padding: 8px 24px; background: #2a4a2a; border: 1px solid #4a8a4a; color: #8adf8a; border-radius: 4px; cursor: pointer; }
.maps-generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.maps-gallery { padding: 16px; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
.maps-thumb { border-radius: 4px; overflow: hidden; cursor: pointer; border: 1px solid #2a2a2a; }
.maps-thumb img { width: 100%; display: block; }
.maps-thumb-name { font-size: 11px; color: #666; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.maps-spinner { text-align: center; padding: 20px; color: #666; }
```

---

## 8. Model Setup Notes (in spec, not in code)

The workflow JSON checkpoint names are overrideable at runtime via the `model` parameter. Recommended models to download from CivitAI before first use:

- **Top-down**: "DnD Map AI" or "Forgotten Adventures Battlemap" checkpoint (SD 1.5 base)
- **Scene**: "Fantasy Map / Environment" checkpoint or any SD 1.5 fantasy art checkpoint

Place `.safetensors` files in ComfyUI's `models/checkpoints/` folder. Pass the filename (e.g. `"dnd_map_ai_v2.safetensors"`) as the `model` parameter to override the workflow default. The workflow default `ckpt_name` values are placeholders — update them in the JSON once your preferred models are downloaded.

---

## Out of Scope

- Grid overlay post-processing (Pillow grid draw) — can be added later
- img2img variation from existing maps — can be added later
- Map storage in the campaign markdown files — maps live in `output/maps/` only
- SDXL support — SD 1.5 only for now (VRAM constraint)
