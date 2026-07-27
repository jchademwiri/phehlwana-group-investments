# Page Audit: About `/about`

## Summary
The About page is comprehensive and well-written, laying out the company's story, values, vision, mission, and accreditation compliance. It serves as a strong trust-building page for prospective B2B and public sector clients. However, the page is currently held back by several content gaps and placeholders, including team headshots, pending registration numbers, and missing PDF downloads for certifications (vital for tenders).

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Content** | High | **"Pending" Registrations & Roles**: The CIDB registration number displays as "(Registration Number Pending)" (line 81), and team member Sbusiso Mashilwane's role is listed as "Coming Soon". This undermines corporate authority. | Request the real CIDB registration number from the client. Prompt Sbusiso for his official title/role to replace the placeholder. |
| **UX** | High | **Missing Tender Assets**: A top priority for the client is supporting procurement submissions. The page lists Level 1 BBBEE, NHBRC, and OHS certifications, but none of these have links to download the certificates. | Add download links/buttons to let users download the BBBEE Certificate, CIDB proof, and the official Company Profile PDF. |
| **Content** | Medium | **Underdeveloped Bios**: Group CEO Nicholas Mahlangu's biography is a very brief placeholder. A professional description is needed to build trust with high-value clients. | Request a 1-2 paragraph bio from Nicholas detailing his background, leadership style, and industry experience. |
| **Accessibility** | Low | **Empty Team Alt Text**: Team placeholder images use empty/generic alt attributes. When real photos are uploaded, they must not be left blank or say "headshot". | Ensure the `<Picture>` component for team photos utilizes descriptive alt text, e.g. `alt="Nicholas Mahlangu, Group CEO of Phehlwana Group Investments"`. |
| **SEO / Tech** | Low | **Geographic Descriptions**: The meta description mentions "Pretoria", but the company now operates "nationally" according to the questionnaire. | Update the page's metadata description to reflect "national" coverage to expand organic search reach. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Bio Expansion**: Update the CEO description in the codebase with whatever copy is currently available or request a brief summary.
2. **Metadata Refresh**: Change the meta description in [src/pages/about.astro](file:///d:/websites/phehlwana-group-investments/src/pages/about.astro#L108-L110) to include "national services" rather than just "Pretoria".

### Larger Fixes (Require Development/Client Input)
1. **Acquire and Link PDF Credentials**: Upload the BBBEE certificate and Company Profile PDF to the `public/docs/` folder and link them in the Accreditations section.
2. **Obtain Team Photos**: Replace `placeholder.svg` for Nicholas Mahlangu and Sbusiso Mashilwane with real headshots.
3. **Register CIDB / PSIRA numbers**: Replace "Pending" markers with the actual numbers once provided by the client.

---

## Code Snippet

### Accreditation placeholder block in `src/pages/about.astro`
```astro
<!-- Line 78-104: Accreditations array contains a pending number and no PDF download links -->
const accreditations = [
  {
    label: 'CIDB Registration',
    detail: 'Grade 4CE, 5GB (Registration Number Pending)', // Needs real number
    confirmed: true,
  },
  {
    label: 'BBBEE Certificate',
    detail: 'Level 1 Contributor', // Needs PDF link
    confirmed: true,
  },
  ...
]
```
