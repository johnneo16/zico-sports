import { useState } from 'react';
import { ShoppingCart, Star, Flame } from 'lucide-react';
import Stars from './Stars';
import { formatPrice, getDiscount } from '../utils/format';
import './ProductCard.css';

/**
 * Individual product card shown in the shop grid.
 */
export default function ProductCard({ product, onSelect, onAddCart }) {
  const [hovered, setHovered] = useState(false);
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <div
      className={`product-card ${hovered ? 'product-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="product-card__image"
        onClick={() => onSelect(product)}
      >
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-card__photo" loading="lazy" />
        ) : (
          <span className="product-card__emoji">{product.emoji || '👟'}</span>
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

      <div className="product-card__body" onClick={() => onSelect(product)}>
        <div className="product-card__brand">{product.brand.toUpperCase()}</div>
        <div className="product-card__name">{product.name}</div>
        <Stars rating={product.rating} />
        <div className="product-card__meta">
          {product.reviews} reviews · {product.stock} left
        </div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="product-card__original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            className="product-card__add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddCart(product);
            }}
          >
            <ShoppingCart size={12} />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
