$c = Get-Content "build\A-DMs-guide-to-aevoria.md"
$csv = Import-Csv "build\page-density-pre-totdk.csv"

$results = @()
foreach ($pg in $csv) {
    $sl = [int]$pg.StartLine - 1
    $el = $sl + [int]$pg.TotalLines
    if ($el -gt 18431) { continue }
    
    $hasNote = $false; $hasMonster = $false; $hasTable = $false
    $hasDesc = $false; $hasWide = $false
    
    for ($i = $sl; $i -lt $el; $i++) {
        $line = $c[$i]
        if ($line -match '\{\{note') { $hasNote = $true }
        if ($line -match '\{\{monster') { $hasMonster = $true }
        if ($line -match '\{\{descriptive') { $hasDesc = $true }
        if ($line -match '\{\{wide') { $hasWide = $true }
        if ($line -match '^\|.*\|.*\|') { $hasTable = $true }
    }
    
    $results += [PSCustomObject]@{
        Page = $pg.Page
        TL = [int]$pg.TotalLines
        NE = [int]$pg.NonEmpty
        Col = [int]$pg.HasColumn
        Note = [int]$hasNote
        Monster = [int]$hasMonster
        Desc = [int]$hasDesc
        Wide = [int]$hasWide
        Table = [int]$hasTable
    }
}

# Stats by content type
$withNote = $results | Where-Object { $_.Note -eq 1 }
$withMonster = $results | Where-Object { $_.Monster -eq 1 }
$withTable = $results | Where-Object { $_.Table -eq 1 }
$plain = $results | Where-Object { $_.Note -eq 0 -and $_.Monster -eq 0 -and $_.Table -eq 0 -and $_.Wide -eq 0 -and $_.Desc -eq 0 }

Write-Host "=== PAGES BY CONTENT TYPE ==="
Write-Host "  {{note}}: $($withNote.Count)"
Write-Host "  {{monster}}: $($withMonster.Count)"
Write-Host "  table: $($withTable.Count)"
Write-Host "  plain (no special blocks): $($plain.Count)"
Write-Host ""

Write-Host "=== MEAN TOTAL LINES BY TYPE ==="
if ($withNote.Count -gt 0) {
    Write-Host "  note pages: $([Math]::Round(($withNote.TL | Measure-Object -Average).Average, 1)) TL, $([Math]::Round(($withNote.NE | Measure-Object -Average).Average, 1)) NE"
}
if ($withMonster.Count -gt 0) {
    Write-Host "  monster pages: $([Math]::Round(($withMonster.TL | Measure-Object -Average).Average, 1)) TL, $([Math]::Round(($withMonster.NE | Measure-Object -Average).Average, 1)) NE"
}
if ($withTable.Count -gt 0) {
    Write-Host "  table pages: $([Math]::Round(($withTable.TL | Measure-Object -Average).Average, 1)) TL, $([Math]::Round(($withTable.NE | Measure-Object -Average).Average, 1)) NE"
}
if ($plain.Count -gt 0) {
    Write-Host "  plain pages: $([Math]::Round(($plain.TL | Measure-Object -Average).Average, 1)) TL, $([Math]::Round(($plain.NE | Measure-Object -Average).Average, 1)) NE"
}

Write-Host ""
Write-Host "=== RULE VIOLATION ANALYSIS ==="
$rule1 = $results | Where-Object { $_.Col -eq 0 -and $_.TL -gt 60 }
Write-Host "  Rule 1 (no \column on 60+ line page): $($rule1.Count) pages"
$rule2 = $results | Where-Object { $_.TL -gt 120 }
Write-Host "  Rule 2 (>120 lines / overfull): $($rule2.Count) pages"
$rule5 = $results | Where-Object { $_.TL -gt 90 -and $_.Note -eq 1 }
Write-Host "  Rule 5 (note page >90 lines): $($rule5.Count) pages"
