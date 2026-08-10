# Contact Page - Phehlwana Group Investments

> **File:** `contact.md`
> **Page:** Contact Us (`contact.html`)
> **Last reviewed:** May 2026

---

## SEO / Meta

```
Title:       Contact Us | Phehlwana Group Investments - Get a Free Quote
Description: Get in touch with Phehlwana Group Investments. Request a free quote,
             ask a question, or visit us at PKN Office Park, Montana, Pretoria.
             We respond within 1 business day.
Keywords:    contact Phehlwana Group, construction quote Pretoria, request quote
             South Africa, PKN Office Park Montana, building contractor contact
```

---

## Page Header

**Page title:** Contact Us

**Page subtitle:** Have a project in mind? We're here to help - get in touch and we'll respond within 1 business day.

---

## Contact Section Intro

**Section label:** Contact Us

**Headline:** Have a Project in Mind? Let's Talk.

**Body copy:**
> Whether you need a quote, have a question about our services, or want to discuss
> an upcoming project, our team is ready to help. Fill in the form below and we'll
> get back to you within 1 business day.

---

## Contact Form

**Form heading:** Request a Quote or Send Us a Message

### Form Fields

| Field           | Type     | Label              | Placeholder              | Required | Validation                              |
|-----------------|----------|--------------------|--------------------------|----------|-----------------------------------------|
| Full Name       | text     | Your Name          | e.g. John Smith          | Yes      | Min 2 characters                        |
| Email Address   | email    | Your Email         | e.g. john@company.co.za  | Yes      | Valid email format                      |
| Phone Number    | tel      | Your Phone         | e.g. 012 555 0000        | Yes      | SA format: 10 digits, starts with 0     |
| Service Type    | select   | Service Required   | - Select a service -     | Yes      | Dropdown - see options below            |
| Subject         | text     | Subject            | Brief description         | No       |                                         |
| Message         | textarea | Your Message       | Tell us about your project | Yes     | Min 20 characters                       |

**Service Type dropdown options:**
- Construction & Civil Engineering
- Road Construction & Maintenance
- Mechanical Engineering
- Commercial Cleaning
- Industrial Cleaning
- Waste Management
- Plant Hire
- Security
- General Enquiry

**Submit button:** Send Message

---

### Form Backend Configuration

**Platform:** Resend + Astro Server Actions (Phase 6 of the development plan)

> **NOTE:** The developer guide confirms the contact form uses **Resend** for email
> delivery with **React Email** templates - NOT FormSubmit.co. The old site used
> FormSubmit; the new site uses a proper Astro Server Action.

**How it works:**
1. User submits the form
2. Astro Server Action (`src/actions/index.ts`) validates input with Zod
3. Two emails are sent via Resend:
   - Notification email → `info@phehlwanagroup.co.za`
   - Auto-reply confirmation → the person who submitted
4. On success: redirect to `/thank-you`
5. On error: form re-renders with error messages and field values preserved

**Environment variables required (set in Vercel before Phase 6):**
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@phehlwanagroup.co.za   # Must be verified domain in Resend
TO_EMAIL=info@phehlwanagroup.co.za
```

**Auto-reply email to sender:**
> Subject: Thank you for contacting Phehlwana Group Investments
>
> Dear [Name],
>
> Thank you for reaching out to Phehlwana Group Investments. We have received your
> message and a member of our team will be in touch within 1 business day.
>
> If your matter is urgent, please contact us directly:
> - Office: 012 655 0284
> - Mobile: 079 294 7635
> - Email: info@phehlwanagroup.co.za
>
> Kind regards,
> The Phehlwana Group Team
> www.phehlwanagroup.co.za

> **NOTE:** The `?service=` URL parameter pre-populates the Service Type dropdown.
> Each service page links to `/contact?service=[Service+Name]` so the field is
> already filled when the user arrives from a service page.

---

## Contact Information

### Address
**Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182**

*(This is the standardised address - use this exact format on all pages)*

Google Maps link: [View on Google Maps](https://www.google.com/maps/place/PKN+Office+Park)

---

### Telephone

| Line          | Number         | Use                                    |
|---------------|----------------|----------------------------------------|
| Office        | 012 655 0284   | General enquiries, Monday–Friday       |
| Mobile/Direct | 079 294 7635   | Urgent matters, after-hours WhatsApp   |

**WhatsApp:** [Chat on WhatsApp](https://wa.me/27792947635)
*(Link format: `https://wa.me/27792947635` - removes the leading 0, adds country code 27)*

