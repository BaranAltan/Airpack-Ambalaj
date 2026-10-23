import { BULK_MIN_QTY, UNIT_LABEL, formatNumber, formatQuantity, formatTRY, hasBulkDiscount, stepQuantity } from '../lib/pricing';
import { cart, cloneTemplate, lineTotal, lineUnitPrice, unitOf, type CartItem } from './cart';

const setText = (root: Element, selector: string, text: string) =>
  root.querySelectorAll(selector).forEach((el) => (el.textContent = text));

const fillLine = (el: HTMLElement, item: CartItem) => {
  const unit = unitOf(item);
  const bulk = hasBulkDiscount(item.quantity, unit);
  el.dataset.slug = item.slug;
  setText(el, '[data-name]', item.name);
  el.querySelectorAll<HTMLAnchorElement>('[data-link]').forEach((a) => (a.href = `/urun/${item.slug}/`));
  el.querySelectorAll<HTMLImageElement>('[data-thumb]').forEach((img) => {
    if (item.thumb && img.getAttribute('src') !== item.thumb) img.src = item.thumb;
    img.alt = item.name;
  });
  setText(el, '[data-unit]', `(${formatTRY(lineUnitPrice(item))}/${UNIT_LABEL[unit].short})`);
  setText(el, '[data-total]', formatTRY(lineTotal(item)));
  // 1.000+ iskontosu yalnızca adetle satılan poşetlerde; rulo satırlarında iki etiket de gizlenir.
  el.querySelectorAll<HTMLElement>('[data-bulk-yes]').forEach((t) => (t.hidden = !bulk));
  el.querySelectorAll<HTMLElement>('[data-bulk-no]').forEach((t) => (t.hidden = bulk || unit === 'metre'));
  el.querySelectorAll<HTMLElement>('[data-bulk-box]').forEach((t) => (t.hidden = unit === 'metre'));

  const input = el.querySelector<HTMLInputElement>('[data-qty]');
  if (input && document.activeElement !== input) input.value = String(item.quantity);
  setText(el, '[data-qty-text]', unit === 'metre' ? formatQuantity(item.quantity, unit) : formatNumber(item.quantity));
  input?.setAttribute('aria-label', `${item.name} ${unit === 'metre' ? 'metresi' : 'adedi'}`);
  el.querySelector('[data-action="remove"]')?.setAttribute('aria-label', `${item.name} ürününü sepetten çıkar`);
};

/** Sepet satırlarını mevcut öğeleri koruyarak günceller (odak kaybolmaz). */
export const renderLines = (list: HTMLElement, templateId: string) => {
  const existing = new Map<string, HTMLElement>();
  list.querySelectorAll<HTMLElement>(':scope > [data-slug]').forEach((el) => existing.set(el.dataset.slug!, el));

  cart.items().forEach((item, index) => {
    const el = existing.get(item.slug) ?? cloneTemplate(templateId);
    if (!el) return;
    existing.delete(item.slug);
    fillLine(el, item);
    if (list.children[index] !== el) list.insertBefore(el, list.children[index] ?? null);
  });

  existing.forEach((el) => el.remove());
};

export const bindLineEvents = (list: HTMLElement) => {
  const itemOf = (el: Element) => {
    const slug = el.closest<HTMLElement>('[data-slug]')?.dataset.slug;
    return cart.items().find((i) => i.slug === slug);
  };

  list.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('[data-action]');
    if (!btn) return;
    const item = itemOf(btn);
    if (!item) return;
    switch (btn.dataset.action) {
      case 'inc':
        cart.setQuantity(item.slug, stepQuantity(item.quantity, 1));
        break;
      case 'dec':
        cart.setQuantity(item.slug, stepQuantity(item.quantity, -1));
        break;
      case 'bulk':
        if (unitOf(item) === 'adet') cart.setQuantity(item.slug, BULK_MIN_QTY);
        break;
      case 'remove':
        cart.remove(item.slug);
        break;
    }
  });

  list.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (!input.matches('[data-qty]')) return;
    const item = itemOf(input);
    if (item) cart.setQuantity(item.slug, parseInt(input.value, 10));
  });
};
