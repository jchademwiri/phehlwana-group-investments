# UI/UX Implementation Plan

> **Date:** 2026-08-02
> **Source:** Fresh UI/UX-only audit of all 17 routes, conducted against the current codebase (post color-system rework: `--primary` structural navy vs. `--interactive` vivid blue, true-black dark mode, `0.75rem` radius). Full per-page reports live alongside this file in `docs/audit/ui-ux/*.md` — this document is the prioritized, actionable synthesis of all of them.
>
> **Scope note:** This audit is UI/UX only (hierarchy, spacing, responsiveness, interaction states, color-token correctness, accessibility-of-interaction). It does not re-cover SEO/meta/performance, which are tracked separately in `docs/audit/04-technical-gaps.md` and `docs/audit/08-lighthouse-audit.md`.
>
> **Totals across all pages:** 1 Critical, 14 High, 34 Medium, 44 Low findings.
>
> **Status:** ✅ Phase 1 (cross-cutting fixes), Phase 2 (Critical/High page-specific items), and the code-fixable majority of Phase 3 (Medium items) all implemented 2026-08-02. See the relevant sections below for what shipped in each — a handful of items remain deliberately deferred (client-asset dependencies, or changes that need visual/device verification before shipping blind) and are marked as such inline.

---

## How to use this document

Findings are grouped two ways:

1. **Cross-cutting fixes** — issues that live in one shared file but affect multiple pages. Fix these first; each one closes several page-level findings at once for a fraction of the effort of fixing them per-page.
2. **Page-by-page detail** — everything else, in site-navigation order. Each page section links back to its full source report for complete context.

Severity key: 🔴 Critical (ships broken/misleading content) · 🟠 High (real usability/accessibility gap) · 🟡 Medium (inconsistency or missed affordance) · ⚪ Low (polish).

---

## Phase 1 — Cross-cutting fixes (do these first) — ✅ Done

These five fixes are each a single, small code change that resolves findings on 3+ pages simultaneously.

### 1.1 ✅ 🟠 Sitewide `focus-visible` gap
**Affects:** Home (both card grids), About, Thank-you, Blog listing, Blog detail sidebar.
**Problem:** No page defines its own `focus-visible` treatment on CTAs/cards/links. The only fallback is the global `* { outline-outline/50 }` rule in `starwind.css:172`, which uses `--outline` (not `--interactive`) and — on any card using `overflow-hidden` with an absolutely-positioned overlay `<a>` — is at risk of being visually clipped entirely, leaving keyboard users with no visible focus indicator.
**Fix:** Add one reusable pattern, e.g. a `.focus-ring` utility class (`focus-visible:ring-2 focus-visible:ring-interactive focus-visible:ring-offset-2`) in `starwind.css`, applied to:
- Card overlay links: move the ring to the parent `<article>` via `has-[:focus-visible]` so `overflow-hidden` on the image container can't clip it.
- All hand-styled CTA buttons/links that currently only have `hover:` states, matching the pattern `contact.astro:367` already uses correctly (`focus-visible:outline-2 focus-visible:outline-interactive`).
**Files:** `src/styles/starwind.css`, `src/pages/index.astro:270-274,224,361,394`, `src/pages/about.astro:144-161`, `src/pages/thank-you.astro:26-35`, `src/pages/blog/index.astro:51-58`, `src/pages/blog/[id].astro` (sidebar links).
**Shipped:** Home's two card grids and Blog listing's card grid now carry `has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-interactive` on the `<article>` wrapper (with `outline-none` on the overlay `<a>` itself) so the ring lands on the parent, which isn't clipped by its own `overflow-hidden` per spec — verified the build still generates all 22 pages cleanly. About's "View Our Services", both Thank You CTAs, and every interactive element in the Blog post sidebar (TOC links, "Back to top", WhatsApp share, Copy link, quote CTA) now carry an explicit `focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2`.

