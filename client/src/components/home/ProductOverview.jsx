import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';

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
      tr: 'Geniş baski alani sunan, kurumsal veya promosyon kullanimina uygun dikdortgen tepsi tasarimi.',
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

export default function ProductOverview() {
  const { t, lang } = useI18n();
  const [products, setProducts] = useState([]);
  const [isTrayModalOpen, setIsTrayModalOpen] = useState(false);
  const [activeTrayIndex, setActiveTrayIndex] = useState(0);

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isTrayModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTrayModalOpen]);

  const trayText = {
    tr: {
      name: 'Tepsi',
      description: 'Marka sunumlari ve servis kullanimlari icin dayanikli, baskiya uygun metal tepsi cozumleri.',
      modalTitle: 'Tepsi',
      dimensions: 'Olculer',
      close: 'Kapat',
      zoomHint: 'Detayli urun tanitimi icin tiklayin',
      sizes: ['235 mm', '350 mm', '450 mm'],
    },
    en: {
      name: 'Tray',
      description: 'Durable metal tray solutions suitable for branded presentation and serving use.',
      modalTitle: 'Tray',
      dimensions: 'Dimensions',
      close: 'Close',
      zoomHint: 'Click for detailed product presentation',
      sizes: ['235 mm', '350 mm', '450 mm'],
    },
    ar: {
      name: 'صينية',
      description: 'حلول صواني معدنية متينة مناسبة للعروض التجارية واستخدامات التقديم.',
      modalTitle: 'صينية',
      dimensions: 'القياسات',
      close: 'إغلاق',
      zoomHint: 'اضغط لعرض تقديم تفصيلي للمنتج',
      sizes: ['235 mm', '350 mm', '450 mm'],
    },
  }[lang] || {
    name: 'Tray',
    description: 'Durable metal tray solutions suitable for branded presentation and serving use.',
    modalTitle: 'Tray',
    dimensions: 'Dimensions',
    close: 'Close',
    zoomHint: 'Click for detailed product presentation',
    sizes: ['235 mm', '350 mm', '450 mm'],
  };

  const tins = products.filter(p => !['caps'].includes(p.category_slug));
  const caps = products.filter(p => p.category_slug === 'caps');
  const activeTrayImage = TRAY_GALLERY[activeTrayIndex] || TRAY_GALLERY[0];
  const openTrayModal = (index = 0) => {
    setActiveTrayIndex(index);
    setIsTrayModalOpen(true);
  };

  return (
    <>
      <section className="products-section" id="products">
        <div className="container">
          <div className="products-header" data-aos="fade-up">
            <div className="headline-underline">
              <h2 className="text-gradient">
                {t('products.title')}<br />{t('products.subtitle')}
              </h2>
            </div>
          </div>

          <div className="products-grid">
            <div className="products-col" data-aos="fade-up">
              <div className="products-col-icon">
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="60" cy="25" rx="35" ry="12" />
                  <path d="M25 25v70c0 6.6 15.7 12 35 12s35-5.4 35-12V25" />
                  <ellipse cx="60" cy="95" rx="35" ry="12" />
                </svg>
              </div>
              <h4>{t('products.tins')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {tins.map(p => (
                  p.slug === TRAY_REPLACEMENT_SLUG ? (
                    <TrayTooltip
                      key={p.id}
                      name={trayText.name}
                      description={trayText.description}
                      image={TRAY_GALLERY[0].image}
                      hint={trayText.zoomHint}
                      onOpen={() => openTrayModal(0)}
                    />
                  ) : (
                    <ProductTooltip key={p.id} product={p} lang={lang} />
                  )
                ))}
                {tins.length === 0 && (
                  <>
                    <TrayTooltip
                      name={trayText.name}
                      description={trayText.description}
                      image={TRAY_GALLERY[0].image}
                      hint={trayText.zoomHint}
                      onOpen={() => openTrayModal(0)}
                    />
                    <PlaceholderTooltip name="Kare Kutu" image="/images/food-tins.png" />
                    <PlaceholderTooltip name="Dekoratif Kutu" image="/images/homeware-tins.png" />
                    <PlaceholderTooltip name="Promosyon Kutu" image="/images/promo-tins.png" />
                  </>
                )}
              </div>
            </div>

            <div className="products-col" data-aos="fade-up">
              <div className="products-col-icon">
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="60" cy="60" rx="35" ry="12" />
                  <path d="M25 60v15c0 6.6 15.7 12 35 12s35-5.4 35-12V60" />
                  <path d="M25 60V45c0-6.6 15.7-12 35-12s35 5.4 35 12v15" />
                  <line x1="60" y1="30" x2="60" y2="15" />
                  <circle cx="60" cy="12" r="4" />
                </svg>
              </div>
              <h4>{t('products.caps')}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {caps.length > 0 ? caps.map(p => (
                  <ProductTooltip key={p.id} product={p} lang={lang} />
                )) : (
                  <>
                    <PlaceholderTooltip name="Vidalı Kapak" image="/images/cosmetic-tins-2.png" />
                    <PlaceholderTooltip name="Çıtçıt Kapak" image="/images/food-tins-2.png" />
                    <PlaceholderTooltip name="Menteşeli Kapak" image="/images/homeware-tins-2.png" />
                    <PlaceholderTooltip name="Özel Kapak" image="/images/promo-tins-2.png" />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="products-bottom" data-aos="fade-up">
            <h3>{t('products.notListed')}<br />{t('products.weHelp')}</h3>
            <a href="/contact" className="btn btn-outline-white">{t('industries.contactUs')}</a>
          </div>
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
    </>
  );
}

function ProductTooltip({ product, lang }) {
  const name = product[`name_${lang}`] || product.name_en;
  const desc = product[`desc_${lang}`] || product.desc_en;

  return (
    <div className="product-tooltip">
      <button className="product-tooltip-trigger">{name}</button>
      <div className="product-tooltip-popup">
        {product.image && <img src={product.image} alt={name} />}
        <h5>{name}</h5>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function PlaceholderTooltip({ name, image }) {
  return (
    <div className="product-tooltip">
      <button className="product-tooltip-trigger">{name}</button>
      <div className="product-tooltip-popup">
        <img src={image} alt={name} />
        <h5>{name}</h5>
        <p>Yüksek kalitede metal ambalaj çözümü.</p>
      </div>
    </div>
  );
}

function TrayTooltip({ name, description, image, hint, onOpen }) {
  return (
    <div className="product-tooltip product-tooltip-clickable">
      <button type="button" className="product-tooltip-trigger" onClick={onOpen}>{name}</button>
      <div className="product-tooltip-popup product-tooltip-popup-clickable" onClick={onOpen}>
        <img src={image} alt={name} />
        <h5>{name}</h5>
        <p>{description}</p>
        <span className="product-tooltip-action">{hint}</span>
      </div>
    </div>
  );
}
