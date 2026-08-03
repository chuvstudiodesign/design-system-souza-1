import type { Metadata } from "next";

import { Footer } from "@/components/site/layout/footer";
import { WhatsAppFloat } from "@/components/site/layout/whatsapp-float";
import { HeaderMarca } from "@/components/site3/header-marca";
import { contato } from "@/lib/site/contato";

export const metadata: Metadata = {
  title: {
    default: `${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
    template: `%s — ${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
  },
};

export default function Site3Layout({
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

      <HeaderMarca />

      <main id="conteudo" className="flex-1">
        {children}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
