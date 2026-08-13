import { describe, expect, it } from 'vitest';
import { getCollection } from 'astro:content';

describe('projects collection', () => {
  it('every published project has a cover image', async () => {
    const projects = await getCollection('projects', ({ data }) => data.published);
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.data.coverImage, `${project.id} is missing a coverImage`).toBeTruthy();
    }
  });

  it('has no duplicate project numbers among entries that define one', async () => {
    const projects = await getCollection('projects');
    const projectNumbers = projects
      .map((p) => p.data.projectNo)
      .filter((n): n is string => Boolean(n));
    expect(new Set(projectNumbers).size).toBe(projectNumbers.length);
  });

  it('every featured project is also published', async () => {
    const projects = await getCollection('projects', ({ data }) => data.featured);
    for (const project of projects) {
      expect(project.data.published, `${project.id} is featured but not published`).toBe(true);
    }
  });
});

describe('blog collection', () => {
  it('every published post has a non-empty description', async () => {
    const posts = await getCollection('blog', ({ data }) => data.published);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.data.description.trim().length, `${post.id} has an empty description`).toBeGreaterThan(0);
    }
  });
});
