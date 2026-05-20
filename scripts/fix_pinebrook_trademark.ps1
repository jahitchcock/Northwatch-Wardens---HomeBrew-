$path = "C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\Season 1\Adventures\Peril_in_Pinebrook_COMPLETE\Peril_in_Pinebrook_COMPLETE.md"
$content = Get-Content $path -Raw
$content = $content -replace "Dungeons & Dragons", "5th Edition"
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "Done"
