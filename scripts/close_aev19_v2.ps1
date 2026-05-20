$apiKey = $env:PAPERCLIP_API_KEY
$apiUrl = $env:PAPERCLIP_API_URL
$runId = $env:PAPERCLIP_RUN_ID

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "X-Paperclip-Run-Id" = $runId
    "Content-Type" = "application/json"
}

# Try checkout first
$bodyCheckout = @{
    agentId = "0c8e9076-0ae3-4ad0-a6fb-78dfd20c4c82"
    expectedStatuses = @("todo", "backlog", "blocked", "in_progress")
} | ConvertTo-Json -Compress

try {
    $resp = Invoke-RestMethod -Uri "$apiUrl/api/issues/265cc5c7-3df5-409c-9ad2-6458701f796e/checkout" -Method POST -Headers $headers -Body $bodyCheckout
    Write-Output "Checkout success"
    $resp | ConvertTo-Json -Depth 3
} catch {
    Write-Output "Checkout error: $_"
}

# Then close
$bodyClose = @{
    status = "done"
    comment = "All Dungeons & Dragons trademark references replaced with 5th Edition. Added fan content disclaimer to Peril in Pinebrook content in both build/A-DMs-guide-to-aevoria.md and Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md. Files ready for rebuild."
} | ConvertTo-Json -Compress

Start-Sleep -Seconds 1

try {
    $resp2 = Invoke-RestMethod -Uri "$apiUrl/api/issues/265cc5c7-3df5-409c-9ad2-6458701f796e" -Method PATCH -Headers $headers -Body $bodyClose
    Write-Output "Close success"
    $resp2 | ConvertTo-Json -Depth 3
} catch {
    Write-Output "Close error: $_"
}
