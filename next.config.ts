import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // As imagens vêm do CDN do Sanity, que já redimensiona e converte (WebP/AVIF).
    // Assim o Netlify não processa imagem nenhuma (e não gasta créditos com isso).
    loader: 'custom',
    loaderFile: './src/sanity/lib/image-loader.ts',
    // 70 só no fundo do reel (fica a 45% de opacidade); o resto usa 75.
    qualities: [70, 75],
  },
  experimental: {
    // O site e o painel têm layouts raiz separados; a página 404 geral fica em app/global-not-found.tsx.
    globalNotFound: true,
    // O CSS do site (~10 KB comprimido) vai dentro do HTML: a primeira pintura não espera outro arquivo.
    inlineCss: true,
  },
  async redirects() {
    // Endereços da versão em português do site (até 23/10/2026): links antigos continuam funcionando.
    // A query (?tag=…) passa adiante sozinha.
    return [
      { source: '/trabalhos', destination: '/work', permanent: true },
      { source: '/trabalhos/:slug', destination: '/work/:slug', permanent: true },
      { source: '/sobre', destination: '/about', permanent: true },
      { source: '/contato', destination: '/contact', permanent: true },
    ]
  },
  async rewrites() {
    return {
      // /work?tag=ai mostra a página já filtrada (gerada e guardada em cache por tag),
      // sem mudar a URL. "beforeFiles" porque /work também existe como página.
      beforeFiles: [
        {
          source: '/work',
          has: [{ type: 'query', key: 'tag', value: '(?<tag>[a-z0-9-]+)' }],
          destination: '/work/filter/:tag',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        // O cache do CDN do Netlify ignora parâmetros de URL que não são do Next;
        // sem isto, /work?tag=ai poderia receber a página sem filtro.
        source: '/work',
        headers: [{ key: 'Netlify-Vary', value: 'query=tag' }],
      },
    ]
  },
}

export default nextConfig
