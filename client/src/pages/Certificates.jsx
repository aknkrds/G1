import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import AOS from 'aos';

export default function Certificates() {
  const { t, lang } = useI18n();
  const [activeCert, setActiveCert] = useState(null);

  const certs = [
    {
      id: 'iso-10002',
      title: 'ISO 10002:2018 - Müşteri Memnuniyeti Yönetim Sistemi',
      url: 'https://www.gampas.net/wp-content/uploads/cert/ISO-10002-2018.pdf',
    },
    {
      id: 'iso-45001',
      title: 'ISO 45001:2018 - İş Sağlığı ve Güvenliği Yönetim Sistemi',
      url: 'https://www.gampas.net/wp-content/uploads/cert/ISO-45001-2018.pdf',
    },
    {
      id: 'iso-9001',
      title: 'ISO 9001:2015 - Metal kutu üretimi',
      url: 'https://www.gampas.net/wp-content/uploads/cert/ISO-9001-2015.pdf',
    },
    {
      id: 'iso-22000',
      title: 'ISO 22000:2018 - Gıdaya temas eden ambalaj üretimi',
      url: 'https://www.gampas.net/wp-content/uploads/cert/ISO-22000-2018.pdf',
    },
    {
      id: 'iso-14001',
      title: 'ISO 14001:2015 - Metal kutu üretimi',
      url: 'https://www.gampas.net/wp-content/uploads/cert/ISO-14001-2015.pdf',
    },
    {
      id: 'eys-pl-01',
      title: 'EYS-PL-01 - Gıda Güvenliği Politikası',
      url: 'https://www.gampas.net/wp-content/uploads/cert/EYS-PL-01.pdf',
    },
    {
      id: 'eys-pl-02',
      title: 'EYS-PL-02 - Çocuk İşçi Çalıştırmama Politikası',
      url: 'https://www.gampas.net/wp-content/uploads/cert/EYS-PL-02.pdf',
    },
    {
      id: 'eys-pl-03',
      title: 'EYS-PL-03 - Zorla Çalıştırmama Politikası',
      url: 'https://www.gampas.net/wp-content/uploads/cert/EYS-PL-03.pdf',
    },
    {
      id: 'eys-pl-04',
      title: 'EYS-PL-04 - Ayrımcılık Politikası',
      url: 'https://www.gampas.net/wp-content/uploads/cert/EYS-PL-04.pdf',
    },
    {
      id: 'eys-pl-05',
      title: 'EYS-PL-05 - Taciz, Rahatsızlık Verme, İnsanlık Dışı Muamele Politikası',
      url: 'https://www.gampas.net/wp-content/uploads/cert/EYS-PL-05.pdf',
    },
  ];

  const ui = useMemo(() => {
    if (lang === 'en') {
      return {
        intro: 'All certificates, licenses and policy documents are listed from Gampas corporate resources. Click any card to view the document in a popup window.',
        source: 'Source: gampas.net',
        view: 'View Certificate',
        close: 'Close',
        download: 'Open PDF',
        pdf: 'PDF Document',
      };
    }

    if (lang === 'ar') {
      return {
        intro: 'يتم عرض جميع الشهادات والتراخيص ووثائق السياسات من مصادر Gampas المؤسسية. اضغط على أي بطاقة لعرض المستند داخل نافذة منبثقة.',
        source: 'المصدر: gampas.net',
        view: 'عرض الشهادة',
        close: 'إغلاق',
        download: 'فتح ملف PDF',
        pdf: 'مستند PDF',
      };
    }

    return {
      intro: 'Tum sertifikalar, lisanslar ve politika dokumanlari Gampas kurumsal kaynaklarindan listelenmistir. Herhangi bir karta tiklayarak belgeyi popup penceresinde goruntuleyebilirsiniz.',
      source: 'Kaynak: gampas.net',
      view: 'Sertifikayi Goruntule',
      close: 'Kapat',
      download: 'PDF Ac',
      pdf: 'PDF Dokumani',
    };
  }, [lang]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCert ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCert]);

  return (
    <div>
      <section className="page-hero">
        <h1 data-aos="fade-up">{t('footer.certificates')}</h1>
      </section>

      <section className="page-content container" data-aos="fade-up">
        <div className="certificates-intro">
          <p>{ui.intro}</p>
          <span>{ui.source}</span>
        </div>

        <div className="certificates-grid">
          {certs.map(cert => (
            <button
              key={cert.id}
              type="button"
              className="certificate-card"
              onClick={() => setActiveCert(cert)}
            >
              <span className="certificate-card-badge">{ui.pdf}</span>
              <h3 className="certificate-card-title">{cert.title}</h3>
              <span className="certificate-card-link">{ui.view}</span>
            </button>
          ))}
        </div>
      </section>

      {activeCert && (
        <div className="certificate-modal-overlay" onClick={() => setActiveCert(null)}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="certificate-modal-header">
              <div>
                <h2>{activeCert.title}</h2>
                <span>{ui.source}</span>
              </div>
              <button type="button" className="certificate-modal-close" onClick={() => setActiveCert(null)}>
                {ui.close}
              </button>
            </div>

            <iframe
              title={activeCert.title}
              src={activeCert.url}
              className="certificate-modal-frame"
            />

            <div className="certificate-modal-actions">
              <a href={activeCert.url} target="_blank" rel="noreferrer" className="btn btn-dark">
                {ui.download}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
