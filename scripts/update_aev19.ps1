$apiKey = $env:PAPERCLIP_API_KEY
$apiUrl = $env:PAPERCLIP_API_URL
$runId = $env:PAPERCLIP_RUN_ID

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "X-Paperclip-Run-Id" = $runId
    "Content-Type" = "application/json"
}

# Update AEV-19 to in_progress with comment
$bodyAEV19 = @{
    status = "in_progress"
    comment = "Replaced all Dungeons & Dragons trademark references in build/A-DMs-guide-to-aevoria.md (10 instances) and Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md (10 instances) with 5th Edition. Added fan content disclaimer to both files. Retained D&D abbreviation where appropriate."
} | ConvertTo-Json -Compress

$resp = Invoke-RestMethod -Uri "$apiUrl/api/issues/265cc5c7-3df5-409c-9ad2-6458701f796e" -Method PATCH -Headers $headers -Body $bodyAEV19
$resp | ConvertTo-Json -Depth 5
Write-Output "AEV-19 updated"
