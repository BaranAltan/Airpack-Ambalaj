import { SITE } from './site';

// Yasal sayfalarda (Mesafeli Satış, KVKK, İade, Kargo) kullanılan firma bilgileri.
// Boş bırakılan alanlar sayfada gösterilmez ve derleme sırasında uyarı verilir: yayından önce doldurun.
export const LEGAL = {
  /** Ticari ünvan, ör. "Airpack Ambalaj San. ve Tic. Ltd. Şti." */
  companyTitle: '',
  /** Açık adres (mahalle, cadde/sokak, no, posta kodu, ilçe/il) */
  address: '',
  taxOffice: '',
  taxNumber: '',
  mersis: '',
  /** Kayıtlı elektronik posta (KEP) adresi, varsa */
  kep: '',
  /** Cayma hakkı süresi (gün) — yasal asgari süre 14 gündür. */
  withdrawalDays: 14,
  /** Metinlerin son güncellenme tarihi (YYYY-AA-GG); sitemap lastmod da buradan gelir */
  updated: '2026-10-17',
};

/** Yasal sayfaların adresleri (sitemap tarihleri için) */
export const LEGAL_PATHS = ['/mesafeli-satis-sozlesmesi/', '/iade-ve-cayma/', '/kargo-ve-teslimat/', '/kvkk-aydinlatma-metni/'];

export const sellerName = LEGAL.companyTitle || SITE.name;
export const sellerAddress = LEGAL.address || `${SITE.address.district} / ${SITE.address.city}`;

const labels: Record<string, string> = {
  companyTitle: 'ticari ünvan',
  address: 'açık adres',
  taxOffice: 'vergi dairesi',
  taxNumber: 'vergi numarası',
  mersis: 'MERSİS numarası',
};
export const missingLegalFields = Object.entries(labels)
  .filter(([key]) => !LEGAL[key as keyof typeof LEGAL])
  .map(([, label]) => label);
