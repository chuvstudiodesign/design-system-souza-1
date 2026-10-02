import type { Metadata } from "next";

import { Footer } from "@/components/site/layout/footer";
import { Header } from "@/components/site/layout/header";
import { WhatsAppFloat } from "@/components/site/layout/whatsapp-float";
import { contato } from "@/lib/site/contato";

export const metadata: Metadata = {
  title: {
    default: `${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
    template: `%s — ${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
  },
  description:
    "Advocacia e assessoria jurídica em Catalão/GO. Há mais de 15 anos em direito previdenciário, trabalhista, cível e tributário.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="flex-1">
        {children}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
