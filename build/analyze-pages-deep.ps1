$c = Get-Content "build\A-DMs-guide-to-aevoria.md"
$csv = Import-Csv "build\page-density-pre-totdk.csv"

# Deeper analysis: pages with {{note}} blocks
$results = @()
foreach ($pg in $csv) {
    $sl = [int]$pg.StartLine - 1
    $el = $sl + [int]$pg.TotalLines
    if ($el -gt 18431) { continue }
    
    $notes = 0; $monsters = 0; $tables = 0; $descs = 0
    
    for ($i = $sl; $i -lt $el; $i++) {
        if ($c[$i] -match '\{\{note') { $notes++ }
        if ($c[$i] -match '\{\{monster') { $monsters++ }
        if ($c[$i] -match '\{\{descriptive') { $descs++ }
        if ($c[$i] -match '^\|.*\|.*\|') { $tables++ }
    }
    
    $results += [PSCustomObject]@{
        Page = $pg.Page
        TL = [int]$pg.TotalLines
        NE = [int]$pg.NonEmpty
        Col = [int]$pg.HasColumn
        Notes = $notes
        Monsters = $monsters
        Tables = $tables
        Descs = $descs
        Heavy = ($notes + $monsters + $descs -gt 1)
    }
}

Write-Host "=== NOTE PAGES >90 LINES (supposedly overfull per rules) ==="
$notePagesOver90 = $results | Where-Object { $_.Notes -gt 0 -and $_.TL -gt 90 }
Write-Host "Count: $($notePagesOver90.Count)"
Write-Host "TL range: $((($notePagesOver90.TL | Measure-Object -Minimum).Minimum))-$((($notePagesOver90.TL | Measure-Object -Maximum).Maximum))"
Write-Host "NE range: $((($notePagesOver90.NE | Measure-Object -Minimum).Minimum))-$((($notePagesOver90.NE | Measure-Object -Maximum).Maximum))"
Write-Host "Mean TL: $([Math]::Round(($notePagesOver90.TL | Measure-Object -Average).Average, 1))"
Write-Host "Mean NE: $([Math]::Round(($notePagesOver90.NE | Measure-Object -Average).Average, 1))"
Write-Host "With column: $(($notePagesOver90 | Where-Object { $_.Col -eq 1 }).Count) / $($notePagesOver90.Count)"

Write-Host ""
Write-Host "=== MONSTER STAT BLOCK PAGES ==="
$monsterPages = $results | Where-Object { $_.Monsters -gt 0 }
Write-Host "Count: $($monsterPages.Count)"
Write-Host "TL range: $((($monsterPages.TL | Measure-Object -Minimum).Minimum))-$((($monsterPages.TL | Measure-Object -Maximum).Maximum))"
Write-Host "Mean TL: $([Math]::Round(($monsterPages.TL | Measure-Object -Average).Average, 1))"
Write-Host "Mean NE: $([Math]::Round(($monsterPages.NE | Measure-Object -Average).Average, 1))"

Write-Host ""
Write-Host "=== TRULY HEAVY FORMAT PAGES (2+ blocks) ==="
$heavy = $results | Where-Object { $_.Heavy }
Write-Host "Count: $($heavy.Count)"
if ($heavy.Count -gt 0) {
    Write-Host "TL range: $((($heavy.TL | Measure-Object -Minimum).Minimum))-$((($heavy.TL | Measure-Object -Maximum).Maximum))"
    Write-Host "Mean TL: $([Math]::Round(($heavy.TL | Measure-Object -Average).Average, 1))"
}

Write-Host ""
Write-Host "=== PERCENTILE ANALYSIS (ALL VALID PAGES) ==="
$all = $results | Where-Object { $_.TL -gt 10 }
$sortedTL = ($all.TL | Sort-Object)
$sortedNE = ($all.NE | Sort-Object)
Write-Host "TL P10=$($sortedTL[[Math]::Floor($sortedTL.Count*0.1)]) P50=$($sortedTL[[Math]::Floor($sortedTL.Count*0.5)]) P75=$($sortedTL[[Math]::Floor($sortedTL.Count*0.75)]) P90=$($sortedTL[[Math]::Floor($sortedTL.Count*0.9)]) P95=$($sortedTL[[Math]::Floor($sortedTL.Count*0.95)])"
Write-Host "NE P10=$($sortedNE[[Math]::Floor($sortedNE.Count*0.1)]) P50=$($sortedNE[[Math]::Floor($sortedNE.Count*0.5)]) P75=$($sortedNE[[Math]::Floor($sortedNE.Count*0.75)]) P90=$($sortedNE[[Math]::Floor($sortedNE.Count*0.9)]) P95=$($sortedNE[[Math]::Floor($sortedNE.Count*0.95)])"

Write-Host ""
Write-Host "=== UNDERFULL ANALYSIS ==="
$underfull = $results | Where-Object { $_.TL -gt 10 -and $_.TL -le 50 }
Write-Host "Pages with 11-50 total lines: $($underfull.Count)"
Write-Host "Pages with column: $(($underfull | Where-Object { $_.Col -eq 1 }).Count)"
Write-Host "Pages without column: $(($underfull | Where-Object { $_.Col -eq 0 }).Count)"
