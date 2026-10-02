import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";

import { Abertura } from "@/components/site5/contato/abertura";
import { Endereco } from "@/components/site5/contato/endereco";
import { Formulario } from "@/components/site5/contato/formulario";
import { Redes } from "@/components/site5/contato/redes";
import { contatoPagina, fotosEspaco } from "@/lib/site5/conteudo";

/**
 * Contato da variação 5 — copy do cliente de 02/SET/2026.
 *
 * Especificação: `docs/site5-specs/05-contato.md`. Quatro blocos: abertura
 * com os canais (base) → formulário (muted) → endereço com mapa (base,
 * sangrado) → redes sociais (navy). O rodapé omite o mapa nesta rota.
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
        url: fotosEspaco.fachadaDia.src,
        width: fotosEspaco.fachadaDia.width,
        height: fotosEspaco.fachadaDia.height,
        alt: fotosEspaco.fachadaDia.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Abertura />
      <Formulario />
      <Endereco />
      <Redes />
      <SeletorVersao base="/site/contato" atual={1} />
    </>
  );
}
