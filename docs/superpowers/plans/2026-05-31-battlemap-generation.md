# Battlemap Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add TTRPG battlemap generation to the image-gen MCP pipeline and DM Panel web dashboard, with two styles: top-down tactical and illustrated scene.

**Architecture:** Two new ComfyUI workflow JSONs drive generation. Two Python pipeline functions + two MCP tools follow the existing pattern in `workflow_runner.py` / `image_pipeline.py` / `mcp_server.py`. The DM Panel calls ComfyUI directly at `http://127.0.0.1:8000` from Node.js for dashboard-driven generation, saving outputs to `f:/NewProject/image-gen/output/maps/`. A new Maps tab in the DM Panel shows a generator form and gallery.

**Tech Stack:** ComfyUI (port 8000, REST API), Python 3.12 MCP server, Node.js/Express (DM Panel, port 5050), vanilla JS + CSS (no framework).

---

## File Map

| File | Change |
|------|--------|
| `f:/NewProject/image-gen/workflows/txt2img_battlemap_topdown.json` | **Create** — ComfyUI workflow for top-down maps |
| `f:/NewProject/image-gen/workflows/txt2img_battlemap_scene.json` | **Create** — ComfyUI workflow for illustrated scenes |
| `f:/NewProject/image-gen/comfyui_client.py` | **Modify** — add `subdir` param to `run_and_save()` and `save_output()` |
| `f:/NewProject/image-gen/workflow_runner.py` | **Modify** — add `run_battlemap_topdown()`, `run_battlemap_scene()` |
| `f:/NewProject/image-gen/image_pipeline.py` | **Modify** — add `generate_battlemap_topdown()`, `generate_battlemap_scene()` |
| `f:/NewProject/image-gen/mcp_server.py` | **Modify** — add two tools to `list_tools()` and two `elif` branches in `call_tool()` |
| `f:/NewProject/image-gen/tests/test_pipeline.py` | **Modify** — add battlemap pipeline tests |
| `web/server.js` | **Modify** — add `GET /api/maps`, `GET /maps-output/:file`, `POST /api/maps/generate` |
| `web/public/index.html` | **Modify** — add Maps tab button + CSS |
| `web/public/app.js` | **Modify** — add `showMapsModal()` and supporting functions |

---

## Task 1: ComfyUI Workflow JSONs

**Files:**
- Create: `f:/NewProject/image-gen/workflows/txt2img_battlemap_topdown.json`
- Create: `f:/NewProject/image-gen/workflows/txt2img_battlemap_scene.json`

- [ ] **Step 1: Create the top-down workflow JSON**

Write `f:/NewProject/image-gen/workflows/txt2img_battlemap_topdown.json`:

```json
{
  "1": {
    "class_type": "CheckpointLoaderSimple",
    "inputs": {
      "ckpt_name": "battlemap_topdown.safetensors"
    }
  },
  "3": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "top-down dungeon battlemap, stone floor tiles, tactical RPG encounter map, bird's eye view, D&D style, detailed, clean lines, grid-compatible",
      "clip": ["1", 1]
    }
  },
  "4": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "isometric, perspective view, 3d render, people, tokens, figures, text, watermark, blurry, low quality",
      "clip": ["1", 1]
    }
  },
  "5": {
    "class_type": "EmptyLatentImage",
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    }
  },
  "6": {
    "class_type": "KSampler",
    "inputs": {
      "seed": 42,
      "steps": 25,
      "cfg": 7.0,
      "sampler_name": "euler_a",
      "scheduler": "normal",
      "denoise": 1.0,
      "model": ["1", 0],
      "positive": ["3", 0],
      "negative": ["4", 0],
      "latent_image": ["5", 0]
    }
  },
  "7": {
    "class_type": "VAEDecode",
    "inputs": {
      "samples": ["6", 0],
      "vae": ["1", 2]
    }
  },
  "8": {
    "class_type": "SaveImage",
    "inputs": {
      "filename_prefix": "mapgen_topdown",
      "images": ["7", 0]
    }
  }
}
```

- [ ] **Step 2: Create the scene workflow JSON**

Write `f:/NewProject/image-gen/workflows/txt2img_battlemap_scene.json`:

```json
{
  "1": {
    "class_type": "CheckpointLoaderSimple",
    "inputs": {
      "ckpt_name": "battlemap_scene.safetensors"
    }
  },
  "3": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "fantasy environment concept art, atmospheric scene, dramatic lighting, painterly, epic landscape, detailed environment, D&D fantasy setting",
      "clip": ["1", 1]
    }
  },
  "4": {
    "class_type": "CLIPTextEncode",
    "inputs": {
      "text": "grid, top-down, map, overhead view, photorealistic, text, watermark, nsfw, low quality",
      "clip": ["1", 1]
    }
  },
  "5": {
    "class_type": "EmptyLatentImage",
    "inputs": {
      "width": 512,
      "height": 512,
      "batch_size": 1
    }
  },
  "6": {
    "class_type": "KSampler",
    "inputs": {
      "seed": 42,
      "steps": 25,
      "cfg": 8.0,
      "sampler_name": "dpmpp_2m_sde",
      "scheduler": "karras",
      "denoise": 1.0,
      "model": ["1", 0],
      "positive": ["3", 0],
      "negative": ["4", 0],
      "latent_image": ["5", 0]
    }
  },
  "7": {
    "class_type": "VAEDecode",
    "inputs": {
      "samples": ["6", 0],
      "vae": ["1", 2]
    }
  },
  "8": {
    "class_type": "SaveImage",
    "inputs": {
      "filename_prefix": "mapgen_scene",
      "images": ["7", 0]
    }
  }
}
```

