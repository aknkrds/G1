import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import AOS from 'aos';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function ContactHeroIcon({ children, className = '', href, label, external = false }) {
  const rel = external ? 'noreferrer' : undefined;
  const target = external ? '_blank' : undefined;

  return (
    <a
      className={`contact-hero-icon ${className}`.trim()}
      href={href}
      aria-label={label}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setStatus('sending');

    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus(null), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <section className="page-hero contact-hero">
        <div className="container">
          <div className="contact-hero-shell" data-aos="fade-up">
            <div className="contact-hero-pattern">
              <ContactHeroIcon
                className="contact-hero-icon-one"
                href="mailto:sales@gampas.net"
                label="sales@gampas.net adresine e-posta gonder"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
                  <path d="m5.5 7 6.5 5 6.5-5" />
                </svg>
              </ContactHeroIcon>
              <ContactHeroIcon
                className="contact-hero-icon-two"
                href="https://wa.me/905331575324"
                label="WhatsApp ile iletisime gec"
                external
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 11.5A8 8 0 0 1 8.37 18.6L4 20l1.4-4.08A8 8 0 1 1 20 11.5Z" />
                  <path d="M9.4 8.7c.18-.39.38-.4.56-.41h.41c.16 0 .37.04.56.42.2.39.64 1.38.7 1.48.06.1.1.21.03.34-.07.13-.11.21-.22.32-.11.11-.23.24-.32.33-.1.09-.2.2-.08.38.12.19.52.86 1.13 1.39.78.69 1.44.91 1.61 1.01.17.1.28.08.38-.05.1-.13.41-.48.52-.64.11-.16.22-.18.38-.11.15.07.96.45 1.12.53.16.08.27.12.31.2.04.08.04.44-.1.84-.13.4-.78.81-1.09.86-.3.05-.64.08-1.04-.05-.25-.08-.56-.18-.97-.36-1.69-.73-2.8-2.46-2.89-2.58-.08-.12-.69-.9-.69-1.71 0-.81.42-1.2.57-1.36Z" />
                </svg>
              </ContactHeroIcon>
              <ContactHeroIcon
                className="contact-hero-icon-three"
                href="https://maps.app.goo.gl/HSKYLwkcCv8R8qAn8"
                label="Konumu haritalarda ac"
                external
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 20s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </ContactHeroIcon>
              <ContactHeroIcon
                className="contact-hero-icon-four"
                href="tel:+902124389710"
                label="+90 212 438 97 10 numarasini ara"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6.5 4.5h3l1.5 4-2 1.8a14 14 0 0 0 4.7 4.7l1.8-2 4 1.5v3A1.5 1.5 0 0 1 18 19C10.82 19 5 13.18 5 6a1.5 1.5 0 0 1 1.5-1.5Z" />
                </svg>
              </ContactHeroIcon>
            </div>

            <div className="contact-hero-content">
              <h1 data-aos="fade-up">{t('contact.pageTitle')}</h1>
              <p className="contact-hero-subtitle">{t('contact.heroSubtitle')}</p>

              <div className="contact-hero-meta">
                <div className="contact-hero-badge">
                  <span>{t('contact.heroBadgePhone')}</span>
                  <strong>+90 (212) 423 40 20</strong>
                </div>
                <div className="contact-hero-badge">
                  <span>{t('contact.heroBadgeEmail')}</span>
                  <strong>sales@gampas.net</strong>
                </div>
                <div className="contact-hero-badge">
                  <span>{t('contact.heroBadgeAddress')}</span>
                  <strong>Adile Nasit Bulvari, Esenyurt</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content container" data-aos="fade-up">
        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info">
            <div className="contact-info-item">
              <h4>{t('contact.address')}</h4>
              <p>
                Adile Nasit Bulvari Namik Kemal Mah.
                <br />
                176. Sok. No:3 Esenyurt
                <br />
                Istanbul / Turkiye
              </p>
            </div>
            <div className="contact-info-item">
              <h4>{t('footer.contactTitle')}</h4>
              <a href="tel:+902124234020" style={{ display: 'block', margin: '4px 0' }}>+90 (212) 423 40 20</a>
              <a href="tel:+905334779215" style={{ display: 'block', margin: '4px 0' }}>+90 (533) 477 92 15</a>
              <a href="mailto:sales@gampas.net">sales@gampas.net</a>
            </div>
          </div>

          {/* Form Column */}
          <div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '24px' }}>{t('contact.formTitle')}</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={t('contact.name')}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder={t('contact.email')}
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t('contact.phone')}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder={t('contact.message')}
              />

              {status === 'success' && (
                <div className="quote-message success" style={{ padding: '12px', background: '#f0fdf4', color: '#166534', borderRadius: '8px', textAlign: 'center' }}>
                  {t('quote.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="quote-message error" style={{ padding: '12px', background: '#fef2f2', color: '#991b1b', borderRadius: '8px', textAlign: 'center' }}>
                  {t('quote.error')}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-dark contact-submit-btn"
                style={{ alignSelf: 'flex-start', marginTop: '10px' }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t('quote.sending') : t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
