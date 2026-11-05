import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CTA das landing pages — sempre leva ao WhatsApp, em nova aba.
 *
 * `destaque` é o botão principal da tela (halo dourado e, na V2, o pulso):
 * no máximo um por dobra, como pede o design system.
 */
export function BotaoWhatsapp({
  href,
  children,
  destaque = false,
  pulso = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  destaque?: boolean;
  /** Anel pulsante atrás do botão (V2). Desliga com `prefers-reduced-motion`. */
  pulso?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex w-full sm:w-auto", className)}>
      {pulso ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-lg bg-primary/40 [animation-duration:2.4s] motion-reduce:hidden"
        />
      ) : null}
      <Button
        asChild
        size="lg"
        className={cn(
          "relative h-auto min-h-12 w-full px-6 py-3.5 text-base whitespace-normal sm:w-auto",
          "focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          destaque && "shadow-gold"
        )}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          <WhatsAppGlyph className="size-5 shrink-0" />
          {children}
          <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
        </a>
      </Button>
    </span>
  );
}
