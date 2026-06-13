# Codebase Observations — Quality Notes, Issues & Recommendations

---

## Strengths

| Area | Observation |
|------|------------|
| **Architecture** | Clean Astro v6 setup with `output: 'static'` + SSR opt-in. Good use of content collections. |
| **Navigation** | Single source of truth in `src/data/navigation.ts` — excellent pattern. Header, Footer, and sitemap all derive from one file. |
| **Dark Mode** | Well-implemented with `localStorage` persistence, system preference detection, and `astro:after-swap` listener. No FOUC. |
| **Components** | Good separation of concerns — shared components, section components, starwind components. |
| **Form Validation** | Zod schemas in `src/actions/index.ts` with field-level error handling and value preservation on re-render. |
| **Accessibility Basics** | Skip-to-content link, `aria-expanded`, `aria-controls`, `aria-describedby`, `role="alert"` on form errors. |
| **Email Templates** | React Email components with proper HTML structure, branding, and responsive design. |
| **Image Fallbacks** | Consistent `?? '/images/placeholder.svg'` pattern throughout. |
| **Security** | No hardcoded secrets, `.env` in `.gitignore`, CSP-friendly (no inline styles from templates). |

---

## Issues & Recommendations

### 🔴 High Priority

#### 1. Stale Stats Copy on Services Page
**File:** `src/pages/services/index.astro` (line ~37)
**Issue:** Intro copy says "a team of 50+ skilled professionals" — client confirmed 10 employees.
**Fix:** Change "50+ skilled professionals" to "10 full-time professionals".

#### 2. Stale Geographic References
**Files:** Multiple service pages (`construction.astro`, `mechanical.astro`, `cleaning.astro`, `plant-hire.astro`, `security.astro`), contact page FAQ, projects page, blog page
**Issue:** Meta descriptions and FAQ answers reference "Pretoria and Gauteng" — client confirmed service is **national**.
**Fix:** Update all geographic references to "nationally" or "across South Africa".

#### 3. About Section "50+ Skilled Professionals" (if present)
**Files:** Check all pages for this stat
**Issue:** Client confirmed 10 full-time employees.
**Fix:** Remove or correct to "10 Full-Time Professionals".

#### 4. No Security Category in Projects Schema
**Files:** `src/content.config.ts`
**Issue:** `category` enum only includes `'Construction' | 'Mechanical' | 'Cleaning' | 'Plant Hire' | 'Road'` — no `'Security'`. If client has security projects, they can't be added.
**Fix:** Add `'Security'` to the category enum.

---

### 🟡 Medium Priority

#### 5. Service Page Descriptions Mention "50+"
**File:** `src/pages/services/index.astro`
**Issue:** "With over a decade of experience and a team of 50+ skilled professionals" — should be 10.
**Fix:** Update to "10 full-time professionals" or "dedicated team of professionals".

#### 6. Contact Page FAQ Geographic Answer
**File:** `src/pages/contact.astro` (FAQ array)
**Issue:** "We serve clients across Gauteng and can accommodate projects in other provinces on request."
**Fix:** Change to "We provide our services nationally across South Africa."

#### 7. Missing Saturday/Sunday Hours on Contact Page
**File:** `src/pages/contact.astro`
**Issue:** Only shows "Mon – Fri: 07:30 – 17:00"
**Fix:** Add Saturday/Sunday lines once client confirms.

#### 8. Security Page Still Uses Placeholder Image
**File:** `src/pages/services/security.astro`
**Issue:** Uses `/images/placeholder.svg` even though `/images/services/service-security.png` exists in the file tree.
**Fix:** Check if `service-security.png` is a real image and update the reference.

#### 9. Privacy Policy Mentions Vercel + Resend as Data Processors
**File:** `src/pages/privacy-policy.astro`
**Issue:** Good that it mentions them, but should also mention Google Analytics (Phase 7) once GA4 is installed.
**Fix:** Update privacy policy after GA4 installation.

