// ─────────────────────────────────────────────────────────────────────────────
// Navigation data - single source of truth for all links used in Header,
// Footer, and any other component that needs site navigation.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceDivision {
  division: string;
  href: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
}

// ── Primary nav links (used in Header & mobile menu) ─────────────────────────
export const primaryNavLinks: NavLink[] = [
  { label: 'Home',     href: '/'        },
  { label: 'About',    href: '/about'   },
  // Services is handled separately via the dropdown
  { label: 'Projects', href: '/projects' },
  { label: 'Blog',     href: '/blog'    },
  { label: 'Contact',  href: '/contact' },
];

// ── Quick links (used in Footer) ──────────────────────────────────────────────
export const quickLinks: NavLink[] = [
  { label: 'Home',     href: '/'        },
  { label: 'About Us', href: '/about'   },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog',     href: '/blog'    },
  { label: 'Contact',  href: '/contact' },
];

// ── Footer legal / bottom-bar links ──────────────────────────────────────────
// Add links here once the corresponding pages exist (e.g. Privacy Policy, Terms)
export const legalLinks: NavLink[] = [
  { label: 'Privacy & POPIA Policy', href: '/privacy-policy' },
];

// ── Developer / agency credit ─────────────────────────────────────────────────
export const developer = {
  name: 'Apex Web Solutions',
  href: 'https://www.apexwebsolutions.co.za/',
  external: true,
};

// ── Service divisions - dropdown menu data ────────────────────────────────────
// Items removed: service pages are placeholders with no anchor sections yet.
// Re-add items per division once the service pages have real content with IDs.
export const serviceDivisions: ServiceDivision[] = [
  {
    division:    'Construction & Civil Engineering',
    href:        '/services/construction',
    description: 'Building, roads, renovations & safety management',
  },
  {
    division:    'Mechanical Engineering',
    href:        '/services/mechanical',
    description: 'Design, manufacturing, maintenance & commissioning',
  },
  {
    division:    'Cleaning & Waste Management',
    href:        '/services/cleaning',
    description: 'Commercial, industrial & hazardous waste solutions',
  },
  {
    division:    'Plant Hire',
    href:        '/services/plant-hire',
    description: 'Heavy equipment rental for construction & industry',
  },
  {
    division:    'Security',
    href:        '/services/security',
    description: 'Guarding, access control & risk management solutions',
  },
];

// ── Flat service links derived from divisions (used in Footer & mobile nav) ───
export const serviceLinks: NavLink[] = serviceDivisions.map((s) => ({
  label: s.division,
  href:  s.href,
}));

// ── Social media links ────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: 'Follow us on Facebook',  href: '#' },
  { label: 'Follow us on Instagram', href: '#' },
  { label: 'Connect on LinkedIn',    href: '#' },
  { label: 'Chat on WhatsApp', href: 'https://wa.me/27792947635', external: true },
];
