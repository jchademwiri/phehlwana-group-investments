# Page Audit: Blog Post Detail `/blog/[id]`

## Summary
The Blog Post Detail template is a highly polished, two-column page featuring a header with tag pills, a sticky Table of Contents (TOC) with active scroll highlighting, a copy-link share button, and a dynamic reading-time estimate. The content is formatted beautifully using `@tailwindcss/typography`. Overall, it is one of the most complete pages on the site, but it misses SEO rich snippet markup (Article JSON-LD) and author profile context (important for Google E-E-A-T).

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **SEO / Tech** | Medium | **Missing Article Schema**: The root layout defines LocalBusiness and WebSite JSON-LD, but the blog detail page does not override or add Article/BlogPosting schema, which is vital for appearing in Google search "Top Stories" and rich snippets. | Append an `Article` JSON-LD schema to the head of the page when `ogType === 'article'`. |
| **Content** | Low | **Lack of Author Context (E-E-A-T)**: The page lists "Phehlwana Group" or "Phehlwana Group Team" as the author but displays no profile, bio, or individual writer details. Google heavily prioritizes E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) for informational content. | Introduce a small Author Bio box at the bottom of the blog article containing a headshot and a brief description of the writer's credentials. |
| **Accessibility** | Low | **Copy Link Announcement**: The "Copy link" button updates its label to "Copied!" (line 260) when clicked, but the status change is not announced to screen readers. | Add `aria-live="polite"` to the `#copy-link-label` element so screen readers announce "Copied!" when the clipboard action is successful. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Accessibility Announcement**: Add `aria-live="polite"` to [src/pages/blog/[id].astro](file:///d:/websites/phehlwana-group-investments/src/pages/blog/[id].astro#L175) to notify assistive technologies of the link copy success.
2. **Author Bio Block**: Create a simple, styled footer section at the bottom of the prose content representing the "Phehlwana Group Editorial Team".

### Larger Fixes (Require Development/Client Input)
1. **Dynamic Article Schema**: Implement a structured data builder in `Layout.astro` or `[id].astro` that outputs `BlogPosting` JSON-LD with correct publication dates, headlines, and cover image URLs.
