import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { brandAssets, BrandSymbol } from "@/components/brand/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { AjusteEstampa } from "@/components/site2/ajuste-estampa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** Dimensões nativas da estampa, iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Posição da estampa no hero, no mesmo sistema que o `AjusteEstampa` manipula:
 * `left`/`bottom` em % do bloco e largura em `vw`. Mantenha os dois lados em
 * sincronia — este objeto é o que o botão "Zerar" do painel usa como origem.
 */
const ESTAMPA_POSICAO = { left: -127.4, bottom: -236.4, largura: 190 };

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <BrandSymbol size={32} />
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero. O degradê é fixo nos dois temas, então tudo por cima dele usa
            a cor de texto da superfície azul, não o `foreground` do tema. */}
        <section className="relative isolate overflow-clip bg-linear-30 from-brand-950 to-brand-900 text-navy-foreground">
          <Image
            src={brandAssets.pattern[1]}
            alt=""
            aria-hidden
            data-estampa="home"
            width={ESTAMPA.w}
            height={ESTAMPA.h}
            unoptimized
            priority
            className="pointer-events-none absolute -bottom-[236.4%] -left-[127.4%] -z-10 w-[190vw] max-w-none opacity-70"
          />

          <AjusteEstampa
            alvo="home"
            rotulo="estampa home"
            padrao={ESTAMPA_POSICAO}
          />

          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center md:py-32">
            <Badge
              variant="outline"
              className="border-navy-foreground/30 text-navy-foreground"
            >
              Pronto para usar
            </Badge>

            <h1 className="font-display text-5xl tracking-[0.04em] text-balance sm:text-6xl lg:text-7xl">
              Design System Souza &amp; Souza
            </h1>

            <div className="h-px w-24 rule-gold" />

            <p className="max-w-xl text-pretty text-navy-foreground/75">
              Seja bem-vindo ao design system da marca. Cor, tipografia e mais
              de 60 componentes prontos para montar qualquer página sem sair da
              identidade.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button
                asChild
                className="bg-gold-gradient text-brand-950 hover:opacity-90"
              >
                <Link href="/styleguide">
                  Abrir styleguide
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
              >
                <Link href="/styleguide#componentes">Ver componentes</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-3xl gap-4 px-6 py-16 sm:grid-cols-2">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Tokens</CardTitle>
              <CardDescription>
                Escalas completas de azul, dourado e neutros em{" "}
                <code className="font-mono text-xs">src/app/globals.css</code>.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Ativos da marca</CardTitle>
              <CardDescription>
                Logotipos, símbolos e estampa em{" "}
                <code className="font-mono text-xs">public/brand</code>.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}
