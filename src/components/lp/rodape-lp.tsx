import { MapPinIcon, PhoneIcon } from "lucide-react";

import { BrandSymbol } from "@/components/brand/logo";
import { Container } from "@/components/site/layout/section";
import { comumLp } from "@/lib/lp/conteudo";
import { contato } from "@/lib/site5/contato";

/**
 * Rodapé das landing pages: o "Aviso do rodapé" e a "Identificação" do
 * documento, mais endereço e telefone do escritório.
 *
 * Os dados de OAB dos advogados responsáveis ainda não foram enviados. Até lá
 * aparece um marcador visível em vez de um número inventado.
 */
export function RodapeLp() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <Container className="py-12 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <BrandSymbol size={40} />
            <div className="min-w-0 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">{comumLp.identificacao}</p>
              {comumLp.oabResponsaveis ? (
                <p>{comumLp.oabResponsaveis}</p>
              ) : (
                <p className="inline-block rounded-md bg-warning/15 px-2 py-1 text-xs text-warning">
                  [OAB dos advogados responsáveis — aguardando o escritório]
                </p>
              )}
            </div>
          </div>

          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPinIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <address className="not-italic">{contato.endereco.completo}</address>
            </li>
            <li>
              <a
                href={contato.telefoneFixo.href}
                className="inline-flex min-h-11 items-center gap-3 underline-offset-4 hover:text-foreground hover:underline"
              >
                <PhoneIcon aria-hidden className="size-4 shrink-0 text-gold-500" />
                {contato.telefoneFixo.exibicao}
              </a>
            </li>
          </ul>
        </div>

        <div aria-hidden className="rule-gold mt-10 h-px w-full" />

        <div className="mt-8 space-y-1 text-xs leading-relaxed text-pretty text-muted-foreground">
          {comumLp.aviso.map((linha) => (
            <p key={linha}>{linha}</p>
          ))}
        </div>
      </Container>
    </footer>
  );
}
