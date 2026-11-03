#!/usr/bin/env bash
# Rebuilds the hero scroll film from the source clips in videos/.
#
# Crossfades the chapters into one master film, slices it into WebP frames
# in public/frames/film/, and prints where each chapter starts as a fraction
# of the film. The film plays as the page background, one chapter per
# section; if those fractions change, update CHAPTERS in
# src/components/film/FilmBackground.tsx to match.
#
# Needs ffmpeg and Pillow. Usage:
#   PYTHON=/path/to/python-with-pillow scripts/build-film.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PYTHON="${PYTHON:-python3}"
BUILD_MASTER="${BUILD_MASTER:-$HOME/.claude/skills/scroll-site-generator/scripts/build_master.py}"
FRAMES="$ROOT/public/frames/film"

# Chapter order. To add the "Boot" opener once you have the real clip, put
# it first:   {"name": "boot", "file": "Laptop_screen_flicker.mp4"},
CONFIG=$(cat <<JSON
{
  "clips_dir": "$ROOT/videos",
  "frames_dir": "$FRAMES",
  "master": "$ROOT/videos/master.mp4",
  "fps": 10,
  "width": 1280,
  "xfade": 0.4,
  "chapters": [
    {"name": "code",    "file": "Camera_diving_through_glowing_code_497c9969_1080p.mp4"},
    {"name": "silicon", "file": "Electricity_pulsing_on_processor…_8b5bf9aa_1080p.mp4"},
    {"name": "servers", "file": "Data_cubes_loading_into_servers_cefe3dd5_1080p.mp4"},
    {"name": "network", "file": "Camera_rises_above_data_center_6dbcd5fe_1080p.mp4"},
    {"name": "ai",      "file": "Neural_network_forms_luminous_brain_94d50105_1080p.mp4"},
    {"name": "desk",    "file": "Neural_structure_flows_into_laptop_75bd9ad8_1080p.mp4"}
  ]
}
JSON
)

"$PYTHON" "$BUILD_MASTER" "$CONFIG"

# build_master saves WebP at quality 82 (~27 MB here). Re-slice straight from
# the master at quality 62 (~17 MB) — these frames are mostly dark, so the
# difference isn't visible, and every visitor downloads the whole set.
TMP="$(mktemp -d)"
ffmpeg -v error -y -i "$ROOT/videos/master.mp4" -vf "fps=10,scale=1280:-2" "$TMP/frame_%04d.png"
"$PYTHON" - "$TMP" "$FRAMES" <<'PY'
import glob, os, sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for p in sorted(glob.glob(os.path.join(src, "frame_*.png"))):
    out = os.path.join(dst, os.path.basename(p).replace(".png", ".webp"))
    Image.open(p).save(out, "WEBP", quality=62, method=6)
PY
rm -rf "$TMP"
echo "recompressed: $(du -sh "$FRAMES" | cut -f1)"

# build_master writes frames.json with a site-root pattern; the React loader
# reads manifest.json with a pattern relative to the frames folder.
COUNT=$(ls "$FRAMES"/frame_*.webp | wc -l | tr -d ' ')
printf '{"count": %s, "pattern": "frame_%%04d.webp"}\n' "$COUNT" > "$FRAMES/manifest.json"
rm -f "$FRAMES/frames.json"
echo "manifest: $COUNT frames"
