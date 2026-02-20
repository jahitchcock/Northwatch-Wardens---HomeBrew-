$partial = Get-Content -Raw "build\dmGuideTempPartial.txt"
$built = Get-Content -Raw "build\A-DMs-guide-to-aevoria.txt"

# Remove page numbers and whitespace variations for comparison
$partialClean = [regex]::Replace($partial, '\*\*\d+\*\*', '##PAGE##')
$builtClean = [regex]::Replace($built, '\*\*\d+\*\*', '##PAGE##')

if ($partialClean.Length -ne $builtClean.Length) {
    Write-Host "File size difference: partial=$partialClean.Length vs built=$builtClean.Length"
} else {
    Write-Host "After removing page numbers, files are same length"
}

# Find first difference after Contents
$contentsIdx = $builtClean.IndexOf("# Contents")
$searchStart = $contentsIdx + 2000

for ($i = $searchStart; $i -lt [Math]::Min($searchStart + 5000, $builtClean.Length); $i++) {
    if ($partialClean[$i] -ne $builtClean[$i]) {
        Write-Host "First difference after Contents at position $i"
        Write-Host "Context (partial): "
        Write-Host "Context (built): "
        break
    }
}
