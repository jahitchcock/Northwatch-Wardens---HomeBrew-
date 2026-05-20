#!/usr/bin/env node

/**
 * Imgur Web Upload Script for Northwatch Wardens
 * Uploads images to Imgur via browser automation (web UI login)
 * 
 * Usage: node scripts/upload-to-imgur-web.js <image-path> [image-path2] ...
 * 
 * Requires: npm install playwright
 *   Then install browsers: npx playwright install chromium
 * 
 * Setup:
 *   1. Copy .env.example to .env
 *   2. Add your Imgur credentials:
 *      IMGUR_USERNAME=your_username
 *      IMGUR_PASSWORD=your_password
 *   3. (Optional) Set HEADLESS=false for the first run to log in manually
 *      if automated login fails (CAPTCHA, 2FA, etc.)
 */

const fs = require('fs');
const path = require('path');

// Load .env if present
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      envContent.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
          process.env[match[1].trim()] = match[2].trim();
        }
      });
    }
  } catch (e) {
    // .env not found, continue
  }
}
loadEnv();

const HEADLESS = process.env.HEADLESS !== 'false';
const IMGUR_USERNAME = process.env.IMGUR_USERNAME;
const IMGUR_PASSWORD = process.env.IMGUR_PASSWORD;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadToImgurWeb(imagePaths) {
  let playwright;
  try {
    playwright = require('playwright');
  } catch (e) {
    console.error('Playwright is not installed.');
    console.error('Install it with: npm install playwright');
    console.error('Then install browsers: npx playwright install chromium');
    process.exit(1);
  }

  const browser = await playwright.chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  const results = [];

  try {
    console.log('Navigating to Imgur...');
    await page.goto('https://imgur.com/', { waitUntil: 'networkidle' });

    // Check if already logged in (cookie/session saved from previous run)
    const isLoggedIn = await page.locator('text=Sporkulon').count() > 0 ||
                       await page.locator('[data-testid="username"]').count() > 0 ||
                       await page.locator('.UserNavbar').count() > 0;

    if (!isLoggedIn && IMGUR_USERNAME && IMGUR_PASSWORD) {
      console.log('Logging in...');
      await page.click('text=Sign in');
      await page.waitForURL(/signin|login/, { timeout: 10000 }).catch(() => {});

      // Try to find the login form
      const usernameField = page.locator('input[name="username"], input[name="email"], #username, input[type="text"]').first();
      const passwordField = page.locator('input[name="password"], #password, input[type="password"]').first();

      if (await usernameField.count() > 0 && await passwordField.count() > 0) {
        await usernameField.fill(IMGUR_USERNAME);
        await passwordField.fill(IMGUR_PASSWORD);
        
        // Click sign in button
        const signInButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Sign in"), button:has-text("Log in")').first();
        if (await signInButton.count() > 0) {
          await signInButton.click();
          await page.waitForLoadState('networkidle');
          await sleep(3000);
        }
      } else {
        console.log('Could not find login form. Please log in manually.');
        console.log('Waiting 60 seconds for manual login...');
        await sleep(60000);
      }
    } else if (!isLoggedIn) {
      console.log('No credentials found. Please log in manually in the browser window.');
      console.log('Waiting 60 seconds for manual login...');
      await sleep(60000);
    }

    // Navigate to user images page for upload
    console.log('Navigating to upload page...');
    await page.goto('https://imgur.com/upload', { waitUntil: 'networkidle' });
    await sleep(2000);

    for (const imagePath of imagePaths) {
      if (!fs.existsSync(imagePath)) {
        console.error(`File not found: ${imagePath}`);
        continue;
      }

      const absolutePath = path.resolve(imagePath);
      const fileName = path.basename(imagePath);

      console.log(`Uploading ${fileName}...`);

      try {
        // Look for the file input on the upload page
        const fileInput = page.locator('input[type="file"]').first();
        
        if (await fileInput.count() === 0) {
          // Some Imgur UIs require clicking a button first
          const uploadButton = page.locator('button:has-text("Choose Photo/Video"), button:has-text("Upload"), [data-testid="upload-button"]').first();
          if (await uploadButton.count() > 0) {
            await uploadButton.click();
            await sleep(1000);
          }
        }

        // Wait for the file input and set files
        await page.waitForSelector('input[type="file"]', { timeout: 10000 });
        const inputHandle = await page.$('input[type="file"]');
        await inputHandle.setInputFiles(absolutePath);

        // Wait for upload to complete
        console.log('  Waiting for upload to complete...');
        
        // Imgur shows a progress bar or transitions to the image page/post page
        await page.waitForURL(/imgur\.com\/(gallery|a|upload|post)/, { timeout: 60000 });
        await sleep(3000);

        // Extract the direct image URL
        // After upload, Imgur usually shows the image page with sharing options
        let imageUrl = null;
        
        // Try to find the direct image link
        const directLinkSelectors = [
          'input[value*="i.imgur.com"]',
          'input[placeholder*="i.imgur.com"]',
          '[data-testid="image-link"]',
          'a[href*="i.imgur.com"]'
        ];

        for (const selector of directLinkSelectors) {
          const element = page.locator(selector).first();
          if (await element.count() > 0) {
            const value = await element.inputValue().catch(() => null) || await element.getAttribute('href');
            if (value && value.includes('i.imgur.com')) {
              imageUrl = value;
              break;
            }
          }
        }

        // Alternative: look for the image itself
        if (!imageUrl) {
          const img = page.locator('img[src*="i.imgur.com"]').first();
          if (await img.count() > 0) {
            const src = await img.getAttribute('src');
            if (src) imageUrl = src;
          }
        }

        // Alternative: get from page URL (gallery post) - construct direct URL
        if (!imageUrl) {
          const currentUrl = page.url();
          const match = currentUrl.match(/imgur\.com\/(?:gallery|a)\/([A-Za-z0-9]+)/);
          if (match) {
            // Try to determine extension from original file
            const ext = path.extname(imagePath).toLowerCase() || '.png';
            const imgExt = ext === '.jpg' || ext === '.jpeg' ? '.jpg' : ext === '.gif' ? '.gif' : ext === '.webp' ? '.webp' : '.png';
            imageUrl = `https://i.imgur.com/${match[1]}${imgExt}`;
          }
        }

        if (imageUrl) {
          console.log(`  URL: ${imageUrl}`);
          results.push({ path: imagePath, url: imageUrl });
        } else {
          console.error(`  Could not extract URL for ${fileName}`);
          console.error(`  Current page: ${page.url()}`);
        }

        // Go back to upload page for next image
        if (imagePaths.indexOf(imagePath) < imagePaths.length - 1) {
          await page.goto('https://imgur.com/upload', { waitUntil: 'networkidle' });
          await sleep(2000);
        }

      } catch (error) {
        console.error(`  Error uploading ${fileName}: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('Browser automation error:', error.message);
  } finally {
    if (!HEADLESS) {
      console.log('\nBrowser will remain open for 10 seconds...');
      await sleep(10000);
    }
    await browser.close();
  }

  return results;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Imgur Web Upload Script for Northwatch Wardens');
    console.log('');
    console.log('Usage: node scripts/upload-to-imgur-web.js <image1> [image2] ...');
    console.log('');
    console.log('Setup:');
    console.log('  1. Copy .env.example to .env');
    console.log('  2. Add IMGUR_USERNAME and IMGUR_PASSWORD to .env');
    console.log('  3. Install Playwright: npm install playwright');
    console.log('  4. Install browsers: npx playwright install chromium');
    console.log('');
    console.log('Options (env vars):');
    console.log('  HEADLESS=false  - Show browser window (useful for first-run login/CAPTCHA)');
    console.log('');
    console.log('Current config:');
    console.log(`  IMGUR_USERNAME: ${IMGUR_USERNAME ? '(set)' : '(not set)'}`);
    console.log(`  IMGUR_PASSWORD: ${IMGUR_PASSWORD ? '(set)' : '(not set)'}`);
    console.log(`  HEADLESS: ${HEADLESS}`);
    process.exit(1);
  }

  console.log(`Uploading ${args.length} image(s) to Imgur via web...\n`);

  const results = await uploadToImgurWeb(args);

  console.log(`\n✓ Uploaded ${results.length}/${args.length} images`);

  if (results.length > 0) {
    console.log('\nMarkdown references:');
    results.forEach(({ path: p, url }) => {
      console.log(`![${path.basename(p, path.extname(p))}](${url})`);
    });
    
    console.log('\nRaw URLs:');
    results.forEach(({ path: p, url }) => {
      console.log(`${path.basename(p)}: ${url}`);
    });
  }
}

main().catch(console.error);
