# Implementation Plan — Closing Out the Audit Findings

> **Date:** 2026-07-27
> **Based on:** `00-overview.md`'s "Master Issue List by Priority" and "Client-Dependent Checklist", as of the fixes already applied and pushed to `dev` (commits `c9ea748`..`a2f9634`).

This plan covers everything still open. It's split into three phases by who can actually do the work — that's the real bottleneck, not difficulty. Phase 1 is mine to execute on request. Phase 2 needs you or the client. Phase 3 needs both, in order.

---

## Phase 1 — Remaining Code-Only Work

No client input needed. I can execute any/all of these on request. Ordered by value.

### 1.1 Dedicated 1200×630 OG image
**Why:** Home/About/Services currently use real photos as `og:image` (a stopgap I added) — better than the logo fallback, but not cropped/composed for a social card.
**Approach:** Build one SVG-based branded OG image (logo + tagline + brand colour background, 1200×630) reused site-wide as the default `og:image` fallback in `Layout.astro`, similar in spirit to the branded blog cover SVGs already in `public/images/blog/`. Keep per-page images (blog posts, projects) as-is since those are already correctly page-specific.
**Effort:** ~20 min. **Files:** new `public/images/og-default.png` (rendered from SVG or hand-built), `src/layouts/Layout.astro` (swap `defaultOgImage`).

### 1.2 Responsive `srcset`/`sizes` in `Picture.astro`
**Why:** Currently serves one fixed image size to every viewport — mobile downloads the same bytes as desktop.
**Approach:** Extend `Picture.astro` to accept a `widths` prop (default e.g. `[400, 800, 1280]`), generate `srcset` for both the WebP `<source>` and the fallback `<img>`, and set `sizes` based on typical container width per usage site. This requires resizing the existing source images at build time or pre-generating extra sizes — since there's no on-demand image pipeline wired in (confirmed: `astro:assets` isn't used), the simplest path is a one-time `sharp` script (already a devDependency) that generates the extra widths into `public/images/`, then updating `Picture.astro` to reference them.
**Effort:** ~45–60 min (script + component + spot-check on 3–4 pages). **Files:** new `scripts/generate-responsive-images.mjs`, `src/components/shared/Picture.astro`.

### 1.3 Self-host Google Fonts
**Why:** Removes a third-party request (fonts.googleapis.com) on every page load — faster, and one less external dependency under POPIA.
**Approach:** Download the exact Inter + Outfit weights currently requested, place as `.woff2` in `public/fonts/`, add `@font-face` rules to `starwind.css` with `font-display: swap`, remove the Google Fonts `<link>` tags from `Layout.astro`.
**Effort:** ~20 min. **Files:** `public/fonts/*.woff2` (new), `src/styles/starwind.css`, `src/layouts/Layout.astro`.

### 1.4 Terms of Service page
**Why:** Only a Privacy Policy exists today. Flagged as a low-priority gap.
**Approach:** Draft a standard ToS (acceptable use, no-warranty disclaimer for site content, governing law = South Africa) mirroring the structure/tone of the existing `privacy-policy.astro`. **Caveat:** this is legal content — I'll draft it, but flag clearly that it should get a quick read from whoever normally reviews the Privacy Policy before it goes live, same as any legal page.
**Effort:** ~20 min. **Files:** new `src/pages/terms-of-service.astro`, add link in `Footer.astro`.

### 1.5 Weekend/holiday hours — placeholder only
**Why:** Contact page currently only shows Mon–Fri. Client hasn't confirmed weekend hours yet (Phase 2 item), but I can make the copy explicitly say "Closed Saturdays, Sundays & public holidays" now instead of silently omitting it, so it reads as a deliberate statement rather than a gap — swap to real hours once confirmed.
**Effort:** ~5 min. **Files:** `src/pages/contact.astro`.

**Total Phase 1 effort: roughly 2–2.5 hours if I do all five in one pass.**

---

## Phase 2 — Client Input Required

Nothing here is code work — it's collecting information/assets so Phase 1's siblings (photography, credentials, copy) can go in. Ordered by what unblocks the most:

| # | Item | Unblocks |
|---|------|----------|
| 1 | Resend account + domain DNS verification (DKIM/SPF/DMARC) + API key | Contact form can send email at all — the single biggest launch blocker |
| 2 | Hero photography (≥2, 1920×800) + service photography (5, 800×500) | Home, Services, all 5 service pages stop showing placeholders |
| 3 | Team headshots + bios (Nicholas Mahlangu expansion, Sbusiso Mashilwane role+bio+photo) | About page team section |
| 4 | CIDB reg. number, BBBEE/ISO 45001/NHBRC certs + numbers, PSIRA number | About page accreditations, Security page compliance note |
| 5 | 5–10 real project write-ups, especially Mechanical + Security (schema now supports both categories) | Projects portfolio credibility, fills two empty categories |
| 6 | Social media URLs (Facebook/Instagram/LinkedIn) | Currently commented out in Header/Footer — quick to re-enable once provided |
| 7 | GA4 Measurement ID | Analytics goes live (code is already correct and consent-gated, just needs the ID) |
| 8 | Brand colour hex codes, final logo files (colour/white/SVG) | Cosmetic polish, not launch-blocking |
| 9 | Client testimonials (2–3 quotes) | About/Home social proof |
| 10 | Weekend/holiday hours, public liability insurance details, plant hire specs/rates | Contact page FAQ completeness |

None of this requires me — it's emails/calls/a photoshoot on your side. I can turn around each item quickly once it arrives (most are single-file swaps given the schema/layout support is already built).

---

## Phase 3 — Deployment & Go-Live

Needs Phase 2 item #1 (Resend) at minimum before it's worth doing for real, but the Vercel project itself can be set up in parallel.

1. **Create Vercel project**, connect the GitHub repo, set build command `bun run build` / install command `bun install`.
2. **Set environment variables** in Vercel: `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `PUBLIC_GA4_ID` (once available), `PUBLIC_SITE_URL`.
3. **Point the domain** `phehlwanagroup.co.za` at Vercel (DNS).
4. **Verify Resend's sending domain** against the live site (DNS records propagate faster once the domain is actually pointed somewhere).
5. **Send a real test enquiry** through the live contact form end-to-end — confirm both the internal notification and the customer auto-reply arrive.
6. **Verify Google Search Console**, submit the sitemap (`/sitemap-index.xml`), confirm indexing starts.
7. **Merge `dev` → `master`** (per your plan — `master` currently still has the old "Coming Soon" placeholder, 5 commits behind).
8. **Final smoke test** on the live URL: mobile responsiveness, contact form, all nav links, dark/light theme toggle.

---

## Suggested Sequencing

```
Now:        Phase 1 (all 5 items) ── can start immediately, no blockers
Parallel:   Phase 2, item 1 (Resend) ── start today, DNS propagation takes time
Parallel:   Phase 2, items 2–10 ── gather at your own pace
When ready: Phase 3, steps 1–3 (Vercel + domain) ── as soon as you want a live URL
Then:       Phase 3, steps 4–6 ── once Resend + domain are both live
Finally:    Phase 3, steps 7–8 ── merge to master, go live
```

Realistically: Phase 1 is an afternoon of my time whenever you say go. Phase 2 is the long pole — it's waiting on the client, not on code. Phase 3 is a day of ops work once Phase 2's critical items (Resend, at minimum) land.

---

## What This Plan Does Not Cover

Anything already fixed and verified in the previous audit passes (see `00-overview.md`'s "Fixes Applied" sections) — this plan is scoped to what's still open as of 2026-07-27.
