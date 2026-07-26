import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Typography — escala tipográfica do design system.
 * `display` usa a Trajan Pro (capitulares da marca); os demais usam Inter.
 */
const typographyVariants = cva("", {
  variants: {
    variant: {
      display: "font-display text-4xl tracking-[0.04em] text-balance",
      h1: "scroll-m-20 text-4xl font-semibold tracking-tight text-balance",
      h2: "scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 not-first:mt-6",
      blockquote: "mt-6 border-l-2 border-gold-500 pl-6 italic",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-sm text-muted-foreground",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      overline: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

const variantElementMap = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
  inlineCode: "code",
  list: "ul",
  overline: "p",
} as const;

type TypographyVariant = keyof typeof variantElementMap;

function Typography({
  className,
  variant = "p",
  asChild = false,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild
    ? Slot.Root
    : (variantElementMap[(variant ?? "p") as TypographyVariant] as React.ElementType);

  return (
    <Comp
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}

/** Container com estilos de prosa para blocos longos de conteúdo. */
function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prose"
      className={cn(
        "flex flex-col gap-4 text-base leading-7 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:tracking-[0.04em] [&_h3]:text-lg [&_h3]:font-semibold",
        className
      )}
      {...props}
    />
  );
}

export { Typography, Prose, typographyVariants };
