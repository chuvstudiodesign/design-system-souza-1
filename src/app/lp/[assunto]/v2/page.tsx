import { AvisoFlutuante } from "@/components/lp/aviso-flutuante";
import { BarraFixa } from "@/components/lp/barra-fixa";
import { BotaoWhatsapp } from "@/components/lp/botao-whatsapp";
import { CabecalhoLp } from "@/components/lp/cabecalho-lp";
import { ChamadaFinalLp } from "@/components/lp/chamada-final-lp";
import { ConfiancaLp } from "@/components/lp/confianca-lp";
import { CorpoLp } from "@/components/lp/corpo-lp";
import { FaqLp } from "@/components/lp/faq-lp";
import { HeroLp } from "@/components/lp/hero-lp";
import { PassosLp } from "@/components/lp/passos-lp";
import { SeletorVersaoLp } from "@/components/lp/seletor-versao-lp";
import { perguntaFinal, whatsappDaLp } from "@/lib/lp/conversao";
import { lpDosParams, metadadosDaLp, paramsDasLps } from "@/lib/lp/rotas";

/**
 * V2 — foco em conversão. Mesmo texto da V1; o que muda é o que há em volta
 * para levar ao WhatsApp:
 *
 *   · botão do hero e da chamada final com halo e pulso;
 *   · faixa de confiança sob o botão (dados reais do escritório);
 *   · botão repetido logo depois do texto, no ponto em que a dúvida nasce;
 *   · "Como funciona" em três passos, para tirar o medo do primeiro contato;
 *   · barra fixa de WhatsApp no celular;
 *   · aviso no canto inferior direito, em formato de notificação.
 */
export const generateStaticParams = paramsDasLps;

export function generateMetadata({ params }: PageProps<"/lp/[assunto]/v2">) {
  return metadadosDaLp(params);
}

export default async function Page({ params }: PageProps<"/lp/[assunto]/v2">) {
  const lp = await lpDosParams(params);
  const whatsapp = whatsappDaLp(lp);

  return (
    <>
      <CabecalhoLp whatsappHref={whatsapp} rotuloBotao={lp.botao} />
      <SeletorVersaoLp slug={lp.slug} atual={2} />
      <main id="conteudo" className="min-w-0 flex-1">
        <HeroLp lp={lp} whatsappHref={whatsapp} pulso apoio={<ConfiancaLp />} />
        <CorpoLp
          lp={lp}
          depois={
            <div className="flex justify-center">
              <BotaoWhatsapp href={whatsapp}>{lp.botao}</BotaoWhatsapp>
            </div>
          }
        />
        <PassosLp whatsappHref={whatsapp} rotuloBotao={lp.botaoFinal} />
        <FaqLp lp={lp} surface="muted" />
        <ChamadaFinalLp lp={lp} whatsappHref={whatsapp} pulso />
      </main>
      <BarraFixa href={whatsapp} rotulo={lp.botao} />
      <AvisoFlutuante pergunta={perguntaFinal(lp)} botao={lp.botaoFinal} href={whatsapp} />
    </>
  );
}
