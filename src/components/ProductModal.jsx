import { X, ShoppingBag, AlertCircle } from 'lucide-react';
import Stars from './Stars';
import { formatPrice, getDiscount } from '../utils/format';
import './ProductModal.css';

/**
 * Full product detail modal overlay.
 */
export default function ProductModal({ product, onClose, onAddCart }) {
  if (!product) return null;
  const discount = getDiscount(product.price, product.original_price);

  return (
    <div className="product-modal__overlay" onClick={onClose}>
      <div
        className="product-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="product-modal__hero">
          <div className="product-modal__hero-overlay">
            {product.image ? (
              <img src={product.image} alt={product.name} className="product-modal__photo" loading="lazy" />
            ) : (
              <span className="product-modal__emoji">{product.emoji || '👟'}</span>
            )}
            {product.category === 'Boots' && (
              <div className="product-modal__surface">{product.surface}</div>
            )}
          </div>
          <button className="product-modal__close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="product-modal__body">
          <div className="product-modal__brand">
            {product.brand.toUpperCase()} · {product.category.toUpperCase()}
          </div>
          <h2 className="product-modal__name">{product.name}</h2>
          <Stars rating={product.rating} />
          
          <div className="product-modal__desc-wrap">
             <p className="product-modal__desc">{product.description}</p>
          </div>

          <div className="product-modal__size-selector">
            <span className="product-modal__size-label">SELECT SIZE</span>
            <div className="product-modal__sizes">
              {product.category === 'Jerseys' 
                ? ['S', 'M', 'L', 'XL', 'XXL'].map(s => <button key={s} className="product-modal__size-btn">{s}</button>)
                : ['7.5', '8.5', '9.5', '10.5', '11.5'].map(s => <button key={s} className="product-modal__size-btn">{s}</button>)
              }
            </div>
          </div>

          <div className="product-modal__actions">
            <div className="product-modal__pricing">
              <span className="product-modal__price">
                {formatPrice(product.price)}
              </span>
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
              onClick={() => {
                onAddCart(product);
                onClose();
              }}
            >
              <ShoppingBag size={16} />
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
