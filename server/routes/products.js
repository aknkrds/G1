const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.get('/categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  res.json(categories);
});

router.get('/', (req, res) => {
  const products = db.prepare(`
    SELECT p.*, c.slug as category_slug, c.name_tr as category_name_tr, c.name_en as category_name_en, c.name_ar as category_name_ar
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.sort_order
  `).all();
  res.json(products);
});

router.get('/category/:slug', (req, res) => {
  const category = db.prepare('SELECT * FROM categories WHERE slug = ?').get(req.params.slug);
  if (!category) return res.status(404).json({ error: 'Category not found' });

  const products = db.prepare('SELECT * FROM products WHERE category_id = ? ORDER BY sort_order').all(category.id);
  res.json({ category, products });
});

router.get('/:slug', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
