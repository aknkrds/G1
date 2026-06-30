const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.get('/', (req, res) => {
  const news = db.prepare('SELECT * FROM news WHERE active = 1 ORDER BY published_at DESC').all();
  res.json(news);
});

router.get('/:slug', (req, res) => {
  const article = db.prepare('SELECT * FROM news WHERE slug = ?').get(req.params.slug);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

module.exports = router;
