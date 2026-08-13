import { describe, expect, it } from 'vitest';
import { serviceDivisions, serviceLinks, primaryNavLinks, quickLinks } from './navigation';

describe('serviceDivisions', () => {
  it('has exactly 5 divisions', () => {
    expect(serviceDivisions).toHaveLength(5);
  });

  it('has a unique spec-plate code per division', () => {
    const codes = serviceDivisions.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('every code follows the DIV·NN format', () => {
    for (const division of serviceDivisions) {
      expect(division.code).toMatch(/^DIV·\d{2}$/);
    }
  });

  it('every href is a unique /services/* path', () => {
    const hrefs = serviceDivisions.map((s) => s.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/services\//);
    }
  });
});

describe('serviceLinks', () => {
  it('is derived 1:1 from serviceDivisions', () => {
    expect(serviceLinks).toHaveLength(serviceDivisions.length);
    serviceLinks.forEach((link, i) => {
      expect(link.href).toBe(serviceDivisions[i].href);
      expect(link.label).toBe(serviceDivisions[i].division);
    });
  });
});

describe('nav link lists', () => {
  it('primaryNavLinks and quickLinks only point to internal paths', () => {
    for (const link of [...primaryNavLinks, ...quickLinks]) {
      expect(link.href.startsWith('/')).toBe(true);
    }
  });
});
