import { FileTextIcon } from "lucide-react";

import { Container, Section, Sobretitulo } from "@/components/site/layout/section";
import type { LandingPage } from "@/lib/lp/conteudo";
import { microcopy } from "@/lib/lp/conversao";

/**
 * "Texto da página" do documento, parágrafo a parágrafo, seguido do bloco
 * "Para começar, vale separar…" em destaque — é a lista de documentos, o
 * passo prático que o leitor leva da página.
 *
 * Largura de leitura fixa (~65 caracteres): o público lê no celular e boa
 * parte dele é mais velho.
 */
export function CorpoLp({
  lp,
  surface = "muted",
  depois,
}: {
  lp: LandingPage;
  surface?: "base" | "muted";
  /** O que vem depois do bloco de documentos (um CTA, na V2 e na V3). */
  depois?: React.ReactNode;
}) {
  return (
    <Section surface={surface} size="md">
      <Container width="narrow">
        <Sobretitulo>{microcopy.sobretituloTexto}</Sobretitulo>

        <div className="mt-8 space-y-6 text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-[1.75] text-pretty text-foreground/90">
          {lp.paragrafos.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        <div className="mt-12 flex gap-4 rounded-2xl bg-card p-6 ring-1 ring-gold-500/30 md:gap-5 md:p-8">
          <FileTextIcon aria-hidden className="mt-1 size-6 shrink-0 text-gold-500" />
          <div className="min-w-0">
            <h2 className="font-display text-xs tracking-[0.2em] text-gold-400 uppercase">
              {microcopy.sobretituloDocumentos}
            </h2>
            <p className="mt-3 text-[clamp(1rem,0.97rem+0.15vw,1.0938rem)] leading-relaxed text-pretty">
              {lp.documentos}
            </p>
          </div>
        </div>

        {depois ? <div className="mt-12">{depois}</div> : null}
      </Container>
    </Section>
  );
}
