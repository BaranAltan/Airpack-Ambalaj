import { getImage } from 'astro:assets';
import type { Product } from '../data/products';

/** Sepet ve arama listesinde kullanılan 128×128 küçük ürün görseli. */
export const productThumb = async (p: Pick<Product, 'image'>) =>
  (await getImage({ src: p.image, width: 128, height: 128, fit: 'cover', format: 'webp', quality: 70 })).src;
