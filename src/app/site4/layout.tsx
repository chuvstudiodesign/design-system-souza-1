/**
 * `/site4` é um espelho de `/site`: o cliente precisa divulgar os dois links.
 * Cada arquivo aqui só reexporta o equivalente em `src/app/site`, então toda
 * edição no site principal já vale para os dois — não há o que copiar.
 *
 * Os links internos apontam para `/site/...`; quem entra por `/site4` passa
 * para `/site` ao navegar, o que é esperado (é o mesmo site).
 */
export { default, metadata } from "@/app/site/layout";
