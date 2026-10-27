"use client";

import { usePathname } from "next/navigation";

/**
 * `usePathname` com `/site4` lido como `/site` — a `/site4` é espelho do site
 * principal (ver `src/app/site4/layout.tsx`), então item ativo do menu, botão
 * flutuante e mapa do rodapé precisam se comportar igual nas duas.
 */
export function useCaminhoSite() {
  return usePathname().replace(/^\/site4(?=\/|$)/, "/site");
}
