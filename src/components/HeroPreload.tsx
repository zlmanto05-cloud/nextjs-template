"use client";

/**
 * HeroPreload — emits a responsive <link rel="preload"> into <head> at SSR time.
 *
 * WHY this component exists:
 *   A raw <link rel="preload" imageSrcSet> placed in a Server Component's JSX body
 *   is NOT hoisted to <head> by React 19. It ends up in <body>, discovered late.
 *   ReactDOM.preload() from a "use client" component IS hoisted during SSR,
 *   landing in <head> before the browser parses any <body> content.
 *
 * HOW to use:
 *   1. Replace the src/srcSet paths with your actual hero image paths.
 *   2. Adjust the media breakpoint and sizes to match your <picture> or <img>.
 *   3. Place <HeroPreload /> as the first child of your page's root element.
 *
 * RESULT in <head>:
 *   <link rel="preload" as="image"
 *     fetchpriority="high"
 *     imagesrcset="hero-480w.webp 480w, hero-1280w.webp 1280w"
 *     imagesizes="(max-width: 640px) 480px, 1280px" />
 */

import ReactDOM from "react-dom";

export default function HeroPreload() {
  ReactDOM.preload("/images/hero-480w.webp", {
    as: "image",
    // Responsive srcset: browser picks the right variant per viewport.
    // Mirrors the <source> elements in your <picture> tag exactly.
    imageSrcSet: "/images/hero-480w.webp 480w, /images/hero-1280w.webp 1280w",
    imageSizes: "(max-width: 640px) 480px, 1280px",
    fetchPriority: "high",
  });
  return null;
}
