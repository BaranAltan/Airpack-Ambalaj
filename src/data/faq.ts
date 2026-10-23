import { BULK_DISCOUNT, BULK_MIN_QTY, MIN_QTY, QTY_STEP, SHIPPING_FEE, formatNumber, formatTRY } from '../lib/pricing';
import { LEGAL } from './legal';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Ana sayfada gösterilen sorular (canlı sitedeki ilk 4 soru). */
export const faq: FaqItem[] = [
  {
    question: 'Hava kanallı ambalaj (Airbag/Airpack) nedir?',
    answer:
      'Hava kanallı ambalajlar, bağımsız hava odacıklarından oluşan, ürünlerin kargoda veya taşınmada dış darbelere karşı zırh gibi korunmasını sağlayan yeni nesil paketleme sistemidir. Şişirildiğinde ürünün şeklini alır ve maksimum güvenlik sağlar.',
  },
  {
    question: 'Nasıl şişirilir ve kompresör gerekir mi?',
    answer:
      'Özel el pompalarıyla 10-15 saniye içinde kolayca şişirilebilir. Yüksek tonajlı günlük kullanım için küçük çaplı standart hava kompresörleriyle entegre edilen otomatik şişirme makinelerimiz de mevcuttur.',
  },
  {
    question: 'Bir kanal patlarsa diğerleri söner mi?',
    answer:
      'Kesinlikle hayır! Her bir hava kanalı patentli ters valf sistemiyle birbirinden bağımsız çalışır. Çok zorlu bir darbede bir kanal delinse dahi, diğer kanallar şişkinliğini korur ve ürün güvende kalır.',
  },
  {
    question: 'Özel kalıp veya logo baskısı yapabiliyor musunuz?',
    answer:
      'Evet, biz doğrudan üreticiyiz. Ürününüzün gramajına ve boyutlarına göre özel ar-ge çalışması yaparak tam oturan kalıplar üretiyoruz. Ayrıca firmanızın kurumsal kimliğine uygun renkli/logolu baskı seçeneklerimiz bulunmaktadır.',
  },
];

/** Sipariş, ödeme, kargo ve ölçü seçimiyle ilgili ek sorular (SSS sayfası). */
export const orderFaq: FaqItem[] = [
  {
    question: 'Minimum sipariş miktarı nedir?',
    answer: `Hazır airpack poşetler ${MIN_QTY}’li paketler halinde satılır; en az ${MIN_QTY} adet, ${QTY_STEP}’nin katları halinde sipariş verebilirsiniz. Hava kanallı rulolar metreyle satılır; en az ${MIN_QTY} metre, ${QTY_STEP} metrenin katları halinde sipariş verilir. Sepetteki miktar bu kurala göre otomatik ayarlanır.`,
  },
  {
    question: 'Toplu alımlarda indirim var mı?',
    answer: `Evet. Hazır poşetlerde ${formatNumber(BULK_MIN_QTY)} adet ve üzeri siparişlerde birim fiyattan ${formatTRY(BULK_DISCOUNT)} iskonto sepette otomatik uygulanır. Düzenli ve yüksek adetli alımlar ya da özel üretim için WhatsApp üzerinden teklif isteyebilirsiniz.`,
  },
  {
    question: 'Sipariş nasıl verilir? Üye olmam gerekiyor mu?',
    answer:
      'Üyelik gerekmez. Ürünü seçip adet veya metreyi belirleyerek sepete ekleyin, ödeme sayfasında iletişim ve teslimat bilgilerinizi doldurun. “Siparişi Onayla” dediğinizde sipariş özetiniz WhatsApp’a hazır mesaj olarak gelir; mesajı göndermeniz yeterlidir.',
  },
  {
    question: 'Ödemeyi nasıl yapabilirim?',
    answer:
      'Ödemeler havale/EFT ile alınır. Sipariş mesajınız bize ulaştığında size banka hesap (IBAN) bilgisi gönderilir. Ödemeniz hesabımıza geçtiğinde siparişiniz onaylanır ve hazırlanmaya başlar.',
  },
  {
    question: 'Kargo ücreti ne kadar, nereye gönderim yapıyorsunuz?',
    answer: `Siparişler Türkiye’nin tüm illerine anlaşmalı kargo firmasıyla gönderilir. Kargo ücreti sipariş başına ${formatTRY(SHIPPING_FEE)}’dir ve ödeme sayfasındaki sipariş özetinde gösterilir. Kargo takip numarası WhatsApp üzerinden iletilir.`,
  },
  {
    question: 'Faturalı satış yapıyor musunuz?',
    answer:
      'Evet. Kurumsal siparişlerde ödeme sayfasında firma adı, vergi dairesi ve vergi numaranızı girmeniz yeterlidir; faturanız bu bilgilerle düzenlenir.',
  },
  {
    question: 'Ürünüme hangi ebat uygun?',
    answer:
      'Ürününüzün enini, boyunu ve kalınlığını ölçün. Hava kanalları şişirildiğinde poşetin iç hacmi daraldığı için ürününüzden bir miktar büyük bir ebat seçmeniz gerekir. Tüm ebatları Airpack Ölçü Rehberi’nde görebilirsiniz; ürün ölçünüzü veya fotoğrafını WhatsApp’tan gönderirseniz uygun ebadı birlikte belirleriz.',
  },
  {
    question: 'Hazır poşet ile hava kanallı rulo arasındaki fark nedir?',
    answer:
      'Hazır airpack poşetler belirli ebatlarda üretilir; ürün poşetin içine yerleştirilip şişirilir ve paketleme çok hızlı olur. Hava kanallı rulolar ise istediğiniz uzunlukta kesilip ürünün etrafına sarılır veya koli içindeki boşlukları doldurmak için kullanılır; farklı boyutlarda çok çeşitli ürün gönderen işletmeler için uygundur.',
  },
  {
    question: 'Rulolar nasıl satılıyor, hangi yüksekliği seçmeliyim?',
    answer: `Rulolar 42,5 cm’den 102 cm’e kadar 8 farklı yükseklikte, metre fiyatıyla satılır; en az ${MIN_QTY} metre sipariş verilir. Yükseklik, ürününüzü saracağınız yüzeyin genişliğine göre seçilir: geniş ve büyük ürünler için yüksek rulolar daha uygundur. Kararsızsanız ürün ölçünüzü WhatsApp’tan gönderin.`,
  },
  {
    question: 'Poşetler şişirilmiş olarak mı gönderiliyor?',
    answer:
      'Hayır. Poşetler ve rulolar sönük (düz) halde gönderilir, bu yüzden deponuzda çok az yer kaplar. Kullanacağınız zaman pompa veya kompresörle saniyeler içinde şişirilir.',
  },
  {
    question: 'Ücretsiz numune alabilir miyim?',
    answer:
      'Evet, numune gönderimi ücretsizdir. WhatsApp üzerinden göndereceğiniz ürünü ve aylık gönderim hacminizi paylaşın; size uygun ebatları birlikte belirleyip numunenizi gönderelim.',
  },
  {
    question: 'İade ve değişim yapabilir miyim?',
    answer: `Ürünü teslim aldığınız tarihten itibaren ${LEGAL.withdrawalDays} gün içinde cayma hakkınızı kullanabilirsiniz. Özel ölçü, kalıp veya logo/baskı ile hazırlanan ürünlerde cayma hakkı bulunmaz. Hasarlı veya hatalı gelen ürünleri fotoğrafla bildirmeniz yeterlidir; ayrıntılar İade ve Cayma Hakkı sayfasındadır.`,
  },
];

export const allFaq = [...faq, ...orderFaq];

export const faqPageLd = (items: FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
});
