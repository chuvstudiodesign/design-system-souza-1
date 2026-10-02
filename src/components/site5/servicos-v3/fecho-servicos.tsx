import Image from "next/image";

import { Section, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home, servicosIntro } from "@/lib/site5/conteudo";

/**
 * Mesmo texto de `home.contato.titulo`, com espaços não separáveis dentro de
 * "Souza & Souza": o nome não se parte em "Souza / & Souza".
 */
const tituloContato = home.contato.titulo.replace(
  "Souza & Souza",
  "Souza\u00A0&\u00A0Souza"
);

const linkCanal =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/**
 * Fecho da V3 — espelho do `Fecho` da home: foto sangrada à esquerda no
 * desktop, texto à direita alinhado à grade do container pelo `pr-[max(...)]`.
 * No mobile o texto vem primeiro e a foto fecha a página.
 *
 * Sobretítulo, título e parágrafo são os de `home.contato` (literais do
 * cliente, da home); o botão é o "Entre em contato" do documento de Serviços
 * e carrega o único `shadow-gold` da página.
 */
export function FechoServicos() {
  const foto = fotosEspaco.salaEstanteMesa;

  return (
    <Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Revelar
          variante="zoom"
          className="relative order-last aspect-[4/3] min-w-0 lg:order-none lg:aspect-auto lg:min-h-full"
        >
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-[50%_50%]"
          />
        </Revelar>

        <Revelar className="min-w-0 px-6 py-20 md:px-10 md:py-28 lg:py-36 lg:pr-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))] lg:pl-16">
          <Sobretitulo>{home.contato.sobretitulo}</Sobretitulo>
          <h2 className="mt-6 max-w-[20ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
            {tituloContato}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
            {home.contato.paragrafo}
          </p>

          <Button
            asChild
            size="lg"
            className="mt-10 h-auto min-h-11.5 w-full px-7 py-3 text-base whitespace-normal shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph className="size-5" />
              {servicosIntro.botao}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>

          <ul className="mt-10 border-t border-border text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)]">
            {contato.whatsapps.map((w) => (
              <li
                key={w.href}
                className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-2.5"
              >
                <span className="text-muted-foreground">{w.rotulo}</span>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className={linkCanal}>
                  {w.exibicao}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
            <li className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-2.5">
              <span className="text-muted-foreground">{contato.telefoneFixo.rotulo}</span>
              <a href={contato.telefoneFixo.href} className={linkCanal}>
                {contato.telefoneFixo.exibicao}
              </a>
            </li>
          </ul>
        </Revelar>
      </div>
    </Section>
  );
}
