import { useI18n } from '../../i18n';

const icons = {
  cosmetic: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" strokeWidth="1.5" />
      <path d="M24 12v24M18 18c0-3.3 2.7-6 6-6s6 2.7 6 6v12c0 3.3-2.7 6-6 6s-6-2.7-6-6V18z" strokeWidth="1.5" />
    </svg>
  ),
  food: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="28" height="32" rx="4" strokeWidth="1.5" />
      <line x1="10" y1="16" x2="38" y2="16" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="6" strokeWidth="1.5" />
    </svg>
  ),
  pharma: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="6" width="20" height="36" rx="3" strokeWidth="1.5" />
      <line x1="14" y1="14" x2="34" y2="14" strokeWidth="1.5" />
      <line x1="24" y1="22" x2="24" y2="34" strokeWidth="1.5" />
      <line x1="18" y1="28" x2="30" y2="28" strokeWidth="1.5" />
    </svg>
  ),
  chemical: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6h12v12l8 20H10l8-20V6z" strokeWidth="1.5" />
      <line x1="18" y1="6" x2="30" y2="6" strokeWidth="1.5" />
      <circle cx="20" cy="34" r="2" strokeWidth="1" />
      <circle cx="28" cy="32" r="1.5" strokeWidth="1" />
    </svg>
  ),
  homeware: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20l16-12 16 12" strokeWidth="1.5" />
      <rect x="14" y="20" width="20" height="20" strokeWidth="1.5" />
      <rect x="20" y="30" width="8" height="10" strokeWidth="1.5" />
    </svg>
  ),
  promo: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4l6 12 13 2-9.5 9 2.5 13L24 34l-12 6 2.5-13L5 18l13-2z" strokeWidth="1.5" />
    </svg>
  ),
};

export default function IndustryCards() {
  const { t } = useI18n();

  const industries = [
    { key: 'cosmetic', icon: 'cosmetic' },
    { key: 'food', icon: 'food' },
    { key: 'pharma', icon: 'pharma' },
    { key: 'chemical', icon: 'chemical' },
    { key: 'homeware', icon: 'homeware' },
    { key: 'promo', icon: 'promo' },
  ];

  return (
    <section className="industries-section" id="industries">
      <div className="container">
        <div className="industries-header" data-aos="fade-up">
          <div className="headline-underline">
            <h2 className="text-gradient">
              {t('industries.title')}<br />{t('industries.subtitle')}
            </h2>
          </div>
        </div>

        <div className="industry-grid">
          {industries.map((ind, i) => (
            <a
              key={ind.key}
              href={`#${ind.key}`}
              className="industry-card"
              data-aos="fade-up"
              data-aos-delay={200 * (i + 1)}
            >
              <div className="industry-card-icon">
                {icons[ind.icon]}
              </div>
              <h3>{t(`industries.${ind.key}`)}</h3>
            </a>
          ))}
        </div>

        <div className="industries-bottom" data-aos="fade-up">
          <h4>
            {t('industries.notListed')}<br />{t('industries.weHelp')}
          </h4>
          <a href="/contact" className="btn btn-outline-dark">{t('industries.contactUs')}</a>
        </div>
      </div>
    </section>
  );
}
