import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer" id="contact-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/images/GAMPAS-LOGO.png" alt="Gampaş" style={{ height: '45px', marginBottom: '16px', filter: 'brightness(0) invert(1)' }} />
            <div className="footer-tagline">{t('footer.tagline')}</div>
            <div className="footer-socials" style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
              <a href="/" aria-label="Facebook">
                <svg style={{ width: '20px', height: '20px', fill: 'rgba(255,255,255,0.6)', transition: 'fill 0.2s' }} viewBox="0 0 24 24" onMouseEnter={e => e.currentTarget.style.fill = '#ffffff'} onMouseLeave={e => e.currentTarget.style.fill = 'rgba(255,255,255,0.6)'}>
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="/" aria-label="Instagram">
                <svg style={{ width: '20px', height: '20px', fill: 'rgba(255,255,255,0.6)', transition: 'fill 0.2s' }} viewBox="0 0 24 24" onMouseEnter={e => e.currentTarget.style.fill = '#ffffff'} onMouseLeave={e => e.currentTarget.style.fill = 'rgba(255,255,255,0.6)'}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="/" aria-label="LinkedIn">
                <svg style={{ width: '20px', height: '20px', fill: 'rgba(255,255,255,0.6)', transition: 'fill 0.2s' }} viewBox="0 0 24 24" onMouseEnter={e => e.currentTarget.style.fill = '#ffffff'} onMouseLeave={e => e.currentTarget.style.fill = 'rgba(255,255,255,0.6)'}>
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Gampaş Ambalaj San ve Tic AŞ</div>
              <Link to="/about">{t('footer.aboutUs')}</Link>
              <Link to="/products">{t('nav.products')}</Link>
              <Link to="/contact">{t('nav.contact')}</Link>
              <Link to="/certificates">{t('footer.certificates')}</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">{t('footer.contactTitle')}</div>
              <a href="mailto:sales@gampas.net">sales@gampas.net</a>
              <a href="tel:+902124234020">+90 (212) 423 40 20</a>
              <a href="tel:+905334779215">+90 (533) 477 92 15</a>
              <span className="footer-address">{t('footer.address')}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 Gampaş Ambalaj A.Ş. Tüm hakları saklıdır.</span>
          <span>
            Designed by <a href="https://symi.com.tr" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'rgba(255,255,255,0.8)' }}>symi</a> software
          </span>
        </div>
      </div>
    </footer>
  );
}
