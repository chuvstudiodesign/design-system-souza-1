import type { Metadata } from "next";

import { Footer } from "@/components/site5/footer";
import { WhatsAppFloat } from "@/components/site5/whatsapp-float";
import { HeaderMarca } from "@/components/site5/header-marca";
import { contato } from "@/lib/site5/contato";

export const metadata: Metadata = {
  title: {
    default: `${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
    template: `%s — ${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
  },
};

/**
 * Layout da variação 5 (herdado da variação 4).
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
 * do documento e ficam fora desta árvore. Quem usar um portal dentro de `/site`
 * precisa repetir `dark` no conteúdo, como faz o `HeaderMarca`.
 */
export default function Site5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Largura máxima do conteúdo no site 5: `--container-7xl` redefinido de
    // 80rem (1280px) para 86.25rem (1380px) — teste pedido pelo usuário em
    // 24/09. Todos os `max-w-7xl` e os alinhamentos `calc(100vw - …)` do
    // site 5 seguem esta variável; para voltar, basta apagar a classe.
    // `wrap-anywhere` é herdado por toda a árvore: uma palavra só quebra quando
    // não cabe sozinha na linha. No tamanho normal nada muda; com o texto do
    // celular ampliado (150–200%), evita scroll horizontal por palavra longa.
    <div className="dark flex min-h-screen min-w-0 flex-col bg-background text-foreground wrap-anywhere [--container-7xl:86.25rem] tipo-90">
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
      <main id="conteudo" className="-mt-18 min-w-0 flex-1">
        {children}
      </main>

      <Footer />
      <aside aria-label="Atendimento rápido">
        <WhatsAppFloat />
      </aside>
    </div>
  );
}
