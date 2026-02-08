const fs = require('fs-extra');
const path = require('path');

/**
 * Reverse engineering script - syncs changes from compiled .txt back to source .md files
 * Usage: node unbuild.js --players  (or --dms)
 * 
 * This script reads the compiled .txt file and extracts content between file markers,
 * then writes it back to the original source .md files.
 */

async function unbuildBook(tocFile, outputName) {
  console.log(`\nReverse syncing from compiled .txt back to source files...\n`);
  
  const buildDir = path.dirname(tocFile);
  const toc = await fs.readJSON(tocFile);
  
  // Use the outputName that matches build.js
  const compiledFile = path.join(buildDir, `${outputName}.txt`);
  
  if (!await fs.pathExists(compiledFile)) {
    console.error(`❌ Error: Compiled file not found: ${compiledFile}`);
    console.error(`   Run 'node build.js --${tocFile.includes('players') ? 'players' : 'dms'}' first to generate the compiled file.`);
    process.exit(1);
  }
  
  // Read the compiled file
  const compiledContent = await fs.readFile(compiledFile, 'utf-8');
  
  // Extract file content using markers
  const filePattern = /<!-- FILE_START: (.+?) -->\n([\s\S]*?)<!-- FILE_END: \1 -->/g;
  const matches = [...compiledContent.matchAll(filePattern)];
  
  if (matches.length === 0) {
    console.error(`❌ Error: No file markers found in compiled file.`);
    console.error(`   The compiled file may be from an older build.`);
    console.error(`   Run 'node build.js --${tocFile.includes('players') ? 'players' : 'dms'}' to rebuild with markers.`);
    process.exit(1);
  }
  
  console.log(`Found ${matches.length} file(s) in compiled output.\n`);
  
  let filesUpdated = 0;
  let filesUnchanged = 0;
  let filesNotFound = 0;
  
  for (const match of matches) {
    const relativeFile = match[1];
    const extractedContent = match[2];
    const sourceFile = path.resolve(buildDir, relativeFile);
    
    if (!await fs.pathExists(sourceFile)) {
      console.warn(`  ⚠ Source file not found: ${relativeFile}`);
      filesNotFound++;
      continue;
    }
    
    // Read existing file
    const existingContent = await fs.readFile(sourceFile, 'utf-8');
    
    // Compare content
    if (extractedContent.trim() === existingContent.trim()) {
      console.log(`  ✓ ${relativeFile} (unchanged)`);
      filesUnchanged++;
    } else {
      // Write updated content back
      await fs.writeFile(sourceFile, extractedContent);
      console.log(`  ✓ ${relativeFile} (updated)`);
      filesUpdated++;
    }
  }
  
  console.log(`\n✓ Reverse sync complete!`);
  console.log(`  ${filesUpdated} file(s) updated`);
  console.log(`  ${filesUnchanged} file(s) unchanged`);
  if (filesNotFound > 0) {
    console.log(`  ${filesNotFound} file(s) not found`);
  }
  
  if (filesUpdated > 0) {
    console.log(`\n  💡 Changes have been synced from Homebrewery back to your source files.`);
    console.log(`  💡 Run 'node build.js --${tocFile.includes('players') ? 'players' : 'dms'}' to verify the changes.`);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || (!args.includes('--players') && !args.includes('--dms'))) {
  console.log('Usage: node unbuild.js --players  (or --dms)');
  console.log('');
  console.log('Reverse syncs changes from compiled .txt file back to source .md files.');
  console.log('This allows you to edit in Homebrewery and sync changes back to your workspace.');
  console.log('');
  console.log('Workflow:');
  console.log('  1. node build.js --players          # Build and upload .txt to Homebrewery');
  console.log('  2. [Edit in Homebrewery UI]');
  console.log('  3. [Download edited .txt file]');
  console.log('  4. [Replace build/*.txt with downloaded file]');
  console.log('  5. node unbuild.js --players        # Sync changes back to source');
  process.exit(1);
}

(async () => {
  try {
    if (args.includes('--players')) {
      await unbuildBook(
        './build/players-guide-toc.json',
        'The-adventurers-guide-to-aevoria'
      );
    }
    
    if (args.includes('--dms')) {
      await unbuildBook(
        './build/dms-guide-toc.json',
        'A-DMs-guide-to-aevoria'
      );
    }
  } catch (error) {
    console.error('Error during unbuild:', error);
    process.exit(1);
  }
})();
