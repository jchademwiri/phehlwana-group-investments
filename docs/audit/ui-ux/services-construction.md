# UI/UX Audit — Construction & Civil Engineering (`/services/construction`)

## Summary
This is the most content-rich detail page (14 items across 2 sections) and generally the strongest example of the pattern — real photography, specific and well-differentiated copy per item. Also affected by shared layout issues — see `services-layout-shared.md`. The main page-specific concern is sheer length/scan-fatigue from 14 near-identical card blocks with no visual sub-hierarchy beyond the section heading.

## Findings
| Severity | Area | Finding | Recommendation | Location |
|---|---|---|---|---|
| Medium | Scannability | 14 items (7 "General Building" + 7 "Road Construction") are rendered as visually identical cards (same size, same dot-bullet, same 2-line-ish body) with no icons or visual differentiation between item types (e.g. "New Builds" vs. "Maintenance & Repairs" look identical at a glance). At this volume, users must read every card title to find what they need. | Consider a small category icon per item, or grouping road-safety items ("Work Zone Safety", "Traffic Control", "Road Safety Audits") visually apart from road-maintenance items within the same section, since they're a distinct sub-concern. | `src/pages/services/construction.astro:85-104` |
| Low | Content length variance | Item body copy ranges from ~15 words ("Surface Treatment") to ~35 words ("New Builds", "Maintenance & Repairs"), causing uneven card heights within the `sm:grid-cols-2` layout — cards don't visually align row-to-row on wider viewports since grid items aren't using equal-height enforcement beyond default stretch (default grid item stretch does equalize row height, but ragged text amount still reads as inconsistent). | Low priority — content-driven, not a real defect given CSS grid already equalizes heights. Consider trimming the two longest bodies for tighter parity. | `src/pages/services/construction.astro:11, 35` |
| Low | Heading hierarchy | Both `<h2>` section headings ("General Building Construction & Maintenance", "Road Construction, Maintenance & Safety Management") are quite long titles for a 20px heading — on narrow mobile viewports these will wrap to 2 lines before the border-bottom rule, which is fine but worth a visual check against the wide desktop equivalent (single line). | No action needed — cosmetic wrapping only, not a defect. | `src/pages/services/construction.astro:87-89` |

## What's Working Well
- Most detailed and specific copy of all 5 service pages — each of the 14 items names concrete deliverables (SANS standards, CIDB, mezzanine floors, RSA audits) rather than generic filler, giving strong information scent.
- Clear two-section structure (Building vs. Road) matches how the business itself is described elsewhere on the site (subtitle: "new builds and renovations to road construction and safety management").
- Hero image (`service-construction.png`) has a specific, descriptive alt text naming the location context ("in Pretoria"), consistent with real photography rather than a placeholder.
- Responsive `sm:grid-cols-2` card grid degrades cleanly to single-column on mobile for all 14 items.
