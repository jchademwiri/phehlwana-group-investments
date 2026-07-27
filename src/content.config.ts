import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title:        z.string(),
    projectNo:    z.string().optional(),
    description:  z.string().optional(),
    scopeOfWorks: z.string().optional(),
    client:       z.string().optional(),
    location:     z.string(),
    duration:     z.string().optional(),
    year:         z.number(),
    category:     z.enum(['Construction', 'Mechanical', 'Cleaning', 'Plant Hire', 'Road', 'Security']),
    coverImage:   z.string(),
    images:       z.array(z.string()).optional(),
    featured:     z.boolean().default(false),
    published:    z.boolean().default(true),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    author:      z.string().default('Phehlwana Group'),
    coverImage:  z.string().optional(),
    tags:        z.array(z.string()).default([]),
    published:   z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