- [ ] **Step 3: Verify JSON syntax**

```powershell
cd f:\NewProject\image-gen
python -c "import json; json.load(open('workflows/txt2img_battlemap_topdown.json')); json.load(open('workflows/txt2img_battlemap_scene.json')); print('OK')"
```
Expected: `OK`

- [ ] **Step 4: Commit**

```powershell
cd f:\NewProject\image-gen
git add workflows/txt2img_battlemap_topdown.json workflows/txt2img_battlemap_scene.json
git commit -m "feat: add battlemap ComfyUI workflow JSONs (topdown + scene)"
```

---

## Task 2: `comfyui_client.py` — subdir support

**Context:** `run_and_save()` currently saves all images to `output/`. We need battlemap images to land in `output/maps/`. Add an optional `subdir` parameter to `save_output()` and `run_and_save()`.

**Files:**
- Modify: `f:/NewProject/image-gen/comfyui_client.py:173-199`
- Test: `f:/NewProject/image-gen/tests/test_pipeline.py`

- [ ] **Step 1: Write the failing test**

Add to `f:/NewProject/image-gen/tests/test_pipeline.py` (append after existing tests):

```python
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from unittest.mock import patch, MagicMock
import comfyui_client


def test_save_output_default_subdir(tmp_path, monkeypatch):
    monkeypatch.setattr(comfyui_client, "OUTPUT_DIR", tmp_path)
    path_str, b64 = comfyui_client.save_output(b"PNG_BYTES", prefix="test")
    assert os.path.dirname(path_str) == str(tmp_path)
    assert "test_" in os.path.basename(path_str)


def test_save_output_with_subdir(tmp_path, monkeypatch):
    monkeypatch.setattr(comfyui_client, "OUTPUT_DIR", tmp_path)
    path_str, b64 = comfyui_client.save_output(b"PNG_BYTES", prefix="mapgen_topdown", subdir="maps")
    assert os.path.dirname(path_str) == str(tmp_path / "maps")
    assert os.path.exists(path_str)


def test_run_and_save_subdir(tmp_path, monkeypatch):
    monkeypatch.setattr(comfyui_client, "OUTPUT_DIR", tmp_path)
    with patch("comfyui_client.submit_prompt", return_value="fake-id"), \
         patch("comfyui_client.poll_until_done", return_value=[{"filename": "x.png", "subfolder": "", "type": "output"}]), \
         patch("comfyui_client.fetch_image", return_value=b"PNG"):
        result = comfyui_client.run_and_save({}, prefix="mapgen", subdir="maps")
    assert "maps" in result["path"]
    assert result["base64"]
```

- [ ] **Step 2: Run tests — expect failures**

```powershell
cd f:\NewProject\image-gen
.venv\Scripts\python.exe -m pytest tests/test_pipeline.py::test_save_output_with_subdir tests/test_pipeline.py::test_run_and_save_subdir -v
```
Expected: FAIL — `save_output() got an unexpected keyword argument 'subdir'`

- [ ] **Step 3: Modify `save_output()` to accept `subdir`**

In `f:/NewProject/image-gen/comfyui_client.py`, replace the `save_output` function (lines 173-183):

```python
def save_output(image_bytes: bytes, prefix: str = "catgen", subdir: str = "") -> tuple[str, str]:
    """Write image bytes to the local output directory.

    Returns (absolute_path, base64_string).
    """
    out_dir = OUTPUT_DIR / subdir if subdir else OUTPUT_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")[:22]
    filename = f"{prefix}_{timestamp}.png"
    path = out_dir / filename
    path.write_bytes(image_bytes)
    b64 = base64.b64encode(image_bytes).decode("utf-8")
    return str(path), b64
```

- [ ] **Step 4: Modify `run_and_save()` to pass `subdir`**

In `f:/NewProject/image-gen/comfyui_client.py`, replace the `run_and_save` function (lines 190-199):

```python
def run_and_save(workflow: dict, prefix: str = "catgen", subdir: str = "") -> dict:
    """Submit workflow, poll until done, fetch first output image, save locally.

    Returns {"path": str, "base64": str}.
    """
    prompt_id = submit_prompt(workflow)
    images_info = poll_until_done(prompt_id)
    image_bytes = fetch_image(images_info[-1])
    path, b64 = save_output(image_bytes, prefix, subdir=subdir)
    return {"path": path, "base64": b64}
```

- [ ] **Step 5: Run tests — expect pass**

```powershell
cd f:\NewProject\image-gen
.venv\Scripts\python.exe -m pytest tests/test_pipeline.py::test_save_output_default_subdir tests/test_pipeline.py::test_save_output_with_subdir tests/test_pipeline.py::test_run_and_save_subdir -v
```
Expected: 3 PASSED

