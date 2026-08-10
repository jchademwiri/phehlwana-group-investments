# Page Audit: Blog Listing Overview `/blog`

## Summary
The Blog Listing page displays published blog articles in a structured, 3-column grid sorted by date. Each card includes a cover image, publishing date, description snippet, tags, and a "Read more" trigger. The technical foundation and styling are robust and compile cleanly. The primary issue is cosmetic: all cover images are generic SVG illustrations rather than real photography, which makes the site feel slightly academic rather than corporate.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **UI / Visual** | Medium | **Vector Illustrations**: The blog posts use stylized, developer-created SVGs (like `building-maintenance.svg`) rather than real photography. This does not match the corporate, B2B aesthetic of the rest of the site. | Request actual photos representing each article topic (e.g. safety gears, plant equipment, waste trucks) and update the frontmatter cover images. |
| **Accessibility** | Low | **Empty Alt Text on Card Covers**: The `<Picture>` component inside the blog card has `alt=''` (line 64). Since the card is wrapped in a link with a descriptive `aria-label`, this is WCAG compliant, but can be improved. | Leave `alt=''` as it is redundant due to the wrapping anchor's `aria-label`, but ensure any screen reader test validates card focus. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Refine Title Tags**: Ensure the page title and meta tags are aligned with South African business search intents (e.g. "Phehlwana Group - Industry Insights").

### Larger Fixes (Require Development/Client Input)
1. **Photography Overhaul**: Gather real photos for each blog post cover and upload them to `public/images/blog/` to replace the vector SVGs.
