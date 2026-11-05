import { CabecalhoLp } from "@/components/lp/cabecalho-lp";
import { ChamadaFinalLp } from "@/components/lp/chamada-final-lp";
import { CorpoLp } from "@/components/lp/corpo-lp";
import { FaqLp } from "@/components/lp/faq-lp";
import { HeroLp } from "@/components/lp/hero-lp";
import { SeletorVersaoLp } from "@/components/lp/seletor-versao-lp";
import { whatsappDaLp } from "@/lib/lp/conversao";
import { lpDosParams, metadadosDaLp, paramsDasLps } from "@/lib/lp/rotas";

/**
 * V1 — fiel ao documento. Exatamente os blocos e o texto enviados: título,
 * subtítulo e botão; texto da página; dúvidas frequentes; chamada final e
 * botão; aviso e identificação no rodapé. Nenhum recurso de conversão a mais.
 */
export const generateStaticParams = paramsDasLps;

export function generateMetadata({ params }: PageProps<"/lp/[assunto]/v1">) {
  return metadadosDaLp(params);
}

export default async function Page({ params }: PageProps<"/lp/[assunto]/v1">) {
  const lp = await lpDosParams(params);
  const whatsapp = whatsappDaLp(lp);

  return (
    <>
      <CabecalhoLp whatsappHref={whatsapp} rotuloBotao={lp.botao} />
      <SeletorVersaoLp slug={lp.slug} atual={1} />
      <main id="conteudo" className="min-w-0 flex-1">
        <HeroLp lp={lp} whatsappHref={whatsapp} />
        <CorpoLp lp={lp} />
        <FaqLp lp={lp} />
        <ChamadaFinalLp lp={lp} whatsappHref={whatsapp} />
      </main>
    </>
  );
}
