#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer');
const { render: renderHomebrewery } = require('./homebrewery-renderer');

// DungeonsAndMarkdown (VS Code extension) style HTML wrapper.
// Mirrors their page-based DOM structure so saved HTML looks like the VS Code preview
// and prints cleanly to PDF.
const DNM_TEMPLATE_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />
    <link href='https://assets.dungeonsandmarkdown.spjak.com/bundle.css' rel='stylesheet' />
    <base target="_blank">
    <title>{{ title }}</title>
  </head>
  <body>
    <div>
      <div class="frame-content">
        <div class="brewRenderer">
          <link href="https://assets.dungeonsandmarkdown.spjak.com/themes/V3/Blank/style.css" rel="stylesheet">
          <link href="https://assets.dungeonsandmarkdown.spjak.com/themes/V3/5ePHB/style.css" rel="stylesheet">
          <style>
            .page p { color: black }
            .page li { color: black }
            .page table { color: black }
            .page h5 { color: black }
            .page h6 { color: black }
            .page dl { color: black }
            .page .monster hr:last-of-type~:is(dl,p) { color: black }
            .page { padding-bottom: 1.1cm }
            .page { position: relative }
            /* Default image behavior: constrain to column width unless explicitly styled */
            .page img { max-width: 100%; height: auto; }
            .page p > img { display: block; }
            .page .watermark { z-index: -500; }
          </style>
          <div class="pages">
            {{ body }}
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Ensures exactly one \\page at the end of each file.
function normalizePageBreak(content) {
  let normalized = String(content).trimEnd();
  // Remove trailing page directives. Accept either "\page" (correct)
  // or "\\page" (accidentally double-escaped) so we can self-heal.
  normalized = normalized.replace(/((?:\\page|\\\\page)\s*)+$/, '');
  normalized = normalized.trimEnd();
  // Append exactly one correct page directive (single backslash in markdown).
  normalized += '\n\n\\page';
  return normalized;
}

async function processFiles(files, buildDir, combinedMarkdown) {
  for (const file of files) {
    const filePath = path.join(buildDir, file);
    if (await fs.pathExists(filePath)) {
      console.log(`    Adding: ${file}`);
      let content = await fs.readFile(filePath, 'utf-8');
      content = normalizePageBreak(content);
      combinedMarkdown += content + '\n\n';
    } else {
      console.warn(`    Warning: File not found: ${file}`);
    }
  }
  return combinedMarkdown;
}

function renderDungeonsAndMarkdownPages(rawMarkdown) {
  // Split on lines that are just "\page" (allowing trailing whitespace).
  // Also accept "\\page" in case any content was double-escaped.
  const pages = String(rawMarkdown).split(/^(?:\\page|\\\\page)\s*$/gm);
  let outputHtml = '';

  for (let i = 0, pageIndex = 0; i < pages.length; i++) {
    const pageText = pages[i] ?? '';

    // Drop a trailing empty page (common when source ends with \page)
    if (i === pages.length - 1 && pageText.trim() === '') {
      continue;
    }

    // Match DungeonsAndMarkdown: ensure a second column exists by adding a column break.
    // Use &nbsp; so Marked produces a minimal visible token.
      // IMPORTANT: Homebrewery directives use a single backslash in markdown.
      // In a JS string literal, that is written as "\\column".
      const paddedText = `${pageText}\n\n&nbsp;\n\\column\n&nbsp;`;
    const rendered = renderHomebrewery(paddedText);

    outputHtml += `\n<div class="page" id="p${pageIndex + 1}" key="${pageIndex}">\n  <div class="columnWrapper">${rendered}</div>\n</div>\n`;
    pageIndex++;
  }

  return outputHtml;
}

async function buildBook(tocFile, outputName) {
  console.log(`Building ${outputName}...`);

  const buildDir = path.dirname(tocFile);
  const toc = await fs.readJSON(tocFile);

  let combinedMarkdown = '';
  combinedMarkdown = `{{partCover}}\n\n`;
  if (toc.includeTextOnCover == true) {
    combinedMarkdown += `# ${toc.title}\n\n`;
    combinedMarkdown += `### ${toc.subtitle}\n\n`;
  }
  combinedMarkdown +=`{{imageMaskEdge6,--offset:10cm,--rotation:180
  ![Background image](${toc.coverImage}){position:absolute,bottom:0,left:0,height:100%}
}}\n\n`;
  combinedMarkdown += `\\page\n\n`;
  combinedMarkdown += `{{wide \n\n`;
  // Add table of contents
  if (toc.includeTextOnCover == false) {
        combinedMarkdown += `# ${toc.title}\n\n`;
        combinedMarkdown += `### ${toc.subtitle}\n\n::::\n\n`;
  }
  combinedMarkdown += `## Table of Contents\n\n::::\n\n`;
  let tocNumber = 1;

  for (const section of toc.sections) {
    combinedMarkdown += `### ${tocNumber}. ${section.chapter}\n\n`;
    tocNumber++;
  }
  combinedMarkdown += `}}\n\n`;
  combinedMarkdown += `\\page\n\n`;

  // Process each section
  for (const section of toc.sections) {
    console.log(`  Processing: ${section.chapter}`);
    combinedMarkdown += `# ${section.chapter}\n\n`;

    if (section.subsections) {
      for (const subsection of section.subsections) {
        combinedMarkdown += `## ${subsection.title}\n\n`;
        combinedMarkdown = await processFiles(subsection.files, buildDir, combinedMarkdown);
      }
    } else if (section.files) {
      combinedMarkdown = await processFiles(section.files, buildDir, combinedMarkdown);
    }
  }

  // Save combined markdown
  const mdPath = path.join(buildDir, `${outputName}.md`);
  await fs.writeFile(mdPath, combinedMarkdown);
  console.log(`  Saved combined markdown: ${mdPath}`);

  // Render to DungeonsAndMarkdown-style HTML
  console.log('  Rendering to DungeonsAndMarkdown-style paged HTML...');
  const bodyHtml = renderDungeonsAndMarkdownPages(combinedMarkdown);
  const fullHtml = DNM_TEMPLATE_HTML
    .replace('{{ title }}', escapeHtml(toc.title || outputName))
    .replace('{{ body }}', bodyHtml);

  const htmlPath = path.join(buildDir, `${outputName}.html`);
  await fs.writeFile(htmlPath, fullHtml);
  console.log(`  Saved HTML: ${htmlPath}`);

  // Convert to PDF using Puppeteer
  console.log('  Generating PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 600000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(180000);
  await page.setViewport({ width: 1200, height: 1600 });
  await page.emulateMediaType('screen');

  const fileUrl = pathToFileURL(htmlPath).href;
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 180000 });

  console.log('  Waiting for page layout to complete...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  const pdfPath = path.join(buildDir, `${outputName}.pdf`);
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    timeout: 180000
  });

  await browser.close();
  console.log(`  ✓ PDF generated: ${pdfPath}`);

  return pdfPath;
}

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

    console.log('\n✓ Build complete! HTML/PDF now mirror DungeonsAndMarkdown page rendering.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildBook };
