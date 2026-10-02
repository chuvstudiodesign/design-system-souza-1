import { Fio } from "@/components/site5/sobre-v2/fio";
import { cn } from "@/lib/utils";

import { escala } from "./escala";

/**
 * Cabeçalho de cada parte da V2 — Fio centrado com o algarismo romano, H2 em
 * Trajan e, se o documento tiver, o parágrafo. Tudo no eixo central.
 */
export function Cabecalho({
  numero,
  id,
  titulo,
  paragrafo,
  tom = "escuro",
}: {
  numero: string;
  id: string;
  titulo: string;
  paragrafo?: string;
  tom?: "escuro" | "navy";
}) {
  const navy = tom === "navy";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Fio numero={numero} alinhamento="centro" tom={tom} />
      <h2
        id={id}
        className={cn(
          "mt-6",
          escala.titulo,
          navy ? "text-navy-foreground" : "text-foreground"
        )}
      >
        {titulo}
      </h2>
      {paragrafo ? (
        <p
          className={cn(
            "mx-auto mt-6 max-w-[56ch]",
            escala.corpo,
            navy ? "text-navy-foreground/80" : "text-foreground/80"
          )}
        >
          {paragrafo}
        </p>
      ) : null}
    </div>
  );
}
