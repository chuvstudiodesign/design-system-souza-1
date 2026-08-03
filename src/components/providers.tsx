"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

/**
 * O site institucional abre sempre no escuro — o claro fica a um clique no
 * toggle. Isso vale para o styleguide também, que compartilha este provider e
 * passa a abrir escuro por consequência.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
