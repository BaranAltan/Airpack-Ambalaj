// Rehber / bilgi sayfalarının kaydı: başlıklar, açıklamalar, özetler ve birbirine bağlantılar.
// Ana rehber (pillar) /hava-kanalli-ambalaj/; diğerleri ürüne göre paketleme sayfalarıdır.

export interface Guide {
  path: string;
  /** Sayfa H1 */
  title: string;
  /** <title> (60 karakter sınırı için kısa) */
  seoTitle: string;
  /** Menü, kart ve breadcrumb’da görünen kısa ad */
  menu: string;
  description: string;
  lead: string;
  /** İlgili rehber kartındaki tek cümlelik özet */
  summary: string;
  badge?: string;
  /** Kartta gösterilecek ilgili rehberler (yoksa tümü) */
  related?: string[];
  published: string;
  modified?: string;
}

const PUBLISHED = '2026-10-17';

export const PILLAR: Guide = {
  path: '/hava-kanalli-ambalaj/',
  title: 'Hava Kanallı Ambalaj (Airpack) Nedir?',
  seoTitle: 'Hava Kanallı Ambalaj (Airpack) Nedir?',
  menu: 'Ambalaj Rehberi',
  description:
    'Hava kanallı ambalaj (airpack) nedir, nasıl çalışır, balonlu naylondan farkı nedir? Hazır poşet ve rulo seçimi, ebat ve kullanım rehberi.',
  lead: 'Nasıl çalışır, ne işe yarar, hangi ürün için hangisi seçilir?',
  summary: 'Hava kanallı ambalajın çalışma prensibi, türleri ve seçim rehberi.',
  published: PUBLISHED,
};

