import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { BRANDS, SURFACE_OPTIONS, CATEGORIES } from '../constants';
import { formatPrice } from '../utils/format';
import { supabase } from '../lib/supabase';
import './AdminPanel.css';

/**
 * AdminPanel — product manager with multi-image carousel support.
 *
 * Supabase schema requirement (run once in Supabase SQL editor):
 *   ALTER TABLE products ADD COLUMN IF NOT EXISTS images text[];
 *
 * images[] stores all shots; the first item is also mirrored to `image`
 * for backwards compatibility with any code that still reads the single field.
 */
export default function AdminPanel({ products, setProducts, onExit }) {
  const [editing,        setEditing]        = useState(null);
  const [adding,         setAdding]         = useState(false);
  const [form,           setForm]           = useState({});
  const [saved,          setSaved]          = useState(false);
  const [uploadingIdx,   setUploadingIdx]   = useState(null); // index being uploaded, or 'new'
  const [loading,        setLoading]        = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const fileRef = useRef(null);

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

  /* ── helpers ── */
  const getImages = (f = form) => {
    if (Array.isArray(f.images) && f.images.length) return f.images;
    if (f.image) return [f.image];
    return [];
  };

  const setImages = (imgs) => {
    setForm(prev => ({
      ...prev,
      images: imgs,
      image: imgs[0] || null,   // keep `image` in sync for backwards compat
    }));
  };

  /* ── lifecycle ── */
  const startEdit = (product) => {
    setEditing(product.id);
    setAdding(false);
    const imgs = Array.isArray(product.images) && product.images.length
      ? product.images
      : product.image ? [product.image] : [];
    setForm({ ...product, images: imgs });
  };

  const startAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({
      name: '', brand: 'Nike', price: '', original_price: '',
      description: '', surface: 'FG', stock: '', hot: false,
      rating: 4.5, reviews: 0, image: null, images: [], category: 'Boots',
    });
  };

  const cancel = () => { setEditing(null); setAdding(false); };

  /* ── image upload ── */
  const uploadFile = async (file) => {
    const ext      = file.name.split('.').pop();
    const fileName = `prod-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  /** Upload one or more new images and append them to the list */
  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingIdx('new');
    try {
      const urls = await Promise.all(files.map(uploadFile));
      setImages([...getImages(), ...urls]);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingIdx(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  /** Replace a specific shot by index */
  const handleReplaceImage = async (e, idx) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const url     = await uploadFile(file);
      const updated = [...getImages()];
      updated[idx]  = url;
      setImages(updated);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  /** Remove a shot by index */
  const removeImage = (idx) => {
    const updated = getImages().filter((_, i) => i !== idx);
    setImages(updated);
  };

  /** Reorder — move left */
  const moveLeft = (idx) => {
    if (idx === 0) return;
    const arr = [...getImages()];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setImages(arr);
  };

  /* ── save ── */
  const save = async () => {
    const imgs = getImages();
    const item = {
      name:           form.name,
      brand:          form.brand,
      price:          Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      description:    form.description,
      surface:        form.surface,
      stock:          Number(form.stock),
      hot:            form.hot || false,
      rating:         Number(form.rating),
      reviews:        Number(form.reviews),
      image:          imgs[0] || null,
      images:         imgs,
      category:       form.category || 'Boots',
    };

    try {
      if (adding) {
        const { data, error } = await supabase.from('products').insert(item).select().single();
        if (error) throw error;
        setProducts(prev => [...prev, data]);
      } else {
        const { data, error } = await supabase.from('products').update(item).eq('id', editing).select().single();
        if (error) throw error;
        setProducts(prev => prev.map(x => x.id === editing ? data : x));
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
    if (!confirm('Delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(x => x.id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const isOpen = editing !== null || adding;

  const inputFields = [
    { key: 'name',           label: 'Product Name',              type: 'text'   },
    { key: 'price',          label: 'Price (₹)',                  type: 'number' },
    { key: 'original_price', label: 'Original Price (₹) — optional', type: 'number' },
    { key: 'stock',          label: 'Stock Quantity',            type: 'number' },
    { key: 'rating',         label: 'Rating (0–5)',              type: 'number' },
    { key: 'reviews',        label: 'Review Count',              type: 'number' },
  ];

  const images = getImages();

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
          <button className="admin__add-btn" onClick={startAdd}>+ ADD PRODUCT</button>
          <button className="admin__exit-btn" onClick={onExit}>← VIEW STORE</button>
        </div>
      </div>

      {/* Content */}
      <div className="admin__content">
        {/* Product List */}
        <div className="admin__list">
          <div className="admin__list-header">
            <div className="admin__list-title">
              {loading ? 'LOADING PRODUCTS…' : `ALL PRODUCTS (${products.length})`}
            </div>
            <div className="admin__filters">
              {['All', 'Boots', 'Jerseys'].map(cat => (
                <button
                  key={cat}
                  className={`admin__filter-btn ${categoryFilter === cat ? 'admin__filter-btn--active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="admin__products">
            {products
              .filter(p => categoryFilter === 'All' || (p.category || 'Boots') === categoryFilter)
              .map(p => {
                const thumb = (Array.isArray(p.images) && p.images[0]) || p.image;
                const shotCount = Array.isArray(p.images) ? p.images.length : (p.image ? 1 : 0);
                return (
                  <div key={p.id} className={`admin__product ${editing === p.id ? 'admin__product--active' : ''}`}>
                    <div className="admin__product-thumb" style={{ background: 'var(--bg-studio-radial)', position: 'relative' }}>
                      {thumb
                        ? <img src={thumb} alt={p.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        : <span style={{ fontSize: '24px' }}>{p.emoji || '👟'}</span>}
                      {shotCount > 1 && (
                        <span className="admin__product-shot-count">{shotCount} shots</span>
                      )}
                    </div>
                    <div className="admin__product-info">
                      <div className="admin__product-name">
                        <span className="admin__category-tag">{(p.category || 'Boots').toUpperCase()}</span> {p.name}
                      </div>
                      <div className="admin__product-meta">
                        {p.brand} · {(p.category || 'Boots') === 'Boots' ? p.surface : 'Kit'} · Stock: {p.stock}
                        {p.hot ? ' · 🔥' : ''}
                      </div>
                    </div>
                    <div className="admin__product-price">{formatPrice(p.price)}</div>
                    <button className="admin__edit-btn"   onClick={() => startEdit(p)}>EDIT</button>
                    <button className="admin__delete-btn" onClick={() => remove(p.id)}>✕</button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Editor */}
        {isOpen && (
          <div className="admin__editor animate-slide-in">
            <div className="admin__editor-title">{adding ? 'NEW PRODUCT' : 'EDIT PRODUCT'}</div>

            {/* ── Multi-image gallery ── */}
            <div className="admin__field">
              <label className="admin__label">
                PRODUCT IMAGES
                <span className="admin__label-hint"> — first shot = cover · drag to reorder</span>
              </label>

              {/* Existing shots */}
              <div className="admin__img-gallery">
                {images.map((url, idx) => (
                  <div key={url + idx} className={`admin__img-slot ${idx === 0 ? 'admin__img-slot--cover' : ''}`}>
                    <img src={url} alt={`Shot ${idx + 1}`} className="admin__img-thumb" />
                    {idx === 0 && <span className="admin__img-cover-badge">COVER</span>}

                    <div className="admin__img-actions">
                      {idx > 0 && (
                        <button className="admin__img-btn" onClick={() => moveLeft(idx)} title="Move left (set as cover)">←</button>
                      )}
                      {/* Replace this shot */}
                      <label className="admin__img-btn" title="Replace this shot">
                        ✎
                        <input type="file" accept="image/*" style={{ display: 'none' }}
                          onChange={e => handleReplaceImage(e, idx)} />
                        {uploadingIdx === idx && <span className="admin__img-uploading">…</span>}
                      </label>
                      <button className="admin__img-btn admin__img-btn--danger" onClick={() => removeImage(idx)} title="Remove">✕</button>
                    </div>
                  </div>
                ))}

                {/* Add-more slot */}
                <label className={`admin__img-slot admin__img-slot--add ${uploadingIdx === 'new' ? 'admin__img-slot--uploading' : ''}`}>
                  {uploadingIdx === 'new' ? (
                    <span className="admin__img-uploading-text">Uploading…</span>
                  ) : (
                    <>
                      <span className="admin__img-add-icon">+</span>
                      <span className="admin__img-add-label">ADD SHOTS</span>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleAddImages}
                  />
                </label>
              </div>

              {/* Paste URL fallback */}
              <input
                type="text"
                className="admin__input admin__input--small"
                placeholder="Or paste an image URL and press Enter…"
                style={{ marginTop: 8 }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setImages([...images, e.target.value.trim()]);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            {/* Text / number fields */}
            {inputFields.map(({ key, label, type }) => (
              <div key={key} className="admin__field">
                <label className="admin__label">{label.toUpperCase()}</label>
                <input type={type} value={form[key] ?? ''} onChange={e => updateField(key, e.target.value)} className="admin__input" />
              </div>
            ))}

            <div className="admin__field">
              <label className="admin__label">BRAND</label>
              <select value={form.brand || 'Nike'} onChange={e => updateField('brand', e.target.value)} className="admin__select">
                {BRANDS.filter(b => b !== 'All').map(b => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div className="admin__field">
              <label className="admin__label">CATEGORY</label>
              <select value={form.category || 'Boots'} onChange={e => updateField('category', e.target.value)} className="admin__select">
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>

            {form.category === 'Boots' && (
              <div className="admin__field">
                <label className="admin__label">SURFACE TYPE</label>
                <select value={form.surface || 'FG'} onChange={e => updateField('surface', e.target.value)} className="admin__select">
                  {SURFACE_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            )}

            <div className="admin__field">
              <label className="admin__label">DESCRIPTION</label>
              <textarea rows={4} value={form.description || ''} onChange={e => updateField('description', e.target.value)} className="admin__textarea" />
            </div>

            <div className="admin__field admin__field--checkbox">
              <input type="checkbox" id="hotcheck" checked={!!form.hot} onChange={e => updateField('hot', e.target.checked)} className="admin__checkbox" />
              <label htmlFor="hotcheck" className="admin__checkbox-label">Mark as 🔥 HOT / Featured</label>
            </div>

            <div className="admin__editor-actions">
              <button className="admin__save-btn" onClick={save}>SAVE</button>
              <button className="admin__cancel-btn" onClick={cancel}>CANCEL</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
