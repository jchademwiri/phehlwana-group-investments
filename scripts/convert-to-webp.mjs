/**
 * Batch convert all raster images (PNG, JPG, JPEG) in the public/ directory
 * to WebP format. Output files are saved alongside originals with `.webp`
 * extension (e.g. carousel-2.png → carousel-2.webp).
 *
 * Usage:  bun run scripts/convert-to-webp.mjs
 */

import { readdirSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { cwd } from 'node:process';
import sharp from 'sharp';

const PUBLIC_DIR = resolve(cwd(), 'public');

// Extensions to convert
const RASTER_EXTS = new Set(['.png', '.jpg', '.jpeg']);

// Files / patterns to skip (favicons, placeholders, already-converted)
const SKIP_PATTERNS = [
  'favicon',
  'android-chrome',
  'apple-touch-icon',
  'placeholder',
];

let converted = 0;
let skipped = 0;
let errors = [];

/** Recursively walk a directory, converting matching files. */
async function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const name of entries) {
    const full = join(dir, name);
    const stat = statSync(full);

    if (stat.isDirectory()) {
      await walk(full);
      continue;
    }

    const ext = extname(name).toLowerCase();
    if (!RASTER_EXTS.has(ext)) continue;

    // Check skip patterns
    if (SKIP_PATTERNS.some((p) => name.toLowerCase().includes(p))) {
      skipped++;
      continue;
    }

    const outputPath = join(dir, name.replace(ext, '.webp'));

    // Skip if WebP already exists and is newer than the source
    try {
      const outStat = statSync(outputPath);
      if (outStat.mtimeMs > stat.mtimeMs) {
        skipped++;
        continue;
      }
    } catch {
      // Output doesn't exist — proceed with conversion
    }

    try {
      await sharp(full).webp({ quality: 80 }).toFile(outputPath);
      converted++;
      process.stdout.write('.');
    } catch (err) {
      errors.push(`${full}: ${err.message}`);
    }
  }
}

console.log('Converting raster images to WebP...\n');
walk(PUBLIC_DIR).then(() => {
  console.log('\n');
  console.log(`Converted: ${converted}`);
  console.log(`Skipped:   ${skipped}`);

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    errors.forEach((e) => console.log(`   ${e}`));
  }

  console.log('\nDone.');
});
