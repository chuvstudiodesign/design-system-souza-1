"use client";

import * as React from "react";

import { VIDRO_DIALOGO } from "@/components/site4/dialogo-area";
import {
  useLiquidGlassTier,
  type LiquidGlassVariant,
  type ThicknessProfile,
} from "@/components/ui/liquid-glass";

/**
 * Ajustador do liquid glass do pop-up de serviços — ferramenta de desenvolvimento.
 *
 * Mesmo contrato do `AjusteEstampa`: fica oculto por padrão e só responde a
 * `?vidro` na URL (`localhost:3000/site4?vidro`). `process.env.NODE_ENV` vira
 * literal no build, então em produção a condição fecha em `false` e o painel
 * inteiro sai do bundle.
 *
 * Diferente do ajustador de estampa, este não escreve no `style` do elemento:
 * as props do `LiquidGlass` são a interface real do componente, então o painel
 * governa estado do React e o diálogo lê dele. O que sai do botão de copiar é
 * o JSX final, pronto para colar no lugar do preset.
 *
 * O painel vive fora do diálogo. Para que continue clicável com o pop-up
 * aberto, o `DialogoArea` passa a `modal={false}` enquanto ele está em uso e
 * ignora o clique de fora que vier daqui — ver `data-painel-vidro`.
 */

export type ConfigVidro = {
  variant: LiquidGlassVariant;
  profile: ThicknessProfile;
  thickness: number;
  refraction: number;
  ior: number;
  dispersion: number;
  blur: number;
  edgeLight: number;
  noise: number;
  dim: number;
  elevation: "none" | "sm" | "md" | "lg" | "xl";
  /** Escurecimento da página atrás do pop-up, em % do `brand-950`. */
  fundoOpacidade: number;
  /** Desfoque da página atrás do pop-up, em px. Zero desliga. */
  fundoDesfoque: number;
};

/**
 * A origem do painel é a calibragem que o diálogo já renderiza, não um preset
 * genérico: abrir a ferramenta não pode mudar o que está na tela, e "Zerar"
 * precisa voltar para o que está no ar.
 */
const VIDRO_PADRAO = VIDRO_DIALOGO;

const PERFIS: ThicknessProfile[] = ["convex", "squircle", "lip", "concave"];
const VARIANTES: LiquidGlassVariant[] = ["regular", "clear"];
const ELEVACOES = ["none", "sm", "md", "lg", "xl"] as const;

/** O bloco que o usuário copia e cola de volta. */
function especificacoes(c: ConfigVidro) {
  return [
    "<LiquidGlass",
    `  variant="${c.variant}"`,
    `  profile="${c.profile}"`,
    `  thickness={${c.thickness}}`,
    `  refraction={${c.refraction}}`,
    `  ior={${c.ior}}`,
    `  dispersion={${c.dispersion}}`,
    `  blur={${c.blur}}`,
    `  edgeLight={${c.edgeLight}}`,
    `  noise={${c.noise}}`,
    `  dim={${c.dim}}`,
    `  elevation="${c.elevation}"`,
    "/>",
    "",
    `fundo: bg-brand-950/${c.fundoOpacidade} · desfoque ${c.fundoDesfoque}px`,
  ].join("\n");
}

