# Copy Pale Sickness maps from adventure folder to web VTT folder
# Organize by category for easy access in the DM panel

$adventureMapsDir = "C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\adventures\season-1\the-pale-sickness\maps"
$vttMapsDir = "C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\web\public\maps"

# Create category folders
$categories = @{
    "pale-sickness" = @("ps-06", "ps-13")
    "pale-sickness/palebank" = @("ps-01", "ps-02", "ps-03", "ps-04", "ps-05")
    "pale-sickness/salsvault" = @("ps-07", "ps-08", "ps-09", "ps-10", "ps-11", "ps-12")
}

# Map details for reference
$mapDetails = @{
    "ps-01" = "Urgon's Cabin"
    "ps-02" = "Pelc's Curiosities"
    "ps-03" = "Tulgi's Cabin"
    "ps-04" = "Irven's Home"
    "ps-05" = "Frostwatch Guard Post"
    "ps-06" = "Croaker Cave"
    "ps-07" = "Salsvault - Room 1 (Entrance Hall)"
    "ps-08" = "Salsvault - Room 2 (Research Labs)"
    "ps-09" = "Salsvault - Room 3 (Containment Hall)"
    "ps-10" = "Salsvault - Room 4 (Construct Storage)"
    "ps-11" = "Salsvault - Room 5 (Preservation Chamber - CURE)"
    "ps-12" = "Salsvault - Room 6 (Control Room)"
    "ps-13" = "Cold Anchor Waypoint"
}

Write-Host "Pale Sickness Map Organizer" -ForegroundColor Cyan
Write-Host "====================================`n"

# Create directories
foreach ($cat in $categories.Keys) {
    $dir = Join-Path $vttMapsDir $cat
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Write-Host "[OK] Created: $cat" -ForegroundColor Green
}

# Copy and organize maps
$copiedCount = 0
foreach ($cat in $categories.Keys) {
    $mapIds = $categories[$cat]

    foreach ($mapId in $mapIds) {
        # Find the source file (ps-XX.png)
        $sourceFile = Get-ChildItem -Path $adventureMapsDir -Filter "$mapId.png" | Select-Object -First 1

        if ($sourceFile) {
            $destDir = Join-Path $vttMapsDir $cat
            $destFile = Join-Path $destDir $sourceFile.Name

            Copy-Item -Path $sourceFile.FullName -Destination $destFile -Force
            $copiedCount++

            $display = $mapDetails[$mapId]
            Write-Host "  [$mapId] $display" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n====================================`n" -ForegroundColor Cyan
Write-Host "[OK] Copied $copiedCount maps to VTT folder" -ForegroundColor Green
Write-Host "[OK] Available at: $vttMapsDir" -ForegroundColor Green
Write-Host "`nWeb URLs for DM Panel:`n" -ForegroundColor Cyan

Write-Host "Palebank Locations:"
Write-Host "  - http://localhost:5050/maps/pale-sickness/palebank/ps-01-urgons-cabin.png" -ForegroundColor Cyan
Write-Host "  - http://localhost:5050/maps/pale-sickness/palebank/ps-02-pelcs-curiosities.png" -ForegroundColor Cyan
Write-Host "  - (and others in pale-sickness/palebank/)" -ForegroundColor Cyan

Write-Host "`nSalsvault Rooms:"
Write-Host "  - http://localhost:5050/maps/pale-sickness/salsvault/ps-07-salsvault-room1-entrance.png" -ForegroundColor Cyan
Write-Host "  - http://localhost:5050/maps/pale-sickness/salsvault/ps-11-salsvault-room5-preservation.png (CURE)" -ForegroundColor Cyan
Write-Host "  - (and others in pale-sickness/salsvault/)" -ForegroundColor Cyan

Write-Host "`nOther Locations:"
Write-Host "  - http://localhost:5050/maps/pale-sickness/ps-06-croaker-cave.png" -ForegroundColor Cyan
Write-Host "  - http://localhost:5050/maps/pale-sickness/ps-13-cold-anchor-waypoint.png" -ForegroundColor Cyan
