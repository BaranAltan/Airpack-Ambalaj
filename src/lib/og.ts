// Sosyal paylaşım (Open Graph) görselleri: 1200×630, marka zemini + logo + başlık + sağda ürün fotoğrafı.
// Derlemede /og/<ad>.jpg olarak üretilir (src/pages/og/[slug].jpg.ts). Yalnızca sunucu tarafında kullanılır.
import path from 'node:path';
import sharp from 'sharp';
import { ALL_GUIDES } from '../data/guides';
import { categories, products } from '../data/products';
import { formatTRY } from './pricing';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export interface OgSpec {
  slug: string;
  title: string;
  subtitle: string;
  /** Proje köküne göre kaynak görsel yolu */
  image: string;
}

const productImage = (file: string) => `src/assets/products/${file}`;
const SITE_IMAGE = 'src/assets/site/hazir-airpack-modelleri.jpg';

export const ogPath = (slug: string) => `/og/${slug}.jpg`;
export const productOgSlug = (productSlug: string) => `urun-${productSlug}`;
export const guideOgSlug = (guidePath: string) => `rehber-${guidePath.replaceAll('/', '')}`;
export const categoryOgSlug = (categorySlug: string) => `kategori-${categorySlug}`;

export const ogSpecs = (): OgSpec[] => {
  const firstRoll = products.find((p) => p.unit === 'metre');
  return [
    {
      slug: 'site',
      title: 'Hava Kanallı Ambalaj ve Airpack Poşet',
      subtitle: 'Hazır ebatlar · Metreyle rulo · Türkiye geneline kargo',
      image: SITE_IMAGE,
    },
    {
      slug: 'olcu-rehberi',
      title: 'Airpack Ölçü Rehberi ve Fiyat Listesi',
      subtitle: 'Tüm ebatlar ve adet fiyatları tek tabloda',
      image: 'src/assets/site/airpack-olculeri.jpg',
    },
    ...categories.map((c) => ({
      slug: categoryOgSlug(c.slug),
      title: c.title,
      subtitle: c.slug === 'rulo-paketler' ? 'İstenilen uzunlukta kesilir · Metre fiyatıyla' : '50’li paketler · Üreticiden toptan fiyat',
      image: c.slug === 'rulo-paketler' && firstRoll ? productImage(firstRoll.imageFile) : SITE_IMAGE,
    })),
    ...ALL_GUIDES.map((g) => ({ slug: guideOgSlug(g.path), title: g.title, subtitle: g.lead, image: SITE_IMAGE })),
    ...products.map((p) => ({
      slug: productOgSlug(p.slug),
      title: p.name,
      subtitle: p.unit === 'metre' ? `Metre fiyatı ${formatTRY(p.price)} · En az 50 metre` : `Adet fiyatı ${formatTRY(p.price)} · 50’li paket`,
      image: productImage(p.imageFile),
    })),
  ];
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Kelimeleri satırlara böler (yaklaşık karakter genişliğiyle). */
const wrap = (text: string, maxChars: number) => {
  const lines: string[] = [];
  for (const word of text.split(/\s+/)) {
    const last = lines.at(-1);
    if (last !== undefined && (last + ' ' + word).length <= maxChars) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
};

const CARD = { x: 740, y: 48, width: 412, height: 534, radius: 28 };
const TEXT_X = 64;
// GitHub Actions'ta fonts-inter kurulur; Windows'ta Inter yoksa Segoe UI kullanılır.
const FONT = "Inter, 'Segoe UI', Arial, sans-serif";

export const renderOg = async (spec: OgSpec): Promise<Buffer> => {
  const root = process.cwd();
  let size = 54;
  let lines = wrap(spec.title, 20);
  if (lines.length > 3) {
    size = 44;
    lines = wrap(spec.title, 25).slice(0, 4);
  }
  const lineHeight = Math.round(size * 1.18);
  const titleTop = 300 - Math.round(((lines.length - 1) * lineHeight) / 2);
  const subtitleLines = wrap(spec.subtitle, 40).slice(0, 2);
  const subtitleTop = titleTop + (lines.length - 1) * lineHeight + 62;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#1d4ed8"/></linearGradient></defs>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#g)"/>
  ${lines.map((l, i) => `<text x="${TEXT_X}" y="${titleTop + i * lineHeight}" font-family="${FONT}" font-size="${size}" font-weight="700" fill="#ffffff">${esc(l)}</text>`).join('')}
  ${subtitleLines.map((l, i) => `<text x="${TEXT_X}" y="${subtitleTop + i * 36}" font-family="${FONT}" font-size="27" fill="#bfdbfe">${esc(l)}</text>`).join('')}
  <text x="${TEXT_X}" y="574" font-family="${FONT}" font-size="24" font-weight="600" fill="#93c5fd">airpackambalaj.com.tr</text>
</svg>`;

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${CARD.height}"><rect width="${CARD.width}" height="${CARD.height}" rx="${CARD.radius}" ry="${CARD.radius}"/></svg>`,
  );
  const card = await sharp(path.join(root, spec.image))
    .resize(CARD.width, CARD.height, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  const logo = await sharp(path.join(root, 'src/assets/site/logo-white.png')).resize({ width: 230 }).png().toBuffer();

  return sharp(Buffer.from(svg))
    .composite([
      { input: logo, left: TEXT_X, top: 52 },
      { input: card, left: CARD.x, top: CARD.y },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
};