- [ ] **Step 6: Commit**

```powershell
cd f:\NewProject\image-gen
git add comfyui_client.py tests/test_pipeline.py
git commit -m "feat: add subdir param to run_and_save / save_output"
```

---

## Task 3: `workflow_runner.py` — battlemap runner functions

**Context:** `workflow_runner.py` has one function per workflow. Each function deep-copies the workflow template, patches node inputs, calls `run_and_save`, and returns `{"path": str, "base64": str}`. Add two battlemap functions at the end of the file, before the `run_enhance` function.

**Files:**
- Modify: `f:/NewProject/image-gen/workflow_runner.py`

- [ ] **Step 1: Add the import change on line 14**

Current line 14:
```python
from comfyui_client import run_and_save, run_and_save_video, upload_image
```

No change needed — `run_and_save` is already imported. The `subdir` param is now available.

- [ ] **Step 2: Append two functions at the end of `workflow_runner.py`**

Add after the last function in the file (after line 396, after `run_enhance`):

```python
# ---------------------------------------------------------------------------
# Battlemap — top-down tactical
# Node map:
#   "1" → CheckpointLoaderSimple          → inputs.ckpt_name
#   "3" → CLIPTextEncode (positive)        → inputs.text
#   "4" → CLIPTextEncode (negative)        → inputs.text
#   "6" → KSampler                         → inputs.seed, steps, cfg
# ---------------------------------------------------------------------------

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
    return run_and_save(wf, prefix="mapgen_topdown", subdir="maps")


# ---------------------------------------------------------------------------
# Battlemap — illustrated scene
# Node map: same as topdown
# ---------------------------------------------------------------------------

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
    return run_and_save(wf, prefix="mapgen_scene", subdir="maps")
```

- [ ] **Step 3: Verify import works**

```powershell
cd f:\NewProject\image-gen
.venv\Scripts\python.exe -c "from workflow_runner import run_battlemap_topdown, run_battlemap_scene; print('OK')"
```
Expected: `OK`

- [ ] **Step 4: Commit**

```powershell
cd f:\NewProject\image-gen
git add workflow_runner.py
git commit -m "feat: add run_battlemap_topdown and run_battlemap_scene to workflow_runner"
```

---

## Task 4: `image_pipeline.py` — battlemap pipeline functions

**Context:** `image_pipeline.py` is the public API layer. It handles default prompts, random seed generation, logging, and calls into `workflow_runner`. The import line (line 14) needs two new names.

**Files:**
- Modify: `f:/NewProject/image-gen/image_pipeline.py:14`
- Modify: `f:/NewProject/image-gen/image_pipeline.py` (append)
- Test: `f:/NewProject/image-gen/tests/test_pipeline.py`

- [ ] **Step 1: Write failing tests**

Append to `f:/NewProject/image-gen/tests/test_pipeline.py`:

```python
import image_pipeline


def test_generate_battlemap_topdown_returns_dict(monkeypatch):
    monkeypatch.setattr(
        "image_pipeline.run_battlemap_topdown",
        lambda **kw: {"path": "/fake/map.png", "base64": "abc"},
    )
    result = image_pipeline.generate_battlemap_topdown(prompt="dungeon room")
    assert result["path"] == "/fake/map.png"
    assert result["base64"] == "abc"


def test_generate_battlemap_topdown_random_seed(monkeypatch):
    captured = {}
    def fake_run(**kw):
        captured["seed"] = kw["seed"]
        return {"path": "/x", "base64": "y"}
    monkeypatch.setattr("image_pipeline.run_battlemap_topdown", fake_run)
    image_pipeline.generate_battlemap_topdown(prompt="forest clearing")
    assert isinstance(captured["seed"], int)
    assert 0 <= captured["seed"] < 2**32


def test_generate_battlemap_scene_returns_dict(monkeypatch):
    monkeypatch.setattr(
        "image_pipeline.run_battlemap_scene",
        lambda **kw: {"path": "/fake/scene.png", "base64": "xyz"},
    )
    result = image_pipeline.generate_battlemap_scene(prompt="tavern interior")
    assert result["path"] == "/fake/scene.png"


def test_generate_battlemap_scene_default_cfg(monkeypatch):
    captured = {}
    def fake_run(**kw):
        captured["cfg"] = kw["cfg"]
        return {"path": "/x", "base64": "y"}
    monkeypatch.setattr("image_pipeline.run_battlemap_scene", fake_run)
    image_pipeline.generate_battlemap_scene(prompt="mountain pass")
    assert captured["cfg"] == 8.0
```

- [ ] **Step 2: Run tests — expect failures**

```powershell
cd f:\NewProject\image-gen
.venv\Scripts\python.exe -m pytest tests/test_pipeline.py::test_generate_battlemap_topdown_returns_dict -v
```
Expected: FAIL — `module 'image_pipeline' has no attribute 'generate_battlemap_topdown'`

- [ ] **Step 3: Update the import line in `image_pipeline.py`**

Current line 14:
```python
from workflow_runner import run_txt2img, run_img2img, run_facelock, run_enhance, run_img2vid_wan21, run_img2vid_wan21_upscaled, run_img2vid_wan21_interpolated, run_img2vid_ltxv
```

