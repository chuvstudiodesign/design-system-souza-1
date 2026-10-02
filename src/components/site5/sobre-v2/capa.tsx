import Image from "next/image";

import { Container, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { navegacao } from "@/components/site5/navegacao";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

/** Rótulo do item de menu — o único sobretítulo que a capa pode usar. */
const rotuloPagina =
  navegacao.find((item) => item.href === "/site/sobre-nos")?.rotulo ?? "";

/**
 * O título parte no último espaço ("Souza & Souza" / "Advocacia") para a
 * quebra ficar controlada. O texto não muda; o espaço fica dentro do primeiro
 * `span`, então o leitor de tela ouve a frase inteira.
 */
const corte = sobre.hero.titulo.lastIndexOf(" ");
const tituloInicio = sobre.hero.titulo.slice(0, corte);
const tituloFim = sobre.hero.titulo.slice(corte + 1);

/**
 * Capa da V2 "Revista" — a recepção real em tela cheia, com o nome sobre a
 * imagem, como capa de revista.
 *
 * A foto começa sob o header (o `main` tem `-mt-18`) e o véu a leva até o
 * fundo da página sem corte. O parágrafo é o "olho" da matéria: sai do eixo
 * do título e ancora à direita, abaixo da foto.
 *
 * É a imagem de LCP da página: `preload`, estática, sem `Revelar`.
 */
export function Capa({
  foto = fotosEspaco.recepcaoBalcaoMarca,
  enquadramento = "object-[80%_35%] md:object-[60%_35%]",
  deslocamento,
}: {
  /** Foto de fundo. Padrão: DSC03972 (K+). A V2 da página usa a IMG_4002-HDR. */
  foto?: { src: string; width: number; height: number; alt: string };
  /** `object-position` da foto em cada largura. */
  enquadramento?: string;
  /** Classes da camada da foto — ex.: `top-18` para ela começar abaixo do header. */
  deslocamento?: string;
} = {}) {

  return (
    <section className="relative isolate overflow-clip bg-background">
      <div className="relative h-[max(36rem,86svh)] w-full lg:h-[min(60rem,100svh)]">
        <div className={cn("absolute inset-0", deslocamento)}>
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            preload
            sizes="100vw"
            className={cn("object-cover", enquadramento)}
          />
        </div>
        {/* Proteção do header transparente sobre a foto. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/85 to-background/0"
        />
        {/* Véu de leitura: leva a foto até o fundo da página. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t from-background via-background/80 to-background/0 lg:h-[62%]"
        />

        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-12 md:pb-16 lg:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-10">
                {/* Bold (700) a pedido do cliente em 29/09/2026, como na home.
                    A Trajan só tem 400 e 700; para reverter, remova `font-bold`. */}
                <Sobretitulo className="animate-in font-bold fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none">
                  {rotuloPagina}
                </Sobretitulo>

                <h1 className="mt-6 animate-in fade-in slide-in-from-bottom-2 fill-mode-both font-display text-[clamp(1.6875rem,0.81rem+4.14vw,4.725rem)] leading-[1.02] tracking-[0.01em] uppercase delay-100 duration-700 ease-out motion-reduce:animate-none">
                  <span className="block">{tituloInicio} </span>
                  <span className="block">{tituloFim}</span>
                </h1>

                <div
                  aria-hidden
                  className="rule-gold mt-8 h-px w-24 animate-in fade-in fill-mode-both delay-300 duration-700 motion-reduce:animate-none"
                />

                <p className="mt-8 max-w-[40ch] animate-in fade-in slide-in-from-bottom-2 fill-mode-both text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90 delay-400 duration-700 ease-out motion-reduce:animate-none">
                  {sobre.hero.subtitulo}
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <Revelar className="min-w-0 lg:col-span-6 lg:col-start-7">
            <p className="max-w-[56ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85 lg:border-l lg:border-gold-500/40 lg:pl-8">
              {sobre.hero.paragrafo}
            </p>
          </Revelar>
        </div>
      </Container>
    </section>
  );
}
