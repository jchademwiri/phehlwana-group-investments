# Home Page - Phehlwana Group Investments

> **File:** `home.md`
> **Page:** Homepage (`index.html`)
> **Last reviewed:** May 2026

---

## SEO / Meta

```
Title:       Phehlwana Group Investments | Construction, Engineering & Plant Hire Pretoria
Description: Phehlwana Group Investments - trusted construction, civil engineering,
             mechanical services, cleaning, plant hire and security in Pretoria.
             Established 2015. Call 012 655 0284.
Keywords:    construction Pretoria, civil engineering South Africa, plant hire Gauteng,
             cleaning services Pretoria, road maintenance, building maintenance,
             mechanical engineering, waste management, security services South Africa
```

---

## Topbar (Desktop Only)

| Element      | Content                                                              |
|--------------|----------------------------------------------------------------------|
| Address      | Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182 |
| Email        | info@phehlwanagroup.co.za                                            |
| Social Links | Facebook, Twitter, Instagram, LinkedIn - **[TODO: Add actual profile URLs]** |
| Language     | English *(remove IsiNdebele, Sesotho, IsiZulu, Sepedi unless actively translated)* |

> **NOTE - Languages:** The old site listed 5 languages in the dropdown but the site
> content is English-only. Remove the other language options until translations are
> available, or they will mislead visitors.

---

## Navigation

| Nav Item      | Link Target | Notes                                                    |
|---------------|-------------|----------------------------------------------------------|
| Home          | `/`         | Active on this page                                      |
| About         | `/about`    |                                                          |
| Services      | Dropdown    | 5 divisions - see below                                  |
| Projects      | `/projects` |                                                          |
| Contact       | `/contact`  |                                                          |
| Request Quote | `/contact`  | Primary CTA button                                       |

**Services dropdown (5 divisions):**

| Division                        | URL                        |
|---------------------------------|----------------------------|
| Construction & Civil Engineering | `/services/construction`  |
| Mechanical Engineering          | `/services/mechanical`     |
| Cleaning & Waste Management     | `/services/cleaning`       |
| Plant Hire                      | `/services/plant-hire`     |
| Security                        | `/services/security`       |

> **NOTE:** The developer guide confirms 5 service divisions including Security.
> The old site only showed 4 - Security must be added to all service listings.

**Phone CTA (desktop):**
- Label: "Call to Our Experts"
- Number: `012 655 0284`
- Link: `tel:+27126550284`

---

## Hero / Carousel

### Slide 1 - Construction and Maintenance

**Eyebrow:** Welcome to Phehlwana Group Investments

**Headline:** Construction and Maintenance

**Body copy:**
> From new builds to routine upkeep, we keep your facilities safe, functional, and
> looking their best. Our experienced teams handle everything from structural work to
> emergency repairs - so you can focus on what matters most.

**CTAs:**
- Learn More → `/services` *(primary)*
- Request a Quote → `/contact` *(secondary)*

**Image:** `public/images/hero/hero-construction.jpg`
**Alt text:** "Phehlwana Group construction team working on a building site in Pretoria"

> **[TODO: Replace with a real project site photo]**

---

### Slide 2 - Safety Management and Plant Hire

**Eyebrow:** Welcome to Phehlwana Group Investments

**Headline:** Safety Management and Plant Hire

**Body copy:**
> We combine the logistical benefits of hiring specialised equipment with strict
> compliance to South African health and safety legislation - protecting your people,
> your assets, and your project timelines.

**CTAs:**
- Learn More → `/services` *(primary)*
- Request a Quote → `/contact` *(secondary)*

**Image:** `public/images/hero/hero-plant-hire.jpg`
**Alt text:** "Phehlwana Group TLB and plant hire equipment on a construction site"

> **[TODO: Replace with a real equipment/plant photo]**

---

### Slide 3 - Cleaning and Waste Management *(New - recommended addition)*

**Eyebrow:** Welcome to Phehlwana Group Investments

**Headline:** Cleaning and Waste Management

**Body copy:**
> From commercial contract cleaning to hazardous waste disposal, we deliver hygienic,
> compliant, and environmentally responsible solutions for businesses of all sizes
> across South Africa.

**CTAs:**
- Learn More → `/services` *(primary)*
- Request a Quote → `/contact` *(secondary)*

**Image:** `public/images/hero/hero-cleaning.jpg`
**Alt text:** "Phehlwana Group cleaning team in a commercial facility"

> **[TODO: Replace with a real cleaning/waste management photo]**

---

## About Section (Homepage Snapshot)

### Left Column - Company Overview

**Section label:** About Phehlwana Group Investments

**Company description:**
> Phehlwana Group Investments is a South African small-to-medium enterprise established
> in 2015. Over the past decade, our highly professional and experienced team has built
> a deep understanding of the construction, engineering, and facilities management
> sectors - delivering quality results for government, corporate, and private clients
> nationally.
>
> Our business approach is built on a clear strategy: leverage local expertise, maintain
> the highest standards of quality and safety, and develop lasting partnerships with our
> clients. We don't just complete projects - we build relationships.

**Vision:**
> To be the most trusted and preferred multi-disciplinary service provider in South
> Africa, recognised for quality workmanship, safety excellence, and positive community
> impact.

**Mission:**
> To deliver exceptional construction, engineering, cleaning, and plant hire services
> through skilled professionals, innovative methods, and an unwavering commitment to
> safety and client satisfaction.

