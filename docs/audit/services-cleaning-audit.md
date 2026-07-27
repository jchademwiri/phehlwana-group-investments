# Page Audit: Cleaning & Waste Management `/services/cleaning`

## Summary
The Cleaning & Waste Management page is well-structured, separating 10 specific services into Cleaning and Waste Management categories. It also includes an important compliance notice referencing the National Environmental Management: Waste Act (NEM:WA). The page information is highly accurate, but it inherits the layout accessibility bug and uses placeholder imagery.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Accessibility** | High | **Ignored `imageAlt` Prop**: The page passes a descriptive `imageAlt` to the `ServiceLayout` component, but inside [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35), the alt attribute is hardcoded as `alt=''`. | Fixed in layout level by replacing `alt=''` with `alt={imageAlt}` on line 35 of `ServiceLayout.astro`. |
| **UI / Visual** | High | **Placeholder Hero Image**: The hero section uses `service-cleaning.png`, which is an old-site placeholder. | Replace the placeholder with a real photo of a professional commercial or industrial cleaning contract. |
| **SEO / Tech** | Medium | **Geographic Scope Discrepancy**: The meta description mentions "Pretoria and Gauteng", but the client questionnaire indicates national services. | Update the description meta-tag to say "delivered nationally across South Africa". |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Layout Alt Fix**: Verify layout-level fix of `alt={imageAlt}` in [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35).
2. **Update Geographic SEO**: Change "Pretoria and Gauteng" in the page meta description to "nationally" in [src/pages/services/cleaning.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/cleaning.astro#L54).

### Larger Fixes (Require Development/Client Input)
1. **Replace Hero Image**: Swap out the placeholder `/images/services/service-cleaning.png` with verified company project photography.
