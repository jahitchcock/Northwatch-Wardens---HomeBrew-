# Build Players Guide - PowerShell Script
# This script refreshes the PATH to find Node.js and builds the player's guide

Write-Host "Refreshing environment PATH..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Checking Node.js version..." -ForegroundColor Cyan
node --version

Write-Host "`nBuilding Player's Guide..." -ForegroundColor Green
node build.js --players

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBuild successful!" -ForegroundColor Green
    Write-Host "Output: build\The-adventurers-guide-to-aevoria.pdf" -ForegroundColor Yellow
    
    if (Test-Path "build\The-adventurers-guide-to-aevoria.pdf") {
        $file = Get-Item "build\The-adventurers-guide-to-aevoria.pdf"
        Write-Host "File size: $([math]::Round($file.Length/1MB, 2)) MB" -ForegroundColor Yellow
        Write-Host "Last modified: $($file.LastWriteTime)" -ForegroundColor Yellow
    }
} else {
    Write-Host "`nBuild failed!" -ForegroundColor Red
}
