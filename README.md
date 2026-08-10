# Phehlwana Group Investments - Website

> Corporate website for [Phehlwana Group Investments](https://phehlwanagroup.co.za) - a South African construction, engineering, cleaning, plant hire, and security company based in Pretoria.

**Live site:** https://phehlwanagroup.co.za  
**Repo:** https://github.com/jchademwiri/phehlwana-group.git  
**Built by:** [Apex Web Solutions](https://apexwebsolutions.co.za)

---

## Build Status

| Phase | Description | Status |
| :---- | :---------- | :----- |
| 0 | Foundation & Config | ✅ Complete |
| 1 | Shared Layout & Navigation | ✅ Complete |
| 2 | Home Page | ⏳ Built - pending client photography |
| 3 | About Page | ⏳ Built - pending client content |
| 4 | Services Pages | ✅ Built (placeholder images pending client photography) |
| 5 | Projects Portfolio | ⏳ Built - pending more client project content |
| 6 | Contact, Email & Utility | ⏳ Built - pending Resend domain verification |
| 7 | SEO & Analytics | ✅ Complete |
| 8 | Performance & Accessibility | ✅ Complete |
| 9 | Pre-Launch & Go Live | ❌ Not started |

See [`docs/audit/00-overview.md`](./docs/audit/00-overview.md) for the full, up-to-date production-readiness audit.

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Install |
| :--- | :------ | :------ |
| [Node.js](https://nodejs.org) | `>= 22.12.0` | https://nodejs.org |
| [Bun](https://bun.sh) | Latest | `npm install -g bun` |
| [Git](https://git-scm.com) | Any | https://git-scm.com |

> This project uses **Bun** as the package manager and runtime. Do not use `npm` or `yarn` - the lockfile is `bun.lock`.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jchademwiri/phehlwana-group.git
cd phehlwana-group
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values. See [Environment Variables](#environment-variables) below.  
The dev server works without real values - you only need them for the contact form (Phase 6) and analytics (Phase 7).

### 4. Start the development server

```bash
bun dev
```

The site is now running at **http://localhost:4321**

---

## Commands

All commands are run from the root of the project:

| Command | Action |
| :------ | :----- |
| `bun install` | Install dependencies |
| `bun dev` | Start local dev server at `localhost:4321` |
| `bun build` | Build production site to `./dist/` |
| `bun preview` | Preview the production build locally |
| `bun astro check` | TypeScript type-check all `.astro` files |
| `bun astro add <integration>` | Add an Astro integration |

---

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro v6](https://astro.build) |
| UI Components | [Starwind UI v1.16](https://starwind.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [Tabler Icons](https://tabler.io/icons) |
| JavaScript | Vanilla JS only - no React/Vue in the UI layer |
| React | Installed for [React Email](https://react.email) templates only |
| Animations | CSS `@keyframes` + Intersection Observer |
| Forms | Astro Server Actions + [Resend](https://resend.com) (Phase 6) |
| Images | Astro `<Image />` - automatic WebP conversion + lazy loading |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) + Google Analytics 4 (Phase 7) |
| Deployment | [Vercel](https://vercel.com) - `@astrojs/vercel` adapter |
| Package manager | [Bun](https://bun.sh) |

---

## Project Structure

```
phehlwana-group/
│
├── public/                          Served as-is - no Astro processing
│   ├── favicon.ico                  Browser tab icon
│   ├── robots.txt                   Search engine crawl rules
│   ├── site.webmanifest             PWA manifest
│   ├── img/
│   │   ├── logo.png                 ⚠️  Placeholder - replace with final brand asset
│   │   └── logow.png                ⚠️  Placeholder - replace with final brand asset
│   ├── docs/                        Client PDFs (CIDB cert, BBBEE cert, company profile)
│   └── scripts/
│       └── animations.js            Scroll-triggered entrance animations (Intersection Observer)
│
├── src/
│   ├── assets/
│   │   └── images/                  ✅  Processed by Astro - auto WebP, optimised, lazy loaded
│   │       ├── hero/                Hero/carousel images
│   │       ├── about/               About section images
│   │       ├── services/            Service card images (one per division)
│   │       ├── projects/            Project portfolio photos
│   │       ├── team/                Team headshots
│   │       └── blog/                Blog post featured images
│   │
│   ├── components/
│   │   ├── starwind/                Starwind UI components - fully editable, you own the code
│   │   ├── shared/
│   │   │   ├── Header.astro         Sticky header - topbar, Services dropdown, mobile drawer, dark mode
│   │   │   └── Footer.astro         4-column footer - theme-aware, dynamic copyright year
│   │   ├── helpful-links.astro      Used on 404 page
│   │   └── sections/                ⏳  Page section components - built in Phase 2+
│   │
│   ├── content/
│   │   ├── projects/                MDX files - one per project (Phase 5)
│   │   └── blog/                    MDX files - one per post (Phase 2+)
│   │
│   ├── content.config.ts            Content collection schemas (projects + blog)
│   │
│   ├── data/
│   │   └── navigation.ts            ⭐  Single source of truth for all nav links and service divisions
│   │
│   ├── layouts/
│   │   └── Layout.astro             Root layout - CSS, Header, Footer, dark mode, skip-to-content
│   │
│   ├── pages/
│   │   ├── index.astro              Home (Phase 2)
│   │   ├── about.astro              About (Phase 3)
│   │   ├── projects.astro           Projects portfolio (Phase 5)
│   │   ├── contact.astro            Contact (Phase 6)
│   │   ├── thank-you.astro          Post-form confirmation (Phase 6)
│   │   ├── 404.astro                ✅  Custom 404 - branded, theme-aware
│   │   └── services/
│   │       ├── index.astro          Services overview (Phase 4)
│   │       ├── construction.astro   Construction & Civil Engineering (Phase 4)
│   │       ├── mechanical.astro     Mechanical Engineering (Phase 4)
│   │       ├── cleaning.astro       Cleaning & Waste Management (Phase 4)
│   │       ├── plant-hire.astro     Plant Hire (Phase 4)
│   │       └── security.astro       Security (Phase 4)
│   │
│   └── styles/
│       └── starwind.css             Starwind base + Tailwind v4 + scroll animation CSS
│
├── docs/                            Project documentation
│   ├── developer-guide.md           Full technical reference
│   ├── development-plan.md          Phase-by-phase build plan with checklists
│   ├── client-questionnaire.md      Outstanding questions for the client
│   ├── website-audit-report.md      Audit of the old site
│   └── content/                     Page-by-page content and copy
│       ├── README.md                Content status tracker
│       ├── home.md / about.md / services.md / blog.md
│       ├── team.md / contact.md / faq.md / thank-you.md
│
├── astro.config.mjs                 Astro config - site URL, adapter, integrations
├── content.config.ts                Content collection definitions (Astro v6 glob loader)
├── starwind.config.json             Starwind CLI config
├── tsconfig.json                    TypeScript config - @/ alias, strict mode
├── .env.example                     ✅  Safe to commit - placeholder values only
├── .env                             ⚠️  Never commit - real secrets go here
├── bun.lock                         Bun lockfile - commit this
└── package.json
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in real values. The dev server runs without them - they are only required for the contact form (Phase 6) and analytics (Phase 7).

```bash
# Email - Phase 6
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx        # Get from resend.com
RESEND_REGISTERED_DOMAIN=info.phehlwanagroup.co.za  # Subdomain verified in Resend DNS
FROM_EMAIL=noreply@info.phehlwanagroup.co.za  # Must match the verified domain above
TO_EMAIL=info@phehlwanagroup.co.za            # Where form submissions are delivered

# Analytics - Phase 7
PUBLIC_GA4_ID=G-XXXXXXXXXX                   # Get from Google Analytics

# Site
PUBLIC_SITE_URL=https://phehlwanagroup.co.za
```

> **Never commit `.env`** - it is in `.gitignore`. Only `.env.example` is committed.

---

## Images

Images in `src/assets/images/` are processed by Astro at build time - automatically converted to WebP, optimised, and lazy loaded. Always use the `<Image />` component for these.

```astro
---
import { Image } from 'astro:assets';
import heroImg from '@/assets/images/hero/hero-construction.png';
---
<Image
  src={heroImg}
  alt="Phehlwana Group construction team on a building site in Pretoria"
  width={1920}
  height={800}
  loading="eager"
/>
```

Images in `public/img/` (logos) are served as-is and referenced by URL path - no `<Image />` needed.

> See `docs/developer-guide.md` → Image Guidelines for required sizes and full usage details.

---

## Deployment

The site deploys automatically to Vercel on every push to `master`.

**Manual deploy:**
```bash
bun build          # builds to ./dist/
bun preview        # preview the build at localhost:4321
```

**First-time Vercel setup** (Phase 9):
1. Connect the GitHub repo at https://vercel.com/new
2. Framework: Astro (auto-detected)
3. Build command: `bun run build`
4. Install command: `bun install`
5. Add all environment variables from `.env`
6. Point the custom domain `phehlwanagroup.co.za` to Vercel

> The `@astrojs/vercel` adapter is already installed and configured. The contact page (Phase 6) uses `export const prerender = false` for SSR - Vercel handles this automatically.

---

## Key Conventions

### Tailwind - use semantic tokens, not palette classes

| ❌ Avoid | ✅ Use instead |
| :------- | :------------- |
| `bg-neutral-950` | `bg-background` |
| `text-white` | `text-foreground` |
| `text-neutral-400` | `text-muted-foreground` |
| `bg-neutral-800` | `bg-accent` |
| `border-neutral-200` | `border-border` |

Semantic tokens make light/dark mode work automatically everywhere. Hardcoded palette classes break in dark mode.

### Navigation - one file to rule them all

All nav links live in `src/data/navigation.ts`. Edit that file and the Header, Footer, mobile drawer, and sitemap all update automatically. Never hardcode nav links in components.

### Scroll animations

Add `data-animate` to any element to opt into the scroll entrance animation:

```html
<section data-animate>...</section>
```

Handled by `public/scripts/animations.js` via Intersection Observer. Fires once per element.

### SSR opt-in

The project uses `output: 'static'`. Pages that need server-side rendering must explicitly opt in:

```astro
---
export const prerender = false; // This page renders on demand
---
```

Only the contact page (Phase 6) needs this.

---

## Git Workflow

### Branches

| Branch | Purpose |
| :----- | :------ |
| `master` | Production - auto-deploys to phehlwanagroup.co.za |
| `feature/*` | New features and pages |
| `fix/*` | Bug fixes |
| `content/*` | Copy, images, and MDX files only |

### Commit messages

```
feat:     new feature or page
fix:      bug fix
content:  copy, image, or MDX update
style:    CSS/Tailwind changes only
chore:    config, tooling, dependencies
docs:     documentation updates
```

### What not to commit

- `.env` - real API keys and secrets
- `dist/` - build output (in `.gitignore`)
- Client PDFs containing sensitive business information

---

## Contributing

This is a client project maintained by Apex Web Solutions. To work on it:

1. Branch from `master` using the naming convention above
2. Make your changes
3. Run `bun astro check` to catch TypeScript errors before pushing
4. Run `bun build` to confirm the production build passes
5. Open a pull request against `master` with a clear description of the change

---

## Documentation

Full project documentation is in the `docs/` folder:

| File | Purpose |
| :--- | :------ |
| [`docs/developer-guide.md`](docs/developer-guide.md) | Components, theming, image guidelines, deployment |
| [`docs/development-plan.md`](docs/development-plan.md) | Phase-by-phase build plan with per-phase checklists |
| [`docs/client-questionnaire.md`](docs/client-questionnaire.md) | Outstanding questions for the client |
| [`docs/website-audit-report.md`](docs/website-audit-report.md) | Findings from the audit of the old site |
| [`docs/content/README.md`](docs/content/README.md) | Content status - what's written, what's still needed |

---

## License

Private - all rights reserved. This codebase is the property of Phehlwana Group Investments. Not open source.

---

## Useful Links

| Resource | URL |
| :------- | :-- |
| Astro Docs | https://docs.astro.build |
| Astro v6 Migration Guide | https://docs.astro.build/en/guides/upgrade-to/v6/ |
| Starwind UI | https://starwind.dev/docs/getting-started/ |
| Starwind Theme Designer | https://pro.starwind.dev/tools/theme-designer/ |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| Resend | https://resend.com/docs |
| React Email | https://react.email |
| Vercel Dashboard | https://vercel.com/dashboard |
| Google Analytics | https://analytics.google.com |
| Google Search Console | https://search.google.com/search-console |
| Squoosh (image optimiser) | https://squoosh.app |
