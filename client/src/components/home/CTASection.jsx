import { useI18n } from '../../i18n';

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="cta-section" id="cta">
      <div className="container">
        <div className="cta-card" data-aos="fade-up">
          <div className="cta-image">
            <img src="/images/promo-tins.png" alt="Catalog" />
          </div>
          <div className="cta-content">
            <h3>{t('cta.title')}</h3>
            <p>{t('cta.description')}</p>
            <a href="/products" className="btn btn-outline-dark">
              {t('cta.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
