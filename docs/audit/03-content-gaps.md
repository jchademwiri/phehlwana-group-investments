# Content Gaps — Content Collections, Copy, and Dependencies

---

## Content Collections Status

### Blog Collection (`src/content/blog/`)

| File | Title | Published? | Status |
|------|-------|:---------:|--------|
| `building-maintenance-saves-money.md` | Why Regular Building Maintenance Saves You Money | ✅ Yes | Live |
| `ohs-act-construction-compliance.md` | OHS Act: What Every Construction Site Must Have | ✅ Yes | Live |
| `waste-management-compliance.md` | Waste Management Compliance: What Your Business Needs to Know | ✅ Yes | Live |
| `wet-hire-vs-dry-hire.md` | Wet Hire vs Dry Hire: Which Option is Right for You? | ✅ Yes | Live |
| `placeholder.md` | Placeholder Title | ❌ No | Draft |

**Gaps:**
- All cover images are branded SVGs — need real photography
- No posts for categories: Mechanical Engineering, Security, Company News
- Content calendar recommends 6+ posts for first 3 months (only 4 exist)

---

### Projects Collection (`src/content/projects/`)

| File | Title | Category | Published? | Featured? |
|------|-------|----------|:---------:|:--------:|
| `montana-park-office-renovation.md` | Montana Park Office Complex Renovation | Construction | ✅ Yes | ✅ Yes |
| `tshwane-road-resurfacing.md` | Tshwane Municipal Road Resurfacing Programme | Road | ✅ Yes | ✅ Yes |
| `industrial-facility-cleaning-contract.md` | Industrial Facility Cleaning & Waste Management Contract | Cleaning | ✅ Yes | ❌ No |
| `gauteng-civil-earthworks-plant-hire.md` | Residential Estate Bulk Earthworks — Plant Hire | Plant Hire | ✅ Yes | ❌ No |
| `placeholder.md` | Placeholder Project | Construction | ❌ No | ❌ No |

**Gaps:**
- **No Mechanical Engineering projects** (category exists in schema, no entries)
- **No Security projects** (category not in schema enum — would need `'Security'` added)
- Only 4 real projects vs client's mention of 5-10 available
- All project descriptions are placeholder/written by us — not real client briefs
- Client confirmed projects exist but are "unorganised"

---

## Copy Gaps & Issues

### Confirmed Content Issues

| Page | Issue | Severity |
|------|-------|:--------:|
| `/services` index | Intro says "50+ skilled professionals" — should be "10 full-time" | 🔴 High |
| `/services` meta desc | "across Gauteng" — should be "across South Africa" | 🟡 Medium |
| `/contact` FAQ | "Do you work outside of Pretoria?" answer says "Gauteng and beyond" — should be "nationally" | 🔴 High |
| All service meta descs | "Pretoria and Gauteng" — should be "across South Africa" | 🟡 Medium |
| Home hero "About" | "Building South Africa Since 2015" — doesn't mention 2020 re-registration | 🟡 Medium |
| `/services/construction` meta desc | "Pretoria and Gauteng" — needs national update | 🟡 Medium |
| `/services/mechanical` meta desc | "Pretoria" — needs national update | 🟡 Medium |
| `/services/cleaning` meta desc | "Pretoria and Gauteng" — needs national update | 🟡 Medium |
| `/services/plant-hire` meta desc | "Pretoria and Gauteng" — needs national update | 🟡 Medium |
| `/services/security` meta desc | "Pretoria and Gauteng" — needs national update | 🟡 Medium |
| `/projects` meta desc | "Pretoria and Gauteng" — needs national update | 🟡 Medium |
| `/blog` meta desc | "Pretoria" — needs national update | 🟡 Medium |

### Missing Copy

| Item | Needed For | Client Status |
|------|------------|:-------------:|
| Nicholas Mahlangu bio (expanded) | About page, Team | ❌ Not provided |
| Sbusiso Mashilwane role + bio | About page, Team | ❌ Not provided |
| Core values (6 provided are written by us — need client confirmation) | About page | ⚠️ Needs review |
| Client testimonials (2-3 quotes) | About page, Home | ❌ Not provided |
| Company profile PDF | About page (download) | ❌ Not provided |

---

## Content Dependency Tracker

| Item | Needed For | Status |
|------|-----------|:------:|
| Logo files (colour PNG, white PNG, SVG) | All pages | ⚠️ Placeholder in use |
| Brand colour hex codes | Theme | ✅ Grey & Blue confirmed |
| Hero photography ×2-3 (1920×800px, WebP) | Home page | ❌ Not received |
| About section photo (800×600px, WebP) | About, Home | ❌ Not received |
| Service photography ×5 (800×500px, WebP) | Services, Home | ❌ Not received |
| Team headshots ×2 | About, Team | ❌ Not received |
| Team bios + roles ×2 | About, Team | ❌ Not received |
| Project details + photos (6+) | Projects | ⚠️ Unorganised — client has them |
| Social media URLs (FB, IG, LinkedIn) | Header, Footer | ❌ Billy Maphothoma working on it |
| CIDB registration number | About, FAQ | ❌ Not provided |
| BBBEE certificate PDF | About | ❌ Not provided |
| ISO 45001 certificate PDF | About | ❌ Not provided |
| NHBRC registration number | About | ❌ Not provided |
| 2020 registration number | About | ❌ Not provided |
| PSIRA registration number | Security page | ❌ Not provided |
| Client testimonials (2-3) | About, Home | ❌ Need assistance gathering |
| OG image (1200×630px) | SEO (Phase 7) | ❌ Not received |
| Resend API key | Contact form (Phase 6) | ❌ Not set up |
| GA4 Measurement ID | Analytics (Phase 7) | ❌ Not set up |
| Google Search Console access | SEO (Phase 7) | ❌ Not set up |
| Domain registrar access (for DNS) | Deployment (Phase 9) | ❌ Confirm with client |
| Company profile PDF | About page (download) | ❌ Not provided |
| Equipment specs (capacity, tonnage, kVA) | Plant Hire page | ❌ Not provided |
| Plant hire minimum periods + rates | Plant Hire, FAQ | ❌ Not provided |
