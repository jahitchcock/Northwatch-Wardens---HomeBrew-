#!/bin/bash
# Build script for Northwatch Wardens Guides

set -e

echo "==================================="
echo "Northwatch Wardens Build System"
echo "==================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
  echo ""
fi

# Run the build or unbuild
if [ "$1" = "--players" ]; then
  echo "Building Player's Guide only..."
  node build.js --players
elif [ "$1" = "--dms" ]; then
  echo "Building DM's Guide only..."
  node build.js --dms
elif [ "$1" = "--unbuild-players" ]; then
  echo "Syncing Player's Guide from Homebrewery back to source files..."
  echo "  (Replace build/The-adventurers-guide-to-aevoria.txt with your Homebrewery download first)"
  node unbuild.js --players
  echo ""
  echo "Verify the sync: ./build.sh --players"
  exit 0
elif [ "$1" = "--unbuild-dms" ]; then
  echo "Syncing DM's Guide from Homebrewery back to source files..."
  echo "  (Replace build/A-DMs-guide-to-aevoria.txt with your Homebrewery download first)"
  node unbuild.js --dms
  echo ""
  echo "Verify the sync: ./build.sh --dms"
  exit 0
else
  echo "Building both guides..."
  node build.js
fi

echo ""
echo "==================================="
echo "Build complete!"
echo ""
echo "Output files:"
echo "  - build/The-adventurers-guide-to-aevoria.md"
echo "  - build/The-adventurers-guide-to-aevoria.txt  ← upload to Homebrewery"
echo "  - build/The-adventurers-guide-to-aevoria.html"
echo "  - build/A-DMs-guide-to-aevoria.md"
echo "  - build/A-DMs-guide-to-aevoria.txt  ← upload to Homebrewery"
echo "  - build/A-DMs-guide-to-aevoria.html"
echo ""
echo "Homebrewery round-trip:"
echo "  Download edited .txt from Homebrewery, replace build/*.txt, then:"
echo "  ./build.sh --unbuild-players   OR   ./build.sh --unbuild-dms"
echo "=================================="
