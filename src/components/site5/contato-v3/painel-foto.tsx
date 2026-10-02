import Image from "next/image";

import { fotosEspaco } from "@/lib/site5/conteudo";

const foto = fotosEspaco.recepcaoFrontal;

/**
 * Painel da foto da V3 — a recepção do escritório presente a página inteira.
 *
 * Mobile/tablet: faixa abaixo do header, fundindo no fundo antes do H1. `lg+`:
 * metade esquerda sangrada, `sticky top-0 h-dvh`, subindo por trás do header
 * transparente. É a imagem de LCP: `preload`, sem `Revelar`, sem animação.
 * Nenhum texto sobre a foto — o mármore claro não sustenta contraste.
 */
export function PainelFoto() {
  return (
    <div className="relative min-w-0 lg:col-span-5">
      <div className="relative mt-18 aspect-[5/4] max-h-[60svh] w-full overflow-hidden sm:aspect-[16/9] lg:sticky lg:top-0 lg:mt-0 lg:aspect-auto lg:h-dvh lg:max-h-none [@media(orientation:landscape)_and_(max-height:30rem)]:aspect-[21/9]">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          preload
          quality={95}
          sizes="(max-width: 1023px) 100vw, 42vw"
          className="object-cover object-[50%_30%] lg:object-[50%_45%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-background/0 to-background lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-40 bg-linear-to-b from-background/80 to-background/0 lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-gold-500/40 lg:block"
        />
      </div>
    </div>
  );
}
