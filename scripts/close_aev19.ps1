$apiKey = $env:PAPERCLIP_API_KEY
$apiUrl = $env:PAPERCLIP_API_URL

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "X-Paperclip-Run-Id" = "5cae7f2e-3031-4317-bc3d-212fba099dad"
    "Content-Type" = "application/json"
}

# Mark AEV-19 done
$body19 = @{
    status = "done"
    comment = "All Dungeons & Dragons trademark references replaced with 5th Edition. Added fan content disclaimer to Peril in Pinebrook content in both build/A-DMs-guide-to-aevoria.md and Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md. Files ready for rebuild."
} | ConvertTo-Json -Compress

try {
    $resp19 = Invoke-RestMethod -Uri "$apiUrl/api/issues/265cc5c7-3df5-409c-9ad2-6458701f796e" -Method PATCH -Headers $headers -Body $body19
    $resp19 | ConvertTo-Json -Depth 3
    Write-Output "AEV-19 marked done"
} catch {
    Write-Output "AEV-19 error: $_"
    Write-Output $_.Exception.Response.StatusCode
}
