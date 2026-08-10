# Page Audit: Services Overview `/services`

## Summary
The Services Overview page presents the five main business divisions of Phehlwana Group Investments in a clean, 3-column card grid. It details a transparent 5-step operational process and concludes with a safety summary and CTA. The overall page health is excellent, with the heading structure being fully semantic and logical, and the employee count updated to the correct "10 full-time professionals" based on the client questionnaire.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **UI / Visual** | High | **Placeholder Images in Grid**: The cards for Construction, Mechanical, Cleaning, and Plant Hire use placeholder images carried over from the old website structure. Only Security uses a real branded asset. | Request real high-quality images for the remaining 4 divisions and replace placeholders. |
| **Accessibility** | Low | **Empty Alt Text on Service Images**: The `<Picture>` component inside the service list uses `alt=''` (line 102). Since the card is wrapped in a link with a descriptive `aria-label`, this is technically WCAG compliant (prevents screen reader noise), but it is a missed opportunity for descriptive context. | Keep `alt=''` as it matches WCAG standards for decorative/link-redundant elements, but ensure the `aria-label` on the wrapping anchor remains clear and descriptive. |
| **SEO / Tech** | Low | **Generic Heading**: The H1 heading is "We Provide Best Services" (line 67). While styled nicely, it is grammatically slightly off and lack keywords. | Change the H1 to something more professional and optimized, such as "Our Services & Capabilities" or "Professional Solutions for Construction & Engineering". |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Optimize Heading Copy**: Update the PageHeader component's title in [src/pages/services/index.astro](file:///d:/websites/phehlwana-group-investments/src/pages/services/index.astro#L67) to "Our Services & Capabilities".

### Larger Fixes (Require Development/Client Input)
1. **Acquire Division Photography**: Replace the following placeholder files in `public/images/services/` with real photography:
   - `service-construction.png`
   - `service-mechanical.png`
   - `service-cleaning.png`
   - `service-plant-hire.png`
