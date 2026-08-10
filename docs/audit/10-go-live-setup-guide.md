# Go-Live Setup Guide — What You Need To Do

> **Date:** 2026-07-27
> **Purpose:** Everything on your side (not code) to take this build from "working locally" to "100% working in production." Environment variables, deployment steps, and a verification checklist.

The code is done and build-verified. Nothing below requires touching the codebase — it's accounts, DNS records, and one deploy.

---

## 1. Environment Variables

These go into **Vercel's project settings** (Settings → Environment Variables), not into a committed file. `.env` is git-ignored on purpose — never commit real values.

| Variable | Required? | What it does | Where to get it |
|---|:---:|---|---|
| `RESEND_API_KEY` | 🔴 Required | Authenticates the contact form's email sending (via [Resend](https://resend.com)) | Resend dashboard → API Keys, after creating an account. Looks like `re_xxxxxxxxxxxxxxxxxxxx` |
| `FROM_EMAIL` | 🔴 Required | The "from" address on emails the site sends (notification to you + auto-reply to the customer) | Must be an address on a domain you've verified in Resend — e.g. `noreply@info.phehlwanagroup.co.za` |
| `TO_EMAIL` | 🔴 Required | Where contact-form notifications get sent | Any inbox you check — e.g. `info@phehlwanagroup.co.za` |
| `PUBLIC_GA4_ID` | 🟡 Optional | Enables Google Analytics 4. If left unset, GA4 code simply doesn't load — no error | Google Analytics → Admin → Data Streams → your web stream. Looks like `G-XXXXXXXXXX` |

**Two variables in `.env.example` that you can ignore:** `RESEND_REGISTERED_DOMAIN` and `PUBLIC_SITE_URL` are listed there but **not actually read by any code** — the site URL is hardcoded in `astro.config.mjs` instead. You don't need to set either for the site to work. (Worth deleting from `.env.example` at some point so nobody wastes time on them, but harmless to leave.)

