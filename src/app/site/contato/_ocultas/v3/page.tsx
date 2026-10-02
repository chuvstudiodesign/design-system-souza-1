import type { Metadata } from "next";

import { Recepcao } from "@/components/site5/contato-v3/recepcao";
import { SeletorVersao } from "@/components/site5/seletor-versao";
import { contatoPagina, fotosEspaco } from "@/lib/site5/conteudo";

/**
 * Contato V3 "Recepção" — especificação: `docs/site5-specs/05-contato-v3.md`.
 *
 * Tela dividida: a foto vertical da recepção fica fixa à esquerda enquanto a
 * coluna de leitura desce na ordem do documento, alternando base e muted.
 * O rodapé omite o mapa (a parte 03 já o traz).
 */
export const metadata: Metadata = {
  title: "Entre em contato",
  description: contatoPagina.atendimento.paragrafo,
  robots: { index: false, follow: false },
  openGraph: {
    title: contatoPagina.titulo,
    description: contatoPagina.atendimento.paragrafo,
    images: [
      {
        url: fotosEspaco.recepcaoFrontal.src,
        width: fotosEspaco.recepcaoFrontal.width,
        height: fotosEspaco.recepcaoFrontal.height,
        alt: fotosEspaco.recepcaoFrontal.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Recepcao />
      <SeletorVersao base="/site/contato" atual={3} />
    </>
  );
}
