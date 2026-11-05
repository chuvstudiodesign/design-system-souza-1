import { BarraFixa } from "@/components/lp/barra-fixa";
import { BotaoWhatsapp } from "@/components/lp/botao-whatsapp";
import { CabecalhoLp } from "@/components/lp/cabecalho-lp";
import { ChamadaFinalLp } from "@/components/lp/chamada-final-lp";
import { ConfiancaLp } from "@/components/lp/confianca-lp";
import { CorpoLp } from "@/components/lp/corpo-lp";
import { EquipeLp, EscritorioLp } from "@/components/lp/escritorio-lp";
import { FaqLp } from "@/components/lp/faq-lp";
import { HeroLp } from "@/components/lp/hero-lp";
import { SeletorVersaoLp } from "@/components/lp/seletor-versao-lp";
import { whatsappDaLp } from "@/lib/lp/conversao";
import { lpDosParams, metadadosDaLp, paramsDasLps } from "@/lib/lp/rotas";

/**
 * V3 — equilíbrio. O texto do documento inteiro, como na V1, com parte dos
 * recursos da V2 (faixa de confiança, botão depois do texto, barra fixa no
 * celular) e, no lugar do aviso flutuante e do "Como funciona", dois blocos
 * que dão valor ao escritório: o espaço físico e a equipe.
 */
export const generateStaticParams = paramsDasLps;

export function generateMetadata({ params }: PageProps<"/lp/[assunto]/v3">) {
  return metadadosDaLp(params);
}

export default async function Page({ params }: PageProps<"/lp/[assunto]/v3">) {
  const lp = await lpDosParams(params);
  const whatsapp = whatsappDaLp(lp);

  return (
    <>
      <CabecalhoLp whatsappHref={whatsapp} rotuloBotao={lp.botao} />
      <SeletorVersaoLp slug={lp.slug} atual={3} />
      <main id="conteudo" className="min-w-0 flex-1">
        <HeroLp lp={lp} whatsappHref={whatsapp} apoio={<ConfiancaLp />} />
        <CorpoLp
          lp={lp}
          depois={
            <div className="flex justify-center">
              <BotaoWhatsapp href={whatsapp}>{lp.botao}</BotaoWhatsapp>
            </div>
          }
        />
        <EscritorioLp />
        <EquipeLp />
        <FaqLp lp={lp} />
        <ChamadaFinalLp lp={lp} whatsappHref={whatsapp} />
      </main>
      <BarraFixa href={whatsapp} rotulo={lp.botao} />
    </>
  );
}
