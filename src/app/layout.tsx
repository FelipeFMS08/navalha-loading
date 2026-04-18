import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Navalha — O agendamento que corta o caminho",
  description:
    "A plataforma de agendamento inteligente para barbearias modernas. Menos fila, mais corte.",
  openGraph: {
    title: "Navalha — Agendamento para barbearias",
    description:
      "A plataforma de agendamento inteligente para barbearias modernas.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <body className="noise min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
