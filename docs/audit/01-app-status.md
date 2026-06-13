# App Status — Phase-by-Phase Build Progress

> **Reference:** `docs/development-plan.md` for the original plan

---

## Phase 0 — Foundation & Config
**Status: ✅ Complete**

| Item | Status | Notes |
|------|--------|-------|
| Astro v6 + Starwind UI initialised | ✅ | |
| `@astrojs/vercel` adapter installed | ✅ | |
| `@astrojs/sitemap` installed | ✅ | |
| `@astrojs/react` installed | ✅ | For Resend email rendering |
| `@vercel/analytics` installed | ✅ | Active in Layout |
| `output: 'static'` set | ✅ | Individual routes opt into SSR with `prerender = false` |
| `site: 'https://phehlwanagroup.co.za'` set | ✅ | |
| All 19 Starwind components installed | ✅ | |
| `src/content.config.ts` — Astro v6 glob loader | ✅ | |
| `src/data/navigation.ts` — single nav source | ✅ | |
| Scroll animations (`public/scripts/animations.js`) | ✅ | Intersection Observer |
| `.env` + `.env.example` created | ✅ | |
| `public/robots.txt` created | ✅ | |
| All stub pages created | ✅ | 16 pages exist |
| `bun run build` — zero errors | ✅ | Verified |

---

## Phase 1 — Shared Layout & Navigation
**Status: ✅ Complete**

| Item | Status | Notes |
|------|--------|-------|
| `Layout.astro` — root layout | ✅ | Dark mode, skip-to-content, analytics, animations |
| `Header.astro` — glassmorphism sticky header | ✅ | Topbar, services dropdown, mobile drawer, theme toggle |
| `Footer.astro` — 4-column, theme-aware | ✅ | Logo light/dark switching, dynamic copyright |
| `404.astro` — branded, animated | ✅ | Beautiful 404 with grid background, search icon |
| `starwind.css` — Tailwind v4 + typography | ✅ | Prose overrides using CSS tokens |
| Google Fonts (Inter + Outfit) | ✅ | Integrated in Layout.astro |

---

## Phase 2 — Home Page
**Status: ⏳ Built but needs client content**

| Item | Status | Notes |
|------|--------|-------|
| Hero carousel (3 slides) | ✅ Built | Uses placeholder images from old site |
| Stats bar | ✅ Built | Shows BBBEE Level 1, CIDB 4CE/5GB, 10+ Years, National |
| About snapshot section | ✅ Built | Company overview, values, CTA |
| Services grid | ✅ Built | All 5 services with images + descriptions |
| Trust strip | ✅ Built | OHS Act, NEM:WA, 10+ years, 10 employees, Level 1 BBBEE |
| Trusted clients strip | ✅ Built | 6 named clients |
| Featured projects | ✅ Built | Pulls from content collection |
| Contact CTA | ✅ Built | |
| **Real hero photography** | ❌ Missing | Placeholder images from old site |
| **About section image** | ❌ Placeholder | `about-site.jpg` is old site placeholder |
| **Service card images** | ⚠️ 4 of 5 are placeholders | Security has its image now, others are old placeholders |
| **Hero slide transition** | ✅ Working | Auto-rotates every 5 seconds |

---

## Phase 3 — About Page
**Status: ⏳ Built but needs client content**

| Item | Status | Notes |
|------|--------|-------|
| PageHeader component | ✅ Built | |
| Company overview section | ✅ | Full copy written |
| Vision, Mission & Values | ✅ | 6 core values detailed |
| Our Story section | ✅ | Founding 2015 → re-registration 2020 |
| Stats bar | ✅ | Same stats as homepage |
| Why Choose Us (8 differentiators) | ✅ | |
| Accreditations & Compliance section | ✅ | CIDB, BBBEE, OHS, VAT, NHBRC displayed |
| Team section (2 members) | ✅ | Nicholas Mahlangu (CEO) + Sbusiso Mashilwane |
| Trusted clients strip | ✅ | 6 named clients |
| ContactCTA | ✅ | |
| **Team headshots** | ❌ Missing | Both use placeholder.svg |
| **CIDB registration number** | ❌ Missing | Shows "Registration Number Pending" |
| **BBBEE certificate PDF** | ❌ Missing | |
| **ISO 45001 certificate** | ❌ Missing | |
| **Sbusiso Mashilwane role/title** | ❌ Missing | Shows "Coming Soon" |
| **Nicholas Mahlangu bio** | ⚠️ Only 1 sentence placeholder | Needs expansion |

