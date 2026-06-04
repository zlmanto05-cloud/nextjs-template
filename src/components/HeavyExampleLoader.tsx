"use client";

/**
 * HeavyExampleLoader — thin wrapper that lazy-loads HeavyExample.
 *
 * WHY ssr:false requires "use client":
 *   Next.js 16 does not allow `ssr: false` in Server Components.
 *   This file must be "use client" for the option to work.
 *
 * PATTERN:
 *   - HeavyExample.tsx  → the real component (large deps, "use client")
 *   - HeavyExampleLoader.tsx → this file, thin wrapper with dynamic()
 *   - page.tsx          → imports HeavyExampleLoader, NOT HeavyExample directly
 *
 * The JS chunk for HeavyExample is excluded from the initial HTML payload.
 * It downloads after the page is interactive, in the background.
 *
 * INLINE BASE64 WARNING:
 *   If HeavyExample (or any component) contains base64-encoded assets
 *   (logos, images, fonts), extract them to public/ and reference by path.
 *   A single 96KB base64 string inflates the JS chunk by ~128KB raw.
 */

import dynamic from "next/dynamic";

const HeavyExample = dynamic(() => import("@/components/HeavyExample"), {
  ssr: false,
  loading: () => (
    <section className="py-24 px-6 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded" />
    </section>
  ),
});

export default function HeavyExampleLoader() {
  return <HeavyExample />;
}
