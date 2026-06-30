const db = require('./database');

console.log('🌱 Seeding database...');

// Clean up old data to avoid foreign key violations
db.exec(`
  PRAGMA foreign_keys = OFF;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM slides;
  DELETE FROM news;
  DELETE FROM pages;
  DELETE FROM sqlite_sequence;
  PRAGMA foreign_keys = ON;
`);

// Categories
const insertCategory = db.prepare(`
  INSERT OR REPLACE INTO categories (slug, name_tr, name_en, name_ar, icon, sort_order)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const categories = [
  ['kozmetik', 'Kozmetik', 'Cosmetics', 'مستحضرات التجميل', 'cosmetic', 1],
  ['gida', 'Gıda', 'Food', 'الغذاء', 'food', 2],
  ['farmasotik', 'Farmasötik', 'Pharma', 'الأدوية', 'pharma', 3],
  ['kimyasal', 'Kimyasal/Teknik', 'Chemical/Technical', 'كيميائي/تقني', 'chemical', 4],
  ['ev-dekor', 'Ev & Dekor', 'Home & Decor', 'المنزل والديكور', 'homeware', 5],
  ['promosyon', 'Promosyon', 'Promotion', 'الترويج', 'promo', 6],
];

categories.forEach(c => insertCategory.run(...c));

// Products
const insertProduct = db.prepare(`
  INSERT OR REPLACE INTO products (category_id, slug, name_tr, name_en, name_ar, desc_tr, desc_en, desc_ar, image, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const products = [
  [1, 'kozmetik-kutu-yuvarlak', 'Yuvarlak Kozmetik Kutusu', 'Round Cosmetic Tin', 'علبة مستحضرات تجميل دائرية', 'Zarif tasarım, yüksek kalite baskı. Kozmetik ürünleriniz için ideal.', 'Elegant design, high quality printing. Ideal for your cosmetic products.', 'تصميم أنيق، طباعة عالية الجودة. مثالي لمنتجات التجميل.', '/images/cosmetic-tins.png', 1],
  [1, 'kozmetik-kutu-kare', 'Kare Kozmetik Kutusu', 'Square Cosmetic Tin', 'علبة مستحضرات تجميل مربعة', 'Modern kare formu ile şık ambalaj çözümü.', 'Stylish packaging with modern square form.', 'حل تغليف أنيق بشكل مربع حديث.', '/images/cosmetic-tins-2.png', 2],
  [2, 'gida-kutu-yuvarlak', 'Yuvarlak Gıda Kutusu', 'Round Food Tin', 'علبة طعام دائرية', 'Gıda güvenliği standartlarında üretim. Ürünlerinizi taze saklayın.', 'Production in food safety standards. Keep your products fresh.', 'إنتاج بمعايير سلامة الغذاء. حافظ على منتجاتك طازجة.', '/images/food-tins.png', 1],
  [2, 'gida-kutu-kare', 'Kare Gıda Kutusu', 'Square Food Tin', 'علبة طعام مربعة', 'Sızdırmaz kapak teknolojisi ile gıda güvenliğinde öncü.', 'Pioneer in food safety with leak-proof lid technology.', 'رائد في سلامة الغذاء بتقنية الغطاء المانع للتسرب.', '/images/food-tins-2.png', 2],
  [5, 'ev-dekor-kutu', 'Dekoratif Kutu', 'Decorative Tin', 'علبة ديكور', 'Ev dekorasyonunuza şıklık katan metal kutular.', 'Metal tins that add elegance to your home decor.', 'علب معدنية تضيف أناقة لديكور منزلك.', '/images/homeware-tins.png', 1],
  [5, 'ev-dekor-kutu-buyuk', 'Büyük Dekoratif Kutu', 'Large Decorative Tin', 'علبة ديكور كبيرة', 'Geniş hacimli dekoratif saklama kutuları.', 'Large capacity decorative storage tins.', 'علب تخزين ديكورية كبيرة الحجم.', '/images/homeware-tins-2.png', 2],
  [6, 'promosyon-kutu', 'Promosyon Kutusu', 'Promotional Tin', 'علبة ترويجية', 'Markanızı öne çıkaran özel tasarım promosyon kutuları.', 'Custom designed promotional tins that highlight your brand.', 'علب ترويجية بتصميم مخصص تبرز علامتك التجارية.', '/images/promo-tins.png', 1],
  [6, 'promosyon-kutu-ozel', 'Özel Promosyon Kutusu', 'Special Promotional Tin', 'علبة ترويجية خاصة', 'Sınırsız tasarım imkanları ile promosyon ürünleriniz.', 'Your promotional products with unlimited design possibilities.', 'منتجاتك الترويجية بإمكانيات تصميم غير محدودة.', '/images/promo-tins-2.png', 2],
];

products.forEach(p => insertProduct.run(...p));

// Slides
const insertSlide = db.prepare(`
  INSERT OR REPLACE INTO slides (title_tr, title_en, title_ar, desc_tr, desc_en, desc_ar, image, link, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const slides = [
  ['Metal Ambalaj', 'Metal Packaging', 'تغليف معدني',
   'Gampaş kalitesiyle üretilen, en yüksek standartlarda özel ambalaj çözümleri. Sürdürülebilir ve çevre dostu.',
   'Custom packaging solutions produced at the highest standards with Gampaş quality. Sustainable and eco-friendly.',
   'حلول تغليف مخصصة بأعلى المعايير مع جودة Gampaş. مستدام وصديق للبيئة.',
   '/images/banner2_food.png', '/products', 1],
  ['Kozmetik Kutuları', 'Cosmetic Tins', 'علب مستحضرات التجمil',
   'Zarif dokunuş, seçkin içerikler için. Modern baskı teknikleri ve yüzey işleme ile mükemmel sonuçlar.',
   'Elegant touch for exquisite contents. Perfect results with modern printing techniques and surface finishing.',
   'لمسة أنيقة للمحتويات الراقية. نتائج مثالية مع تقنيات الطباعة الحديثة والتشطيب السطحي.',
   '/images/banner1_cosmetics.png', '/products', 2],
  ['Gıda Kutuları', 'Food Tins', 'علb المواد الغذائية',
   'Gıda güvenliği standartlarında üretim. Ürünlerinizi taze ve güvenli saklayın.',
   'Production in food safety standards. Keep your products fresh and safe.',
   'إنتاج بمعايير سلامة الغذاء. حافظ على منتجاتك طازجة وآمنة.',
   '/images/banner3_promo.png', '/products', 3],
];

slides.forEach(s => insertSlide.run(...s));

// News
const insertNews = db.prepare(`
  INSERT OR REPLACE INTO news (slug, title_tr, title_en, title_ar, excerpt_tr, excerpt_en, excerpt_ar, image, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const news = [
  ['yeni-uretim-hatti', 'Yeni Üretim Hattımız Devrede', 'Our New Production Line is Active', 'خط إنتاجنا الجديد قيد التشغيل',
   'Modern teknoloji ile donatılmış yeni üretim hattımız tam kapasite çalışmaya başladı.', 'Our new production line equipped with modern technology has started operating at full capacity.', 'بدأ خط إنتاجنا الجديد المجهز بالتكنولوجيا الحديثة العمل بكامل طاقته.',
   '/images/food-tins.png', '2024-11-15'],
  ['surdurulebilirlik-raporu', 'Sürdürülebilirlik Raporumuz Yayınlandı', 'Our Sustainability Report Published', 'نشر تقرير الاستدامة الخاص بنا',
   'Çevreye duyarlı üretim süreçlerimizi detaylı olarak anlattığımız raporumuz yayınlandı.', 'Our report detailing our environmentally conscious production processes has been published.', 'تم نشر تقريرنا الذي يوضح بالتفصيل عمليات الإنتاج الصديقة للبيئة.',
   '/images/homeware-tins.png', '2024-10-20'],
  ['fuar-katilimi', 'Uluslararası Ambalaj Fuarı\'na Katıldık', 'We Attended the International Packaging Fair', 'شاركنا في معرض التغليف الدولي',
   'Dünya genelinden sektör profesyonelleriyle bir araya geldiğimiz fuarda yeni ürünlerimizi sergiledik.', 'We exhibited our new products at the fair where we met with industry professionals from around the world.', 'عرضنا منتجاتنا الجديدة في المعرض حيث التقينا بمتخصصي الصناعة من جميع أنحاء العالم.',
   '/images/promo-tins.png', '2024-09-05'],
];

news.forEach(n => insertNews.run(...n));

// Pages
const insertPage = db.prepare(`
  INSERT OR REPLACE INTO pages (slug, title_tr, title_en, title_ar, content_tr, content_en, content_ar)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertPage.run(
  'hakkimizda', 'Hakkımızda', 'About Us', 'من نحن',
  `1982 yılından bu yana metal ambalaj sektöründe güven, kalite ve sürdürülebilir üretim anlayışıyla faaliyet gösteriyoruz.

Kurulduğumuz günden itibaren yalnızca sektördeki gelişmeleri takip etmekle kalmadık; yenilikçi yaklaşımımız, çözüm odaklı üretim anlayışımız ve müşteri memnuniyetini esas alan hizmet politikamızla metal ambalaj sektörünün öncü firmalarından biri haline geldik.

İstanbul'da, kıtaların buluştuğu noktada yer alan 8.000 m² kapalı üretim tesisimizde, modern üretim teknolojileri ve alanında uzman ekibimizle faaliyet gösteriyoruz. Metali yüksek kalite standartlarında işleyerek, müşterilerimizin ihtiyaçlarına özel çözümler sunuyor ve markalarına değer katıyoruz.

Her projeye aynı özenle yaklaşarak; kalite, güvenilirlik ve zamanında teslim ilkelerimizden ödün vermeden üretim gerçekleştiriyoruz. Bugün olduğu gibi gelecekte de iş ortaklarımızın beklentilerini aşan çözümler üretmeye devam ediyoruz.

Vizyonumuz

Ulusal ve uluslararası gelişmeleri yakından takip ederek sektörün ihtiyaçlarını doğru analiz ediyor, tecrübemizden aldığımız güçle geleceğe yön veren çözümler geliştiriyoruz.

İstikrarlı büyümeyi, sürdürülebilir üretimi ve müşteri memnuniyetini temel alarak; güvenilir, yenilikçi ve uzun vadeli iş birlikleri kurmayı hedefliyoruz. Çevreye duyarlı üretim anlayışımızla hem ülkemiz hem de gelecek nesiller için değer üretmeye devam ediyoruz.

Misyonumuz

Müşterilerimizin ihtiyaçlarını doğru analiz ederek markalarına en uygun metal ambalaj çözümlerini sunuyor, üretimin her aşamasında şeffaf iletişim ve yüksek kalite anlayışıyla hareket ediyoruz.

Kaliteyi yalnızca üretim süreciyle sınırlı görmüyor; ürünlerimizin kullanım süreci boyunca aynı güveni ve dayanıklılığı sunmasını önemsiyoruz. Bu anlayışla, müşterilerimizin başarılarına katkı sağlayan, estetik, fonksiyonel ve güvenilir ambalajlar üretiyoruz.

Kalite ve Sürdürülebilirlik

Doğaya saygılı üretimin geleceğe karşı en önemli sorumluluklarımızdan biri olduğuna inanıyoruz. Bu bilinçle, %100 geri dönüştürülebilir metal ambalajlar üreterek sürdürülebilir bir gelecek için çalışıyoruz.

40 yılı aşkın sektör tecrübemizi uluslararası kalite standartlarıyla birleştiriyor; üretim süreçlerimizi sürekli geliştirerek çevreye duyarlı ve yüksek kalite anlayışımızı koruyoruz.

Sahip olduğumuz ISO, TSE, SEDEX, REACH, WCA, Gıda Uygunluk ve Geri Dönüşüm belgeleriyle kaliteye, güvenilirliğe ve sürdürülebilir üretime verdiğimiz önemi uluslararası standartlarda belgelendiriyoruz.

GAMPAŞ A.Ş. olarak, geçmişimizden aldığımız deneyim ve geleceğe duyduğumuz sorumlulukla; müşterilerimiz için değer üreten, çevreye duyarlı ve güvenilir metal ambalaj çözümleri geliştirmeye devam ediyoruz.`,
  'Gampaş has been one of the pioneering companies in the metal packaging industry in Turkey since 1984. With over 40 years of experience, we produce the highest quality metal packaging solutions for the cosmetics, food, pharmaceutical, and industrial sectors.',
  'تعد Gampaş واحدة من الشركات الرائدة في صناعة التغليف المعدني في تركيا منذ عام 1984. مع أكثر من 40 عامًا من الخبرة، ننتج حلول تغليف معدنية بأعلى جودة لقطاعات مستحضرات التجميل والأغذية والأدوية والصناعة.'
);

console.log('✅ Database seeded successfully!');
process.exit(0);
