"use client";

import Link from "next/link";

const WA_NUMBER = "529934001413";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola, quiero información sobre los planes de membresía de Mis Papos")}&utm_source=web&utm_medium=membresia&utm_campaign=proximamente`;

export default function Membresia() {
  return (
    <main style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 80,
    }}>
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "url('/img/hero-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }} />
      <div style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(to bottom, rgba(13,21,38,0.75) 0%, rgba(13,21,38,0.92) 100%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 2, padding: "64px 24px", textAlign: "center", maxWidth: 900, margin: "0 auto", width: "100%" }}>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(59,85,245,0.25)", color: "#7b96ff",
          fontSize: 11, fontWeight: 600, padding: "6px 16px",
          borderRadius: 20, marginBottom: 28,
          border: "0.5px solid rgba(59,85,245,0.4)",
          letterSpacing: "0.08em", textTransform: "uppercase" as const,
        }}>
          🕐 Próximamente
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          color: "#fff", margin: "0 0 16px", lineHeight: 1.05,
          letterSpacing: "0.02em",
        }}>
          CLUB MIS PAPOS
        </h1>

        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 460, margin: "0 auto 52px", lineHeight: 1.7 }}>
          Tus tenis siempre limpios, sin pensarlo. Planes mensuales para que nunca vuelvas a preocuparte por el estado de tu calzado.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12, marginBottom: 48,
        }}>
          {[
            { name: "Básico", price: "$229", desc: "1 lavado mensual + desodorización", color: "rgba(255,255,255,0.4)", border: "rgba(255,255,255,0.12)" },
            { name: "Active", price: "$369", desc: "2 lavados + impermeabilización incluida", color: "#7b96ff", border: "rgba(59,85,245,0.7)", popular: true, bg: "rgba(59,85,245,0.3)" },
            { name: "White", price: "$449", desc: "Ultra white + 1 lavado básico adicional", color: "rgba(255,255,255,0.4)", border: "rgba(255,255,255,0.12)" },
            { name: "VIP", price: "$680", desc: "Premium lujo + gorra + entrega prioritaria", color: "#f5a623", border: "rgba(245,166,35,0.35)", priceColor: "#f5a623" },
          ].map(p => (
            <div key={p.name} style={{
              background: p.bg || "rgba(255,255,255,0.06)",
              border: `${p.popular ? "1.5px" : "0.5px"} solid ${p.border}`,
              borderRadius: 12, padding: "20px 16px",
              textAlign: "center", position: "relative",
            }}>
              {p.popular && (
                <span style={{
                  position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                  background: "#3b55f5", color: "#fff",
                  fontSize: 10, fontWeight: 600, padding: "3px 12px",
                  borderRadius: 20, whiteSpace: "nowrap" as const,
                }}>Más vendido</span>
              )}
              <p style={{ fontSize: 10, fontWeight: 600, color: p.color, textTransform: "uppercase" as const, letterSpacing: "0.12em", margin: "0 0 10px" }}>{p.name}</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: p.priceColor || "#fff", margin: "0", lineHeight: 1 }}>{p.price}</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: "2px 0 12px" }}>/mes</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          background: "rgba(255,255,255,0.07)",
          border: "0.5px solid rgba(255,255,255,0.13)",
          borderRadius: 12, padding: "28px 32px",
          maxWidth: 440, margin: "0 auto 36px",
          textAlign: "left",
        }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>Avísame cuando estén disponibles</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: "0 0 16px", lineHeight: 1.5 }}>Sé el primero en conocer los planes oficiales.</p>
          <a href={WA_URL} target="_blank" rel="noopener" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#25D366", color: "#fff",
            borderRadius: 8, padding: "12px 0",
            fontSize: 13, fontWeight: 700,
            textDecoration: "none",
          }}>
            📱 Escríbenos por WhatsApp
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginBottom: 40 }}>
          {["Sin contratos", "Cancela cuando quieras", "Pago mensual con tarjeta"].map(c => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              <span style={{ color: "#25D366" }}>✓</span>{c}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </main>
  );
}
