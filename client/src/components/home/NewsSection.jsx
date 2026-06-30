import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function NewsSection() {
  const { t, lang } = useI18n();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API}/news`)
      .then(r => r.json())
      .then(setArticles)
      .catch(() => setArticles([]));
  }, []);

  const getField = (item, field) => item[`${field}_${lang}`] || item[`${field}_en`] || '';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (articles.length === 0) return null;

  return (
    <section className="news-section" id="news">
      <div className="container">
        <div className="news-header" data-aos="fade-up">
          <h2 className="text-headline">{t('news.title')}</h2>
          <h4 className="text-label text-gradient">{t('news.subtitle')}</h4>
        </div>

        <div className="news-grid">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className="news-card"
              data-aos="fade-up"
              data-aos-delay={200 * (i + 1)}
            >
              {article.image && (
                <img src={article.image} alt={getField(article, 'title')} className="news-card-image" />
              )}
              <div className="news-card-content">
                <div className="news-card-date">{formatDate(article.published_at)}</div>
                <h3>{getField(article, 'title')}</h3>
                <p>{getField(article, 'excerpt')}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
