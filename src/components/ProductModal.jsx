import { useState, useRef } from 'react';
import { X, ShoppingBag, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Stars from './Stars';
import { formatPrice, getDiscount } from '../utils/format';
import './ProductModal.css';

/**
 * Full product detail modal with image carousel in the hero area.
 */
export default function ProductModal({ product, onClose, onAddCart }) {
  const [imgIdx,  setImgIdx]  = useState(0);
  const [fading,  setFading]  = useState(false);
  const swipeOrigin           = useRef(null);

  if (!product) return null;
  const discount = getDiscount(product.price, product.original_price);

  // Normalise images — same logic as ProductCard
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : product.image ? [product.image] : [];
  const hasMultiple = images.length > 1;

  const goTo = (raw, e) => {
    e?.stopPropagation();
    if (fading || !hasMultiple) return;
    const next = ((raw % images.length) + images.length) % images.length;
    if (next === imgIdx) return;
    setFading(true);
    setTimeout(() => { setImgIdx(next); setFading(false); }, 160);
  };

  const onPointerDown = (e) => { swipeOrigin.current = e.clientX; };
  const onPointerUp   = (e) => {
    if (swipeOrigin.current === null) return;
    const dx = e.clientX - swipeOrigin.current;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? imgIdx + 1 : imgIdx - 1);
    swipeOrigin.current = null;
  };

  return (
    <div className="product-modal__overlay" onClick={onClose}>
      <div
        className="product-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Hero / Image carousel ── */}
        <div
          className="product-modal__hero"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{ userSelect: 'none' }}
        >
          <div className="product-modal__hero-overlay">
            {images.length > 0 ? (
              <img
                key={imgIdx}
                src={images[imgIdx]}
                alt={`${product.name} — view ${imgIdx + 1}`}
                className={`product-modal__photo ${fading ? 'product-modal__photo--fading' : ''}`}
                loading="lazy"
                draggable={false}
              />
            ) : (
              <span className="product-modal__emoji">{product.emoji || '👟'}</span>
            )}

            {/* Surface badge */}
            {(product.category || 'Boots') === 'Boots' && (
              <div className="product-modal__surface">{product.surface}</div>
            )}

            {/* Carousel controls */}
            {hasMultiple && (
              <>
                <button
                  className="product-modal__img-nav product-modal__img-nav--prev"
                  onClick={(e) => goTo(imgIdx - 1, e)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="product-modal__img-nav product-modal__img-nav--next"
                  onClick={(e) => goTo(imgIdx + 1, e)}
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>
                <div className="product-modal__img-dots" aria-hidden="true">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`product-modal__img-dot ${i === imgIdx ? 'product-modal__img-dot--active' : ''}`}
                      onClick={(e) => goTo(i, e)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Close button */}
          <button className="product-modal__close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="product-modal__body">
          <div className="product-modal__brand">
            {product.brand.toUpperCase()} · {(product.category || 'Boots').toUpperCase()}
          </div>
          <h2 className="product-modal__name">{product.name}</h2>
          <Stars rating={product.rating} />

          <div className="product-modal__desc-wrap">
            <p className="product-modal__desc">{product.description}</p>
          </div>

          <div className="product-modal__size-selector">
            <span className="product-modal__size-label">SELECT SIZE</span>
            <div className="product-modal__sizes">
              {(product.category || 'Boots') === 'Jerseys'
                ? ['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <button key={s} className="product-modal__size-btn">{s}</button>
                  ))
                : ['7.5', '8.5', '9.5', '10.5', '11.5'].map((s) => (
                    <button key={s} className="product-modal__size-btn">{s}</button>
                  ))}
            </div>
          </div>

          <div className="product-modal__actions">
            <div className="product-modal__pricing">
              <span className="product-modal__price">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="product-modal__original-price">
                    {formatPrice(product.original_price)}
                  </span>
                  <span className="product-modal__discount">-{discount}%</span>
                </>
              )}
            </div>
            <button
              className="product-modal__add-btn"
              onClick={() => { onAddCart(product); onClose(); }}
            >
              <ShoppingBag size={16} aria-hidden="true" />
              ADD TO CART
            </button>
          </div>

          <div
            className={`product-modal__stock ${
              product.stock < 10 ? 'product-modal__stock--low' : ''
            }`}
          >
            {product.stock < 10 ? (
              <><AlertCircle size={13} /> Only {product.stock} left</>
            ) : (
              <>✓ {product.stock} in stock</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
