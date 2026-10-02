"use client";

import * as React from "react";

/**
 * Motor do carrossel de depoimentos — compartilhado pelas três versões.
 *
 * O relógio É a barra de progresso: uma animação da Web Animations API
 * (`scaleX` de 0 a 1) com a duração de leitura do depoimento. Quando ela
 * termina, o carrossel avança; quando pausa, a barra congela exatamente onde
 * está e retoma dali. Não há `setTimeout` paralelo que possa dessincronizar
 * da barra.
 *
 * Não há botão de pausa (decisão do cliente: "parece player de música").
 * O carrossel para sozinho por três motivos independentes (o mouse sobre o
 * destaque deixou de pausar em 02/OUT/2026, a pedido do cliente — os
 * depoimentos têm que ficar passando):
 * - o foco de TECLADO está no destaque ou nas setas (clique de mouse não
 *   conta: depois de clicar em "próximo" o carrossel tem que continuar);
 * - a seção está fora da tela;
 * - o texto completo de um depoimento está aberto (`segurar`).
 *
 * Com `prefers-reduced-motion` o carrossel NUNCA avança sozinho — só pelas
 * setas — e as versões tiram a transição.
 */

const consultaReduzido = "(prefers-reduced-motion: reduce)";

function assinarReduzido(aviso: () => void) {
  const mq = window.matchMedia(consultaReduzido);
  mq.addEventListener("change", aviso);
  return () => mq.removeEventListener("change", aviso);
}

export function usePrefereMenosMovimento() {
  return React.useSyncExternalStore(
    assinarReduzido,
    () => window.matchMedia(consultaReduzido).matches,
    () => false
  );
}

/**
 * O estado do carrossel, sem as refs de callback: estas são desestruturadas
 * na chamada do hook e ligadas direto no JSX (o compilador do React não
 * aceita ref viajando dentro de um objeto que também é lido no render).
 */
export type Carrossel = Omit<
  ReturnType<typeof useCarrossel>,
  "ligarBarra" | "ligarArea"
>;

export function useCarrossel(tempos: number[]) {
  const total = tempos.length;
  const reduzido = usePrefereMenosMovimento();

  const [indice, setIndice] = React.useState(0);
  /** Reinicia o relógio mesmo quando o índice não muda (clique no ativo). */
  const [ciclo, setCiclo] = React.useState(0);
  /** Texto completo aberto: o carrossel espera o leitor. */
  const [segurando, setSegurando] = React.useState(false);
  const [foco, setFoco] = React.useState(false);
  // Sem IntersectionObserver (navegador muito antigo) vale "visível".
  const [visivel, setVisivel] = React.useState(
    () => typeof IntersectionObserver === "undefined"
  );
  /** `aria-live` só depois de navegação do usuário — nunca no autoplay. */
  const [anunciar, setAnunciar] = React.useState(false);

  const autoplay = !reduzido;
  const rodando = autoplay && !foco && !segurando && visivel;

  // Elementos em estado (refs de callback), não `useRef`: o objeto devolvido
  // pelo hook circula pelo render das versões, e ref não pode ser lida lá.
  const [barra, ligarBarra] = React.useState<HTMLSpanElement | null>(null);
  const [area, ligarArea] = React.useState<HTMLDivElement | null>(null);
  const animacao = React.useRef<Animation | null>(null);
  const rodandoRef = React.useRef(rodando);

  React.useEffect(() => {
    rodandoRef.current = rodando;
    const a = animacao.current;
    if (!a) return;
    if (rodando) a.play();
    else a.pause();
  }, [rodando]);

  // Um relógio por depoimento exibido.
  React.useEffect(() => {
    if (!barra || total === 0) return;

    const a = barra.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: tempos[indice], easing: "linear", fill: "forwards" }
    );
    if (!rodandoRef.current) a.pause();
    a.onfinish = () => {
      setAnunciar(false);
      setIndice((i) => (i + 1) % total);
    };
    animacao.current = a;

    return () => {
      a.onfinish = null;
      a.cancel();
      if (animacao.current === a) animacao.current = null;
    };
  }, [barra, indice, ciclo, tempos, total]);

  // Fora da tela, o carrossel espera.
  React.useEffect(() => {
    if (!area || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entrada]) => setVisivel(entrada.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(area);
    return () => obs.disconnect();
  }, [area]);

  const ir = React.useCallback(
    (alvo: number) => {
      setAnunciar(true);
      setIndice(((alvo % total) + total) % total);
      setCiclo((c) => c + 1);
    },
    [total]
  );

  const proximo = React.useCallback(() => ir(indice + 1), [ir, indice]);
  const anterior = React.useCallback(() => ir(indice - 1), [ir, indice]);

  /** Leva o destaque para a tela — usado pelas boxes de resumo. */
  const rolarAteDestaque = React.useCallback(() => {
    area?.scrollIntoView({
      behavior: reduzido ? "auto" : "smooth",
      block: "start",
    });
  }, [area, reduzido]);

  /** Abrir/fechar o texto completo: com ele aberto, o carrossel espera. */
  const segurar = React.useCallback((aberto: boolean) => {
    setSegurando(aberto);
  }, []);

  /** Espalhe no destaque: pausa com foco de teclado. */
  const destaqueProps = focoProps(setFoco);

  /** Espalhe nas setas: pausa só com foco de teclado. */
  const setasProps = focoProps(setFoco);

  return {
    total,
    indice,
    ir,
    proximo,
    anterior,
    autoplay,
    rodando,
    reduzido,
    segurar,
    vivo: (anunciar ? "polite" : "off") as "polite" | "off",
    ligarBarra,
    ligarArea,
    rolarAteDestaque,
    destaqueProps,
    setasProps,
  };
}

function focoProps(setFoco: (v: boolean) => void) {
  return {
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      setFoco(e.target.matches(":focus-visible"));
    },
    onBlur: () => setFoco(false),
  };
}
