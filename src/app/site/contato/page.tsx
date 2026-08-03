import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contato" };

// Em construção — esta página é montada na fase seguinte do plano.
export default function Page() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
      <h1 className="font-display text-3xl">Contato</h1>
      <p className="mt-4 text-muted-foreground">Em construção.</p>
    </div>
  );
}
