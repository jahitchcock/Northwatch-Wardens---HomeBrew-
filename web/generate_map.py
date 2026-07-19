"""
DM Panel → image-gen battlemap pipeline bridge.

Reads a JSON generation request from stdin, dispatches to the appropriate
workflow_runner.run_battlemap_*() function, and writes the result to stdout.

Usage (from Node.js child_process):
  echo '{"style":"topdown","prompt":"dungeon room","seed":42}' | ^
    f:\\NewProject\\image-gen\\.venv\\Scripts\\python.exe generate_map.py

Output (JSON on stdout):
  {"filename":"mapgen_topdown_1712345678_42.png","path":"...","url":"/maps-output/..."}

On error: {"error":"..."} is written to stdout and the process exits with code 1.
Stderr is reserved for traceback / logging.
"""

import json
import os
import sys
import traceback
from pathlib import Path

# ---------------------------------------------------------------------------
# Path bootstrap — add the image-gen project root so workflow_runner et al.
# are importable regardless of cwd.
# ---------------------------------------------------------------------------
_IMAGE_GEN_DIR = Path(r"f:\NewProject\image-gen")
if _IMAGE_GEN_DIR.is_dir():
    sys.path.insert(0, str(_IMAGE_GEN_DIR.resolve()))
else:
    print(json.dumps({"error": f"image-gen directory not found: {_IMAGE_GEN_DIR}"}))
    sys.exit(1)

from workflow_runner import (
    run_battlemap_topdown_sdxl,
    run_battlemap_topdown_sdxl_hq,
    run_battlemap_scene,
    run_battlemap_mapcraft_sdxl,
    run_battlemap_mapcraft_flux,
)

# ---------------------------------------------------------------------------
# Style → runner mapping
# ---------------------------------------------------------------------------
# Each entry: (runner_fn, is_flux) where is_flux indicates the param uses
# `guidance` instead of `cfg` and doesn't accept negative_prompt.
STYLES: dict[str, tuple] = {
    "topdown":        (run_battlemap_topdown_sdxl,     False),
    "topdown_hq":     (run_battlemap_topdown_sdxl_hq,  False),
    "scene":          (run_battlemap_scene,            True),   # FLUX
    "mapcraft":       (run_battlemap_mapcraft_sdxl,    False),
    "mapcraft_flux":  (run_battlemap_mapcraft_flux,    True),   # FLUX
}

STYLE_DEFAULTS: dict[str, dict] = {
    "topdown":       dict(steps=25, cfg=3.0, width=1024, height=1024),
    "topdown_hq":    dict(steps=40, cfg=5.0, width=1024, height=1024, hires_denoise=0.45),
    "scene":         dict(steps=25, cfg=3.5, width=1024, height=1024),  # cfg → guidance for FLUX
    "mapcraft":      dict(steps=30, cfg=5.0, width=1024, height=1024, lora_strength=1.0),
    "mapcraft_flux": dict(steps=25, cfg=3.5, width=1024, height=1024, lora_strength=1.0),
}

STYLE_INFO: dict[str, dict] = {
    "topdown":       dict(label="Top-Down (SDXL)",        model="SDXL",       description="Standard SDXL top-down battlemap. Good quality, fast (~30-60s)."),
    "topdown_hq":    dict(label="Top-Down HQ",            model="SDXL",       description="SDXL top-down with hires-fix + 4x upscale. Higher quality, slower (~2-3min)."),
    "scene":         dict(label="Scene (FLUX)",           model="FLUX.1-dev",  description="Illustrated fantasy scene / environment art. High quality, slow (~8-12min)."),
    "mapcraft":      dict(label="Mapcraft (SDXL)",        model="SDXL",       description="Mapcraft LoRA on SDXL. Stylish top-down maps, fast (~30-60s)."),
    "mapcraft_flux": dict(label="Mapcraft (FLUX)",        model="FLUX.1-dev",  description="Mapcraft LoRA on FLUX. Highest quality, slow (~8-12min)."),
}

# Negative prompts used when the user doesn't provide one.
NEGATIVE_HELP: dict[str, str] = {
    "topdown": "Avoid isometric view, people, or 3D renders that break top-down perspective.",
    "topdown_hq": "Avoid isometric view, people, or 3D renders that break top-down perspective.",
    "scene": "Avoid grids, top-down perspective, or photorealistic elements.",
    "mapcraft": "Avoid blur, isometric perspective, characters, or text.",
    "mapcraft_flux": "FLUX doesn't use negative prompts effectively.",
}

