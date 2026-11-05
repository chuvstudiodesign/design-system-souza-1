import { Container, Section, Sobretitulo } from "@/components/site/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LandingPage } from "@/lib/lp/conteudo";
import { microcopy } from "@/lib/lp/conversao";

/**
 * "Dúvidas frequentes" do documento. São só duas perguntas por página, então
 * a primeira já abre aberta: o leitor vê a resposta sem precisar descobrir que
 * o item é clicável.
 */
export function FaqLp({
  lp,
  surface = "base",
}: {
  lp: LandingPage;
  surface?: "base" | "muted";
}) {
  return (
    <Section surface={surface} size="md">
      <Container width="narrow">
        <Sobretitulo>{microcopy.sobretituloFaq}</Sobretitulo>

        <Accordion
          type="single"
          collapsible
          defaultValue="0"
          className="mt-8 rounded-2xl bg-card px-6 ring-1 ring-border md:px-8"
        >
          {lp.faq.map((item, i) => (
            <AccordionItem key={item.pergunta} value={String(i)} className="border-border">
              <AccordionTrigger className="min-h-14 py-5 text-left text-[clamp(1.0625rem,1rem+0.2vw,1.1875rem)] font-medium hover:no-underline">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[clamp(1rem,0.97rem+0.15vw,1.0938rem)] leading-relaxed text-pretty text-muted-foreground">
                {item.resposta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
