import Image from "next/image";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

import { Container, Section, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { fotoEquipe, fotosBlocoEscritorio } from "@/lib/lp/imagens";
import { contato, mapaLinkHref } from "@/lib/site5/contato";
import { home, profissionaisIntro } from "@/lib/site5/conteudo";

/**
 * Blocos de valor do escritório na V3. Todo o texto é o copy institucional do
 * site (bloco "O Escritório" da home e a introdução de Profissionais), lido de
 * `@/lib/site5/conteudo` sem alteração — nada aqui é texto novo.
 */

/** "O Escritório": texto à esquerda, mosaico de três fotos à direita. */
export function EscritorioLp() {
  const [fachada, recepcao, sala] = fotosBlocoEscritorio;

  return (
    <Section surface="base" size="md">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="min-w-0 lg:col-span-5">
            <Sobretitulo>{home.escritorio.sobretitulo}</Sobretitulo>
            <h2 className="mt-6 text-[clamp(1.625rem,1.3rem+1.3vw,2.375rem)] leading-tight font-medium tracking-tight text-balance">
              {home.escritorio.titulo}
            </h2>
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-pretty text-muted-foreground">
              {home.escritorio.paragrafos.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <a
              href={mapaLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-start gap-3 text-[0.9688rem] text-foreground/90 underline-offset-4 hover:underline"
            >
              <MapPinIcon aria-hidden className="mt-1 size-4 shrink-0 text-gold-500" />
              <span>
                {contato.endereco.completo}
                <ArrowUpRightIcon aria-hidden className="ml-1 inline size-4 text-muted-foreground" />
                <span className="sr-only"> (abre o mapa em nova aba)</span>
              </span>
            </a>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3 md:gap-4 lg:col-span-7">
            <Revelar variante="zoom" className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl">
              <Image src={fachada.src} alt={fachada.alt} fill quality={95} sizes="(max-width: 1023px) calc(100vw - 3rem), 44rem" className="object-cover" />
            </Revelar>
            <Revelar variante="zoom" atraso={80} className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl">
              <Image src={recepcao.src} alt={recepcao.alt} fill quality={95} sizes="(max-width: 1023px) 50vw, 22rem" className="object-cover" />
            </Revelar>
            <Revelar variante="zoom" atraso={160} className="relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl">
              <Image src={sala.src} alt={sala.alt} fill quality={95} sizes="(max-width: 1023px) 50vw, 22rem" className="object-cover" />
            </Revelar>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Quem atende: a foto das sócias e a introdução de Profissionais do site. */
export function EquipeLp() {
  return (
    <Section surface="muted" size="md" className="overflow-hidden">
      <Container>
        <Revelar variante="zoom" className="relative aspect-[16/9] overflow-hidden rounded-3xl md:aspect-[21/9]">
          <Image
            src={fotoEquipe.src}
            alt={fotoEquipe.alt}
            fill
            quality={95}
            sizes="(max-width: 1279px) calc(100vw - 3rem), 80rem"
            style={{ objectPosition: fotoEquipe.posicao }}
            className="object-cover"
          />
        </Revelar>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Sobretitulo>{profissionaisIntro.titulo}</Sobretitulo>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <h2 className="text-[clamp(1.5rem,1.25rem+1vw,2.125rem)] leading-tight font-medium tracking-tight text-balance">
              {profissionaisIntro.introTitulo}
            </h2>
            <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-pretty text-muted-foreground">
              {profissionaisIntro.introParagrafo}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
