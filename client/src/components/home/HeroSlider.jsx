import { useState, useEffect, useCallback } from 'react';
import { useI18n } from '../../i18n';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function HeroSlider() {
  const { t, lang } = useI18n();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`${API}/slides`)
      .then(r => r.json())
      .then(data => setSlides(data))
      .catch(() => {
        // Fallback slides
        setSlides([
          { id: 1, [`title_${lang}`]: t('hero.slide1Title'), [`desc_${lang}`]: t('hero.slide1Desc'), image: '/images/banner2_food.png' },
          { id: 2, [`title_${lang}`]: t('hero.slide2Title'), [`desc_${lang}`]: t('hero.slide2Desc'), image: '/images/banner1_cosmetics.png' },
          { id: 3, [`title_${lang}`]: t('hero.slide3Title'), [`desc_${lang}`]: t('hero.slide3Desc'), image: '/images/banner3_promo.png' },
        ]);
      });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % (slides.length || 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  const getField = (slide, field) => {
    return slide[`${field}_${lang}`] || slide[`${field}_en`] || '';
  };

  if (slides.length === 0) {
    return <div className="hero-slider" style={{ minHeight: '80vh' }} />;
  }

  return (
    <section className="hero-slider">
      <div className="slide-wrapper">
        {slides.map((slide, i) => (
          <div
            key={slide.id || i}
            className={`slide-item ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-item-inner">
              <div className="container" style={{ width: '100%' }}>
                <div className="slide-item-content">
                  <h2>{getField(slide, 'title')}</h2>
                  <p>{getField(slide, 'desc')}</p>
                  <div>
                    <a href={slide.link || '#products'} className="btn btn-outline-white">
                      {t('hero.learnMore')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
