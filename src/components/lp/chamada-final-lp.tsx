import { Container, Section } from "@/components/site/layout/section";
import { BotaoWhatsapp } from "@/components/lp/botao-whatsapp";
import type { LandingPage } from "@/lib/lp/conteudo";

/**
 * "Chamada final" do documento, na superfície azul da marca — o fecho da
 * página e o último convite ao contato.
 */
export function ChamadaFinalLp({
  lp,
  whatsappHref,
  pulso = false,
  apoio,
}: {
  lp: LandingPage;
  whatsappHref: string;
  pulso?: boolean;
  apoio?: React.ReactNode;
}) {
  return (
    <Section id="chamada-final" surface="navy" size="lg" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container width="narrow" className="text-center">
        <div aria-hidden className="rule-gold mx-auto h-px w-24" />
        <p className="mx-auto mt-10 max-w-[40ch] text-[clamp(1.375rem,1.1rem+1.1vw,2rem)] leading-snug font-medium tracking-tight text-balance">
          {lp.chamadaFinal}
        </p>
        <div className="mt-10 flex justify-center">
          <BotaoWhatsapp href={whatsappHref} destaque pulso={pulso}>
            {lp.botaoFinal}
          </BotaoWhatsapp>
        </div>
        {apoio ? <div className="mt-8">{apoio}</div> : null}
      </Container>
    </Section>
  );
}
