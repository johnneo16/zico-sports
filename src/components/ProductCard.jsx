import { useState, useRef } from 'react';
import { ShoppingCart, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import Stars from './Stars';
import { formatPrice, getDiscount } from '../utils/format';
import './ProductCard.css';

/**
 * Product card with optional multi-image carousel.
 * Supports product.images[] (array) or falls back to product.image (string).
 * Touch swipe + prev/next buttons for carousel navigation.
 */
export default function ProductCard({ product, onSelect, onAddCart }) {
  const [hovered, setHovered]   = useState(false);
  const [imgIdx,  setImgIdx]    = useState(0);
  const [fading,  setFading]    = useState(false);
  const swipeOrigin             = useRef(null);
  const discount = getDiscount(product.price, product.original_price);

  // Normalise: always work with an array of image URLs
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : product.image ? [product.image] : [];
  const hasMultiple = images.length > 1;

  /** Crossfade to a new index */
  const goTo = (raw, e) => {
    e?.stopPropagation();
    if (fading || !hasMultiple) return;
    const next = ((raw % images.length) + images.length) % images.length;
    if (next === imgIdx) return;
    setFading(true);
    setTimeout(() => { setImgIdx(next); setFading(false); }, 160);
  };

  /** Pointer-based swipe (works on both touch and mouse) */
  const onPointerDown = (e) => { swipeOrigin.current = e.clientX; };
  const onPointerUp   = (e) => {
    if (swipeOrigin.current === null) return;
    const dx = e.clientX - swipeOrigin.current;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? imgIdx + 1 : imgIdx - 1);
    swipeOrigin.current = null;
  };

  return (
    <div
      className={`product-card ${hovered ? 'product-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image / Carousel area ── */}
      <div
        className="product-card__image"
        onClick={() => onSelect(product)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        style={{ userSelect: 'none' }}
      >
        {images.length > 0 ? (
          <img
            key={imgIdx}
            src={images[imgIdx]}
            alt={`${product.name} — view ${imgIdx + 1} of ${images.length}`}
            className={`product-card__photo loaded ${fading ? 'product-card__photo--fading' : ''}`}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <span className="product-card__emoji">{product.emoji || '👟'}</span>
        )}

        {/* Carousel controls — only rendered when multiple images exist */}
        {hasMultiple && (
          <>
            <button
              className="product-card__img-nav product-card__img-nav--prev"
              onClick={(e) => goTo(imgIdx - 1, e)}
              aria-label="Previous image"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              className="product-card__img-nav product-card__img-nav--next"
              onClick={(e) => goTo(imgIdx + 1, e)}
              aria-label="Next image"
            >
              <ChevronRight size={13} />
            </button>
            <div className="product-card__img-dots" aria-hidden="true">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`product-card__img-dot ${i === imgIdx ? 'product-card__img-dot--active' : ''}`}
                  onClick={(e) => goTo(i, e)}
                />
              ))}
            </div>
          </>
        )}

        <div className="product-card__surface">{product.surface}</div>
        {product.hot && (
          <div className="product-card__badge product-card__badge--hot">
            <Flame size={10} /> HOT
          </div>
        )}
        {discount && (
          <div className="product-card__badge product-card__badge--discount">
            -{discount}%
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="product-card__body" onClick={() => onSelect(product)}>
        <div className="product-card__brand">{product.brand.toUpperCase()}</div>
        <div className="product-card__name">{product.name}</div>
        <Stars rating={product.rating} />
        <div className="product-card__meta">
          {product.reviews} reviews · {product.stock} left
        </div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="product-card__original-price">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
          <button
            className="product-card__add-btn"
            onClick={(e) => { e.stopPropagation(); onAddCart(product); }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={12} aria-hidden="true" />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
