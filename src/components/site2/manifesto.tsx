import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { brandAssets } from "@/components/brand/logo";
import { AjusteEstampa } from "@/components/site2/ajuste-estampa";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import { institucional } from "@/lib/site/conteudo";

/** Dimensões nativas da estampa — iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Posicionamento do escritório, em chave editorial.
 *
 * O número de seção ancora a coluna vazia à esquerda e o texto começa deslocado
 * — a assimetria é o recurso de composição, no lugar da imagem que a home usa.
 *
 * Superfície dourada: é o único bloco cheio de marca da página, e o contraste
 * inverte em relação às vizinhas — o dourado que era acento vira fundo, e o
 * azul que era fundo vira tinta. Por isso nenhuma cor aqui é token semântico:
 * `muted-foreground` e `primary` viram dourado no tema escuro e desapareceriam
 * sobre o próprio degradê. A hierarquia sai de `brand-950` contra `brand-900`,
 * ambos acima de 5:1 nas duas pontas do degradê.
 *
 * A estampa entra como o styleguide manda: sangrada e cortada pela borda — é
 * fundo, não ilustração. Fica na coluna vazia à esquerda, que na composição
 * assimétrica desta seção não recebe texto, então cresce sem disputar leitura
 * com o parágrafo.
 *
 * O recorte é `overflow-clip`, não `overflow-hidden`: `hidden` criaria um
 * contêiner de rolagem e quebraria qualquer `sticky` daqui para dentro.
 */
export function Manifesto() {
  return (
    <Section surface="gold" size="lg" className="overflow-clip">
      {/* Estampa dourada (`estampa-1`) em opacidade cheia, tom sobre tom: o
          traço é dourado sobre fundo dourado e só aparece porque o degradê da
          superfície varia a 45° enquanto a estampa é de tom fixo. É essa
          diferença que desenha o monograma — por isso ela precisa ser grande,
          senão a hairline vira sub-pixel e lava.

          SVG e não PNG: nesta escala o traço é ampliado muito além do nativo, e
          só o vetor mantém a borda limpa. `unoptimized` porque o otimizador do
          Next recusa SVG sem `dangerouslyAllowSVG` — e ligar essa flag global
          por causa de um arquivo de 14 KB não se paga. */}
      <Image
        src={brandAssets.pattern[1]}
        alt=""
        aria-hidden
        data-estampa="manifesto"
        width={ESTAMPA.w}
        height={ESTAMPA.h}
        unoptimized
        className="pointer-events-none absolute -bottom-[118.3%] -left-[108.3%] -z-10 w-[156vw] max-w-none"
      />

      <AjusteEstampa
        alvo="manifesto"
        rotulo="estampa 01"
        padrao={{ left: -108.3, bottom: -118.3, largura: 156 }}
      />

      <Container>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p
              aria-hidden
              className="font-display text-sm tracking-[0.22em] text-brand-950"
            >
              01
            </p>
            <p className="mt-4 text-sm tracking-[0.08em] text-brand-900 uppercase">
              O escritório
            </p>
          </div>

          <Revelar className="lg:col-span-8 lg:col-start-5">
            <h2 className="max-w-[24ch] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance">
              {institucional.sobreTitulo}
            </h2>

            <p className="mt-8 max-w-[62ch] text-[clamp(1rem,0.95rem+0.3vw,1.1875rem)] leading-relaxed text-pretty text-brand-900">
              {institucional.sobreParagrafo}
            </p>

            <Button
              asChild
              variant="link"
              className="mt-8 h-auto px-0 text-base text-brand-950 decoration-brand-950/40"
            >
              <Link href="/site-v1/sobre-nos">
                Conhecer o escritório
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
