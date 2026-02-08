#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { pathToFileURL } = require('url');
const { execSync } = require('child_process');
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
            /* ============================================
               TRUE FULL-BLEED PRINT (NO SHRINKING)
               ============================================ */
            @page {
              size: 8.5in 11in;
              margin: 0; /* absolutely required for no white borders */
            }

            /* ============================================
               SCREEN VIEW
               ============================================ */
            @media screen {
              html, body { 
                margin: 0; 
                padding: 0; 
                width: 100%;
                height: 100%;
              }
              body {
                overflow-y: auto;
                overflow-x: hidden;
              }
              .pages { 
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 20px 0;
              }
            }
            
            /* ============================================
               PRINT RULES
               ============================================ */
            @media print {
              /* Remove browser auto-shrink behavior */
              html, body {
                width: 100%;
                height: auto;
                margin: 0;
                padding: 0;
                overflow: visible !important;
              }

              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              /* Force content to fill the printable area */
              body > * {
                width: 100% !important;
                max-width: 100% !important;
              }

              /* Prevent scrollbars */
              * {
                overflow: visible !important;
              }

              /* Two-column layout */
              .two-column {
                column-count: 2;
                column-gap: 1cm;
                width: 100% !important;
              }

              /* Full-width banners */
              .full-width {
                column-span: all;
                width: 100% !important;
              }

              /* Prevent elements from splitting across pages */
              h1, h2, h3, h4, h5, h6,
              img,
              table,
              .no-break {
                page-break-inside: avoid;
                break-inside: avoid;
              }

              /* Page breaks */
              .page-break {
                break-before: page;
              }

              .pages {
                display: block;
              }
              
              .page {
                page-break-after: always;
                page-break-inside: avoid;
                break-after: page;
                break-inside: avoid;
                margin: 0;
                overflow: visible !important;
              }
              
              .page:last-child {
                page-break-after: auto;
              }
            }
            
            /* ============================================
               PAGE CONTAINER
               ============================================ */
            .sheet {
              width: 100%;
              padding: 0.5in;
              box-sizing: border-box;
              break-after: page;
            }
            
            /* ============================================
               COMMON STYLES
               ============================================ */
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
      // Add file marker for unbuild sync
      combinedMarkdown += `<!-- FILE_START: ${file} -->\n`;
      let content = await fs.readFile(filePath, 'utf-8');
      content = normalizePageBreak(content);
      combinedMarkdown += content + '\n';
      combinedMarkdown += `<!-- FILE_END: ${file} -->\n\n`;
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
  
  // Homebrewery metadata block
  combinedMarkdown = '```metadata\n';
  combinedMarkdown += `title: ${toc.title}\n`;
  combinedMarkdown += `description: '${toc.subtitle || ''}'\n`;
  combinedMarkdown += 'tags: []\n';
  combinedMarkdown += 'systems:\n';
  combinedMarkdown += '  - 5e\n';
  combinedMarkdown += 'renderer: V3\n';
  combinedMarkdown += 'theme: 5ePHB\n';
  combinedMarkdown += 'snippets:\n';
  combinedMarkdown += '```\n\n';
  combinedMarkdown += '```css\n';
  combinedMarkdown += '.page #example + table td {\n';
  combinedMarkdown += '\tborder:1px dashed #00000030;\n';
  combinedMarkdown += '}\n';
  combinedMarkdown += '.page {\n';
  combinedMarkdown += '\tpadding-bottom : 1.1cm;\n';
  combinedMarkdown += '}\n\n\n\n\n';
  combinedMarkdown += '```\n\n';
  
  // Front cover with optional banner and footnote
  combinedMarkdown += '{{frontCover}}\n';
  
  if (toc.enableBanner && toc.bannerText) {
    combinedMarkdown += '{{banner ' + toc.bannerText + '}}\n';
  }
  
  if (toc.enableFootnote && toc.footnoteText) {
    combinedMarkdown += '{{footnote\n  \n';
    combinedMarkdown += '##### ' + toc.footnoteText + '\n';
    combinedMarkdown += '}}\n';
  }
  
  // Cover image with configurable positioning
  const imagePosition = toc.coverImagePosition || 'absolute,bottom:0,left:0,height:100%';
  combinedMarkdown += `![background image](${toc.coverImage}){position:${imagePosition}}\n`;
  
  combinedMarkdown += '\\page\n';
  combinedMarkdown += '\n\n\n\n\n\n';
  
  // Use Homebrewery's auto-TOC feature
  combinedMarkdown += '{{toc,wide\n';
  combinedMarkdown += `# ${toc.title}\n`;
  combinedMarkdown += '# Contents\n';
  combinedMarkdown += '}}\n\n\n\n\n\n';
  
  combinedMarkdown += '\\page\n\n';
  combinedMarkdown += '{{resetCounting}}\n';

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

  // Save Homebrewery-compatible .txt version
  const txtPath = path.join(buildDir, `${outputName}.txt`);
  await fs.writeFile(txtPath, combinedMarkdown);
  console.log(`  Saved Homebrewery .txt: ${txtPath}`);

  // Render to DungeonsAndMarkdown-style HTML
  console.log('  Rendering to DungeonsAndMarkdown-style paged HTML...');
  const bodyHtml = renderDungeonsAndMarkdownPages(combinedMarkdown);
  const fullHtml = DNM_TEMPLATE_HTML
    .replace('{{ title }}', escapeHtml(toc.title || outputName))
    .replace('{{ body }}', bodyHtml);

  const htmlPath = path.join(buildDir, `${outputName}.html`);
  await fs.writeFile(htmlPath, fullHtml);
  console.log(`  Saved HTML: ${htmlPath}`);

  // PDF generation skipped - use .txt file for Homebrewery upload
  console.log('  ✓ Build complete! Upload .txt file to homebrewery.naturalcrit.com');

  return htmlPath;
}

async function main() {
  const args = process.argv.slice(2);
  const buildPlayers = args.includes('--players') || args.length === 0;
  const buildDMs = args.includes('--dms') || args.length === 0;

  const buildDir = path.join(__dirname, 'build');
  await fs.ensureDir(buildDir);

  try {
    // Update page footers in markdown files before building
    console.log('Updating page footers...');
    try {
      execSync('python add_page_footers.py', { 
        stdio: 'inherit',
        cwd: __dirname 
      });
    } catch (error) {
      console.warn('Warning: Failed to update page footers. Continuing with build...');
    }
    console.log('');

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
