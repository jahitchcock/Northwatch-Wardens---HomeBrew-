#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');
const { render: renderHomebrewery } = require('./homebrewery-renderer');

// Path to the downloaded Homebrewery CSS
const HOMEBREWERY_CSS_PATH = path.join(__dirname, 'homebrewery-phb.css');

// Helper function to load CSS
async function loadHomebreweryCss() {
  if (await fs.pathExists(HOMEBREWERY_CSS_PATH)) {
    return await fs.readFile(HOMEBREWERY_CSS_PATH, 'utf-8');
  }
  
  // Fallback: Download it if not present
  console.log('  Downloading official Homebrewery stylesheet...');
  const https = require('https');
  
  return new Promise((resolve, reject) => {
    https.get('https://github.com/naturalcrit/homebrewery/raw/master/phb.standalone.css', (response) => {
      // Check for redirect or non-200 status
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, (redirectResponse) => {
          if (redirectResponse.statusCode !== 200) {
            reject(new Error(`Failed to download stylesheet: HTTP ${redirectResponse.statusCode}`));
            return;
          }
          let css = '';
          redirectResponse.on('data', (chunk) => css += chunk);
          redirectResponse.on('end', async () => {
            if (css.length < 1000) {
              reject(new Error('Downloaded stylesheet appears to be empty or invalid'));
              return;
            }
            await fs.writeFile(HOMEBREWERY_CSS_PATH, css);
            console.log('  ✓ Homebrewery stylesheet downloaded');
            resolve(css);
          });
        }).on('error', reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download stylesheet: HTTP ${response.statusCode}`));
        return;
      }
      
      let css = '';
      response.on('data', (chunk) => css += chunk);
      response.on('end', async () => {
        if (css.length < 1000) {
          reject(new Error('Downloaded stylesheet appears to be empty or invalid'));
          return;
        }
        await fs.writeFile(HOMEBREWERY_CSS_PATH, css);
        console.log('  ✓ Homebrewery stylesheet downloaded');
        resolve(css);
      });
    }).on('error', (err) => {
      console.error('  ✗ Failed to download stylesheet:', err.message);
      console.error('  ✗ Please manually download from https://github.com/naturalcrit/homebrewery/raw/master/phb.standalone.css');
      reject(err);
    });
  });
}

// Helper function to process an array of files and add them to the markdown
async function processFiles(files, buildDir, combinedMarkdown) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(buildDir, file);
    if (await fs.pathExists(filePath)) {
      console.log(`    Adding: ${file}`);
      const content = await fs.readFile(filePath, 'utf-8');
      combinedMarkdown += content + '\n\n';
      
      // Add page break between files if this is not the last file
      if (i < files.length - 1) {
        combinedMarkdown += `\\page\n\n`;
      }
    } else {
      console.warn(`    Warning: File not found: ${file}`);
    }
  }
  return combinedMarkdown;
}

// Function to read and concatenate markdown files
async function buildBook(tocFile, outputName) {
  console.log(`Building ${outputName}...`);
  
  const buildDir = path.dirname(tocFile);
  const toc = await fs.readJSON(tocFile);
  
  let combinedMarkdown = `# ${toc.title}\n\n`;
  combinedMarkdown += `### ${toc.subtitle}\n\n`;
  combinedMarkdown += `\\page\n\n`;
  
  // Add table of contents
  combinedMarkdown += `# Table of Contents\n\n`;
  let tocNumber = 1;
  
  for (const section of toc.sections) {
    combinedMarkdown += `## ${tocNumber}. ${section.chapter}\n\n`;
    tocNumber++;
  }
  
  combinedMarkdown += `\\page\n\n`;
  
  // Process each section
  for (const section of toc.sections) {
    console.log(`  Processing: ${section.chapter}`);
    combinedMarkdown += `\\page\n\n`;
    combinedMarkdown += `# ${section.chapter}\n\n`;
    
    // Handle subsections if present
    if (section.subsections) {
      for (const subsection of section.subsections) {
        combinedMarkdown += `## ${subsection.title}\n\n`;
        combinedMarkdown = await processFiles(subsection.files, buildDir, combinedMarkdown);
        combinedMarkdown += `\\page\n\n`;
      }
    } else if (section.files) {
      // Regular files
      combinedMarkdown = await processFiles(section.files, buildDir, combinedMarkdown);
    }
  }
  
  // Save combined markdown
  const mdPath = path.join(buildDir, `${outputName}.md`);
  await fs.writeFile(mdPath, combinedMarkdown);
  console.log(`  Saved combined markdown: ${mdPath}`);
  
  // Render using Homebrewery renderer (which handles all special syntax)
  console.log('  Rendering with Homebrewery markdown processor...');
  const htmlContent = renderHomebrewery(combinedMarkdown);
  
  // Load official Homebrewery CSS
  console.log('  Loading Homebrewery stylesheet...');
  const homebreweryCss = await loadHomebreweryCss();
  
  // Additional CSS to support our special classes and improve PDF rendering
  const additionalCss = `
/* Additional styles for better PDF rendering */
.pagebreak {
  page-break-before: always;
  break-before: page;
}

.columnSplit {
  break-after: column;
  column-span: none;
}

.blank {
  height: 1em;
}

/* Cover page styling */
.phb-cover {
  column-span: all;
  text-align: center;
  page-break-after: always;
}

.phb-cover h1 {
  font-size: 48pt;
  margin-top: 3in;
  margin-bottom: 0.2em;
  border: none;
}

.phb-cover .subtitle {
  font-size: 18pt;
  font-style: italic;
}

/* Critical fix for Puppeteer PDF generation with Homebrewery styling
 * The Homebrewery .phb class uses overflow:hidden and fixed height which clips
 * content in Puppeteer's PDF rendering. Override these properties while keeping
 * the 2-column layout to maintain the D&D look and feel.
 */
.phb {
  overflow: visible !important;
  height: auto !important;
  max-height: none !important;
}
`;

  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${toc.title}</title>
  <style>
${homebreweryCss}
${additionalCss}
  </style>
</head>
<body>
  <div class="phb">
    <div class="phb-cover">
      <h1>${toc.title}</h1>
      <div class="subtitle">${toc.subtitle}</div>
    </div>
${htmlContent}
  </div>
</body>
</html>
  `;
  
  const htmlPath = path.join(buildDir, `${outputName}.html`);
  await fs.writeFile(htmlPath, fullHtml);
  console.log(`  Saved HTML: ${htmlPath}`);
  
  // Convert to PDF using Puppeteer
  console.log(`  Generating PDF with Homebrewery styling...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set a larger viewport to ensure proper layout calculation
  await page.setViewport({ width: 1200, height: 1600 });
  
  // Emulate print media to ensure CSS @media print rules are applied
  await page.emulateMediaType('print');
  
  // Increase timeout for large documents and wait for network to be idle
  await page.goto(`file://${htmlPath}`, { 
    waitUntil: 'networkidle0',
    timeout: 60000  // 60 second timeout for large documents
  });
  
  // Wait additional time for the browser to fully render and calculate layout
  // This is especially important for large documents with complex CSS like Homebrewery
  // A fixed delay is used since the document size varies greatly (100-250+ pages)
  // and waiting for specific elements would be unreliable across different content
  console.log(`  Waiting for page layout to complete...`);
  await new Promise(resolve => setTimeout(resolve, 5000));  // 5 seconds for layout stabilization
  
  const pdfPath = path.join(buildDir, `${outputName}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: false,  // Use format option to avoid conflicts with Homebrewery @page rules
    margin: {
      top: '0.5in',
      right: '0.75in',
      bottom: '0.5in',
      left: '0.75in'
    },
    timeout: 120000  // 2 minute timeout for PDF generation of large documents
  });
  
  await browser.close();
  console.log(`  ✓ PDF generated: ${pdfPath}`);
  
  return pdfPath;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const buildPlayers = args.includes('--players') || args.length === 0;
  const buildDMs = args.includes('--dms') || args.length === 0;
  
  const buildDir = path.join(__dirname, 'build');
  await fs.ensureDir(buildDir);
  
  try {
    if (buildPlayers) {
      await buildBook(
        path.join(buildDir, 'players-guide-toc.json'),
        'The-adventurers-guide-to-aevoria'
      );
    }
    
    if (buildDMs) {
      await buildBook(
        path.join(buildDir, 'dms-guide-toc.json'),
        'A-DMs-guide-to-aevoria'
      );
    }
    
    console.log('\n✓ Build complete! PDFs now use official Homebrewery styling.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildBook };
