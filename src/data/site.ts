// Firma bilgileri — tüm sayfalar, footer ve yapılandırılmış veri (JSON-LD) buradan beslenir.

export const SITE = {
  name: 'Airpack Ambalaj',
  description:
    'Toptan airpack ambalaj ve hava kanallı koruyucu poşet üreticisi. Şişe, kavanoz, kozmetik ve elektronik ürünler için 90 mikron airpack poşetler, üreticiden direkt fiyat.',

  phone: '+90 534 088 39 48',
  phoneHref: 'tel:+905340883948',
  /** wa.me formatında, başında + olmadan */
  whatsapp: '905340883948',
  email: 'info@airpackambalaj.com.tr',

  address: {
    district: 'Ümraniye',
    city: 'İstanbul',
    country: 'TR',
  },

  /** Boş bırakılan hesaplar sitede gösterilmez. */
  social: {
    instagram: '',
    linkedin: '',
  },

  /** Havale/EFT bilgisi sipariş sonrası WhatsApp üzerinden iletilir. */
  paymentNote:
    'Siparişinizi onayladıktan sonra size verilecek olan IBAN numarasına ödemeyi gerçekleştirmeniz gerekmektedir. Ödeme onayından sonra siparişiniz kargoya verilir.',

  gtmId: 'GTM-538NLBKB',
} as const;

export const NAV = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/magaza/', label: 'Ürünler' },
  { href: '/hakkimizda/', label: 'Hakkımızda' },
  { href: '/bize-ulasin/', label: 'İletişim' },
] as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
