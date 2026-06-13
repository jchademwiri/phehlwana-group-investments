# Pages Audit — Page-by-Page Route Analysis

> All routes, current status, and what's needed to complete each.

---

## Route Inventory

| # | Route | Type | Status | SSR? |
|---|-------|------|--------|:----:|
| 1 | `/` | Home | ⏳ Awaiting client content | Static |
| 2 | `/about` | About | ⏳ Awaiting client content | Static |
| 3 | `/services` | Services Overview | ✅ Complete | Static |
| 4 | `/services/construction` | Construction | ✅ Complete | Static |
| 5 | `/services/mechanical` | Mechanical Eng | ✅ Complete | Static |
| 6 | `/services/cleaning` | Cleaning & Waste | ✅ Complete | Static |
| 7 | `/services/plant-hire` | Plant Hire | ✅ Complete | Static |
| 8 | `/services/security` | Security | ✅ Complete | Static |
| 9 | `/projects` | Projects Portfolio | ✅ Complete | Static |
| 10 | `/projects/[id]` | Project Detail | ✅ Complete | Static |
| 11 | `/blog` | Blog Listing | ✅ Complete | Static |
| 12 | `/blog/[id]` | Blog Post | ✅ Complete | Static |
| 13 | `/contact` | Contact | ✅ Complete | **SSR** |
| 14 | `/thank-you` | Thank You | ✅ Complete | Static |
| 15 | `/privacy-policy` | Privacy Policy | ✅ Complete | Static |
| 16 | `/404` | 404 Not Found | ✅ Complete | Static |

---

## Page Details

### 1. Home `/`
**Status: 🟡 Built — needs real images + client copy**

| Aspect | Assessment |
|--------|------------|
| Hero | 3 slides, auto-rotating, good CTAs (View Our Projects / Our Services). Uses old-site placeholder images. |
| Stats Bar | Shows correct confirmed stats: Level 1 BBBEE, 4CE/5GB CIDB, 10+ Years, National |
| About Snapshot | Well-written, no lorem ipsum. Values displayed. CTA to /about. |
| Services Grid | All 5 services. Good card design with hover effects. Security image now exists. |
| Trust Strip | 5 trust items. Good. Overlapping with Stats Bar — consider merging or differentiating. |
| Trusted Clients | City of Tshwane, Sanparks, AgriSkills, JB Levelling, Magalies Water, Civicon — good B2B trust signal. |
| Featured Projects | Pulls from content collection (featured: true). Falls back nicely if none. |

**Issues:**
- Hero images are old-site placeholders (carousel-2.png, project photos used as hero)
- About image is old-site placeholder (about-site.jpg)
- No video, no parallax, no real photography
- "Building South Africa Since 2015" doesn't mention 2020 re-registration

---

### 2. About `/about`
**Status: 🟡 Built — comprehensive but needs client data**

| Aspect | Assessment |
|--------|------------|
| PageHeader | Good — breadcrumbs, label, title, subtitle |
| Company Overview | Well-written. Mentions 2015 founding + 2020 re-registration. |
| Vision & Mission | Good — expanded from original single-liners |
| Values | 6 values with descriptions. Good. |
| Our Story | Full narrative — founding, expansion, current state |
| Stats Bar | Correct confirmed stats |
| Why Choose Us | 8 differentiators |
| Accreditations | CIDB, BBBEE, OHS, VAT, NHBRC — all displayed with checkmarks. **CIDB reg number shows "Pending"** |
| Team | Nicholas Mahlangu (CEO) + Sbusiso Mashilwane (Coming Soon). Both use placeholder headshots. |
| Trusted Clients | 6 named clients |

**Issues:**
- No real team headshots
- Sbusiso Mashilwane shows "Coming Soon" for role/title
- CIDB registration number placeholder shows "Pending"
- No BBBEE certificate download link
- No company profile PDF download

---

### 3. Services Overview `/services`
**Status: ✅ Complete**

