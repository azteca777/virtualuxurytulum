import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// Importamos y configuramos Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// Importamos y configuramos Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Virtual Luxury Tulum",
  description: "The Ultimate Metaverse Experience in Tulum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Aquí inyectamos las variables de las fuentes al body */}
      <body className={`${inter.variable} ${montserrat.variable} antialiased bg-black text-zinc-200`}>
        {children}
      </body>
    </html>
  );
}