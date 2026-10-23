import { normalizeQuantity, shippingFor, unitPrice, type Unit } from '../lib/pricing';

export interface CartItem {
  slug: string;
  name: string;
  basePrice: number;
  quantity: number;
  thumb?: string;
  /** Yoksa 'adet' (eski sepetlerle uyumlu). Rulolarda miktar metredir. */
  unit?: Unit;
}

export type CartProduct = Pick<CartItem, 'slug' | 'name' | 'basePrice' | 'thumb' | 'unit'>;

const KEY = 'airpack-cart-v1';
const EVENT = 'cart:change';

/** /catalog.json: { slug: { n: ad, p: fiyat, t: küçük görsel, u: 'metre' (yalnızca rulolarda) } } — gerektiğinde bir kez yüklenir. */
export type Catalog = Record<string, { n: string; p: number; t: string; u?: 'metre' }>;
let catalogPromise: Promise<Catalog> | null = null;
export const loadCatalog = () =>
  (catalogPromise ??= fetch('/catalog.json')
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => {
      catalogPromise = null;
      return {};
    }));

export const unitOf = (item: Pick<CartItem, 'unit'>): Unit => (item.unit === 'metre' ? 'metre' : 'adet');

const isItem = (x: unknown): x is CartItem => {
  const i = x as CartItem;
  return !!i && typeof i.slug === 'string' && typeof i.name === 'string' && Number.isFinite(i.basePrice) && Number(i.quantity) > 0;
};

const read = (): CartItem[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(data) ? data.filter(isItem).map((i) => ({ ...i, quantity: normalizeQuantity(i.quantity) })) : [];
  } catch {
    return [];
  }
};

let items: CartItem[] = read();

const emit = () => window.dispatchEvent(new CustomEvent(EVENT));

const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* gizli mod / depolama kapalı: sepet bu sayfa için bellekte kalır */
  }
  emit();
};

/** Sepetteki fiyat/ad/görselleri güncel katalogla eşitler; katalogdan kalkan ürünleri temizler. */
const reconcile = async () => {
  const catalog = await loadCatalog();
  if (!Object.keys(catalog).length) return;
  let changed = false;
  items = items.flatMap((i) => {
    const c = catalog[i.slug];
    if (!c) return (changed = true), [];
    const unit: Unit = c.u ?? 'adet';
    if (c.n === i.name && c.p === i.basePrice && c.t === i.thumb && unit === unitOf(i)) return [i];
    changed = true;
    return [{ ...i, name: c.n, basePrice: c.p, thumb: c.t, unit }];
  });
  if (changed) persist();
};

if (items.length) {
  const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
  idle(() => void reconcile());
}

window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    items = read();
    emit();
  }
});

export const lineUnitPrice = (item: CartItem) => unitPrice(item.basePrice, item.quantity, unitOf(item));
export const lineTotal = (item: CartItem) => lineUnitPrice(item) * item.quantity;

export const cart = {
  items: () => items,
  /** Poşetler adet olarak, her rulo satırı 1 ürün olarak sayılır. */
  count: () => items.reduce((n, i) => n + (unitOf(i) === 'metre' ? 1 : i.quantity), 0),
  totals() {
    const subtotal = items.reduce((sum, i) => sum + lineTotal(i), 0);
    const shipping = shippingFor(subtotal);
    return { subtotal, shipping, total: subtotal + shipping };
  },
  add(product: CartProduct, quantity: number) {
    const q = normalizeQuantity(quantity);
    const existing = items.find((i) => i.slug === product.slug);
    items = existing
      ? items.map((i) => (i.slug === product.slug ? { ...i, ...product, quantity: i.quantity + q } : i))
      : [...items, { ...product, quantity: q }];
    persist();
    return items.find((i) => i.slug === product.slug)!;
  },
  setQuantity(slug: string, quantity: number) {
    items = items.map((i) => (i.slug === slug ? { ...i, quantity: normalizeQuantity(quantity) } : i));
    persist();
  },
  remove(slug: string) {
    items = items.filter((i) => i.slug !== slug);
    persist();
  },
  clear() {
    items = [];
    persist();
  },
  onChange(cb: () => void) {
    window.addEventListener(EVENT, cb);
  },
};

export const openCart = () => window.dispatchEvent(new CustomEvent('cart:open'));

export const cloneTemplate = (id: string) => {
  const tpl = document.getElementById(id) as HTMLTemplateElement | null;
  return tpl ? (tpl.content.firstElementChild!.cloneNode(true) as HTMLElement) : null;
};
