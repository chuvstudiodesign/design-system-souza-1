"use client";

import * as React from "react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function CarouselPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    const initial = window.setTimeout(update, 0);
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      window.clearTimeout(initial);
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <ComponentPage
      title="Carousel"
      category="Layout"
      description="Slider sobre Embla Carousel: arraste com mouse/touch, navegação por teclado, orientação horizontal ou vertical e API imperativa para controle externo."
      install="npx shadcn@latest add carousel"
      importCode={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Carousel className="w-full max-w-sm">
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item}>…</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
      >
        <div className="mx-auto w-full max-w-sm">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }, (_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center">
                      <span className="font-display text-3xl">{index + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Demo>

      <Demo
        title="Vários itens por vez"
        description="Use basis-* nos itens para controlar quantos aparecem."
        contentClassName="flex-col items-stretch"
        code={`<CarouselItem className="basis-1/2 md:basis-1/3">…</CarouselItem>`}
      >
        <div className="mx-auto w-full max-w-lg">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {[
                "Cível",
                "Trabalhista",
                "Empresarial",
                "Tributário",
                "Penal",
                "Família",
              ].map((area) => (
                <CarouselItem key={area} className="basis-1/2 md:basis-1/3">
                  <Card size="sm">
                    <CardContent className="flex h-24 items-center justify-center text-sm font-medium">
                      {area}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Demo>

      <Demo
        title="Com API e contador"
        contentClassName="flex-col items-stretch"
        code={`const [api, setApi] = React.useState<CarouselApi>()

React.useEffect(() => {
  if (!api) return
  setCount(api.scrollSnapList().length)
  api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
}, [api])

<Carousel setApi={setApi}>…</Carousel>`}
      >
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {["Prazos", "Audiências", "Documentos", "Financeiro"].map(
                (item) => (
                  <CarouselItem key={item}>
                    <Card>
                      <CardContent className="flex aspect-video items-center justify-center text-sm font-medium">
                        {item}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <p
            aria-live="polite"
            className="text-center font-mono text-xs text-muted-foreground"
          >
            Slide {current} de {count}
          </p>
        </div>
      </Demo>

      <Demo
        title="Vertical e loop"
        contentClassName="flex-col items-stretch"
        code={`<Carousel orientation="vertical" opts={{ loop: true }} className="w-full max-w-xs">
  <CarouselContent className="-mt-1 h-48">…</CarouselContent>
</Carousel>`}
      >
        <div className="mx-auto w-full max-w-xs">
          <Carousel
            orientation="vertical"
            opts={{ loop: true }}
            className="w-full"
          >
            <CarouselContent className="-mt-1 h-48">
              {[1, 2, 3, 4].map((item) => (
                <CarouselItem key={item} className="pt-1 basis-1/2">
                  <Card size="sm">
                    <CardContent className="flex h-20 items-center justify-center text-sm">
                      Item {item}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Demo>

      <Usage
        code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Gallery({ items }: { items: string[] }) {
  return (
    <Carousel opts={{ align: "start", loop: true }}>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item} className="basis-1/3">{item}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "opts",
            type: "EmblaOptionsType",
            description:
              "Opções do Embla: align, loop, dragFree, slidesToScroll…",
          },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Direção do carrossel.",
          },
          {
            prop: "setApi",
            type: "(api: CarouselApi) => void",
            description:
              "Recebe a instância do Embla para controle externo (scrollTo, on…).",
          },
          {
            prop: "plugins",
            type: "EmblaPluginType[]",
            description: "Plugins do Embla, como autoplay.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Foca a região do carrossel e os botões." },
          { keys: "←", description: "Slide anterior (com a região focada)." },
          { keys: "→", description: "Próximo slide." },
          { keys: "Enter / Space", description: "Aciona os botões de navegação." },
        ]}
      />

      <A11yNotes
        items={[
          "A raiz usa role=region com aria-roledescription='carousel'; cada item é role=group com aria-roledescription='slide'.",
          "Os botões anterior/próximo já possuem rótulos em sr-only e ficam desabilitados nos limites (sem loop).",
          "Anuncie a posição atual (ex.: 'Slide 2 de 5') em uma região aria-live, como na demo acima.",
          "Evite autoplay; se usar, ofereça controle de pausa e respeite prefers-reduced-motion.",
          "Conteúdo essencial não deve existir apenas dentro de um carrossel.",
        ]}
      />
    </ComponentPage>
  );
}