Replace with:
```python
from workflow_runner import run_txt2img, run_img2img, run_facelock, run_enhance, run_img2vid_wan21, run_img2vid_wan21_upscaled, run_img2vid_wan21_interpolated, run_img2vid_ltxv, run_battlemap_topdown, run_battlemap_scene
```

- [ ] **Step 4: Append battlemap functions at the end of `image_pipeline.py`**

```python
# ---------------------------------------------------------------------------
# Battlemap defaults
# ---------------------------------------------------------------------------

_BATTLEMAP_TOPDOWN_NEGATIVE = (
    "isometric, perspective view, 3d render, people, tokens, figures, "
    "text, watermark, blurry, low quality, worst quality"
)

_BATTLEMAP_SCENE_NEGATIVE = (
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
    """Generate a top-down tactical battlemap. Returns {"path": str, "base64": str}."""
    seed = seed if seed is not None else random.randint(0, 2**32 - 1)
    neg = negative_prompt or _BATTLEMAP_TOPDOWN_NEGATIVE
    _log(f"generate_battlemap_topdown seed={seed} steps={steps} cfg={cfg}")
    return run_battlemap_topdown(
        prompt=prompt,
        negative_prompt=neg,
        seed=seed,
        steps=steps,
        cfg=cfg,
        ckpt_name=model,
    )


def generate_battlemap_scene(
    prompt: str,
    negative_prompt: str | None = None,
    seed: int | None = None,
    steps: int = 25,
    cfg: float = 8.0,
    model: str | None = None,
) -> dict:
    """Generate an illustrated fantasy scene. Returns {"path": str, "base64": str}."""
    seed = seed if seed is not None else random.randint(0, 2**32 - 1)
    neg = negative_prompt or _BATTLEMAP_SCENE_NEGATIVE
    _log(f"generate_battlemap_scene seed={seed} steps={steps} cfg={cfg}")
    return run_battlemap_scene(
        prompt=prompt,
        negative_prompt=neg,
        seed=seed,
        steps=steps,
        cfg=cfg,
        ckpt_name=model,
    )
```

- [ ] **Step 5: Run all battlemap tests**

```powershell
cd f:\NewProject\image-gen
.venv\Scripts\python.exe -m pytest tests/test_pipeline.py::test_generate_battlemap_topdown_returns_dict tests/test_pipeline.py::test_generate_battlemap_topdown_random_seed tests/test_pipeline.py::test_generate_battlemap_scene_returns_dict tests/test_pipeline.py::test_generate_battlemap_scene_default_cfg -v
```
Expected: 4 PASSED

- [ ] **Step 6: Commit**

```powershell
cd f:\NewProject\image-gen
git add image_pipeline.py tests/test_pipeline.py
git commit -m "feat: add generate_battlemap_topdown and generate_battlemap_scene pipeline functions"
```

---

## Task 5: `mcp_server.py` — expose battlemap tools

**Context:** `mcp_server.py` has a `list_tools()` function that returns all tool schemas, and a `call_tool()` function with `elif name == "..."` branches. The `list_tools()` return list ends at line 835 (closing `]`). The `call_tool()` `else` branch is at line 1189. Both need additions.

**Files:**
- Modify: `f:/NewProject/image-gen/mcp_server.py:835` (list_tools)
- Modify: `f:/NewProject/image-gen/mcp_server.py:1189` (call_tool else)

- [ ] **Step 1: Add two tools to `list_tools()` before the closing `]`**

In `mcp_server.py`, find and replace the closing of `list_tools` — the last `]` before the blank line after the `img2img_from_reference` tool (line 835):

Find (the closing of the return list — lines 833-835):
```python
            )
        ),
    ]
```

