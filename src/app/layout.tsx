import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";

// next/font downloads at build time — zero external requests at runtime
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
  title: "My App",
  description: "My app description",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${raleway.variable}`}>
      <body className="font-sans antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
