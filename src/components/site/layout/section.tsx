import { cn } from "@/lib/utils";

/**
 * Casca de seção do site institucional.
 *
 * O ritmo vertical do site nasce daqui: `surface` alterna o fundo entre seções
 * vizinhas e `size` gradua o respiro conforme o peso da seção. Usar sempre
 * estes dois eixos é o que impede o site de virar uma pilha de blocos iguais.
 */

const superficies = {
  base: "bg-background text-foreground",
  muted: "bg-muted/40 text-foreground",
  navy: "bg-navy text-navy-foreground",
  card: "bg-card text-card-foreground",
  /**
   * Degradê dourado da identidade. Os dois stops são hex fechados, iguais nos
   * dois temas, então o texto por cima também é fixo: `brand-950` dá de 6,8:1
   * (ponta escura do degradê) a 9,8:1 (ponta clara) — nada de tom semântico,
   * que inverteria no escuro e sumiria no dourado.
   *
   * É a superfície de mais peso do sistema. Uma por página, no máximo.
   */
  gold: "bg-gold-gradient text-brand-950",
} as const;

const respiros = {
  /** Faixa de apoio — números, filete, CTA curto. */
  sm: "py-14 md:py-16",
  /** Padrão de seção de conteúdo. */
  md: "py-20 md:py-28",
  /** Seção com peso — hero secundário, fecho de página. */
  lg: "py-24 md:py-32 lg:py-40",
} as const;

export function Section({
  surface = "base",
  size = "md",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  surface?: keyof typeof superficies;
  size?: keyof typeof respiros;
}) {
  return (
    <section
      className={cn(
        "relative isolate",
        superficies[surface],
        respiros[size],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Container de conteúdo. `wide` para grids que pedem mais largura,
 * `narrow` para texto corrido — que nunca deve passar de ~70 caracteres.
 */
export function Container({
  width = "default",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  width?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        width === "wide" && "max-w-[90rem]",
        width === "default" && "max-w-7xl",
        width === "narrow" && "max-w-3xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Sobretítulo da identidade — capitulares em Trajan com tracking aberto,
 * precedidas de um filete dourado curto.
 */
export function Sobretitulo({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display text-xs tracking-[0.22em] uppercase",
        "text-gold-700 dark:text-gold-400",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="h-px w-8 bg-gold-600/70 dark:bg-gold-500/70"
      />
      {children}
    </p>
  );
}
