"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WA_URL = `https://wa.me/529931000000?text=${encodeURIComponent("Hola, me gustaría cotizar la limpieza de mis tenis")}`;

// ── TESTIMONIOS DATA ───────────────────────────────────────────────────
const testimonios = [
  {
    texto: "Traje mis Air Force 1 que parecían basura y me las devolvieron como nuevas. El servicio profundo vale cada peso.",
    autor: "Carlos M.",
    rol: "Cliente frecuente",
    initials: "CM",
  },
  {
    texto: "Mis Jordan 1 Retro tenían manchas que pensé eran permanentes. En 48 horas estaban perfectas. Increíble trabajo.",
    autor: "Sofía R.",
    rol: "Clienta desde 2024",
    initials: "SR",
  },
  {
    texto: "El servicio premium para mis Yeezys fue perfecto. Los entregué destruidos y los recibí restaurados. 100% recomendado.",
    autor: "Miguel A.",
    rol: "Miembro Club Mis Papos",
    initials: "MA",
  },
];

// ── SERVICIOS DATA ─────────────────────────────────────────────────────
const servicios = [
  {
    nombre: "Básico",
    precio: "$190",
    descripcion: "Limpieza exterior completa",
    features: [
      "Limpieza exterior completa",
      "Lavado de agujetas",
      "Desinfección básica",
      "Entrega en 48 horas",
    ],
    icono: "🧼",
    tipo: "basico",
  },
  {
    nombre: "Profunda",
    precio: "$350",
    descripcion: "Limpieza interior y exterior a fondo",
    features: [
      "Todo lo del plan Básico",
      "Limpieza interior profunda",
      "Tratamiento de manchas",
      "Acondicionador de materiales",
      "Protector anti-manchas",
    ],
    icono: "✨",
    tipo: "profunda",
  },
  {
    nombre: "Premium",
    precio: "$550",
    descripcion: "Restauración completa nivel showroom",
    features: [
      "Todo lo del plan Profunda",
      "Restauración de color",
      "Reparación menor de sole",
      "Tratamiento UV anti-amarillamiento",
      "Caja protectora incluida",
    ],
    icono: "👑",
    tipo: "premium",
  },
];

// ── GARANTIAS DATA ─────────────────────────────────────────────────────
const garantias = [
  {
    icono: "🛡️",
    titulo: "Garantía de resultado",
    texto: "Si no quedas 100% satisfecho, repetimos la limpieza sin costo adicional.",
  },
  {
    icono: "⏱️",
    titulo: "Entrega en 48 horas",
    texto: "Tus sneakers listos en 48 horas o te hacemos descuento en tu próximo servicio.",
  },
  {
    icono: "🔬",
    titulo: "Productos certificados",
    texto: "Usamos productos profesionales que no dañan materiales delicados ni colores.",
  },
];

// ── FAQ DATA ───────────────────────────────────────────────────────────
const faqs = [
  {
    pregunta: "¿Cuánto tiempo tarda el servicio?",
    respuesta: "El tiempo estándar es 48 horas. Si necesitas urgencia, ofrecemos servicio express en 24 horas con un costo adicional.",
  },
  {
    pregunta: "¿Qué tipos de tenis aceptan?",
    respuesta: "Aceptamos todo tipo de sneakers: running, basketball, lifestyle, skateboarding y más. Marcas como Nike, Adidas, Jordan, Yeezy, New Balance, Vans, Converse y cualquier otra.",
  },
  {
    pregunta: "¿Es seguro para tenis de edición limitada?",
    respuesta: "Sí. Nuestros técnicos están capacitados para manejar tenis de colección y edición limitada con productos especializados que preservan colores y materiales delicados.",
  },
  {
    pregunta: "¿Tienen membresía o plan de suscripción?",
    respuesta: "Sí, el Club Mis Papos ofrece planes mensuales con descuentos de hasta 30% y beneficios exclusivos. Pregunta en cualquier sucursal o contáctanos por WhatsApp.",
  },
  {
    pregunta: "¿Dónde están ubicados?",
    respuesta: "Tenemos dos sucursales en Villahermosa: Tintorería Max en Plaza Usumacinta, y Mega Plaza Deportiva en Ciudad Deportiva.",
  },
  {
    pregunta: "¿Puedo pagar con tarjeta?",
    respuesta: "Aceptamos efectivo, tarjeta de débito y crédito en ambas sucursales. También puedes pagar por transferencia.",
  },
];

