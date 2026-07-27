// One-off script: generates responsive width variants (WebP + original
// format) for the large, full-bleed hero/cover images used site-wide, so
// mobile viewports don't download the same full-size image as desktop.
// Run with: node scripts/generate-responsive-images.mjs
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WIDTHS = [480, 960, 1600];

// Only the large, full-width hero/cover images benefit from this - small
// thumbnails/cards stay as single-size (already fine at their fixed size).
const SOURCES = [
  'public/images/hero/carousel-2.png',
  'public/images/projects/project-04.jpeg',
  'public/images/projects/project-06.jpeg',
  'public/images/about-site.jpg',
  'public/images/services/service-construction.png',
  'public/images/services/service-mechanical.png',
  'public/images/services/service-cleaning.png',
  'public/images/services/service-plant-hire.png',
];

for (const src of SOURCES) {
  if (!existsSync(src)) {
    console.warn(`Skipping missing file: ${src}`);
    continue;
  }
  const { dir, name, ext } = path.parse(src);
  const isJpeg = /\.jpe?g$/i.test(ext);

  for (const width of WIDTHS) {
    const webpOut = path.join(dir, `${name}-${width}w.webp`);
    await sharp(src).resize({ width }).webp({ quality: 80 }).toFile(webpOut);

    const fallbackOut = path.join(dir, `${name}-${width}w${ext}`);
    const pipeline = sharp(src).resize({ width });
    await (isJpeg ? pipeline.jpeg({ quality: 85 }) : pipeline.png({ quality: 85 })).toFile(fallbackOut);

    console.log(`Generated ${webpOut} + ${fallbackOut}`);
  }
}

console.log('Done.');
