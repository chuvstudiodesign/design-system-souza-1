"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const schema = z.object({
  nome: z.string().min(3, "Informe pelo menos 3 caracteres."),
  email: z.string().email("E-mail inválido."),
  area: z.string().min(1, "Selecione uma área."),
  resumo: z.string().max(280, "Máximo de 280 caracteres.").optional(),
  termos: z.boolean().refine((value) => value, {
    message: "É necessário aceitar os termos.",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function FormPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", area: "", resumo: "", termos: false },
  });

  function onSubmit(values: FormValues) {
    toast({
      title: "Formulário enviado",
      description: `${values.nome} · ${values.email}`,
      variant: "success",
    });
  }

  return (
    <ComponentPage
      title="Form"
      category="Inputs & Forms"
      description="Integração entre react-hook-form e os componentes do design system: contexto de campo, ids automáticos, aria-describedby, aria-invalid e mensagens de erro vindas do schema Zod."
      install="npx shadcn@latest add form"
      importCode={`import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"`}
    >
      <Demo
        title="Formulário validado com Zod"
        description="Envie com campos vazios para ver as mensagens de erro e os estados aria-invalid."
        contentClassName="flex-col items-stretch"
        code={`const schema = z.object({
  nome: z.string().min(3, "Informe pelo menos 3 caracteres."),
  email: z.string().email("E-mail inválido."),
})

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { nome: "", email: "" },
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
    <FormField
      control={form.control}
      name="nome"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Como consta no contrato.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Enviar</Button>
  </form>
</Form>`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-lg flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Maria Souza" {...field} />
                  </FormControl>
                  <FormDescription>
                    Como consta no contrato de honorários.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nome@escritorio.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de atuação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="civil">Cível</SelectItem>
                      <SelectItem value="trabalhista">Trabalhista</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resumo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormDescription>Opcional, até 280 caracteres.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termos"
              render={({ field }) => (
                <FormItem className="flex-row items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1">
                    <FormLabel>Aceito os termos de uso</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">Enviar</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Limpar
              </Button>
            </div>
          </form>
        </Form>
      </Demo>

      <Usage
        title="Estrutura recomendada"
        description="Um FormField por campo; o FormControl injeta id, aria-describedby e aria-invalid no controle filho."
        code={`<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>E-mail</FormLabel>
      <FormControl>
        <Input type="email" {...field} />
      </FormControl>
      <FormDescription>Nunca será compartilhado.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>`}
      />

      <PropsTable
        title="Componentes"
        rows={[
          {
            prop: "Form",
            type: "FormProvider",
            description:
              "Provider do react-hook-form — receba o retorno de useForm com spread.",
          },
          {
            prop: "FormField",
            type: "ControllerProps",
            description:
              "Envolve o Controller e publica o nome do campo no contexto.",
          },
          {
            prop: "FormItem",
            type: "div",
            description: "Gera o id base e agrupa rótulo, controle e mensagens.",
          },
          {
            prop: "FormLabel",
            type: "Label",
            description:
              "Aponta htmlFor para o controle e fica destrutivo quando há erro.",
          },
          {
            prop: "FormControl",
            type: "Slot",
            description:
              "Injeta id, aria-describedby e aria-invalid no controle filho.",
          },
          {
            prop: "FormDescription",
            type: "p",
            description: "Texto de apoio referenciado por aria-describedby.",
          },
          {
            prop: "FormMessage",
            type: "p",
            description:
              "Mensagem de erro do campo; não renderiza nada quando não há erro.",
          },
          {
            prop: "useFormField()",
            type: "hook",
            description:
              "Acesso ao estado do campo (error, ids) dentro de componentes customizados.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Cada campo recebe id único via React.useId — rótulo, descrição e erro ficam corretamente associados.",
          "Quando há erro, o controle recebe aria-invalid e aria-describedby inclui a mensagem.",
          "A mensagem de erro é texto real no DOM, lida por leitores de tela ao focar o campo.",
          "Use <form onSubmit={form.handleSubmit(...)}> para manter o envio por Enter funcionando.",
          "Não substitua o rótulo por placeholder — o FormLabel é obrigatório para acessibilidade.",
        ]}
      />
    </ComponentPage>
  );
}
