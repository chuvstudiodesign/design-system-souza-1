"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import { Symbol } from "@/components/brand/logo";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { microcopy } from "@/lib/lp/conversao";
import { cn } from "@/lib/utils";

/**
 * Aviso flutuante da V2, no canto inferior direito — formato de notificação,
 * não de pop-up que cobre a tela (pedido de 05/NOV/2026).
 *
 * Aparece quando o visitante já leu um pouco (passou de 35% da página) ou
 * depois de 20 s, o que vier primeiro, e só uma vez por sessão: fechado, não
 * volta. Não simula atividade de outras pessoas nem urgência — mostra a
 * pergunta da própria chamada final e o caminho para o WhatsApp.
 *
 * No celular fica acima da barra fixa (`bottom-24`) para as duas não se
 * sobreporem.
 */
const CHAVE = "lp-aviso-fechado";

export function AvisoFlutuante({
  pergunta,
  botao,
  href,
}: {
  pergunta: string;
  botao: string;
  href: string;
}) {
  const [visivel, setVisivel] = React.useState(false);

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(CHAVE)) return;
    } catch {
      // Armazenamento bloqueado: o aviso segue funcionando, só não lembra.
    }

    let mostrou = false;
    const mostrar = () => {
      if (mostrou) return;
      mostrou = true;
      setVisivel(true);
    };
    const timer = window.setTimeout(mostrar, 20_000);
    const aoRolar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.35) mostrar();
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  function fechar() {
    setVisivel(false);
    try {
      sessionStorage.setItem(CHAVE, "1");
    } catch {
      // idem
    }
  }

  return (
    <aside
      aria-label="Fale com a equipe"
      aria-hidden={!visivel}
      inert={!visivel}
      className={cn(
        "fixed right-3 bottom-24 z-40 w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl bg-card/95 p-4 shadow-2xl ring-1 ring-gold-500/30 backdrop-blur-md transition duration-500 ease-out motion-reduce:transition-none md:right-6 md:bottom-6",
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-start gap-3">
        <span className="relative inline-flex shrink-0">
          <Symbol variant="dourado" size={40} />
          {/* Ponto verde: canal de atendimento, não "online agora". */}
          <span
            aria-hidden
            className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full bg-success ring-2 ring-card"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{microcopy.avisoTitulo}</p>
          <p className="text-xs text-muted-foreground">{microcopy.avisoStatus}</p>
        </div>
        <button
          type="button"
          onClick={fechar}
          aria-label={microcopy.fecharAviso}
          className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <XIcon aria-hidden className="size-4" />
        </button>
      </div>

      <p className="mt-3 rounded-xl rounded-tl-sm bg-muted/60 px-3.5 py-2.5 text-[0.9375rem] leading-snug text-pretty">
        {pergunta}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={fechar}
        className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
      >
        <WhatsAppGlyph className="size-4" />
        {botao}
        <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      </a>
    </aside>
  );
}
