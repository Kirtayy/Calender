# Takvim Uygulaması - Görev Listesi

## 1. Sayfa iskeleti (index.html)
- [x] Başlık alanı: ay/yıl gösterimi + önceki/sonraki ay butonları + "Bugün" butonu
- [x] Dil seçici (TR/EN/DE)
- [x] 7 sütunlu takvim grid'i (hafta günleri başlığı + gün hücreleri konteyneri)
- [x] Gün/etkinlik modalı (gizli, JS ile açılır): etkinlik listesi + ekleme/düzenleme formu
- [x] style.css ve script.js dosyalarına bağlantı

**Kabul kriterleri:**
- Sayfa tarayıcıda hatasız açılıyor
- Modal başlangıçta görünmüyor
- Tüm elemanlar semantik HTML ile ve erişilebilir (label/button) şekilde kurulu

## 2. Stil (style.css)
- [x] CSS Grid tabanlı takvim düzeni (7 sütun)
- [x] Sade, nötr renk paleti + tek accent renk
- [x] Etkinliği olan günler için görsel işaretçi stili
- [x] Modal/overlay stili
- [x] Responsive breakpoint'ler (mobil/tablet/masaüstü)

**Kabul kriterleri:**
- Masaüstünde (>1024px), tablette (~768px) ve mobilde (~375px) düzen bozulmuyor
- Modal küçük ekranlarda tam genişlikte, kullanılabilir şekilde görünüyor
- Bugünün hücresi ve etkinlikli günler görsel olarak ayırt edilebiliyor

## 3. Takvim mantığı (script.js - render)
- [x] Ay/yıl state'i ve `renderCalendar(year, month)` fonksiyonu
- [x] Önceki/sonraki ayın gölge günlerinin gösterimi
- [x] Önceki ay / sonraki ay / bugün buton işlevleri
- [x] Bugünün hücresinin vurgulanması

**Kabul kriterleri:**
- Ay değiştirme butonları doğru ayı gösteriyor, yıl sınırlarında (Aralık->Ocak vb.) doğru geçiş yapıyor
- "Bugün" butonu her zaman içinde bulunulan aya ve güne dönüyor
- Takvim ayın gün sayısına göre doğru sayıda hücre üretiyor (28-31 gün + gölge günler)

## 4. Etkinlik CRUD ve localStorage
- [x] `loadEvents()` / `saveEvents(events)` ile localStorage okuma/yazma (anahtar: `calendarEvents`, JSON format)
- [x] Güne tıklayınca modalın açılıp o günün etkinliklerini listelemesi
- [x] Etkinlik ekleme (başlık zorunlu, saat/açıklama opsiyonel)
- [x] Etkinlik düzenleme (formun mevcut veriyle doldurulması, kaydetme)
- [x] Etkinlik silme
- [x] Etkinliği olan günlerde takvim üzerinde işaretçi gösterimi

**Kabul kriterleri:**
- Eklenen etkinlik sayfa yenilendikten sonra hâlâ localStorage'dan geliyor
- Aynı güne birden fazla etkinlik eklenebiliyor ve hepsi listeleniyor
- Düzenleme mevcut etkinliği değiştiriyor, yeni kayıt oluşturmuyor
- Silme işlemi sadece ilgili etkinliği kaldırıyor, günün diğer etkinliklerini etkilemiyor
- Başlık boşken form gönderilemiyor (basit doğrulama)

## 5. Çoklu dil desteği (i18n)
- [x] `translations` objesi (tr/en/de): ay adları, gün adları, buton/etiket metinleri
- [x] `t(key)` yardımcı fonksiyonu ve tüm arayüz metinlerinin bu fonksiyon üzerinden çizilmesi
- [x] Dil seçiciye tıklayınca `applyLanguage(lang)` ile arayüzün yeniden çizilmesi
- [x] Seçili dilin `calendarLang` anahtarıyla localStorage'da saklanması ve sayfa açılışında geri yüklenmesi

**Kabul kriterleri:**
- TR/EN/DE arasında geçiş yapıldığında ay adları, gün adları, buton etiketleri ve modal metinleri doğru dile çevriliyor
- Sayfa yenilendiğinde en son seçilen dil korunuyor
- Dil değişimi mevcut etkinlik verilerini etkilemiyor (kullanıcı verisi çevrilmiyor)

## 6. Uçtan uca doğrulama
- [x] Ay geçişleri, "Bugün" butonu manuel test edildi
- [x] Etkinlik ekleme/düzenleme/silme + localStorage kalıcılığı manuel test edildi
- [x] Responsive görünüm (masaüstü/mobil) manuel test edildi
- [x] Dil seçici üç dilde de manuel test edildi

**Kabul kriterleri:**
- Yukarıdaki tüm senaryolar tarayıcıda hatasız çalışıyor

---

## Review

Oluşturulan dosyalar: `index.html`, `style.css`, `script.js` (framework/build aracı yok, düz vanilla HTML/CSS/JS).

- Aylık görünümlü, ay geçişi (önceki/sonraki/bugün) yapılabilen bir takvim grid'i eklendi.
- Bir güne tıklayınca açılan modal üzerinden etkinlik ekleme, düzenleme ve silme işlevleri eklendi.
- Etkinlikler `localStorage`'da `calendarEvents` anahtarı altında `{ "YYYY-MM-DD": [ {id, title, time, description}, ... ] }` formatında JSON olarak saklanıyor.
- Etkinliği olan günlerde takvimde küçük bir işaretçi (nokta) gösteriliyor.
- TR/EN/DE arasında değiştirilebilen dil seçici eklendi; seçim `calendarLang` anahtarıyla localStorage'da saklanıp sayfa açılışında geri yükleniyor.
- Sade, tek accent renkli, mobil uyumlu (responsive) bir arayüz kullanıldı.
- Playwright ile uçtan uca doğrulama yapıldı: ay geçişleri, etkinlik ekleme/düzenleme/silme + localStorage kalıcılığı, TR/EN/DE dil geçişleri ve sayfa yenileme sonrası kalıcılık, masaüstü ve mobil (375px) genişlikte responsive görünüm — hepsi ekran görüntüleriyle doğrulandı, konsolda hata görülmedi.
