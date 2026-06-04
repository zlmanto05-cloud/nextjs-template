import HeroPreload from "@/components/HeroPreload";
import HeavyExample from "@/components/HeavyExample";

export default function Home() {
  return (
    <main>
      {/*
        HeroPreload emits a <link rel="preload"> into <head> via ReactDOM.preload().
        Place it as the first child so it appears early in the SSR stream.
      */}
      <HeroPreload />

      {/* Hero section — LCP element */}
      <section className="relative min-h-screen flex items-center">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/images/hero-480w.webp"
            sizes="480px"
            type="image/webp"
          />
          <source
            media="(min-width: 641px)"
            srcSet="/images/hero-1280w.webp"
            sizes="1280px"
            type="image/webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-1280w.webp"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
        </picture>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/*
            No fade-in on the LCP text candidate.
            opacity:0 + fill-mode-backwards delays Chrome's LCP measurement.
            Use slide-in without opacity if you need entrance animation.
          */}
          <h1 className="text-5xl font-serif text-white">
            Your headline here
          </h1>
        </div>
      </section>

      {/*
        HeavyExample is a client component loaded with ssr:false.
        Its JS chunk won't block the initial page render.
      */}
      <HeavyExample />
    </main>
  );
}
