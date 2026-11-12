import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { profileData } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profileData.name} | ${profileData.role}`,
    template: `%s | ${profileData.name}`,
  },
  description: profileData.shortBio,
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
    title: `${profileData.name} | ${profileData.role}`,
    description: profileData.shortBio,
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col bg-stone-950 text-stone-50 antialiased selection:bg-amber-500/25 selection:text-amber-200`}
      >
        {/* Enlace de accesibilidad para saltar al contenido principal con teclado */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-stone-950 focus:shadow-lg"
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
