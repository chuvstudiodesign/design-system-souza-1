import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { BrandSymbol } from "@/components/brand/logo";
import { contato, mapaEmbedSrc, marca } from "@/lib/site/contato";

import { Container } from "./section";
import { navegacao } from "./navegacao";

/** O lucide-react v1 não traz ícones de marca — este é o glifo do Instagram. */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Rodapé institucional.
 *
 * O Facebook é citado no rodapé do site antigo sem nenhuma URL — enquanto o
 * cliente não fornecer, o item não é renderizado. Ver `contato.facebook`.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:gap-16">
          {/* Marca.

              Só o símbolo preenchido, sem o nome composto: o nome já aparece
              logo abaixo no slogan e outra vez na razão social do rodapé
              inferior, e repeti-lo em imagem era a terceira. `BrandSymbol`
              entrega o dourado no escuro e o azul no claro — o rodapé é `card`,
              e o dourado cravado sumiria sobre o branco nas rotas que ainda têm
              tema claro. */}
          <div className="flex flex-col gap-5">
            <BrandSymbol size={46} />
            <p className="max-w-[34ch] text-pretty text-sm leading-relaxed text-muted-foreground">
              {marca.slogan}. Advocacia e assessoria jurídica em{" "}
              {contato.cidade}/{contato.uf}.
            </p>
            <div aria-hidden className="h-px w-24 rule-gold" />
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Navegação
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Entre em contato
            </h2>
            <ul className="mt-5 flex flex-col gap-4 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPinIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-600 dark:text-gold-500"
                />
                <address className="text-pretty not-italic text-muted-foreground">
                  {contato.endereco.completo}
                </address>
              </li>
              <li className="flex gap-3">
                <PhoneIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-600 dark:text-gold-500"
                />
                <span className="flex flex-col gap-1">
                  <a
                    href={contato.telefoneFixo.href}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {contato.telefoneFixo.exibicao}
                  </a>
                  <a
                    href={`tel:+5564984791815`}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {contato.whatsapp.exibicao}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <MailIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-600 dark:text-gold-500"
                />
                <a
                  href={contato.email.href}
                  className="break-words text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {contato.email.exibicao}
                </a>
              </li>
              <li className="flex gap-3">
                <InstagramGlyph className="mt-0.5 size-4 shrink-0 text-gold-600 dark:text-gold-500" />
                <a
                  href={contato.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {contato.instagram.usuario}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mapa.

            O embed público do Google Maps (`output=embed`) não aceita tema nem
            estilo — isso só existe na Embed API com chave e estilo de mapa na
            nuvem, que este projeto não tem. O escuro aqui é feito no cliente:
            inverte a luminosidade, gira o matiz de volta ao lugar (senão o
            verde do parque vira magenta) e dessatura. Por cima, uma camada do
            azul da marca em `mix-blend-color` puxa o mapa inteiro para o matiz
            institucional em vez do cinza que a inversão devolve.

            Só no escuro: no claro o mapa original já é o certo, e a camada de
            tinta some junto. A camada é `pointer-events-none`, então o mapa
            continua navegável. */}
        <div className="relative mt-14 overflow-hidden rounded-2xl border border-border">
          <iframe
            src={mapaEmbedSrc}
            title={`Mapa da localização do escritório: ${contato.endereco.completo}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[18rem] w-full border-0 md:h-[22rem] dark:[filter:invert(1)_hue-rotate(180deg)_saturate(0.55)_brightness(0.92)_contrast(1.08)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-brand-900/45 mix-blend-color dark:block"
          />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Direitos reservados: {contato.razaoSocial}</p>
          <p>Criado por: {contato.criadoPor}</p>
        </Container>
      </div>
    </footer>
  );
}
