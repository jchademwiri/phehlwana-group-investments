# Technical Gaps — SEO, Analytics, Performance, Accessibility, Deployment

---

## SEO (Phase 7) — ✅ Complete

### What's Done
- ✅ `site: 'https://phehlwanagroup.co.za'` in astro.config.mjs
- ✅ `@astrojs/sitemap` installed — auto-generates sitemap-index.xml on build
- ✅ `public/robots.txt` created (allows all crawlers)
- ✅ `lang="en-ZA"` on `<html>`
- ✅ All pages have unique `<title>` and `<meta name="description">`
- ✅ `@vercel/analytics` active in Layout
- ✅ **Open Graph tags** — `og:title`, `og:description`, `og:image` (1200×630), `og:type`, `og:url`, `og:site_name`, `og:locale=en_ZA`
- ✅ **Twitter Card tags** — `summary_large_image` with title, description, image
- ✅ **JSON-LD LocalBusiness schema** — full business details: address, phone, email, hours, VAT, founding date
- ✅ **JSON-LD WebSite schema** — site name + URL
- ✅ **Canonical tags** — auto-generated from `Astro.url` on every page
- ✅ **Google Analytics 4** — gtag.js installed, gated behind `PUBLIC_GA4_ID` env var
- ✅ **GA4 event tracking** — phone clicks, email clicks, WhatsApp clicks, CTA clicks, form submissions
- ✅ Blog detail pages pass `ogImage` + `ogType="article"`
- ✅ Project detail pages pass `ogImage`

### Still Remaining
| Item | Priority | Effort | Notes |
|------|:--------:|:------:|-------|
| Google Search Console verification | 🔴 High | Medium | After Vercel deploy — verify site ownership |
| Dedicated OG image (1200×630px) | 🟡 Medium | Low | Currently uses logo fallback |
| JSON-LD Service schema (per service) | 🟡 Medium | Medium | Would enable service search features |
| Article JSON-LD (per blog post) | 🟡 Medium | Low | Would improve blog search results |
| Heading structure audit | 🟡 Medium | Low | Ensure proper h1→h2→h3 hierarchy |

### SEO Score Estimate
**Current estimated SEO readiness: ~75%**

---

## Analytics

| Item | Status | Notes |
|------|--------|-------|
| Vercel Analytics | ✅ Active | Basic page views |
| Google Analytics 4 | ✅ Installed (env-gated) | gtag.js + event tracking; requires `PUBLIC_GA4_ID` to activate |
| GA4 event tracking | ✅ Implemented | Phone, email, WhatsApp, CTA clicks, form submissions all captured |
| Facebook Pixel | ❌ Not installed | N/A — client may not run ads |
| LinkedIn Insight Tag | ❌ Not installed | N/A — client may not run ads |

---

## Performance (Phase 8) — ✅ Complete

| Item | Status | Notes |
|------|--------|-------|
| Lighthouse-style audit | ✅ Run (local preview) | Full report in `08-lighthouse-audit.md` |
| WebP image conversion | ✅ **19 images converted** | Sharp quality 80; hero 89% smaller (2.7 MB → 292 KB) |
| Picture component (`Picture.astro`) | ✅ Created | Auto-serves WebP with PNG/JPEG fallback |
| Picture usage across pages | ✅ 8+ templates | Home (hero ×3, about, services ×5, projects ×3), About, Services listing, ServiceLayout (all 5 service pages), Blog list + detail, Projects list + detail |
| Hero image preload | ✅ Added | WebP + PNG, `fetchpriority="high"`, all screen sizes |
| `loading="lazy"` on images | ✅ Verified | Slide 1 = eager; everything else = lazy |
| `width`/`height` on images | ✅ Verified | All images have explicit dimensions |
| Font display strategy | ✅ `display=swap` + preconnect | Inter + Outfit with preconnect hints to Google Fonts CDN |
| CSS bundle size | ✅ Verified | Included in Tailwind v4 build (tree-shaken) |
| JS bundle size | ✅ 194 KB + 567 B | 1 Astro client chunk + animations.js |
| Content sweep (typos, placeholders) | ❌ Not done | "Phehlawana", "coming soon", "lorem" search needed |

### Build Profile
- **Total build size:** 13 MB
- **Build time:** ~15 seconds
- **Pages generated:** 22 static HTML files
- **Home page HTML:** 73 KB (includes OG tags, JSON-LD, preload links, Google Fonts)

### Remaining Performance Opportunities
1. Run actual Lighthouse in production for definitive LCP/CLS/TBT scores
2. Convert JPEG project images at quality 85 (better for photographic content)
3. Create dedicated 1200×630 OG image for better social previews

---

## Accessibility

| Item | Status | Notes |
|------|--------|-------|
| Skip-to-content link | ✅ Present | In Layout.astro |
| Semantic HTML | ⚠️ Needs review | Headings, landmarks |
| Alt text on images | ⚠️ Needs review | Some service images use alt="" |
| ARIA attributes | ⚠️ Needs review | Dropdown, drawer, FAQ accordion have them |
| Keyboard navigation | ⚠️ Needs review | Dropdown, drawer, mobile menu |
| Color contrast | ⚠️ Needs review | Light grey on white may fail WCAG AA |
| Focus indicators | ⚠️ Needs review | Custom focus styles may be missing |
| Form error announcements | ✅ Good | aria-describedby + role="alert" |
| Heading hierarchy | 🟡 Needs audit | Multiple h1s possible on some pages |

---

## Deployment (Phase 9)

| Item | Status | Notes |
|------|--------|-------|
| Vercel project created | ❌ Not done | |
| GitHub repo connected | ❌ Not done | |
| Build command configured | ❌ Not done | Should be `bun run build` |
| Install command configured | ❌ Not done | Should be `bun install` |
| Environment variables set | ❌ Not done | RESEND_API_KEY, FROM_EMAIL, TO_EMAIL, etc. |
| Custom domain DNS | ❌ Not configured | |
| SSL certificate | ❌ Auto by Vercel | |
| Post-deploy verification | ❌ Not done | |
| Domain: `phehlwanagroup.co.za` | ✅ Registered | |
| Hosting provider | ✅ Vercel chosen | Adapter installed |

### Env Variables Needed in Vercel

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@info.phehlwanagroup.co.za
TO_EMAIL=info@phehlwanagroup.co.za
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

---

## Monitoring & Maintenance

| Item | Status | Notes |
|------|--------|-------|
| Error monitoring | ❌ Not set up | Vercel provides basic error logs |
| Uptime monitoring | ❌ Not set up | Vercel provides 99.99% SLA |
| Backup strategy | ✅ Git | Full codebase in GitHub |
| Contact form monitoring | ❌ Not set up | No alert if Resend fails |