DEFAULT_NEGATIVES: dict[str, str] = {
    "topdown": "isometric, perspective view, 3d render, people, tokens, figures, text, watermark, blurry, low quality, worst quality",
    "topdown_hq": "isometric, perspective view, 3d render, people, tokens, figures, text, watermark, blurry, low quality, worst quality",
    "scene": "grid, top-down, map, overhead view, photorealistic, text, watermark, nsfw, low quality, worst quality",
    "mapcraft": "blurry, isometric, perspective, characters, people, text, watermark, low quality, worst quality",
    "mapcraft_flux": "",  # FLUX has no functional negative at cfg=1
}


def main() -> None:
    # --list-styles: return style metadata for the DM Panel UI
    if "--list-styles" in sys.argv[1:]:
        styles_out = {}
        for key, info in STYLE_INFO.items():
            defaults = STYLE_DEFAULTS[key]
            styles_out[key] = {
                **info,
                "defaults": defaults,
                "default_negative": DEFAULT_NEGATIVES.get(key, ""),
                "negative_help": NEGATIVE_HELP.get(key, ""),
            }
        print(json.dumps(styles_out))
        return

    raw = sys.stdin.read()
    if not raw.strip():
        print(json.dumps({"error": "No input received on stdin"}))
        sys.exit(1)

    try:
        params = json.loads(raw)
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON: {e}"}))
        sys.exit(1)

    style = params.get("style", "topdown")
    if style not in STYLES:
        print(json.dumps({"error": f"Unknown style '{style}'. Valid: {', '.join(STYLES)}"}))
        sys.exit(1)

    prompt = params.get("prompt", "").strip()
    if not prompt:
        print(json.dumps({"error": "prompt is required"}))
        sys.exit(1)

    runner, is_flux = STYLES[style]
    defaults = STYLE_DEFAULTS[style]

    # --- Resolve parameters ---
    seed = params.get("seed")
    if seed is None or not isinstance(seed, int) or seed < 0:
        import random
        seed = random.randrange(2**32)

    steps = params.get("steps", defaults["steps"])

    if is_flux:
        # FLUX-based: guidance replaces cfg; negative_prompt is accepted but inert
        guidance = params.get("cfg", params.get("guidance", defaults["cfg"]))
        lora_strength = params.get("lora_strength", defaults.get("lora_strength", 1.0))

        if style == "scene":
            result = runner(
                prompt=prompt,
                negative_prompt=params.get("negative_prompt", ""),
                seed=seed,
                steps=steps,
                cfg=guidance,
            )
        elif style == "mapcraft_flux":
            result = runner(
                prompt=prompt,
                seed=seed,
                steps=steps,
                guidance=guidance,
                lora_strength=lora_strength,
                width=params.get("width", defaults["width"]),
                height=params.get("height", defaults["height"]),
            )
        else:
            result = runner(prompt=prompt, seed=seed, steps=steps, cfg=guidance)
    else:
        # SDXL-based: cfg is normal KSampler cfg
        cfg = params.get("cfg", defaults["cfg"])
        neg = params.get("negative_prompt") or DEFAULT_NEGATIVES.get(style, "")
        width = params.get("width", defaults["width"])
        height = params.get("height", defaults["height"])
        ckpt_name = params.get("model") or None

        if style == "topdown":
            result = runner(
                prompt=prompt, negative_prompt=neg, seed=seed,
                steps=steps, cfg=cfg, width=width, height=height,
                ckpt_name=ckpt_name,
            )
        elif style == "topdown_hq":
            hires_denoise = params.get("hires_denoise", defaults["hires_denoise"])
            result = runner(
                prompt=prompt, negative_prompt=neg, seed=seed,
                steps=steps, cfg=cfg, width=width, height=height,
                ckpt_name=ckpt_name, hires_denoise=hires_denoise,
            )
        elif style == "mapcraft":
            lora_strength = params.get("lora_strength", defaults.get("lora_strength", 1.0))
            result = runner(
                prompt=prompt, negative_prompt=neg, seed=seed,
                steps=steps, cfg=cfg,
                lora_strength=lora_strength,
                width=width, height=height,
                base_ckpt=ckpt_name,
            )
        else:
            result = runner(
                prompt=prompt, negative_prompt=neg, seed=seed,
                steps=steps, cfg=cfg,
            )

    path_str = result.get("path", "")
    if not path_str or not os.path.exists(path_str):
        print(json.dumps({"error": "Pipeline returned no output path"}))
        sys.exit(1)

    filename = os.path.basename(path_str)
    print(json.dumps({
        "filename": filename,
        "path": path_str.replace("\\", "/"),
        "url": f"/maps-output/{filename}",
    }))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(json.dumps({"error": str(exc), "traceback": traceback.format_exc()}))
        sys.exit(1)
