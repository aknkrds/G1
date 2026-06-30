import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.knowHow') },
    { to: '/products', label: t('nav.products') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <div className={`nav-outer ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            <img src="/images/GAMPAS-LOGO.png" alt="Gampaş" />
          </Link>

          <nav className="nav-menu">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link ${location.pathname + location.hash === l.to ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="lang-switcher">
              {['tr', 'en', 'ar'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
              <span style={mobileOpen ? { opacity: 0 } : {}} />
              <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className="nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <div className="lang-switcher" style={{ marginTop: '20px' }}>
          {['tr', 'en', 'ar'].map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setMobileOpen(false); }}
              className={`lang-btn ${lang === l ? 'active' : ''}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