Replace with:
```python
            )
        ),
        types.Tool(
            name="generate_battlemap_topdown",
            description=(
                "Generate a top-down tactical battlemap using a TTRPG-trained checkpoint. "
                "Output is 512×512, bird's-eye view, suitable for VTT grids (Roll20, Foundry). "
                "Returns path and base64-encoded PNG. Generation takes 30-90 seconds. "
                "OPTIMAL SETTINGS (6GB VRAM): steps=25, guidance_scale=7.0."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {
                        "type": "string",
                        "description": "Description of the map — terrain, rooms, features. E.g. 'dungeon throne room, cracked stone floor, torches on walls, pit trap in center'."
                    },
                    "negative_prompt": {
                        "type": "string",
                        "description": "Things to suppress. Optional — defaults to isometric/perspective/figures suppression."
                    },
                    "seed": {
                        "type": "integer",
                        "description": "Fixed seed for reproducibility. Omit for random."
                    },
                    "steps": {
                        "type": "integer",
                        "description": "Denoising steps. Default 25.",
                        "default": 25
                    },
                    "guidance_scale": {
                        "type": "number",
                        "description": "Prompt adherence, 5-15. Default 7.0.",
                        "default": 7.0
                    },
                    "model": {
                        "type": "string",
                        "description": "Checkpoint filename override, e.g. 'dnd_map_ai_v2.safetensors'. Optional."
                    }
                },
                "required": ["prompt"]
            },
            annotations=types.ToolAnnotations(
                readOnlyHint=False, destructiveHint=False,
                idempotentHint=False, openWorldHint=False,
            )
        ),
        types.Tool(
            name="generate_battlemap_scene",
            description=(
                "Generate an illustrated fantasy scene / environment art using a TTRPG-trained checkpoint. "
                "Output is 512×512, painterly atmospheric style. Suitable for handouts and theater-of-mind. "
                "Returns path and base64-encoded PNG. Generation takes 30-90 seconds. "
                "OPTIMAL SETTINGS (6GB VRAM): steps=25, guidance_scale=8.0."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "prompt": {
                        "type": "string",
                        "description": "Description of the scene — environment, mood, lighting. E.g. 'ancient forest shrine at dusk, glowing runes, mist rising from ground'."
                    },
                    "negative_prompt": {
                        "type": "string",
                        "description": "Things to suppress. Optional — defaults to grid/map/overhead suppression."
                    },
                    "seed": {
                        "type": "integer",
                        "description": "Fixed seed for reproducibility. Omit for random."
                    },
                    "steps": {
                        "type": "integer",
                        "description": "Denoising steps. Default 25.",
                        "default": 25
                    },
                    "guidance_scale": {
                        "type": "number",
                        "description": "Prompt adherence, 5-15. Default 8.0.",
                        "default": 8.0
                    },
                    "model": {
                        "type": "string",
                        "description": "Checkpoint filename override, e.g. 'fantasy_scene_v1.safetensors'. Optional."
                    }
                },
                "required": ["prompt"]
            },
            annotations=types.ToolAnnotations(
                readOnlyHint=False, destructiveHint=False,
                idempotentHint=False, openWorldHint=False,
            )
        ),
    ]
```

- [ ] **Step 2: Add `elif` branches before `else: raise ValueError` in `call_tool()`**

Find (line 1189):
```python
        else:
            raise ValueError(f"Unknown tool: {name}")
```

Replace with:
```python
        elif name == "generate_battlemap_topdown":
            steps = args.get("steps", 25)
            if not (1 <= steps <= 80):
                raise ValueError(f"steps must be 1-80, got {steps}")
            guidance = args.get("guidance_scale", 7.0)
            if not (1.0 <= guidance <= 20.0):
                raise ValueError(f"guidance_scale must be 1.0-20.0, got {guidance}")
            _args = args
            _log(f"generate_battlemap_topdown: dispatching to executor (steps={steps}, cfg={guidance})")
            result = await loop.run_in_executor(
                _executor,
                lambda: image_pipeline.generate_battlemap_topdown(
                    prompt=_args["prompt"],
                    negative_prompt=_args.get("negative_prompt"),
                    seed=_args.get("seed"),
                    steps=_args.get("steps", 25),
                    cfg=_args.get("guidance_scale", 7.0),
                    model=_args.get("model"),
                ),
            )

        elif name == "generate_battlemap_scene":
            steps = args.get("steps", 25)
            if not (1 <= steps <= 80):
                raise ValueError(f"steps must be 1-80, got {steps}")
            guidance = args.get("guidance_scale", 8.0)
            if not (1.0 <= guidance <= 20.0):
                raise ValueError(f"guidance_scale must be 1.0-20.0, got {guidance}")
            _args = args
            _log(f"generate_battlemap_scene: dispatching to executor (steps={steps}, cfg={guidance})")
            result = await loop.run_in_executor(
                _executor,
                lambda: image_pipeline.generate_battlemap_scene(
                    prompt=_args["prompt"],
                    negative_prompt=_args.get("negative_prompt"),
                    seed=_args.get("seed"),
                    steps=_args.get("steps", 25),
                    cfg=_args.get("guidance_scale", 8.0),
                    model=_args.get("model"),
                ),
            )

        else:
            raise ValueError(f"Unknown tool: {name}")
```

- [ ] **Step 3: Verify the MCP server imports and parses cleanly**

```powershell
cd f:\NewProject\image-gen
.venv\Scripts\python.exe -c "import mcp_server; print('OK')"
```
Expected: `OK` (no import errors)

- [ ] **Step 4: Commit**

```powershell
cd f:\NewProject\image-gen
git add mcp_server.py
git commit -m "feat: add generate_battlemap_topdown and generate_battlemap_scene MCP tools"
```

---

## Task 6: DM Panel server — maps API endpoints

**Context:** `web/server.js` runs at port 5050. It uses `requireAuth` middleware on protected routes. Maps are saved by the Python pipeline to `f:/NewProject/image-gen/output/maps/`. The server needs to: (1) serve that directory as static files, (2) return a JSON list of maps, (3) accept a generate request, call ComfyUI directly, and return the new file.

The generate endpoint loads the workflow JSON from `f:/NewProject/image-gen/workflows/`, patches it, POSTs to ComfyUI at `http://127.0.0.1:8000/prompt`, polls `/history/{id}`, fetches `/view?filename=...`, and saves the PNG to the maps output dir.

**Files:**
- Modify: `web/server.js`

- [ ] **Step 1: Add constants near the top of `web/server.js`**

