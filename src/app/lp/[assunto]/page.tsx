import { redirect } from "next/navigation";

import { lpDosParams, paramsDasLps } from "@/lib/lp/rotas";

/** /lp/<assunto> sem versão abre a V1 — a fiel ao documento. */
export const generateStaticParams = paramsDasLps;

export default async function Page({ params }: PageProps<"/lp/[assunto]">) {
  const lp = await lpDosParams(params);
  redirect(`/lp/${lp.slug}/v1`);
}
