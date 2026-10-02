import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";

import { HaloPonteiro } from "@/components/site/motion/halo-ponteiro";
import { Parallax } from "@/components/site/motion/parallax";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site/contato";
import { institucional } from "@/lib/site/conteudo";

import { Container, Sobretitulo } from "../layout/section";

/**
 * Hero da home.
 *
 * Composição assimétrica 7/5: a declaração ocupa a esquerda e a caneta sangra
 * pela direita. O H1 tem 132 caracteres — vai em Inter com `clamp`, nunca em
 * Trajan, que é capitular e ficaria ilegível nesse comprimento.
 *
 * A entrada aqui é CSS puro (`tw-animate-css`), não IntersectionObserver: o H1
 * é o elemento de LCP e não pode esperar a hidratação para pintar. Por isso o
 * hero não usa `<Revelar>` — só o conteúdo abaixo da dobra usa.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      {/* Halo dourado difuso ao fundo. Decorativo, deriva atrás do ponteiro. */}
      <HaloPonteiro className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[38rem] rounded-full bg-gold-500/10 blur-3xl" />

      <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-7">
          <Sobretitulo className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both text-gold-400 duration-700 ease-out motion-reduce:animate-none">
            Advocacia e assessoria jurídica
          </Sobretitulo>

          <h1 className="mt-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-[clamp(1.875rem,1.35rem+2.4vw,3.25rem)] leading-[1.12] font-semibold tracking-tight text-balance delay-100 duration-700 ease-out motion-reduce:animate-none">
            {institucional.heroTitulo}
          </h1>

          <p className="mt-7 max-w-[58ch] animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed text-pretty text-navy-foreground/75 delay-200 duration-700 ease-out motion-reduce:animate-none">
            {institucional.heroParagrafo}
          </p>

          <div className="mt-10 flex animate-in flex-col gap-3 fade-in slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 ease-out motion-reduce:animate-none sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-13 bg-gold-gradient px-6 text-base text-brand-950 shadow-gold hover:opacity-90"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <PhoneIcon aria-hidden />
                Falar com o escritório
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 border-navy-foreground/25 bg-transparent px-6 text-base text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
            >
              <Link href="/site-v1/servicos">
                Ver áreas de atuação
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {/* Caneta — elemento gráfico da identidade, sem valor informativo.
            Deriva mais devagar que o scroll, com uma inclinação mínima. */}
        <Parallax
          intensidade={0.06}
          rotacao={2}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <div className="relative mx-auto aspect-[732/1242] w-full max-w-[19rem] animate-in fade-in zoom-in-95 fill-mode-both delay-200 duration-1000 ease-out motion-reduce:animate-none">
            <Image
              src="/site/home/hero-caneta.png"
              alt=""
              aria-hidden
              fill
              priority
              sizes="(max-width: 1024px) 0px, 19rem"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </Parallax>
      </Container>
    </section>
  );
}
