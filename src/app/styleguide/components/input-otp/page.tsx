"use client";

import * as React from "react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

export default function InputOTPPage() {
  const [value, setValue] = React.useState("");

  return (
    <ComponentPage
      title="Input OTP"
      category="Inputs & Forms"
      description="Campo de código de verificação com um slot por dígito, colagem inteligente, navegação automática entre casas e suporte a autocomplete de SMS."
      install="npx shadcn@latest add input-otp"
      importCode={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"`}
    >
      <Demo
        title="Seis dígitos"
        contentClassName="flex-col items-start"
        code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="otp">Código de verificação</Label>
          <InputOTP maxLength={6} id="otp">
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Demo>

      <Demo
        title="Com separador"
        contentClassName="flex-col items-start"
        code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
      >
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {[0, 1, 2].map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {[3, 4, 5].map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <Demo
        title="Controlado"
        description="Digite o código para ver o valor sendo montado."
        contentClassName="flex-col items-start"
        code={`const [value, setValue] = React.useState("")

<InputOTP maxLength={4} value={value} onChange={setValue}>…</InputOTP>`}
      >
        <div className="flex flex-col gap-3">
          <InputOTP maxLength={4} value={value} onChange={setValue}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="font-mono text-xs text-muted-foreground">
            valor: {value || "—"}{" "}
            {value.length === 4 ? "· completo ✓" : null}
          </p>
        </div>
      </Demo>

      <Demo
        title="Somente dígitos e desabilitado"
        contentClassName="flex-col items-start"
        code={`import { REGEXP_ONLY_DIGITS } from "input-otp"

<InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>…</InputOTP>
<InputOTP maxLength={4} disabled>…</InputOTP>`}
      >
        <InputOTP maxLength={4} pattern="^\\d+$">
          <InputOTPGroup>
            {[0, 1, 2, 3].map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <InputOTP maxLength={4} disabled>
          <InputOTPGroup>
            {[0, 1, 2, 3].map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </Demo>

      <Usage
        code={`import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export function VerifyCode({ onComplete }: { onComplete: (code: string) => void }) {
  return (
    <InputOTP maxLength={6} onComplete={onComplete}>
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}`}
      />

      <PropsTable
        title="Props — InputOTP"
        rows={[
          {
            prop: "maxLength",
            type: "number",
            description: "Quantidade total de casas (obrigatório).",
          },
          {
            prop: "value / onChange",
            type: "string / (value: string) => void",
            description: "Controle do código digitado.",
          },
          {
            prop: "onComplete",
            type: "(value: string) => void",
            description: "Disparado quando todas as casas são preenchidas.",
          },
          {
            prop: "pattern",
            type: "string",
            description:
              "Regex de caracteres aceitos (a lib exporta REGEXP_ONLY_DIGITS e variantes).",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita o campo.",
          },
        ]}
      />

      <PropsTable
        title="Props — InputOTPSlot"
        rows={[
          {
            prop: "index",
            type: "number",
            description: "Posição da casa (0-based) — obrigatório.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "0–9 / A–Z", description: "Preenche a casa e avança." },
          { keys: "Backspace", description: "Apaga e volta uma casa." },
          { keys: "← / →", description: "Move entre as casas." },
          { keys: "Ctrl/⌘ + V", description: "Cola o código completo de uma vez." },
        ]}
      />

      <A11yNotes
        items={[
          "Por baixo existe um único <input> real: leitores de tela e gerenciadores de senha continuam funcionando.",
          "Use autoComplete='one-time-code' para permitir o preenchimento automático do SMS no iOS/Android.",
          "Associe um rótulo visível ao campo — 'Código de verificação' descreve melhor que 'OTP'.",
          "Informe erros de código inválido em texto, com aria-live, e não apenas mudando a cor das casas.",
        ]}
      />
    </ComponentPage>
  );
}
