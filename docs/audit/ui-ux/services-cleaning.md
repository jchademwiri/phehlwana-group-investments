# UI/UX Audit — Cleaning & Waste Management (`/services/cleaning`)

## Summary
Well-structured two-part page (Cleaning Services / Waste Management Services) with the best content parity of any detail page (5 items each). The compliance footnote under Waste Management is a nice trust signal, but it's visually inconsistent with how compliance mentions are handled inline elsewhere (e.g. embedded in body copy on other pages), and the page combines two genuinely distinct service lines (cleaning vs. waste) under one URL/heading with no way to link to either sub-section directly. Also affected by shared layout issues — see `services-layout-shared.md`.

## Findings
| Severity | Area | Finding | Recommendation | Location |
|---|---|---|---|---|
| Medium | Deep-linking / navigation | The page combines two distinct service categories (Cleaning, Waste Management) under section `<h2>`s with no `id` attributes, so there's no way to link directly to `/services/cleaning#waste-management` from the overview page, nav, or elsewhere — a user interested only in waste disposal has to scroll past all 5 cleaning cards first. | Add `id` anchors to each `<h2>` (`id="cleaning-services"`, `id="waste-management"`) so both the site nav dropdown (currently commented out in `navigation.ts` per its own note) and this audit's cross-links can target sub-sections directly, especially since `navigation.ts:58` explicitly says items were "removed" pending page IDs. | `src/pages/services/cleaning.astro:63-89` |
| Low | Compliance note placement | The NEM:WA compliance footnote (`src/pages/services/cleaning.astro:106-112`) only appears under Waste Management, not under Cleaning Services (which separately name-drops NEM:WA inline in the Hazmat card body at line 24) — the compliance messaging pattern is inconsistent between the two sub-sections on the same page. | Apply the same footnote treatment consistently, or fold both compliance mentions into a single summary line to avoid mentioning NEM:WA twice in different formats on one page. | `src/pages/services/cleaning.astro:24, 106-112` |
| Low | Card count consistency | 5+5 = 10 cards is a good middle ground, but the two sub-sections are visually identical (same card style, spacing, heading size) with only the `<h2>` text differentiating them — a user scrolling quickly could momentarily miss the transition from "Cleaning" to "Waste Management" content. | Consider a subtler visual break (e.g. slightly different accent tint or an icon per section) beyond the shared `border-b` `<h2>` treatment, though current `space-y-12` spacing does provide reasonable separation. | `src/pages/services/cleaning.astro:61-114` |

## What's Working Well
- Best content-length parity of all 5 detail pages: exactly 5 items per sub-section, avoiding the lopsided list-length issue seen on Mechanical.
- Specific regulatory references throughout (NEM:WA Act 59 of 2008, SANS standards) lend credibility without being generic.
- Hero image and alt text are accurate and specific ("Phehlwana Group cleaning team in a commercial office building"), matching the real photography on disk.
- Two-part `space-y-12` layout with independent grids reads cleanly and scales well responsively (`sm:grid-cols-2` collapsing to 1 column on mobile for both sections).
