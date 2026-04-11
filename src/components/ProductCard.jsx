import { useState, useRef } from 'react';
import { ShoppingCart, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import Stars from './Stars';
import { formatPrice, getDiscount } from '../utils/format';
import './ProductCard.css';

export default function ProductCard({ product, onSelect, onAddCart }) {
  const [hovered,  setHovered]  = useState(false);
  const [imgIdx,   setImgIdx]   = useState(0);
  const [fading,   setFading]   = useState(false);
  const swipeX                  = useRef(null);
  const discount = getDiscount(product.price, product.original_price);

  // Normalise: array of images, falling back to single image string
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : product.image ? [product.image] : [];
  const multi = images.length > 1;

  const goTo = (raw, e) => {
    e?.stopPropagation();
    if (fading || !multi) return;
    const next = ((raw % images.length) + images.length) % images.length;
    if (next === imgIdx) return;
    setFading(true);
    setTimeout(() => { setImgIdx(next); setFading(false); }, 150);
  };

  const onPointerDown = (e) => { swipeX.current = e.clientX; };
  const onPointerUp   = (e) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? imgIdx + 1 : imgIdx - 1);
    swipeX.current = null;
  };

  return (
    <div
      className={`product-card ${hovered ? 'product-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image / Carousel ── */}
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
            alt={`${product.name} — shot ${imgIdx + 1}`}
            className={`product-card__photo loaded${fading ? ' product-card__photo--fading' : ''}`}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <span className="product-card__emoji">{product.emoji || '👟'}</span>
        )}

        {multi && (
          <>
            <button className="product-card__nav product-card__nav--prev" onClick={(e) => goTo(imgIdx - 1, e)} aria-label="Previous image">
              <ChevronLeft size={13} />
            </button>
            <button className="product-card__nav product-card__nav--next" onClick={(e) => goTo(imgIdx + 1, e)} aria-label="Next image">
              <ChevronRight size={13} />
            </button>
            <div className="product-card__dots" aria-hidden="true">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`product-card__dot${i === imgIdx ? ' product-card__dot--active' : ''}`}
                  onClick={(e) => goTo(i, e)}
                />
              ))}
            </div>
          </>
        )}

        <div className="product-card__surface">{product.surface}</div>
        {product.hot && (
          <div className="product-card__badge product-card__badge--hot"><Flame size={10} /> HOT</div>
        )}
        {discount && (
          <div className="product-card__badge product-card__badge--discount">-{discount}%</div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="product-card__body" onClick={() => onSelect(product)}>
        <div className="product-card__brand">{product.brand.toUpperCase()}</div>
        <div className="product-card__name">{product.name}</div>
        <Stars rating={product.rating} />
        <div className="product-card__meta">{product.reviews} reviews · {product.stock} left</div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="product-card__original-price">{formatPrice(product.original_price)}</span>
            )}
          </div>
          <button
            className="product-card__add-btn"
            onClick={(e) => { e.stopPropagation(); onAddCart(product); }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={12} />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
