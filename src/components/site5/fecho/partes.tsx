import { PhoneIcon } from "lucide-react";

import { Sobretitulo } from "@/components/site/layout/section";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home } from "@/lib/site5/conteudo";

/**
 * Peças comuns às três versões do fecho da home ("Entre em contato").
 *
 * O texto é sempre o mesmo — muda só a composição. Por isso cabeçalho, CTA e
 * a lista de canais moram aqui: nenhuma versão redigita um rótulo ou número.
 */

/** A foto do fecho: fachada DSC04915 (Agência K+), 3200×2137 ≈ 3:2. */
// IMG_4032 do site antigo, a pedido do cliente (02/OUT/2026).
export const fotoFecho = fotosEspaco.fachadaHdr4032;

/** Corpo institucional — nunca abaixo de 17px. */
export const corpoFecho =
  "text-[clamp(0.9563rem,0.9rem+0.27vw,1.0688rem)] leading-relaxed text-pretty";

/** Canais telefônicos, na ordem do documento: WhatsApp 1, WhatsApp 2, fixo. */
export const canaisFecho = [
  ...contato.whatsapps.map((w) => ({
    rotulo: w.rotulo,
    exibicao: w.exibicao,
    href: w.href,
    externo: true,
    Icone: WhatsAppGlyph,
  })),
  {
    rotulo: contato.telefoneFixo.rotulo,
    exibicao: contato.telefoneFixo.exibicao,
    href: contato.telefoneFixo.href,
    externo: false,
    Icone: PhoneIcon,
  },
] as const;

/** Numeral "04" do trilho da home + sobretítulo. */
export function RotuloFecho({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p
        aria-hidden
        className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
      >
        04
      </p>
      <Sobretitulo className="mt-4">{home.contato.sobretitulo}</Sobretitulo>
    </div>
  );
}

/**
 * CTA principal — o único `shadow-gold` da seção. `anelOffset` recebe a
 * classe de `ring-offset-*` da superfície onde o botão pousa.
 */
export function BotaoFecho({
  anelOffset,
  className,
}: {
  anelOffset: string;
  className?: string;
}) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "h-auto min-h-11.5 w-full px-7 py-3 text-base whitespace-normal shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2",
        anelOffset,
        className
      )}
    >
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
        <WhatsAppGlyph className="size-5" />
        {home.contato.botao}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </Button>
  );
}

/** Aviso para leitor de tela nos links que abrem fora do site. */
export function NovaAba() {
  return <span className="sr-only"> (abre em nova aba)</span>;
}
