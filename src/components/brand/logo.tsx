import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Ativos oficiais da marca Souza & Souza (em /public/brand).
 * Fonte: Usuario/Logotipos e Arquivos.
 */
export const brandAssets = {
  wordmark: {
    azul: "/brand/logos/svg/logotipo-preenchido-azul.svg",
    dourado: "/brand/logos/svg/logotipo-preenchido-dourado.svg",
    /* Atenção: os dois arquivos de assinatura vazada vieram com o nome
       trocado na origem. `logotipo-vazado-dourado.svg` desenha o traço em
       #0C344D (azul) e `logotipo-vazado-dourado-1.svg` é o que traz o degradê
       dourado. As chaves abaixo seguem a cor real do traço, não o nome do
       arquivo — renomear os ativos quebraria a correspondência com o material
       entregue pelo cliente. */
    "vazado-azul": "/brand/logos/svg/logotipo-vazado-dourado.svg",
    "vazado-dourado": "/brand/logos/svg/logotipo-vazado-dourado-1.svg",
  },
  /* Assinatura horizontal — símbolo vazado ao lado do nome. Gerada a partir
     do mesmo stack que o header do /site3 renderiza em CSS, com o texto
     convertido em contorno para o arquivo não depender da Trajan instalada. */
  horizontal: {
    azul: "/brand/logos/svg/logotipo-horizontal-azul.svg",
    dourado: "/brand/logos/svg/logotipo-horizontal-dourado.svg",
  },
  symbol: {
    azul: "/brand/logos/svg/simbolo-logotipo-preenchido-azul.svg",
    dourado: "/brand/logos/svg/simbolo-logotipo-preenchido-dourado.svg",
    "vazado-azul": "/brand/logos/svg/simbolo-logotipo-vazado-azul.svg",
    "vazado-dourado": "/brand/logos/svg/simbolo-logotipo-vazado-dourado.svg",
  },
  avatar: {
    1: "/brand/logos/svg/foto-perfil-1.svg",
    2: "/brand/logos/svg/foto-perfil-2.svg",
    3: "/brand/logos/svg/foto-perfil-3.svg",
  },
  pattern: {
    1: "/brand/pattern/estampa-1.svg",
    2: "/brand/pattern/estampa-2.svg",
  },
} as const;

const WORDMARK_RATIO = 1203 / 576;
const SYMBOL_RATIO = 227 / 215;

/**
 * Caminho do PNG equivalente a um ativo SVG. Todo arquivo em /brand tem o par
 * nas duas pastas com o mesmo nome de base, então a conversão é posicional.
 */
export function pngDe(svg: string) {
  return svg.replace("/svg/", "/png/").replace(/\.svg$/, ".png");
}

type WordmarkVariant = keyof typeof brandAssets.wordmark;
type SymbolVariant = keyof typeof brandAssets.symbol;

/**
 * Assinatura vertical: símbolo, nome e a linha "Advocacia e Assessoria".
 *
 * `formato="png"` existe por um motivo específico, e não por preferência.
 * Nas versões vazadas, o contorno é uma hairline: a 64px de altura ela mede
 * menos de um pixel. O SVG rasteriza direto no tamanho final, então cada traço
 * recebe só o antialias analítico do próprio path e o "&S" dentro do símbolo
 * lava até sumir no fundo. O PNG tem 2405px de largura e chega ao mesmo
 * tamanho por redução, com média de área — o traço sub-pixel sobrevive como
 * pixel mais escuro em vez de desaparecer.
 *
 * Vale só para exibição em corpo pequeno. Em tamanho grande o SVG é melhor em
 * todos os aspectos, e é ele que o usuário baixa.
 */
export function Wordmark({
  variant = "azul",
  height = 72,
  className,
  priority,
  formato = "svg",
}: {
  variant?: WordmarkVariant;
  height?: number;
  className?: string;
  priority?: boolean;
  formato?: "svg" | "png";
}) {
  const width = Math.round(height * WORDMARK_RATIO);
  const src = brandAssets.wordmark[variant];

  return (
    <Image
      src={formato === "png" ? pngDe(src) : src}
      alt="Souza &amp; Souza — Advocacia e Assessoria"
      width={width}
      height={height}
      priority={priority}
      className={cn("max-w-full shrink-0", className)}
      style={{ height, width }}
    />
  );
}

export function Symbol({
  variant = "azul",
  size = 48,
  className,
}: {
  variant?: SymbolVariant;
  size?: number;
  className?: string;
}) {
  const width = Math.round(size * SYMBOL_RATIO);

  return (
    <Image
      src={brandAssets.symbol[variant]}
      alt="Símbolo Souza &amp; Souza"
      width={width}
      height={size}
      className={cn("max-w-full shrink-0", className)}
      style={{ height: size, width }}
    />
  );
}

/**
 * ASSINATURA HORIZONTAL — símbolo vazado + nome ao lado.
 *
 * Fonte da verdade da versão horizontal da marca. As medidas abaixo são
 * fechadas e não devem ser alteradas sem redesenho da identidade:
 *
 *   símbolo  40px de altura        (`size={40}`)
 *   gap      12px                  (`gap-3`)
 *   texto    Trajan 20px no desktop, 16px abaixo de `sm`
 *   entreletra 0.14em, caixa alta, `leading-none`
 *   deslocamento vertical +9% da altura do texto
 *
 * O deslocamento é ajuste óptico: as capitulares da Trajan assentam altas em
 * relação ao símbolo, e a centralização geométrica pura deixa o nome flutuando
 * acima do eixo. Por ser relativo à própria altura do texto, ele acompanha a
 * mudança de escala entre mobile e desktop sem precisar de segundo valor.
 *
 * O nome vai como texto vivo, não como imagem: herda a cor do tema, continua
 * selecionável e é lido uma única vez pelo leitor de tela — por isso o símbolo
 * sai da árvore de acessibilidade. Os arquivos em `brandAssets.horizontal`
 * reproduzem exatamente esta geometria para uso fora do site.
 */
export function AssinaturaHorizontal({
  variant = "vazado-dourado",
  className,
  textoClassName,
}: {
  variant?: SymbolVariant;
  className?: string;
  textoClassName?: string;
}) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-3", className)}>
      {/* Ornamento: o nome ao lado já identifica a marca. */}
      <span aria-hidden className="inline-flex">
        <Symbol variant={variant} size={40} />
      </span>

      <span
        className={cn(
          "translate-y-[9%] font-display text-base leading-none tracking-[0.14em] whitespace-nowrap uppercase sm:text-xl",
          textoClassName
        )}
      >
        Souza &amp; Souza
      </span>
    </span>
  );
}

/**
 * Assinatura que troca de versão conforme o tema:
 * azul no claro, dourado no escuro.
 */
export function BrandLogo({
  height = 40,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="dark:hidden">
        <Wordmark variant="azul" height={height} priority />
      </span>
      <span className="hidden dark:inline-flex">
        <Wordmark variant="dourado" height={height} priority />
      </span>
    </span>
  );
}

export function BrandSymbol({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="dark:hidden">
        <Symbol variant="azul" size={size} />
      </span>
      <span className="hidden dark:inline-flex">
        <Symbol variant="dourado" size={size} />
      </span>
    </span>
  );
}
