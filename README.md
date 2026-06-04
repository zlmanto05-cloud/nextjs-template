# nextjs-template

Next.js 16 + React 19 starter with production performance defaults baked in.

## Stack

- Next.js 16 (Turbopack, App Router)
- React 19
- TypeScript
- Tailwind CSS v4

---

## Performance checklist

### Images

- [ ] Hero image uses `<picture>` + `<source media>` for art direction (different crops per viewport, not just resolution)
- [ ] `<HeroPreload />` is the first child of the page — emits responsive `<link rel="preload">` into `<head>` via `ReactDOM.preload()`
- [ ] Hero `<img>` has `fetchPriority="high"` and `loading="eager"`
- [ ] `srcSet` breakpoints in `<HeroPreload>` match the `<source media>` breakpoints exactly
- [ ] Images in `public/` are WebP or AVIF — no inline base64 in JS (each 96KB base64 = ~128KB raw in the bundle)
- [ ] Logo and above-the-fold images use `next/image` with `preload` prop (not the deprecated `priority`)

### Fonts

- [ ] All fonts use `next/font/google` — no `@import url('https://fonts.googleapis.com/...')` in CSS or `<style>` tags
- [ ] `font-display: swap` is set (default in `next/font`)
- [ ] Only the weights you actually use are loaded

### JavaScript

- [ ] Heavy client components (charts, maps, editors, survey forms) use `dynamic()` + `ssr: false` via a loader file
- [ ] No large assets (images, PDFs, data files) embedded as base64 inside components
- [ ] `framer-motion`: use `LazyMotion` + `domAnimation` — never import the full bundle
- [ ] Third-party scripts use `<Script strategy="afterInteractive">` or `strategy="lazyOnload"`

### LCP

- [ ] The LCP candidate (usually the hero image or the largest above-the-fold text) is identifiable in DevTools → Performance → LCP
- [ ] The LCP element does **not** start with `opacity: 0` — avoid `fade-in + fill-mode-backwards` on the LCP candidate; Chrome excludes invisible elements from LCP measurement
- [ ] TTFB < 600ms — check with `curl -o /dev/null -s -w "%{time_starttransfer}\n" https://yoursite.com`

### Build audit

Run after every significant dependency change:

```bash
next build
# Check chunk sizes in .next/static/chunks/
# Target: no page-specific chunk > 50KB gz
```

Key chunks to watch:

| Chunk type | Expected | Warning threshold |
|---|---|---|
| Next.js runtime (shared) | ~70K gz | — |
| Per-page component | < 30K gz | > 50K gz |
| Third-party lib (framer, etc.) | deferred | loaded on all pages |

### Cache headers

`next.config.ts` already sets:

```
/_next/static/(*) → Cache-Control: public, max-age=31536000, immutable
/fonts/(*)        → Cache-Control: public, max-age=31536000, immutable
```

---

## Key files

| File | Purpose |
|---|---|
| `next.config.ts` | Image optimization (AVIF/WebP), compression, cache headers |
| `src/app/layout.tsx` | `next/font` setup — fonts served from `/_next/static/` |
| `src/components/HeroPreload.tsx` | Responsive `ReactDOM.preload()` — puts hint in `<head>` |
| `src/components/HeavyExampleLoader.tsx` | `dynamic()` + `ssr: false` pattern for heavy components |

---

## Why `ReactDOM.preload()` instead of `<link rel="preload">`

A `<link rel="preload" imageSrcSet="...">` placed in a Server Component's JSX body
is **not** hoisted to `<head>` by React 19 — it stays in `<body>`, discovered late.

`ReactDOM.preload()` called during render in a `"use client"` component **is** emitted
into `<head>` during SSR, visible to the browser's preload scanner from the first byte.

```tsx
// ✗ Stays in <body> — browser discovers it too late
<link rel="preload" as="image" imageSrcSet="..." />

// ✓ Lands in <head> — browser sees it immediately
ReactDOM.preload("/hero-480w.webp", {
  as: "image",
  imageSrcSet: "/hero-480w.webp 480w, /hero-1280w.webp 1280w",
  imageSizes: "(max-width: 640px) 480px, 1280px",
  fetchPriority: "high",
});
```

---

## Getting started

```bash
npm install
npm run dev
```
