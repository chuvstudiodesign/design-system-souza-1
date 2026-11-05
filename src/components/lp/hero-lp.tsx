import { Container, Sobretitulo } from "@/components/site/layout/section";
import { BotaoWhatsapp } from "@/components/lp/botao-whatsapp";
import { ImagemHero } from "@/components/lp/imagem-hero";
import type { LandingPage } from "@/lib/lp/conteudo";
import { opcoesHero } from "@/lib/lp/imagens";

/**
 * Primeira dobra: título principal, subtítulo e botão do documento, com a foto
 * ao lado (≥ lg) ou acima do texto (celular, onde a foto vem primeiro e é
 * cortada mais baixa para o botão aparecer sem rolar).
 *
 * `pulso` liga o anel animado do botão (V2); `apoio` recebe o que cada versão
 * acrescenta sob o botão — a faixa de confiança, por exemplo.
 */
export function HeroLp({
  lp,
  whatsappHref,
  pulso = false,
  apoio,
}: {
  lp: LandingPage;
  whatsappHref: string;
  pulso?: boolean;
  apoio?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Halo de marca atrás da foto — decorativo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 -z-10 size-[42rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <Container className="pt-6 pb-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* No celular a foto é uma faixa baixa (16:10) para o botão do
              documento aparecer na primeira tela, sem rolar. */}
          <ImagemHero
            opcoes={opcoesHero(lp)}
            className="mx-auto w-full max-w-xl lg:order-2 lg:col-span-5 lg:max-w-none [&>div:first-child]:max-lg:aspect-[16/10]"
          />

          <div className="min-w-0 lg:order-1 lg:col-span-7">
            <Sobretitulo>{lp.nome}</Sobretitulo>

            <h1 className="mt-5 text-[clamp(1.875rem,1.2rem+3.2vw,3.6rem)] leading-[1.05] font-medium tracking-[-0.025em] text-balance">
              {lp.titulo}
            </h1>

            <p className="mt-4 max-w-[52ch] md:mt-6 text-[clamp(1.0625rem,1rem+0.3vw,1.25rem)] leading-relaxed text-pretty text-muted-foreground">
              {lp.subtitulo}
            </p>

            <div id="hero-cta" className="mt-6 md:mt-10">
              <BotaoWhatsapp href={whatsappHref} destaque pulso={pulso}>
                {lp.botao}
              </BotaoWhatsapp>
            </div>

            {apoio ? <div className="mt-8">{apoio}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
