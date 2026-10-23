// Fiyatlandırma ve sipariş kuralları — hem sunucuda (statik HTML) hem tarayıcıda (sepet) kullanılır.

/** Satış birimi: poşetler adetle, rulolar metreyle satılır. */
export type Unit = 'adet' | 'metre';
export const UNIT_LABEL: Record<Unit, { short: string; long: string }> = {
  adet: { short: 'ad.', long: 'Adet' },
  metre: { short: 'm', long: 'Metre' },
};

/** Minimum sipariş miktarı ve artış miktarı: poşetlerde 50'li paket, rulolarda 50 metre. */
export const MIN_QTY = 50;
export const QTY_STEP = 50;

export const BULK_MIN_QTY = 1000;
/** 1.000+ adette birim başına indirim (TL) — yalnızca adetle satılan poşetlerde. */
export const BULK_DISCOUNT = 0.2;

export const SHIPPING_FEE = 200;
/** Bu tutarın üzerindeki siparişlerde kargo ücretsiz. Ücretsiz kargo yoksa null. */
export const FREE_SHIPPING_MIN: number | null = null;

const round2 = (n: number) => Math.round(n * 100) / 100;

export const hasBulkDiscount = (quantity: number, unit: Unit = 'adet') => unit === 'adet' && quantity >= BULK_MIN_QTY;

export const unitPrice = (basePrice: number, quantity: number, unit: Unit = 'adet') =>
  hasBulkDiscount(quantity, unit) ? Math.max(0, round2(basePrice - BULK_DISCOUNT)) : basePrice;

export const shippingFor = (subtotal: number) =>
  subtotal <= 0 || (FREE_SHIPPING_MIN !== null && subtotal >= FREE_SHIPPING_MIN) ? 0 : SHIPPING_FEE;

/** Miktarı en yakın geçerli değere (50'nin katı, en az 50) yuvarlar. */
export const normalizeQuantity = (quantity: number) =>
  Math.max(MIN_QTY, Math.round((Number(quantity) || MIN_QTY) / QTY_STEP) * QTY_STEP);

export const stepQuantity = (quantity: number, direction: 1 | -1) => normalizeQuantity(quantity + QTY_STEP * direction);

const tryFormatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });
export const formatTRY = (amount: number) => tryFormatter.format(amount);

export const formatNumber = (n: number) => n.toLocaleString('tr-TR');

/** "50 adet" / "50 m" */
export const formatQuantity = (quantity: number, unit: Unit = 'adet') =>
  `${formatNumber(quantity)} ${unit === 'metre' ? 'm' : 'adet'}`;
