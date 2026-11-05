import { Container, Section, Sobretitulo } from "@/components/site/layout/section";
import { BotaoWhatsapp } from "@/components/lp/botao-whatsapp";
import { microcopy, passos } from "@/lib/lp/conversao";

/**
 * "Como funciona" (V2): o atendimento em três passos, para tirar o medo do
 * primeiro contato. Resume o que o documento já diz; os rótulos são texto
 * novo e estão em `@/lib/lp/conversao` para aprovação.
 */
export function PassosLp({
  whatsappHref,
  rotuloBotao,
}: {
  whatsappHref: string;
  rotuloBotao: string;
}) {
  return (
    <Section surface="base" size="md">
      <Container>
        <Sobretitulo>{microcopy.sobretituloPassos}</Sobretitulo>

        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {passos.map((passo, i) => (
            <li
              key={passo.titulo}
              className="relative rounded-2xl bg-card p-6 ring-1 ring-border md:p-8"
            >
              <span
                aria-hidden
                className="font-display text-3xl tracking-[0.08em] text-gold-400"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-lg leading-snug font-medium text-balance">
                {passo.titulo}
              </h2>
              <p className="mt-2 text-[0.9688rem] leading-relaxed text-pretty text-muted-foreground">
                {passo.texto}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <BotaoWhatsapp href={whatsappHref}>{rotuloBotao}</BotaoWhatsapp>
        </div>
      </Container>
    </Section>
  );
}