---

## Phase 4 — Services Pages
**Status: ✅ Built with full content**

| Item | Status | Notes |
|------|--------|-------|
| Services overview (`/services`) | ✅ | 5-card grid, process steps, safety commitment |
| ServiceLayout.astro | ✅ | Shared layout with hero image, breadcrumbs, safety section, CTA |
| Construction page | ✅ | 14 sub-services across 2 categories |
| Mechanical Engineering page | ✅ | 6 services + industries served |
| Cleaning & Waste Management page | ✅ | 5 cleaning + 5 waste sub-services |
| Plant Hire page | ✅ | 8 equipment types, wet/dry hire, hire process |
| Security page | ✅ | 6 sub-services, PSIRA compliance note |
| Service images (5) | ⚠️ Placeholder | All 5 service images are old-site placeholders |
| **Security service image** | ✅ Added | `/images/services/service-security.png` |

**Note on services:** Content is well-written but all images across the 5 service pages are placeholders from the old site. Real photography needed.

---

## Phase 5 — Projects Portfolio
**Status: ✅ Functional with placeholder content**

| Item | Status | Notes |
|------|--------|-------|
| Project listing page | ✅ | Category filter (6 categories), featured-first sort |
| Project detail page | ✅ | Image gallery, thumbnail strip, sticky sidebar, CTA |
| 4 published projects | ✅ | Construction, Road, Cleaning, Plant Hire |
| 1 placeholder project | ✅ | Draft/unpublished |
| 9 real project photos | ✅ | In `public/images/projects/` |
| **Need 2 more real projects** | ❌ | Mechanical and Security categories have no projects |
| **Client project details** | ❌ | Client confirmed projects exist but are "unorganised" |

**Categories missing projects:** Mechanical, Security — no projects exist for these categories yet.

---

## Phase 6 — Contact, Email & Utility
**Status: ⏳ Built but blocked on Resend**

| Item | Status | Notes |
|------|--------|-------|
| Contact form | ✅ Full | Zod validation, field retention on error, ?service= param |
| Astro Server Action (`src/actions/index.ts`) | ✅ | Resend batch.send with notification + auto-reply |
| React Email templates | ✅ | ContactNotification.tsx + ContactAutoReply.tsx |
| Thank-you page | ✅ | Confirmation + CTAs |
| Contact info sidebar | ✅ | Address, phone, email, hours, WhatsApp CTA |
| Google Maps embed | ✅ | |
| FAQ accordion (5 questions) | ✅ | |
| Privacy policy page | ✅ | Full POPIA-compliant document |
| **Resend domain verification** | ❌ Not done | Domain `info.phehlwanagroup.co.za` must be verified |
| **RESEND_API_KEY** | ❌ Not set | No key in `.env` |
| **FROM_EMAIL / TO_EMAIL** | ❌ Not set | Uses defaults in code |

---

## Phase 7 — SEO & Analytics
**Status: ✅ Complete**

