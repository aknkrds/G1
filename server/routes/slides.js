const express = require('express');
const db = require('../db/database');
const router = express.Router();

router.get('/', (req, res) => {
  const slides = db.prepare('SELECT * FROM slides WHERE active = 1 ORDER BY sort_order').all();
  res.json(slides);
});

module.exports = router;
