# Page Audit: Security `/services/security`

## Summary
The Security page details six manned guarding and electronic security services, referencing PSIRA compliance. The content aligns well with requirements, but the page is visually restricted by using a generic `/images/placeholder.svg` image in its hero wrapper instead of the existing `service-security.png` asset. It also inherits the shared layout accessibility bug and has a pending registration number.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Accessibility** | High | **Ignored `imageAlt` Prop**: The page passes a descriptive `imageAlt` to the `ServiceLayout` component, but inside [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35), the alt attribute is hardcoded as `alt=''`. | Fixed in layout level by replacing `alt=''` with `alt={imageAlt}` on line 35 of `ServiceLayout.astro`. |
| **UI / Visual** | High | **Missed Asset Reference**: The page uses `/images/placeholder.svg` as its hero background (line 38), even though a real asset `service-security.png` exists in the `public/images/services/` directory and is referenced on the homepage. | Change the `image` prop value from `'/images/placeholder.svg'` to `'/images/services/service-security.png'` in [src/pages/services/security.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/security.astro#L38). |
| **Content** | High | **Pending PSIRA Registration**: The compliance notice at the bottom states "PSIRA registration number to be confirmed by client." (line 82). A missing PSIRA number on a security service website can raise credibility issues. | Request the PSIRA registration number from the client and update the text. |
| **SEO / Tech** | Medium | **Geographic Scope Discrepancy**: The meta description mentions "Pretoria and Gauteng", but the client questionnaire indicates national services. | Update the description meta-tag to say "delivered nationally across South Africa". |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Fix Image Reference**: Update `image` to `'/images/services/service-security.png'` in [src/pages/services/security.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/security.astro#L38).
2. **Layout Alt Fix**: Verify layout-level fix of `alt={imageAlt}` in [src/layouts/ServiceLayout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/ServiceLayout.astro#L35).
3. **Update Geographic SEO**: Change "Pretoria and Gauteng" in the page meta description to "nationally" in [src/pages/services/security.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/security.astro#L35).

### Larger Fixes (Require Development/Client Input)
1. **Acquire PSIRA Credentials**: Contact the client to get the verified PSIRA registration number.
2. **Replace Security Photography**: Once confirmed, replace `service-security.png` with actual photography of security personnel.
