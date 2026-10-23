import type { APIRoute } from 'astro';
import { isRoll, products } from '../data/products';
import { productThumb } from '../lib/thumb';

// Sepet ve arama için hafif ürün kataloğu: { slug: { n: ad, p: fiyat, t: küçük görsel, u: 'metre' (rulolar) } }
// Sayfalara gömülmek yerine ayrı dosya olarak sunulur; tarayıcı önbelleğe alır.
export const GET: APIRoute = async () => {
  const entries = await Promise.all(
    products.map(
      async (p) => [p.slug, { n: p.name, p: p.price, t: await productThumb(p), ...(isRoll(p) && { u: 'metre' }) }] as const,
    ),
  );
  return new Response(JSON.stringify(Object.fromEntries(entries)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
