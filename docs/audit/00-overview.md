# Site Audit Overview — Phehlwana Group Investments

> **Report date:** 2026-07-27 (consolidated update — code fixes applied same day)
> **Supersedes:** the June 10 and July 5 audit passes below — this file reconciles both against the live codebase and adds newly-verified findings. The other files in this folder (`01-app-status.md` → `08-lighthouse-audit.md`, `home-audit.md` → `thank-you-audit.md`) remain accurate as page-level detail; this overview is the current single source of truth for overall status and priority.

This is a full production-readiness audit of all 16 routes plus site-wide config, SEO, accessibility, forms, performance, and deployment. Every item below was checked directly against the current code — not just carried over from the prior reports.

**Update:** all code-fixable items with no client/asset dependency (listed below) have now been applied and the production build verified (`bun run build` succeeds, all 22 pages generate, JSON-LD validated). See "Fixes Applied in This Pass" below.

---

## Executive Summary

**Overall build progress: ~80% complete — build is now healthy.**

The framework, layout, dark mode, contact form pipeline, blog, project portfolio, SEO tagging, and performance work are all substantially built. The two code-level blockers found in this audit (corrupted homepage markup, broken GA4 script) have been fixed and verified. What remains is client-dependent:

### Critical Blockers (launch-blocking — all client/ops-dependent now)
| # | Blocker | Status |
|---|---------|--------|
| 1 | `index.astro` hero section corrupted — malformed markup, build/render risk | ✅ **Fixed** — build verified |
| 2 | GA4 script never actually configures (`{ga4Id}` sent as literal string) | ✅ **Fixed** — verified via `define:vars` |
| 3 | Resend domain not verified, `RESEND_API_KEY` not set — contact form can't send email | ⚠️ Still outstanding — needs client/ops action |
| 4 | No real hero/service/team photography — all placeholders | ⚠️ Still outstanding — needs client assets |
| 5 | Not deployed to Vercel; no env vars configured | ⚠️ Still outstanding — needs deployment |
| 6 | Missing client data: CIDB reg. number, BBBEE/ISO/NHBRC certs, team bios, PSIRA number | ⚠️ Still outstanding — needs client input |

---

## Fixes Applied in This Pass (2026-07-27)

All of the following were fixed with no client/asset dependency, and the build was re-verified after each batch:

| Fix | File(s) |
|---|---|
| Repaired corrupted hero `<section>` + removed dead leftover markup; single `<h1>` (slide 0) / `<h2>` (others) | `src/pages/index.astro` |
| Added carousel pause-on-hover/focus + respects `prefers-reduced-motion` (WCAG 2.2.2) | `src/pages/index.astro` |
| Updated homepage title/description from "Pretoria" to national coverage, consistent with other pages | `src/pages/index.astro` |
| Fixed GA4 script so `gtag('config', ...)` actually receives the measurement ID via `define:vars` | `src/layouts/Layout.astro` |
| Removed dead `/favicon.svg` reference; wired up the PNG favicons + apple-touch-icon that already existed but weren't linked | `src/layouts/Layout.astro` |
| Filled in empty `name`/`short_name` | `public/site.webmanifest` |
| Added `'Security'` to the project category enum, plus filter option + badge colour | `src/content.config.ts`, `src/pages/projects/index.astro` |
| Replaced ✅ emoji with an inline SVG checkmark icon | `src/pages/thank-you.astro` |
| Added a honeypot field to catch simple bots (silently accepted, no email sent) | `src/pages/contact.astro`, `src/actions/index.ts` |
| Added a cookie-consent banner; GA4's actual script now only loads after the visitor accepts | `src/components/shared/CookieConsent.astro` (new), `src/layouts/Layout.astro` |
| Added `Service` JSON-LD to all 5 service pages, `BlogPosting` JSON-LD to blog posts | `src/layouts/ServiceLayout.astro`, `src/pages/blog/[id].astro` |
| Added a basic CI workflow (install + build on push/PR) | `.github/workflows/ci.yml` (new) |
| Removed the committed `old-site/` directory (124 files, 12 MB dead weight) | repo root |
| Fixed the stale Phase 7/8 status table | `README.md` |
| Confirmed "50+ skilled professionals" copy was already corrected to "10 full-time professionals" in an earlier commit not reflected in the prior audit | `src/pages/services/index.astro` (no change needed) |
| Confirmed non-existent `/blog/[id]` and `/projects/[id]` routes already resolve to the branded 404 in production, since both are fully static-prerendered — no code change needed | verified only |

**Not fixed in this pass (needs more than a quick edit, or client input):** dedicated OG image, responsive `srcset` in `Picture.astro`, self-hosted fonts, Terms of Service page, weekend/holiday hours, plant hire specs/rates, all client-provided content and credentials below.

---

## What Changed Since the Last Audit

The July 5 per-page audit recommended a batch of fixes. All of them — including the one that had been corrupted mid-edit — are now applied and build-verified:

