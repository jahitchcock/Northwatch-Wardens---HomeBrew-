param(
  [Parameter(Mandatory = $false)]
  [string]$InputFolder,

  [Parameter(Mandatory = $false)]
  [string]$OutputFolder,

  [Parameter(Mandatory = $false)]
  [int]$Width = 1920,

  [Parameter(Mandatory = $false)]
  [int]$Height = 1080,

  [Parameter(Mandatory = $false)]
  [int]$Fps = 30,

  [Parameter(Mandatory = $false)]
  [int]$AudioKbps = 192,

  [Parameter(Mandatory = $false)]
  [switch]$Force
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($PSScriptRoot)) {
  throw "Could not determine script root folder (PSScriptRoot is empty). Run this script from disk (not pasted) or pass -InputFolder and -OutputFolder explicitly."
}

if ([string]::IsNullOrWhiteSpace($InputFolder)) {
  $InputFolder = $PSScriptRoot
}

if ([string]::IsNullOrWhiteSpace($OutputFolder)) {
  $OutputFolder = Join-Path $PSScriptRoot "mp4"
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg was not found on PATH. Install ffmpeg first, then re-run this script." 
}

if (-not (Test-Path -LiteralPath $InputFolder)) {
  throw "InputFolder not found: $InputFolder"
}

New-Item -ItemType Directory -Path $OutputFolder -Force | Out-Null

$mp3Files = Get-ChildItem -LiteralPath $InputFolder -File -Filter "*.mp3" | Sort-Object Name
if ($mp3Files.Count -eq 0) {
  Write-Host "No .mp3 files found in: $InputFolder"
  exit 0
}

Write-Host ("Converting {0} MP3 file(s) to MP4..." -f $mp3Files.Count)
Write-Host ("Input:  {0}" -f $InputFolder)
Write-Host ("Output: {0}" -f $OutputFolder)

$success = 0
$skipped = 0
$failed = 0

foreach ($file in $mp3Files) {
  $outPath = Join-Path $OutputFolder ($file.BaseName + ".mp4")

  if ((Test-Path -LiteralPath $outPath) -and (-not $Force)) {
    $skipped++
    Write-Host ("SKIP (exists): {0}" -f $file.Name)
    continue
  }

  Write-Host ("MAKE: {0} -> {1}" -f $file.Name, (Split-Path -Leaf $outPath))

  # Static color background + audio.
  # -shortest ensures the video ends when the audio ends.
  # yuv420p maximizes compatibility with YouTube.
  $args = @(
    "-hide_banner",
    "-loglevel", "error",
    "-stats",
    "-f", "lavfi",
    "-i", ("color=c=0x101018:s={0}x{1}:r={2}" -f $Width, $Height, $Fps),
    "-i", $file.FullName,
    "-shortest",
    "-c:v", "libx264",
    "-tune", "stillimage",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", ("{0}k" -f $AudioKbps),
    "-movflags", "+faststart",
    "-metadata", ("title={0}" -f $file.BaseName),
    "-metadata", "artist=Northwatch Wardens",
    $outPath
  )

  try {
    & ffmpeg @args
    if ($LASTEXITCODE -ne 0) {
      throw "ffmpeg exit code $LASTEXITCODE"
    }
    $success++
  }
  catch {
    $failed++
    Write-Host ("FAIL: {0} ({1})" -f $file.Name, $_.Exception.Message)
  }
}

Write-Host ""
Write-Host ("Done. Success={0} Skipped={1} Failed={2}" -f $success, $skipped, $failed)
if ($failed -gt 0) {
  exit 1
}
