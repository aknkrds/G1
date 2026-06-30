import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import AOS from 'aos';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function About() {
  const { lang } = useI18n();
  const [content, setContent] = useState(null);
  const certificatesLabel = {
    tr: 'Sertifikalarımız',
    en: 'Our Certificates',
    ar: 'شهاداتنا',
  };
  const headingTypes = {
    vision: ['Vizyonumuz', 'Vision', 'رؤيتنا'],
    mission: ['Misyonumuz', 'Mission', 'مهمتنا'],
    quality: ['Kalite ve Sürdürülebilirlik', 'Quality and Sustainability', 'الجودة والاستدامة'],
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    fetch(`${API}/pages/hakkimizda`)
      .then(r => r.json())
      .then(data => setContent(data))
      .catch(() => {
        setContent({
          title_tr: 'Hakkımızda',
          title_en: 'About Us',
          title_ar: 'من نحن',
          content_tr: `1982 yılından bu yana metal ambalaj sektöründe guven, kalite ve surdurulebilir uretim anlayisiyla faaliyet gosteriyoruz.

Kuruldugumuz gunden itibaren yalnizca sektordeki gelismeleri takip etmekle kalmadik; yenilikci yaklasimimiz, cozum odakli uretim anlayisimiz ve musteri memnuniyetini esas alan hizmet politikamizla metal ambalaj sektorunun oncu firmalarindan biri haline geldik.

Istanbul'da, kitalarin bulustugu noktada yer alan 8.000 m2 kapali uretim tesisimizde, modern uretim teknolojileri ve alaninda uzman ekibimizle faaliyet gosteriyoruz. Metali yuksek kalite standartlarinda isleyerek, musterilerimizin ihtiyaclarina ozel cozumler sunuyor ve markalarina deger katiyoruz.

Her projeye ayni ozenle yaklasarak; kalite, guvenilirlik ve zamaninda teslim ilkelerimizden odun vermeden uretim gerceklestiriyoruz. Bugun oldugu gibi gelecekte de is ortaklarimizin beklentilerini asan cozumler uretmeye devam ediyoruz.

Vizyonumuz

Ulusal ve uluslararasi gelismeleri yakindan takip ederek sektorun ihtiyaclarini dogru analiz ediyor, tecrubemizden aldigimiz gucle gelecege yon veren cozumler gelistiriyoruz.

Istikrarli buyumeyi, surdurulebilir uretimi ve musteri memnuniyetini temel alarak; guvenilir, yenilikci ve uzun vadeli is birlikleri kurmayi hedefliyoruz. Cevreye duyarli uretim anlayisimizla hem ulkemiz hem de gelecek nesiller icin deger uretmeye devam ediyoruz.

Misyonumuz

Musterilerimizin ihtiyaclarini dogru analiz ederek markalarina en uygun metal ambalaj cozumlerini sunuyor, uretimin her asamasinda seffaf iletisim ve yuksek kalite anlayisiyla hareket ediyoruz.

Kaliteyi yalnizca uretim sureciyle sinirli gormuyor; urunlerimizin kullanim sureci boyunca ayni guveni ve dayanikliligi sunmasini onemsiyoruz. Bu anlayisla, musterilerimizin basarilarina katki saglayan, estetik, fonksiyonel ve guvenilir ambalajlar uretiyoruz.

Kalite ve Surdurulebilirlik

Dogaya saygili uretimin gelecege karsi en onemli sorumluluklarimizdan biri olduguna inaniyoruz. Bu bilincle, %100 geri donusturulebilir metal ambalajlar ureterek surdurulebilir bir gelecek icin calisiyoruz.

40 yili askin sektor tecrubemizi uluslararasi kalite standartlariyla birlestiriyor; uretim sureclerimizi surekli gelistirerek cevreye duyarli ve yuksek kalite anlayisimizi koruyoruz.

Sahip oldugumuz ISO, TSE, SEDEX, REACH, WCA, Gida Uygunluk ve Geri Donusum belgeleriyle kaliteye, guvenilirlige ve surdurulebilir uretime verdigimiz onemi uluslararasi standartlarda belgelendiriyoruz.

GAMPAS A.S. olarak, gecmisimizden aldigimiz deneyim ve gelecege duydugumuz sorumlulukla; musterilerimiz icin deger ureten, cevreye duyarli ve guvenilir metal ambalaj cozumleri gelistirmeye devam ediyoruz.`,
          content_en: 'Gampaş has been one of the pioneering companies in the metal packaging industry in Turkey since 1984. With over 40 years of experience, we produce the highest quality metal packaging solutions for the cosmetics, food, pharmaceutical, and industrial sectors.',
          content_ar: 'تعد Gampaş واحدة من الشركات الرائدة في صناعة التغليف المعدني في تركيا منذ عام 1984. مع أكثر من 40 عامًا من الخبرة، ننتج حلول تغليف معدنية بأعلى جودة لقطاعات مستحضرات التجميل والأغذية والأدوية والصناعة.'
        });
      });
  }, []);

  const getField = (field) => {
    if (!content) return '';
    return content[`${field}_${lang}`] || content[`${field}_en`] || '';
  };

  const renderContent = () => {
    const title = getField('title');
    const lines = getField('content')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .filter(line => line !== title);

    const getHeadingType = (line) => {
      if (headingTypes.vision.includes(line)) return 'vision';
      if (headingTypes.mission.includes(line)) return 'mission';
      if (headingTypes.quality.includes(line)) return 'quality';
      return null;
    };

    const introLines = [];
    const visionMissionLines = [];
    const qualityLines = [];
    let currentBlock = 'intro';

    lines.forEach((line) => {
      const headingType = getHeadingType(line);

      if (headingType === 'vision' || headingType === 'mission') {
        currentBlock = 'visionMission';
      } else if (headingType === 'quality') {
        currentBlock = 'quality';
      }

      if (currentBlock === 'intro') introLines.push(line);
      if (currentBlock === 'visionMission') visionMissionLines.push(line);
      if (currentBlock === 'quality') qualityLines.push(line);
    });

    const renderLines = (blockLines) => blockLines.map((line, index) => {
      if (getHeadingType(line)) {
        return (
          <h3
            key={`${line}-${index}`}
            style={{
              fontSize: 'var(--font-size-xl)',
              color: 'var(--color-dark)',
              marginTop: index === 0 ? '0' : '28px',
              marginBottom: '12px',
              fontWeight: 600,
            }}
          >
            {line}
          </h3>
        );
      }

      return (
        <p
          key={`${line}-${index}`}
          style={{
            fontSize: 'var(--font-size-md)',
            lineHeight: '1.8',
            color: 'var(--color-text-light)',
            marginBottom: '16px',
          }}
        >
          {line}
        </p>
      );
    });

    return (
      <>
        {introLines.length > 0 && (
          <div className="about-content-block about-intro-block">
            {renderLines(introLines)}
          </div>
        )}

        {introLines.length > 0 && visionMissionLines.length > 0 && (
          <div className="about-divider-image-wrap">
            <img
              src="/images/about-divider.jpg"
              alt="Gampas 40. yil"
              className="about-divider-image"
            />
          </div>
        )}

        {visionMissionLines.length > 0 && (
          <div className="about-content-block about-middle-block">
            {renderLines(visionMissionLines)}
          </div>
        )}

        {visionMissionLines.length > 0 && qualityLines.length > 0 && (
          <div className="about-video-wrap">
            <video
              className="about-video"
              autoPlay
              muted
              controls
              loop
              playsInline
              preload="metadata"
            >
              <source src="/gampas.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {qualityLines.length > 0 && (
          <>
            <div className="about-content-block about-quality-block">
              {renderLines(qualityLines)}
            </div>
            <Link to="/certificates" className="about-certificates-link">
              {certificatesLabel[lang] || certificatesLabel.en}
            </Link>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <section
        className="page-hero about-page-hero"
        aria-label={getField('title')}
        style={{ backgroundImage: 'url(/images/about-hero.jpg)' }}
      />

      <section className="page-content container">
        <div className="about-content" data-aos="fade-up" style={{ boxShadow: 'var(--shadow-md)' }}>
          <div className="about-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="about-page-title">{getField('title')}</h2>
            {renderContent()}
          </div>
        </div>
      </section>
    </div>
  );
}
