import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Reads content collection frontmatter directly off disk rather than via
// astro:content - the content layer's data store isn't reliably populated
// under a standalone `vitest run` (it depends on a prior dev/build having
// run and Vitest picking up the same node_modules/.astro cache), which made
// these tests flaky across fresh checkouts and CI. Parsing frontmatter is
// deterministic and needs no prior build step.
function parseFrontmatter(filePath: string): Record<string, string> {
  const raw = readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    fields[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return fields;
}

function loadEntries(collection: 'projects' | 'blog') {
  const base = join(process.cwd(), 'src/content', collection);
  return readdirSync(base)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => ({ id: f, ...parseFrontmatter(join(base, f)) }));
}

describe('projects collection', () => {
  const allProjects = loadEntries('projects');
  // schema default for `published` is true - absence means published
  const published = allProjects.filter((p) => p.published !== 'false');

  it('every published project has a cover image', () => {
    expect(published.length).toBeGreaterThan(0);
    for (const project of published) {
      expect(project.coverImage, `${project.id} is missing a coverImage`).toBeTruthy();
    }
  });

  it('has no duplicate project numbers among entries that define one', () => {
    const projectNumbers = allProjects.map((p) => p.projectNo).filter(Boolean);
    expect(new Set(projectNumbers).size).toBe(projectNumbers.length);
  });

  it('every featured project is also published', () => {
    const featured = allProjects.filter((p) => p.featured === 'true');
    for (const project of featured) {
      expect(project.published, `${project.id} is featured but not published`).not.toBe('false');
    }
  });
});

describe('blog collection', () => {
  const allPosts = loadEntries('blog');
  // schema default for `published` is false - absence means unpublished
  const published = allPosts.filter((p) => p.published === 'true');

  it('every published post has a non-empty description', () => {
    expect(published.length).toBeGreaterThan(0);
    for (const post of published) {
      expect(post.description?.trim().length, `${post.id} has an empty description`).toBeGreaterThan(0);
    }
  });
});