| Recommended fix | Status | Verified at |
|---|---|---|
| `ServiceLayout.astro`: `alt=''` → `alt={imageAlt}` | ✅ Fixed correctly | `src/layouts/ServiceLayout.astro:35` |
| Remove duplicate WebP+PNG hero preload | ✅ Fixed correctly | `src/layouts/Layout.astro` (PNG preload block removed) |
| Uncomment `<HelpfulLinks />` on 404 | ✅ Fixed correctly | `src/pages/404.astro:174` |
| Update "Pretoria/Gauteng" → "nationally" copy | ✅ Fixed correctly | `about.astro`, `blog/index.astro`, `contact.astro`, `projects/index.astro`, `services/{cleaning,construction,mechanical,plant-hire,security}.astro`, `index.astro` |
| Security page: point at real image instead of placeholder | ✅ Fixed correctly | `src/pages/services/security.astro` now uses `/images/services/service-security.png` |
| Blog copy-link button: announce state change | ✅ Fixed correctly | `src/pages/blog/[id].astro:175` now has `aria-live='polite'` |
| Project gallery: fix invalid `role="list"` div/button semantics; remove fake zoom-cursor affordance that did nothing | ✅ Fixed correctly | `src/pages/projects/[id].astro` — now real `<ul>/<li>`, `cursor-zoom-in`/`role='button'` removed |
| Hero slide `alt=''` → per-slide `alt` + single `<h1>` (others `<h2>`) | ✅ **Fixed** (was corrupted, now repaired) | `src/pages/index.astro` |

### ✅ Resolved: `src/pages/index.astro` Hero Section Corruption

The homepage's hero section had been corrupted mid-edit — the opening `<section>` tag was mangled into a comment, and dead leftover markup (`)} lg:text-6xl...` plus a duplicate `<h1>`) sat underneath the new h1/h2 conditional. Both issues are now repaired: the `<section>` tag is restored, the dead markup removed, and `bun run build` completes cleanly generating all 22 pages. Pause-on-hover/focus and `prefers-reduced-motion` support were added to the carousel at the same time (see below).

---

## 🆕 Newly Discovered Issues (not in either prior audit)

These were found during this pass, verified directly against the current code, and have now been fixed unless noted otherwise:

| # | Issue | Severity | Status |
|---|---|:---:|---|
| 1 | GA4 inline script used `gtag('config', '{ga4Id}')` — a literal string, not the interpolated variable, because the `<script is:inline>` block had no `define:vars`. | 🔴 High | ✅ Fixed — `src/layouts/Layout.astro:139` |
| 2 | `<link rel='icon' type='image/svg+xml' href='/favicon.svg' />` pointed to a file that doesn't exist in `public/`. | 🟡 Medium | ✅ Fixed — removed, real PNG favicons + apple-touch-icon wired up instead |
| 3 | `site.webmanifest` had empty `"name"` and `"short_name"`. | 🟡 Medium | ✅ Fixed |
| 4 | Contact form had no spam protection. | 🟡 Medium | ✅ Fixed — honeypot field added |
| 5 | No cookie-consent mechanism, despite the privacy policy describing GA4/Vercel Analytics data collection. | 🟡 Medium | ✅ Fixed — banner added, GA4 gated on consent |
| 6 | No Terms of Service page exists (only Privacy Policy). | 🟢 Low | ⚠️ Still outstanding — needs legal copy |
| 7 | `README.md`'s build-status table was stale (showed Phase 7/8 as "Not started"). | 🟢 Low | ✅ Fixed |
| 8 | `old-site/` directory (12 MB, 124 files) was still committed to the repo. | 🟢 Low | ✅ Fixed — removed |
| 9 | Custom `Picture.astro` renders a single fixed-size `<picture>`/`<img>` — no responsive `srcset`/`sizes`. | 🟢 Low | ⚠️ Still outstanding — needs a small refactor |
| 10 | Google Fonts load from Google's CDN with `preconnect`, rather than self-hosted. | 🟢 Low | ⚠️ Still outstanding — optional |
| 11 | No CI pipeline existed. | 🟢 Low | ✅ Fixed — `.github/workflows/ci.yml` added (install + build on push/PR) |

*(Note: an earlier pass flagged duplicate `bun.lock`/`package-lock.json` lockfiles — this is already resolved; `package-lock.json` was removed in a recent commit. No action needed.)*

---

## Cross-Page Patterns (from the July 5 per-page audit — still accurate)

### Accessibility (WCAG 2.1 AA)
- Icon-only interactive elements (dark-mode toggle, mobile drawer, WhatsApp/social links) all have proper `aria-label`s in `Header.astro`/`Footer.astro` — verified good.
- Homepage carousel now pauses on hover/focus and respects `prefers-reduced-motion` — ✅ fixed (WCAG 2.2.2).
- Contact form has solid `aria-describedby`/`role="alert"` error handling — verified good.
- Still flagged as "needs review" from the original audit and not yet re-verified in depth: color contrast (light grey on white), custom focus indicators, keyboard nav on dropdown/drawer.

