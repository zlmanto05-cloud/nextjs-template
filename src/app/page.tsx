"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const WA_NUMBER = "529931000000";
function waLink(text: string, utm: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}&utm_source=web&utm_medium=${utm}&utm_campaign=lanzamiento`;
}
declare global { interface Window { fbq: (...a: unknown[]) => void } }
function track(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.fbq) window.fbq("track", event, params);
}

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

function Reveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transition: "opacity 0.7s ease, transform 0.7s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.09-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.67c-.2.56-1.18 1.1-1.62 1.16-.44.07-.85.1-2.72-.57-2.28-.82-3.75-3.13-3.86-3.27-.11-.14-.9-1.2-.9-2.29 0-1.09.57-1.62.77-1.84.2-.22.44-.27.59-.27h.42c.14 0 .32-.05.5.38.2.47.67 1.63.73 1.75.06.12.1.26.02.41-.08.15-.12.24-.23.37-.11.13-.24.29-.34.39-.11.11-.23.23-.1.45.13.22.58.96 1.25 1.55.86.77 1.58 1.01 1.8 1.12.22.11.35.09.48-.05.13-.14.55-.64.7-.86.15-.22.3-.18.5-.11.2.07 1.28.6 1.5.71.22.11.37.16.42.25.06.09.06.52-.14 1.08z"/>
  </svg>
);

/* ─── Estilos base como objetos JS — sin depender de Tailwind para layout crítico ─── */
const S = {
  container: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "0 40px",
  } as React.CSSProperties,

  sectionPad: {
    paddingTop: 96,
    paddingBottom: 96,
  } as React.CSSProperties,

  displayTitle: (size: number, color = "#0d1526", center = false): React.CSSProperties => ({
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: size,
    lineHeight: 1.15,
    color,
    textAlign: center ? "center" : "left",
    letterSpacing: "0.02em",
    margin: 0,
  }),

  label: (color = "#9ca3af"): React.CSSProperties => ({
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color,
    marginBottom: 8,
  }),
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"basico"|"profundo"|"premium">("profundo");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
    <main style={{ background: "#fff", color: "#0d1526", overflowX: "hidden" }}>

      {/* ① HERO */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "65vh",
        paddingTop: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/img/hero-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.15) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 2, ...S.container, paddingBottom: 56, paddingTop: 48 }}>
          <div style={{ maxWidth: 580 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 16 }}>
              Limpieza profesional de sneakers · Villahermosa, Tabasco
            </p>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(36px, 4.5vw, 58px)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "0.02em",
              marginBottom: 16,
            }}>
              TUS TENIS FAVORITOS,<br />
              COMO RECIÉN SALIDOS<br />
              DE LA CAJA
            </h1>
            <div style={{ width: 48, height: 3, background: "rgba(255,255,255,0.4)", borderRadius: 2, marginBottom: 16 }} />
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", marginBottom: 28, maxWidth: 460 }}>
              Limpieza profesional especializada para todo tipo de sneakers.
              Trae tus tenis y recógelos impecables en 48 horas.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <a
                href="#cta"
                onClick={() => track("ViewContent")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#3b55f5", color: "#fff",
                  borderRadius: 10, padding: "14px 28px",
                  fontSize: 14, fontWeight: 900, textTransform: "uppercase",
                  letterSpacing: "0.05em", textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(59,85,245,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                📅 AGENDAR LIMPIEZA AHORA
              </a>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                <span style={{ color: "#25D366", fontWeight: 700 }}>✓</span> Primera limpieza con 20% de descuento
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ② BRANDS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ ...S.container, paddingTop: 48, paddingBottom: 48 }}>
          <p style={{ ...S.label(), textAlign: "center", marginBottom: 28 }}>
            Limpiamos el calzado que entrena contigo, día tras día
          </p>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 16,
          }}>
            {["Nike","Adidas","Jordan","On Cloud","New Balance","Hugo Boss"].map(b => (
              <span key={b} style={{ fontSize: 20, fontWeight: 900, color: "#c0c0c0", whiteSpace: "nowrap" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ③ TESTIMONIOS */}
      <section style={{ background: "#f3f4f6", ...S.sectionPad }}>
        <div style={S.container}>
          <Reveal>
            <p style={{ ...S.label("#3b55f5"), textAlign: "center" }}>Resultados reales</p>
            <h2 style={{ ...S.displayTitle(isMobile ? 32 : 46, "#0d1526", true), marginBottom: 56 }}>
              TRANSFORMACIONES QUE HABLAN POR SÍ SOLAS
            </h2>
          </Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 32,
          }}>
            {[
              { b:"antes-1.png", a:"despues-1.jpg", text:"Increíble el trabajo con mis Jordan 1. Pensé que ya no tenían salvación después de 2 años de uso intensivo en el gym. Quedaron impecables.", name:"Carlos Méndez", role:"Dueño de 12 pares", ini:"C" },
              { b:"antes-2.png", a:"despues-2.jpg", text:"Mis On Cloud blancos estaban amarillentos de tanto entrenar. El equipo hizo magia, ahora lucen como si los acabara de comprar.", name:"Ana Rodríguez", role:"Runner · 5K semanal", ini:"A" },
              { b:"antes-3.png", a:"despues-3.jpg", text:"Tenía miedo de que arruinaran la gamuza de mis New Balance de trail. El resultado superó mis expectativas. Profesionales de verdad.", name:"Miguel Torres", role:"Miembro gym · Sneakerhead", ini:"M" },
            ].map((t, i) => (
              <Reveal key={i}>
                <article style={{
                  background: "#fff", borderRadius: 16,
                  overflow: "hidden", border: "1px solid #e5e7eb",
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 180 }}>
                    <div style={{
                      position: "relative", padding: 8,
                      backgroundImage: `url('/img/${t.b}')`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      backgroundColor: "#e5e7eb",
                    }}>
                      <span style={{ background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: 20, padding: "2px 8px" }}>ANTES</span>
                    </div>
                    <div style={{
                      position: "relative", padding: 8,
                      display: "flex", justifyContent: "flex-end", alignItems: "flex-start",
                      backgroundImage: `url('/img/${t.a}')`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      backgroundColor: "#d1d5db",
                    }}>
                      <span style={{ background: "#16a34a", color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: 20, padding: "2px 8px" }}>DESPUÉS</span>
                    </div>
                  </div>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ color: "#eab308", fontSize: 14, marginBottom: 10 }}>★★★★★</div>
                    <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>&ldquo;{t.text}&rdquo;</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "#3b55f5", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, flexShrink: 0,
                      }}>{t.ini}</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 800, color: "#0d1526", margin: 0 }}>{t.name}</p>
                        <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ④ SERVICIOS */}
      <section id="servicios" style={{ background: "#fff", ...S.sectionPad }}>
        <div style={S.container}>
          <Reveal>
            <p style={S.label()}>Nuestros servicios</p>
            <h2 style={{ ...S.displayTitle(isMobile ? 30 : 46), marginBottom: 64 }}>
              ELIGE EL NIVEL DE CUIDADO<br />QUE TUS TENIS MERECEN
            </h2>
          </Reveal>

          {/* Mobile tabs */}
          {isMobile && (
            <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb", marginBottom: 24 }}>
              {(["basico","profundo","premium"] as const).map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  flex: 1, padding: "12px 0", fontSize: 13, fontWeight: 700,
                  background: "none", border: "none",
                  borderBottom: activeTab === tab ? "2px solid #3b55f5" : "2px solid transparent",
                  color: activeTab === tab ? "#3b55f5" : "#9ca3af",
                  cursor: "pointer", fontFamily: "inherit",
                  marginBottom: -2,
                }}>
                  {["Básico","Profundo","Premium"][i]}
                </button>
              ))}
            </div>
          )}

          {/* Cards — sin márgenes negativos, sin scale, usando padding extra para destacar el plan azul */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 24,
            alignItems: "start",
          }}>

            {/* BÁSICO */}
            <div style={{
              display: isMobile && activeTab !== "basico" ? "none" : "flex",
              flexDirection: "column", gap: 20,
              border: "2px solid #e5e7eb", borderRadius: 16, padding: 32,
            }}>
              <span style={{ fontSize: 28 }}>🧽</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0d1526", marginBottom: 4 }}>Lavado Básico</p>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, color: "#3b55f5", margin: 0 }}>
                  $190 <span style={{ fontSize: 18, fontWeight: 700 }}>MXN</span>
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Cepillado en seco para remover polvo y suciedad superficial","Limpieza profunda del exterior con shampoo especializado","Limpieza de suela con cepillo de cerdas medianas","Blanqueamiento básico de bordes de suela","Limpieza de agujetas incluida"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                    <span style={{ color: "#3b55f5", flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={waLink("Hola, me interesa el Lavado Básico $190 MXN","plan-basico")}
                target="_blank" rel="noopener"
                onClick={() => track("Lead",{content_name:"Lavado Basico"})}
                style={{
                  display: "block", textAlign: "center",
                  border: "2px solid #3b55f5", color: "#3b55f5",
                  background: "transparent", borderRadius: 10,
                  padding: "12px 0", fontSize: 12, fontWeight: 900,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  textDecoration: "none", cursor: "pointer",
                }}>
                Seleccionar
              </a>
            </div>

            {/* PROFUNDO — destacado con más padding, no con márgenes negativos */}
            <div style={{
              display: isMobile && activeTab !== "profundo" ? "none" : "flex",
              flexDirection: "column", gap: 20,
              background: "#3b55f5", borderRadius: 16,
              padding: 36, /* más padding que los otros */
              position: "relative",
              boxShadow: "0 20px 60px rgba(59,85,245,0.35)",
            }}>
              <span style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                background: "#f5a623", color: "#fff",
                fontSize: 10, fontWeight: 900, borderRadius: 20,
                padding: "4px 14px", whiteSpace: "nowrap",
              }}>MÁS POPULAR</span>
              <span style={{ fontSize: 28, marginTop: 8 }}>✨</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>Limpieza Profunda</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>On Cloud / Trail / Performance</p>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, lineHeight: 1, color: "#fff", margin: 0 }}>
                  $220 <span style={{ fontSize: 18, fontWeight: 700, opacity: 0.7 }}>MXN</span>
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Cepillado suave con cerdas específicas para mesh técnico y foam","Productos libres de solventes (compatibles con EVA, CloudTec y materiales reactivos)","Limpieza de canales y celdas de foam sin comprometer la estructura","Limpieza de suela de alto agarre (trail y performance)","Limpieza de agujetas incluida"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                    <span style={{ color: "#fff", flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              {/* Botón unificado con los otros dos — caja blanca, texto azul */}
              <a href={waLink("Hola, me interesa la Limpieza Profunda $220 MXN","plan-profundo")}
                target="_blank" rel="noopener"
                onClick={() => track("Lead",{content_name:"Limpieza Profunda"})}
                style={{
                  display: "block", textAlign: "center",
                  background: "#fff", color: "#3b55f5",
                  border: "2px solid #fff", borderRadius: 10,
                  padding: "12px 0", fontSize: 12, fontWeight: 900,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  textDecoration: "none", cursor: "pointer",
                }}>
                Seleccionar Ahora
              </a>
            </div>

            {/* PREMIUM */}
            <div style={{
              display: isMobile && activeTab !== "premium" ? "none" : "flex",
              flexDirection: "column", gap: 20,
              background: "#0d1526", borderRadius: 16, padding: 32,
            }}>
              <span style={{ fontSize: 28 }}>👑</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: 4 }}>Limpieza Premium</p>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, color: "#f5a623", margin: 0 }}>
                  $399 <span style={{ fontSize: 18, fontWeight: 700, opacity: 0.7 }}>MXN</span>
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {["Limpiador específico por material: cuero, gamuza o materiales mixtos","Cepillado con herramientas de cerdas suaves para superficies delicadas","Aplicación de acondicionador para cuero y piel","Limpieza de suelas y cantos"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                    <span style={{ color: "#f5a623", flexShrink: 0, marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={waLink("Hola, me interesa la Limpieza Premium $399 MXN","plan-premium")}
                target="_blank" rel="noopener"
                onClick={() => track("Lead",{content_name:"Limpieza Premium"})}
                style={{
                  display: "block", textAlign: "center",
                  border: "2px solid #f5a623", color: "#f5a623",
                  background: "transparent", borderRadius: 10,
                  padding: "12px 0", fontSize: 12, fontWeight: 900,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  textDecoration: "none", cursor: "pointer",
                }}>
                Seleccionar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ⑤ PROCESO */}
      <section id="proceso" style={{ background: "#f3f4f6", paddingTop: 112, paddingBottom: 96 }}>
        <div style={S.container}>
          <Reveal>
            <h2 style={{ ...S.displayTitle(isMobile ? 30 : 46, "#0d1526", true), marginBottom: 80 }}>
              TU LIMPIEZA EN 3 PASOS SIMPLES
            </h2>
          </Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 48 : 0,
            position: "relative",
            maxWidth: 800, margin: "0 auto",
          }}>
            {!isMobile && (
              <div style={{
                position: "absolute", top: 20,
                left: "calc(16.66% + 20px)", right: "calc(16.66% + 20px)",
                height: 2, background: "#3b55f5", zIndex: 0,
              }} />
            )}
            {[
              { n:"1", icon:"📍", title:"TRAE TUS TENIS", desc:<>Déjalos en <strong>Tintorería Max Plaza Usumacinta</strong> o <strong>Mega Plaza Deportiva</strong>. Abierto de lunes a domingo.</> },
              { n:"2", icon:"🧴", title:"LIMPIAMOS", desc:"Nuestros especialistas trabajan cada par con productos premium y técnicas específicas para cada material." },
              { n:"3", icon:"🎁", title:"RECOGE", desc:"Recoge tus tenis impecables en 48 horas, empacados como nuevos y listos para lucir." },
            ].map(s => (
              <Reveal key={s.n}>
                <div style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center",
                  gap: 16, padding: "0 24px", position: "relative", zIndex: 1,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#3b55f5", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
                    flexShrink: 0,
                  }}>{s.n}</div>
                  <span style={{ fontSize: 36 }}>{s.icon}</span>
                  <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase", color: "#0d1526", margin: 0 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <span style={{
              display: "inline-block",
              background: "#eff6ff", color: "#3b55f5",
              borderRadius: 24, padding: "10px 24px",
              fontSize: 13, fontWeight: 700,
            }}>
              ⚡ Servicio express disponible en 24 horas — cargo adicional de $100 MXN
            </span>
          </div>
        </div>
      </section>

      {/* ⑥ GARANTÍAS */}
      <section style={{ background: "#fff", ...S.sectionPad }}>
        <div style={S.container}>
          <Reveal>
            <p style={S.label()}>Por qué elegirnos</p>
            <h2 style={{ ...S.displayTitle(isMobile ? 30 : 46), marginBottom: 56 }}>
              CALIDAD PROFESIONAL<br />GARANTIZADA
            </h2>
          </Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 24, maxWidth: 960, margin: "0 auto",
          }}>
            {[
              { icon:"🧪", title:"PRODUCTOS PREMIUM", desc:"Utilizamos únicamente productos especializados de grado profesional, seguros para todo tipo de materiales: piel, gamuza, mesh, nobuck y sintéticos." },
              { icon:"🎓", title:"ESPECIALISTAS CERTIFICADOS", desc:"Cada miembro de nuestro equipo está capacitado en técnicas avanzadas de limpieza y restauración de calzado deportivo de lujo." },
              { icon:"🛡️", title:"GARANTÍA DE SATISFACCIÓN", desc:"Si no quedas 100% satisfecho con el resultado, repetimos el servicio sin costo adicional. Tu confianza es nuestra prioridad." },
            ].map(g => (
              <Reveal key={g.title}>
                <div style={{
                  background: "#f3f4f6", borderRadius: 16, padding: 32,
                  textAlign: "center", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 16,
                }}>
                  <span style={{ fontSize: 40 }}>{g.icon}</span>
                  <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0d1526", margin: 0 }}>{g.title}</p>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ MEMBRESÍA */}
      <section id="membresia" style={{ background: "#f3f4f6", paddingTop: 96, paddingBottom: 96 }}>
        <div style={S.container}>
          <Reveal>
            <div style={{
              background: "#0d1526", borderRadius: 20,
              padding: isMobile ? 32 : 48,
            }}>
              <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-start",
                gap: 24, marginBottom: 40,
              }}>
                <div style={{ maxWidth: 480 }}>
                  <p style={{ ...S.label("rgba(255,255,255,0.3)") }}>Membresías</p>
                  {/* fix line-height en título membresía */}
                  <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: isMobile ? 28 : 38,
                    lineHeight: 1.25,
                    color: "#fff",
                    letterSpacing: "0.02em",
                    marginBottom: 12,
                  }}>
                    TUS TENIS SIEMPRE LIMPIOS,<br />SIN PENSARLO
                  </h2>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
                    Déjalos en nuestros puntos de recolección y recógelos limpios al día siguiente. Sin filas, sin agendar, sin complicaciones.
                  </p>
                </div>
                <Link href="/membresia" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "#3b55f5", color: "#fff",
                  borderRadius: 10, padding: "12px 20px",
                  fontSize: 13, fontWeight: 700, textDecoration: "none",
                  whiteSpace: "nowrap", flexShrink: 0,
                }}>
                  Ver todos los planes →
                </Link>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
                gap: 16, marginBottom: 24,
              }}>
                {[
                  { name:"Básico", price:"$229", period:"/mes", saving:"Ahorras $21", desc:"1 lavado básico mensual + desodorización.", bg:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", nameCl:"rgba(255,255,255,0.4)", priceCl:"#fff", sCl:"#4ade80" },
                  { name:"Active", price:"$369", period:"/mes", saving:"Ahorras $101", desc:"2 lavados + impermeabilización incluida.", bg:"#3b55f5", border:"none", nameCl:"rgba(255,255,255,0.7)", priceCl:"#fff", sCl:"#86efac", popular:true },
                  { name:"White", price:"$449", period:"/mes", saving:"Ahorras $61", desc:"Ultra white + 1 lavado básico adicional.", bg:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", nameCl:"rgba(255,255,255,0.4)", priceCl:"#fff", sCl:"#4ade80" },
                  { name:"VIP", price:"$680", period:"/mes", saving:"Ahorras $129", desc:"Premium lujo + gorra + entrega prioritaria.", bg:"rgba(255,255,255,0.05)", border:"1px solid rgba(245,166,35,0.3)", nameCl:"#f5a623", priceCl:"#f5a623", sCl:"#4ade80" },
                ].map(p => (
                  <div key={p.name} style={{
                    background: p.bg, border: p.border,
                    borderRadius: 14, padding: 20,
                    position: "relative",
                  }}>
                    {p.popular && (
                      <span style={{
                        position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                        background: "#f5a623", color: "#fff",
                        fontSize: 9, fontWeight: 900, borderRadius: 20,
                        padding: "3px 10px", whiteSpace: "nowrap",
                      }}>MÁS VENDIDO</span>
                    )}
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: p.nameCl, marginBottom: 6 }}>{p.name}</p>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, lineHeight: 1, color: p.priceCl, marginBottom: 4 }}>
                      {p.price}<span style={{ fontSize: 12, opacity: 0.5 }}>{p.period}</span>
                    </p>
                    <p style={{ fontSize: 10, fontWeight: 700, color: p.sCl, marginBottom: 8 }}>{p.saving}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 16px",
              }}>
                <span style={{ color: "#25D366", flexShrink: 0 }}><WaIcon size={16} /></span>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                  Escríbenos por WhatsApp, elige tu plan y paga con tarjeta. A partir de ahí todo es automático.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ⑧ CTA BANNER */}
      <section id="cta" style={{
        position: "relative",
        minHeight: 480,
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/img/cta-banner.webp')",
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,30,0.72)" }} />
        <Reveal className="relative z-10" style={{ position: "relative", zIndex: 1, padding: "96px 40px", maxWidth: 640, margin: "0 auto", width: "100%" }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 40 : 64,
            lineHeight: 1.05, color: "#fff",
            letterSpacing: "0.02em", marginBottom: 16,
          }}>
            ¿LISTO PARA LA<br />TRANSFORMACIÓN?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Únete a más de 500 clientes satisfechos que confían en Mis Papos para mantener sus sneakers impecables en Villahermosa.
          </p>
          <a href={waLink("Hola, quiero agendar mi limpieza de tenis","cta-banner")}
            target="_blank" rel="noopener"
            onClick={() => track("Lead",{content_name:"CTA Banner"})}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#25D366", color: "#fff",
              borderRadius: 14, padding: "18px 40px",
              fontSize: 15, fontWeight: 900, letterSpacing: "0.05em",
              textDecoration: "none", marginBottom: 28,
            }}>
            <WaIcon size={20} /> AGENDAR MI LIMPIEZA
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["Servicio en local","Listo en 48 horas","Garantía total"].map(c => (
              <span key={c} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#25D366" }}>✓</span>{c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ⑨ FAQ */}
      <section style={{ background: "#fff", ...S.sectionPad }}>
        <div style={S.container}>
          <Reveal>
            <p style={{ ...S.label("#3b55f5"), textAlign: "center" }}>Preguntas frecuentes</p>
            <h2 style={{ ...S.displayTitle(isMobile ? 30 : 46, "#0d1526", true), marginBottom: 56 }}>
              TODO LO QUE NECESITAS SABER
            </h2>
          </Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "20px 0",
                    textAlign: "left", fontSize: 15, fontWeight: 600,
                    color: "#0d1526", background: "none", border: "none",
                    cursor: "pointer", fontFamily: "inherit", gap: 16,
                  }}
                >
                  {faq.q}
                  <span style={{
                    color: "#3b55f5", fontSize: 24, flexShrink: 0,
                    transition: "transform 0.3s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}>+</span>
                </button>
                <div style={{
                  overflow: "hidden",
                  maxHeight: openFaq === i ? 300 : 0,
                  transition: "max-height 0.3s ease",
                }}>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑩ SUCURSALES */}
      <section id="sucursales" style={{ background: "#f3f4f6", ...S.sectionPad }}>
        <div style={S.container}>
          <Reveal>
            <p style={S.label()}>Puntos de recepción</p>
            <h2 style={{ ...S.displayTitle(isMobile ? 30 : 46), marginBottom: 8 }}>
              ENCUÉNTRANOS EN VILLAHERMOSA
            </h2>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 48 }}>
              Deja tus tenis en cualquiera de nuestros puntos y recógelos limpios al día siguiente.
            </p>
          </Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 32, maxWidth: 960, margin: "0 auto",
          }}>
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
                <article style={{
                  background: "#fff", borderRadius: 16,
                  overflow: "hidden", border: "1px solid #e5e7eb",
                }}>
                  <a href={s.url} target="_blank" rel="noopener">
                    <div style={{
                      height: 200,
                      backgroundImage: `url('/img/${s.mapImg}')`,
                      backgroundSize: "cover", backgroundPosition: "center",
                      backgroundColor: "#d1d5db",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}>
                      <span style={{
                        background: "rgba(255,255,255,0.85)", borderRadius: 8,
                        padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#374151",
                      }}>{s.placeholder}</span>
                    </div>
                  </a>
                  <div style={{ padding: 28 }}>
                    <span style={{
                      display: "inline-block", background: "#3b55f5", color: "#fff",
                      fontSize: 10, fontWeight: 700, borderRadius: 4,
                      padding: "2px 8px", marginBottom: 10,
                    }}>{s.badge}</span>
                    <h3 style={{ fontSize: 17, fontWeight: 900, color: "#0d1526", marginBottom: 4 }}>{s.name}</h3>
                    <p style={{ fontSize: 13, color: "#3b55f5", fontWeight: 600, marginBottom: 16 }}>{s.sub}</p>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                      <span style={{ color: "#3b55f5", flexShrink: 0, marginTop: 2 }}>📍</span>
                      <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{s.address}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 20 }}>
                      <span style={{ color: "#3b55f5", flexShrink: 0, marginTop: 2 }}>🕐</span>
                      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                        {s.hours.map(h => <p key={h} style={{ margin: 0 }}>{h}</p>)}
                      </div>
                    </div>
                    <a href={s.url} target="_blank" rel="noopener" style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 8, width: "100%", background: "#3b55f5", color: "#fff",
                      borderRadius: 10, padding: "12px 0", fontSize: 12,
                      fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em",
                      textDecoration: "none",
                    }}>
                      📍 Ver en Google Maps
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
