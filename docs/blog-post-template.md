# Blog Post Template & How-To

There's no template *inside* `src/content/blog/` on purpose — any `.md` file placed there gets picked up as a real post (see `src/content.config.ts`), so a "TEMPLATE.md" file living in that folder would either publish itself or fail validation. This doc lives outside the collection instead. Copy the template block below into a new file when you want a new post.

## Steps

1. **Copy** the template block below into a new file: `src/content/blog/your-post-slug.md`
   - The filename (minus `.md`) becomes the URL: `your-post-slug.md` → `/blog/your-post-slug`
   - Use lowercase, hyphens, no spaces — matches the existing posts (`waste-management-compliance.md`, `wet-hire-vs-dry-hire.md`, etc.)
2. **Fill in the frontmatter** (the `---` block at the top) — see field reference below.
3. **Write the body** in Markdown underneath the frontmatter.
4. **Preview locally**: `bun run dev`, then visit `http://localhost:4321/blog/your-post-slug`.
5. **Set `published: true`** when it's ready to go live, then commit + push. Draft posts (`published: false`) never appear on `/blog` or build a page, but the file can sit in the repo safely in the meantime.

## Field Reference

| Field | Required? | Notes |
|---|:---:|---|
| `title` | ✅ | Plain text, no quotes needed inside unless the title itself has an apostrophe/colon (then wrap in `'single quotes'`, as shown below) |
| `description` | ✅ | This is the meta description AND the summary shown on the blog listing card. Keep it **under ~155 characters** so it doesn't get truncated in search results |
| `pubDate` | ✅ | ISO format, e.g. `2026-08-15T00:00:00Z`. Controls sort order (newest first) on `/blog` |
| `author` | optional | Defaults to `'Phehlwana Group'` if omitted |
| `coverImage` | optional | Path under `/images/blog/...`. If omitted, a generic placeholder is used. See "Cover images" below |
| `tags` | optional | Array of short keyword strings, e.g. `['plant hire', 'safety']`. Shown as pills on the post and used for "More from the Blog" tag-matching |
| `published` | optional | Defaults to `false`. **Must be `true`** for the post to appear on `/blog` and get a live page |

## Cover Images

Existing posts use branded SVG covers in `public/images/blog/` (icon + gradient, no baked-in text — an earlier version had the title/subtitle drawn into the image itself, which caused it to visually collide with the real page heading; that's been fixed, so don't add text back into any new cover SVG).

If you have a real photo instead, drop it in `public/images/blog/` and reference it as `coverImage: '/images/blog/your-photo.jpg'` — real photography is preferred over the branded SVGs going forward.

## Body / Markdown Notes

- Use `##` (H2) for main sections and `###` (H3) for subsections. **Only H1/H2 show up in the "On this page" table of contents sidebar** — H3s render fine but won't get a TOC entry.
- Standard Markdown works: `**bold**`, bullet/numbered lists, `[link text](/some-path)`.
- To link to the contact form pre-filled with a specific service, use: `[Contact us](/contact?service=Cleaning+%26+Waste+Management)` — the `service` value must match one of the options in the dropdown (see `src/pages/contact.astro`'s `services` array: `Construction & Civil Engineering`, `Road Construction & Maintenance`, `Mechanical Engineering`, `Commercial Cleaning`, `Industrial Cleaning`, `Waste Management`, `Plant Hire`, `Security`, `General Enquiry`) and be URL-encoded (spaces → `+`, `&` → `%26`).
- Reading time is calculated automatically from word count — no field needed.
- "More from the Blog" (related posts at the bottom) picks other posts automatically, prioritising shared tags — no manual linking needed.

---

## Template — copy everything below this line

```markdown
---
title: 'Your Post Title Here'
description: 'One or two sentences summarising the post - this shows on the blog listing card and as the meta description. Keep it under ~155 characters.'
pubDate: 2026-08-15T00:00:00Z
author: 'Phehlwana Group Team'
coverImage: '/images/blog/your-cover-image.svg'
tags: ['tag one', 'tag two', 'South Africa']
published: false
---

Opening paragraph - no heading needed here, this is the intro that appears right under the title.

## First Main Section

Body copy for this section.

### An Optional Subsection

More detail if needed. Subsections don't appear in the table of contents, only H2s do.

## Second Main Section

- A bullet point
- Another bullet point
- **Bold text** for emphasis

## How Phehlwana Group Helps

A short closing section connecting the topic back to your services, then a CTA:

[Contact us](/contact?service=General+Enquiry) to discuss your requirements.
```
