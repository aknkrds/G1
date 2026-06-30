import { useMemo, useRef, useState } from 'react';
import { useI18n } from '../../i18n';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const BOX_SHAPES = ['square', 'round', 'rectangle', 'oval', 'custom', 'tray'];

export default function FloatingQuote() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [boxStatus, setBoxStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [boxStep, setBoxStep] = useState(0);
  const [boxForm, setBoxForm] = useState({
    shape: '',
    diameter: '',
    width: '',
    length: '',
    height: '',
    hasLid: '',
    quantity: '',
    note: '',
    name: '',
    email: '',
    phone: '',
  });
  const fileRef = useRef();

  const boxSteps = useMemo(() => [
    t('myBox.stepShape'),
    t('myBox.stepSize'),
    t('myBox.stepLid'),
    t('myBox.stepQuantity'),
    t('myBox.stepNote'),
    t('myBox.stepContact'),
  ], [t]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBoxChange = (e) => {
    setBoxForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetBoxFlow = () => {
    setBoxStep(0);
    setBoxStatus(null);
    setBoxForm({
      shape: '',
      diameter: '',
      width: '',
      length: '',
      height: '',
      hasLid: '',
      quantity: '',
      note: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 5 - images.length;
    const newFiles = files.slice(0, remaining);

    setImages(prev => [...prev, ...newFiles]);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, { name: file.name, url: reader.result }]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;

    setStatus('sending');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email);
      formData.append('note', form.note);
      images.forEach(img => formData.append('images', img));

      const res = await fetch(`${API}/contact/quote`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', note: '' });
        setImages([]);
        setPreviews([]);
        setTimeout(() => {
          setStatus(null);
          setOpen(false);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const isBoxStepValid = () => {
    if (boxStep === 0) return Boolean(boxForm.shape);
    if (boxStep === 1) {
      if (boxForm.shape === 'round') {
        return Boolean(boxForm.diameter && boxForm.height);
      }
      return Boolean(boxForm.width && boxForm.length && boxForm.height);
    }
    if (boxStep === 2) return boxForm.hasLid !== '';
    if (boxStep === 3) return Boolean(boxForm.quantity);
    if (boxStep === 4) return true;
    if (boxStep === 5) return Boolean(boxForm.name && boxForm.email && boxForm.phone);
    return false;
  };

  const handleNextBoxStep = () => {
    if (!isBoxStepValid()) return;
    setBoxStep(prev => Math.min(prev + 1, boxSteps.length - 1));
  };

  const handlePrevBoxStep = () => {
    setBoxStep(prev => Math.max(prev - 1, 0));
  };

  const handleBoxSubmit = async (e) => {
    e.preventDefault();
    if (!isBoxStepValid()) return;

    setBoxStatus('sending');

    try {
      const res = await fetch(`${API}/contact/custom-box`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boxForm),
      });

      if (res.ok) {
        setBoxStatus('success');
      } else {
        setBoxStatus('error');
      }
    } catch {
      setBoxStatus('error');
    }
  };

  const renderBoxStep = () => {
    if (boxStatus === 'success') {
      return <div className="box-request-success">{t('myBox.success')}</div>;
    }

    if (boxStep === 0) {
      return (
        <div className="box-shape-grid">
          {BOX_SHAPES.map(shape => (
            <button
              key={shape}
              type="button"
              className={`box-shape-option ${boxForm.shape === shape ? 'selected' : ''}`}
              onClick={() => setBoxForm(prev => ({ ...prev, shape }))}
            >
              {t(`myBox.shapes.${shape}`)}
            </button>
          ))}
        </div>
      );
    }

    if (boxStep === 1) {
      if (boxForm.shape === 'round') {
        return (
          <div className="box-dimensions-grid box-dimensions-grid-round">
            <input
              type="text"
              name="diameter"
              value={boxForm.diameter}
              onChange={handleBoxChange}
              placeholder={t('myBox.diameter')}
            />
            <input
              type="text"
              name="height"
              value={boxForm.height}
              onChange={handleBoxChange}
              placeholder={t('myBox.height')}
            />
          </div>
        );
      }

      return (
        <div className="box-dimensions-grid">
          <input
            type="text"
            name="width"
            value={boxForm.width}
            onChange={handleBoxChange}
            placeholder={t('myBox.width')}
          />
          <input
            type="text"
            name="length"
            value={boxForm.length}
            onChange={handleBoxChange}
            placeholder={t('myBox.length')}
          />
          <input
            type="text"
            name="height"
            value={boxForm.height}
            onChange={handleBoxChange}
            placeholder={t('myBox.height')}
          />
        </div>
      );
    }

    if (boxStep === 2) {
      return (
        <div className="box-choice-row">
          <button
            type="button"
            className={`box-choice-btn ${boxForm.hasLid === 'yes' ? 'selected' : ''}`}
            onClick={() => setBoxForm(prev => ({ ...prev, hasLid: 'yes' }))}
          >
            {t('myBox.yes')}
          </button>
          <button
            type="button"
            className={`box-choice-btn ${boxForm.hasLid === 'no' ? 'selected' : ''}`}
            onClick={() => setBoxForm(prev => ({ ...prev, hasLid: 'no' }))}
          >
            {t('myBox.no')}
          </button>
        </div>
      );
    }

    if (boxStep === 3) {
      return (
        <div className="quote-field">
          <label>{t('myBox.quantity')}</label>
          <input
            type="number"
            min="1"
            name="quantity"
            value={boxForm.quantity}
            onChange={handleBoxChange}
            placeholder={t('myBox.quantity')}
          />
        </div>
      );
    }

    if (boxStep === 4) {
      return (
        <div className="quote-field">
          <label>{t('quote.note')}</label>
          <textarea
            name="note"
            value={boxForm.note}
            onChange={handleBoxChange}
            placeholder={t('myBox.notePlaceholder')}
            rows="5"
          />
        </div>
      );
    }

    return (
      <div className="box-contact-grid">
        <div className="quote-field">
          <label>{t('quote.name')} *</label>
          <input type="text" name="name" value={boxForm.name} onChange={handleBoxChange} placeholder={t('quote.name')} />
        </div>
        <div className="quote-field">
          <label>{t('quote.email')} *</label>
          <input type="email" name="email" value={boxForm.email} onChange={handleBoxChange} placeholder="email@example.com" />
        </div>
        <div className="quote-field">
          <label>{t('quote.phone')} *</label>
          <input type="tel" name="phone" value={boxForm.phone} onChange={handleBoxChange} placeholder="+90 5XX XXX XX XX" />
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        className="floating-custom-btn"
        onClick={() => {
          resetBoxFlow();
          setBoxOpen(true);
        }}
        aria-label={t('myBox.title')}
      >
        {t('myBox.title')}
      </button>

      <button
        className="floating-quote-btn"
        onClick={() => setOpen(true)}
        aria-label={t('quote.title')}
      >
        {t('nav.getQuote')}
      </button>

      {/* Modal overlay */}
      <div
        className={`quote-overlay ${open ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      >
        <div className="quote-modal">
          <div className="quote-modal-header">
            <h2>{t('quote.title')}</h2>
            <button className="quote-close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="quote-field">
              <label>{t('quote.name')} *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder={t('quote.name')}
              />
            </div>

            <div className="quote-field">
              <label>{t('quote.phone')} *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+90 5XX XXX XX XX"
              />
            </div>

            <div className="quote-field">
              <label>{t('quote.email')} *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
              />
            </div>

            <div className="quote-field">
              <label>{t('quote.note')}</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder={t('quote.note')}
                rows="3"
              />
            </div>

            {/* Image upload */}
            <div className="quote-field">
              <label>{t('quote.images')}</label>
              <div
                className="quote-upload"
                onClick={() => fileRef.current?.click()}
              >
                <div className="quote-upload-label">
                  <strong>📎 {images.length < 5 ? t('quote.images') : `${images.length}/5`}</strong>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageAdd}
                  disabled={images.length >= 5}
                />
              </div>

              {previews.length > 0 && (
                <div className="quote-previews">
                  {previews.map((p, i) => (
                    <div key={i} className="quote-preview">
                      <img src={p.url} alt={p.name} />
                      <button
                        type="button"
                        className="quote-preview-remove"
                        onClick={() => removeImage(i)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {status === 'success' && (
              <div className="quote-message success">{t('quote.success')}</div>
            )}
            {status === 'error' && (
              <div className="quote-message error">{t('quote.error')}</div>
            )}

            <button
              type="submit"
              className="quote-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('quote.sending') : t('quote.send')}
            </button>
          </form>
        </div>
      </div>

      <div
        className={`quote-overlay ${boxOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setBoxOpen(false);
            resetBoxFlow();
          }
        }}
      >
        <div className="quote-modal box-request-modal">
          <div className="quote-modal-header">
            <div>
              <h2>{t('myBox.title')}</h2>
              <p className="box-request-step-label">
                {t('myBox.step')} {Math.min(boxStep + 1, boxSteps.length)} / {boxSteps.length}
              </p>
            </div>
            <button
              className="quote-close-btn"
              onClick={() => {
                setBoxOpen(false);
                resetBoxFlow();
              }}
            >
              ✕
            </button>
          </div>

          {boxStatus !== 'success' && (
            <div className="box-request-progress">
              <div className="box-request-progress-bar" style={{ width: `${((boxStep + 1) / boxSteps.length) * 100}%` }} />
            </div>
          )}

          <form className="quote-form" onSubmit={handleBoxSubmit}>
            {boxStatus !== 'success' && (
              <div className="box-request-step-title">{boxSteps[boxStep]}</div>
            )}

            {renderBoxStep()}

            {boxStatus === 'error' && (
              <div className="quote-message error">{t('quote.error')}</div>
            )}

            <div className="box-request-actions">
              {boxStatus === 'success' ? (
                <button
                  type="button"
                  className="quote-submit-btn"
                  onClick={() => {
                    setBoxOpen(false);
                    resetBoxFlow();
                  }}
                >
                  {t('quote.close')}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="box-request-secondary"
                    onClick={handlePrevBoxStep}
                    disabled={boxStep === 0 || boxStatus === 'sending'}
                  >
                    {t('myBox.back')}
                  </button>

                  {boxStep === boxSteps.length - 1 ? (
                    <button type="submit" className="quote-submit-btn" disabled={!isBoxStepValid() || boxStatus === 'sending'}>
                      {boxStatus === 'sending' ? t('quote.sending') : t('quote.send')}
                    </button>
                  ) : (
                    <button type="button" className="quote-submit-btn" disabled={!isBoxStepValid()} onClick={handleNextBoxStep}>
                      {t('myBox.next')}
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