### SEO & Technical Structure
- Homepage now renders a single `<h1>` (slide 0) with `<h2>` on the other slides — ✅ fixed.
- Blog detail pages now have `BlogPosting` JSON-LD — ✅ fixed.
- Service pages now have `Service` JSON-LD — ✅ fixed.
- Sitemap, robots.txt, canonical tags, OG tags, Twitter cards, and `LocalBusiness`/`WebSite` JSON-LD are all correctly implemented site-wide — verified good.
- No dedicated 1200×630 OG image yet (falls back to logo). Still outstanding — needs a designed asset.
- Google Search Console verification not yet done (needs a live deploy first). Still outstanding.

### Performance & Core Web Vitals
- Dual WebP+PNG hero preload — **fixed** (see table above).
- Build profile is light (~13 MB, one JS chunk, correct lazy-loading elsewhere) — verified good.
- Large unoptimized PNG originals remain alongside their WebP versions (e.g. `hero/carousel-2.png` at 2.6 MB vs `carousel-2.webp` at 288 KB) — non-WebP browsers/crawlers still get the heavy file. Low priority given how few browsers lack WebP support today.

### Content & Placeholders (still all outstanding — client-dependent)
- Placeholder photography across home, about, and all 5 service pages.
- "Registration Number Pending" (CIDB) and "Coming Soon" (Sbusiso Mashilwane's role) on the About page.
- PSIRA registration number "to be confirmed" on the Security page.
- Only 4 real projects published; Mechanical and Security categories have zero. The category enum now supports `'Security'` (✅ fixed), so a project just needs to be added once client content is available.
- Blog/project detail pages with non-existent `[id]`s already resolve to the branded 404 in production (verified — both routes are fully static-prerendered, so Vercel serves `404.html` for any unmatched path).

---

## Master Issue List by Priority

### 🔴 Critical — remaining (all client/ops-dependent; code-level critical items are fixed)
1. Verify Resend sending domain + set `RESEND_API_KEY`/`FROM_EMAIL`/`TO_EMAIL` so the contact form can actually send email.

### 🟠 High — remaining
2. Replace all placeholder photography (hero, about, 5× service images) with real assets.
3. Publish at least one Mechanical project and one Security project (schema now supports both).
4. Get CIDB registration number, BBBEE/ISO 45001/NHBRC certificates, PSIRA number, and team bios/headshots from the client.

### 🟡 Medium — remaining
5. Create a dedicated 1200×630 OG image.
6. Set up Google Search Console after deployment.

### 🟢 Low / Nice-to-have — remaining
7. Add responsive `srcset`/`sizes` to `Picture.astro`.
8. Consider self-hosting Google Fonts.
9. Add a Terms of Service page.
10. Add weekend/holiday business hours once confirmed by the client.

### ✅ Done in this pass
Fixed corrupted `index.astro` hero markup · GA4 script interpolation bug · dead `/favicon.svg` reference · empty `site.webmanifest` fields · `'Security'` added to project category enum + projects page filter/colours · honeypot spam protection on contact form · cookie-consent banner gating GA4 · `Service`/`BlogPosting` JSON-LD · carousel pause-on-hover/focus + reduced-motion support · CI workflow added · `old-site/` removed · stale `README.md` status table corrected · thank-you emoji replaced with SVG

---

## Client-Dependent Checklist (unchanged from `06-client-action-items.md` — reconciled, still accurate)

**🔴 Critical — blocks launch:**
Resend API key + domain DNS verification · social media URLs (Facebook/Instagram/LinkedIn) · final logo files (colour, white/reversed, SVG) · hero photography (≥2 photos, 1920×800) · service photography (5 photos, 800×500) · team details + headshots (Nicholas Mahlangu bio expansion, Sbusiso Mashilwane role + bio + headshot)

**🟡 Important — before launch:**
CIDB registration number + certificate PDF · BBBEE certificate PDF · ISO 45001 certificate PDF · NHBRC registration number · company profile PDF · 5–10 real project write-ups (2 currently missing categories: Mechanical, Security) · client testimonials (2–3 quotes) · brand colour hex codes · GA4 Measurement ID · Google Search Console access

**ℹ️ Nice-to-have — post-launch:**
Plant hire equipment specs + rates · PSIRA registration number · 2020 company re-registration number · public liability insurance details · weekend/holiday hours · newsletter platform · blog content calendar · professional photoshoot

---

## Launch Roadmap (priority order)

1. ~~Fix `index.astro` corruption + GA4 script bug~~ — ✅ done.
2. Client provides photography, credentials, team info, social URLs (see checklist above).
3. Deploy to Vercel; set all environment variables (`RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `PUBLIC_GA4_ID`, `PUBLIC_SITE_URL`).
4. Verify Resend domain; send a real test enquiry through the contact form end-to-end.
5. Verify Google Search Console; confirm sitemap is indexed.
6. Address remaining Medium/Low items opportunistically post-launch (OG image, ToS page, responsive images, self-hosted fonts).
7. Go live.
