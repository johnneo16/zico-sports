import { useState } from 'react';
import Logo from './Logo';
import { BRANDS, SURFACE_OPTIONS, GRADIENT_PRESETS } from '../constants';
import { formatPrice } from '../utils/format';
import './AdminPanel.css';

/**
 * Admin panel for managing products — add, edit, delete boots.
 */
export default function AdminPanel({ products, setProducts, onExit }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  const startEdit = (product) => {
    setEditing(product.id);
    setAdding(false);
    setForm({ ...product });
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({
      id: Date.now(),
      name: '',
      brand: 'Nike',
      price: '',
      originalPrice: '',
      description: '',
      surface: 'FG',
      stock: '',
      hot: false,
      rating: 4.5,
      reviews: 0,
      gradient: GRADIENT_PRESETS[0].value,
      emoji: '👟',
    });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
  };

  const save = () => {
    const item = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
    };
    if (adding) {
      setProducts((prev) => [...prev, item]);
    } else {
      setProducts((prev) =>
        prev.map((x) => (x.id === editing ? item : x))
      );
    }
    cancel();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = (id) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isOpen = editing !== null || adding;

  const inputFields = [
    { key: 'name', label: 'Product Name', type: 'text' },
    { key: 'price', label: 'Price (₹)', type: 'number' },
    { key: 'originalPrice', label: 'Original Price (₹) — optional', type: 'number' },
    { key: 'stock', label: 'Stock Quantity', type: 'number' },
    { key: 'rating', label: 'Rating (0–5)', type: 'number' },
    { key: 'reviews', label: 'Review Count', type: 'number' },
    { key: 'emoji', label: 'Emoji Icon', type: 'text' },
  ];

  return (
    <div className="admin">
      {/* Header */}
      <div className="admin__header">
        <div className="admin__header-left">
          <Logo size={34} />
          <div>
            <div className="admin__title">ZICO SPORTS — ADMIN</div>
            <div className="admin__subtitle">PRODUCT MANAGER</div>
          </div>
          {saved && <span className="admin__saved-badge">✓ Changes saved!</span>}
        </div>
        <div className="admin__header-actions">
          <button className="admin__add-btn" onClick={startAdd}>
            + ADD BOOT
          </button>
          <button className="admin__exit-btn" onClick={onExit}>
            ← VIEW STORE
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="admin__content">
        {/* Product List */}
        <div className="admin__list">
          <div className="admin__list-title">
            ALL PRODUCTS ({products.length})
          </div>
          <div className="admin__products">
            {products.map((p) => (
              <div
                key={p.id}
                className={`admin__product ${
                  editing === p.id ? 'admin__product--active' : ''
                }`}
              >
                <div
                  className="admin__product-thumb"
                  style={{ background: p.gradient }}
                >
                  {p.emoji}
                </div>
                <div className="admin__product-info">
                  <div className="admin__product-name">{p.name}</div>
                  <div className="admin__product-meta">
                    {p.brand} · {p.surface} · Stock: {p.stock}
                    {p.hot ? ' · 🔥' : ''}
                  </div>
                </div>
                <div className="admin__product-price">
                  {formatPrice(p.price)}
                </div>
                <button
                  className="admin__edit-btn"
                  onClick={() => startEdit(p)}
                >
                  EDIT
                </button>
                <button
                  className="admin__delete-btn"
                  onClick={() => remove(p.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Panel */}
        {isOpen && (
          <div className="admin__editor animate-slide-in">
            <div className="admin__editor-title">
              {adding ? 'NEW PRODUCT' : 'EDIT PRODUCT'}
            </div>

            {/* Preview */}
            <div
              className="admin__editor-preview"
              style={{ background: form.gradient || GRADIENT_PRESETS[0].value }}
            >
              <span className="admin__editor-preview-emoji">
                {form.emoji || '👟'}
              </span>
            </div>

            {inputFields.map(({ key, label, type }) => (
              <div key={key} className="admin__field">
                <label className="admin__label">{label.toUpperCase()}</label>
                <input
                  type={type}
                  value={form[key] ?? ''}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="admin__input"
                />
              </div>
            ))}

            <div className="admin__field">
              <label className="admin__label">BRAND</label>
              <select
                value={form.brand || 'Nike'}
                onChange={(e) => updateField('brand', e.target.value)}
                className="admin__select"
              >
                {BRANDS.filter((b) => b !== 'All').map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="admin__field">
              <label className="admin__label">SURFACE TYPE</label>
              <select
                value={form.surface || 'FG'}
                onChange={(e) => updateField('surface', e.target.value)}
                className="admin__select"
              >
                {SURFACE_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="admin__field">
              <label className="admin__label">CARD GRADIENT</label>
              <div className="admin__gradient-picker">
                {GRADIENT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    className={`admin__gradient-swatch ${
                      form.gradient === preset.value
                        ? 'admin__gradient-swatch--active'
                        : ''
                    }`}
                    style={{ background: preset.value }}
                    onClick={() => updateField('gradient', preset.value)}
                    title={preset.label}
                  />
                ))}
              </div>
              <input
                value={form.gradient || ''}
                onChange={(e) => updateField('gradient', e.target.value)}
                className="admin__input admin__input--small"
                placeholder="Custom CSS gradient..."
              />
            </div>

            <div className="admin__field">
              <label className="admin__label">DESCRIPTION</label>
              <textarea
                rows={4}
                value={form.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                className="admin__textarea"
              />
            </div>

            <div className="admin__field admin__field--checkbox">
              <input
                type="checkbox"
                id="hotcheck"
                checked={!!form.hot}
                onChange={(e) => updateField('hot', e.target.checked)}
                className="admin__checkbox"
              />
              <label htmlFor="hotcheck" className="admin__checkbox-label">
                Mark as 🔥 HOT / Featured
              </label>
            </div>

            <div className="admin__editor-actions">
              <button className="admin__save-btn" onClick={save}>
                SAVE
              </button>
              <button className="admin__cancel-btn" onClick={cancel}>
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
