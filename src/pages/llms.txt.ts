import type { APIRoute } from 'astro';
import { ALL_GUIDES } from '../data/guides';
import { bags, categories, categoryUrl, products } from '../data/products';
import { SITE } from '../data/site';
import { BULK_DISCOUNT, BULK_MIN_QTY, MIN_QTY, QTY_STEP, SHIPPING_FEE, formatNumber, formatTRY } from '../lib/pricing';

// Yapay zekâ asistanları için sitenin kısa özeti (llmstxt.org biçimi). İçerik ürün verisinden üretilir.
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const rolls = products.filter((p) => p.unit === 'metre');
  const cm = (n: number) => `${String(n).replace('.', ',')} cm`;
  const [bagCat, rollCat] = categories;
  const sizes = (list: typeof products, key: 'width' | 'height') => list.map((p) => p[key]);
  const range = (list: number[]) => `${cm(Math.min(...list))} – ${cm(Math.max(...list))}`;

  const text = `# ${SITE.name}

> ${SITE.description}

## Ürünler

- [${bagCat.title}](${url(categoryUrl(bagCat))}): ${bags.length} ebat, en ${range(sizes(bags, 'width'))}, boy ${range(sizes(bags, 'height'))}. ${MIN_QTY}'li paketler, adet fiyatı; ${formatNumber(BULK_MIN_QTY)} adet ve üzerinde birim başına ${formatTRY(BULK_DISCOUNT)} iskonto.
- [${rollCat.title}](${url(categoryUrl(rollCat))}): ${rolls.length} rulo yüksekliği (${range(sizes(rolls, 'width'))}), metre fiyatıyla; istenilen uzunlukta kesilir.
- [Airpack Ölçü Rehberi](${url('/airpack-olcu-rehberi/')}): tüm poşet ebatları ve fiyat listesi.
- [Tüm ürünler](${url('/magaza/')})

## Sipariş

- En az ${MIN_QTY} adet (poşet) ya da ${MIN_QTY} metre (rulo); ${QTY_STEP}'nin katları halinde.
- Kargo: sipariş başına ${formatTRY(SHIPPING_FEE)}.
- Sipariş sepetten WhatsApp üzerinden iletilir; ödeme havale/EFT ile yapılır.
- Numune gönderimi ücretsizdir (WhatsApp üzerinden talep edilir).

## Rehberler

${ALL_GUIDES.map((g) => `- [${g.title}](${url(g.path)}): ${g.summary}`).join('\n')}
- [Sıkça Sorulan Sorular](${url('/sikca-sorulan-sorular/')})

## Firma

- [Hakkımızda](${url('/hakkimizda/')})
- [Kargo ve Teslimat](${url('/kargo-ve-teslimat/')}), [İade ve Cayma](${url('/iade-ve-cayma/')}), [Mesafeli Satış Sözleşmesi](${url('/mesafeli-satis-sozlesmesi/')})
- [İletişim](${url('/bize-ulasin/')}): telefon ve WhatsApp ${SITE.phone}, e-posta ${SITE.email}, ${SITE.address.city} / ${SITE.address.district}.
`;

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
