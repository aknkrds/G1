import { useI18n } from '../../i18n';

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div data-aos="fade-up">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-dark)', marginBottom: '20px' }}>
              {t('about.descriptionHeading')}
            </h3>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '20px' }}>
              {t('about.descriptionIntro')}
            </p>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-light)', lineHeight: '1.8', marginBottom: '20px' }}>
              {t('about.descriptionBody')}
            </p>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-dark)', lineHeight: '1.8', fontWeight: 700 }}>
              {t('about.descriptionClosing')}
            </p>
          </div>
        </div>

        <div className="about-content" data-aos="fade-up">
          <div className="about-image">
            <img
              src="/images/food-tins.png"
              alt={t('about.management')}
              style={{ objectFit: 'contain', padding: '40px', background: 'var(--color-bg-alt)' }}
            />
          </div>
          <div className="about-text">
            <div className="about-slogan">
              {t('about.slogan')}
            </div>
            <div className="about-management">
              <strong>{t('about.management')}</strong>
              Gampaş Ambalaj A.Ş.
            </div>
          </div>
        </div>

        <div className="about-btn-wrap" data-aos="fade-up">
          <a href="/about" className="btn btn-outline-dark">{t('about.learnMore')}</a>
        </div>
      </div>
    </section>
  );
}
