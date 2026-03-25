<!--
  Tags: DM-Resource, Meta
  Status: Canon
  Type: DM-Resource
  Region: Off-Map
-->

# AEVORIA to INKARNATE - Quick Reference Guide

## Files Created

1. **aevoria_map_coordinates.csv** (320260)
   - Full map grid with terrain symbols at each coordinate
   - Open in Excel/Sheets for visualization
   - Each cell = one coordinate point (multiply by 4 for original scale)

2. **aevoria_map_legend.csv**
   - Terrain symbol meanings
   - Use for color-coding in spreadsheet

3. **aevoria_key_locations.csv**
   - Major settlements and landmarks
   - Includes coordinates for easy reference
   - Sort/filter by region

## How to Use in Inkarnate

### Step 1: Open Coordinate CSV in Excel
- Open: aevoria_map_coordinates.csv
- Widen columns to see terrain
- Optional: Apply conditional formatting to color-code symbols
  
### Step 2: Use Legend to Color-Code
- Open: aevoria_map_legend.csv
- Map symbols to colors in spreadsheet:
  - ~ /  = Blue (water)
  - . / , = Green (grassland)
  -  /  = Dark Green (forest)
  - ^ = Gray (mountains)
  -  = Red (major city)
  - etc.

### Step 3: Manual Inkarnate Build
- Reference coordinates in spreadsheet
- Place features using Inkarnate tools:
  1. Base terrain (oceans, grasslands, forests)
  2. Mountain ranges
  3. Rivers following  symbols
  4. Roads following  /  symbols
  5. Settlements at  /  locations
  6. Landmarks ( / ) and labels

### Coordinate Conversion
- Spreadsheet coords are 4 smaller than original
- E.g., Waystone Inn at X=160, Y=50 in compressed map
- If using full Inkarnate canvas (12801040), multiply by 4
- Or scale proportionally to your Inkarnate map size

## Tips

- Print/display both CSVs side-by-side while building
- Mark off placed features in spreadsheet as you go
- Use Key Locations CSV to verify settlement positions
- Check Northreach zoom for accurate relative spacing

## Estimated Time by Method
- Full detail: 12-18 hours
- Core features: 8-12 hours
- Quick draft: 4-6 hours