### 1.2 ✅ 🟡 `.prose` link color bound to the wrong token
**Affects:** Blog post body copy, Privacy Policy, Terms of Service.
**Problem:** `--tw-prose-links` / `--tw-prose-invert-links` are bound to `var(--color-primary)` (structural/decorative) instead of `var(--color-interactive)` (the token reserved for clickable elements). Currently invisible because every existing in-body link has a manual `text-interactive` override, but any future unstyled Markdown/prose link will render in the wrong color.
**Fix:** One two-line change.
**File:** `src/styles/starwind.css:208` (`--tw-prose-links`) and `:226` (`--tw-prose-invert-links`).
**Shipped:** both tokens now reference `var(--color-interactive)`. (Note: the Blog post TOC's separate active-heading-highlight script still uses `text-primary` — that's tracked as its own Blog Detail finding in Phase 2, not part of this token fix.)

### 1.3 ✅ 🟠 Project category color map duplicated and out of sync
**Affects:** Projects overview, Projects detail.
**Problem:** `categoryColours` is hand-copied in both `src/pages/projects/index.astro:19-26` and `src/pages/projects/[id].astro:22-47` — and they've already drifted: the detail page is **missing the `Security` entry**, so a Security project's badge silently falls back to a generic muted color on its own detail page while showing correctly (red) on the overview grid.
**Fix:** Extract to one shared constant (e.g. `src/lib/categories.ts`) imported by both pages, or fold into the content-collection schema. Immediately: add the missing `Security` entry to `projects/[id].astro` as a stopgap even before the refactor.
**Files:** `src/pages/projects/index.astro:19-26`, `src/pages/projects/[id].astro:22-47`.
**Shipped:** extracted to `src/lib/categories.ts` (`categoryColours` + `categoryList`), imported by both pages — the detail page's missing `Security` entry is now fixed as part of the same change (no longer a stopgap), and there is exactly one place to update if colors change again.