function Faixa({
  rotulo,
  valor,
  min,
  max,
  passo,
  formatar,
  aoMudar,
}: {
  rotulo: string;
  valor: number;
  min: number;
  max: number;
  passo: number;
  formatar?: (v: number) => string;
  aoMudar: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="flex items-baseline justify-between">
        <span className="font-sans text-muted-foreground">{rotulo}</span>
        <span>{formatar ? formatar(valor) : valor}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => aoMudar(Number(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
      />
    </label>
  );
}

function Segmentado<T extends string>({
  rotulo,
  opcoes,
  valor,
  aoMudar,
}: {
  rotulo: string;
  opcoes: readonly T[];
  valor: T;
  aoMudar: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-muted-foreground">{rotulo}</span>
      <div className="flex flex-wrap gap-1">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => aoMudar(opcao)}
            className={`rounded-md border px-1.5 py-0.5 ${
              opcao === valor
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
            }`}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A query string só muda por navegação, que remonta a árvore. Nada a assinar. */
function naoAssina() {
  return () => {};
}

/**
 * Devolve a configuração corrente e o painel que a governa.
 *
 * Fora de desenvolvimento, ou sem `?vidro` na URL, `config` volta `null` e o
 * diálogo cai no preset estático — nenhum caminho novo em produção.
 */
export function useAjusteVidro() {
  const [config, setConfig] = React.useState<ConfigVidro>(VIDRO_PADRAO);

  // A URL é um sistema externo, então entra por `useSyncExternalStore` e não
  // por efeito com `setState` — que dispararia render em cascata e é o que o
  // lint do React Compiler reprova. O instantâneo do servidor é `false`, o
  // React o reaproveita durante a hidratação e o valor real chega no primeiro
  // render do cliente. Ler daqui, e não de `useSearchParams`, também evita
  // tirar a rota da renderização estática por causa de uma ferramenta.
  const chamado = React.useSyncExternalStore(
    naoAssina,
    () => new URLSearchParams(window.location.search).has("vidro"),
    () => false
  );

  const disponivel = process.env.NODE_ENV === "development" && chamado;

  return {
    config: disponivel ? config : null,
    painel: disponivel ? (
      <PainelVidro config={config} aoMudar={setConfig} />
    ) : null,
  };
}

function PainelVidro({
  config,
  aoMudar,
}: {
  config: ConfigVidro;
  aoMudar: (c: ConfigVidro) => void;
}) {
  const [aberto, setAberto] = React.useState(true);
  const [copiado, setCopiado] = React.useState(false);
  const tier = useLiquidGlassTier();

  const set = <K extends keyof ConfigVidro>(chave: K, valor: ConfigVidro[K]) =>
    aoMudar({ ...config, [chave]: valor });

  return (
    <div
      data-painel-vidro
      className="dark fixed top-4 right-4 bottom-4 z-[100] flex w-64 flex-col gap-2 overflow-y-auto rounded-xl border border-border bg-popover/95 p-3 font-mono text-xs text-popover-foreground shadow-xl backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="rounded-md bg-primary px-2 py-1 font-sans text-primary-foreground"
        >
          {aberto ? "Recolher" : "Vidro"}
        </button>
        <span className="font-sans text-muted-foreground">tier {tier}</span>
      </div>

      {aberto && (
        <>
          <p className="font-sans leading-snug text-muted-foreground">
            Abra um serviço e ajuste com o pop-up aberto.
            {tier !== "refractive"
              ? " Este navegador não faz deslocamento geométrico, então refração, IOR e aberração não aparecem."
              : null}
          </p>

          <Segmentado
            rotulo="variante"
            opcoes={VARIANTES}
            valor={config.variant}
            aoMudar={(v) => set("variant", v)}
          />
          <Segmentado
            rotulo="perfil"
            opcoes={PERFIS}
            valor={config.profile}
            aoMudar={(v) => set("profile", v)}
          />
          <Segmentado
            rotulo="elevação"
            opcoes={ELEVACOES}
            valor={config.elevation}
            aoMudar={(v) => set("elevation", v)}
          />

          <div className="h-px bg-border" />

          <Faixa
            rotulo="espessura"
            valor={config.thickness}
            min={4}
            max={80}
            passo={1}
            formatar={(v) => `${v}px`}
            aoMudar={(v) => set("thickness", v)}
          />
          <Faixa
            rotulo="refração"
            valor={config.refraction}
            min={0}
            max={3}
            passo={0.05}
            formatar={(v) => `${v.toFixed(2)}×`}
            aoMudar={(v) => set("refraction", v)}
          />
          <Faixa
            rotulo="IOR"
            valor={config.ior}
            min={1}
            max={2}
            passo={0.01}
            formatar={(v) => v.toFixed(2)}
            aoMudar={(v) => set("ior", v)}
          />
          <Faixa
            rotulo="aberração"
            valor={config.dispersion}
            min={0}
            max={1}
            passo={0.01}
            formatar={(v) => v.toFixed(2)}
            aoMudar={(v) => set("dispersion", v)}
          />

          <div className="h-px bg-border" />

          <Faixa
            rotulo="blur do vidro"
            valor={config.blur}
            min={0}
            max={40}
            passo={0.5}
            formatar={(v) => `${v}px`}
            aoMudar={(v) => set("blur", v)}
          />
          <Faixa
            rotulo="luz da borda"
            valor={config.edgeLight}
            min={0}
            max={1}
            passo={0.01}
            formatar={(v) => v.toFixed(2)}
            aoMudar={(v) => set("edgeLight", v)}
          />
          <Faixa
            rotulo="ruído"
            valor={config.noise}
            min={0}
            max={1}
            passo={0.01}
            formatar={(v) => v.toFixed(2)}
            aoMudar={(v) => set("noise", v)}
          />
          <Faixa
            rotulo="dimming interno"
            valor={config.dim}
            min={0}
            max={0.6}
            passo={0.01}
            formatar={(v) => v.toFixed(2)}
            aoMudar={(v) => set("dim", v)}
          />

          <div className="h-px bg-border" />

          <Faixa
            rotulo="fundo escuro"
            valor={config.fundoOpacidade}
            min={0}
            max={100}
            passo={5}
            formatar={(v) => `${v}%`}
            aoMudar={(v) => set("fundoOpacidade", v)}
          />
          <Faixa
            rotulo="fundo desfoque"
            valor={config.fundoDesfoque}
            min={0}
            max={24}
            passo={1}
            formatar={(v) => `${v}px`}
            aoMudar={(v) => set("fundoDesfoque", v)}
          />

          <button
            type="button"
            onClick={() => aoMudar(VIDRO_PADRAO)}
            className="rounded-md border border-border px-2 py-1 font-sans hover:bg-muted"
          >
            Zerar
          </button>

          <pre className="rounded-md bg-muted px-2 py-1 leading-relaxed whitespace-pre-wrap select-all">
            {especificacoes(config)}
          </pre>

          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(especificacoes(config));
              setCopiado(true);
              setTimeout(() => setCopiado(false), 1500);
            }}
            className="rounded-md border border-border px-2 py-1 font-sans hover:bg-muted"
          >
            {copiado ? "Copiado" : "Copiar especificações"}
          </button>
        </>
      )}
    </div>
  );
}
