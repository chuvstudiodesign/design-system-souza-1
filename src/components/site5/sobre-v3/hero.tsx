import Image from "next/image";

import { Container, Sobretitulo } from "@/components/site/layout/section";
import { navegacao } from "@/components/site5/navegacao";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/** Rótulo do item de menu — o único sobretítulo que o hero pode usar. */
const rotuloPagina =
  navegacao.find((item) => item.href === "/site/sobre-nos")?.rotulo ?? "";

/**
 * O título parte no último espaço ("Souza & Souza" / "Advocacia"). O espaço
 * fica dentro do primeiro `span`: o leitor de tela ouve a frase inteira.
 */
const corte = sobre.hero.titulo.lastIndexOf(" ");
const tituloInicio = sobre.hero.titulo.slice(0, corte);
const tituloFim = sobre.hero.titulo.slice(corte + 1);

/**
 * Ano de início, extraído do próprio parágrafo ("Desde outubro/2007…") —
 * nenhum texto novo. É decorativo (`aria-hidden`) e fica logo acima da frase
 * completa, que é o que o leitor de tela ouve. Se não casar, não renderiza.
 */
const ano = sobre.hero.paragrafo.match(/\d{4}/)?.[0];

const cascata =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * Hero da V3 "Planta" — a fachada da instituição: nome, ano de início e o
 * lugar físico.
 *
 * Banda navy com duas colunas 7/5 separadas por filete vertical; o ano em
 * Trajan dourado é o dominante. A foto da fachada entra em banda larga
 * abaixo, fora do container — o fio superior dela é a própria troca navy →
 * foto. É a imagem de LCP: `preload`, estática, sem `Revelar`.
 */
export function Hero() {
  const foto = fotosEspaco.fachadaSol;

  return (
    <section className="relative isolate overflow-clip bg-navy text-navy-foreground">
      <Container className="pt-36 pb-16 md:pt-44 md:pb-20 lg:pt-48 lg:pb-24">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7 lg:pr-12">
            <Sobretitulo className={cascata}>{rotuloPagina}</Sobretitulo>

            <h1
              className={`mt-6 font-display text-[clamp(1.6875rem,1.08rem+2.34vw,3.15rem)] leading-[1.05] tracking-[0.01em] uppercase delay-100 ${cascata}`}
            >
              <span className="block">{tituloInicio} </span>
              <span className="block">{tituloFim}</span>
            </h1>

            <div
              aria-hidden
              className="rule-gold mt-8 h-px w-24 animate-in fade-in fill-mode-both delay-300 duration-700 motion-reduce:animate-none"
            />

            <p
              className={`mt-8 max-w-[36ch] text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-navy-foreground/90 delay-400 ${cascata}`}
            >
              {sobre.hero.subtitulo}
            </p>
          </div>

          <div
            className={`min-w-0 border-t border-navy-foreground/15 pt-10 lg:col-span-5 lg:self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 delay-500 ${cascata}`}
          >
            {ano ? (
              <p
                aria-hidden
                // O degradê é recortado pelo texto (`background-clip`), e só
                // pinta dentro da caixa do elemento: com entrelinha 0,85 o topo
                // dos algarismos ficava fora dela e sumia. O `pt` devolve esse
                // topo sem mudar o espaçamento visual.
                className="-mt-[0.15em] pt-[0.15em] font-display text-[clamp(4.05rem,2.16rem+7.2vw,8.55rem)] leading-[0.85] tracking-[-0.01em] text-gold-gradient"
              >
                {ano}
              </p>
            ) : null}
            <p className="mt-8 max-w-[44ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-navy-foreground/85">
              {sobre.hero.paragrafo}
            </p>
          </div>
        </div>
      </Container>

      <div className="relative aspect-[4/3] md:aspect-[21/9] lg:aspect-auto lg:h-[min(38rem,62svh)]">
        <Image
          quality={95}
          src={foto.src}
          alt={foto.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_58%]"
        />
      </div>
    </section>
  );
}
