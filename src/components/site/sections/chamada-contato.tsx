import Link from "next/link";
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import { contato, whatsappHref } from "@/lib/site/contato";

import { Container, Section, Sobretitulo } from "../layout/section";

/**
 * Fecho da home. Respiro largo de propósito — é o último movimento da página,
 * e a única coisa que precisa acontecer aqui é o visitante conseguir falar
 * com alguém.
 */
export function ChamadaContato() {
  return (
    <Section size="lg" aria-labelledby="chamada-titulo">
      <Container className="flex flex-col items-center text-center">
        <Revelar className="flex flex-col items-center">
          <Sobretitulo className="justify-center">
            Primeira conversa sem compromisso
          </Sobretitulo>

          <h2
            id="chamada-titulo"
            className="mt-6 max-w-[20ch] text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-tight font-semibold tracking-tight text-balance"
          >
            Vamos entender o seu caso.
          </h2>

          <p className="mt-6 max-w-[52ch] text-[clamp(1.0625rem,1rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-muted-foreground">
            Atendimento em {contato.cidade}/{contato.uf} e região. Fale
            diretamente com o escritório pelo WhatsApp ou pelo telefone.
          </p>
        </Revelar>

        <Revelar atraso={140} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-13 px-6 text-base">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <PhoneIcon aria-hidden />
              Falar no WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-13 px-6 text-base"
          >
            <Link href="/site/contato">
              Ver formas de contato
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </Revelar>

        <Revelar
          asChild
          atraso={220}
        >
        <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon aria-hidden className="size-4 shrink-0" />
          {contato.endereco.completo}
        </p>
        </Revelar>
      </Container>
    </Section>
  );
}
