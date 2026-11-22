import type { Metadata } from "next";
import { Inter, Archivo, Space_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mispapos.com"),
  title: "Limpieza de Tenis en Villahermosa | Mis Papos",
  description:
    "Lavado y limpieza profesional de tenis en Villahermosa, Tabasco. También botas, mochilas, gorras y bolsas. Por material, listos en 48 horas. Sucursales en Paseo Usumacinta y Ciudad Deportiva.",
  keywords: [
    "limpieza de tenis Villahermosa",
    "lavado de tenis Villahermosa",
    "limpiar tenis Villahermosa",
    "lavado de tenis Tabasco",
    "limpieza de sneakers Villahermosa",
    "limpieza de botas Villahermosa",
    "lavado de mochilas Villahermosa",
    "Mis Papos",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Limpieza de Tenis en Villahermosa | Mis Papos",
    description:
      "Tus tenis como recién salidos de la caja. Limpieza por material, lista en 48 horas. Paseo Usumacinta y Ciudad Deportiva.",
    url: "/",
    siteName: "Mis Papos",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/img/fotos/manos-limpiando.jpg", width: 1200, height: 1600, alt: "Limpieza de tenis en Mis Papos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza de Tenis en Villahermosa | Mis Papos",
    description: "Limpieza por material, lista en 48 horas. Paseo Usumacinta y Ciudad Deportiva.",
  },
};

const HOURS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "20:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
];

// Una ficha por sucursal: ayuda a aparecer en "limpieza de tenis cerca de mí"
const schemaOrg = [
  {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": "https://www.mispapos.com/#usumacinta",
    name: "Mis Papos · Paseo Usumacinta",
    description: "Limpieza y lavado profesional de tenis, botas, mochilas, gorras y bolsas en Villahermosa, Tabasco.",
    telephone: "+529934001413",
    url: "https://www.mispapos.com",
    image: "https://www.mispapos.com/img/fotos/manos-limpiando.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paseo Usumacinta esq. Av. Los Ríos, Plaza KB",
      addressLocality: "Villahermosa",
      addressRegion: "Tabasco",
      addressCountry: "MX",
    },
    openingHoursSpecification: HOURS,
    priceRange: "$130 - $600",
    areaServed: "Villahermosa",
    sameAs: ["https://instagram.com/mispapos"],
  },
  {
    "@context": "https://schema.org",
    "@type": "DryCleaningOrLaundry",
    "@id": "https://www.mispapos.com/#deportiva",
    name: "Mis Papos · Ciudad Deportiva",
    description: "Limpieza de tenis en Ciudad Deportiva, Villahermosa. Debajo de Anytime Fitness.",
    telephone: "+529934001413",
    url: "https://www.mispapos.com",
    image: "https://www.mispapos.com/img/fotos/manos-limpiando.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plaza Mega Soriana, Ciudad Deportiva (debajo de Anytime Fitness)",
      addressLocality: "Villahermosa",
      addressRegion: "Tabasco",
      addressCountry: "MX",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
    ],
    priceRange: "$130 - $600",
    areaServed: "Villahermosa",
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${archivo.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#0B0B0B]">
        {/* Google Tag Manager — must load before page renders */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WVH85K3S');`}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq.disablePushState = true;
fbq('init', '1022886750323424');
(function(){var id;try{id=crypto.randomUUID()}catch(e){id=Date.now()+'-'+Math.random().toString(36).slice(2)}
fbq('track','PageView',{},{eventID:id});
try{var b=JSON.stringify({event_name:'PageView',event_id:id,event_source_url:location.href,custom_data:{}});
if(!(navigator.sendBeacon&&navigator.sendBeacon('/api/meta',new Blob([b],{type:'application/json'}))))fetch('/api/meta',{method:'POST',body:b,keepalive:true,headers:{'Content-Type':'application/json'}})}catch(e){}})();`}
        </Script>

        {/* Google Tag Manager noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVH85K3S"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
