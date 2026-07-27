# Page Audit: Contact `/contact`

## Summary
The Contact page is a fully functional Server-Side Rendered (SSR) page that features a Zod-validated contact form, a Google Maps iframe embed, a WhatsApp CTA, and a compliant FAQ accordion. It is integrated with Astro Server Actions and Resend for transaction emails. However, the form is currently blocked from sending emails due to missing Resend API keys and domain verification, and the FAQ contains inaccurate geographic data.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Technical** | Critical | **Resend Integration Blocked**: The contact form uses a Server Action (`src/actions/index.ts`) that calls Resend to send auto-replies and notifications. However, no `RESEND_API_KEY` is configured in the environment, and the sending domain is unverified, causing submissions to fail. | Setup a Vercel project, add `RESEND_API_KEY` to Vercel env vars, and complete DNS domain verification on Resend. |
| **Content** | High | **Geographic Scope Error**: The FAQ answer for "Do you work outside of Pretoria?" states "We serve clients across Gauteng and can accommodate other provinces on request" (line 41). The client explicitly confirmed they operate **nationally**. | Rewrite the FAQ answer to state: "Yes, we operate nationally across South Africa. While our head office is in Pretoria, our teams are equipped to handle projects in all nine provinces." |
| **Content** | Medium | **Incomplete Office Hours**: The business hours block only lists "Mon - Fri: 07:30 - 17:00" (line 484) but makes no mention of weekends. This leaves prospective clients guessing if the office is closed or offers emergency weekend services. | Add "Sat – Sun: Closed (Emergency calls only)" or explicitly state "Weekend: Closed". |
| **SEO / Tech** | Low | **Iframe Performance**: The Google Maps iframe (line 516) does not use `loading="lazy"` or `fetchpriority` optimization correctly in all contexts, potentially causing rendering delays on slower connections. | Double-check that `loading="lazy"` is correctly parsed, and consider using a static map image link that opens in Google Maps to save initial page requests. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Fix Inaccurate FAQ Copy**: Update the "outside Pretoria" answer in [src/pages/contact.astro](file:///d:/websites/phehlwana-group-investments/src/pages/contact.astro#L40-L42) to confirm national services.
2. **Explicit Office Hours**: Update the sidebar office hours in `contact.astro` to clarify weekend status.

### Larger Fixes (Require Development/Client Input)
1. **Resend Account Configuration**: Sign in to the Resend console, add the domain `phehlwanagroup.co.za`, copy the DNS TXT/MX records, add them to the domain registrar, and confirm verification.
2. **Vercel Env Variables**: Configure `RESEND_API_KEY` and mail variables in the Vercel hosting dashboard.
