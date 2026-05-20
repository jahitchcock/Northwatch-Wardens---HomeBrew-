$apiKey = $env:PAPERCLIP_API_KEY
$apiUrl = $env:PAPERCLIP_API_URL
$runId = $env:PAPERCLIP_RUN_ID

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "X-Paperclip-Run-Id" = $runId
    "Content-Type" = "application/json"
}

# Mark AEV-20 done
$body20 = @{
    status = "done"
    comment = "Replaced 'mind flayers' with 'psionic aberrations' in build/The-adventurers-guide-to-aevoria.md (line 2968) and World Building/Character_Creation/Languages_and_Culture.md (line 396). The Mind Flayer / Illithid is WotC Product Identity and is no longer referenced."
} | ConvertTo-Json -Compress

$resp20 = Invoke-RestMethod -Uri "$apiUrl/api/issues/c817df65-6ce4-4700-8208-167d8bf0ab99" -Method PATCH -Headers $headers -Body $body20
$resp20 | ConvertTo-Json -Depth 3
Write-Output "AEV-20 marked done"

# Mark AEV-19 done
$body19 = @{
    status = "done"
    comment = "All Dungeons & Dragons trademark references replaced with 5th Edition. Added fan content disclaimer to Peril in Pinebrook content in both build/A-DMs-guide-to-aevoria.md and Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md. Files ready for rebuild."
} | ConvertTo-Json -Compress

$resp19 = Invoke-RestMethod -Uri "$apiUrl/api/issues/265cc5c7-3df5-409c-9ad2-6458701f796e" -Method PATCH -Headers $headers -Body $body19
$resp19 | ConvertTo-Json -Depth 3
Write-Output "AEV-19 marked done"
