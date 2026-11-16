import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditorialPreloader from "@/components/EditorialPreloader";
import { profileData } from "@/data/portfolio";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://hector-reyes-dev.vercel.app";
const SITE_IMAGE = `${SITE_URL}/images/profile.jpg`;
const SITE_TITLE = "Héctor Reyes | Full Stack Developer";
const SITE_DESCRIPTION =
  "Portafolio de Héctor Reyes, estudiante de Ingeniería de Sistemas (9.º ciclo) especializado en desarrollo Full Stack, APIs REST y arquitectura de software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Héctor Reyes",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Full Stack Developer",
    "Ingeniería de Sistemas e Informática",
    "Next.js",
    "React",
    "Java",
    "Python",
    "FastAPI",
    "PHP",
    "PostgreSQL",
    "MySQL",
    "Prisma",
    "Angular",
    "Portafolio",
  ],
  authors: [{ name: profileData.name }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        alt: "Héctor Reyes — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var t=(s==="light"||s==="dark")?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var d=document.documentElement;if(t==="dark"){d.classList.add("dark");d.style.colorScheme="dark";}else{d.classList.remove("dark");d.style.colorScheme="light";}}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${archivo.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-canvas text-ink antialiased`}
      >
        <EditorialPreloader />

        {/* Enlace de accesibilidad para saltar al contenido principal con teclado */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-fg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Saltar al contenido principal
        </a>

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
