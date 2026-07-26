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
    "vazado-dourado": "/brand/logos/svg/logotipo-vazado-dourado.svg",
    "vazado-dourado-alt": "/brand/logos/svg/logotipo-vazado-dourado-1.svg",
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

type WordmarkVariant = keyof typeof brandAssets.wordmark;
type SymbolVariant = keyof typeof brandAssets.symbol;

export function Wordmark({
  variant = "azul",
  height = 72,
  className,
  priority,
}: {
  variant?: WordmarkVariant;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * WORDMARK_RATIO);

  return (
    <Image
      src={brandAssets.wordmark[variant]}
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
