"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Canal = { rotulo: string; exibicao: string; href: string };

type Props = {
  campos: {
    nome: string;
    telefone: string;
    email: string;
    assunto: string;
    mensagem: string;
  };
  botao: string;
  ui: {
    erros: {
      nomeVazio: string;
      telefoneVazio: string;
      telefoneInvalido: string;
      emailInvalido: string;
      assuntoVazio: string;
      mensagemVazia: string;
    };
    aviso: string;
  };
  whatsapp: Canal;
  telefone: Canal;
  /**
   * Ajustes de estilo por versão da página (V2/V3 pedem Inter só em 400).
   * Opcional: sem a prop, o formulário fica exatamente como na V1.
   */
  classes?: { rotulo?: string; botao?: string; erro?: string };
};

/** Aceita 10 ou 11 dígitos (DDD + número), com ou sem o 55 do país na frente. */
function telefoneValido(valor: string) {
  let digitos = valor.replace(/\D/g, "");
  if (digitos.length > 11 && digitos.startsWith("55")) digitos = digitos.slice(2);
  return digitos.length === 10 || digitos.length === 11;
}

function criarEsquema(erros: Props["ui"]["erros"]) {
  return z.object({
    nome: z.string().trim().min(1, erros.nomeVazio),
    telefone: z
      .string()
      .trim()
      .min(1, erros.telefoneVazio)
      .refine(telefoneValido, erros.telefoneInvalido),
    email: z
      .string()
      .trim()
      .refine(
        (v) => v === "" || z.email().safeParse(v).success,
        erros.emailInvalido
      ),
    assunto: z.string().trim().min(1, erros.assuntoVazio),
    mensagem: z.string().trim().min(1, erros.mensagemVazia),
  });
}

type Valores = z.infer<ReturnType<typeof criarEsquema>>;

const rotulo =
  "text-[0.9563rem] leading-snug font-medium text-foreground data-[error=true]:text-foreground";
const campo =
  "h-14 rounded-xl bg-background px-4 text-[0.9563rem] md:text-[0.9563rem] dark:bg-background";
const mensagemErro = "text-base leading-snug font-medium";

/**
 * Formulário de contato — validação completa, envio pendente.
 *
 * Todo texto chega por props do servidor; nada de `conteudo.ts` no bundle.
 */
export function FormularioContato({
  campos,
  botao,
  ui,
  whatsapp,
  telefone,
  classes,
}: Props) {
  const classeRotulo = cn(rotulo, classes?.rotulo);
  const classeErro = cn(mensagemErro, classes?.erro);
  const [indisponivel, setIndisponivel] = useState(false);
  const form = useForm<Valores>({
    resolver: zodResolver(criarEsquema(ui.erros)),
    mode: "onTouched",
    defaultValues: { nome: "", telefone: "", email: "", assunto: "", mensagem: "" },
  });

  // PENDÊNCIA #1 — docs/PENDENCIAS.md: destino do envio não definido.
  // Nenhuma requisição é feita; os campos ficam preenchidos e o aviso aponta
  // os canais que funcionam hoje.
  function aoEnviar() {
    setIndisponivel(true);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(aoEnviar)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-5"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem className="min-w-0 gap-2.5 sm:col-span-2">
              <FormLabel className={classeRotulo}>{campos.nome}</FormLabel>
              <FormControl>
                <Input
                  autoComplete="name"
                  maxLength={120}
                  aria-required
                  className={campo}
                  {...field}
                />
              </FormControl>
              <FormMessage className={classeErro} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem className="min-w-0 gap-2.5">
              <FormLabel className={classeRotulo}>{campos.telefone}</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={20}
                  aria-required
                  className={campo}
                  {...field}
                />
              </FormControl>
              <FormMessage className={classeErro} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="min-w-0 gap-2.5">
              <FormLabel className={classeRotulo}>{campos.email}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={120}
                  className={campo}
                  {...field}
                />
              </FormControl>
              <FormMessage className={classeErro} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assunto"
          render={({ field }) => (
            <FormItem className="min-w-0 gap-2.5 sm:col-span-2">
              <FormLabel className={classeRotulo}>{campos.assunto}</FormLabel>
              <FormControl>
                <Input maxLength={120} aria-required className={campo} {...field} />
              </FormControl>
              <FormMessage className={classeErro} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem className="min-w-0 gap-2.5 sm:col-span-2">
              <FormLabel className={classeRotulo}>{campos.mensagem}</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  maxLength={2000}
                  aria-required
                  className="max-h-[28rem] min-h-44 rounded-xl bg-background px-4 py-3.5 text-[0.9563rem] leading-relaxed md:text-[0.9563rem] dark:bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage className={classeErro} />
            </FormItem>
          )}
        />

        <div className="mt-2 min-w-0 sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            className={cn(
              "h-auto min-h-11.5 w-full whitespace-normal px-7 py-3 text-base sm:w-auto",
              classes?.botao
            )}
          >
            <SendIcon aria-hidden className="size-5" />
            {botao}
          </Button>

          {/* Sempre no DOM, para o leitor de tela anunciar quando o aviso entra. */}
          <div aria-live="polite">
            {indisponivel ? (
              <Alert
                role={undefined}
                className="mt-6 rounded-2xl border-gold-500/40 bg-background p-5 text-[0.9563rem] leading-relaxed has-[>svg]:gap-x-3 *:[svg]:translate-y-1 *:[svg]:text-gold-400"
              >
                <InfoIcon aria-hidden className="size-5" />
                <AlertDescription className="text-[0.9563rem] leading-relaxed text-balance text-foreground md:text-pretty [&_a]:underline-offset-4">
                  <p className="mb-2">{ui.aviso}</p>
                  <ul className="flex flex-col">
                    <li>
                      <a
                        href={whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center underline underline-offset-4"
                      >
                        {whatsapp.rotulo}: {whatsapp.exibicao}
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={telefone.href}
                        className="inline-flex min-h-11 items-center underline underline-offset-4"
                      >
                        {telefone.rotulo}: {telefone.exibicao}
                      </a>
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            ) : null}
          </div>
        </div>
      </form>
    </Form>
  );
}
