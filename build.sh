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

# Run the build
if [ "$1" = "--players" ]; then
  echo "Building Player's Guide only..."
  node build.js --players
elif [ "$1" = "--dms" ]; then
  echo "Building DM's Guide only..."
  node build.js --dms
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
echo "  - build/The-adventurers-guide-to-aevoria.txt"
echo "  - build/The-adventurers-guide-to-aevoria.html"
echo "  - build/A-DMs-guide-to-aevoria.md"
echo "  - build/A-DMs-guide-to-aevoria.txt"
echo "  - build/A-DMs-guide-to-aevoria.html"
echo "=================================="
