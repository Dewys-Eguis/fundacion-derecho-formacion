import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { ViewTransition, type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SITE } from "@/content/site";
import "@/styles/globals.css";

// Tipografías del diseño servidas desde el propio sitio (sin peticiones a Google en tiempo de ejecución).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.descriptor}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.claim,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2A4F",
};

// Marca <html class="js"> antes de pintar para que los elementos [data-reveal] puedan
// animarse; si GSAP no arranca en 3 s se retira la clase y todo queda visible.
const jsFlag = `(function(d){d.classList.add('js');setTimeout(function(){if(!d.dataset.motion)d.classList.remove('js')},3000)})(document.documentElement)`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CO" className={`${jakarta.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body id="top">
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-100 -translate-y-24 rounded-pildora bg-azul px-5 py-3 font-bold text-white no-underline transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Header />
        <ViewTransition>
          <main id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MotionProvider />
      </body>
    </html>
  );
}
