# Airpack Ambalaj — airpackambalaj.com.tr

WordPress + WooCommerce + Elementor sitesinin [Astro](https://astro.build) ile yeniden yapılmış, statik ve SEO odaklı sürümü.
Tasarım canlı sitedeki ile aynıdır; sayfalar framework JS'i içermez, sepet/galeri gibi etkileşimler için ~8 KB script yüklenir.

## Komutlar

| Komut             | Açıklama                                |
| ----------------- | --------------------------------------- |
| `npm install`     | Bağımlılıkları kurar (Node 22.22+)      |
| `npm run dev`     | Geliştirme sunucusu: `localhost:4321`   |
| `npm run build`   | Üretim çıktısını `dist/` klasörüne alır |
| `npm run preview` | Üretim çıktısını yerelde önizler        |
| `npm run indexnow`| Yayından sonra tüm adresleri Bing/Yandex'e bildirir (IndexNow) |

## İçerik nerede?

| Ne                                               | Dosya                               |
| ------------------------------------------------ | ----------------------------------- |
| Telefon, WhatsApp, e-posta, adres, sosyal medya  | `src/data/site.ts`                  |
| Ürünler (ad, fiyat, açıklama, özellikler)        | `src/data/products.json`            |
| Ürün görselleri                                  | `src/assets/products/`              |
| Kategoriler, mağaza sayfa başına ürün sayısı     | `src/data/products.ts`              |
| Sıkça sorulan sorular                            | `src/data/faq.ts`                   |
| Min. adet (50), iskonto, kargo ücreti            | `src/lib/pricing.ts`                |
| Yasal sayfalardaki firma bilgileri (ünvan, adres, vergi, MERSİS) | `src/data/legal.ts` |
| Rehber sayfalarının başlık/açıklamaları          | `src/data/guides.ts` (metinler `src/pages/*.astro`) |
| Paylaşım (OG) görselleri                         | `src/lib/og.ts` — derlemede `/og/*.jpg` üretilir |

Ürün eklemek için `products.json` dosyasına yeni bir kayıt ekleyin ve görseli `src/assets/products/` klasörüne
kayıttaki `image` adıyla koyun. Görseller derlemede otomatik olarak boyutlandırılıp WebP'ye dönüştürülür.

## URL yapısı (WordPress ile aynı)

`/`, `/magaza/` (+ `/magaza/page/2/`…), `/urun/<ürün>/`, `/kategori/<kategori>/`, `/hakkimizda/`, `/bize-ulasin/`,
`/airpack-olcu-rehberi/`, `/sepet/`, `/odeme/`, `/siparis-ozeti/`. Mevcut Google sıralamaları için adresler değiştirilmedi.
Eski WordPress adresleri (`/wp-content/`, `/feed/`, `/etiket/`, `/hesabim/`, Rank Math sitemap'leri vb.) `.htaccess` ile 410 (kalıcı olarak kaldırıldı) döner. Search Console'a `/sitemap-index.xml` gönderilir.

## Sipariş akışı

Sepet tarayıcıda (`localStorage`) tutulur. Ödeme sayfasında form gönderildiğinde sipariş özeti `site.ts` içindeki
WhatsApp numarasına hazır mesaj olarak iletilir ve müşteri `/siparis-ozeti/` sayfasına yönlendirilir. Ödeme havale/EFT
ile alınır (IBAN WhatsApp'tan iletilir). Sunucu veya veritabanı gerekmez.

## Yayına alma (GitHub Actions)

`main` dalına her push'ta `.github/workflows/deploy.yml` siteyi derler ve `dist/` içeriğini SFTP (port 22, SSH anahtarıyla)
sunucudaki `public_html` klasörüne yükler. Sunucuda `dist/`'te olmayan dosyalar silinir; `.well-known`, `cgi-bin`,
`error_log`, `php.ini` ve `google*.html` korunur. Elle çalıştırmak için GitHub > Actions > "Deploy site" > Run workflow.

İlk yükleme: `public_html`'de WordPress (`wp-config.php`) varken hiçbir şey silinmez; iş yalnızca silinecek ve yüklenecek
dosyaları listeleyip durur. WordPress'in tam yedeği (dosyalar + veritabanı) alındıktan sonra Run workflow'da
`replace_wordpress` kutusu işaretlenerek bir kez çalıştırılır. Veritabanı silinmez; gerekirse cPanel'den elle kaldırılır.

GitHub > Settings > Secrets and variables > Actions altında tanımlı olması gerekenler (Male Kale ve Toptan Yöresel ile aynı adlar):

| Secret            | Değer                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| `FTP_SERVER`      | `ftp.airpackambalaj.com.tr`                                            |
| `FTP_USERNAME`    | cPanel kullanıcı adı                                                   |
| `SSH_PRIVATE_KEY` | `airpack_yayin` anahtarının gizli kısmı (cPanel > SSH Access'te yetkilendirilmiş) |

`public/.htaccess` (LiteSpeed/Apache) şunları yapar: HTTP → HTTPS ve www → www'siz yönlendirme, eski WordPress adresleri
için 410, `/404.html` hata sayfası, sıkıştırma, güvenlik başlıkları ve `/_astro/` altındaki hash'li dosyalar için 1 yıllık
tarayıcı önbelleği.

## IndexNow

`public/<anahtar>.txt` dosyası IndexNow anahtarıdır; `dist/` ile birlikte yüklenmelidir. Site yayındayken `npm run indexnow` komutu `dist/sitemap-0.xml` içindeki tüm adresleri Bing, Yandex ve diğer IndexNow arama motorlarına bildirir (Google IndexNow kullanmaz; Google sitemap'i `robots.txt` üzerinden bulur). İçerik değiştiğinde yeniden derleyip yükledikten sonra tekrar çalıştırılabilir.
