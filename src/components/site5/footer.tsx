import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { BrandSymbol } from "@/components/brand/logo";
import { Container } from "@/components/site/layout/section";
import { WhatsAppGlyph, glifoDaRede } from "@/components/site5/glifos";
import { MapaEscritorio } from "@/components/site5/mapa-escritorio";
import { MapaRodape } from "@/components/site5/mapa-rodape";
import { contato } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";

import { navegacao } from "./navegacao";

/**
 * Rodapé institucional da variação 5.
 *
 * O cliente forneceu Instagram, Facebook e LinkedIn — as três redes de
 * `contato.redes` são renderizadas, junto com os dois WhatsApps. Só o
 * Instagram tem usuário conhecido; as outras duas aparecem pelo nome da rede.
 *
 * A rota existe só no escuro, então nada aqui usa `dark:`.
 */

/** Links com alvo de 44px: o texto é curto e o público toca com o polegar. */
const link =
  "inline-flex min-h-11 items-center text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";
const icone = "mt-3 size-4 shrink-0 text-gold-500";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:gap-16">
          {/* Marca — só o símbolo: o nome já aparece no rodapé inferior. */}
          <div className="flex flex-col gap-5">
            <BrandSymbol size={46} />
            <p className="max-w-[34ch] text-[0.9563rem] leading-relaxed text-pretty text-muted-foreground">
              {home.hero.sobretitulo}
            </p>
            <div aria-hidden className="rule-gold h-px w-24" />
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-1 text-[0.9563rem]">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <h2 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {home.contato.sobretitulo}
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-[0.9563rem]">
              <li className="flex gap-3">
                <MapPinIcon aria-hidden className={icone} />
                <address className="py-2.5 text-pretty text-muted-foreground not-italic">
                  {contato.endereco.completo}
                </address>
              </li>
              <li className="flex gap-3">
                <PhoneIcon aria-hidden className={icone} />
                <a href={contato.telefoneFixo.href} className={link}>
                  {contato.telefoneFixo.exibicao}
                </a>
              </li>
              {contato.whatsapps.map((w) => (
                <li key={w.href} className="flex gap-3">
                  <WhatsAppGlyph aria-hidden className={icone} />
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    {w.rotulo}: {w.exibicao}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
              <li className="flex min-w-0 gap-3">
                <MailIcon aria-hidden className={icone} />
                <a
                  href={contato.email.href}
                  className={`${link} min-w-0 wrap-anywhere`}
                >
                  {contato.email.exibicao}
                </a>
              </li>
              {contato.redes.map((rede) => {
                const Glifo = glifoDaRede[rede.rede];
                const texto = "usuario" in rede ? rede.usuario : rede.rotulo;
                return (
                  <li key={rede.rede} className="flex min-w-0 gap-3">
                    <Glifo className={icone} />
                    <a
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        texto === rede.rotulo
                          ? `${rede.rotulo} (abre em nova aba)`
                          : `${rede.rotulo}: ${texto} (abre em nova aba)`
                      }
                      className={`${link} min-w-0 wrap-anywhere`}
                    >
                      {texto}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Mapa — some em /site/contato, que já o exibe no bloco Endereço. */}
        <MapaRodape>
          <MapaEscritorio className="mt-14 h-[18rem] rounded-2xl border border-border md:h-[22rem]" />
        </MapaRodape>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-base text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>Direitos Reservados: {contato.razaoSocial}</p>
          <p>Criado por: {contato.criadoPor}</p>
        </Container>
      </div>
    </footer>
  );
}
