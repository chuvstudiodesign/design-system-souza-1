"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandSymbol } from "@/components/brand/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

import { navigation } from "./navigation";

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixa */}
      <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col gap-6 overflow-y-auto border-r border-sidebar-border bg-sidebar p-6 text-sidebar-foreground">
        <Link href="/styleguide" className="flex items-center gap-3">
          <BrandSymbol size={32} />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm tracking-[0.12em]">
              SOUZA &amp; SOUZA
            </span>
            <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Design System
            </span>
          </span>
        </Link>

        <div className="h-px w-full rule-gold" />

        <nav className="flex flex-1 flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {section.title}
              </h3>
              {section.items.length === 0 ? (
                <p className="px-3 text-xs text-muted-foreground/70 italic">
                  Em breve
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === item.href
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-sidebar-border pt-4">
          <span className="text-[11px] text-muted-foreground">Tema</span>
          <ModeToggle />
        </div>
      </aside>

      {/* Conteúdo, deslocado pela largura da sidebar */}
      <main className="ml-64 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
