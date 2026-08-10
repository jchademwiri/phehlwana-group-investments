# Page Audit: Project Details `/projects/[id]`

## Summary
The Project Detail template features an image switcher gallery, metadata sidebar (Client, Location, Category, etc.), CTA block, and a markdown content body. It handles dynamic rendering smoothly and links nicely to the contact form to pre-fill service choices. However, it presents a broken UX pattern where the main gallery image indicates it is zoomable but performs no action when clicked, and the underlying markdown text is placeholder copy.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **UX** | High | **Broken Zoom Affordance**: The main image container (`#gallery-main`) has `cursor-zoom-in`, `role='button'`, and `tabindex='0'`, implying a lightbox or zoom is available. However, clicking it triggers no JavaScript, frustrating user expectations. | Either implement a simple modal lightbox script to show the full image, or remove the zoom cursor and button roles if a lightbox is not planned. |
| **Content** | High | **Placeholder Case Study Text**: The page successfully pulls and renders content, but all case studies are developer placeholders (e.g. "montana-park-office-renovation.md") with generic placeholder paragraphs. | Replace markdown text in `src/content/projects/` with real client case studies. |
| **Accessibility** | Low | **Invalid List Semantics**: The thumbnail strip container uses `role='list'` (line 226), but its direct children are `<button>` tags with `role='listitem'` (line 240). Semantically, `list` should contain `li` elements, and buttons shouldn't directly act as list items. | Wrap each `<button>` in an `<li>` element, and remove the `role='listitem'` from the button itself. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Fix Broken Image Zoom**: In [src/pages/projects/[id].astro](file:///d:/websites/phehlwana-group-investments/src/pages/projects/[id].astro#L202-L208), remove `cursor-zoom-in`, `role='button'`, and `tabindex='0'` from the gallery wrapper if a lightbox is not required, OR write a simple 10-line script to toggle a modal window displaying the image.
2. **Correct Gallery Markup**: Restructure the thumbnail gallery loop to wrap buttons in native `<li>` elements.

### Larger Fixes (Require Development/Client Input)
1. **Case Study Replacements**: Replace placeholder data files in the projects collection with real company project descriptions.
