import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-8 flex flex-col gap-6 py-12", className)}
    >
      <header className="flex flex-col gap-2">
        <h2 className="font-display text-xl tracking-[0.08em] uppercase">
          {title}
        </h2>
        <div className="h-px w-16 rule-gold" />
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

export function Subsection({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {hint ? (
          <span className="font-mono text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** Amostra de uma cor de escala: bloco + nome + valor. */
export function Swatch({
  name,
  hex,
  className,
  labelClassName,
}: {
  name: string;
  hex?: string;
  className: string;
  labelClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "h-16 w-full rounded-md border border-border/60 shadow-2xs",
          className
        )}
      />
      <div className="flex flex-col">
        <span className={cn("font-mono text-[11px]", labelClassName)}>
          {name}
        </span>
        {hex ? (
          <span className="font-mono text-[11px] text-muted-foreground uppercase">
            {hex}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Amostra de token semântico: bloco com o par cor/foreground aplicado. */
export function TokenCard({
  token,
  className,
  note,
}: {
  token: string;
  className: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "flex h-20 items-center justify-center rounded-lg border border-border/60 text-xs font-medium shadow-2xs",
          className
        )}
      >
        Aa
      </div>
      <span className="font-mono text-[11px]">--{token}</span>
      {note ? (
        <span className="text-[11px] text-muted-foreground">{note}</span>
      ) : null}
    </div>
  );
}
