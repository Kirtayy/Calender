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

## 4. Etkinlik CRUD ve localStorage (Not: bkz. 7. bölüm — etkinlik kalıcılığı sonradan localStorage'dan Firestore'a taşındı)
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

## 7. Kullanıcı hesabı ve bulutta senkronizasyon (Firebase)
- [x] Firebase compat SDK entegrasyonu (`firebase-config.js`, CDN script'leri) — placeholder config, kullanıcı kendi Firebase proje bilgilerini girecek
- [x] Auth ekranı: giriş / kayıt sekmeleri, e-posta + şifre + (kayıtta) ad soyad alanları, hata mesajı gösterimi
- [x] `onAuthStateChanged` ile oturum durumuna göre auth ekranı / takvim ekranı geçişi
- [x] Kayıt olunca Firestore'da `users/{uid}` altında profil + boş etkinlik dokümanı oluşturulması
- [x] `saveEvents()`'in Firestore'a yazacak şekilde güncellenmesi (`users/{uid}.events`), `addEvent`/`updateEvent`/`deleteEvent` mantığı değişmeden
- [x] Giriş yapınca Firestore'dan kullanıcının etkinliklerinin çekilip takvime yüklenmesi
- [x] Header'da kullanıcı adı + "Çıkış Yap" butonu
- [x] Auth metinleri için TR/EN/DE çevirileri
- [x] Firestore güvenlik kuralı: her kullanıcı yalnızca kendi dokümanına erişebilir
- [x] README.md'ye Firebase kurulum adımları eklendi

**Kabul kriterleri:**
- Uygulama ilk açıldığında (oturum yoksa) takvim değil, giriş/kayıt ekranı görünüyor
- Kayıt olan kullanıcı otomatik olarak giriş yapmış sayılıyor ve takvim ekranına yönlendiriliyor
- Takvimde eklenen/düzenlenen/silinen etkinlikler Firestore'daki kullanıcı dokümanına yazılıyor
- Çıkış yapıp aynı hesapla tekrar giriş yapıldığında daha önce eklenen etkinlikler geri geliyor
- Farklı bir hesapla girişte, önceki kullanıcının etkinlikleri görünmüyor (hesaba özel veri izolasyonu)
- Yanlış e-posta/şifre veya zaten kayıtlı e-posta gibi durumlarda kullanıcıya anlaşılır, seçili dile göre çevrilmiş bir hata mesajı gösteriliyor
- Not: Gerçek Firebase proje anahtarları girilmeden (placeholder değerlerle) giriş/kayıt işlemleri çalışmaz — bu beklenen bir durumdur, kullanıcı kendi `firebase-config.js` değerlerini girdikten sonra tam olarak test edilebilir

## 8. Arka plan görselini uygulamaya ekleme ve takvim görünümünü buna göre düzenleme

- [x] `image.png` dosyasını body arka planı olarak ayarla (cover, sabit/fixed, ortalanmış)
- [x] Renk paletini görsele uygun pastel tonlara çevir (açık mavi/gri arkaplan, pembe/kiraz accent, koyu metin) — mevcut koyu tema yerine
- [x] Takvim/kart/modal yüzeylerini yarı saydam + hafif blur ("cam" efekti) yaparak arka planın hissedilmesini sağla
- [x] `today` hücresi, event-dot, buton gibi accent renklerini yeni pembe/mavi paletle güncelle
- [x] `<meta name="color-scheme">` ve `theme-color` değerlerini açık temaya göre güncelle
- [x] Mobil/masaüstü görünümde arka planın ve okunabilirliğin bozulmadığını tarayıcıda test et

**Kabul kriterleri:**
- Sayfa açıldığında `image.png` tüm ekranı kaplayan arka plan olarak görünüyor
- Takvim kartı, modal ve butonlar yeni pastel temayla görsel olarak uyumlu
- Metinler arka plan üzerinde okunabilir kalıyor (yeterli kontrast)
- Mobilde de arka plan düzgün kesiliyor/ölçekleniyor, taşma olmuyor

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

### Güncelleme: Kullanıcı hesabı ve bulut senkronizasyonu (Firebase)

- `firebase-config.js` eklendi (Firebase compat SDK, placeholder config — gerçek kullanım için kullanıcının kendi Firebase proje bilgilerini girmesi gerekiyor, bkz. README).
- Uygulama ilk açıldığında giriş/kayıt ekranı gösteriliyor; oturum açılmadan takvime erişilemiyor.
- Etkinlik kalıcılığı `localStorage`'dan Firestore'a taşındı: her kullanıcının etkinlikleri `users/{uid}` dokümanında saklanıyor, giriş yapınca otomatik yükleniyor.
- Firestore güvenlik kuralı ile her kullanıcı yalnızca kendi verisine erişebiliyor.
- TR/EN/DE için giriş/kayıt/çıkış metinleri ve Firebase hata mesajları çevirisi eklendi.
- Playwright ile doğrulandı: auth ekranının varsayılan olarak göründüğü, sekme geçişlerinin (giriş/kayıt) çalıştığı, dil değişiminin auth ekranını da kapsadığı, ve placeholder Firebase anahtarlarıyla yapılan bir kayıt denemesinin beklendiği gibi (JS hatası fırlatmadan) çevrilmiş bir hata mesajıyla sonuçlandığı gözlemlendi. Gerçek giriş/kayıt akışı, kullanıcı kendi Firebase proje anahtarlarını `firebase-config.js`'e girdikten sonra uçtan uca test edilebilir.

### Güncelleme: Arka plan görseli + pastel tema (bölüm 8)

- `index.html`: `color-scheme` ve `theme-color` meta etiketleri açık temaya çevrildi.
- `style.css`: `:root` değişkenleri (`--accent`, `--bg`, `--surface`, `--border`, `--text`, `--text-muted`) koyu temadan, görseldeki pastel mavi-gri/pembe tonlarına çevrildi; önceki commit'te bilinçli olarak yapılan "her zaman koyu tema" kararı, kullanıcı onayıyla bu görsele uyum sağlamak için tersine çevrildi.
- `body`'ye `image.png` arka plan olarak eklendi (`cover`, `fixed`); 600px altındaki media query'de `background-attachment: scroll`'a düşüyor (iOS Safari'de fixed arka planların sorunlu davranmasını önlemek için).
- Kart/buton/modal gibi `var(--surface)` kullanan tüm yüzeylere `backdrop-filter: blur(10px)` eklenerek arka planın hafifçe süzüldüğü bir "cam" efekti oluşturuldu; auth kartı ve modal biraz daha opak (`--surface-strong`) tutularak okunabilirlik garanti edildi.
- `script.js`'e hiç dokunulmadı (tema/renk mantığı barındırmıyor).
- Playwright ile doğrulandı: masaüstü (1280px) ve mobil (375px) genişlikte auth ekranı, takvim grid'i ve gün modalı ekran görüntüleriyle kontrol edildi — arka plan doğru kesiliyor, metinler okunabilir, konsolda hiçbir hata yok.
