// One-off script: generates public/images/og-default.png (1200x630) - the
// site-wide default social-share image, used whenever a page doesn't pass
// its own ogImage. Run with: node scripts/generate-og-image.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const logoBase64 = readFileSync('public/img/logow.png').toString('base64');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#050505"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="42%" r="45%">
      <stop offset="0%" style="stop-color:#3b6fb0;stop-opacity:0.35"/>
      <stop offset="100%" style="stop-color:#3b6fb0;stop-opacity:0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="8" height="630" fill="#3b6fb0"/>
  <rect x="0" y="618" width="1200" height="12" fill="#3b6fb0" opacity="0.6"/>

  <image x="530" y="120" width="140" height="140" href="data:image/png;base64,${logoBase64}"/>

  <text x="600" y="320" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="46" font-weight="700" fill="#f8fafc" text-anchor="middle">Phehlwana Group Investments</text>

  <rect x="330" y="360" width="540" height="34" rx="17" fill="#3b6fb0" opacity="0.18"/>
  <text x="600" y="383" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="15" font-weight="600" letter-spacing="2" fill="#a9c3e3" text-anchor="middle">CONSTRUCTION &#183; ENGINEERING &#183; PLANT HIRE &#183; SECURITY</text>

  <text x="600" y="440" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Trusted nationally across South Africa &#183; Established 2015</text>

  <text x="600" y="500" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="16" fill="#475569" text-anchor="middle" letter-spacing="1">phehlwanagroup.co.za</text>
</svg>
`;

await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile('public/images/og-default.png');
console.log('Generated public/images/og-default.png');
