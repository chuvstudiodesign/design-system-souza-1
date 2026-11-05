import { contato, mapaLinkHref } from "@/lib/site5/contato";
import { metricas } from "@/lib/site5/conteudo";

import type { LandingPage } from "./conteudo";

/**
 * Recursos de conversão das landing pages — tudo o que NÃO veio do documento
 * do cliente fica neste arquivo, para ser revisado de uma vez.
 *
 * Regras (Código de Ética da OAB e Provimento 205/2021): nada de promessa de
 * resultado, urgência falsa, contador inventado ou notificação simulada de
 * "fulano acabou de contratar". Os recursos abaixo só reforçam o canal de
 * contato e usam dados reais do escritório.
 */

/** Número usado pelas LPs: o WhatsApp 1, principal do site. */
const WHATSAPP_E164 = "5564984791815";

/**
 * Mensagem já digitada no WhatsApp, com o assunto da página — ajuda a equipe
 * a saber de qual anúncio o contato veio. Texto novo: aguarda aprovação.
 */
export function whatsappDaLp(lp: LandingPage) {
  const assunto = lp.nome.replace(" · ", " ").toLowerCase();
  const mensagem = `Olá! Vim pela página sobre ${assunto} e gostaria de falar com a equipe.`;
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_E164}&text=${encodeURIComponent(mensagem)}`;
}

/** Primeira frase da chamada final ("Ficou com dúvida se…?") — texto do documento. */
export function perguntaFinal(lp: LandingPage) {
  const fim = lp.chamadaFinal.indexOf("?");
  return fim > 0 ? lp.chamadaFinal.slice(0, fim + 1) : lp.chamadaFinal;
}

/**
 * Faixa de confiança (V2 e V3). Dados reais: fundação e métricas que o
 * cliente forneceu para o site.
 */
export const confianca = [
  { valor: "Desde 2007", rotulo: `em ${contato.cidade} e região` },
  { valor: metricas[0].valor, rotulo: `${metricas[0].rotulo} (${metricas[0].periodo})` },
  { valor: "Atendimento", rotulo: "pelo WhatsApp, em linguagem simples" },
] as const;

/**
 * "Como funciona" da V2. Os passos resumem o que o próprio documento diz
 * ("a gente começa ouvindo…, confere sua documentação e explica…"), mas os
 * rótulos são texto novo — aguardam aprovação do cliente.
 */
export const passos = [
  { titulo: "Você conta o que aconteceu", texto: "Pelo WhatsApp, no seu tempo." },
  { titulo: "A equipe confere seus documentos", texto: "Laudos, contribuições e o que você tiver em mãos." },
  { titulo: "Você entende os caminhos", texto: "Em linguagem simples. Só depois decide como seguir." },
] as const;

/** Rótulos curtos das seções e do aviso flutuante — texto novo. */
export const microcopy = {
  sobretituloTexto: "Entenda o benefício",
  sobretituloDocumentos: "Para começar",
  sobretituloFaq: "Dúvidas frequentes",
  sobretituloPassos: "Como funciona",
  avisoTitulo: "Souza & Souza Advocacia",
  avisoStatus: "Equipe no WhatsApp",
  fecharAviso: "Fechar aviso",
} as const;

export { mapaLinkHref };