---

### Operating Hours

| Day              | Hours                                    |
|------------------|------------------------------------------|
| Monday – Friday  | 07:30 – 17:00                            |
| Saturday         | **[TODO: Confirm - e.g. 08:00 – 13:00]** |
| Sunday           | **[TODO: Confirm - e.g. Closed]**        |
| Public Holidays  | **[TODO: Confirm]**                      |

---

### Website
**www.phehlwanagroup.co.za**

---

## Google Maps Embed

**Location:** PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria

```html
<iframe
  title="Phehlwana Group Investments office location on Google Maps"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.762599447415!2d28.2720771750622!3d-25.679163242796296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfdfb60cc92eaf%3A0xeba42ca9ede1cd67!2sPKN%20Office%20Park!5e0!3m2!1sen!2sza!4v1768891930905!5m2!1sen!2sza"
  width="100%"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

*(Title attribute added for accessibility compliance)*

---

## FAQ Section

**Section label:** Frequently Asked Questions

**Heading:** Common Questions

---

**Q: How quickly do you respond to quote requests?**
A: We aim to respond to all quote requests within 1 business day. For urgent matters,
please call us directly on 012 655 0284.

---

**Q: Do you work outside of Pretoria?**
A: Yes, we provide our services nationally across South Africa.

---

**Q: Are you CIDB registered?**
A: Yes, Phehlwana Group Investments is registered with the CIDB at Grades 6GB, 5SQ, 5CE, 5SK, 5SB.

---

**Q: Do you offer emergency maintenance services?**
A: **[TODO: Confirm - e.g. "Yes, we offer emergency maintenance response for existing
clients. For urgent maintenance issues, please call 079 294 7635."]**

---

**Q: What information do I need to provide for a quote?**
A: For the most accurate quote, please provide:
- Project location and site address
- Scope of work (what needs to be done)
- Preferred start date and timeline
- Any relevant drawings, plans, or specifications
- Your budget range (if known)

---

**Q: Do you provide plant hire with operators?**
A: Yes, we offer both wet hire (with operator) and dry hire (equipment only) for most
of our plant and equipment. Contact us to discuss the best option for your project.

---

**Q: Are you BBBEE compliant?**
A: Yes, Phehlwana Group Investments is a Level 1 BBBEE contributor. Our current certificate is available on request.

---

## Thank You Page

> **This page already exists as a stub at `src/pages/thank-you.astro`** (built in Phase 0).
> It will be fully built in Phase 6 alongside the contact form.

**Page title:** Thank You for Getting in Touch!

**Body copy:**
> We've received your message and a member of our team will be in touch within
> 1 business day.
>
> If your matter is urgent, please call us directly:
> - Office: 012 655 0284
> - Mobile: 079 294 7635

**CTAs:**
- Back to Home → `/`
- View Our Services → `/services`

---

## Footer

*(Same footer as all other pages - see `home.md` for footer content details)*

---

## Outstanding TODOs (Client to provide)

| # | Item                          | Notes                                                              |
|---|-------------------------------|--------------------------------------------------------------------|
| 1 | Operating hours               | Confirm Saturday, Sunday, and public holiday hours                 |
| 2 | CIDB registration details     | Registration number for FAQ                                        |
| 3 | BBBEE certificate             | Certificate PDF                                                    |
| 5 | Emergency maintenance policy  | Do you offer after-hours emergency response?                       |
| 6 | CV submission email           | Confirm `careers@phehlwanagroup.co.za` or correct address          |
| 7 | Resend domain verification    | Domain `phehlwanagroup.co.za` must be verified in Resend before Phase 6 |
| 8 | Security service details      | Add Security to the service type dropdown once confirmed           |
