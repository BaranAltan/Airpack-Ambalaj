import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { productUrl, products } from '../data/products';
import { SITE } from '../data/site';
import { MIN_QTY, SHIPPING_FEE } from '../lib/pricing';

// Google Merchant Center ürün feed'i (RSS 2.0). Merchant Center > Ürünler > Feed'ler bölümünden
// "Planlanmış getirme" ile https://airpackambalaj.com.tr/google-merchant.xml adresi eklenir.
// Fiyat, en az sipariş miktarının (50 adet / 50 metre) toplamıdır; birim fiyat unit_pricing alanlarında verilir.

const xml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const plain = (html: string) =>
  html
    .replace(/<\/(p|li)>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const money = (n: number) => `${n.toFixed(2)} TRY`;

export const GET: APIRoute = async ({ site }) => {
  const items = await Promise.all(
    products.map(async (p) => {
      const roll = p.unit === 'metre';
      const unit = roll ? 'm' : 'ct';
      const image = await getImage({ src: p.image, width: 1000, format: 'jpg', quality: 85 });
      const title = roll ? `${p.name} (${MIN_QTY} metre)` : p.name;
      return `    <item>
      <g:id>AP-${p.id}</g:id>
      <g:title>${xml(title)}</g:title>
      <g:description>${xml(plain(p.shortDescription))}</g:description>
      <g:link>${new URL(productUrl(p), site).href}</g:link>
      <g:image_link>${new URL(image.src, site).href}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${money(p.price * MIN_QTY)}</g:price>
      <g:unit_pricing_measure>${MIN_QTY} ${unit}</g:unit_pricing_measure>
      <g:unit_pricing_base_measure>1 ${unit}</g:unit_pricing_base_measure>
      <g:brand>${xml(SITE.name)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${xml(`Ambalaj > Hava Kanallı Ambalaj > ${p.category.name}`)}</g:product_type>
      <g:shipping>
        <g:country>TR</g:country>
        <g:price>${money(SHIPPING_FEE)}</g:price>
      </g:shipping>
    </item>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xml(SITE.name)}</title>
    <link>${new URL('/', site).href}</link>
    <description>${xml(SITE.description)}</description>
${items.join('\n')}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
