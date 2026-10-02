import type { Metadata } from "next";

import { Abertura } from "@/components/site5/contato-v2/abertura";
import { Atendimento } from "@/components/site5/contato-v2/atendimento";
import { Endereco } from "@/components/site5/contato-v2/endereco";
import { Mensagem } from "@/components/site5/contato-v2/mensagem";
import { Redes } from "@/components/site5/contato-v2/redes";
import { contatoPagina, fotosEspaco } from "@/lib/site5/conteudo";

/**
 * Contato V2 "Carta" — especificação: `docs/site5-specs/05-contato-v2.md`.
 * Escolhida pelo cliente em 29/SET/2026. A V1 e a V3 ficam guardadas em
 * `_ocultas/` (pasta privada: o Next não gera rota para ela).
 *
 * Eixo central único, títulos todos em Trajan, partes numeradas em romanos e
 * na ordem do documento: abertura (base) → I mensagem (muted) → II equipe
 * (base) → III endereço (navy) → IV redes (base). O rodapé omite o mapa.
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
        url: fotosEspaco.fachadaHdr4032.src,
        width: fotosEspaco.fachadaHdr4032.width,
        height: fotosEspaco.fachadaHdr4032.height,
        alt: fotosEspaco.fachadaHdr4032.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Abertura />
      <Mensagem />
      <Atendimento />
      <Endereco />
      <Redes />
    </>
  );
}
