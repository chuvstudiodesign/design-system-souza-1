import type { Metadata } from "next";

import { Footer } from "@/components/site/layout/footer";
import { WhatsAppFloat } from "@/components/site/layout/whatsapp-float";
import { HeaderMarca } from "@/components/site4/header-marca";
import { contato } from "@/lib/site/contato";

export const metadata: Metadata = {
  title: {
    default: `${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
    template: `%s — ${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
  },
};

/**
 * Layout da variação 4.
 *
 * Esta variação existe só no escuro — a versão clara foi descontinuada aqui.
 * Em vez de mexer no `ThemeProvider` global (que atende `/site`, `/site2`,
 * `/site3` e o styleguide), a rota carrega a classe `.dark` na própria
 * subárvore: o `@custom-variant dark` do projeto casa por ancestral, então
 * todos os tokens resolvem no escuro daqui para baixo, independentemente do
 * tema salvo pelo visitante. Por consequência não há alternador de tema no
 * header.
 *
 * A única ressalva são os portais — `Sheet`, `Dialog`, `Toaster` montam na raiz
 * do documento e ficam fora desta árvore. Quem usar um portal dentro de `/site4`
 * precisa repetir `dark` no conteúdo, como faz o `HeaderMarca`.
 */
export default function Site4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>

      <HeaderMarca />

      {/* O header desta variação é transparente no topo e a fotografia do hero
          precisa correr por baixo dele. Daí o `-mt-18`, que puxa o conteúdo
          para trás da barra em vez de empilhar sob ela. */}
      <main id="conteudo" className="-mt-18 flex-1">
        {children}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
