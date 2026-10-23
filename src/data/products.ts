import type { ImageMetadata } from 'astro';
import type { Unit } from '../lib/pricing';
import raw from './products.json';

// products.json canlı WooCommerce mağazasından aktarıldı. Yeni ürün eklemek için bu dosyaya bir kayıt,
// src/assets/products/ klasörüne de aynı adla görsel eklemeniz yeterli.

/** Ürünlerin ortak galeri görselleri için açıklayıcı alt metinler */
const GALLERY_ALT: Record<string, string> = {
  '90-mikron.webp': '90 mikron kalınlıkta hava kanallı airpack ambalaj',
  'airpack-ambalaj.webp': 'Şişe, kavanoz ve elektronik ürünler için hava kanallı airpack ambalaj çeşitleri',
  'hava-kanalli-rulo-afis.webp': 'İstenilen uzunlukta kesilebilen hava kanallı rulo',
};

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/products/*.webp', { eager: true });
const image = (file: string) => {
  const found = images[`../assets/products/${file}`];
  if (!found) throw new Error(`Ürün görseli bulunamadı: src/assets/products/${file}`);
  return found.default;
};

export interface Category {
  slug: string;
  name: string;
  /** Sayfadaki H1 */
  title: string;
  /** Arama sonucundaki başlık (<title>, 1. sayfa) */
  seoTitle: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: 'hazir-paketler',
    name: 'Hazır Paketler',
    title: 'Hazır Airpack Poşet Modelleri',
    seoTitle: 'Airpack Poşet Modelleri ve Fiyatları',
    description:
      'Ölçüye göre hazır üretilmiş hava kanallı airpack poşetler. 12 cm’den 54 cm’e kadar tüm ebatlar, 50’li paketler halinde üreticiden toptan fiyatla.',
  },
  {
    slug: 'rulo-paketler',
    name: 'Rulo Paketler',
    title: 'Rulo Airpack Modelleri',
    seoTitle: 'Hava Kanallı Airpack Rulo Fiyatları',
    description:
      'İstenilen uzunlukta kesilebilen hava kanallı airpack rulolar: 42,5 cm’den 102 cm’e 8 rulo yüksekliği, metre fiyatıyla; en az 50 metre sipariş.',
  },
];

export interface Product {
  id: number;
  slug: string;
  name: string;
  /** cm — rulolarda rulo yüksekliği */
  width: number;
  /** cm — rulolarda 0 (uzunluk metreyle satılır) */
  height: number;
  /** Poşetler adetle, rulolar metreyle satılır. */
  unit: Unit;
  price: number;
  regularPrice: number;
  category: Category;
  image: ImageMetadata;
  /** src/assets/products/ içindeki dosya adı (paylaşım görseli üretimi için) */
  imageFile: string;
  imageAlt: string;
  gallery: ImageMetadata[];
  /** gallery ile aynı sırada alt metinler */
  galleryAlt: string[];
  /** Güvenilir kaynak (kendi mağaza verimiz) — HTML olarak basılır. */
  shortDescription: string;
  attributes: { name: string; value: string }[];
  tags: { slug: string; name: string }[];
}

export const products: Product[] = raw
  .map((p) => ({
    ...p,
    unit: (p.unit === 'metre' ? 'metre' : 'adet') as Unit,
    category: categories.find((c) => c.slug === p.category) ?? categories[0],
    image: image(p.image),
    imageFile: p.image,
    gallery: p.gallery.map(image),
    galleryAlt: p.gallery.map((g) => GALLERY_ALT[g] ?? `${p.name} – ürün görseli`),
  }))
  // Canlı mağazadaki sıralama: önce boy, sonra en. Rulolar poşetlerden sonra, yüksekliğe göre.
  .sort((a, b) => Number(a.unit === 'metre') - Number(b.unit === 'metre') || a.height - b.height || a.width - b.width || a.id - b.id);

export const productUrl = (p: Pick<Product, 'slug'>) => `/urun/${p.slug}/`;
export const categoryUrl = (c: Pick<Category, 'slug'>) => `/kategori/${c.slug}/`;
export const isOnSale = (p: Product) => p.price < p.regularPrice;
export const isRoll = (p: Pick<Product, 'unit'>) => p.unit === 'metre';
/** Listelerde ebat etiketi: "12×19 cm" ya da "42,5 cm rulo" */
export const sizeLabel = (p: Pick<Product, 'unit' | 'width' | 'height'>) =>
  isRoll(p) ? `${String(p.width).replace('.', ',')} cm rulo` : `${p.width}×${p.height} cm`;
/** Adetle satılan hazır poşetler (ölçü rehberi tablosu bunları listeler). */
export const bags = products.filter((p) => !isRoll(p));

/** Mağazada sayfa başına ürün (WordPress ile aynı). */
export const PAGE_SIZE = 16;
