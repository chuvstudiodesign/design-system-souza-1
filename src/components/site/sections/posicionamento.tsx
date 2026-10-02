import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Parallax } from "@/components/site/motion/parallax";
import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import { marca } from "@/lib/site/contato";
import { institucional } from "@/lib/site/conteudo";

import { Container, Section, Sobretitulo } from "../layout/section";

/**
 * Posicionamento do escritório.
 *
 * Inverte o eixo do hero — aqui a imagem vem à esquerda — e é a primeira foto
 * real da equipe na página, tratada como protagonista.
 *
 * O slogan aparece como citação destacada. No site antigo ele estava enterrado
 * no fim de um parágrafo da página "Sobre nós", na única vez em que aparecia.
 */
export function Posicionamento() {
  return (
    <Section aria-labelledby="posicionamento-titulo">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Revelar asChild variante="esquerda" duracao={800}>
          <div className="lg:col-span-5">
            {/* A foto anda um pouco mais devagar que o texto ao lado — é o que
                dá profundidade à seção sem nenhum efeito aparente. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-lg">
              <Parallax intensidade={0.04} className="absolute -inset-y-8 inset-x-0">
                <Image
                  src="/site/home/sobre-capa2.jpg"
                  alt="Duas advogadas do escritório em pé, revisando juntas uma pasta com a marca Souza & Souza"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </div>
        </Revelar>

        <Revelar
          asChild
          variante="direita"
          atraso={120}
          duracao={800}
        >
          <div className="lg:col-span-7">
          <Sobretitulo>Quem somos</Sobretitulo>

          <h2
            id="posicionamento-titulo"
            className="mt-6 text-[clamp(1.625rem,1.25rem+1.6vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance"
          >
            {institucional.sobreTitulo}
          </h2>

          <p className="mt-6 max-w-[62ch] text-[clamp(1.0625rem,1rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-muted-foreground">
            {institucional.sobreParagrafo}
          </p>

          <blockquote className="mt-10 border-l-2 border-gold-500 pl-6">
            <p className="font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-snug text-balance">
              {marca.slogan}
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              {marca.assinatura}
            </footer>
          </blockquote>

          <Button asChild variant="outline" size="lg" className="mt-10 h-12 px-5">
            <Link href="/site-v1/sobre-nos">
              Conhecer o escritório
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
          </div>
        </Revelar>
      </Container>
    </Section>
  );
}
