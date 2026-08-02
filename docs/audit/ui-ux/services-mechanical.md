# UI/UX Audit — Mechanical Engineering (`/services/mechanical`)

## Summary
Content is solid and well-organized (6 services + an "Industries Served" callout), but the Industries list is noticeably thinner than the service-item lists on sibling pages, and the "Mining support services" entry is handled inconsistently — styled as a muted, italic, disabled-looking list item rather than a real list entry or an explicit note. Also affected by shared layout issues — see `services-layout-shared.md`.

## Findings
| Severity | Area | Finding | Recommendation | Location |
|---|---|---|---|---|
| Medium | Inconsistent data treatment | The "Mining support services" item (`src/pages/services/mechanical.astro:95-116`) is visually styled as a *disabled/placeholder* list entry — `text-muted-foreground/60 italic`, a muted "info" circle icon instead of the checkmark used by the other 3 industries — reading like a broken/incomplete feature rather than an intentional "ask us" prompt. This is the only place on any of the 5 service pages that uses this half-greyed pattern. | Either promote it to a normal list item (if the service genuinely is offered) or replace with a clearer, differently-styled callout (e.g. a small "Don't see your industry? Contact us" line outside the list) so it doesn't read as a broken/missing feature. | `src/pages/services/mechanical.astro:95-116` |
| Low | List length inconsistency | "Industries Served" has only 3 real entries (`Manufacturing and production facilities`, `Municipal infrastructure`, `Commercial and industrial buildings`) plus the ambiguous mining item — notably shorter than the equipment table (8 rows) on Plant Hire or the 6-item safety checklist in the shared layout. For a company serving "government, corporate, and private clients nationally" (per the overview page copy), 3 named industries feels sparse. | Expand the industries list if more sectors are actually served (e.g. energy/utilities, agriculture, retail) to match the specificity level of other pages. | `src/pages/services/mechanical.astro:32-36` |
| Low | Card count asymmetry | 6 service cards here vs. 14 on Construction, 10 on Cleaning (5+5), 6 on Security, and an 8-row table on Plant Hire — Mechanical's content volume is roughly on par with Security but noticeably thinner than Construction/Cleaning. Not a defect per se, but worth flagging as a content-depth gap if parity across services matters for perceived credibility. | Consider whether Mechanical Engineering (typically a technically deep offering) is under-represented relative to its likely scope compared to sibling pages. | `src/pages/services/mechanical.astro:5-30` |

## What's Working Well
- The 6 service cards (Design & Development through Safety Management) map cleanly onto a full engineering lifecycle (design → manufacture → install → maintain → analyze → safety), giving a coherent narrative arc that other pages' flatter lists don't have.
- Correct `text-primary` usage on decorative bullet dots and checkmark icons, no interactive-color misuse.
- Hero alt text is concise and accurate ("Mechanical engineer inspecting industrial machinery") without overclaiming specifics that aren't verifiable from a stock-style image.
- Real photography present and correctly wired (`service-mechanical.png` with WebP variants on disk), unlike Security's placeholder gap.
