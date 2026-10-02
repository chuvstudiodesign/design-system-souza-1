import { Fragment } from "react";
import { ArrowUpRightIcon } from "lucide-react";

import { BrandSymbol } from "@/components/brand/logo";
import { Container, Section, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { InstagramGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { contato, instagramHref } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";

/**
 * Publicações — convite ao Instagram do escritório.
 *
 * Sem feed: o token do site antigo expirou e o cliente pediu só o bloco com
 * título, texto e botão. O cartão à direita é a "assinatura" do perfil —
 * símbolo da marca, rede e usuário —, não uma simulação de post. Nada de
 * imagem de banco nem de publicação inventada.
 */
export function Publicacoes() {
  const instagram = contato.redes[0];

  return (
    <Section surface="muted" size="md">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <Revelar className="min-w-0 lg:col-span-6">
            <Sobretitulo>{home.publicacoes.sobretitulo}</Sobretitulo>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
              {home.publicacoes.titulo}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[clamp(0.9563rem,0.9rem+0.27vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
              {home.publicacoes.paragrafo}
            </p>
          </Revelar>

          <Revelar
            variante="zoom"
            atraso={80}
            className="min-w-0 lg:col-span-5 lg:col-start-8"
          >
            <Card className="@container gap-0 rounded-3xl bg-card p-5 shadow-lg ring-1 ring-border sm:p-8 md:p-10">
              {/* Perfil. Abaixo de 20rem de cartão (celular de 320–375px) o
                  avatar empilha sobre o nome: lado a lado, o @usuário não cabe
                  e quebraria no meio. O `<wbr>` depois de cada ponto dá ao
                  navegador um ponto de quebra natural se ainda faltar espaço
                  (texto ampliado). */}
              <div className="flex flex-col items-start gap-4 @xs:flex-row @xs:items-center @xs:gap-5">
                <div
                  aria-hidden
                  className="size-14 shrink-0 rounded-full bg-gold-gradient p-1 sm:size-20"
                >
                  <div className="grid size-full place-items-center rounded-full bg-card">
                    <BrandSymbol size={28} className="sm:hidden" />
                    <BrandSymbol size={40} className="hidden sm:inline-flex" />
                  </div>
                </div>

                <div className="min-w-0 self-stretch">
                  <p className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    <InstagramGlyph className="size-4" />
                    {instagram.rotulo}
                  </p>
                  <p className="mt-1 text-[0.9563rem] font-medium wrap-anywhere @[15rem]:text-lg @xs:text-xl">
                    {instagram.usuario.split(".").map((parte, i) => (
                      <Fragment key={i}>
                        {i > 0 ? (
                          <>
                            .<wbr />
                          </>
                        ) : null}
                        {parte}
                      </Fragment>
                    ))}
                  </p>
                </div>
              </div>

              <div aria-hidden className="rule-gold my-8 h-px w-full" />

              <Button
                asChild
                size="lg"
                className="h-auto min-h-11 w-full py-3 text-center text-base whitespace-normal focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <a href={instagramHref} target="_blank" rel="noopener noreferrer">
                  {home.publicacoes.botao}
                  <ArrowUpRightIcon aria-hidden />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Button>
            </Card>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
