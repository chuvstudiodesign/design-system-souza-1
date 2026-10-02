import { Container } from "@/components/site/layout/section";
import { PainelAtendimento } from "@/components/site5/contato/painel-atendimento";
import { contatoPagina } from "@/lib/site5/conteudo";

/**
 * Abertura da página Contato.
 *
 * Texto curto em 5 colunas à esquerda e, à direita, o painel com os canais de
 * atendimento — quem chega aqui quer falar agora, e o WhatsApp principal
 * precisa estar na primeira dobra também no celular. Sem sobretítulo:
 * "Contato" só repetiria o H1.
 */
export function Abertura() {
  return (
    <section className="relative isolate bg-background">
      <Container className="pt-28 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="min-w-0 lg:col-span-5">
            <h1 className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both font-display text-[clamp(2.025rem,0.9rem+4.14vw,4.05rem)] leading-[1.02] tracking-[0.01em] text-balance uppercase hyphens-none duration-700 ease-out motion-reduce:animate-none">
              {contatoPagina.titulo}
            </h1>

            <span
              aria-hidden
              className="rule-gold mt-8 block h-px w-24 animate-in fade-in fill-mode-both delay-150 duration-700 motion-reduce:animate-none"
            />

            <p className="mt-8 max-w-[34ch] animate-in fade-in slide-in-from-bottom-2 fill-mode-both text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90 delay-200 duration-700 ease-out motion-reduce:animate-none">
              {contatoPagina.subtitulo}
            </p>
          </div>

          <PainelAtendimento className="min-w-0 animate-in fade-in slide-in-from-bottom-3 fill-mode-both delay-150 duration-500 ease-out motion-reduce:animate-none lg:col-span-6 lg:col-start-7" />
        </div>
      </Container>
    </section>
  );
}
