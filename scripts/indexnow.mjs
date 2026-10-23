// Sitemap'teki tüm adresleri IndexNow'a bildirir (Bing, Yandex, Seznam, Naver; Google desteklemez).
// Kullanım: site yayına alındıktan sonra proje kökünde `npm run indexnow`
// Ön koşul: public/<anahtar>.txt dosyası yayında olmalı (https://airpackambalaj.com.tr/<anahtar>.txt).

import { readFileSync, readdirSync } from 'node:fs';

const HOST = 'airpackambalaj.com.tr';

const keyFile = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('public/ içinde IndexNow anahtar dosyası (<32 haneli anahtar>.txt) bulunamadı.');
const key = keyFile.replace('.txt', '');

const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('dist/sitemap-0.xml boş ya da yok: önce `npm run build` çalıştırın.');

// Anahtar dosyası yayında değilse IndexNow isteği reddeder; önce kontrol edelim.
const keyUrl = `https://${HOST}/${keyFile}`;
const check = await fetch(keyUrl);
if (!check.ok || (await check.text()).trim() !== key) {
  throw new Error(`${keyUrl} erişilemiyor ya da içeriği anahtarla aynı değil. Site yayında mı?`);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: keyUrl, urlList }),
});

// 200 ve 202: kabul edildi. 403: anahtar geçersiz, 422: adresler bu alan adına ait değil, 429: çok sık istek.
console.log(`${urlList.length} adres gönderildi: HTTP ${res.status} ${res.statusText}`);
if (!res.ok) process.exitCode = 1;
