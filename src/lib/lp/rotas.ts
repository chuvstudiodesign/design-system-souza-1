import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { landingPages, landingPorSlug } from "./conteudo";
import { fotosTema } from "./imagens";

/** As 6 páginas são geradas no build; um assunto fora da lista dá 404. */
export function paramsDasLps() {
  return landingPages.map((lp) => ({ assunto: lp.slug }));
}

export async function lpDosParams(params: Promise<{ assunto: string }>) {
  const { assunto } = await params;
  const lp = landingPorSlug(assunto);
  if (!lp) notFound();
  return lp;
}

/** "Título da página (SEO)" do documento + a foto do tema no compartilhamento. */
export async function metadadosDaLp(
  params: Promise<{ assunto: string }>
): Promise<Metadata> {
  const lp = await lpDosParams(params);
  const foto = fotosTema[lp.slug];
  return {
    title: { absolute: lp.seo },
    description: lp.subtitulo,
    openGraph: {
      title: lp.seo,
      description: lp.subtitulo,
      images: [{ url: foto.src, width: foto.width, height: foto.height, alt: foto.alt }],
    },
  };
}
