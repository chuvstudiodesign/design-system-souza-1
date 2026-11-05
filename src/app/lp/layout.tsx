import type { Metadata } from "next";

import { RodapeLp } from "@/components/lp/rodape-lp";

export const metadata: Metadata = {
  // Fase de revisão: as páginas de campanha não entram no Google. Os anúncios
  // levam direto à URL, então indexar não muda nada para a campanha.
  robots: { index: false, follow: false },
};

/**
 * Layout das landing pages de campanha (/lp).
 *
 * Separado do site institucional de propósito: não usa o header nem o rodapé
 * de /site, nem o botão flutuante. Cada página monta o próprio cabeçalho,
 * porque o link do WhatsApp leva o assunto da página.
 *
 * Mesma decisão de tema do site: só no escuro, com `.dark` na subárvore.
 */
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark flex min-h-screen min-w-0 flex-col bg-background text-foreground wrap-anywhere tipo-90">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      {children}
      <RodapeLp />
    </div>
  );
}
