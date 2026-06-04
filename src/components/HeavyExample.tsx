"use client";

/**
 * HeavyExample — a client component with heavy dependencies (charts, maps,
 * rich text editors, etc.) that should NOT block the initial page render.
 *
 * This file is the actual component. In your page you import it via:
 *
 *   import HeavyExample from "@/components/HeavyExample";
 *
 * But in the page file you DON'T import it directly — instead you wrap it
 * in a thin loader (see src/components/HeavyExampleLoader.tsx) that uses
 * next/dynamic so the JS chunk is deferred.
 */

export default function HeavyExample() {
  return (
    <section className="py-24 px-6">
      <p>Heavy component loaded dynamically (client-only)</p>
    </section>
  );
}
