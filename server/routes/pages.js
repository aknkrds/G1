const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.get('/:slug', (req, res) => {
  const page = db.prepare('SELECT * FROM pages WHERE slug = ?').get(req.params.slug);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});

module.exports = router;
