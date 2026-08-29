/**
 * Upload a blog draft JSON file to the AltusPoint database.
 *
 * Usage: node scripts/upload-draft.mjs drafts/2026-04-08-como-elegir-medias-de-compresion.json
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY environment variable.
 * Get it from: https://supabase.com/dashboard → Project Settings → API → service_role key
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = 'https://eqjxmzmtnzjqqirdxbwj.supabase.co';

// Get file path from command line
const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ Usage: node scripts/upload-draft.mjs <path-to-json-file>');
  console.error('   Example: node scripts/upload-draft.mjs drafts/2026-04-08-como-elegir-medias-de-compresion.json');
  process.exit(1);
}

// Get service role key
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY environment variable.');
  console.error('');
  console.error('   Get it from: https://supabase.com/dashboard');
  console.error('   → Select your project → Settings → API → service_role key');
  console.error('');
  console.error('   Then run:');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=your_key_here node scripts/upload-draft.mjs <file>');
  process.exit(1);
}

// Read and parse JSON
const fullPath = resolve(filePath);
let data;
try {
  data = JSON.parse(readFileSync(fullPath, 'utf-8'));
  console.log(`📄 Read file: ${fullPath}`);
  console.log(`   Title (ES): ${data.title_es}`);
  console.log(`   Title (EN): ${data.title_en}`);
  console.log(`   Slug: ${data.slug}`);
  console.log(`   Published: ${data.published ? '✅ Yes' : '📝 Draft'}`);
} catch (err) {
  console.error(`❌ Could not read file: ${err.message}`);
  process.exit(1);
}

// Upload to Supabase
try {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
    method: 'POST',
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`❌ Upload failed (${response.status}): ${error}`);
    process.exit(1);
  }

  const result = await response.json();
  console.log('');
  console.log('✅ Blog post uploaded successfully!');
  console.log(`   ID: ${result[0].id}`);
  console.log(`   Status: ${result[0].published ? 'Published' : 'Draft — go to admin panel to publish'}`);
  console.log('');
  console.log('   → Admin panel: https://altuspoint.health/es/admin/blog');
} catch (err) {
  console.error(`❌ Network error: ${err.message}`);
  process.exit(1);
}
