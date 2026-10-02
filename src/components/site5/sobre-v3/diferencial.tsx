import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Regua } from "@/components/site5/sobre-v3/regua";
import { LIQUID_GLASS_PRESETS, LiquidGlass } from "@/components/ui/liquid-glass";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

const corpo =
  "max-w-[52ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85";

/**
 * Nosso diferencial — a recepção em tela cheia, com o texto num painel de
 * vidro sobre a própria cena. Único vidro da página.
 *
 * Em `lg` o balcão e o painel da marca ficam nos 7/12 da direita, livres; o
 * vidro pousa sobre as poltronas. O véu à esquerda existe para o contraste do
 * texto não depender do tier do vidro (`lensed`/`frosted`/`solid`) nem do
 * Reduce Transparency. Abaixo de `lg` a foto vem primeiro e o painel sobe
 * sobre a base dela.
 *
 * `LiquidGlass` é client; o conteúdo entra como `children` do servidor.
 */
export function Diferencial() {
  const foto = fotosEspaco.recepcaoAmplaFrontal;
  const [primeiro, segundo] = sobre.diferencial.paragrafos;

  return (
    <Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0">
      <div className="relative lg:flex lg:min-h-[min(52rem,100svh)] lg:items-center lg:py-24">
        <div className="relative aspect-[4/3] md:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="100vw"
            className="object-cover object-[60%_50%] lg:object-[72%_50%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-linear-to-r from-background/85 via-background/60 to-background/0 lg:block"
          />
          {/* Abaixo de `lg` o painel sobe sobre a base da foto, e o título
              pousava sobre o mármore claro: 2,9:1 no pior ponto. O véu escurece
              só a faixa que o vidro cobre e leva o título acima de 4,5:1. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background via-background/70 to-background/0 lg:hidden"
          />
        </div>

        <Container className="relative z-10 -mt-12 pb-24 md:-mt-20 md:pb-32 lg:mt-0 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <Revelar className="min-w-0 lg:col-span-5">
              <LiquidGlass
                {...LIQUID_GLASS_PRESETS.panel}
                className="rounded-3xl p-7 md:p-10 xl:p-12"
              >
                <Regua numero="05" rotulo={sobre.diferencial.titulo} as="h2" />
                <p className={`mt-8 ${corpo}`}>{primeiro}</p>
                <p className={`mt-5 ${corpo}`}>{segundo}</p>
              </LiquidGlass>
            </Revelar>
          </div>
        </Container>
      </div>
    </Section>
  );
}