**Our Values:**

- ✅ **Adaptable solutions** - We tailor our approach to each client's unique needs and project requirements.
- ✅ **Uncompromising quality** - Every project is executed to the highest standards, on time and within budget.
- ✅ **Client-first relationships** - We build long-term partnerships based on trust, transparency, and results.

**CTA:** Learn More About Us → `/about`

---

### Right Column - Stats

| Stat                  | Value | Display text                  |
|-----------------------|-------|-------------------------------|
| BBBEE Level           | Level 1 | "BBBEE Level"                 |
| CIDB Grade            | 6GB, 5SQ, 5CE, 5SK, 5SB | "CIDB Grades"                 |
| Years in Business     | 10+   | "Years in Business"           |
| Coverage              | National | "Coverage"                 |

**Image:** `public/images/hero/about-site-photo.jpg`
**Alt text:** "Phehlwana Group project site - construction work in progress"

> **[TODO: Replace `sed.png` with a real project or team photo]**

---

## Services Section (Homepage Preview)

**Section label:** Our Services

**Headline:** We Provide Best Services

**Intro copy:**
> At Phehlwana Group, we are committed to delivering excellence across every service
> we provide. From large-scale civil engineering projects to daily cleaning contracts,
> our teams bring the same dedication to quality, safety, and professionalism.
> Choosing Phehlwana Group means partnering with a company built on integrity,
> efficiency, and a passion for getting it right.

### Service Cards

| # | Service Name                       | Summary                                                                                                                    | Image alt text                                      | CTA                                    |
|---|------------------------------------|----------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|----------------------------------------|
| 1 | Construction & Civil Engineering   | New builds, renovations, road construction, road maintenance, and safety management - delivered to CIDB standards.         | Construction workers on a building site             | Read More → `/services/construction`   |
| 2 | Mechanical Engineering             | Design, development, installation, and maintenance of mechanical systems and machinery for industrial and commercial clients. | Mechanical engineer working on industrial equipment | Read More → `/services/mechanical`     |
| 3 | Cleaning & Waste Management        | Commercial cleaning, industrial hygiene, hazardous waste handling, recycling, and compliant waste disposal.                | Cleaning team in a commercial building              | Read More → `/services/cleaning`       |
| 4 | Plant Hire                         | TLB, excavators, tipper trucks, water carts, bulldozers, generators, and tools - available for wet or dry hire.           | TLB and construction equipment on a project site    | Read More → `/services/plant-hire`     |
| 5 | Security                           | Manned guarding, access control, CCTV monitoring, risk assessment, event security, and site security.                     | Security officer at a commercial building entrance  | Read More → `/services/security`       |

**Bottom CTA:** View All Services → `/services`

> **[TODO: Replace `blog-1.png` through `blog-4.png` with dedicated service images.
> Add a 5th card image for Security.]**

---

## Trust / Accreditation Strip *(New - recommended addition)*

> Add a horizontal strip between the Services section and the Footer showing
> accreditation logos and trust signals.

**Suggested content:**
- CIDB Registered - Grades 6GB, 5SQ, 5CE, 5SK, 5SB
- BBBEE Compliant - Level 1
- OHS Act Compliant
- NEM:WA Compliant
- 10+ Years in Business

---

## Footer

### Company Blurb
> We pride ourselves on our ability to meet the latest client specifications and deliver
> on every concept - from the first consultation to final handover.

### Navigation Links
- About Us → `/about`
- Services → `/services`
- Projects → `/projects`
- Contact → `/contact`

### Contact Details (Footer)

| Type      | Detail                                                                              |
|-----------|-------------------------------------------------------------------------------------|
| Address   | Office No. 6, PKN Office Park, 62 Taaifontein Street, Montana Park, Pretoria, 0182 |
| Email     | info@phehlwanagroup.co.za                                                           |
| Telephone | 012 655 0284                                                                        |

### Newsletter
> "Subscribe to our newsletter for project updates, industry news, and company announcements."

- Input: Email address
- CTA: Subscribe
- Backend: **[TODO: Connect to Mailchimp / Brevo before launch]**

### Social Media
- Facebook: **[TODO: Add URL]**
- Instagram: **[TODO: Add URL]**
- LinkedIn: **[TODO: Add URL]**

> **NOTE:** The developer guide uses `socialLinks` in `src/data/navigation.ts` as the
> single source of truth for social URLs. Update that file - not individual pages.

---

## Copyright

> © Phehlwana Group Investments 2026. All rights reserved.
> Designed by [Apex Web Solutions](https://apexwebsolutions.co.za)

> **NOTE:** Developer credit is Apex Web Solutions per `src/data/navigation.ts`.
> The old site showed "Mothupi Solutions" - this has been corrected.

---

## Outstanding TODOs (Client to provide)

| # | Item                          | Notes                                                        |
|---|-------------------------------|--------------------------------------------------------------|
| 1 | Hero images (3 slides)        | Real project/site photography                                |
| 2 | About section image           | Team photo or completed project                              |
| 3 | Service card images (4)       | One per service - real photos                                |
| 4 | Social media profile URLs     | Facebook, Twitter/X, Instagram, LinkedIn                     |
| 5 | CIDB registration details     | Grade and registration number                                |
| 6 | BBBEE level                   | Current certificate level                                    |
| 7 | Newsletter platform           | Mailchimp / Brevo account setup                              |
