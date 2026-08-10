# Page Audit: Home `/`

## Summary
The homepage of Phehlwana Group Investments is structurally complete, modern, and visually appealing, establishing a solid corporate identity with its grey-and-blue theme. It includes all essential marketing modules: an auto-rotating hero carousel, a dynamic stats bar, an about overview, a services grid, a trusted client strip, and a featured projects showcase. While the overall page health is good, it currently relies on placeholders for major assets and exhibits critical accessibility and SEO heading hierarchy issues.

---

## Issues Table

| Category | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- |
| **Accessibility** | High | **Hardcoded Empty Alt Tags in Hero**: In `src/pages/index.astro`, the `heroSlides` array defines rich alternative text for each slide image, but the `<Picture>` component hardcodes `alt=''` (line 108). Screen readers will completely ignore these key context-building images. | Replace `alt=''` with `alt={slide.alt}` in the hero slider rendering block. |
| **SEO & Tech** | High | **Multiple `<h1>` Headings**: The template maps each carousel slide to an `<h1>` tag (line 123), resulting in three `<h1>` tags rendered in the DOM. This violates SEO best practices and confuses screen readers. | Change the slide headings to `<h2>` (styled identically) and place a single, descriptive, static `<h1>` at the top of the main layout or the first slide. |
| **Performance** | High | **Redundant Image Preloads in Layout**: In `Layout.astro`, both `/images/hero/carousel-2.webp` and `/images/hero/carousel-2.png` are preloaded with high priority. This forces browsers to download both versions, wasting critical load-blocking bandwidth. | Remove the PNG preload. Only preload the high-performance WebP version: `/images/hero/carousel-2.webp`. |
| **UX / A11y** | Medium | **Carousel Auto-Rotation Controls**: The hero carousel auto-rotates every 5 seconds but does not stop on mouse hover, key focus, or offer pause controls, violating WCAG 2.1 guideline 2.2.2 (Pause, Stop, Hide). | Update the carousel script to clear the interval on `mouseenter` or `focusin`, and resume on `mouseleave` or `focusout`. |
| **Content** | Medium | **Chronological Inconsistency**: The page proudly claims "Building South Africa Since 2015", which is factually true for founding, but fails to mention the 2020 re-registration and restructuring. | Add a brief sentence in the About snap-shot text explaining the 2020 transition to Phehlwana Group Investments to ensure legal transparency. |
| **UX / UI** | Low | **Redundant Trust Blocks**: The "Stats Bar" and "Trust Strip" are placed very close to one another and present overlapping info (e.g. Level 1 BBBEE, 10+ Years in Business). | Merge the trust items into the stats bar or visually differentiate the trust strip more, perhaps by using client logos or cert icons. |

---

## Prioritized Action List

### Quick Wins (Easy & Immediate)
1. **Fix Alt Text Binding**: Change `alt=''` to `alt={slide.alt}` in [src/pages/index.astro](file:///d:/websites/phehlwana-group-investments/src/pages/index.astro#L108).
2. **Correct Preload Bottleneck**: Remove the PNG preload link from [src/layouts/Layout.astro](file:///d:/websites/phehlwana-group-investments/src/layouts/Layout.astro#L103-L108).
3. **Fix Heading Hierarchy**: Change slide headings to `<h2>` in `index.astro` and place a single static `<h1>` (e.g. wrapping the logo or hidden off-screen for accessibility/SEO).

### Larger Fixes (Require Development/Client Input)
1. **Interactive Carousel Controls**: Modify the inline script in `index.astro` to support pause-on-hover/focus and swipe gestures for mobile users.
2. **Client Content Acquisition**: Replace old-site placeholder carousel slides (like `carousel-2.png`) and the About site image (`about-site.jpg`) with professional photography of real Phehlwana Group projects.

---

## Code Snippet

### Hardcoded Empty Alt Bug in `src/pages/index.astro`
```astro
<!-- Line 105-116: Picture component ignores slide.alt -->
<div class='absolute inset-0'>
    <Picture
        src={slide.image}
        alt=''  <!-- BUG: Hardcoded empty alt -->
        width={1920}
        height={800}
        loading={i === 0 ? 'eager' : 'lazy'}
        decoding='async'
        class='w-full h-full object-cover'
    />
    <div class='absolute inset-0 bg-neutral-950/65'></div>
</div>
```
