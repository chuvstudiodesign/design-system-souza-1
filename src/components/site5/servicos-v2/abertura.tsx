import { Container, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { navegacao } from "@/components/site5/navegacao";
import { IndiceCards } from "@/components/site5/servicos-v2/indice-cards";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site5/contato";
import { servicosIntro } from "@/lib/site5/conteudo";

/** Rótulo do item de menu — o único sobretítulo que a abertura pode usar. */
const rotuloPagina =
  navegacao.find((item) => item.href === "/site/servicos")?.rotulo ?? "";

const entrada =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * Abertura da Serviços V2 ("Painéis").
 *
 * H1 em 7 colunas, lead + CTA em 5 alinhados pela base; o filete dourado
 * separa "o que é" de "para onde ir", e abaixo dele o índice em cards de
 * acesso (4 + 3). O CTA carrega o único `shadow-gold` da página.
 */
export function AberturaV2() {
  return (
    <section className="relative isolate bg-background">
      <Container className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="min-w-0 lg:col-span-7">
            <Sobretitulo className={entrada}>{rotuloPagina}</Sobretitulo>
            <h1
              className={`mt-6 max-w-[16ch] font-display text-[clamp(1.8rem,0.99rem+2.88vw,3.375rem)] leading-[1.04] tracking-[0.01em] text-balance uppercase hyphens-none delay-100 ${entrada}`}
            >
              {servicosIntro.titulo}
            </h1>
          </div>

          <div className={`min-w-0 delay-200 lg:col-span-5 lg:pb-2 ${entrada}`}>
            <p className="max-w-[46ch] text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90">
              {servicosIntro.paragrafo}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-auto min-h-11.5 w-full px-7 py-3 text-base whitespace-normal shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph className="size-5" />
                {servicosIntro.botao}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          </div>
        </div>

        <span
          aria-hidden
          className={`rule-gold mt-14 block h-px w-full delay-300 md:mt-16 ${entrada}`}
        />

        <Revelar>
          <IndiceCards className="mt-10 md:mt-12" />
        </Revelar>
      </Container>
    </section>
  );
}
