import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { BrandLogo } from "@/components/brand/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const tokens = [
  { name: "brand-900", hex: "#0C344D", className: "bg-brand-900" },
  { name: "gold-500", hex: "#BEA450", className: "bg-gold-500" },
  { name: "background", hex: "surface", className: "bg-background" },
  { name: "muted", hex: "surface", className: "bg-muted" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <BrandLogo height={28} />
          <ModeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <div className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit">
            Fundação pronta
          </Badge>
          <h1 className="font-display text-4xl tracking-[0.04em] text-balance">
            Design System Souza &amp; Souza
          </h1>
          <div className="h-px w-24 rule-gold" />
          <p className="max-w-xl text-muted-foreground">
            Tokens extraídos da identidade da marca — azul{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              #0C344D
            </code>
            , dourado{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              #BEA450
            </code>{" "}
            e capitulares Trajan Pro — aplicados sobre shadcn/ui.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link href="/styleguide">
                Abrir styleguide
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/styleguide#componentes">Ver componentes</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tokens.map((token) => (
            <div key={token.name} className="flex flex-col gap-2">
              <div
                className={`h-20 w-full rounded-lg border border-border ${token.className}`}
              />
              <span className="font-mono text-xs">--{token.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {token.hex}
              </span>
            </div>
          ))}
        </section>

        <Separator className="my-12" />

        <section className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tokens</CardTitle>
              <CardDescription>
                Escalas completas de azul, dourado e neutros em{" "}
                <code className="font-mono text-xs">src/app/globals.css</code>.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ativos da marca</CardTitle>
              <CardDescription>
                Logotipos, símbolos e estampa em{" "}
                <code className="font-mono text-xs">public/brand</code>.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}
