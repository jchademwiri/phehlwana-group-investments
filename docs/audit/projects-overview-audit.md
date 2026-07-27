# Page Audit: Projects Portfolio Overview `/projects`

## Summary
The Projects Portfolio page presents a structured gallery sorted by featured status and year. It incorporates a functional client-side JavaScript category filter that handles state changes using proper accessibility labels (`aria-pressed`) and includes an empty state announcement (`aria-live`). While technically solid, the portfolio suffers from a severe content deficit: only 4 projects exist, two categories (Mechanical and Security) have zero projects, and all descriptions are placeholder copy.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Content** | Critical | **Empty Portfolio Categories**: There are zero projects published for the Mechanical and Security categories. If a user clicks these filters, they receive an empty state message, undermining the company's claim of equal capability. | Work with the client to acquire details for at least 1-2 projects in the Mechanical and Security divisions. |
| **Content** | High | **Placeholder Text in Collections**: The actual text in the Markdown files for the 4 published projects is filled with lorem-ipsum-style developer notes and generic descriptions. | Replace all project markdown descriptions with real project summaries, including client names, durations, and scopes of work. |
| **Content** | High | **Low Project Count**: The client requested 5-10 projects, but only 4 are currently implemented. | Request 3-5 additional projects from the client to establish a robust track record. |
| **SEO / Tech** | Medium | **Geographic Focus**: The header subtitle and meta description still limit scope to "Pretoria and Gauteng", whereas the client services "nationally". | Update metadata in [src/pages/projects/index.astro](file:///d:/websites/phehlwana-group-investments/src/pages/projects/index.astro#L30) to mention "projects completed nationally across South Africa". |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Expand SEO Reach**: Modify subtitle and meta description in `projects/index.astro` to say "delivered nationally across South Africa".

### Larger Fixes (Require Development/Client Input)
1. **Gather Case Studies**: Request a structured project sheet from the client for 5-10 completed projects. Specifically demand at least one project for Mechanical Engineering and one for Security.
2. **Re-write Markdown Files**: Replace placeholder content in the `src/content/projects/` directory with the new case studies.
