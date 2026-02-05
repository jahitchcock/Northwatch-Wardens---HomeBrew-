#!/usr/bin/env node

// Verification script to check for duplicate \page directives in generated markdown

const fs = require('fs-extra');
const path = require('path');

async function verifyBuild(mdFile) {
  console.log(`\n=== Verifying ${path.basename(mdFile)} ===`);
  
  if (!await fs.pathExists(mdFile)) {
    console.error(`✗ File not found: ${mdFile}`);
    return false;
  }
  
  const content = await fs.readFile(mdFile, 'utf-8');
  
  // Count total \page directives
  const pagePattern = /\\page/g;
  const totalPages = (content.match(pagePattern) || []).length;
  console.log(`Total \\page directives: ${totalPages}`);
  
  // Check for duplicate consecutive \page directives
  const duplicatePattern = /\\page\s*\n\s*\\page/g;
  const duplicates = content.match(duplicatePattern);
  
  if (duplicates && duplicates.length > 0) {
    console.error(`✗ Found ${duplicates.length} duplicate \\page directive(s)!`);
    
    // Show context around duplicates
    const lines = content.split('\n');
    let foundCount = 0;
    for (let i = 0; i < lines.length - 1 && foundCount < 5; i++) {
      if (lines[i].trim() === '\\page') {
        // Check if next non-empty line is also \page
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          if (lines[j].trim() === '') continue; // Skip empty lines
          if (lines[j].trim() === '\\page') {
            console.error(`  Lines ${i+1}-${j+1}: Duplicate found`);
            console.error(`    ${i}: ${lines[i-1] || '(start)'}`);
            console.error(`    ${i+1}: ${lines[i]}`);
            for (let k = i+1; k < j; k++) {
              console.error(`    ${k+1}: ${lines[k]}`);
            }
            console.error(`    ${j+1}: ${lines[j]}`);
            console.error(`    ${j+2}: ${lines[j+1] || '(end)'}`);
            foundCount++;
            break;
          } else {
            break; // Found non-\page content, not a duplicate
          }
        }
      }
    }
    return false;
  } else {
    console.log('✓ No duplicate \\page directives found');
  }
  
  // Check that files end with \page (sample check - first 5 sections)
  const sections = content.split(/^# /m);
  if (sections.length > 1) {
    console.log(`Found ${sections.length - 1} top-level sections`);
  }
  
  return true;
}

async function main() {
  console.log('========================================');
  console.log('Markdown Build Verification');
  console.log('========================================');
  
  const buildDir = path.join(__dirname, 'build');
  
  const files = [
    path.join(buildDir, 'The-adventurers-guide-to-aevoria.md'),
    path.join(buildDir, 'A-DMs-guide-to-aevoria.md')
  ];
  
  let allPassed = true;
  
  for (const file of files) {
    const passed = await verifyBuild(file);
    if (!passed) {
      allPassed = false;
    }
  }
  
  console.log('\n========================================');
  if (allPassed) {
    console.log('✓ All verifications PASSED');
    console.log('========================================\n');
    process.exit(0);
  } else {
    console.log('✗ Some verifications FAILED');
    console.log('========================================\n');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Verification failed:', error);
  process.exit(1);
});
