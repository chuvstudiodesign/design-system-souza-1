import { Container, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { navegacao } from "@/components/site5/navegacao";
import { FaixaIndice } from "@/components/site5/servicos-v3/faixa-indice";
import { servicosIntro } from "@/lib/site5/conteudo";

/** Rótulo do item de menu — o único sobretítulo que a abertura pode usar. */
const rotuloPagina =
  navegacao.find((item) => item.href === "/site/servicos")?.rotulo ?? "";

const entrada =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * Abertura da Serviços V3 ("Capítulos").
 *
 * H1 em Trajan largo (9/12); o lead desce deslocado para a coluna 5 — a mesma
 * onde começa o conteúdo de todos os capítulos abaixo, e é aqui que o eixo da
 * página se estabelece (coluna 3 entre 1024 e 1279px, como os capítulos).
 * Sem botão: o CTA com `shadow-gold` fica no fecho.
 */
export function AberturaV3() {
  return (
    <section className="relative isolate bg-background">
      <Container className="pt-32 pb-14 md:pt-40 md:pb-16 lg:pt-44 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
          <div className="min-w-0 lg:col-span-9">
            <Sobretitulo className={entrada}>{rotuloPagina}</Sobretitulo>
            <h1
              className={`mt-6 max-w-[20ch] font-display text-[clamp(2.025rem,0.9rem+4.14vw,4.05rem)] leading-[1.02] tracking-[0.01em] text-balance uppercase hyphens-none delay-100 ${entrada}`}
            >
              {servicosIntro.titulo}
            </h1>
          </div>

          <span
            aria-hidden
            className={`rule-gold mt-10 block h-px w-24 delay-200 lg:col-span-12 ${entrada}`}
          />

          <p
            className={`mt-8 max-w-[52ch] min-w-0 text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90 delay-300 lg:col-span-7 lg:col-start-3 xl:col-span-6 xl:col-start-5 ${entrada}`}
          >
            {servicosIntro.paragrafo}
          </p>
        </div>

        <Revelar>
          <FaixaIndice className="mt-14 md:mt-16" />
        </Revelar>
      </Container>
    </section>
  );
}
