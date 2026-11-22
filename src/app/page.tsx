import Image from "next/image";
import Reveal from "@/components/landing/Reveal";
import BeforeAfter from "@/components/landing/BeforeAfter";
import Services from "@/components/landing/Services";
import Faq from "@/components/landing/Faq";
import CountUp from "@/components/landing/CountUp";
import MobileBar from "@/components/landing/MobileBar";
import WaButton from "@/components/landing/WaButton";
import Footer from "@/components/Footer";

const HERO_WORDS = ["Tus", "tenis,", "como", "recién", "salidos", "de", "la", "caja"];

const MARQUEE = ["Nike", "Jordan", "On Cloud", "New Balance", "Adidas", "Botas de piel", "Mochilas", "Gorras", "Bolsas de lujo", "Gamuza", "Nubuck", "Mesh"];

const STEPS = [
  { n: "01", title: "Déjalos", desc: "En sucursal o en el cubículo QR de tu Anytime Fitness." },
  { n: "02", title: "Los limpiamos", desc: "Según su material. En piezas premium te mandamos foto de cómo llegaron." },
  { n: "03", title: "Recógelos", desc: "En 48 horas, impecables. Te avisamos por WhatsApp." },
];

const WHY = [
  { title: "Por material, no por marca", desc: "Piel, gamuza, mesh o nubuck: cada uno con su producto y su técnica.", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" },
  { title: "Foto de estado", desc: "Registramos cómo llega tu pieza. Obligatoria en premium, mochilas de lujo y bolsas de piel.", icon: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 100-8 4 4 0 000 8z" },
  { title: "Listos en 48 h", desc: "Sin agendar, sin filas. Te avisamos cuando estén.", icon: "M12 7v5l3 2M12 21a9 9 0 110-18 9 9 0 010 18z" },
  { title: "5 puntos en Villahermosa", desc: "Matriz Usumacinta, Deportiva y tres Anytime Fitness.", icon: "M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" },
];

const MAIN_BRANCHES = [
  {
    tag: "Matriz",
    name: "Usumacinta",
    address: "Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB",
    hours: "Lun–Vie 7–20 h · Sáb 8–18 h · Dom 9–14 h",
    img: "/img/mapa-usumacinta.webp",
    url: "https://maps.google.com/?q=Av.+Paseo+Usumacinta+esquina+Av.+Los+Rios+Plaza+KB+Villahermosa+Tabasco",
  },
  {
    tag: "Sucursal",
    name: "Ciudad Deportiva",
    address: "Plaza Mega Soriana, junto a Telcel, entrada a Anytime Fitness",
    hours: "Lun–Vie 8–20 h · Sáb 8–16 h",
    img: "/img/mapa-deportiva.webp",
    url: "https://maps.google.com/?q=Velódromo+Ciudad+Deportiva+Plaza+Mega+Soriana+Villahermosa+Tabasco",
  },
];

const GYMS = [
  { name: "Anytime Fitness Deportiva", url: "https://maps.google.com/?q=Anytime+Fitness+Ciudad+Deportiva+Villahermosa" },
  { name: "Anytime Fitness Loma Linda", url: "https://maps.google.com/?q=Anytime+Fitness+Loma+Linda+Villahermosa" },
  { name: "Anytime Fitness Mallorca", url: "https://maps.google.com/?q=Anytime+Fitness+Mallorca+Villahermosa" },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-[var(--yellow)]" : "text-black/50"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)]" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ① HERO */}
      <section className="relative bg-[var(--paper)] pb-16 pt-28 md:pb-24 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[var(--yellow)] opacity-20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 h-[380px] w-[380px] rounded-full bg-white opacity-80 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="fade-in mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/70" style={{ animationDelay: "0ms" }}>
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--yellow)] opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--yellow)]" /></span>
              Cuidado de sneakers · Villahermosa
            </p>
            <h1 className="font-display text-[3.4rem] uppercase leading-[0.88] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {HERO_WORDS.map((w, i) => (
                <span key={i} className="word-up mr-[0.22em] last:mr-0">
                  <span style={{ animationDelay: `${150 + i * 70}ms` }} className={i >= 3 && i <= 4 ? "text-[var(--yellow)] [-webkit-text-stroke:1.5px_#0B0B0B] md:[-webkit-text-stroke:2px_#0B0B0B]" : ""}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="fade-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/60 md:text-lg" style={{ animationDelay: "800ms" }}>
              Limpieza por material, no por marca. Tenis, botas, mochilas, gorras y bolsas, listos en 48 horas.
            </p>
            <div className="fade-in mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "950ms" }}>
              <WaButton
                text="Hola, quiero cotizar la limpieza de mis tenis"
                medium="hero"
                className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Cotiza por WhatsApp
              </WaButton>
              <a href="#servicios" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-8 py-4 text-base font-semibold transition-colors hover:border-black sm:w-auto">
                Ver precios
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
              </a>
            </div>
          </div>

          <div className="fade-in relative mx-auto mt-12 max-w-5xl md:mt-16" style={{ animationDelay: "1100ms" }}>
            <BeforeAfter
              before="/img/antes-1.png"
              after="/img/despues-1-hd.jpg"
              alt="Tenis Boss de piel"
              intro
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="aspect-[4/3] rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] md:aspect-[16/9] md:rounded-[36px]"
            />
            <div className="float absolute -left-3 bottom-8 hidden rounded-2xl bg-white px-4 py-3 shadow-xl md:block">
              <p className="font-display text-3xl leading-none">48 h</p>
              <p className="text-xs text-black/50">y listos</p>
            </div>
            <div className="float absolute -right-3 top-10 hidden rounded-2xl bg-black px-4 py-3 text-white shadow-xl md:block" style={{ animationDelay: "-3s" }}>
              <p className="text-xs text-white/60">Incluido</p>
              <p className="text-sm font-bold">Foto de estado</p>
            </div>
            <p className="mt-4 text-center text-sm text-black/45">Arrastra para ver el cambio</p>
          </div>
        </div>
      </section>

      {/* ② NÚMEROS */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4 md:px-10 md:py-14">
          {[
            { v: <CountUp to={5} />, l: "puntos de recepción" },
            { v: <CountUp to={48} suffix=" h" />, l: "tiempo de entrega" },
            { v: <CountUp to={7} />, l: "días a la semana" },
            { v: <><CountUp to={5} /> tipos</>, l: "tenis, botas, mochilas, gorras y bolsas" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 90} className="text-center md:border-l md:border-black/10 md:first:border-l-0">
              <p className="font-display text-5xl leading-none md:text-6xl">{s.v}</p>
              <p className="mx-auto mt-2 max-w-[11rem] text-sm text-black/50">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ③ MARQUEE */}
      <section aria-hidden className="overflow-hidden bg-black py-5">
        <div className="marquee">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center font-display text-3xl uppercase text-white md:text-4xl">
              <span className="px-6">{m}</span>
              <span className="text-[var(--yellow)]">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ④ SERVICIOS */}
      <section id="servicios" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div>
              <Eyebrow>Servicios y precios</Eyebrow>
              <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">¿Qué nos<br />vas a traer?</h2>
            </div>
            <p className="max-w-sm text-black/55">Elige la categoría y toca la tarjeta: te abrimos WhatsApp con el mensaje listo para cotizar.</p>
          </Reveal>
          <Reveal delay={100}><Services /></Reveal>

          <Reveal delay={150} className="mt-10 rounded-3xl bg-[var(--paper)] p-6 md:p-8">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-black/50">Agrégale</p>
            <div className="flex flex-wrap gap-2">
              {[["Impermeabilizar", 90], ["Desodorizar", 60], ["Crema protectora", 70], ["Agujetas nuevas", 50]].map(([n, p]) => (
                <span key={n} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium">
                  {n} <span className="font-bold">+${p}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ⑤ RESULTADOS */}
      <section id="resultados" className="bg-[var(--paper)] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-10 text-center md:mb-14">
            <Eyebrow>Resultados reales</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">Antes y después</h2>
          </Reveal>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {[
              { b: "/img/antes-1.png", a: "/img/despues-1-hd.jpg", name: "Boss · piel", svc: "Premium lujo" },
              { b: "/img/antes-2.png", a: "/img/despues-2-hd.jpg", name: "On Cloud · mesh", svc: "On Cloud / Trail" },
              { b: "/img/antes-3.png", a: "/img/despues-3-hd.jpg", name: "New Balance · gamuza", svc: "Premium lujo" },
            ].map((r, i) => (
              <Reveal key={r.b} delay={i * 120} className="w-[85%] shrink-0 snap-center md:w-auto">
                <BeforeAfter before={r.b} after={r.a} alt={r.name} className="aspect-[5/4] rounded-3xl" />
                <div className="mt-4 flex items-center justify-between px-1">
                  <p className="font-semibold">{r.name}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/60">{r.svc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ PROCESO */}
      <section id="proceso" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-12 md:mb-16">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">Tres pasos.<br />Cero filas.</h2>
          </Reveal>
          <Reveal className="relative">
            <div aria-hidden className="draw-line absolute left-0 right-0 top-7 hidden h-[3px] bg-[var(--yellow)] md:block" />
            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-5 md:block">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black font-display text-2xl text-[var(--yellow)] ring-8 ring-white">{s.n}</span>
                  <div className="md:mt-6">
                    <h3 className="font-display text-3xl uppercase">{s.title}</h3>
                    <p className="mt-2 max-w-xs text-black/55">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ⑦ GYM (bloque oscuro) */}
      <section className="px-3 md:px-6">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-black px-6 py-16 text-white md:rounded-[44px] md:px-16 md:py-24">
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[var(--yellow)] opacity-25 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <Eyebrow light>Exclusivo socios Anytime Fitness</Eyebrow>
              <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
                Entrenas tú.<br /><span className="text-[var(--yellow)]">Los limpiamos nosotros.</span>
              </h2>
              <p className="mt-6 max-w-md text-white/60">
                Al llegar a tu Anytime de Deportiva, Loma Linda o Mallorca, deja tus tenis en el cubículo con candado QR. Mándanos WhatsApp y nos encargamos del resto.
              </p>
              <WaButton
                text="Hola, soy socio de Anytime Fitness y quiero dejar mis tenis en el cubículo QR"
                medium="bloque-gym"
                className="btn-shine mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--yellow)] px-8 py-4 font-bold text-black transition-transform hover:scale-[1.03]"
              >
                Quiero usarlo
              </WaButton>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["1", "Llegas al gym"], ["2", "Cubículo QR"], ["3", "WhatsApp"], ["4", "Listos en 48 h"]].map(([n, t], i) => (
                <div key={n} className="float rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur" style={{ animationDelay: `${-i * 1.4}s` }}>
                  <p className="font-display text-4xl text-[var(--yellow)]">{n}</p>
                  <p className="mt-1 text-sm font-semibold">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ⑧ POR QUÉ */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-12 text-center">
            <Eyebrow>Por qué Mis Papos</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">Cuidado de verdad</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 100} className="group rounded-3xl border border-black/5 bg-[var(--paper)] p-7 transition-colors duration-300 hover:bg-[var(--yellow-soft)]">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-[var(--yellow)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={w.icon} /></svg>
                </span>
                <h3 className="text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑨ FAQ */}
      <section id="faq" className="bg-[var(--paper)] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_1.6fr] md:px-10">
          <Reveal>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-6xl">Lo que nos<br />preguntan</h2>
            <p className="mt-5 max-w-xs text-black/55">¿Tienes otra duda? Escríbenos y te contestamos en minutos.</p>
          </Reveal>
          <Reveal delay={100}><Faq /></Reveal>
        </div>
      </section>

      {/* ⑩ SUCURSALES */}
      <section id="sucursales" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-12">
            <Eyebrow>Puntos de recepción</Eyebrow>
            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">5 puntos en<br />Villahermosa</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {MAIN_BRANCHES.map((b, i) => (
              <Reveal key={b.name} delay={i * 120} as="article" className="group overflow-hidden rounded-3xl border border-black/10">
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="relative block h-44 overflow-hidden bg-[var(--paper)]">
                  <Image src={b.img} alt={`Mapa ${b.name}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </a>
                <div className="p-6 md:p-7">
                  <span className="rounded-full bg-[var(--yellow)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{b.tag}</span>
                  <h3 className="mt-3 font-display text-4xl uppercase">{b.name}</h3>
                  <p className="mt-2 text-sm text-black/60">{b.address}</p>
                  <p className="mt-1 text-sm text-black/45">{b.hours}</p>
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]">
                    Cómo llegar
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {GYMS.map((g, i) => (
              <Reveal key={g.name} delay={i * 90}>
                <a href={g.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl bg-[var(--paper)] px-5 py-4 transition-colors hover:bg-[var(--yellow-soft)]">
                  <div>
                    <p className="font-semibold">{g.name}</p>
                    <p className="text-xs text-black/50">Cubículo con candado QR · socios</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑪ CTA FINAL */}
      <section className="relative overflow-hidden bg-[var(--yellow)] py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[
            [8, 40, 0, 9], [18, 22, 3, 11], [30, 60, 1.5, 13], [45, 18, 5, 10], [58, 34, 2.5, 12],
            [70, 52, 0.8, 14], [82, 26, 4, 9], [92, 44, 6, 12],
          ].map(([l, s, d, t], i) => (
            <span key={i} className="bubble" style={{ left: `${l}%`, width: s, height: s, animationDelay: `${d}s`, animationDuration: `${t}s` }} />
          ))}
        </div>
        <Reveal className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-6xl uppercase leading-[0.88] md:text-8xl">Tus tenis merecen<br />otra vida</h2>
          <p className="mx-auto mt-6 max-w-md text-black/70">Mándanos una foto por WhatsApp y te decimos el precio exacto.</p>
          <WaButton
            text="Hola, te mando foto de mis tenis para cotizar"
            medium="cta-final"
            className="btn-shine mt-9 inline-flex items-center gap-2 rounded-full bg-black px-10 py-5 text-lg font-bold text-white transition-transform hover:scale-[1.04]"
          >
            Cotizar ahora
          </WaButton>
        </Reveal>
      </section>

      <Footer />
      <MobileBar />
    </main>
  );
}
