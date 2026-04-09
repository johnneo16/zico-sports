import { useState, useEffect } from 'react';
import Logo from './Logo';
import { BRANDS, SURFACE_OPTIONS } from '../constants';
import { formatPrice } from '../utils/format';
import { supabase } from '../lib/supabase';
import './AdminPanel.css';

/**
 * Admin panel for managing products — add, edit, delete boots.
 * Fully integrated with Supabase for persistence and image uploads.
 */
export default function AdminPanel({ products, setProducts, onExit }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Always fetch fresh products directly from Supabase when admin panel opens
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      if (!error && data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const startEdit = (product) => {
    setEditing(product.id);
    setAdding(false);
    setForm({ ...product });
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({
      name: '',
      brand: 'Nike',
      price: '',
      original_price: '',
      description: '',
      surface: 'FG',
      stock: '',
      hot: false,
      rating: 4.5,
      reviews: 0,
      image: '',
    });
  };

  const cancel = () => {
    setEditing(null);
    setAdding(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `prod-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      updateField('image', publicData.publicUrl);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    const item = {
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      description: form.description,
      surface: form.surface,
      stock: Number(form.stock),
      hot: form.hot || false,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      image: form.image || null,
    };

    try {
      if (adding) {
        const { data, error } = await supabase.from('products').insert(item).select().single();
        if (error) throw error;
        setProducts((prev) => [...prev, data]);
      } else {
        const { data, error } = await supabase.from('products').update(item).eq('id', editing).select().single();
        if (error) throw error;
        setProducts((prev) => prev.map((x) => (x.id === editing ? data : x)));
      }
      cancel();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Save failed', err);
      alert('Failed to save: ' + err.message);
    }
  };

  const remove = async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete: ' + err.message);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isOpen = editing !== null || adding;

  const inputFields = [
    { key: 'name', label: 'Product Name', type: 'text' },
    { key: 'price', label: 'Price (₹)', type: 'number' },
    { key: 'original_price', label: 'Original Price (₹) — optional', type: 'number' },
    { key: 'stock', label: 'Stock Quantity', type: 'number' },
    { key: 'rating', label: 'Rating (0–5)', type: 'number' },
    { key: 'reviews', label: 'Review Count', type: 'number' },
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
            {loading ? 'LOADING PRODUCTS…' : `ALL PRODUCTS (${products.length})`}
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
                  style={{ background: 'var(--bg-studio-radial)' }}
                >
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '24px' }}>{p.emoji || '👟'}</span>
                  )}
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

            {/* Preview Area Studio Style */}
            <div
              className="admin__editor-preview"
              style={{ background: 'var(--bg-studio-radial)', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {form.image ? (
                <img src={form.image} alt="Preview" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} />
              ) : (
                <span className="admin__editor-preview-emoji">
                  {form.emoji || '👟'}
                </span>
              )}
            </div>

            {/* Image Upload */}
            <div className="admin__field">
              <label className="admin__label">PRODUCT IMAGE (REAL PHOTO)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="admin__input" 
                style={{ padding: '8px' }}
              />
              {uploading && <span style={{ fontSize: '12px', color: 'var(--accent-blue)', marginTop: '4px', display: 'block' }}>Uploading...</span>}
              <input
                type="text"
                value={form.image || ''}
                onChange={(e) => updateField('image', e.target.value)}
                className="admin__input admin__input--small"
                placeholder="Or paste an image URL..."
                style={{ marginTop: '8px' }}
              />
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
