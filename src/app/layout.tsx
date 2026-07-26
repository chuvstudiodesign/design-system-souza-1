import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Trajan Pro — tipografia oficial da marca Souza & Souza (capitulares)
const trajan = localFont({
  variable: "--font-trajan",
  display: "swap",
  src: [
    { path: "./fonts/TrajanPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/TrajanPro-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Souza & Souza · Design System",
    template: "%s · Souza & Souza",
  },
  description:
    "Design system da Souza & Souza Advocacia e Assessoria — tokens, tipografia e componentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${trajan.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
