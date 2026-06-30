"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── WhatsApp ─── */
const WA_NUMBER = "529931000000";
function waLink(text: string, utm: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}&utm_source=web&utm_medium=${utm}&utm_campaign=lanzamiento`;
}
declare global { interface Window { fbq: (...a: unknown[]) => void } }
function track(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.fbq) window.fbq("track", event, params);
}

/* ─── Scroll reveal ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
      {children}
    </div>
  );
}

const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.62 1.16-.44.07-.85.1-2.72-.57-2.28-.82-3.75-3.13-3.86-3.27-.11-.14-.9-1.2-.9-2.29 0-1.09.57-1.62.77-1.84.2-.22.44-.27.59-.27h.42c.14 0 .32-.05.5.38.2.47.67 1.63.73 1.75.06.12.1.26.02.41-.08.15-.12.24-.23.37-.11.13-.24.29-.34.39-.11.11-.23.23-.1.45.13.22.58.96 1.25 1.55.86.77 1.58 1.01 1.8 1.12.22.11.35.09.48-.05.13-.14.55-.64.7-.86.15-.22.3-.18.5-.11.2.07 1.28.6 1.5.71.22.11.37.16.42.25.06.09.06.52-.14 1.08z"/>
  </svg>
);

const Label = ({ color = "gray", children }: { color?: "gray"|"blue"; children: string }) => (
  <p className={`text-[10px] font-bold tracking-[3px] uppercase mb-3 ${color === "blue" ? "text-blue-600" : "text-gray-400"}`}>
    {children}
  </p>
);

/* Title con line-height controlado y SIN altura fija — fix #2, #3, #4 */
const Title = ({ children, center = false, white = false, size = "lg" }: {
  children: React.ReactNode; center?: boolean; white?: boolean; size?: "sm"|"lg"
}) => (
  <h2
    className={`font-display tracking-wide mb-0 ${center ? "text-center" : ""} ${white ? "text-white" : "text-[#0d1526]"} ${size === "lg" ? "text-[clamp(30px,4.2vw,50px)]" : "text-[clamp(22px,2.8vw,34px)]"}`}
    style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.15 }}
  >
    {children}
  </h2>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<"basico"|"profundo"|"premium">("profundo");
  const [openFaq, setOpenFaq]     = useState<number>(0);

  useEffect(() => {
    let fired = false;
    const onScroll = () => {
      if (!fired) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (pct >= 50) { track("ViewContent"); fired = true; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const faqs = [
    { q: "¿Cuánto tiempo tarda el servicio?", a: "Nuestro servicio estándar tiene entrega en 48 horas hábiles. Si necesitas tus tenis con urgencia, ofrecemos servicio express de 24 horas con un cargo adicional de $100 MXN." },
    { q: "¿Limpian todo tipo de materiales?", a: "Sí, somos especialistas en todos los materiales: piel lisa, piel sintética, gamuza, nobuck, mesh, flyknit, primeknit y materiales técnicos. Cada material requiere productos y técnicas específicas que dominamos." },
    { q: "¿Qué pasa si mis tenis se dañan?", a: "Documentamos el estado de cada par con fotografías al momento de la recepción. No nos hacemos responsables por daños preexistentes, materiales desgastados o calzado de imitación, ya que estos pueden reaccionar de forma impredecible a los productos de limpieza. Te recomendamos informarnos sobre el material y la antigüedad del calzado al momento de entregarlo." },
    { q: "¿Dónde están ubicados?", a: "Contamos con dos puntos de recepción en Villahermosa: Tintorería Max Plaza Usumacinta (Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB) y Mega Plaza Deportiva (Velódromo Ciudad Deportiva, junto a Telcel, entrada Anytime Fitness). Abiertos de lunes a domingo." },
    { q: "¿Pueden quitar manchas difíciles?", a: "Nuestro servicio de Limpieza Profunda incluye tratamiento especializado anti-manchas. Hemos removido exitosamente manchas de lodo, aceite, pintura y bebidas. Evaluamos cada caso individualmente." },
    { q: "¿Ofrecen servicio para empresas o tiendas?", a: "Sí, tenemos planes corporativos para tiendas de sneakers, coleccionistas y empresas. Contáctanos para cotización personalizada con descuentos por volumen." },
  ];

  return (
    <main className="bg-white text-[#0d1526] antialiased overflow-x-hidden">

      {/* ════════════════════════════════
          ① HERO — fix #1: padding-bottom generoso para que NO colisione con Brands
      ════════════════════════════════ */}
      <section
        className="relative w-full flex flex-col overflow-hidden"
        style={{ minHeight: "92vh", paddingTop: 80 }}
        aria-label="Hero"
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage:"url('/img/hero-bg.webp')", backgroundSize:"cover", backgroundPosition:"center center" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" aria-hidden="true" />

        {/* Content — flex-1 para empujar la barra hacia abajo sin solaparse */}
        <div className="relative z-10 flex-1 flex flex-col justify-center pl-8 md:pl-16 pr-8 max-w-[92%] md:max-w-[55%] py-12">
          <p className="text-[10px] tracking-[3px] text-white/50 uppercase mb-5">
            Limpieza profesional de sneakers · Villahermosa, Tabasco
          </p>
          <h1
            className="text-white tracking-wide mb-5"
            style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(42px, 6vw, 76px)", lineHeight: 1.0 }}
          >
            TUS TENIS<br />
            FAVORITOS,<br />
            COMO RECIÉN<br />
            SALIDOS<br />
            DE LA CAJA
          </h1>
          <div className="w-14 h-[4px] bg-blue-600 rounded mb-5" />
          <div className="text-sm leading-[2]">
            <span className="bg-blue-600 text-white px-2 py-0.5 inline">
              Limpieza profesional especializada para todo tipo de sneakers.
            </span>
            <br />
            <span className="bg-blue-600 text-white px-2 py-0.5 inline">
              Trae tus tenis y recógelos impecables en 48 horas.
            </span>
          </div>
        </div>

        {/* Bottom bar — separada con su propio espacio, no flotante */}
        <div className="relative z-10 w-full bg-black/90 px-8 md:px-16 py-7 flex items-center gap-6 flex-wrap">
          <a
            href="#cta"
            onClick={() => track("ViewContent")}
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 text-[15px] font-black uppercase tracking-wide transition-colors whitespace-nowrap"
          >
            📅 AGENDAR LIMPIEZA AHORA
          </a>
          <span className="text-white/70 text-[15px] font-medium">
            <span className="text-[#25D366] font-bold">✓</span> Primera limpieza con 20% de descuento
          </span>
        </div>
      </section>

      {/* ════════════════════════════════
          ② BRANDS — separación clara del hero arriba
      ════════════════════════════════ */}
      <section className="bg-white py-12 px-8 md:px-16 border-b border-gray-100 relative z-0">
        <p className="text-[11px] font-bold tracking-[3px] text-gray-400 uppercase text-center mb-8">
          Limpiamos el calzado que entrena contigo, día tras día
        </p>
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-x-10 gap-y-5 max-w-4xl mx-auto">
          {["Nike","Adidas","Jordan","On Cloud","New Balance","Hugo Boss"].map(b => (
            <span key={b} className="text-[20px] font-black text-gray-400 hover:text-gray-500 transition-colors whitespace-nowrap">{b}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          ③ TESTIMONIOS
      ════════════════════════════════ */}
      <section id="testimonios" className="bg-gray-100 py-24 px-8 md:px-16">
        <Reveal>
          <Label color="blue">Resultados reales</Label>
          <Title center size="lg">TRANSFORMACIONES QUE HABLAN POR SÍ SOLAS</Title>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {[
            { b:"antes-1.webp", a:"despues-1.webp", text:"Increíble el trabajo con mis Jordan 1. Pensé que ya no tenían salvación después de 2 años de uso intensivo en el gym. Quedaron impecables.", name:"Carlos Méndez", role:"Dueño de 12 pares", ini:"C" },
            { b:"antes-2.webp", a:"despues-2.webp", text:"Mis On Cloud blancos estaban amarillentos de tanto entrenar. El equipo hizo magia, ahora lucen como si los acabara de comprar.", name:"Ana Rodríguez", role:"Runner · 5K semanal", ini:"A" },
            { b:"antes-3.webp", a:"despues-3.webp", text:"Tenía miedo de que arruinaran la gamuza de mis New Balance de trail. El resultado superó mis expectativas. Profesionales de verdad.", name:"Miguel Torres", role:"Miembro gym · Sneakerhead", ini:"M" },
          ].map((t,i) => (
            <Reveal key={i}>
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col h-full">
                <div className="grid grid-cols-2" style={{ height:176 }}>
                  <div className="relative bg-gray-200 p-2"
                    style={{ backgroundImage:`url('/img/${t.b}')`, backgroundSize:"cover", backgroundPosition:"center" }}>
                    <span className="bg-red-500 text-white text-[9px] font-black rounded-full px-2 py-0.5">ANTES</span>
                  </div>
                  <div className="relative bg-gray-300 p-2 flex justify-end"
                    style={{ backgroundImage:`url('/img/${t.a}')`, backgroundSize:"cover", backgroundPosition:"center" }}>
                    <span className="bg-green-600 text-white text-[9px] font-black rounded-full px-2 py-0.5">DESPUÉS</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-yellow-500 text-base mb-3">★★★★★</div>
                  <p className="text-[13px] text-gray-700 leading-relaxed mb-5 flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{t.ini}</div>
                    <div>
                      <p className="text-[13px] font-black text-[#0d1526]">{t.name}</p>
                      <p className="text-[11px] text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          ④ SERVICIOS — fix #2: título con espacio propio (mb-16 real, no overlap)
          fix scale: plan azul AHORA SÍ sobresale con scale real
      ════════════════════════════════ */}
      <section id="servicios" className="bg-white py-24 px-8 md:px-16">
        <Reveal>
          <Label>Nuestros servicios</Label>
          <Title size="lg">ELIGE EL NIVEL DE CUIDADO<br className="hidden md:block" /> QUE TUS TENIS MERECEN</Title>
        </Reveal>

        {/* Mobile tabs */}
        <div className="flex md:hidden border-b border-gray-200 mt-12 mb-8">
          {(["basico","profundo","premium"] as const).map((tab,i) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[13px] font-bold border-b-2 transition-colors ${activeTab===tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400"}`}>
              {["Básico","Profundo","Premium"][i]}
            </button>
          ))}
        </div>

        {/* Cards — mt-20 desktop para separar claramente del título, items-center + padding extra arriba/abajo en el card del medio para el efecto scale visual SIN usar transform:scale (que rompe layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 md:mt-20 md:items-stretch">

          {/* Básico */}
          <div className={`${activeTab!=="basico" ? "hidden md:flex" : "flex"} flex-col gap-5 border-2 border-gray-200 rounded-2xl p-8 md:self-center`}>
            <span className="text-blue-600 text-3xl">🧽</span>
            <div>
              <p className="text-[11px] font-black tracking-[1.5px] uppercase text-[#0d1526] mb-1">Lavado Básico</p>
              <p className="font-black text-blue-600 leading-none" style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:48 }}>
                $190 <span className="text-lg font-bold">MXN</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {["Cepillado en seco para remover polvo y suciedad superficial","Limpieza profunda del exterior con shampoo especializado","Limpieza de suela con cepillo de cerdas medianas","Blanqueamiento básico de bordes de suela","Limpieza de agujetas incluida"].map(f => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-gray-700 leading-snug">
                  <span className="text-blue-600 flex-shrink-0 mt-0.5">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href={waLink("Hola, me interesa el Lavado Básico $190 MXN","plan-basico")}
              target="_blank" rel="noopener"
              onClick={() => track("Lead",{content_name:"Lavado Basico"})}
              className="block text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg py-3 text-[12px] font-black uppercase tracking-wide transition-colors">
              Seleccionar
            </a>
          </div>

          {/* Profundo — destacado, real visual prominence via padding extra, no transform scale */}
          <div className={`${activeTab!=="profundo" ? "hidden md:flex" : "flex"} flex-col gap-5 relative bg-blue-600 rounded-2xl p-8 md:p-10 md:-mt-6 md:-mb-6 shadow-2xl z-10`}>
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-[10px] font-black rounded-full px-4 py-1.5 whitespace-nowrap shadow-md">
              MÁS POPULAR
            </span>
            <span className="text-white text-3xl mt-2">✨</span>
            <div>
              <p className="text-[11px] font-black tracking-[1.5px] uppercase text-white/70 mb-0.5">Limpieza Profunda</p>
              <p className="text-[11px] text-white/50 mb-1">On Cloud / Trail / Performance</p>
              <p className="font-black text-white leading-none" style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:52 }}>
                $220 <span className="text-lg font-bold opacity-70">MXN</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {["Cepillado suave con cerdas específicas para mesh técnico y foam","Productos libres de solventes (compatibles con EVA, CloudTec y materiales reactivos)","Limpieza de canales y celdas de foam sin comprometer la estructura","Limpieza de suela de alto agarre (trail y performance)","Limpieza de agujetas incluida"].map(f => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-white/85 leading-snug">
                  <span className="text-white flex-shrink-0 mt-0.5">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href={waLink("Hola, me interesa la Limpieza Profunda $220 MXN","plan-profundo")}
              target="_blank" rel="noopener"
              onClick={() => track("Lead",{content_name:"Limpieza Profunda"})}
              className="block text-center bg-white text-blue-600 hover:bg-gray-100 rounded-lg py-3.5 text-[13px] font-black uppercase tracking-wide transition-colors">
              Seleccionar Ahora
            </a>
          </div>

          {/* Premium */}
          <div className={`${activeTab!=="premium" ? "hidden md:flex" : "flex"} flex-col gap-5 bg-[#0d1526] rounded-2xl p-8 md:self-center`}>
            <span className="text-yellow-500 text-3xl">👑</span>
            <div>
              <p className="text-[11px] font-black tracking-[1.5px] uppercase text-white mb-1">Limpieza Premium</p>
              <p className="font-black text-yellow-500 leading-none" style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:48 }}>
                $399 <span className="text-lg font-bold opacity-70">MXN</span>
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {["Limpiador específico por material: cuero, gamuza o materiales mixtos","Cepillado con herramientas de cerdas suaves para superficies delicadas","Aplicación de acondicionador para cuero y piel","Limpieza de suelas y cantos"].map(f => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-white/75 leading-snug">
                  <span className="text-yellow-500 flex-shrink-0 mt-0.5">✓</span>{f}
                </li>
              ))}
            </ul>
            <a href={waLink("Hola, me interesa la Limpieza Premium $399 MXN","plan-premium")}
              target="_blank" rel="noopener"
              onClick={() => track("Lead",{content_name:"Limpieza Premium"})}
              className="block text-center border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-[#0d1526] rounded-lg py-3 text-[12px] font-black uppercase tracking-wide transition-colors">
              Seleccionar
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          ⑤ PROCESO — fix #3: separación clara de Servicios arriba (pt extra)
      ════════════════════════════════ */}
      <section id="proceso" className="bg-gray-100 pt-32 pb-24 px-8 md:px-16 relative z-0">
        <Reveal>
          <Title center size="lg">TU LIMPIEZA EN 3 PASOS SIMPLES</Title>
        </Reveal>
        <div className="relative grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto gap-14 md:gap-0 mt-20">
          <div className="hidden md:block absolute top-5 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-0.5 bg-blue-600 z-0" />
          {[
            { n:"1", icon:"📍", title:"TRAE TUS TENIS",  desc:<>Déjalos en <strong>Tintorería Max Plaza Usumacinta</strong> o <strong>Mega Plaza Deportiva</strong>. Abierto de lunes a domingo.</> },
            { n:"2", icon:"🧴", title:"LIMPIAMOS",        desc:"Nuestros especialistas trabajan cada par con productos premium y técnicas específicas para cada material." },
            { n:"3", icon:"🎁", title:"RECOGE",           desc:"Recoge tus tenis impecables en 48 horas, empacados como nuevos y listos para lucir." },
          ].map(s => (
            <Reveal key={s.n} className="relative z-10">
              <div className="flex flex-col items-center text-center gap-4 px-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white text-xl flex items-center justify-center flex-shrink-0"
                  style={{ fontFamily:"'Bebas Neue', sans-serif" }}>
                  {s.n}
                </div>
                <span className="text-4xl">{s.icon}</span>
                <p className="text-[11px] font-black tracking-[2px] uppercase text-[#0d1526]">{s.title}</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-14">
          <span className="inline-block bg-blue-50 text-blue-600 rounded-full px-6 py-2.5 text-[13px] font-bold">
            ⚡ Servicio express disponible en 24 horas — cargo adicional de $100 MXN
          </span>
        </div>
      </section>

      {/* ════════════════════════════════
          ⑥ GARANTÍAS
      ════════════════════════════════ */}
      <section className="bg-white py-24 px-8 md:px-16">
        <Reveal>
          <Label>Por qué elegirnos</Label>
          <Title size="lg">CALIDAD PROFESIONAL<br />GARANTIZADA</Title>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          {[
            { icon:"🧪", title:"PRODUCTOS PREMIUM",          desc:"Utilizamos únicamente productos especializados de grado profesional, seguros para todo tipo de materiales: piel, gamuza, mesh, nobuck y sintéticos." },
            { icon:"🎓", title:"ESPECIALISTAS CERTIFICADOS", desc:"Cada miembro de nuestro equipo está capacitado en técnicas avanzadas de limpieza y restauración de calzado deportivo de lujo." },
            { icon:"🛡️", title:"GARANTÍA DE SATISFACCIÓN",   desc:"Si no quedas 100% satisfecho con el resultado, repetimos el servicio sin costo adicional. Tu confianza es nuestra prioridad." },
          ].map(g => (
            <Reveal key={g.title}>
              <div className="bg-gray-100 rounded-2xl p-8 text-center flex flex-col items-center gap-4 h-full">
                <span className="text-5xl">{g.icon}</span>
                <p className="text-[11px] font-black tracking-[1.5px] uppercase text-[#0d1526]">{g.title}</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          ⑦ MEMBRESÍA — fix #4: separación REAL de Garantías + line-height
          controlado en título/subtítulo para que no colisionen
      ════════════════════════════════ */}
      <section id="membresia" className="bg-gray-100 pt-28 pb-24 px-8 md:px-16 relative z-0">
        {/* Separador visual explícito entre Garantías y Membresía */}
        <div className="max-w-6xl mx-auto mb-16 flex items-center gap-4" aria-hidden="true">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-300 text-xs">●</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <Reveal>
          <div className="bg-[#0d1526] rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-12">
              <div className="max-w-lg">
                <Label color="gray">Membresías</Label>
                <h2
                  className="font-display text-white tracking-wide mb-4"
                  style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(26px,3.2vw,40px)", lineHeight: 1.2 }}
                >
                  TUS TENIS SIEMPRE LIMPIOS,<br />SIN PENSARLO
                </h2>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Déjalos en nuestros puntos de recolección y recógelos limpios al día siguiente. Sin filas, sin agendar, sin complicaciones.
                </p>
              </div>
              <Link href="/membresia"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-3 text-[13px] font-bold transition-colors whitespace-nowrap self-start md:self-center">
                Ver todos los planes →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
              {[
                { name:"Básico",  price:"$229", period:"/mes", saving:"Ahorras $21",  desc:"1 lavado básico mensual + desodorización.", cls:"bg-white/5 border border-white/10", nameCls:"text-white/45", priceCls:"text-white", sCls:"text-green-400" },
                { name:"Active",  price:"$369", period:"/mes", saving:"Ahorras $101", desc:"2 lavados + impermeabilización incluida.", cls:"bg-blue-600 relative", nameCls:"text-white/70", priceCls:"text-white", sCls:"text-green-300", popular:true },
                { name:"White",   price:"$449", period:"/mes", saving:"Ahorras $61",  desc:"Ultra white + 1 lavado básico adicional.", cls:"bg-white/5 border border-white/10", nameCls:"text-white/45", priceCls:"text-white", sCls:"text-green-400" },
                { name:"VIP",     price:"$680", period:"/mes", saving:"Ahorras $129", desc:"Premium lujo + gorra + entrega prioritaria.", cls:"bg-white/5 border border-yellow-500/30", nameCls:"text-yellow-500", priceCls:"text-yellow-500", sCls:"text-green-400" },
              ].map(p => (
                <div key={p.name} className={`${p.cls} rounded-xl p-5`}>
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white text-[9px] font-black rounded-full px-3 py-0.5 whitespace-nowrap">
                      MÁS VENDIDO
                    </span>
                  )}
                  <p className={`text-[9px] font-bold tracking-[2px] uppercase mb-2 ${p.nameCls}`}>{p.name}</p>
                  <p className={`text-2xl font-black leading-none mb-1 ${p.priceCls}`} style={{ fontFamily:"'Bebas Neue', sans-serif" }}>
                    {p.price}<span className="text-[12px] opacity-50">{p.period}</span>
                  </p>
                  <p className={`text-[10px] font-bold mb-2 ${p.sCls}`}>{p.saving}</p>
                  <p className="text-[11px] text-white/40 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3.5">
              <span className="text-[#25D366] flex-shrink-0"><WaIcon size={16} /></span>
              <p className="text-[12px] text-white/35">
                Escríbenos por WhatsApp, elige tu plan y paga con tarjeta. A partir de ahí todo es automático.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════
          ⑧ CTA BANNER
      ════════════════════════════════ */}
      <section id="cta" className="relative flex items-center justify-center text-center overflow-hidden" style={{ minHeight:500 }}>
        <div className="absolute inset-0"
          style={{ backgroundImage:"url('/img/cta-banner.webp')", backgroundSize:"cover", backgroundPosition:"center" }}
          aria-hidden="true" />
        <div className="absolute inset-0 bg-[rgba(10,15,30,0.72)]" aria-hidden="true" />
        <Reveal className="relative z-10 px-8 py-28 max-w-2xl mx-auto w-full">
          <h2 className="text-white tracking-wide mb-6"
            style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"clamp(40px,5.5vw,70px)", lineHeight: 1.05 }}>
            ¿LISTO PARA LA<br />TRANSFORMACIÓN?
          </h2>
          <p className="text-white/70 text-[15px] leading-relaxed mb-10 max-w-lg mx-auto">
            Únete a más de 500 clientes satisfechos que confían en Mis Papos para mantener sus sneakers impecables en Villahermosa.
          </p>
          <a href={waLink("Hola, quiero agendar mi limpieza de tenis","cta-banner")}
            target="_blank" rel="noopener"
            onClick={() => track("Lead",{content_name:"CTA Banner"})}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl px-10 py-5 text-[15px] font-black tracking-wide transition-colors mb-8">
            <WaIcon size={20} /> AGENDAR MI LIMPIEZA
          </a>
          <div className="flex justify-center gap-8 flex-wrap">
            {["Servicio en local","Listo en 48 horas","Garantía total"].map(c => (
              <span key={c} className="text-white/60 text-[13px] flex items-center gap-1.5">
                <span className="text-[#25D366]">✓</span>{c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════
          ⑨ FAQ
      ════════════════════════════════ */}
      <section className="bg-white py-24 px-8 md:px-16">
        <Reveal>
          <Label color="blue">Preguntas frecuentes</Label>
          <Title center size="lg">TODO LO QUE NECESITAS SABER</Title>
        </Reveal>
        <div className="max-w-3xl mx-auto mt-16">
          {faqs.map((faq,i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                onClick={() => setOpenFaq(openFaq===i ? -1 : i)}
                className="w-full flex justify-between items-center py-5 text-left text-[15px] font-semibold text-[#0d1526] hover:text-blue-600 transition-colors gap-4"
                aria-expanded={openFaq===i}
              >
                {faq.q}
                <span className={`text-blue-600 text-2xl flex-shrink-0 transition-transform duration-300 ${openFaq===i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: openFaq===i ? 300 : 0 }}>
                <p className="text-[14px] text-gray-600 leading-relaxed pb-5">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          ⑩ SUCURSALES — confirmado bien, sin cambios estructurales
      ════════════════════════════════ */}
      <section id="sucursales" className="bg-gray-100 py-24 px-8 md:px-16">
        <Reveal>
          <Label>Puntos de recepción</Label>
          <Title size="lg">ENCUÉNTRANOS EN VILLAHERMOSA</Title>
          <p className="text-[14px] text-gray-600 mt-3 mb-16">
            Deja tus tenis en cualquiera de nuestros puntos y recógelos limpios al día siguiente.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              badge:"Sucursal 1", name:"Tintorería Max", sub:"Plaza Usumacinta · Villahermosa",
              mapImg:"mapa-usumacinta.webp", placeholder:"Plaza KB · Av. Usumacinta",
              address:"Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB, Villahermosa, Tabasco",
              hours:["Lun–Vie: 7:00 AM – 8:00 PM","Sáb: 8:00 AM – 6:00 PM","Dom: 9:00 AM – 2:00 PM"],
              url:"https://maps.google.com/?q=Av.+Paseo+Usumacinta+esquina+Av.+Los+Rios+Plaza+KB+Villahermosa+Tabasco",
            },
            {
              badge:"Sucursal 2", name:"Mega Plaza Deportiva", sub:"Ciudad Deportiva · Villahermosa",
              mapImg:"mapa-deportiva.webp", placeholder:"Velódromo · Ciudad Deportiva",
              address:"Velódromo Ciudad Deportiva, Plaza Mega Soriana. A un costado de Telcel, entrada al Gym Anytime Fitness",
              hours:["Lun–Vie: 8:00 AM – 8:00 PM","Sáb: 8:00 AM – 4:00 PM","Dom: Cerrado"],
              url:"https://maps.google.com/?q=Velódromo+Ciudad+Deportiva+Plaza+Mega+Soriana+Villahermosa+Tabasco",
            },
          ].map(s => (
            <Reveal key={s.badge}>
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <a href={s.url} target="_blank" rel="noopener" aria-label={`Ver ${s.name} en Google Maps`}>
                  <div className="h-52 flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity bg-gray-200"
                    style={{ backgroundImage:`url('/img/${s.mapImg}')`, backgroundSize:"cover", backgroundPosition:"center" }}>
                    <span className="text-4xl drop-shadow-lg">📍</span>
                    <span className="text-[11px] text-gray-700 font-semibold bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded">
                      {s.placeholder}
                    </span>
                  </div>
                </a>
                <div className="p-7">
                  <span className="inline-block bg-blue-600 text-white text-[10px] font-bold rounded px-2 py-0.5 mb-3">{s.badge}</span>
                  <h3 className="text-[17px] font-black text-[#0d1526] mb-1">{s.name}</h3>
                  <p className="text-[13px] text-blue-600 font-semibold mb-4">{s.sub}</p>
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-blue-600 flex-shrink-0 mt-0.5">📍</span>
                    <span className="text-[13px] text-gray-600 leading-relaxed">{s.address}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-5">
                    <span className="text-blue-600 flex-shrink-0 mt-0.5">🕐</span>
                    <div className="text-[13px] text-gray-600 leading-relaxed">
                      {s.hours.map(h => <p key={h}>{h}</p>)}
                    </div>
                  </div>
                  <a href={s.url} target="_blank" rel="noopener"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 text-[12px] font-black uppercase tracking-wide transition-colors">
                    📍 Ver en Google Maps
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

    </main>
  );
}
