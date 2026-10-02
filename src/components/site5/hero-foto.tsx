import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";

import { Container, Sobretitulo } from "@/components/site/layout/section";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";

/**
 * Hero da variação 5 — mesma estrutura do hero da variação 4
 * (`src/components/site4/hero-foto.tsx`): sobretítulo, frase de abertura em
 * 5/12, promessa em escala de display, filete de marca e, na mesma linha,
 * parágrafo e botões.
 *
 * Mapeamento do copy (instrução do usuário, 24/09/2026):
 *   · onde a v4 tinha o preâmbulo "Especialistas em…", entra o título do
 *     documento: "Experiência jurídica para orientar decisões e proteger
 *     direitos.";
 *   · a frase grande da v4 ("Protegendo seu futuro, garantindo seus
 *     direitos.") é mantida como H1;
 *   · os dois parágrafos do documento formam um bloco único, no mesmo tamanho
 *     do parágrafo da v4.
 *
 * Fotografia:
 *   · desktop (lg+): atmosfera de fundo a 30%, como na v4;
 *   · mobile: a foto vira assunto — sobe para o topo, abaixo do header, com o
 *     enquadramento nas três advogadas (que ocupam de 40% a 78% da largura do
 *     arquivo), e o texto vem embaixo. Com a foto de fundo, o celular só
 *     mostrava a parede.
 *
 * Qualidade máxima nas duas: `unoptimized`, sem recompressão do Next.
 *   · desktop: o WebP original sem perda (3840px), decisão do cliente na v4;
 *   · mobile: `/site5/home-hero-mobile.webp`, o mesmo original reduzido a
 *     2880px em WebP q95 (~480 KB). A janela quadrada mostra ~45% da largura
 *     da foto, então 2880px ainda dão 3x de densidade num celular de 430px —
 *     nitidez máxima sem os 6,5 MB do original.
 * A do mobile é o LCP no celular: `loading="eager"` + `fetchPriority="high"`.
 * A do desktop fica lazy — com `display:none` no celular, não é baixada.
 */
export function HeroFoto() {
  const [paragrafo1, paragrafo2] = home.hero.paragrafos;

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Desktop — foto de fundo a 50%, ancorada à esquerda. Decorativa.
          Teste de 29/09/2026: era `opacity-30`; subiu 20 pontos (5 + 15) para clarear
          o topo. O degradê abaixo continua escurecendo até o fundo. Para
          reverter, volte `opacity-50` para `opacity-30`. */}
      <Image
        src="/site/home/hero.webp"
        alt=""
        aria-hidden
        fill
        unoptimized
        className="-z-20 hidden object-cover object-left opacity-50 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-linear-to-b from-background/0 to-background lg:block"
      />

      {/* Mobile e tablet — foto no topo, abaixo do header (`mt-18`), fundindo
          no azul na base. `object-position` calculado para centrar as três
          advogadas em cada proporção.

          Corte de 35% na base (pedidos de 24/09/2026): a caixa visível tem 65%
          da altura original (quadrado → 20:13; 3:2 → 30:13) e a imagem mora
          numa camada interna com 154% dessa altura, ancorada no topo. Assim a
          escala e o enquadramento das advogadas não mudam — só some a faixa
          de baixo. O degradê cobre a foto inteira e começa a escurecer já no
          terço superior, para o azul subir bem na foto. */}
      <div className="relative mt-18 aspect-[20/13] max-h-[70svh] w-full overflow-hidden sm:aspect-[30/13] lg:hidden [@media(orientation:landscape)_and_(max-height:30rem)]:aspect-[21/9]">
        <div className="absolute inset-x-0 -top-[10%] h-[154%]">
          <Image
            src="/site5/home-hero-mobile.webp"
            alt=""
            aria-hidden
            fill
            unoptimized
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[67%_center] sm:object-[78%_center]"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/0 from-15% via-background/60 via-60% to-background"
        />
      </div>

      <Container className="relative -mt-10 pb-20 sm:-mt-16 md:pb-28 lg:mt-0 lg:pt-48 lg:pb-36">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:gap-y-12 lg:grid-cols-12 lg:gap-y-14">
          <div className="lg:col-span-12">
            {/* Bold (700) a pedido do cliente em 29/09/2026, para o sobretítulo
                aparecer mais sobre a foto. A Trajan só tem 400 e 700; para
                reverter, remova o `font-bold`. */}
            <Sobretitulo className="animate-in font-bold fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none">
              {home.hero.sobretitulo}
            </Sobretitulo>
          </div>

          <p className="max-w-[46ch] animate-in fade-in slide-in-from-bottom-3 fill-mode-both text-[clamp(0.9563rem,0.9rem+0.315vw,1.2375rem)] leading-snug text-pretty text-foreground/80 delay-100 duration-700 ease-out motion-reduce:animate-none lg:col-span-5 lg:mt-2">
            {home.hero.titulo}
          </p>

          <h1 className="animate-in slide-in-from-bottom-2 fill-mode-both text-[clamp(2.25rem,0.99rem+5.04vw,4.725rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance duration-500 ease-out motion-reduce:animate-none lg:col-span-11 lg:col-start-1">
            {home.hero.promessa}
          </h1>

          {/* Filete de marca fechando o bloco tipográfico. */}
          <div
            aria-hidden
            className="rule-gold h-px w-full animate-in fade-in fill-mode-both delay-500 duration-1000 motion-reduce:animate-none lg:col-span-12"
          />

          <div className="flex min-w-0 flex-col gap-x-10 gap-y-8 animate-in fade-in slide-in-from-bottom-3 fill-mode-both delay-500 duration-700 ease-out motion-reduce:animate-none lg:col-span-12 lg:flex-row lg:items-end lg:justify-between">
            {/* Os dois parágrafos do documento, no mesmo tamanho e cor — o
                estilo do parágrafo único do hero da v4. */}
            <div className="max-w-[62ch] space-y-4 text-[clamp(0.9563rem,0.9rem+0.225vw,1.0125rem)] leading-relaxed text-pretty text-muted-foreground">
              <p>{paragrafo1}</p>
              <p>{paragrafo2}</p>
            </div>

            <div id="hero-cta" className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-11 w-full px-5 py-3 text-base whitespace-normal sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph className="size-5" />
                  {home.contato.botao}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-auto min-h-11 w-full px-4 py-3 text-base whitespace-normal sm:w-auto"
              >
                <a href="#areas">
                  {home.areas.sobretitulo}
                  <ArrowDownIcon aria-hidden />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
