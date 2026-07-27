# Page Audit: Mechanical Engineering `/services/mechanical`

## Summary
The Mechanical Engineering page provides a structured breakdown of six core services (Design, Manufacturing, Maintenance, etc.) along with industries served. It also includes a tentative note about "Mining support services" to address potential client inquiries. While content alignment is solid, it shares the layout accessibility alt-text bug and uses generic placeholder imagery.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Accessibility** | High | **Ignored `imageAlt` Prop**: The page passes a descriptive `imageAlt` to the `ServiceLayout` component, but inside [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35), the alt attribute is hardcoded as `alt=''`. | Fixed in layout level by replacing `alt=''` with `alt={imageAlt}` on line 35 of `ServiceLayout.astro`. |
| **UI / Visual** | High | **Placeholder Hero Image**: The hero section uses `service-mechanical.png`, which is an old-site placeholder. | Replace the placeholder with an original photo of a mechanical engineering installation or site. |
| **SEO / Tech** | Medium | **Geographic Scope Discrepancy**: The meta description mentions "Pretoria", but the client questionnaire indicates national services. | Update the description meta-tag to say "delivered nationally across South Africa". |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Layout Alt Fix**: Verify layout-level fix of `alt={imageAlt}` in [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35).
2. **Update Geographic SEO**: Change "Pretoria" in the page meta description to "nationally" in [src/pages/services/mechanical.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/mechanical.astro#L41).

### Larger Fixes (Require Development/Client Input)
1. **Replace Hero Image**: Swap out the placeholder `/images/services/service-mechanical.png` with verified company project photography.
