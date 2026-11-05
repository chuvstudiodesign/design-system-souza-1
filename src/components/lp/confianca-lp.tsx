import { confianca } from "@/lib/lp/conversao";
import { cn } from "@/lib/utils";

/**
 * Faixa de confiança sob o botão do hero (V2 e V3): fundação, atendimentos e o
 * canal. Dados reais do escritório — nada de selo ou número inventado.
 */
export function ConfiancaLp({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-3",
        className
      )}
    >
      {confianca.map((item) => (
        <li key={item.valor} className="min-w-0">
          <p className="font-display text-lg tracking-[0.06em] text-gold-400">
            {item.valor}
          </p>
          <p className="mt-1 text-sm leading-snug text-pretty text-muted-foreground">
            {item.rotulo}
          </p>
        </li>
      ))}
    </ul>
  );
}
