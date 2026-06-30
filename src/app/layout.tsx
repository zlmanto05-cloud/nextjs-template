import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mis Papos | Lavado de Tenis en Villahermosa",
  description:
    "Limpieza profesional de tenis en Villahermosa, Tabasco. Resultados en 48 horas. Desde $190. Club Mis Papos, membresías exclusivas.",
  keywords: [
    "limpieza tenis Villahermosa",
    "lavado tenis Tabasco",
    "Mis Papos",
    "limpieza zapatillas Villahermosa",
    "sneaker cleaning Villahermosa",
    "tenis limpios Villahermosa",
  ],
  openGraph: {
    title: "Mis Papos | Tus tenis, limpios en 48 horas",
    description:
      "Limpieza profesional de tenis en Villahermosa. Desde $190. Resultados garantizados en 48 horas.",
    siteName: "Mis Papos",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mis Papos | Tus tenis, limpios en 48 horas",
    description: "Limpieza profesional de tenis en Villahermosa. Desde $190.",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Mis Papos",
  description:
    "Servicio profesional de limpieza de tenis en Villahermosa, Tabasco",
  telephone: "+529931000000",
  url: "https://mispapos.mx",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Villahermosa",
    addressRegion: "Tabasco",
    addressCountry: "MX",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  priceRange: "$$",
  sameAs: [
    "https://instagram.com/mispapos",
    "https://tiktok.com/@mispapos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${raleway.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white">
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
fbq('init', '1022886750323424');
fbq('track', 'PageView');`}
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
        {children}
      </body>
    </html>
  );
}