Well-built overview with 5-card grid, "How We Work" 5-step process, and safety commitment section. Breadcrumbs present.

**Minor issue:** Intro copy mentions "50+ skilled professionals" — should be "10 full-time professionals" per client confirmation.

---

### 4-8. Individual Service Pages
**Status: ✅ Complete**

| Page | Sub-services | Notes |
|------|:-----------:|-------|
| Construction | 14 | Detailed across 2 categories (General Building + Road/Safety) |
| Mechanical | 6 + industries | Well-detailed. "Mining support services" listed as tentative. |
| Cleaning | 10 | 5 cleaning + 5 waste management. NEM:WA compliance noted. |
| Plant Hire | 8 equipment types | Includes **Grader** (client confirmed). Wet/dry hire explained. |
| Security | 6 sub-services | PSIRA compliance noted. PSIRA reg number placeholder. |

**Issues across all service pages:**
- All 5 service images are old-site placeholders
- Geographic references still say "Pretoria and Gauteng" in meta descriptions — should be "nationally" in many places
- Security page uses `/images/placeholder.svg` (but `service-security.png` exists in file tree — check if it's real)

---

### 9-10. Projects `/projects` + `/projects/[id]`
**Status: ✅ Complete — needs more real projects**

| Aspect | Assessment |
|--------|------------|
| Category filter | Good — 6 categories with JS filter |
| Featured-first sort | Good |
| Detail page | Image gallery with thumbnail strip, sticky sidebar, CTA card |
| 9 real project photos | Available |
| 4 published projects | Construction, Road, Cleaning, Plant Hire |

**Issues:**
- No projects for Mechanical or Security categories
- Only 4 projects (client asked for 5-10)
- All project descriptions are placeholder content — needs real client details
- Project photos exist (9 images) but may not be real company photos

---

### 11-12. Blog `/blog` + `/blog/[id]`
**Status: ✅ Complete**

| Aspect | Assessment |
|--------|------------|
| 4 published posts | Good, well-written content |
| Card grid design | Good with tags, date, description |
| Detail page | TOC sidebar, reading time, copy link |
| SVG cover images | 4 branded SVGs created |

**Issues:**
- SVG covers are branded placeholders — need real photography
- Blog titles don't mention "Phehlwana Group" in H1 (good for SEO — unique)
- No author profile/bio shown on detail pages

---

### 13. Contact `/contact`
**Status: ✅ Complete (blocked on Resend)**

Full-featured contact page:
- Zod-validated form with inline errors
- `?service=` URL param pre-fills dropdown
- Resend email action (notification + auto-reply)
- Contact info sidebar, WhatsApp CTA, Google Maps, FAQ accordion

**Issues:**
- Resend domain not verified — emails won't send
- FAQ item "Do you work outside of Pretoria?" still says "Gauteng and beyond" — should be "nationally"
- Business hours only show Mon-Fri — Sat/Sun not included

---

### 14. Thank You `/thank-you`
**Status: ✅ Complete**

Simple, clean confirmation page with CTAs. Uses emoji checkmark — consider replacing with SVG icon for cross-platform consistency.

---

### 15. Privacy Policy `/privacy-policy`
**Status: ✅ Complete**

Comprehensive POPIA-compliant privacy policy. Well-written. Lists Vercel and Resend as data processors.

---

### 16. 404 `/404`
**Status: ✅ Complete**

Beautiful, branded 404 page with grid background, search icon, animated pulse dot, and clear CTAs. HelpfulLinks component is commented out.

---

## Missing Routes

| Route | Should Exist? | Notes |
|-------|:-------------:|-------|
| `/team` | ⏳ Optional | Content exists in `docs/content/team.md` but no page built. Team is shown on About page instead. |
| `/faq` | ⏳ Optional | Content exists in `docs/content/faq.md`. FAQ is on Contact page instead. Consider dedicated page. |
| `/services/cleaning#waste` | ⚠️ No anchor system | Service pages have no ID anchors for deep linking |