// ── MEMBERSHIP PLANS ───────────────────────────────────────────────────
const planes = [
  {
    nombre: "Básico",
    precio: "$299",
    ahorro: "Ahorra $90/mes",
    desc: "1 limpieza básica al mes",
    active: false,
    vip: false,
  },
  {
    nombre: "Club",
    precio: "$549",
    ahorro: "Ahorra $200/mes",
    desc: "2 limpiezas profundas al mes",
    active: true,
    vip: false,
  },
  {
    nombre: "Pro",
    precio: "$890",
    ahorro: "Ahorra $370/mes",
    desc: "4 limpiezas + prioridad express",
    active: false,
    vip: false,
  },
  {
    nombre: "VIP",
    precio: "$1,490",
    ahorro: "Ahorra $700/mes",
    desc: "Limpiezas ilimitadas + beneficios",
    active: false,
    vip: true,
  },
];

// ── SUCURSALES DATA ────────────────────────────────────────────────────
const sucursales = [
  {
    badge: "Sucursal 1",
    nombre: "Tintorería Max",
    sub: "Plaza Usumacinta",
    direccion: "Plaza Usumacinta, Villahermosa, Tabasco",
    horario: "Lun–Vie 7–8 PM · Sáb 8–6 PM · Dom 9–2 PM",
    maps: "https://maps.google.com/?q=Plaza+Usumacinta+Villahermosa",
  },
  {
    badge: "Sucursal 2",
    nombre: "Mega Plaza Deportiva",
    sub: "Ciudad Deportiva",
    direccion: "Ciudad Deportiva, Villahermosa, Tabasco",
    horario: "Lun–Vie 8–8 PM · Sáb 8–4 PM · Dom Cerrado",
    maps: "https://maps.google.com/?q=Ciudad+Deportiva+Villahermosa",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.337-1.514A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.003-1.367l-.358-.213-3.76.898.944-3.653-.234-.375A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
    </svg>
  );
}