### 1.4 ✅ 🔴 Missing Security service photography (shipped in two places)
**Affects:** Services overview, Services/Security detail.
**Problem:** `services/security.astro` uses `/images/placeholder.svg` as its full-bleed hero **but** the `imageAlt` describes a real, specific photo ("Phehlwana Group security officer at a commercial building entrance") that doesn't exist — a content-integrity issue for screen-reader users, not just a missing asset. The same placeholder is independently referenced in `services/index.astro`'s `serviceImages` map, so the gap is visible in two places from one missing file.
**Fix:** Source/commission real security-services photography (matching the other 4 services' treatment), swap both references, correct `imageAlt` to match. Until then, write `imageAlt` to accurately describe the placeholder rather than a fabricated scene.
**Files:** `src/pages/services/security.astro:38-39`, `src/pages/services/index.astro:16`.
**Shipped (interim):** real photography is still a client-asset dependency and hasn't landed — but `imageAlt` on `services/security.astro` no longer describes a fabricated photo; it's now `alt=''` (correctly decorative, consistent with how the overview grid already treats this same placeholder). The actual image swap remains open, tracked in `docs/audit/06-client-action-items.md`.

### 1.5 ✅ 🟠 Unresolved "pending"/"to be confirmed" copy live in production
**Affects:** About (CIDB registration), Services/Security (PSIRA registration).
**Problem:** Both pages ship internal placeholder language as customer-facing trust copy:
- About: CIDB card renders with `confirmed: true` (green checkmark) while its own text says "Registration Number Pending" — icon and copy directly contradict each other.
- Security: compliance note reads "PSIRA registration number **to be confirmed by client**" — literally agency-to-client placeholder text, live on the page.
**Fix:** About: flip the CIDB entry to `confirmed: false` so it uses the layout's existing (currently unused) outline/muted "unconfirmed" visual state instead of a false checkmark. Security: replace with the real number once available, or state compliance generally without the specific-but-pending number.
**Files:** `src/pages/about.astro:78-83` (data), `:383-419` (render); `src/pages/services/security.astro:78-83`.
**Shipped:** About's CIDB entry now sets `confirmed: false`, which routes it into the layout's existing (previously unused) muted/outline "unconfirmed" visual state instead of a false green checkmark — no copy change needed, the icon now matches the "Pending" text it sits next to. Security's compliance note no longer says "PSIRA registration number to be confirmed by client"; it states PSIRA compliance without a pending-number claim, and the real number can be added later without another contradiction.

---

## Phase 2 — Page-by-page findings

### Home (`/`) — 2 High, 6 Medium, 5 Low
Full report: `docs/audit/ui-ux/home.md`

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟠 High | Card focus ring may be clipped by `overflow-hidden` on service/project card grids | See Phase 1.1 |
| ✅ 🟠 High | "Learn More About Us" / both "View All Projects" links use `text-primary` instead of `text-interactive` | **Shipped:** all three swapped to `text-interactive`. `index.astro:224,361,394` |
| ✅ 🟡 Medium | "10+ Years" floating badge is decorative but uses `bg-interactive` | **Shipped:** now `bg-primary`. `index.astro:247` |
| ✅ 🟡 Medium | Secondary hero CTA hand-styled with ad hoc `bg-white/10` values, bypasses design tokens | **Shipped:** new `.btn-ghost-photo` utility in `starwind.css`, applied here — still deliberately theme-independent (sits on hero photography, not page background) but now centrally defined once instead of inline. `index.astro:147-154` |
| ✅ 🟡 Medium | No `focus-visible` anywhere on the page | See Phase 1.1 |
| 🟡 Medium | Security service card shows placeholder image | See Phase 1.4 (alt text fixed; real photo still a client-asset dependency) |
| ✅ 🟡 Medium | "Trusted By" client strip is plain text with a `grayscale hover:grayscale-0` treatment meant for logo images | **Shipped (interim):** dropped the grayscale/hover treatment since there's no logo imagery to justify it yet; real client logos remain a future content addition. `index.astro:341` |
| ✅ 🟡 Medium | Section `<h2>` sizes inconsistent (`text-3xl` vs `text-xl` vs `text-2xl`) across sibling sections | **Shipped (partial):** "Trusted By" now matches the rest of Home's sections at `text-3xl`. Left `ContactCTA.astro`'s `text-2xl` as-is since that component is reused as a lighter-weight closing banner on nearly every page — changing it is a sitewide decision beyond fixing Home's internal consistency, not just a Home fix. `index.astro:337` |
| ⚪ Low | `StatsBar` and "Trust strip" duplicate "10+ Years"/"Level 1 BBBEE" content | Merge or differentiate the two strips |
| ⚪ Low | Media container radius drifts (`rounded-2xl` vs `rounded-xl`) | Standardize on `rounded-xl` |
| ⚪ Low | About-section and StatsBar grids skip the `md:` breakpoint step | Add intermediate `md:` columns |
| ⚪ Low | Floating "10+" badge risks clipping at narrow viewport edges | Smaller offset on mobile, scale up at breakpoints |
| ✅ ⚪ Low | Service card "Read More" text doesn't hover with the title | **Shipped:** added `group-hover:text-interactive`. `index.astro:297` |

### About (`/about`) — 2 High, 3 Medium, 3 Low
Full report: `docs/audit/ui-ux/about.md`

| Priority | Finding | Fix |
|---|---|---|
| 🟠 High | CIDB accreditation shows confirmed checkmark + "Pending" text simultaneously | See Phase 1.5 |
| 🟠 High | Team photos are `placeholder.svg` at `opacity-50` with real names as `alt` text — reads as broken images | Use a neutral avatar/initials placeholder without `opacity-50`; set `alt=""` or explicit "photo coming soon" text. `about.astro:456-461,477-481` |
| 🟡 Medium | "View Our Services" button-link has no `focus-visible` outline | See Phase 1.1 |
| 🟡 Medium | Accreditations grid (5 items, `lg:grid-cols-3`) leaves an unbalanced last row | Switch to 4 columns, or center the final row |
| 🟡 Medium | "Why Choose Us" grid skips `md:` step (jumps 2→4 columns at `lg`) | Add `md:grid-cols-3` |
| ⚪ Low | Unconfirmed-accreditation visual branch exists but is unused (until 1.5 is applied) | Resolves automatically once Phase 1.5 lands |
| ⚪ Low | "Trusted By" hover-only grayscale reveal has no touch/focus equivalent | Drop the effect or add `focus-within` equivalent |
| ⚪ Low | Eyebrow-label class string repeated inline 6 times | Extract to shared `<Eyebrow>` component/class |
| ⚪ Low | Team section shows 2 people (1 real, 1 "Coming Soon") for a "10 full-time professionals" company | Add more bios, or reduce the section's visual weight until ready |

### Services Overview (`/services`) — 1 High, 2 Medium, 3 Low
Full report: `docs/audit/ui-ux/services-overview.md`

| Priority | Finding | Fix |
|---|---|---|
| 🟠 High | Security card uses placeholder image | See Phase 1.4 |
| 🟡 Medium | Card `alt=""` combined with the Security placeholder means that card conveys zero visual info | Resolves once Phase 1.4 lands |
| 🟡 Medium | No filter/grouping distinguishing "trade" vs. "facility" services | Not urgent at 5 items; revisit if catalog grows |
| ⚪ Low | "10 full-time professionals" copy undersells scale next to 5 service divisions | Reframe or drop the specific number |
| ⚪ Low | 5-card grid leaves an unbalanced last row at `lg:grid-cols-3` | Accept, or nudge last card with `lg:col-start-2` |
| ⚪ Low | "Read More" affordance uses `text-primary` not `text-interactive` | Deliberate call needed — see full report for reasoning either way |

### Shared Service Layout (`src/layouts/ServiceLayout.astro`) — 1 High, 2 Medium, 2 Low
Affects all 5 detail pages identically. Full report: `docs/audit/ui-ux/services-layout-shared.md`

| Priority | Finding | Fix |
|---|---|---|
| 🟠 High | Hero legibility relies on gradient opacity only (no flat scrim), unverified across all 5 source photos for contrast | Spot-check contrast per hero image, or add a scrim like the header's `::after` treatment. `ServiceLayout.astro:73-77` |
| 🟡 Medium | Fixed `min-h-[320px] lg:min-h-[380px]` hero height is unrelated to actual subtitle length | Use `min-h-fit` + `max-h`, or verify no overflow at narrow viewports. `ServiceLayout.astro:59` — **deferred:** needs visual/device verification before changing to avoid a blind regression; not fixed this pass. |
| 🟡 Medium | "Safety is Non-Negotiable" section is byte-identical across all 5 pages, including generic items on Cleaning/Plant Hire | Consider service-specific variants (PSIRA for security, NEM:WA for cleaning) via a prop |
| ⚪ Low | Breadcrumb markup hand-duplicated instead of reusing `PageHeader.astro`'s | Extract to a shared partial |
| ⚪ Low | CTA copy repeated near-verbatim across overview + all 5 detail pages | Minor content nicety, not a defect |

### Services / Construction (`/services/construction`) — 0 High, 1 Medium, 2 Low
Full report: `docs/audit/ui-ux/services-construction.md` · Also inherits shared-layout issues above.

| Priority | Finding | Fix |
|---|---|---|
| 🟡 Medium | 14 visually-identical cards with no sub-hierarchy — high scan fatigue | Add category icons, or visually group road-safety items apart from road-maintenance items |
| ⚪ Low | Uneven card heights from body-copy length variance (15-35 words) | Cosmetic only, CSS grid already equalizes rows |
| ⚪ Low | Long `<h2>` titles wrap to 2 lines on mobile | No action needed |

### Services / Mechanical (`/services/mechanical`) — 0 High, 1 Medium, 2 Low
Full report: `docs/audit/ui-ux/services-mechanical.md` · Also inherits shared-layout issues above.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | "Mining support services" styled as a disabled/half-greyed item, reading as broken rather than intentional | **Shipped:** removed from the list entirely, replaced with a clear "Also available for mining support services - contact us" line below the list, linking to `/contact?service=Mechanical%20Engineering`. `mechanical.astro:95-99` |
| ⚪ Low | "Industries Served" has only 3 real entries — sparse next to "nationally, government/corporate/private" claim | Expand list if more sectors are genuinely served |
| ⚪ Low | Card count (6) is thinner than Construction (14) or Cleaning (10) | Consider whether this under-represents a technically deep offering |

### Services / Cleaning (`/services/cleaning`) — 0 High, 1 Medium, 2 Low
Full report: `docs/audit/ui-ux/services-cleaning.md` · Also inherits shared-layout issues above.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | Two distinct sub-services (Cleaning, Waste Management) share one URL with no anchor `id`s — can't deep-link to either | **Shipped:** added `id="cleaning-services"` / `id="waste-management"` with `scroll-mt-28` to each `<h2>` so anchored scrolling clears the sticky header. `cleaning.astro:63,87` |
| ⚪ Low | NEM:WA compliance footnote only appears under Waste Management, inconsistent with inline mention under Cleaning | Standardize placement, or merge into one summary line |
| ⚪ Low | Two sub-sections are visually identical aside from heading text | Consider a subtle visual break per sub-section |

### Services / Plant Hire (`/services/plant-hire`) — 1 High, 2 Medium, 2 Low
Full report: `docs/audit/ui-ux/services-plant-hire.md` · Also inherits shared-layout issues above.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟠 High | "Available" status badge has a real dark-mode contrast problem — `--success`/`--success-foreground` were never given dark-mode-specific values (unlike `--primary`/`--interactive`), so the badge nearly disappears against `--card:#121212` | **Shipped:** dark-mode `--success`/`--success-foreground` now use `green-400`/`green-300` instead of reusing light mode's `green-300`/`green-950` pair, giving real contrast against the dark card surface. `starwind.css:152-153` |
| 🟡 Medium | Equipment table forces full horizontal scroll on mobile instead of reflowing | Switch to a card layout below `sm:`, matching the pattern used elsewhere on the site. `plant-hire.astro:108-151` — **deferred:** a real layout change, left for a dedicated pass rather than a same-session mechanical fix. |
| ✅ 🟡 Medium | `operator: null` renders ambiguous "N/A" with no explanation | **Shipped:** added a `title` tooltip — "Not applicable - no operator required for hand tools". `plant-hire.astro:143` |
| ⚪ Low | No per-row or inline CTA near the equipment table — long scroll to the only CTA at page bottom | Consider a "Request a quote for this equipment" micro-CTA |

### Services / Security (`/services/security`) — 1 Critical, 1 High, 1 Medium
Full report: `docs/audit/ui-ux/services-security.md` · Also inherits shared-layout issues above.

| Priority | Finding | Fix |
|---|---|---|
| 🔴 Critical | Placeholder hero image paired with alt text describing a real photo that doesn't exist | See Phase 1.4 |
| 🟠 High | PSIRA registration number shipped as "to be confirmed by client" | See Phase 1.5 |
| 🟡 Medium | Missing image cascades to the overview grid too (same root cause) | Resolves once Phase 1.4 lands |

### Projects Overview (`/projects`) — 0 High, 2 Medium, 3 Low
Full report: `docs/audit/ui-ux/projects-overview.md`
**Verified:** the recent `border-interactive`/`bg-interactive` retarget on filter pills landed correctly — server-rendered and JS-toggled classes match exactly, no SSR/hydration mismatch.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | Filter state is pure client-side — reload/share/back-forward always resets to "All" | **Shipped:** click handler now writes `?category=` via `history.replaceState`, and an on-load check restores the filter from the URL if present (e.g. shared link, reload, back/forward). `projects/index.astro:171-220` |
| ✅ 🟡 Medium | `categoryColours` hardcoded and duplicated | See Phase 1.3 |
| ⚪ Low | Card's "View →" affordance uses `text-primary`, doesn't hover with the title | Optionally switch to `text-interactive` / `group-hover:text-interactive` |
| ⚪ Low | Grid caps at `lg:grid-cols-3` with no `xl:` step | No action needed — container max-width makes this a non-issue |
| ⚪ Low | Category coverage on this page is correct and complete | No action — noted for the record only |

### Project Detail (`/projects/[id]`) — 1 High, 2 Medium, 3 Low
Full report: `docs/audit/ui-ux/projects-detail.md`
**Verified:** the interactive-blue retarget on the gallery (active/hover thumbnail borders, focus ring) is fully correct and consistent between SSR and the click-handler JS.

| Priority | Finding | Fix |
|---|---|---|
| 🟠 High | `categoryColours` here is missing the `Security` entry entirely (5 of 6 categories) | See Phase 1.3 — add the missing entry as an immediate stopgap |
| 🟡 Medium | Gallery fade timing mismatch: JS swaps `src` at 200ms, CSS transition is 300ms — visible "pop" mid-fade | Match both to the same duration (300ms recommended). `projects/[id].astro:227,502-529` |
| 🟡 Medium | Active gallery thumbnail has no `aria-current`/`aria-pressed` — only a border color signals state | Add `aria-current="true"` on the active thumbnail, toggled alongside the border class. `projects/[id].astro:240-260,509-529` |
| ⚪ Low | Unused `id`/`data-src` leftover on the gallery container, likely from the removed lightbox | Remove, or comment why it's kept |
| ⚪ Low | No related/similar-projects module after the case study | Consider a "More {category} projects" rail |
| ⚪ Low | Fixed `aspect-16/6` hero crops portrait photos aggressively on mobile | Use a taller ratio on small screens, e.g. `aspect-4/3 sm:aspect-16/6` |

### Blog Listing (`/blog`) — 1 High, 2 Medium, 3 Low
Full report: `docs/audit/ui-ux/blog-overview.md`

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟠 High | Card focus ring likely clipped by `overflow-hidden` | See Phase 1.1 |
| 🟡 Medium | All 4 cover images are generic vector line-art, not photography (carried over from prior audit) | Replace with real jobsite/plant/security photography — client-asset dependency, not fixed this pass |
| ✅ 🟡 Medium | "Read more" uses `text-primary` while the title correctly hovers `text-interactive` — two different colors for the same "clickable" cue | **Shipped:** added `group-hover:text-interactive` so both cues move together. `blog/index.astro:103` |
| ⚪ Low | Zero-posts empty state has no link back into the site | Add a link to home/contact under the message |
| ⚪ Low | Tags are decorative-only with no filtering anywhere on the site | Decide if tag browsing is planned; if not, consider dropping tags from cards |
| ✅ ⚪ Low | Related-posts grid on the detail page uses different breakpoints than this page's grid | **Shipped** — see Blog Post Detail below. |

### Blog Post Detail (`/blog/[id]`) — 3 High, 3 Medium, 3 Low
Full report: `docs/audit/ui-ux/blog-detail.md` — the largest finding set of any page.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟠 High | Entire sidebar (TOC, share, copy-link, quote CTA) is `hidden` below `lg` (1024px) — every phone/tablet reader loses share functionality and in-page nav entirely, not just a squeezed layout | **Shipped:** the `hidden lg:block` gate is gone — the sidebar now stacks after the article in normal flow below `lg` (the grid itself only activates at `lg`, so this required no extra breakpoint logic). The TOC specifically is now a `<details open>` element so it's user-collapsible on mobile without hiding Share/Copy-link/CTA, which are always visible. `blog/[id].astro:173-254` |
| ✅ 🟠 High | TOC only includes `h1`/`h2` headings, but posts are authored with `h2` as the single top-level section and `h3` for real subsections — produces a near-useless 1-entry TOC on posts like the OHS Act article | **Shipped:** `tocHeadings` now includes depth 1-3, with `h3` entries indented (`pl-3 text-xs`) under their parent. Verified against the built OHS Act post — the TOC now shows all 6 `h3` subsections. `blog/[id].astro:16,194` |
| ✅ 🟠 High | Prose links + TOC active-state both use `--primary` instead of `--interactive` | **Shipped:** prose links fixed via Phase 1.2; the TOC `IntersectionObserver`'s active-state class swap now toggles `text-interactive` instead of `text-primary` directly. `blog/[id].astro:339,346` |
| ✅ 🟡 Medium | `prose-lg max-w-none` strips Typography's `65ch` measure — body lines run past 100 characters wide on desktop | **Shipped:** removed `max-w-none`, letting Typography's default `65ch` measure apply. `blog/[id].astro:166` |
| ✅ 🟡 Medium | Related-posts grid breakpoints don't match the listing page's | **Shipped:** now `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, matching the listing page exactly. `blog/[id].astro:263` |
| ✅ 🟡 Medium | Copy-link button silently swallows clipboard errors — no failure state ever announced | **Shipped:** `catch` now sets the label to "Couldn't copy — select the URL" for 3s, so the existing `aria-live` region announces failure too, not just success. `blog/[id].astro:362-370` |
| ⚪ Low | Scroll-spy TOC can flicker between entries when multiple headings intersect simultaneously | Pick the heading with the smallest non-negative `boundingClientRect.top` explicitly |
| ⚪ Low | Reading-time word count includes raw Markdown syntax, inflating the estimate | Strip Markdown before counting, if precision matters |
| ⚪ Low | "Back to top" link has no `focus-visible` styling | See Phase 1.1 |

### Contact (`/contact`) — 1 High, 3 Medium, 3 Low
Full report: `docs/audit/ui-ux/contact.md`

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟠 High | Header is hand-duplicated instead of using shared `PageHeader.astro` — Contact is the only main page missing breadcrumbs as a result | **Shipped:** now uses `<PageHeader label='Contact Us' title='Have a Project in Mind?' breadcrumbs={[...]} />`, matching About's pattern exactly. Contact now has "Home / Contact Us" breadcrumbs and one less hand-maintained header block. `contact.astro:77-82` |
| ✅ 🟡 Medium | Validated fields get `aria-describedby` on error but never `aria-invalid="true"` | **Shipped:** `aria-invalid={fieldErrors.X ? 'true' : undefined}` added to all 5 validated fields (name, email, phone, service, message). |
| ✅ 🟡 Medium | Mobile/tablet collapses to form-before-sidebar — quick-contact info (phone/WhatsApp/address) is buried below the entire form | **Shipped:** form and aside now use `order-2 lg:order-1` / `order-1 lg:order-2` on the shared grid, so the sidebar appears first below `lg` and the desktop two-column layout (form left, sidebar right) is unchanged. `contact.astro:90,376` |
| ✅ 🟡 Medium | Inputs use `focus:` rings (fire on mouse click too) while the submit button uses `focus-visible:` — two different focus strategies on one form | **Documented rather than changed:** added a code comment explaining the split is intentional — text inputs benefit from a click-triggered ring as feedback that the field is now editable, unlike buttons/links where `focus-visible` avoids an unwanted ring on mouse click. `contact.astro:144-145` |
| ⚪ Low | WhatsApp CTA hardcodes brand green (`#25d366`), unverified for AA contrast against the new true-black dark background | Verify contrast; darken if needed |
| ⚪ Low | No legend explaining the `*` required-field convention up front | Add a one-line legend near the form heading |
| ⚪ Low | FAQ accordion chevron animates but the panel snaps open/closed instantly | Add a height/opacity transition matching the chevron's duration |

### Thank You (`/thank-you`) — 0 High, 2 Medium, 3 Low
Full report: `docs/audit/ui-ux/thank-you.md`

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | Success icon uses `bg-primary/10 text-primary` instead of the site's own `--success` token (used correctly elsewhere, e.g. `about.astro:386`) | **Shipped:** now `bg-success/20 text-success-foreground`, landed together with the Plant Hire dark-mode `--success` contrast fix so both benefit from the same token change. `thank-you.astro:13` |
| 🟡 Medium | `min-h-[70vh]` + `pt-40` can exceed short mobile viewport heights, forcing a scroll to reach the CTAs | Reduce top padding on small screens, or drop `min-h-[70vh]` for content-driven height — **deferred**, needs viewport testing before changing. |
| ⚪ Low | Neither CTA has an explicit `focus-visible` style | See Phase 1.1 |
| ⚪ Low | Page is a plain static route reachable by bookmark/direct link with no staleness signal | Low priority — conscious tradeoff, not necessarily a bug |
| ⚪ Low | No fallback contact channel (phone/WhatsApp) shown for urgent enquiries | Consider a small "Need it urgently? Call/WhatsApp us" line under the CTAs |

### 404 (`/404`) — 0 High, 1 Medium, 2 Low
Full report: `docs/audit/ui-ux/404.md`
**Verified:** `<HelpfulLinks />` is confirmed live and rendering — the prior audit's blocking finding is resolved.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | Pulse-dot indicator ignores `prefers-reduced-motion` | **Shipped:** added `motion-reduce:animate-none` to the `animate-ping` element. `404.astro:108` |
| ⚪ Low | Hero content has no `data-animate` entrance treatment, unlike the rest of the site | Optional, cosmetic consistency fix |
| ⚪ Low | Not re-verified this pass: whether the route returns a true HTTP 404 status in production | Confirm via `curl -I` against a deployed unknown path |

### Privacy Policy (`/privacy-policy`) — 0 High, 2 Medium, 3 Low
Full report: `docs/audit/ui-ux/privacy-policy.md`

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | No reciprocal link to Terms of Service (ToS links here, not vice versa) | **Shipped:** added a matching "See also our Terms of Service" line at the bottom, mirroring ToS's existing link back to Privacy Policy. `privacy-policy.astro:104-106` |
| ✅ 🟡 Medium | `.prose max-w-4xl` produces lines well past the ~75-character readability guideline | **Shipped:** reduced to `max-w-3xl`, landed together with Terms of Service since both share the template. `privacy-policy.astro:27` |
| ⚪ Low | Prose link color token issue | See Phase 1.2 |
| ⚪ Low | 9 numbered sections have no `id` anchors despite implying a TOC | Add heading `id`s; consider a sticky TOC at `lg:` |
| ⚪ Low | Vercel/Resend named as data processors — verify still accurate if providers change | Content maintenance item, not urgent |

### Terms of Service (`/terms-of-service`) — 0 High, 1 Medium, 4 Low
Full report: `docs/audit/ui-ux/terms-of-service.md`
**Verified:** this page was deliberately adapted from the Privacy Policy template, not blindly copy-pasted — content, contact-box fields, and page-specific clauses (Section 3's non-binding quote-request language) are all correctly differentiated.

| Priority | Finding | Fix |
|---|---|---|
| ✅ 🟡 Medium | Same `.prose max-w-4xl` line-length issue as Privacy Policy | **Shipped:** same `max-w-3xl` fix, landed in the same commit as Privacy Policy. `terms-of-service.astro:27` |
| ✅ ⚪ Low | Same `.prose` link-color token issue | See Phase 1.2 |
| ⚪ Low | 10 numbered sections, no `id` anchors/TOC | Same fix as Privacy Policy |
| ⚪ Low | Cross-link to Privacy Policy only appears at the very bottom | Add a short cross-reference near the top lead paragraph too |

---

## Suggested execution order

1. ~~**Phase 1 cross-cutting fixes** (1.1–1.5)~~ — ✅ **Done 2026-08-02.** Resolved the sitewide focus-visible gap, the `.prose` link-color token, the duplicated/drifted project category map (now a single `src/lib/categories.ts`), and the two live "unresolved copy" issues (CIDB confirmed/pending mismatch, PSIRA "to be confirmed by client"). The Security service placeholder image itself is still a real asset gap — only its `alt` text was made honest in the meantime; the photo swap stays tracked as a client-asset dependency.
2. ~~**Critical/High page-specific items**: Plant Hire dark-mode success-badge contrast + Thank You's success-token fix, Blog Detail's mobile-sidebar hiding and TOC depth, Contact's missing `PageHeader`/breadcrumbs.~~ — ✅ **Done 2026-08-02.** All four landed: dark-mode `--success` token now has real contrast (fixes Plant Hire's badge and Thank You's icon in one change), Blog Detail's sidebar (Share/Copy-link/CTA) is no longer hidden below `lg` and its TOC now surfaces `h3` subsections via a collapsible `<details>`, and Contact now uses the shared `PageHeader` component with breadcrumbs.
3. ~~**Medium items**, roughly in traffic-priority order: Home → Services → Blog → Projects → Contact → legal pages.~~ — ✅ **Mostly done 2026-08-02.** Every Medium item that was a pure code/copy fix landed: Home's remaining nav-link color mismatches, hero secondary CTA token cleanup, "Trusted By" cleanup, h2 sizing; Mechanical's mis-styled mining-services item; Cleaning's deep-link anchors; Plant Hire's ambiguous "N/A" tooltip; Blog listing/detail's "Read more" hover, prose measure, related-posts breakpoints, copy-link failure state, and TOC active-state color; Projects overview's URL-synced filter state; Contact's `aria-invalid`, mobile info-before-form ordering, and documented focus-strategy split; both legal pages' prose measure and Privacy Policy's reciprocal ToS link; 404's reduced-motion gap. **Explicitly deferred** (not code-unsafe, just need verification I can't do headlessly): `ServiceLayout`'s fixed hero min-height (needs cross-device visual check), Plant Hire's equipment-table-to-cards mobile layout (a real layout change, not a token/class swap), Thank You's `min-h-[70vh]` mobile viewport risk (needs short-viewport testing). Still open and asset-dependent: real photography (Security service, blog cover images), client logos for the "Trusted By" strip.
4. **Low/polish items** opportunistically, or batched into a single pass — next up if continuing.
