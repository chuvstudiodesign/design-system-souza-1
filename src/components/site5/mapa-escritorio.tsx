import { cn } from "@/lib/utils";
import { contato, mapaEmbedSrc } from "@/lib/site5/contato";

/**
 * Mapa do escritório — usado pelo rodapé e pela página Contato.
 *
 * O embed público não aceita tema: o escuro é feito no cliente (inversão +
 * giro de matiz + dessaturação) e uma camada do azul da marca em
 * `mix-blend-color` puxa o mapa para o matiz institucional. A camada é
 * `pointer-events-none`, então o mapa segue navegável.
 *
 * O iframe ocupa o contêiner inteiro (`absolute inset-0`): quem usa define
 * altura, borda e raio via `className`, que precisa manter `relative`.
 */
export function MapaEscritorio({ className }: { className?: string }) {
  return (
    <div className={cn(
        "relative overflow-hidden has-[iframe:focus-visible]:outline-3 has-[iframe:focus-visible]:-outline-offset-4 has-[iframe:focus-visible]:outline-ring",
        className
      )}>
      <iframe
        src={mapaEmbedSrc}
        title={`Mapa da localização do escritório: ${contato.endereco.completo}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 block size-full border-0 [filter:invert(1)_hue-rotate(180deg)_saturate(0.55)_brightness(0.92)_contrast(1.08)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-900/45 mix-blend-color"
      />
    </div>
  );
}
