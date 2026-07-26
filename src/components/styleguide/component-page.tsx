"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  Copy code                                  */
/* -------------------------------------------------------------------------- */

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label="Copiar código"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}

export function CodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-neutral-950 text-neutral-100 dark:bg-brand-950",
        className
      )}
    >
      <div className="absolute top-2 right-2 z-10 text-neutral-300">
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Page                                      */
/* -------------------------------------------------------------------------- */

export function ComponentPage({
  title,
  category,
  description,
  install,
  importCode,
  children,
}: {
  title: string;
  category: string;
  description: string;
  install: string;
  importCode: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl px-8 py-12">
      <header className="flex flex-col gap-4">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          {category}
        </span>
        <h1 className="font-display text-3xl tracking-[0.04em]">{title}</h1>
        <div className="h-px w-16 rule-gold" />
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="text-sm font-semibold tracking-tight">Instalação</h2>
        <CodeBlock code={install} />
        <h2 className="mt-2 text-sm font-semibold tracking-tight">Import</h2>
        <CodeBlock code={importCode} />
      </section>

      <Separator className="my-10" />

      <div className="flex flex-col gap-12">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Demo                                     */
/* -------------------------------------------------------------------------- */

export function Demo({
  title,
  description,
  code,
  children,
  className,
  contentClassName,
}: {
  title: string;
  description?: string;
  code?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {code ? (
          <Button
            variant="outline"
            size="xs"
            onClick={() => setShowCode((v) => !v)}
            aria-expanded={showCode}
          >
            {showCode ? "Ocultar código" : "Ver código"}
          </Button>
        ) : null}
      </div>

      <div
        className={cn(
          "flex min-h-24 flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6",
          contentClassName
        )}
      >
        {children}
      </div>

      {showCode && code ? <CodeBlock code={code} /> : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Tables                                    */
/* -------------------------------------------------------------------------- */

export type PropRow = {
  prop: string;
  type: string;
  default?: string;
  description: string;
};

export function PropsTable({
  rows,
  title = "Props",
  caption,
}: {
  rows: PropRow[];
  title?: string;
  caption?: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      {caption ? (
        <p className="text-sm text-muted-foreground">{caption}</p>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead className="bg-muted/60">
            <tr className="text-left">
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Tipo</th>
              <th className="px-4 py-2.5 font-medium">Padrão</th>
              <th className="px-4 py-2.5 font-medium">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.prop} className="border-t border-border align-top">
                <td className="px-4 py-2.5 font-mono text-xs whitespace-nowrap">
                  {row.prop}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {row.type}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {row.default ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function KeyboardTable({
  rows,
}: {
  rows: { keys: string; description: string }[];
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">Teclado</h3>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead className="bg-muted/60">
            <tr className="text-left">
              <th className="px-4 py-2.5 font-medium">Tecla</th>
              <th className="px-4 py-2.5 font-medium">Ação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.keys} className="border-t border-border">
                <td className="px-4 py-2.5">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
                    {row.keys}
                  </kbd>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function A11yNotes({ items }: { items: string[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">Acessibilidade</h3>
      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function Usage({
  title = "Uso",
  description,
  code,
}: {
  title?: string;
  description?: string;
  code: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
      <CodeBlock code={code} />
    </section>
  );
}
