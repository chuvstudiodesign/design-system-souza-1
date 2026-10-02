"use client";

import { usePathname } from "next/navigation";

/**
 * Esconde o mapa do rodapé na página Contato, que já traz o mesmo mapa no
 * bloco Endereço — dois iframes idênticos na mesma página seriam peso e
 * repetição. O mapa em si chega como `children` e continua renderizado no
 * servidor; aqui só vive a decisão de mostrar ou não.
 */
export function MapaRodape({ children }: { children: React.ReactNode }) {
  const caminho = usePathname();
  // Todas as versões da página de contato (V1, /v2, /v3) já mostram o mapa.
  if (caminho?.startsWith("/site/contato")) return null;
  return children;
}