**The `PUBLIC_` prefix matters** — Astro only exposes env vars to client-side code if they start with `PUBLIC_`. Don't rename `RESEND_API_KEY` etc. to have that prefix; they're server-only and must stay that way (it's a secret key).

---

## 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import the GitHub repo (`phehlwana-group-investments`).
2. Framework preset: Vercel should auto-detect **Astro**. Confirm:
   - Build command: `bun run build`
   - Install command: `bun install`
   - Output directory: leave as detected (Astro's Vercel adapter handles this)
3. Under **Environment Variables**, add the 3–4 variables from the table above (`RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, and `PUBLIC_GA4_ID` if you have it yet).
4. Deploy. First deploy will succeed even without Resend fully verified yet — the contact form will just fail to send until step 4 below is done.
5. **Which branch:** deploy `master` for production once you've merged `dev` into it (per your plan). Until then, you can also deploy `dev` to a preview URL to check things live before merging.

---

## 3. Point Your Domain at Vercel

1. In the Vercel project → **Settings → Domains**, add `phehlwanagroup.co.za` (and `www.phehlwanagroup.co.za` if you want that variant too).
2. Vercel will show you the exact DNS records to add (usually an `A` record or `CNAME`, depending on your registrar).
3. Add those records at your domain registrar (wherever you bought `phehlwanagroup.co.za`).
4. DNS can take anywhere from a few minutes to ~24 hours to propagate. Vercel will show a green checkmark once it detects the domain is correctly pointed.

---

## 4. Verify Your Resend Sending Domain

**This is the step that makes the contact form actually send email.** Without it, the form will show a generic error to visitors every time.

1. Sign up at [resend.com](https://resend.com) (free tier is fine to start).
2. **Domains → Add Domain** → enter `info.phehlwanagroup.co.za` (a subdomain is recommended so you don't affect your main domain's regular email).
3. Resend will give you 3 DNS records to add: **SPF (TXT)**, **DKIM (TXT)**, and usually a **DMARC (TXT)** record.
4. Add these at your domain registrar (same place as step 3).
5. Back in Resend, click **Verify** — this can take a few minutes to a few hours depending on DNS propagation.
6. Once verified, generate an API key (**API Keys → Create API Key**) and add it to Vercel as `RESEND_API_KEY` (step 1 above), then redeploy (Vercel → Deployments → Redeploy) so the new env var takes effect.
7. **Test it for real**: go to your live site's `/contact` page, submit the form with your own email address, and confirm you receive both the internal notification (at `TO_EMAIL`) and the customer auto-reply (at the email you entered in the form).

---

## 5. Set Up Google Analytics 4 (optional but recommended)

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin → Create Property** for `phehlwanagroup.co.za`.
2. Under **Data Streams**, add a **Web** stream with your live URL.
3. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).
4. Add it to Vercel as `PUBLIC_GA4_ID`, redeploy.
5. The site already has a cookie-consent banner that gates this — GA4 won't actually collect anything until a visitor clicks "Accept." That's intentional (POPIA compliance) and needs no further setup from you.
6. To confirm it's working: visit the live site, accept the cookie banner, then check GA4's **Realtime** report — you should see yourself as an active user within a minute or two.

---

## 6. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add a property for `https://phehlwanagroup.co.za` (use the "Domain" property type if you can verify via DNS, otherwise "URL prefix" and verify via the HTML tag/file method).
3. Once verified, go to **Sitemaps** and submit: `https://phehlwanagroup.co.za/sitemap-index.xml`
4. Google will start crawling within a few days. This step can only happen after the domain is actually live (step 3).

---

## 7. Post-Deploy Verification Checklist

Once deployed and DNS has propagated, go through this on the **live** site (not localhost):

- [ ] Homepage loads, hero carousel auto-rotates and pauses on hover
- [ ] Dark/light theme toggle works and persists on reload
- [ ] Mobile menu opens/closes, Services dropdown expands
- [ ] Every nav link works: Home, About, Services (+ all 5 sub-pages), Projects, Blog, Contact
- [ ] Contact form: submit a real test enquiry, confirm you receive **both** emails (see step 4.7 above)
- [ ] Contact form: try submitting with an invalid email/phone — confirm inline validation errors show correctly
- [ ] `/blog` and each individual blog post load, "More from the Blog" section shows related posts
- [ ] `/projects` category filter works, including the new "Security" filter
- [ ] Visit a non-existent URL (e.g. `/this-does-not-exist`) — confirm the branded 404 page shows, not a generic error
- [ ] Check the browser tab title on a few pages — should read once, not duplicated (e.g. "Home | Phehlwana Group Investments", not doubled)
- [ ] Share a page link in WhatsApp/Slack/etc. and confirm the social preview card shows the branded image, not a broken image or the plain logo
- [ ] Cookie-consent banner appears on first visit; accepting it and checking GA4 Realtime confirms tracking fires
- [ ] robots.txt (`/robots.txt`) and sitemap (`/sitemap-index.xml`) are both reachable
- [ ] Test on an actual phone, not just a resized browser window, if possible

---

## 8. Still Outstanding After This (Not Your DNS/Vercel Job — the Client)

Everything above gets the *build* to 100%. What still needs actual content/credentials from the client is a separate, longer list — real photography, team bios, CIDB/BBBEE/ISO/NHBRC/PSIRA numbers, project write-ups, social media URLs, brand colours, testimonials. That full checklist is in [`00-overview.md`](./00-overview.md) under "Client-Dependent Checklist" — nothing there blocks the site from being live and functional, it's polish and credibility content that can land after launch.

---

## Quick Reference: The Absolute Minimum to Go Live

If you want the shortest possible path to "site is live and the contact form works," in order:

1. Vercel project created, deployed from `master` (steps 2)
2. Domain pointed at Vercel (step 3)
3. Resend domain verified + `RESEND_API_KEY`/`FROM_EMAIL`/`TO_EMAIL` set in Vercel (step 4)
4. Redeploy after adding env vars
5. Send yourself a test enquiry through the live contact form

Everything else (GA4, Search Console) can follow within the first week without blocking launch.
