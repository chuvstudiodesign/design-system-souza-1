import { Container, Sobretitulo } from "@/components/site/layout/section";
import { navegacao } from "@/components/site5/navegacao";
import { SumarioAreas } from "@/components/site5/servicos/sumario-areas";
import { servicosIntro } from "@/lib/site5/conteudo";

/** Rótulo do item de menu — o único sobretítulo que a abertura pode usar. */
const rotuloPagina =
  navegacao.find((item) => item.href === "/site/servicos")?.rotulo ?? "";

/**
 * Abertura da página Serviços.
 *
 * Página de consulta: sem fotografia. Texto em 5 colunas à esquerda e, à
 * direita, o sumário numerado das 7 áreas — quem chega aqui quer achar a
 * própria área, e o sumário resolve isso já na primeira dobra.
 */
export function HeroServicos() {
  return (
    <section className="relative isolate bg-background">
      <Container className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="min-w-0 lg:col-span-5">
            <Sobretitulo className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none">
              {rotuloPagina}
            </Sobretitulo>

            <h1 className="mt-6 max-w-[14ch] animate-in fade-in slide-in-from-bottom-2 fill-mode-both font-display text-[clamp(1.8rem,0.99rem+2.88vw,3.375rem)] leading-[1.04] tracking-[0.01em] text-balance uppercase hyphens-none delay-100 duration-700 ease-out motion-reduce:animate-none">
              {servicosIntro.titulo}
            </h1>

            <span
              aria-hidden
              className="rule-gold mt-8 block h-px w-24 animate-in fade-in fill-mode-both delay-200 duration-700 motion-reduce:animate-none"
            />

            <p className="mt-8 max-w-[44ch] animate-in fade-in slide-in-from-bottom-2 fill-mode-both text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90 delay-300 duration-700 ease-out motion-reduce:animate-none">
              {servicosIntro.paragrafo}
            </p>
          </div>

          <SumarioAreas className="min-w-0 lg:col-span-7 lg:col-start-6 lg:pt-2" />
        </div>
      </Container>
    </section>
  );
}
