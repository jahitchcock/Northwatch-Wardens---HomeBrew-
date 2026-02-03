#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
});

// Homebrewery CSS (embedded version)
const HOMEBREWERY_CSS = `
/* Homebrewery-inspired styling for D&D 5e content */
@page {
  size: letter;
  margin: 1.27cm 1.9cm;
}

body {
  font-family: 'Bookinsanity', 'Book Antiqua', serif;
  font-size: 10.5pt;
  color: #000;
  background-color: #EEE5CE;
  column-count: 2;
  column-gap: 1cm;
  column-fill: auto;
  text-align: justify;
  line-height: 1.3;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Mr Eaves Small Caps', 'Times New Roman', serif;
  font-weight: bold;
  color: #58180D;
  break-after: avoid;
  margin-top: 0.5em;
  margin-bottom: 0.3em;
}

h1 {
  font-size: 32pt;
  column-span: all;
  text-align: center;
  margin-bottom: 0.3em;
  border-bottom: 2px solid #C0AD6A;
  padding-bottom: 0.2em;
}

h2 {
  font-size: 22pt;
  margin-top: 0.5em;
}

h3 {
  font-size: 18pt;
  border-bottom: 1px solid #C0AD6A;
}

h4 {
  font-size: 14pt;
}

h5 {
  font-size: 12pt;
}

p {
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  text-indent: 1em;
}

p + p {
  text-indent: 1em;
}

blockquote {
  background-color: #E0E5C1;
  border-left: 4px solid #C0AD6A;
  padding: 0.5em 1em;
  margin: 1em 0;
  font-style: italic;
  break-inside: avoid;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  break-inside: avoid;
}

table th {
  background-color: #C0AD6A;
  color: #58180D;
  padding: 0.3em;
  font-weight: bold;
  text-align: left;
}

table td {
  border-bottom: 1px solid #C0AD6A;
  padding: 0.3em;
}

ul, ol {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

li {
  margin: 0.2em 0;
}

code {
  font-family: 'Courier New', monospace;
  background-color: #E0E5C1;
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

pre {
  background-color: #E0E5C1;
  padding: 0.5em;
  border-left: 4px solid #C0AD6A;
  overflow-x: auto;
  break-inside: avoid;
}

.page-break {
  page-break-before: always;
  column-span: all;
  break-before: page;
}

.column-break {
  column-span: all;
  break-after: column;
}

.note-box {
  background-color: #E0E5C1;
  border: 2px solid #C0AD6A;
  padding: 0.5em 1em;
  margin: 1em 0;
  break-inside: avoid;
}

.descriptive-box {
  background-color: #FDF1DC;
  border: 1px solid #C0AD6A;
  padding: 0.5em 1em;
  margin: 1em 0;
  font-style: italic;
  break-inside: avoid;
}

.stat-block {
  background-color: #FDF1DC;
  border: 1px solid #C0AD6A;
  padding: 0.5em;
  margin: 1em 0;
  break-inside: avoid;
  font-size: 9pt;
}

.cover-page {
  column-span: all;
  text-align: center;
  page-break-after: always;
}

.cover-page h1 {
  font-size: 48pt;
  margin-top: 3in;
  margin-bottom: 0.2em;
  border: none;
}

.cover-page .subtitle {
  font-size: 18pt;
  color: #58180D;
  font-style: italic;
}

img {
  max-width: 100%;
  height: auto;
  break-inside: avoid;
}
`;

// Helper function to process markdown with Homebrewery syntax
function processHomebreweryMarkdown(content) {
  // Replace \page with page break marker
  content = content.replace(/\\page/g, '\n\n<div class="page-break"></div>\n\n');
  
  // Replace \column with column break marker
  content = content.replace(/\\column/g, '\n\n<div class="column-break"></div>\n\n');
  
  // Replace : spacing markers
  content = content.replace(/\n:\n/g, '\n\n<div style="height: 0.5em;"></div>\n\n');
  content = content.replace(/\n::\n/g, '\n\n<div style="height: 1em;"></div>\n\n');
  
  // Process {{note}} blocks
  content = content.replace(/\{\{note\s*\n([\s\S]*?)\}\}/g, (match, inner) => {
    return `\n\n<div class="note-box">\n\n${inner}\n\n</div>\n\n`;
  });
  
  // Process {{descriptive}} blocks
  content = content.replace(/\{\{descriptive\s*\n([\s\S]*?)\}\}/g, (match, inner) => {
    return `\n\n<div class="descriptive-box">\n\n${inner}\n\n</div>\n\n`;
  });
  
  // Process {{wide}} blocks (for tables spanning columns)
  content = content.replace(/\{\{wide\s*\n([\s\S]*?)\}\}/g, (match, inner) => {
    return `\n\n<div style="column-span: all;">\n\n${inner}\n\n</div>\n\n`;
  });
  
  return content;
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
        for (const file of subsection.files) {
          const filePath = path.join(buildDir, file);
          if (await fs.pathExists(filePath)) {
            console.log(`    Adding: ${file}`);
            const content = await fs.readFile(filePath, 'utf-8');
            combinedMarkdown += content + '\n\n';
          } else {
            console.warn(`    Warning: File not found: ${file}`);
          }
        }
        combinedMarkdown += `\\page\n\n`;
      }
    } else if (section.files) {
      // Regular files
      for (const file of section.files) {
        const filePath = path.join(buildDir, file);
        if (await fs.pathExists(filePath)) {
          console.log(`    Adding: ${file}`);
          const content = await fs.readFile(filePath, 'utf-8');
          combinedMarkdown += content + '\n\n';
        } else {
          console.warn(`    Warning: File not found: ${file}`);
        }
      }
    }
  }
  
  // Save combined markdown
  const mdPath = path.join(buildDir, `${outputName}.md`);
  await fs.writeFile(mdPath, combinedMarkdown);
  console.log(`  Saved combined markdown: ${mdPath}`);
  
  // Process Homebrewery syntax
  const processedMarkdown = processHomebreweryMarkdown(combinedMarkdown);
  
  // Convert to HTML
  const htmlContent = md.render(processedMarkdown);
  
  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${toc.title}</title>
  <style>
${HOMEBREWERY_CSS}
  </style>
</head>
<body>
  <div class="cover-page">
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
  console.log(`  Generating PDF...`);
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
    
    console.log('\n✓ Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildBook };
