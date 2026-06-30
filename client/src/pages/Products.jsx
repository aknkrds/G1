import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import AOS from 'aos';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const TRAY_REPLACEMENT_SLUG = 'kozmetik-kutu-yuvarlak';
const TRAY_GALLERY = [
  {
    image: '/images/trays/tray-1.jpg',
    desc: {
      tr: 'Kenar detaylari yumusak formlu, hafif ve sunuma uygun klasik metal tepsi ornegi.',
      en: 'A classic metal tray example with soft edges, light structure and presentation-friendly form.',
      ar: 'نموذج صينية معدنية كلاسيكية بحواف ناعمة وهيكل خفيف ومناسبة للتقديم.',
    },
  },
  {
    image: '/images/trays/tray-2.jpg',
    desc: {
      tr: 'Canli baski yuzeyi ve dayanikli yapisiyla marka sunumlarinda dikkat ceken tepsi modeli.',
      en: 'A tray model that stands out in brand presentations with vivid print surface and durable structure.',
      ar: 'نموذج صينية يلفت الانتباه في العروض التجارية بسطح طباعة حي وبنية متينة.',
    },
  },
  {
    image: '/images/trays/tray-3.jpg',
    desc: {
      tr: 'Genis baski alani sunan, kurumsal veya promosyon kullanimina uygun dikdortgen tepsi tasarimi.',
      en: 'A rectangular tray design with wide print area, suitable for corporate or promotional use.',
      ar: 'تصميم صينية مستطيلة بمساحة طباعة واسعة ومناسبة للاستخدام المؤسسي أو الترويجي.',
    },
  },
  {
    image: '/images/trays/tray-4.jpg',
    desc: {
      tr: 'Retro gorunumlu, koleksiyon veya ozel sunum konseptlerine uyum saglayan metal tepsi secenegi.',
      en: 'A retro-looking metal tray option suitable for collection or special presentation concepts.',
      ar: 'خيار صينية معدنية بطابع كلاسيكي يناسب المجموعات أو مفاهيم التقديم الخاصة.',
    },
  },
];
const TRAY_CARD_CONTENT = {
  tr: {
    name: 'Tepsi',
    desc: 'Marka sunumlari ve servis kullanimlari icin dayanikli, baskiya uygun metal tepsi cozumleri.',
    image: '/images/trays/tray-1.jpg',
    modalTitle: 'Tepsi',
    dimensions: 'Olculer',
    close: 'Kapat',
    sizes: ['235 mm', '350 mm', '450 mm'],
  },
  en: {
    name: 'Tray',
    desc: 'Durable metal tray solutions suitable for branded presentation and serving use.',
    image: '/images/trays/tray-1.jpg',
    modalTitle: 'Tray',
    dimensions: 'Dimensions',
    close: 'Close',
    sizes: ['235 mm', '350 mm', '450 mm'],
  },
  ar: {
    name: 'صينية',
    desc: 'حلول صواني معدنية متينة مناسبة للعروض التجارية واستخدامات التقديم.',
    image: '/images/trays/tray-1.jpg',
    modalTitle: 'صينية',
    dimensions: 'القياسات',
    close: 'إغلاق',
    sizes: ['235 mm', '350 mm', '450 mm'],
  },
};

export default function Products() {
  const { t, lang } = useI18n();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTrayModalOpen, setIsTrayModalOpen] = useState(false);
  const [activeTrayIndex, setActiveTrayIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Fetch products
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));

    // Fetch categories
    fetch(`${API}/products/categories`)
      .then(r => r.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isTrayModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTrayModalOpen]);

  const getField = (item, field) => {
    if (!item) return '';
    return item[`${field}_${lang}`] || item[`${field}_en`] || '';
  };

  const getCardContent = (product) => {
    if (product?.slug === TRAY_REPLACEMENT_SLUG) {
      return TRAY_CARD_CONTENT[lang] || TRAY_CARD_CONTENT.en;
    }

    return {
      name: getField(product, 'name'),
      desc: getField(product, 'desc'),
      image: product?.image,
    };
  };

  const trayText = TRAY_CARD_CONTENT[lang] || TRAY_CARD_CONTENT.en;
  const activeTrayImage = TRAY_GALLERY[activeTrayIndex] || TRAY_GALLERY[0];
  const openTrayModal = (index = 0) => {
    setActiveTrayIndex(index);
    setIsTrayModalOpen(true);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category_slug === selectedCategory);

  return (
    <div>
      <section className="page-hero">
        <h1 data-aos="fade-up">{t('nav.products')}</h1>
      </section>

      <section className="page-content container" data-aos="fade-up">
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`btn ${selectedCategory === 'all' ? 'btn-dark' : 'btn-outline-dark'}`}
            style={{ padding: '10px 24px', fontSize: 'var(--font-size-xs)' }}
          >
            {lang === 'ar' ? 'الكل' : lang === 'tr' ? 'Tümü' : 'All'}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`btn ${selectedCategory === cat.slug ? 'btn-dark' : 'btn-outline-dark'}`}
              style={{ padding: '10px 24px', fontSize: 'var(--font-size-xs)' }}
            >
              {getField(cat, 'name')}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filteredProducts.map(p => {
            const card = getCardContent(p);
            const isTrayCard = p.slug === TRAY_REPLACEMENT_SLUG;

            return (
              <div
                key={p.id}
                style={{
                  background: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-base)',
                  cursor: isTrayCard ? 'pointer' : 'default',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                onClick={isTrayCard ? () => openTrayModal(0) : undefined}
                onKeyDown={isTrayCard ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openTrayModal(0);
                  }
                } : undefined}
                role={isTrayCard ? 'button' : undefined}
                tabIndex={isTrayCard ? 0 : undefined}
              >
                <div style={{ height: '220px', background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img src={card.image} alt={card.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: '600', marginBottom: '12px', color: 'var(--color-dark)' }}>
                    {card.name}
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-light)', lineHeight: '1.6' }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {isTrayModalOpen && (
        <div className="product-detail-overlay" onClick={() => setIsTrayModalOpen(false)}>
          <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-detail-header">
              <div>
                <span className="product-detail-kicker">{trayText.name}</span>
                <h2>{trayText.modalTitle}</h2>
              </div>
              <button
                type="button"
                className="product-detail-close"
                onClick={() => setIsTrayModalOpen(false)}
              >
                {trayText.close}
              </button>
            </div>

            <div className="product-detail-body">
              <div className="product-detail-specs">
                <h3>{trayText.dimensions}</h3>
                <ul className="product-detail-sizes">
                  {trayText.sizes.map(size => (
                    <li key={size}>{size}</li>
                  ))}
                </ul>
              </div>

              <div className="product-detail-gallery">
                <div className="product-detail-main-image-wrap">
                  <img src={activeTrayImage.image} alt={trayText.name} className="product-detail-main-image" />
                </div>
                <p className="product-detail-main-desc">
                  {activeTrayImage.desc[lang] || activeTrayImage.desc.en}
                </p>

                <div className="product-detail-thumbs">
                  {TRAY_GALLERY.map((item, index) => (
                    <button
                      key={item.image}
                      type="button"
                      className={`product-detail-thumb${activeTrayIndex === index ? ' active' : ''}`}
                      onClick={() => setActiveTrayIndex(index)}
                    >
                      <img src={item.image} alt={`${trayText.name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