export const GUIDES: Guide[] = [
  {
    path: '/sise-kargo-ambalaji/',
    title: 'Şişe Kargo Ambalajı: Cam Şişeler Kırılmadan Nasıl Gönderilir?',
    seoTitle: 'Şişe Kargo Ambalajı ve Paketleme',
    menu: 'Şişe Kargo Ambalajı',
    description:
      'Cam şişeleri kargoda kırılmadan göndermek için adım adım paketleme rehberi: doğru airpack ebadı, kapak sızdırmazlığı, koli seçimi ve sık yapılan hatalar.',
    lead: 'Cam şişeleri kargoda güvenle göndermek için adım adım paketleme rehberi',
    summary: 'Cam şişeleri kırılmadan göndermek için paketleme adımları.',
    badge: 'Ürüne Göre Paketleme',
    related: ['/zeytinyagi-sisesi-kargo-ambalaji/', '/kavanoz-kargo-poseti/', '/parfum-kargo-ambalaji/', '/airpack-nasil-sisirilir/'],
    published: PUBLISHED,
  },
  {
    path: '/zeytinyagi-sisesi-kargo-ambalaji/',
    title: 'Zeytinyağı Şişesi Kargo Ambalajı',
    seoTitle: 'Zeytinyağı Şişesi Kargo Ambalajı',
    menu: 'Zeytinyağı Şişesi Ambalajı',
    description:
      'Zeytinyağı şişelerini kargoda kırılma ve sızıntı olmadan göndermek için airpack paketleme rehberi: kapak kontrolü, ebat seçimi, çoklu şişe gönderimi.',
    lead: 'Cam ve teneke zeytinyağı ambalajlarını kırılma ve sızıntıya karşı korumak',
    summary: 'Zeytinyağı şişelerini kırılma ve sızıntıya karşı paketleme.',
    badge: 'Ürüne Göre Paketleme',
    related: ['/sise-kargo-ambalaji/', '/bal-kavanozu-kargo-ambalaji/', '/kavanoz-kargo-poseti/', '/airpack-nasil-sisirilir/'],
    published: PUBLISHED,
  },
  {
    path: '/kavanoz-kargo-poseti/',
    title: 'Kavanoz Kargo Poşeti: Cam Kavanozları Güvenle Gönderin',
    seoTitle: 'Kavanoz Kargo Poşeti: Şişme Koruyucu Poşet',
    menu: 'Kavanoz Kargo Poşeti',
    description:
      'Reçel, turşu, sos ve bal kavanozlarını kargoda korumak için şişme kargo poşeti rehberi: kapak sızdırmazlığı, ebat seçimi ve koliye yerleştirme.',
    lead: 'Reçel, sos, turşu ve bal kavanozları için şişme kargo poşeti',
    summary: 'Cam kavanozlar için şişme kargo poşeti seçimi ve kullanımı.',
    badge: 'Ürüne Göre Paketleme',
    related: ['/bal-kavanozu-kargo-ambalaji/', '/zeytinyagi-sisesi-kargo-ambalaji/', '/sise-kargo-ambalaji/', '/airpack-nasil-sisirilir/'],
    published: PUBLISHED,
  },
  {
    path: '/bal-kavanozu-kargo-ambalaji/',
    title: 'Bal Kavanozu Kargo Ambalajı',
    seoTitle: 'Bal Kavanozu Kargo Ambalajı ve Paketleme',
    menu: 'Bal Kavanozu Ambalajı',
    description:
      'Bal, pekmez ve reçel kavanozlarını kargoda kırılma ve sızıntıya karşı korumak için paketleme rehberi: ağır kavanozlar, kapak kontrolü, çoklu gönderim.',
    lead: 'Ağır ve yapışkan içerikli kavanozları kırılma ve sızıntıya karşı korumak',
    summary: 'Bal ve pekmez kavanozlarında kırılma ve sızıntı önlemleri.',
    badge: 'Ürüne Göre Paketleme',
    related: ['/kavanoz-kargo-poseti/', '/zeytinyagi-sisesi-kargo-ambalaji/', '/sise-kargo-ambalaji/', '/airpack-nasil-sisirilir/'],
    published: PUBLISHED,
  },
  {
    path: '/parfum-kargo-ambalaji/',
    title: 'Parfüm ve Kozmetik Kargo Ambalajı',
    seoTitle: 'Parfüm ve Kozmetik Kargo Ambalajı',
    menu: 'Parfüm ve Kozmetik Ambalajı',
    description:
      'Parfüm, cilt bakım ve cam kozmetik şişelerini kargoda korumak için hava kanallı ambalaj rehberi: kutulu ürünler, küçük ebatlar, sunum.',
    lead: 'Küçük ve değerli cam şişeleri hem korumak hem şık göndermek',
    summary: 'Parfüm ve kozmetik şişelerini kutuyla veya kutusuz korumak.',
    badge: 'Ürüne Göre Paketleme',
    related: ['/sise-kargo-ambalaji/', '/elektronik-kargo-ambalaji/', '/ozel-uretim-logolu-airpack/', '/airpack-nasil-sisirilir/'],
    published: PUBLISHED,
  },
  {
    path: '/elektronik-kargo-ambalaji/',
    title: 'Elektronik Ürün Kargo Ambalajı',
    seoTitle: 'Elektronik Ürün Kargo Ambalajı',
    menu: 'Elektronik Ürün Ambalajı',
    description:
      'Telefon, tablet, kulaklık ve küçük elektronik cihazları kargoda darbeye karşı korumak için hava kanallı ambalaj ve rulo kullanım rehberi.',
    lead: 'Ekranlı ve hassas cihazları darbe ve titreşime karşı korumak',
    summary: 'Ekranlı ve hassas cihazlar için darbe koruması.',
    badge: 'Ürüne Göre Paketleme',
    related: ['/parfum-kargo-ambalaji/', '/hava-kanalli-ambalaj/', '/airpack-nasil-sisirilir/', '/ozel-uretim-logolu-airpack/'],
    published: PUBLISHED,
  },
  {
    path: '/airpack-nasil-sisirilir/',
    title: 'Airpack Nasıl Şişirilir? Adım Adım Kullanım',
    seoTitle: 'Airpack Nasıl Şişirilir? Adım Adım',
    menu: 'Airpack Nasıl Şişirilir?',
    description:
      'Hava kanallı airpack poşet ve rulolar nasıl şişirilir? El pompası ve kompresörle adım adım kullanım, doğru şişirme seviyesi ve sık yapılan hatalar.',
    lead: 'El pompası veya kompresörle doğru şişirme, adım adım',
    summary: 'Pompa veya kompresörle doğru şişirme adımları.',
    badge: 'Kullanım Rehberi',
    related: ['/hava-kanalli-ambalaj/', '/sise-kargo-ambalaji/', '/kavanoz-kargo-poseti/', '/elektronik-kargo-ambalaji/'],
    published: PUBLISHED,
  },
  {
    path: '/ozel-uretim-logolu-airpack/',
    title: 'Özel Üretim ve Logolu Airpack',
    seoTitle: 'Özel Üretim ve Logolu Airpack Ambalaj',
    menu: 'Özel Üretim ve Logolu Airpack',
    description:
      'Ürününüze özel ölçüde, kalıpta veya logo baskılı hava kanallı ambalaj üretimi: hangi durumda gerekir, teklif için hangi bilgiler gerekli, süreç nasıl işler?',
    lead: 'Ürününüze özel ölçü, kalıp ve logo baskılı hava kanallı ambalaj',
    summary: 'Özel ölçü, kalıp ve logo baskılı üretim süreci.',
    badge: 'Kurumsal Çözümler',
    related: ['/hava-kanalli-ambalaj/', '/parfum-kargo-ambalaji/', '/zeytinyagi-sisesi-kargo-ambalaji/', '/elektronik-kargo-ambalaji/'],
    published: PUBLISHED,
  },
];

export const ALL_GUIDES = [PILLAR, ...GUIDES];
