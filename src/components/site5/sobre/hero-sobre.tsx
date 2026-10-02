import Image from "next/image";

import { Sobretitulo } from "@/components/site/layout/section";
import { navegacao } from "@/components/site5/navegacao";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/** Rótulo do item de menu — o único sobretítulo que o hero pode usar. */
const rotuloPagina =
  navegacao.find((item) => item.href === "/site/sobre-nos")?.rotulo ?? "";

/**
 * Hero da página Sobre nós.
 *
 * Diferente da home, a foto aqui é assunto e não atmosfera: a recepção real,
 * em opacidade cheia, sangrando à direita e por baixo do header. O texto
 * ocupa 5 colunas à esquerda, alinhado à grade do container pelo
 * `pl-[max(...)]` — o grid em si corre de borda a borda.
 *
 * No celular a foto vem primeiro (y=0, sob o header) e o texto depois.
 * É a imagem de LCP da página: `preload`, estática, sem `Revelar`.
 */
export function HeroSobre() {
  const foto = fotosEspaco.recepcaoAtendimento;

  return (
    <section className="relative isolate overflow-clip bg-background">
      <div className="grid grid-cols-1 lg:min-h-[min(54rem,100svh)] lg:grid-cols-12">
        <div className="relative aspect-[5/4] min-w-0 sm:aspect-[16/10] lg:order-last lg:col-span-7 lg:aspect-auto">
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-[70%_55%]"
          />
          {/* Proteção do header transparente sobre a foto. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background/40 to-background/0"
          />
          {/* Só no empilhamento: funde a base da foto com o texto abaixo. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-background/0 lg:hidden"
          />
        </div>

        <div className="min-w-0 px-6 pt-8 pb-20 md:px-10 md:pb-24 lg:col-span-5 lg:self-end lg:pt-40 lg:pr-12 lg:pb-28 lg:pl-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))]">
          <Sobretitulo className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none">
            {rotuloPagina}
          </Sobretitulo>

          <h1 className="mt-6 animate-in fade-in slide-in-from-bottom-2 fill-mode-both font-display text-[clamp(1.6875rem,0.9rem+1.8vw,2.3625rem)] leading-[1.08] tracking-[0.01em] text-balance uppercase delay-100 duration-700 ease-out motion-reduce:animate-none">
            {sobre.hero.titulo}
          </h1>

          <div
            aria-hidden
            className="rule-gold mt-8 h-px w-24 animate-in fade-in fill-mode-both delay-300 duration-700 motion-reduce:animate-none"
          />

          <div className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both delay-400 duration-700 ease-out motion-reduce:animate-none">
            <p className="mt-8 max-w-[34ch] text-[clamp(1.0688rem,0.945rem+0.45vw,1.2937rem)] leading-snug text-pretty text-foreground/90">
              {sobre.hero.subtitulo}
            </p>
            <p className="mt-5 max-w-[52ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
              {sobre.hero.paragrafo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
