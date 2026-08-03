import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // URLs do site antigo em WordPress. O conteúdo foi reorganizado em 5 rotas
    // sob /site — estes redirects existem para não perder backlink legítimo
    // apontando para as páginas antigas.
    return [
      { source: "/sobre-nos", destination: "/site/sobre-nos", permanent: true },
      { source: "/servicos", destination: "/site/servicos", permanent: true },
      { source: "/servicos-2", destination: "/site/servicos", permanent: true },
      { source: "/profissionais", destination: "/site/equipe", permanent: true },
      { source: "/associadas", destination: "/site/equipe", permanent: true },
      { source: "/contato", destination: "/site/contato", permanent: true },
    ];
  },
};

export default nextConfig;
