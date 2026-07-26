"use client";

import * as React from "react";
import { toast as sonnerToast } from "sonner";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

/**
 * Toast — o componente `toast` legado do shadcn/ui foi descontinuado em favor
 * do Sonner. Este módulo mantém uma API familiar (`toast({ title, description,
 * action, variant })`) implementada sobre o Sonner, além de reexportar o
 * `Toaster` e o `toast()` nativo para casos avançados.
 *
 * O `<Toaster />` já está montado globalmente em `src/components/providers.tsx`.
 */
type ToastVariant = "default" | "success" | "info" | "warning" | "destructive";

export type ToastOptions = {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: { label: string; onClick: (event: React.MouseEvent<HTMLButtonElement>) => void };
  cancel?: { label: string; onClick: (event: React.MouseEvent<HTMLButtonElement>) => void };
  id?: string | number;
};

function toast({
  title,
  description,
  variant = "default",
  duration,
  action,
  cancel,
  id,
}: ToastOptions) {
  const options = { description, duration, action, cancel, id };

  switch (variant) {
    case "success":
      return sonnerToast.success(title, options);
    case "info":
      return sonnerToast.info(title, options);
    case "warning":
      return sonnerToast.warning(title, options);
    case "destructive":
      return sonnerToast.error(title, options);
    default:
      return sonnerToast(title, options);
  }
}

/** Dispara um toast de carregamento que resolve com a promise. */
toast.promise = sonnerToast.promise;
/** Remove um toast específico (ou todos, se `id` for omitido). */
toast.dismiss = sonnerToast.dismiss;
/** Toast customizado com JSX completo. */
toast.custom = sonnerToast.custom;

/** Botão utilitário para disparar toasts em demos e ações rápidas. */
function ToastButton({
  toast: options,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { toast: ToastOptions }) {
  return (
    <Button onClick={() => toast(options)} {...props}>
      {children}
    </Button>
  );
}

export { toast, Toaster, ToastButton };
