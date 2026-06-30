const express = require('express');
const db = require('../db/database');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const router = express.Router();

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  }
});

// Contact form (general)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    db.prepare(`
      INSERT INTO contact_messages (name, email, phone, message, type)
      VALUES (?, ?, ?, ?, 'contact')
    `).run(name, email, phone || null, message || null);

    res.json({ success: true, message: 'Message saved' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Quote request with images — sent to sales@gampas.net
router.post('/quote', upload.array('images', 5), async (req, res) => {
  try {
    const { name, email, phone, note } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email and phone are required' });
    }

    const imageFiles = req.files ? req.files.map(f => f.filename) : [];

    // Save to database
    db.prepare(`
      INSERT INTO contact_messages (name, email, phone, message, type, images)
      VALUES (?, ?, ?, ?, 'quote', ?)
    `).run(name, email, phone, note || null, JSON.stringify(imageFiles));

    // Send email
    try {
      const transporter = createTransporter();

      const attachments = req.files ? req.files.map(f => ({
        filename: f.originalname,
        path: f.path,
      })) : [];

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@gampas.net',
        to: 'sales@gampas.net',
        subject: `Yeni Fiyat Teklifi Talebi - ${name}`,
        html: `
          <h2>Yeni Fiyat Teklifi Talebi</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ad Soyad</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-posta</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Not</td><td style="padding:8px;border:1px solid #ddd">${note || '-'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ek Görsel</td><td style="padding:8px;border:1px solid #ddd">${imageFiles.length} adet</td></tr>
          </table>
        `,
        attachments,
      });
    } catch (mailErr) {
      console.warn('Email sending failed (SMTP not configured?):', mailErr.message);
    }

    res.json({ success: true, message: 'Quote request saved and email sent' });
  } catch (err) {
    console.error('Quote error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/custom-box', async (req, res) => {
  try {
    const {
      shape,
      diameter,
      width,
      length,
      height,
      hasLid,
      quantity,
      note,
      name,
      email,
      phone,
    } = req.body;

    const hasValidSize = shape === 'round'
      ? Boolean(diameter && height)
      : Boolean(width && length && height);

    if (!shape || !hasValidSize || hasLid === '' || !quantity || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const shapeMap = {
      square: 'Kare',
      round: 'Yuvarlak',
      rectangle: 'Dikdortgen',
      oval: 'Oval',
      custom: 'Ozel Kutu',
      tray: 'Tepsi',
    };
    const shapeLabel = shapeMap[shape] || shape;

    const sizeLines = shape === 'round'
      ? [`Cap: ${diameter}`, `Yukseklik: ${height}`]
      : [`En: ${width}`, `Boy: ${length}`, `Yukseklik: ${height}`];

    const summary = [
      `Sekil: ${shapeLabel}`,
      ...sizeLines,
      `Kapak: ${hasLid === 'yes' ? 'Var' : 'Yok'}`,
      `Adet: ${quantity}`,
      `Not: ${note || '-'}`,
    ].join('\n');

    db.prepare(`
      INSERT INTO contact_messages (name, email, phone, message, type)
      VALUES (?, ?, ?, ?, 'custom-box')
    `).run(name, email, phone, summary);

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@gampas.net',
        to: 'sales@gampas.net',
        subject: `Benim Kutum Talebi - ${name}`,
        html: `
          <h2>Benim Kutum Talebi</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ad Soyad</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-posta</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Sekil</td><td style="padding:8px;border:1px solid #ddd">${shapeLabel}</td></tr>
            ${shape === 'round'
              ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Cap</td><td style="padding:8px;border:1px solid #ddd">${diameter}</td></tr>
                 <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Yukseklik</td><td style="padding:8px;border:1px solid #ddd">${height}</td></tr>`
              : `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">En</td><td style="padding:8px;border:1px solid #ddd">${width}</td></tr>
                 <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Boy</td><td style="padding:8px;border:1px solid #ddd">${length}</td></tr>
                 <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Yukseklik</td><td style="padding:8px;border:1px solid #ddd">${height}</td></tr>`}
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Kapak</td><td style="padding:8px;border:1px solid #ddd">${hasLid === 'yes' ? 'Var' : 'Yok'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Adet</td><td style="padding:8px;border:1px solid #ddd">${quantity}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Not</td><td style="padding:8px;border:1px solid #ddd">${note || '-'}</td></tr>
          </table>
        `,
      });
    } catch (mailErr) {
      console.warn('Custom box email sending failed (SMTP not configured?):', mailErr.message);
    }

    res.json({ success: true, message: 'Custom box request sent' });
  } catch (err) {
    console.error('Custom box error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
