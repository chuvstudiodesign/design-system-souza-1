import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 é o padrão do Next (sites 1–4). 95 é a qualidade da variação 5: o
    // cliente pediu fotos em qualidade máxima, sem compressão visível.
    qualities: [75, 95],
  },
  async redirects() {
    return [
      // URLs do site antigo em WordPress. O conteúdo foi reorganizado sob
      // /site — estes redirects existem para não perder backlink legítimo
      // apontando para as páginas antigas.
      { source: "/sobre-nos", destination: "/site/sobre-nos", permanent: true },
      { source: "/servicos", destination: "/site/servicos", permanent: true },
      { source: "/servicos-2", destination: "/site/servicos", permanent: true },
      { source: "/profissionais", destination: "/site/profissionais", permanent: true },
      { source: "/associadas", destination: "/site/profissionais", permanent: true },
      { source: "/contato", destination: "/site/contato", permanent: true },
      // 02/OUT/2026: a variação 5 virou o site principal em /site; as
      // anteriores foram para /site-v1 … /site-v4. Links antigos de /site5 e
      // /site2–3 continuam funcionando (temporários: ainda é fase de revisão).
      { source: "/site5", destination: "/site", permanent: false },
      // Só as páginas: as fotos continuam servidas de /public/site5/…
      {
        source: "/site5/:pagina(sobre-nos|profissionais|servicos|contato)/:resto*",
        destination: "/site/:pagina/:resto*",
        permanent: false,
      },
      { source: "/site2", destination: "/site-v2", permanent: false },
      { source: "/site3", destination: "/site-v3", permanent: false },
      // 27/OUT/2026: /site4 passou a ser espelho de /site (src/app/site4) e a
      // antiga variação 4 foi para /site-v6, também acessível por /site6.
      { source: "/site6", destination: "/site-v6", permanent: false },
      { source: "/site-v4", destination: "/site-v6", permanent: false },
      { source: "/site/equipe", destination: "/site/profissionais", permanent: false },
      // 27/OUT/2026: o cliente escolheu uma versão de cada página interna; as
      // outras foram para `_ocultas/`. Links antigos de /v2 e /v3 caem na base.
      {
        source: "/:site(site|site4)/:pagina(sobre-nos|profissionais|servicos)/:versao(v2|v3)",
        destination: "/:site/:pagina",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