Find the `CAMPAIGN_ROOT` constant (it's near the top of the file):
```javascript
const CAMPAIGN_ROOT = path.resolve(__dirname, '..');
```

Add immediately after it:
```javascript
const MAPS_OUTPUT_DIR = 'f:/NewProject/image-gen/output/maps';
const COMFYUI_URL = process.env.COMFYUI_URL || 'http://127.0.0.1:8000';
const BATTLEMAP_WORKFLOWS_DIR = 'f:/NewProject/image-gen/workflows';
```

- [ ] **Step 2: Add static route and `/api/maps` list endpoint**

Find the `// ─── Save image (clipboard paste)` section comment (around line 778). Add the following block immediately before it:

```javascript
// ─── Maps output static files ──────────────────────────────────────────────

app.use('/maps-output', requireAuth, (req, res, next) => {
  // Serve files from the image-gen maps output directory
  const fname = decodeURIComponent(req.path.replace(/^\//, ''));
  if (!/^[\w\-. ]+\.(png|jpg|webp)$/i.test(fname)) return res.status(400).end();
  const full = path.join(MAPS_OUTPUT_DIR, fname);
  if (!full.startsWith(MAPS_OUTPUT_DIR)) return res.status(403).end();
  res.sendFile(full, { root: '/' });
});

app.get('/api/maps', requireAuth, (req, res) => {
  try {
    if (!fs.existsSync(MAPS_OUTPUT_DIR)) return res.json([]);
    const files = fs.readdirSync(MAPS_OUTPUT_DIR)
      .filter(f => /\.(png|jpg|webp)$/i.test(f))
      .map(f => {
        const stat = fs.statSync(path.join(MAPS_OUTPUT_DIR, f));
        return { filename: f, url: `/maps-output/${encodeURIComponent(f)}`, mtime: stat.mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);
    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/maps/generate', requireAuth, express.json(), async (req, res) => {
  const { style, prompt, negative_prompt, seed, steps, cfg, model } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'prompt required' });
  if (!['topdown', 'scene'].includes(style)) return res.status(400).json({ error: 'style must be topdown or scene' });

  const workflowFile = style === 'topdown'
    ? path.join(BATTLEMAP_WORKFLOWS_DIR, 'txt2img_battlemap_topdown.json')
    : path.join(BATTLEMAP_WORKFLOWS_DIR, 'txt2img_battlemap_scene.json');

  let wf;
  try {
    wf = JSON.parse(fs.readFileSync(workflowFile, 'utf8'));
  } catch (e) {
    return res.status(500).json({ error: `Failed to load workflow: ${e.message}` });
  }

  const resolvedSeed = (seed != null) ? seed : Math.floor(Math.random() * 2**32);
  const resolvedSteps = steps || 25;
  const resolvedCfg = cfg || (style === 'topdown' ? 7.0 : 8.0);

  wf['3']['inputs']['text'] = prompt;
  if (negative_prompt) wf['4']['inputs']['text'] = negative_prompt;
  if (model) wf['1']['inputs']['ckpt_name'] = model;
  wf['6']['inputs']['seed'] = resolvedSeed;
  wf['6']['inputs']['steps'] = resolvedSteps;
  wf['6']['inputs']['cfg'] = resolvedCfg;

  const clientId = require('crypto').randomUUID();
  let promptId;
  try {
    const submitResp = await fetch(`${COMFYUI_URL}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: wf, client_id: clientId }),
    });
    if (!submitResp.ok) {
      const text = await submitResp.text();
      return res.status(502).json({ error: `ComfyUI rejected workflow: ${text}` });
    }
    const submitData = await submitResp.json();
    if (submitData.error) return res.status(502).json({ error: submitData.error });
    promptId = submitData.prompt_id;
  } catch (e) {
    return res.status(502).json({ error: `ComfyUI unreachable: ${e.message}` });
  }

  // Poll until done (max 120s)
  let imageInfo = null;
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      const histResp = await fetch(`${COMFYUI_URL}/history/${promptId}`);
      const hist = await histResp.json();
      if (hist[promptId]) {
        const entry = hist[promptId];
        if (entry.status?.status_str === 'error') {
          return res.status(502).json({ error: `ComfyUI error: ${JSON.stringify(entry.status.messages)}` });
        }
        for (const nodeOut of Object.values(entry.outputs || {})) {
          for (const img of (nodeOut.images || [])) {
            imageInfo = img;
          }
        }
        if (imageInfo) break;
      }
    } catch { /* keep polling */ }
  }

  if (!imageInfo) return res.status(504).json({ error: 'Generation timed out after 120s' });

  // Fetch image bytes from ComfyUI
  let imgBytes;
  try {
    const viewResp = await fetch(
      `${COMFYUI_URL}/view?filename=${encodeURIComponent(imageInfo.filename)}&subfolder=${encodeURIComponent(imageInfo.subfolder || '')}&type=${imageInfo.type || 'output'}`
    );
    if (!viewResp.ok) return res.status(502).json({ error: 'Failed to fetch image from ComfyUI' });
    imgBytes = Buffer.from(await viewResp.arrayBuffer());
  } catch (e) {
    return res.status(502).json({ error: `Failed to fetch image: ${e.message}` });
  }

  // Save to maps output dir
  fs.mkdirSync(MAPS_OUTPUT_DIR, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${style}_${timestamp}_${resolvedSeed}.png`;
  const outPath = path.join(MAPS_OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, imgBytes);

  res.json({ filename, url: `/maps-output/${encodeURIComponent(filename)}` });
});
```

- [ ] **Step 3: Verify server starts without error**

```powershell
# Kill any running server on 5050
$p = (netstat -ano | Select-String ":5050 .*LISTENING" | Select-Object -First 1).ToString().Trim().Split()[-1]
if ($p) { Stop-Process -Id $p -Force }
# Start server, capture 3 seconds of output
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "web"
Start-Sleep 3
# Check it's listening
netstat -ano | Select-String ":5050"
```
Expected: A line showing `0.0.0.0:5050 ... LISTENING`

- [ ] **Step 4: Test `/api/maps` returns empty array when dir doesn't exist yet**

```powershell
# This requires the session cookie — just verify the route is registered:
node -e "
const app = require('./web/server.js');
" 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 5
```
Expected: No error output (or only unrelated warnings).

- [ ] **Step 5: Commit**

```powershell
cd "c:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)"
git add web/server.js
git commit -m "feat: add /api/maps, /maps-output static route, and /api/maps/generate endpoint"
```

---

## Task 7: DM Panel client — Maps tab UI

**Context:** `web/public/index.html` has the tab bar at line 558-565. `web/public/app.js` has `showHomebrewModal()` as the most recent modal addition. The modal system uses `getFreeModal()` to get a modal element and sets `m.innerHTML` + adds `m.classList.add('visible')`.

**Files:**
- Modify: `web/public/index.html` (tab button + CSS)
- Modify: `web/public/app.js` (modal functions + tab listener)

- [ ] **Step 1: Add Maps tab button in `index.html`**

Find in `index.html`:
```html
      <button class="tab" id="tab-homebrew" data-tab="homebrew">Homebrew</button>
```

Replace with:
```html
      <button class="tab" id="tab-homebrew" data-tab="homebrew">Homebrew</button>
      <button class="tab" id="tab-maps" data-tab="maps">Maps</button>
```

- [ ] **Step 2: Add Maps CSS to `index.html` `<style>` block**

Find in the `<style>` block (near the homebrew CSS you can find by searching for `.hb-card`). Add after the homebrew block:

```css
    /* ── Maps tab ─────────────────────────────────────────────────────── */
    .maps-form { padding: 16px 20px; border-bottom: 1px solid #2a2a2a; }
    .maps-style-toggle { display: flex; gap: 8px; margin-bottom: 12px; }
    .maps-style-btn { padding: 6px 16px; border: 1px solid #444; background: #1a1a1a; color: #aaa; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .maps-style-btn.active { background: #1e3a5a; border-color: #3a7abf; color: #c8d8e8; }
    .maps-prompt-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
    .maps-prompt { width: 100%; box-sizing: border-box; background: #111; border: 1px solid #333; color: #e8e0d0; border-radius: 4px; padding: 8px; resize: vertical; min-height: 60px; font-family: inherit; font-size: 13px; margin-bottom: 8px; }
    .maps-prompt:focus { outline: none; border-color: #3a7abf; }
    .maps-generate-btn { padding: 8px 24px; background: #1e3a1e; border: 1px solid #3a7a3a; color: #7ada7a; border-radius: 4px; cursor: pointer; font-size: 13px; }
    .maps-generate-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .maps-spinner { text-align: center; padding: 12px; color: #666; font-size: 13px; }
    .maps-gen-error { color: #e05050; font-size: 13px; padding: 8px 0; }
    .maps-gallery { padding: 16px 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
    .maps-gallery-empty { padding: 32px; text-align: center; color: #555; font-size: 13px; }
    .maps-thumb { border-radius: 4px; overflow: hidden; cursor: pointer; border: 1px solid #2a2a2a; transition: border-color .15s; }
    .maps-thumb:hover { border-color: #3a7abf; }
    .maps-thumb img { width: 100%; display: block; }
    .maps-thumb-name { font-size: 11px; color: #666; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: #111; }
    .maps-lightbox { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; }
    .maps-lightbox img { max-width: 100%; max-height: 70vh; border-radius: 4px; }
    .maps-lightbox-name { margin-top: 8px; font-size: 12px; color: #666; }
```

- [ ] **Step 3: Add `showMapsModal()` and helpers to `app.js`**

Append at the end of `web/public/app.js`:

```javascript
// ── Maps tab ──────────────────────────────────────────────────────────────

async function showMapsModal() {
  const m = getFreeModal();
  if (!m) return;

  let style = 'topdown';
  let maps = [];

  function renderModal() {
    m.innerHTML = `
      <div class="ref-modal-header">
        <span class="ref-modal-title">Maps</span>
        <button class="ref-modal-close" onclick="closeTopModal()">✕</button>
      </div>
      <div class="maps-form">
        <div class="maps-style-toggle">
          <button class="maps-style-btn ${style === 'topdown' ? 'active' : ''}" data-style="topdown">Top-down</button>
          <button class="maps-style-btn ${style === 'scene' ? 'active' : ''}" data-style="scene">Scene</button>
        </div>
        <div class="maps-prompt-label">Prompt</div>
        <textarea class="maps-prompt" id="maps-prompt-input" placeholder="${style === 'topdown' ? 'dungeon throne room, cracked stone floor, torches, pit trap' : 'ancient forest shrine at dusk, glowing runes, mist'}"></textarea>
        <button class="maps-generate-btn" id="maps-gen-btn">Generate</button>
        <div id="maps-gen-status"></div>
      </div>
      <div class="maps-gallery" id="maps-gallery">
        ${maps.length === 0
          ? '<div class="maps-gallery-empty">No maps yet — generate one above.</div>'
          : maps.map(mp => `
            <div class="maps-thumb" data-url="${escapeHtml(mp.url)}" data-name="${escapeHtml(mp.filename)}">
              <img src="${escapeHtml(mp.url)}" alt="${escapeHtml(mp.filename)}" loading="lazy">
              <div class="maps-thumb-name">${escapeHtml(mp.filename)}</div>
            </div>`).join('')}
      </div>`;

    m.querySelectorAll('.maps-style-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        style = btn.dataset.style;
        renderModal();
      });
    });

    m.querySelector('#maps-gen-btn').addEventListener('click', async () => {
      const prompt = m.querySelector('#maps-prompt-input').value.trim();
      if (!prompt) return;
      const btn = m.querySelector('#maps-gen-btn');
      const status = m.querySelector('#maps-gen-status');
      btn.disabled = true;
      status.innerHTML = '<div class="maps-spinner">Generating… (30-90s)</div>';
      try {
        const r = await fetch('/api/maps/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ style, prompt }),
        });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Generation failed');
        maps.unshift(data);
        status.innerHTML = '';
        renderModal();
      } catch (e) {
        btn.disabled = false;
        status.innerHTML = `<div class="maps-gen-error">${escapeHtml(e.message)}</div>`;
      }
    });

    m.querySelectorAll('.maps-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const lb = getFreeModal();
        if (!lb) return;
        lb.innerHTML = `
          <div class="ref-modal-header">
            <button class="ref-modal-close" onclick="closeTopModal()">✕</button>
          </div>
          <div class="maps-lightbox">
            <img src="${thumb.dataset.url}" alt="${escapeHtml(thumb.dataset.name)}">
            <div class="maps-lightbox-name">${escapeHtml(thumb.dataset.name)}</div>
          </div>`;
        lb.classList.add('visible');
      });
    });
  }

  // Fetch existing maps
  try {
    const r = await fetch('/api/maps');
    if (r.ok) maps = await r.json();
  } catch { /* show empty gallery */ }

  renderModal();
  m.classList.add('visible');
}

document.getElementById('tab-maps')?.addEventListener('click', () => showMapsModal());
```

- [ ] **Step 4: Restart server and open Maps tab**

```powershell
$p = (netstat -ano | Select-String ":5050 .*LISTENING" | Select-Object -First 1).ToString().Trim().Split()[-1]
if ($p) { Stop-Process -Id $p -Force }
Start-Sleep 1
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server.js" -WorkingDirectory "web"
```

Open browser at `http://localhost:5050`, click **Maps** tab. Verify:
- Modal opens with style toggle (Top-down / Scene)
- Prompt textarea is present
- Generate button is present
- Gallery shows "No maps yet" message
- Style toggle switches correctly between Top-down and Scene

- [ ] **Step 5: Test generate (requires ComfyUI running with a compatible checkpoint)**

If ComfyUI is not running or no battlemap checkpoint is installed yet: enter any prompt and click Generate. Expected: error message like `ComfyUI unreachable` or `ComfyUI rejected workflow` — this confirms the endpoint is wired correctly. The 120s timeout will not trigger since ComfyUI rejects immediately.

If ComfyUI is running with a checkpoint named `battlemap_topdown.safetensors`: generate should produce a map that appears in the gallery.

- [ ] **Step 6: Commit**

```powershell
cd "c:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)"
git add web/public/index.html web/public/app.js
git commit -m "feat: add Maps tab to DM Panel with generator form and gallery"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Two workflow JSONs (topdown + scene) — Task 1
- ✅ `run_and_save` subdir support — Task 2
- ✅ `run_battlemap_topdown`, `run_battlemap_scene` in workflow_runner — Task 3
- ✅ `generate_battlemap_topdown`, `generate_battlemap_scene` in image_pipeline — Task 4
- ✅ Two MCP tools in mcp_server — Task 5
- ✅ `/api/maps` list, `/maps-output/` static, `/api/maps/generate` — Task 6
- ✅ Maps tab button, CSS, modal with form + gallery — Task 7
- ✅ Output saved to `output/maps/` — Tasks 2, 3, 6
- ✅ Model override via `model` param — Tasks 3, 4, 5, 6
- ✅ ComfyUI called directly from Node.js (no subprocess) — Task 6
- ✅ Gallery thumbnail click → lightbox — Task 7

**Placeholder scan:** No TBDs. All code is complete.

**Type consistency:** `run_battlemap_topdown` / `run_battlemap_scene` signatures match across workflow_runner → image_pipeline → mcp_server. `cfg` (Python) maps to `guidance_scale` (MCP tool param) correctly in both `elif` branches.
