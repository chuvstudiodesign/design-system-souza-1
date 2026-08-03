import Image from "next/image";

import { Contador } from "@/components/site/motion/contador";
import { Revelar } from "@/components/site/motion/revelar";
import { metricas } from "@/lib/site/conteudo";

import { Container, Section } from "../layout/section";

/**
 * Faixa de prova. Respiro curto de propósito: é uma pausa entre o hero e o
 * posicionamento, não uma seção de conteúdo.
 *
 * Os números vão em Trajan — é exatamente o caso de capitular curta para o
 * qual a fonte da marca serve — e contam até o valor ao entrar na tela.
 */
export function Metricas() {
  return (
    <Section surface="card" size="sm" aria-labelledby="metricas-titulo">
      <Container>
        <h2 id="metricas-titulo" className="sr-only">
          O escritório em números
        </h2>

        <dl className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {metricas.map((metrica, indice) => (
            <Revelar
              key={metrica.rotulo}
              asChild
              atraso={indice * 80}
              variante="subir"
            >
              <div className="flex items-center gap-4 sm:flex-col sm:gap-3 sm:text-center">
                <Image
                  src={metrica.icone}
                  alt=""
                  aria-hidden
                  width={44}
                  height={44}
                  className="size-11 shrink-0 object-contain opacity-90"
                />
                <div className="min-w-0 sm:contents">
                  <dd className="font-display text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] leading-none text-gold-700 dark:text-gold-400">
                    <Contador valor={metrica.valor} />
                  </dd>
                  <dt className="mt-1 text-pretty text-sm text-muted-foreground sm:mt-2 sm:text-base">
                    {metrica.rotulo}
                  </dt>
                </div>
              </div>
            </Revelar>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
