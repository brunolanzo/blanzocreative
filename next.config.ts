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
  async rewrites() {
    return {
      // /trabalhos?tag=ia mostra a página já filtrada (gerada e guardada em cache por tag),
      // sem mudar a URL. "beforeFiles" porque /trabalhos também existe como página.
      beforeFiles: [
        {
          source: '/trabalhos',
          has: [{ type: 'query', key: 'tag', value: '(?<tag>[a-z0-9-]+)' }],
          destination: '/trabalhos/filtro/:tag',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        // O cache do CDN do Netlify ignora parâmetros de URL que não são do Next;
        // sem isto, /trabalhos?tag=ia poderia receber a página sem filtro.
        source: '/trabalhos',
        headers: [{ key: 'Netlify-Vary', value: 'query=tag' }],
      },
    ]
  },
}

export default nextConfig
