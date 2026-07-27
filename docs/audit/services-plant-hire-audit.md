# Page Audit: Plant Hire `/services/plant-hire`

## Summary
The Plant Hire page provides a detailed list of eight equipment types (including the requested "Grader") in a clean, readable table. It clearly outlines the differences between Wet Hire and Dry Hire and provides a simple 4-step process to hire. The content is accurate and highly helpful, but the page inherits the layout accessibility bug and uses placeholder imagery.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Accessibility** | High | **Ignored `imageAlt` Prop**: The page passes a descriptive `imageAlt` to the `ServiceLayout` component, but inside [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35), the alt attribute is hardcoded as `alt=''`. | Fixed in layout level by replacing `alt=''` with `alt={imageAlt}` on line 35 of `ServiceLayout.astro`. |
| **UI / Visual** | High | **Placeholder Hero Image**: The hero section uses `service-plant-hire.png`, which is an old-site placeholder. | Replace the placeholder with a real photo of a TLB or Grader on a job site. |
| **SEO / Tech** | Medium | **Geographic Scope Discrepancy**: The meta description mentions "Pretoria and Gauteng", but the client questionnaire indicates national services. | Update the description meta-tag to say "delivered nationally across South Africa". |
| **UX** | Low | **Table Overflow on Very Small Screens**: While the table has `overflow-x-auto`, on very narrow viewports, the columns may require horizontal scrolling which is slightly inconvenient. | Consider wrapping table cells in a responsive flex layout on small screens if necessary, though the current scroll container is acceptable. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Layout Alt Fix**: Verify layout-level fix of `alt={imageAlt}` in [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35).
2. **Update Geographic SEO**: Change "Pretoria and Gauteng" in the page meta description to "nationally" in [src/pages/services/plant-hire.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/plant-hire.astro#L58).

### Larger Fixes (Require Development/Client Input)
1. **Replace Hero Image**: Swap out the placeholder `/images/services/service-plant-hire.png` with verified company project photography.
