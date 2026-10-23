// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { ALL_GUIDES } from './src/data/guides.ts';
import { LEGAL, LEGAL_PATHS } from './src/data/legal.ts';

// Canlı alan adı: canonical, sitemap ve Open Graph adresleri buradan üretilir.
const SITE_URL = 'https://airpackambalaj.com.tr';

// Arama motorlarına gönderilmeyecek sayfalar.
const NOT_IN_SITEMAP = ['/sepet/', '/odeme/', '/siparis-ozeti/'];

// Gerçek güncellenme tarihi bilinen sayfalar için sitemap lastmod (rehberler ve yasal metinler).
const LASTMOD = new Map([
  ...ALL_GUIDES.map((g) => [g.path, g.modified ?? g.published]),
  ...LEGAL_PATHS.map((p) => [p, LEGAL.updated]),
]);

export default defineConfig({
  site: SITE_URL,
  // WordPress ile aynı: /urun/ornek/ (sonda eğik çizgi). Mevcut Google sıralamaları korunur.
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Tüm CSS sayfa içine gömülür: render-blocking istek yok.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.includes('/page/') && !NOT_IN_SITEMAP.some((p) => path.startsWith(p));
      },
      serialize: (item) => {
        const lastmod = LASTMOD.get(new URL(item.url).pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            unicodeRange: [
              'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
            ],
          },
          {
            // Latin-1 dışındaki Türkçe harfler (Ğ ğ İ ı Ş ş) ve ₺ için 3 KB'lık alt küme.
            // Inter latin-ext (85 KB) dosyasından üretildi; değişken ağırlık ekseni korunur.
            src: ['./src/assets/fonts/inter-turkish-wght.woff2'],
            weight: '100 900',
            style: 'normal',
            unicodeRange: ['U+011E-011F,U+0130-0131,U+015E-015F,U+20BA'],
          },
        ],
      },
    },
  ],
});