#### 10. No 404 Page for Blog/Project Non-Existent IDs
**Issue:** If someone visits `/projects/non-existent` or `/blog/non-existent`, Astro returns a generic 404. The custom 404 page is only for truly unmatched routes, not for content collections with no matching entry.
**Fix:** Add fallback logic in `[id].astro` pages to redirect to the custom 404 page.

#### 11. Hero Slide Images Mixed Sources
**Issue:** Hero slides use:
- Slide 1: `/images/hero/carousel-2.png` (old site placeholder)
- Slide 2: `/images/projects/project-04.jpeg` (project photo)
- Slide 3: `/images/projects/project-06.jpeg` (project photo)

These are inconsistent — hero images should be distinct from project portfolio images.

---

### 🟢 Low Priority / Nice-to-Have

#### 12. Emoji on Thank-You Page
**File:** `src/pages/thank-you.astro`
**Issue:** Uses emoji `✅` for the success icon — renders differently across platforms.
**Fix:** Replace with an SVG checkmark icon for consistency.

#### 13. Helpful Links Component Commented Out on 404
**File:** `src/pages/404.astro` (line ~145)
**Issue:** `<HelpfulLinks />` is commented out.
**Fix:** Either enable it or remove the commented code.

#### 14. No `loading="eager"` on Hero Images (except slide 1)
**Issue:** Hero slides 2 and 3 use `loading="lazy"` — but they're in a carousel and may be the first thing users see. Should preload all or use `loading="eager"` on the first.

#### 15. ServiceDivisions Items Array Removed
**File:** `src/data/navigation.ts`
**Issue:** The `ServiceDivision` interface previously had `items: ServiceItem[]` for sub-navigation. These were removed because service pages have no anchor IDs. Once service pages get real sectioned content with IDs, sub-items should be re-added to enable deep linking in the dropdown.

#### 16. No `/team` or `/faq` Pages
**Issue:** Content exists for both team and FAQ pages in `docs/content/` but routes don't exist. Team content is shown on the About page. FAQ is on the Contact page.
**Recommendation:** Consider adding dedicated pages if content grows beyond what fits inline.

#### 17. No Test Files
**Issue:** No test files exist in the project. While this is common for brochure sites, if contact form reliability is important, consider adding a test for the server action.

#### 18. `@astrojs/react` Dependency
**Issue:** React is only used for email template rendering (React Email). The entire UI layer is vanilla JS. If this ever causes build issues, consider whether Resend's plain HTML API could replace React Email.

---

## Bundle Analysis (Recommendation)

Before deployment, run:
```bash
bun run build
bunx astro build
```

Then check `dist/` for:
- CSS bundle size (Starwind + Tailwind should be small with purging)
- JS bundle size (should be minimal — no React in UI)
- Image sizes (all PNG/JPG — should convert to WebP)

---

## Summary of Code Actions Needed

| Priority | Action | Files Affected |
|:--------:|--------|:--------------:|
| 🔴 High | Fix "50+" to "10" employees | `src/pages/services/index.astro` |
| 🔴 High | Update geographic refs "Gauteng" → "national" | Multiple service pages, contact.astro, projects, blog |
| 🟡 Medium | Add 'Security' to project schema enum | `src/content.config.ts` |
| 🟡 Medium | Fix FAQ "Gauteng and beyond" → "nationally" | `src/pages/contact.astro` |
| 🟡 Medium | Check service-security.png authenticity | `src/pages/services/security.astro` |
| 🟡 Medium | Handle missing blog/project IDs → 404 | `src/pages/blog/[id].astro`, `src/pages/projects/[id].astro` |
| 🟢 Low | Replace emoji with SVG on thank-you | `src/pages/thank-you.astro` |
| 🟢 Low | Uncomment or remove HelpfulLinks on 404 | `src/pages/404.astro` |
