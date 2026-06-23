"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Constants ─────────────────────────────────────────────────────────
const WA_BASE = "https://wa.me/529931000000";
function waUrl(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

// ── Scroll reveal hook ────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Shared components ─────────────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.337-1.514A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.003-1.367l-.358-.213-3.76.898.944-3.653-.234-.375A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
    </svg>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────
const brands = ["Nike", "Adidas", "Jordan", "On Cloud", "New Balance", "Hugo Boss"];

const testimonials = [
  {
    before: "/img/antes-1.webp",
    after: "/img/despues-1.webp",
    text: "Increíble el trabajo con mis Jordan 1. Pensé que ya no tenían salvación después de 2 años de uso intensivo en el gym. Quedaron impecables.",
    name: "Carlos Méndez",
    role: "Dueño de 12 pares",
    initial: "C",
  },
  {
    before: "/img/antes-2.webp",
    after: "/img/despues-2.webp",
    text: "Mis On Cloud blancos estaban amarillentos de tanto entrenar. El equipo hizo magia, ahora lucen como si los acabara de comprar.",
    name: "Ana Rodríguez",
    role: "Runner · 5K semanal",
    initial: "A",
  },
  {
    before: "/img/antes-3.webp",
    after: "/img/despues-3.webp",
    text: "Tenía miedo de que arruinaran la gamuza de mis New Balance de trail. El resultado superó mis expectativas. Profesionales de verdad.",
    name: "Miguel Torres",
    role: "Miembro gym · Sneakerhead",
    initial: "M",
  },
];

const memberships = [
  {
    name: "Básico",
    price: "$229",
    saving: "ahorro $21",
    desc: "1 lavado básico mensual + desodorización",
    popular: false,
    gold: false,
  },
  {
    name: "Active",
    price: "$369",
    saving: "ahorro $101",
    desc: "2 lavados + impermeabilización incluida",
    popular: true,
    gold: false,
  },
  {
    name: "White",
    price: "$449",
    saving: "ahorro $61",
    desc: "Ultra white + 1 lavado básico adicional",
    popular: false,
    gold: false,
  },
  {
    name: "VIP",
    price: "$680",
    saving: "ahorro $129",
    desc: "Premium lujo + gorra + entrega prioritaria",
    popular: false,
    gold: true,
  },
];

const faqs = [
  {
    q: "¿Cuánto tiempo tarda el servicio?",
    a: "Nuestro servicio estándar tiene entrega en 48 horas hábiles. Si necesitas tus tenis con urgencia, ofrecemos servicio express de 24 horas con un cargo adicional de $100 MXN.",
  },
  {
    q: "¿Limpian todo tipo de materiales?",
    a: "Sí, somos especialistas en todos los materiales: piel lisa, piel sintética, gamuza, nobuck, mesh, flyknit, primeknit y materiales técnicos. Cada material requiere productos y técnicas específicas que dominamos.",
  },
  {
    q: "¿Qué pasa si mis tenis se dañan?",
    a: "Documentamos el estado de cada par con fotografías al momento de la recepción. No nos hacemos responsables por daños preexistentes, materiales desgastados o calzado de imitación. Te recomendamos informarnos sobre el material y la antigüedad del calzado al momento de entregarlo.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Contamos con dos puntos de recepción en Villahermosa: Tintorería Max Plaza Usumacinta (Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB) y Mega Plaza Deportiva (Velódromo Ciudad Deportiva, junto a Telcel, entrada Anytime Fitness). Abiertos de lunes a domingo.",
  },
  {
    q: "¿Pueden quitar manchas difíciles?",
    a: "Nuestro servicio de Limpieza Profunda incluye tratamiento especializado anti-manchas. Hemos removido exitosamente manchas de lodo, aceite, pintura y bebidas. Evaluamos cada caso individualmente.",
  },
  {
    q: "¿Ofrecen servicio para empresas o tiendas?",
    a: "Sí, tenemos planes corporativos para tiendas de sneakers, coleccionistas y empresas. Contáctanos para cotización personalizada con descuentos por volumen.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pixelFiredRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (pixelFiredRef.current) return;
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= 0.5) {
        track("ViewContent");
        pixelFiredRef.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const plans = [
    {
      name: "Lavado Básico",
      price: "$190 MXN",
      subtitle: null as string | null,
      features: [
        "Cepillado en seco",
        "Limpieza exterior con shampoo especializado",
        "Limpieza de suela con cepillo medianas",
        "Blanqueamiento básico de bordes",
        "Limpieza de agujetas incluida",
      ],
      waText: "Hola, me interesa el Lavado Básico $190 MXN",
      pixelName: "Lavado Basico",
      variant: "outline" as const,
    },
    {
      name: "Limpieza Profunda",
      price: "$220 MXN",
      subtitle: "On Cloud / Trail / Performance" as string | null,
      features: [
        "Cepillado suave con cerdas específicas para mesh técnico y foam",
        "Productos libres de solventes compatibles con EVA, CloudTec y materiales reactivos",
        "Limpieza de canales y celdas de foam sin comprometer la estructura",
        "Limpieza de suela de alto agarre trail y performance",
        "Limpieza de agujetas incluida",
      ],
      waText: "Hola, me interesa la Limpieza Profunda $220 MXN",
      pixelName: "Limpieza Profunda",
      variant: "blue" as const,
    },
    {
      name: "Limpieza Premium",
      price: "$399 MXN",
      subtitle: null as string | null,
      features: [
        "Limpiador específico por material: cuero, gamuza o materiales mixtos",
        "Cepillado con herramientas de cerdas suaves para superficies delicadas",
        "Aplicación de acondicionador para cuero y piel",
        "Limpieza de suelas y cantos",
      ],
      waText: "Hola, me interesa la Limpieza Premium $399 MXN",
      pixelName: "Limpieza Premium",
      variant: "dark" as const,
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      <Navbar />

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src="/img/hero-bg.webp"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1526]/92 via-[#0d1526]/65 to-transparent" />
        </div>

        {/* Content — vertically centered, left half */}
        <div className="relative flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <div className="w-full md:max-w-[55%]">
              <p className="text-white/55 text-xs font-bold uppercase tracking-widest mb-5">
                Limpieza profesional de sneakers · Villahermosa, Tabasco
              </p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-none mb-4">
                TUS TENIS FAVORITOS,<br />
                COMO RECIÉN SALIDOS<br />
                DE LA CAJA
              </h1>
              {/* Blue accent line */}
              <div className="w-12 h-1 bg-[#3b55f5] mb-6" />
              {/* Two highlight lines */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-2">
                Resultados en{" "}
                <span className="bg-[#3b55f5] text-white px-1.5 py-0.5 font-bold">48 horas garantizadas</span>
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Desde{" "}
                <span className="bg-[#3b55f5] text-white px-1.5 py-0.5 font-bold">$190 MXN</span>
                {" "}· Dos sucursales en Villahermosa
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar — sticks to bottom of hero */}
        <div className="relative bg-[#0d1526]/90 backdrop-blur-sm py-4 md:py-5">
          <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3 items-center">
              <a
                href="#cta"
                onClick={() => track("ViewContent")}
                className="inline-flex items-center gap-2 bg-[#3b55f5] text-white font-bold px-7 py-3 hover:bg-[#2a44e4] transition-colors text-sm uppercase tracking-wide"
              >
                Agendar Limpieza Ahora
              </a>
              <span className="text-white/55 text-sm">✓ Primera limpieza con 20% de descuento</span>
            </div>
            <div className="hidden sm:flex gap-5 text-white/35 text-xs uppercase tracking-widest">
              <span>48h entrega</span>
              <span>·</span>
              <span>2 sucursales</span>
              <span>·</span>
              <span>7 días</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BRANDS ──────────────────────────────────────────── */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-gray-400 text-xs uppercase tracking-widest text-center mb-8">
            Limpiamos el calzado que entrena contigo, día tras día
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-gray-300 font-bold text-base md:text-lg tracking-wide hover:text-gray-400 transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TESTIMONIOS ─────────────────────────────────────── */}
      <section id="testimonios" className="bg-[#f0f2f5] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-12">
            <p className="text-[#3b55f5] text-xs font-bold uppercase tracking-widest mb-3">Resultados Reales</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900">
              TRANSFORMACIONES QUE HABLAN POR SÍ SOLAS
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={i} className="bg-white shadow-sm flex flex-col">
                {/* Before/After panel — fixed height h-44 */}
                <div className="grid grid-cols-2 h-44">
                  <div className="relative h-44 overflow-hidden bg-[#e2e2e2]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <svg className="w-9 h-9 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <Image src={t.before} alt="Antes" fill className="object-cover" />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 uppercase">
                      Antes
                    </span>
                  </div>
                  <div className="relative h-44 overflow-hidden bg-[#c8d0d8]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <svg className="w-9 h-9 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <Image src={t.after} alt="Después" fill className="object-cover" />
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 uppercase">
                      Después
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 italic flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#3b55f5] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SERVICIOS ───────────────────────────────────────── */}
      <section id="servicios" className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-12">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Nuestros Servicios</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900">
              ELIGE EL NIVEL DE CUIDADO QUE TUS TENIS MERECEN
            </h2>
          </Reveal>

          {/* Mobile tabs */}
          <div className="flex md:hidden mb-6 overflow-hidden border border-gray-200 rounded-lg">
            {["Básico", "Profundo", "Premium"].map((label, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 text-xs font-bold py-3 transition-colors relative ${
                  activeTab === i ? "text-[#3b55f5]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {label}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b55f5]" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop 3 cols */}
          <div className="hidden md:grid grid-cols-3 gap-6 items-center">
            {plans.map((plan, i) => (
              <PlanCard key={i} plan={plan} />
            ))}
          </div>

          {/* Mobile single card */}
          <div className="md:hidden">
            <PlanCard plan={plans[activeTab]} />
          </div>
        </div>
      </section>

      {/* ── 5. PROCESO ─────────────────────────────────────────── */}
      <section id="proceso" className="bg-[#f0f2f5] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl text-gray-900">
              TU LIMPIEZA EN 3 PASOS SIMPLES
            </h2>
          </Reveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+2.5rem)] right-[calc(16.66%+2.5rem)] h-0.5 bg-[#3b55f5]/40" />

            {[
              {
                num: "1",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "TRAE TUS TENIS",
                desc: "Déjalos en Tintorería Max Plaza Usumacinta o Mega Plaza Deportiva. Lunes a domingo.",
              },
              {
                num: "2",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: "LIMPIAMOS",
                desc: "Nuestros especialistas trabajan cada par con productos premium y técnicas específicas para cada material.",
              },
              {
                num: "3",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: "RECOGE",
                desc: "Recoge tus tenis impecables en 48 horas, empacados como nuevos y listos para lucir.",
              },
            ].map((step, i) => (
              <Reveal key={i} className="flex flex-col items-center text-center gap-4 px-4 md:px-10">
                <div className="w-20 h-20 rounded-full bg-[#3b55f5] text-white flex items-center justify-center shrink-0 relative z-10 shadow-lg shadow-[#3b55f5]/25">
                  {step.icon}
                </div>
                <div>
                  <p className="text-[#3b55f5] text-xs font-bold uppercase tracking-widest mb-1">Paso {step.num}</p>
                  <h3 className="font-display text-2xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-[#3b55f5]/10 text-[#3b55f5] text-sm font-medium px-6 py-3 rounded-full border border-[#3b55f5]/20">
              ⚡ Servicio express disponible en 24 horas — cargo adicional de $100 MXN
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. GARANTÍAS ───────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="mb-12">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Por Qué Elegirnos</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 max-w-lg">
              CALIDAD PROFESIONAL GARANTIZADA
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: "PRODUCTOS PREMIUM",
                desc: "Utilizamos únicamente productos especializados de grado profesional, seguros para todo tipo de materiales: piel, gamuza, mesh, nobuck y sintéticos.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: "ESPECIALISTAS CERTIFICADOS",
                desc: "Cada miembro de nuestro equipo está capacitado en técnicas avanzadas de limpieza y restauración de calzado deportivo de lujo.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "GARANTÍA DE SATISFACCIÓN",
                desc: "Si no quedas 100% satisfecho con el resultado, repetimos el servicio sin costo adicional. Tu confianza es nuestra prioridad.",
              },
            ].map((card, i) => (
              <Reveal
                key={i}
                className="bg-[#f0f2f5] rounded-2xl p-8 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-[#3b55f5]/10 rounded-full flex items-center justify-center text-[#3b55f5] mb-5">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MEMBRESÍA ───────────────────────────────────────── */}
      <section id="membresia" className="bg-[#f0f2f5] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="bg-[#0d1526] rounded-2xl p-10">
            {/* Header row */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Membresías</p>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                  TUS TENIS SIEMPRE LIMPIOS, SIN PENSARLO
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                  Déjalos en nuestros puntos de recolección y recógelos limpios al día siguiente. Sin filas, sin agendar, sin complicaciones.
                </p>
              </div>
              <Link
                href="/membresia"
                className="shrink-0 self-start inline-flex items-center gap-2 bg-[#3b55f5] text-white text-sm font-bold px-6 py-3 hover:bg-[#2a44e4] transition-colors whitespace-nowrap"
              >
                Ver todos los planes →
              </Link>
            </div>

            {/* 4 mini cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {memberships.map((m, i) => (
                <div
                  key={i}
                  className={`relative p-6 border ${
                    m.popular
                      ? "bg-[#3b55f5] border-[#3b55f5]"
                      : m.gold
                      ? "bg-white/5 border-[#f5a623]"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {m.popular && (
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <span className="bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider px-3 py-0.5">
                        Más Vendido
                      </span>
                    </div>
                  )}
                  <div className={m.popular ? "mt-4" : ""}>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${m.popular ? "text-white/70" : "text-white/40"}`}>
                      {m.name}
                    </p>
                    <p className={`font-display text-2xl md:text-3xl mb-1 ${m.gold ? "text-[#f5a623]" : "text-white"}`}>
                      {m.price}
                      <span className="text-xs font-sans font-normal opacity-60">/mes</span>
                    </p>
                    <p className="text-green-400 text-xs mb-3">{m.saving}</p>
                    <p className={`text-xs leading-relaxed ${m.popular ? "text-white/80" : "text-white/50"}`}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* WA note */}
            <div className="mt-6 flex items-start gap-3 text-sm text-white/50">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <span>Escríbenos por WhatsApp, elige tu plan y paga con tarjeta. A partir de ahí todo es automático.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CTA BANNER ──────────────────────────────────────── */}
      <section id="cta" className="relative min-h-[450px] flex items-center overflow-hidden py-32">
        <div className="absolute inset-0">
          <Image src="/img/cta-banner.webp" alt="" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-[rgba(10,15,30,0.72)]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 w-full text-center">
          <Reveal>
            <h2 className="font-display text-5xl md:text-7xl font-black text-white mb-6">
              ¿LISTO PARA LA TRANSFORMACIÓN?
            </h2>
            <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Únete a más de 500 clientes satisfechos que confían en Mis Papos para mantener sus sneakers impecables en Villahermosa.
            </p>
            <a
              href={waUrl("Hola quiero agendar mi limpieza")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("Lead", { content_name: "CTA Banner" })}
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-10 py-4 text-base hover:bg-[#1db954] transition-colors mb-8"
            >
              <WhatsAppIcon className="w-5 h-5" />
              AGENDAR MI LIMPIEZA
            </a>
            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
              <span>✓ Servicio en local</span>
              <span>✓ Listo en 48 horas</span>
              <span>✓ Garantía total</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. FAQ ─────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <Reveal className="text-center mb-12">
            <p className="text-[#3b55f5] text-xs font-bold uppercase tracking-widest mb-3">Preguntas Frecuentes</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900">
              TODO LO QUE NECESITAS SABER
            </h2>
          </Reveal>

          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base">{faq.q}</span>
                  <span
                    className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-transform duration-300 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === i ? "max-h-80 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. SUCURSALES ─────────────────────────────────────── */}
      <section id="sucursales" className="bg-[#f0f2f5] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <Reveal className="mb-12">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Puntos de Recepción</p>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-3">
              ENCUÉNTRANOS EN VILLAHERMOSA
            </h2>
            <p className="text-gray-500 text-sm">
              Deja tus tenis en cualquiera de nuestros puntos y recógelos limpios al día siguiente.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sucursal 1 */}
            <Reveal className="bg-white overflow-hidden shadow-sm">
              <a
                href="https://maps.google.com/?q=Av.+Paseo+Usumacinta+esquina+Av.+Los+Rios+Plaza+KB+Villahermosa+Tabasco"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-52 bg-gray-200 overflow-hidden group"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-200">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-medium">Plaza Usumacinta</span>
                </div>
                <Image src="/img/mapa-usumacinta.webp" alt="Mapa Plaza Usumacinta" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 right-3 bg-[#3b55f5] text-white text-xs font-bold px-3 py-1.5">
                  Ver en Maps →
                </div>
              </a>
              <div className="p-7 md:p-8">
                <span className="inline-block bg-[#3b55f5] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-4">
                  Sucursal 1
                </span>
                <h3 className="font-bold text-xl text-gray-900 mb-1">Tintorería Max</h3>
                <p className="text-gray-400 text-sm mb-4">Plaza Usumacinta · Villahermosa</p>
                <div className="flex items-start gap-2 text-gray-600 text-sm mb-5">
                  <svg className="w-4 h-4 text-[#3b55f5] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB, Villahermosa, Tabasco</span>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-5">
                  <div className="flex justify-between text-gray-500"><span>Lun–Vie</span><span className="font-medium text-gray-700">7:00 AM – 8:00 PM</span></div>
                  <div className="flex justify-between text-gray-500"><span>Sábado</span><span className="font-medium text-gray-700">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between text-gray-500"><span>Domingo</span><span className="font-medium text-gray-700">9:00 AM – 2:00 PM</span></div>
                </div>
                <a
                  href="https://maps.google.com/?q=Av.+Paseo+Usumacinta+esquina+Av.+Los+Rios+Plaza+KB+Villahermosa+Tabasco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#3b55f5] text-white text-sm font-bold px-5 py-2.5 hover:bg-[#2a44e4] transition-colors"
                >
                  Ver en Google Maps
                </a>
              </div>
            </Reveal>

            {/* Sucursal 2 */}
            <Reveal className="bg-white overflow-hidden shadow-sm">
              <a
                href="https://maps.google.com/?q=Velodrómo+Ciudad+Deportiva+Plaza+Mega+Soriana+Villahermosa+Tabasco"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative h-52 bg-gray-200 overflow-hidden group"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-200">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-medium">Ciudad Deportiva</span>
                </div>
                <Image src="/img/mapa-deportiva.webp" alt="Mapa Mega Plaza Deportiva" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 right-3 bg-[#3b55f5] text-white text-xs font-bold px-3 py-1.5">
                  Ver en Maps →
                </div>
              </a>
              <div className="p-7 md:p-8">
                <span className="inline-block bg-[#3b55f5] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 mb-4">
                  Sucursal 2
                </span>
                <h3 className="font-bold text-xl text-gray-900 mb-1">Mega Plaza Deportiva</h3>
                <p className="text-gray-400 text-sm mb-4">Ciudad Deportiva · Villahermosa</p>
                <div className="flex items-start gap-2 text-gray-600 text-sm mb-5">
                  <svg className="w-4 h-4 text-[#3b55f5] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Velódromo Ciudad Deportiva, Plaza Mega Soriana. A un costado de Telcel, entrada al Gym Anytime Fitness</span>
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-5">
                  <div className="flex justify-between text-gray-500"><span>Lun–Vie</span><span className="font-medium text-gray-700">8:00 AM – 8:00 PM</span></div>
                  <div className="flex justify-between text-gray-500"><span>Sábado</span><span className="font-medium text-gray-700">8:00 AM – 4:00 PM</span></div>
                  <div className="flex justify-between text-gray-500"><span>Domingo</span><span className="font-medium text-gray-700">Cerrado</span></div>
                </div>
                <a
                  href="https://maps.google.com/?q=Velodrómo+Ciudad+Deportiva+Plaza+Mega+Soriana+Villahermosa+Tabasco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#3b55f5] text-white text-sm font-bold px-5 py-2.5 hover:bg-[#2a44e4] transition-colors"
                >
                  Ver en Google Maps
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ── PlanCard ──────────────────────────────────────────────────────────
type PlanVariant = "outline" | "blue" | "dark";
interface Plan {
  name: string;
  price: string;
  subtitle: string | null;
  features: string[];
  waText: string;
  pixelName: string;
  variant: PlanVariant;
}

function PlanCard({ plan }: { plan: Plan }) {
  const isBlue = plan.variant === "blue";
  const isDark = plan.variant === "dark";

  const cardClass = isBlue
    ? "bg-[#3b55f5] text-white shadow-2xl shadow-[#3b55f5]/35 scale-[1.04] z-10"
    : isDark
    ? "bg-[#0d1526] text-white border border-white/5"
    : "bg-white text-gray-900 border border-gray-200";

  const padding = isBlue ? "p-8" : "p-7";

  const btnClass = isBlue
    ? "bg-white text-[#3b55f5] hover:bg-gray-100 font-bold"
    : isDark
    ? "border-2 border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623]/10 font-bold"
    : "border-2 border-[#3b55f5] text-[#3b55f5] hover:bg-[#3b55f5]/5 font-bold";

  const checkColor = isBlue ? "text-white/80" : isDark ? "text-[#f5a623]" : "text-[#3b55f5]";
  const priceColor = isDark ? "text-[#f5a623]" : "text-white";
  const featureColor = isBlue ? "text-white/80" : isDark ? "text-white/60" : "text-gray-500";

  return (
    <div className={`relative flex flex-col ${padding} ${cardClass}`}>
      {isBlue && (
        <div className="absolute -top-px left-0 right-0 flex justify-center">
          <span className="bg-[#f5a623] text-black text-xs font-bold uppercase tracking-wider px-4 py-1">
            Más Popular
          </span>
        </div>
      )}

      <div className={isBlue ? "mt-4 flex flex-col flex-1" : "flex flex-col flex-1"}>
        <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${isBlue ? "bg-white/20" : "bg-[#3b55f5]/10"}`}>
          <svg className={`w-5 h-5 ${isBlue ? "text-white" : "text-[#3b55f5]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>

        <h3 className={`font-display text-2xl mb-1 ${isBlue ? "text-white" : isDark ? "text-white" : "text-gray-900"}`}>
          {plan.name}
        </h3>
        {plan.subtitle && (
          <p className={`text-xs mb-3 ${isBlue ? "text-white/65" : "text-gray-400"}`}>{plan.subtitle}</p>
        )}
        <p className={`font-display text-4xl mb-5 ${isBlue || isDark ? priceColor : "text-gray-900"}`}>
          {plan.price}
        </p>

        <ul className="space-y-2.5 mb-7 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm ${featureColor}`}>
              <span className={`shrink-0 mt-0.5 font-bold ${checkColor}`}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/529931000000?text=${encodeURIComponent(plan.waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq("track", "Lead", { content_name: plan.pixelName });
            }
          }}
          className={`block text-center text-sm py-3.5 transition-colors ${btnClass}`}
        >
          {isBlue ? "Seleccionar Ahora" : "Seleccionar"}
        </a>
      </div>
    </div>
  );
}
