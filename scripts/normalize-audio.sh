#!/usr/bin/env bash
# Normalize all ambient + SFX audio to -16 LUFS / -1 dBTP

SOUNDS="c:/Users/joshu/OneDrive/Documents/dnd/00 - Campaigns/Northwatch Wardens - (HomeBrew)/web/public/sounds"
FAILED=()

normalize() {
  local input="$1"
  local ext="${input##*.}"
  local tmp="${input}.norm.${ext}"

  case "$ext" in
    mp3) ffmpeg -i "$input" -af loudnorm=I=-16:TP=-1:LRA=11 -codec:a libmp3lame -q:a 2 -y "$tmp" 2>/dev/null ;;
    wav) ffmpeg -i "$input" -af loudnorm=I=-16:TP=-1:LRA=11 -codec:a pcm_s16le -y "$tmp" 2>/dev/null ;;
    flac) ffmpeg -i "$input" -af loudnorm=I=-16:TP=-1:LRA=11 -codec:a flac -y "$tmp" 2>/dev/null ;;
    m4a) ffmpeg -i "$input" -af loudnorm=I=-16:TP=-1:LRA=11 -codec:a aac -b:a 192k -y "$tmp" 2>/dev/null ;;
    *) echo "SKIP (unknown): $input"; return ;;
  esac

  if [ -f "$tmp" ] && [ -s "$tmp" ]; then
    mv -f "$tmp" "$input"
    echo "OK  $(basename "$input")"
  else
    rm -f "$tmp"
    FAILED+=("$input")
    echo "ERR $(basename "$input")"
  fi
}

total=0; done_n=0
files=()
while IFS= read -r -d '' f; do files+=("$f"); total=$((total+1)); done < <(
  find "$SOUNDS" -maxdepth 2 \( -name "*.mp3" -o -name "*.wav" -o -name "*.flac" -o -name "*.m4a" \) ! -path "*/custom/*" -print0
)

echo "Normalizing $total files to -16 LUFS..."
for f in "${files[@]}"; do
  normalize "$f"
  done_n=$((done_n+1))
  echo "  [$done_n/$total]"
done

echo ""
if [ ${#FAILED[@]} -eq 0 ]; then
  echo "All $total files normalized."
else
  echo "Failed (${#FAILED[@]}):"
  for f in "${FAILED[@]}"; do echo "  $f"; done
fi