export default function Home() {
  const [activeServicio, setActiveServicio] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/img/hero-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {/* Top content */}
          <div className="pt-24 pl-8 md:pl-16 max-w-[60%]">
            <p className="text-xs tracking-widest text-white/50 uppercase mb-4">
              Limpieza profesional de sneakers · Villahermosa, Tabasco
            </p>
            <h1 className="font-display text-6xl md:text-7xl text-white leading-none tracking-wide mb-3">
              TUS TENIS<br />
              FAVORITOS,<br />
              COMO RECIÉN<br />
              SALIDOS<br />
              DE LA CAJA
            </h1>
            <div className="w-14 h-1 bg-blue-600 mb-4" />
            <div className="text-sm leading-7">
              <span className="bg-blue-600 text-white px-1">
                Limpieza profesional especializada para todo tipo de sneakers.
              </span>
              <br />
              <span className="bg-blue-600 text-white px-1">
                Trae tus tenis y recógelos impecables en 48 horas.
              </span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="w-full bg-black/85 px-8 md:px-16 py-4 flex items-center gap-6">
            <a
              href="#cta"
              className="bg-blue-600 text-white rounded-lg px-7 py-3 text-sm font-bold uppercase tracking-wide hover:bg-blue-700 transition-colors"
            >
              📅 AGENDAR LIMPIEZA AHORA
            </a>
            <span className="text-white/60 text-sm">✓ Primera limpieza con 20% de descuento</span>
          </div>
        </div>
      </section>

      {/* ── BRANDS ────────────────────────────────────────────────────── */}
      <section className="bg-white py-10 px-8 md:px-16 border-b border-gray-100">
        <p className="text-xs font-bold tracking-widest text-gray-300 uppercase text-center mb-6">
          Limpiamos todas las marcas
        </p>
        <div className="flex justify-between items-center flex-wrap gap-4 max-w-4xl mx-auto">
          {["NIKE", "ADIDAS", "JORDAN", "YEEZY", "NEW BALANCE", "VANS", "CONVERSE", "PUMA"].map((b) => (
            <span key={b} className="text-lg font-black text-gray-300 hover:text-gray-400 transition-colors cursor-default">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────────────────── */}
      <section id="testimonios" className="bg-gray-100 py-24 px-8 md:px-16">
        <p className="text-xs tracking-widest uppercase text-blue-600 font-bold text-center mb-2">
          Lo que dicen nuestros clientes
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-gray-900 text-center mb-16">
          RESULTADOS QUE HABLAN
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonios.map((t) => (
            <div key={t.autor} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              {/* Antes / Después */}
              <div className="grid grid-cols-2 h-44">
                <div className="bg-gray-200 relative p-2">
                  <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded">
                    ANTES
                  </span>
                </div>
                <div className="bg-gray-300 relative p-2 flex justify-end">
                  <span className="bg-green-500 text-white text-xs font-black px-2 py-0.5 rounded">
                    DESPUÉS
                  </span>
                </div>
              </div>
              {/* Body */}
              <div className="p-6">
                <div className="text-yellow-500 text-base mb-3">★★★★★</div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{t.texto}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.autor}</p>
                    <p className="text-xs text-gray-400">{t.rol}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS ─────────────────────────────────────────────────── */}
      <section id="servicios" className="bg-white py-24 px-8 md:px-16">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
          Nuestros servicios
        </p>
        <h2 className="font-display text-5xl text-gray-900 mb-16">
          ELIGE TU PLAN DE LIMPIEZA
        </h2>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-center max-w-6xl mx-auto">
          {/* Básico */}
          <div className="border-2 border-gray-200 rounded-2xl p-8">
            <div className="text-3xl mb-4">{servicios[0].icono}</div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{servicios[0].nombre}</p>
            <p className="font-display text-5xl text-blue-600 mb-1">{servicios[0].precio}</p>
            <p className="text-xs text-gray-400 mb-6">{servicios[0].descripcion}</p>
            <ul className="space-y-3 mb-8">
              {servicios[0].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 font-bold shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center border-2 border-blue-600 text-blue-600 rounded-xl py-3 text-sm font-bold hover:bg-blue-50 transition-colors">
              Seleccionar
            </a>
          </div>

          {/* Profunda — destacada */}
          <div className="bg-blue-600 rounded-2xl p-8 scale-105 z-10 relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
              MÁS POPULAR
            </span>
            <div className="text-3xl mb-4">{servicios[1].icono}</div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-200 mb-1">{servicios[1].nombre}</p>
            <p className="font-display text-5xl text-white mb-1">{servicios[1].precio}</p>
            <p className="text-xs text-blue-200 mb-6">{servicios[1].descripcion}</p>
            <ul className="space-y-3 mb-8">
              {servicios[1].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-blue-200 font-bold shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-white text-blue-600 rounded-xl py-3 text-sm font-bold hover:bg-blue-50 transition-colors">
              Seleccionar
            </a>
          </div>

          {/* Premium */}
          <div className="bg-[#0d1526] rounded-2xl p-8">
            <div className="text-3xl mb-4">{servicios[2].icono}</div>
            <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">{servicios[2].nombre}</p>
            <p className="font-display text-5xl text-yellow-400 mb-1">{servicios[2].precio}</p>
            <p className="text-xs text-white/40 mb-6">{servicios[2].descripcion}</p>
            <ul className="space-y-3 mb-8">
              {servicios[2].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-yellow-400 font-bold shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center border-2 border-yellow-400 text-yellow-400 rounded-xl py-3 text-sm font-bold hover:bg-yellow-400/10 transition-colors">
              Seleccionar
            </a>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden max-w-lg mx-auto">
          <div className="flex border-b border-gray-200 mb-8">
            {servicios.map((s, i) => (
              <button
                key={s.nombre}
                onClick={() => setActiveServicio(i)}
                className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
                  activeServicio === i ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {s.nombre}
                {activeServicio === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          {/* Active card */}
          {activeServicio === 0 && (
            <div className="border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-3xl mb-4">{servicios[0].icono}</div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">{servicios[0].nombre}</p>
              <p className="font-display text-5xl text-blue-600 mb-1">{servicios[0].precio}</p>
              <p className="text-xs text-gray-400 mb-6">{servicios[0].descripcion}</p>
              <ul className="space-y-3 mb-8">
                {servicios[0].features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600 font-bold shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center border-2 border-blue-600 text-blue-600 rounded-xl py-3 text-sm font-bold">
                Seleccionar
              </a>
            </div>
          )}
          {activeServicio === 1 && (
            <div className="bg-blue-600 rounded-2xl p-8">
              <div className="text-3xl mb-4">{servicios[1].icono}</div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-200 mb-1">{servicios[1].nombre}</p>
              <p className="font-display text-5xl text-white mb-1">{servicios[1].precio}</p>
              <p className="text-xs text-blue-200 mb-6">{servicios[1].descripcion}</p>
              <ul className="space-y-3 mb-8">
                {servicios[1].features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-blue-200 font-bold shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center bg-white text-blue-600 rounded-xl py-3 text-sm font-bold">
                Seleccionar
              </a>
            </div>
          )}
          {activeServicio === 2 && (
            <div className="bg-[#0d1526] rounded-2xl p-8">
              <div className="text-3xl mb-4">{servicios[2].icono}</div>
              <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">{servicios[2].nombre}</p>
              <p className="font-display text-5xl text-yellow-400 mb-1">{servicios[2].precio}</p>
              <p className="text-xs text-white/40 mb-6">{servicios[2].descripcion}</p>
              <ul className="space-y-3 mb-8">
                {servicios[2].features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-yellow-400 font-bold shrink-0">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center border-2 border-yellow-400 text-yellow-400 rounded-xl py-3 text-sm font-bold">
                Seleccionar
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── PROCESO ───────────────────────────────────────────────────── */}
      <section id="proceso" className="bg-gray-100 py-24 px-8 md:px-16">
        <h2 className="font-display text-5xl text-gray-900 text-center mb-20">
          ASÍ FUNCIONA
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-5 left-[16.666%] right-[16.666%] h-0.5 bg-blue-600" />

          {[
            {
              num: "1",
              icono: "👟",
              titulo: "Trae tus tenis",
              desc: "Lleva tus sneakers a cualquiera de nuestras sucursales en Villahermosa.",
            },
            {
              num: "2",
              icono: "🔬",
              titulo: "Evaluamos y limpiamos",
              desc: "Nuestros técnicos evalúan el estado y aplican el tratamiento adecuado.",
            },
            {
              num: "3",
              icono: "✅",
              titulo: "Recoge impecables",
              desc: "En 48 horas tus tenis quedan como nuevos. Te avisamos por WhatsApp.",
            },
          ].map((paso) => (
            <div key={paso.num} className="flex flex-col items-center text-center gap-4 px-8">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-display text-2xl flex items-center justify-center relative z-10">
                {paso.num}
              </div>
              <span className="text-3xl">{paso.icono}</span>
              <p className="text-xs font-black tracking-widest uppercase text-gray-900">{paso.titulo}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{paso.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <span className="bg-blue-50 text-blue-600 rounded-full px-6 py-2 text-sm font-bold">
            ⚡ Servicio Express disponible — listo en 24 horas
          </span>
        </div>
      </section>

      {/* ── GARANTÍAS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-8 md:px-16">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
          Nuestro compromiso
        </p>
        <h2 className="font-display text-5xl text-gray-900 mb-16">
          CALIDAD PROFESIONAL GARANTIZADA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {garantias.map((g) => (
            <div key={g.titulo} className="bg-gray-100 rounded-2xl p-8 text-center flex flex-col items-center gap-4">
              <span className="text-4xl">{g.icono}</span>
              <p className="text-xs font-black tracking-widest uppercase text-gray-900">{g.titulo}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{g.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMBRESÍA ─────────────────────────────────────────────────── */}
      <section id="membresia" className="bg-gray-100 py-24 px-8 md:px-16">
        <div className="bg-[#0d1526] rounded-2xl p-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start gap-6 mb-10 flex-wrap">
            <div>
              <p className="text-xs font-bold tracking-widest text-white/30 uppercase mb-2">Club Mis Papos</p>
              <h2 className="font-display text-4xl text-white mb-2">MEMBRESÍAS EXCLUSIVAS</h2>
              <p className="text-white/40 text-sm">Limpieza recurrente con descuentos y beneficios especiales.</p>
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white rounded-xl px-6 py-3 text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Ver todos los planes →
            </a>
          </div>

          {/* 4 mini cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {planes.map((p) => (
              <div
                key={p.nombre}
                className={`rounded-xl p-5 relative ${
                  p.active
                    ? "bg-blue-600"
                    : p.vip
                    ? "bg-white/5 border border-yellow-500/30"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {p.active && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-0.5 rounded-full whitespace-nowrap">
                    MÁS POPULAR
                  </span>
                )}
                <p className={`text-xs uppercase tracking-widest font-bold mb-1 ${p.active ? "text-blue-200" : "text-white/40"}`}>
                  {p.nombre}
                </p>
                <p className={`font-display text-2xl mb-1 ${p.active ? "text-white" : p.vip ? "text-yellow-400" : "text-white"}`}>
                  {p.precio}
                </p>
                <p className="text-xs text-green-400 mb-2">{p.ahorro}</p>
                <p className={`text-xs leading-relaxed ${p.active ? "text-blue-200" : "text-white/40"}`}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* WA note */}
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 text-white/40 text-xs">
            <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#25D366]" />
            Consulta disponibilidad y activa tu membresía por WhatsApp — sin contratos, cancela cuando quieras.
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section id="cta" className="relative min-h-[480px] flex items-center justify-center text-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/img/cta-banner.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[rgba(10,15,30,0.72)]" />
        <div className="relative z-10 px-8 py-20 max-w-2xl mx-auto">
          <h2 className="font-display text-6xl md:text-8xl text-white leading-none mb-6">
            TUS TENIS<br />TE ESPERAN
          </h2>
          <p className="text-white/70 text-base mb-10 leading-relaxed">
            No dejes que el tiempo empeore el estado de tus sneakers.<br />
            Agenda hoy mismo y obtén 20% de descuento en tu primera limpieza.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white rounded-xl px-10 py-5 text-base font-black tracking-wide hover:bg-[#1db954] transition-colors mb-8"
          >
            <WhatsAppIcon className="w-5 h-5" />
            AGENDAR POR WHATSAPP
          </a>
          <div className="flex justify-center gap-8 flex-wrap text-white/60 text-sm">
            <span>✓ Respuesta en minutos</span>
            <span>✓ Sin compromiso</span>
            <span>✓ 20% descuento primera vez</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-8 md:px-16">
        <p className="text-xs font-bold tracking-widest text-blue-600 uppercase text-center mb-2">
          Preguntas frecuentes
        </p>
        <h2 className="font-display text-5xl text-gray-900 text-center mb-16">
          TODO LO QUE NECESITAS SABER
        </h2>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {faq.pregunta}
                <span
                  className={`ml-4 text-xl font-light transition-transform duration-200 shrink-0 ${
                    openFaq === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-600 leading-relaxed pb-5">{faq.respuesta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUCURSALES ────────────────────────────────────────────────── */}
      <section id="sucursales" className="bg-gray-100 py-24 px-8 md:px-16">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
          Dónde encontrarnos
        </p>
        <h2 className="font-display text-5xl text-gray-900 mb-2">NUESTRAS SUCURSALES</h2>
        <p className="text-gray-600 mb-16">Dos puntos estratégicos en Villahermosa, Tabasco.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sucursales.map((s) => (
            <div key={s.nombre} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              {/* Map placeholder */}
              <a
                href={s.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="h-52 bg-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-300 transition-colors group block"
              >
                <span className="text-4xl opacity-50 group-hover:opacity-70 transition-opacity">📍</span>
                <span className="text-sm text-gray-500 font-semibold">{s.sub}</span>
              </a>
              {/* Body */}
              <div className="p-7">
                <span className="bg-blue-100 text-blue-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {s.badge}
                </span>
                <p className="text-lg font-black text-gray-900 mt-3 mb-1">{s.nombre}</p>
                <p className="text-sm text-blue-600 font-semibold mb-4">{s.sub}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📍 {s.direccion}</p>
                  <p>🕐 {s.horario}</p>
                </div>
                <a
                  href={s.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 text-center bg-blue-600 text-white rounded-xl py-3 text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
