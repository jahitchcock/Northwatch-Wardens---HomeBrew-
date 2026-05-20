#!/usr/bin/env node

/**
 * Imgur Upload Script for Northwatch Wardens
 * Uploads images to Imgur and returns the direct URL
 * 
 * Usage: node scripts/upload-to-imgur.js <image-path> [image-path2] ...
 * 
 * Requires: npm install form-data axios
 */

const fs = require('fs');
const path = require('path');

// Load .env if present
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

async function uploadToImgur(imagePath) {
  if (!fs.existsSync(imagePath)) {
    console.error(`File not found: ${imagePath}`);
    return null;
  }

  const clientId = process.env.IMGUR_CLIENT_ID;
  if (!clientId || clientId === 'your_client_id_here') {
    console.error('Error: IMGUR_CLIENT_ID not configured.');
    console.error('Copy .env.example to .env and add your Imgur client ID.');
    console.error('Get a client ID at: https://api.imgur.com/oauth2/addclient');
    return null;
  }

  try {
    // Dynamic import for form-data and axios (optional dependencies)
    const FormData = require('form-data');
    const axios = require('axios');

    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    const headers = {
      'Authorization': `Client-ID ${clientId}`,
      ...form.getHeaders()
    };

    // Add access token if available for account-specific upload
    if (process.env.IMGUR_ACCESS_TOKEN && process.env.IMGUR_ACCESS_TOKEN !== 'your_access_token_here') {
      headers['Authorization'] = `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`;
    }

    const response = await axios.post('https://api.imgur.com/3/image', form, { headers });

    if (response.data.success) {
      const data = response.data.data;
      console.log(`✓ ${path.basename(imagePath)}`);
      console.log(`  URL: ${data.link}`);
      console.log(`  Delete: ${data.deletehash}`);
      return data.link;
    } else {
      console.error(`Upload failed for ${imagePath}:`, response.data);
      return null;
    }
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('Missing dependencies. Install with:');
      console.error('  npm install form-data axios');
      return null;
    }
    console.error(`Error uploading ${imagePath}:`, error.response?.data || error.message);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Imgur Upload Script for Northwatch Wardens');
    console.log('');
    console.log('Usage: node scripts/upload-to-imgur.js <image1> [image2] ...');
    console.log('');
    console.log('Setup:');
    console.log('  1. Copy .env.example to .env');
    console.log('  2. Get Imgur client ID: https://api.imgur.com/oauth2/addclient');
    console.log('  3. (Optional) Add access token for account uploads');
    console.log('');
    console.log('Current config:');
    console.log(`  IMGUR_CLIENT_ID: ${process.env.IMGUR_CLIENT_ID ? '(set)' : '(not set)'}`);
    console.log(`  IMGUR_ACCESS_TOKEN: ${process.env.IMGUR_ACCESS_TOKEN ? '(set)' : '(not set)'}`);
    process.exit(1);
  }

  console.log(`Uploading ${args.length} image(s) to Imgur...\n`);

  const results = [];
  for (const imagePath of args) {
    const url = await uploadToImgur(imagePath);
    if (url) {
      results.push({ path: imagePath, url });
    }
  }

  console.log(`\n✓ Uploaded ${results.length}/${args.length} images`);

  if (results.length > 0) {
    console.log('\nMarkdown references:');
    results.forEach(({ path, url }) => {
      console.log(`![${path.basename(path, path.extname(path))}](${url})`);
    });
  }
}

main().catch(console.error);
