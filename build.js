#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');
const { marked } = require('marked');

// Configure marked with options suitable for D&D content
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false,
  pedantic: false,
  smartLists: true,
  smartypants: true,
});

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

// Helper function to process markdown with Homebrewery syntax
function processHomebreweryMarkdown(content) {
  // Replace \page with page break marker
  content = content.replace(/\\page\s*/g, '\n\n<div class="phb-page-break"></div>\n\n');
  
  // Replace \column with column break marker
  content = content.replace(/\\column\s*/g, '\n\n<div class="phb-column-break"></div>\n\n');
  
  // Replace vertical spacing markers
  content = content.replace(/\n:\s*\n/g, '\n\n<div class="phb-spacing"></div>\n\n');
  content = content.replace(/\n::\s*\n/g, '\n\n<div class="phb-spacing-wide"></div>\n\n');
  
  // Process {{note}} blocks - make trailing newline optional for backward compatibility
  content = content.replace(/\{\{note\s*\n([\s\S]*?)\n?\}\}/g, (match, inner) => {
    return `\n\n<div class="phb-note-block">\n\n${inner}\n\n</div>\n\n`;
  });
  
  // Process {{descriptive}} blocks - make trailing newline optional
  content = content.replace(/\{\{descriptive\s*\n([\s\S]*?)\n?\}\}/g, (match, inner) => {
    return `\n\n<div class="phb-descriptive-block">\n\n${inner}\n\n</div>\n\n`;
  });
  
  // Process {{wide}} blocks (for tables spanning columns) - make trailing newline optional
  content = content.replace(/\{\{wide\s*\n([\s\S]*?)\n?\}\}/g, (match, inner) => {
    return `\n\n<div class="phb-wide-block">\n\n${inner}\n\n</div>\n\n`;
  });
  
  // Process {{monster}} blocks - sanitize frame parameter and make trailing newline optional
  content = content.replace(/\{\{monster,?\s*(.*?)\s*\n([\s\S]*?)\n?\}\}/g, (match, frame, inner) => {
    // Sanitize frame to only allow alphanumeric, hyphens, and underscores
    const sanitizedFrame = frame ? frame.replace(/[^a-zA-Z0-9_-]/g, '') : '';
    const frameClass = sanitizedFrame ? ` phb-monster-${sanitizedFrame}` : '';
    return `\n\n<div class="phb-monster-block${frameClass}">\n\n${inner}\n\n</div>\n\n`;
  });
  
  // Remove {{pageNumber}} and {{footnote}} markers (not supported in PDF generation)
  content = content.replace(/\{\{pageNumber[^}]{0,100}\}\}/g, '');
  content = content.replace(/\{\{footnote[^}]{0,200}\}\}/g, '');
  
  return content;
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
  
  // Process Homebrewery syntax
  const processedMarkdown = processHomebreweryMarkdown(combinedMarkdown);
  
  // Convert to HTML using marked
  const htmlContent = marked(processedMarkdown);
  
  // Load official Homebrewery CSS
  console.log('  Loading Homebrewery stylesheet...');
  const homebreweryCss = await loadHomebreweryCss();
  
  // Additional CSS to support our special classes and improve PDF rendering
  const additionalCss = `
/* Additional styles for better PDF rendering */
.phb-page-break {
  page-break-before: always;
  break-before: page;
}

.phb-column-break {
  break-after: column;
  column-span: none;
}

.phb-spacing {
  height: 0.5em;
}

.phb-spacing-wide {
  height: 1em;
}

.phb-note-block {
  background-color: #e0e5c1;
  border: 2px solid #c0ad6a;
  padding: 0.5em 1em;
  margin: 1em 0;
  break-inside: avoid;
}

.phb-descriptive-block {
  background-color: #fdf1dc;
  border: 1px solid #c0ad6a;
  padding: 0.5em 1em;
  margin: 1em 0;
  font-style: italic;
  break-inside: avoid;
}

.phb-wide-block {
  column-span: all;
}

.phb-monster-block {
  background-color: #fdf1dc;
  border: 1px solid #c0ad6a;
  padding: 0.5em;
  margin: 1em 0;
  break-inside: avoid;
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
  <div class="phb-cover">
    <h1>${toc.title}</h1>
    <div class="subtitle">${toc.subtitle}</div>
  </div>
${htmlContent}
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
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(buildDir, `${outputName}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.75in',
      bottom: '0.5in',
      left: '0.75in'
    }
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