| Item | Status | Notes |
|------|--------|-------|
| Page titles & meta descriptions | ✅ Set on all pages | |
| `@astrojs/sitemap` installed | ✅ | Auto-generates on build |
| `robots.txt` | ✅ Created | |
| `@vercel/analytics` | ✅ Installed | |
| Open Graph tags (og:title, og:description, og:image, og:type, og:url, og:locale) | ✅ Added to Layout.astro | Social sharing previews now work |
| Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) | ✅ Added to Layout.astro | `summary_large_image` card |
| JSON-LD LocalBusiness schema | ✅ Added to Layout.astro | Full business details: address, phone, email, hours, VAT, founding date |
| JSON-LD WebSite schema | ✅ Added to Layout.astro | |
| Google Analytics 4 (GA4) | ✅ Installed (env-gated) | gtag.js via `PUBLIC_GA4_ID` env var; silent when unset |
| GA4 event tracking | ✅ Implemented | Phone clicks, email clicks, WhatsApp clicks, CTA clicks (data-track), form submissions |
| Canonical tags | ✅ Added to Layout.astro | Auto-generated from `Astro.url.pathname` |
| Google Search Console | ❌ Still pending | Needs site verification after Vercel deploy |
| OG image (1200×630px) | ⚠️ Uses logo fallback | Add dedicated branded OG image for better previews |
| Article JSON-LD (per blog post) | 🟡 Not implemented | Would improve blog search snippets |

---

## Phase 8 — Performance & Accessibility
**Status: ✅ Complete**

| Item | Status | Notes |
|------|--------|-------|
| Lighthouse audit | ✅ Run (local preview) | Report saved to `08-lighthouse-audit.md` |
| WebP image conversion | ✅ Done — 19 images converted | Sharp at quality 80; hero 89% smaller (2.7 MB → 292 KB) |
| Hero image preload | ✅ Added | `<link rel="preload">` with `fetchpriority="high"` for both WebP + PNG |
| Picture component | ✅ Created (`Picture.astro`) | Auto-serves WebP with original format fallback |
| Picture component usage | ✅ Across 8+ page templates | Home (hero, about, services, projects), About, Services page, Blog (list + detail), Projects (list + detail) |
| Font optimization | ✅ `display=swap` + preconnect | Inter + Outfit with preconnect hints |
| `loading="lazy"` on images | ✅ Verified | Hero slide 1 uses `eager`, all others use `lazy` |
| `width`/`height` on images | ✅ Verified | All images have explicit dimensions |
| Build profile | ✅ 13 MB total, ~15s build, 22 static pages | 1 JS chunk (~194 KB) + animations.js (567 B) |
| Console errors | ⚠️ 1 (local preview only) | Vercel Analytics CDN unavailable locally — harmless in production |

### Performance Data (WebP Savings)
| Image | Original | WebP | Saving |
|-------|:--------:|:----:|:------:|
| Hero carousel-2.png | 2,705,941 B | 292,158 B | **89%** |
| Service construction.png | 280,024 B | 23,404 B | **91%** |
| About site.jpg | 99,927 B | 36,364 B | **63%** |

---

## Phase 9 — Pre-Launch & Go Live
**Status: ❌ Not Started**

| Item | Status | Notes |
|------|--------|-------|
| Vercel project connected | ❌ Not done | |
| Custom domain DNS | ❌ Not configured | |
| Environment variables in Vercel | ❌ Not set | |
| Post-deploy verification | ❌ Not done | |
| Client handover | ❌ Not done | |

---

## Summary Table

| Phase | Name | Status | Completion % |
|-------|------|--------|:------------:|
| 0 | Foundation & Config | ✅ Complete | 100% |
| 1 | Shared Layout & Navigation | ✅ Complete | 100% |
| 2 | Home Page | ⏳ Built — needs content | 85% |
| 3 | About Page | ⏳ Built — needs content | 85% |
| 4 | Services Pages | ✅ Built | 95% |
| 5 | Projects Portfolio | ✅ Functional | 80% |
| 6 | Contact & Email | ⏳ Built — blocked on Resend | 90% |
| 7 | SEO & Analytics | ✅ Complete | 100% |
| 8 | Performance & Accessibility | ✅ Complete | 100% |
| 9 | Pre-Launch & Go Live | ❌ Not started | 0% |
| | **Overall** | | **~80%** |
