# Page Audit: Construction & Civil Engineering `/services/construction`

## Summary
The Construction & Civil Engineering page details 14 sub-services split across General Building and Road Construction/Safety. It uses the shared `ServiceLayout` component which provides breadcrumbs, a header section, health & safety lists, and a pre-filled quote CTA. The page contains highly descriptive and accurate content but is visually limited by placeholder photography and has a critical layout accessibility bug.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Accessibility** | High | **Ignored `imageAlt` Prop**: The page passes a descriptive `imageAlt` to the `ServiceLayout` component, but inside [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35), the alt attribute is hardcoded as `alt=''`. This discards the alt text for all 5 service pages. | Replace `alt=''` with `alt={imageAlt}` on line 35 in `ServiceLayout.astro`. |
| **UI / Visual** | High | **Placeholder Hero Image**: The hero section uses `service-construction.png`, which is an old-site placeholder. | Replace the placeholder with an original, high-resolution photo of a real construction project. |
| **SEO / Tech** | Medium | **Geographic Scope Discrepancy**: The meta description mentions "Pretoria and Gauteng", but the client questionnaire indicates national services. | Update the description meta-tag to say "delivered nationally across South Africa" to capture wider B2B search traffic. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Fix Layout Alt Binding**: Change `alt=''` to `alt={imageAlt}` in [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35) to fix alt text across all five service sub-pages.
2. **Update Geographic SEO**: Change "Pretoria and Gauteng" in the page meta description to "nationally" in [src/pages/services/construction.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/construction.astro#L77).

### Larger Fixes (Require Development/Client Input)
1. **Replace Hero Media**: Swap out the placeholder `/images/services/service-construction.png` with verified company project photography.
