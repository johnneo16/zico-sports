import { X, ShoppingBag, AlertCircle } from 'lucide-react';
import Stars from './Stars';
import { formatPrice, getDiscount } from '../utils/format';
import './ProductModal.css';

/**
 * Full product detail modal overlay.
 */
export default function ProductModal({ product, onClose, onAddCart }) {
  if (!product) return null;
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <div className="product-modal__overlay" onClick={onClose}>
      <div
        className="product-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="product-modal__hero">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-modal__photo" loading="lazy" />
          ) : (
            <span className="product-modal__emoji">{product.emoji || '👟'}</span>
          )}
          <div className="product-modal__surface">{product.surface}</div>
          <button className="product-modal__close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="product-modal__body">
          <div className="product-modal__brand">
            {product.brand.toUpperCase()}
          </div>
          <h2 className="product-modal__name">{product.name}</h2>
          <Stars rating={product.rating} />
          <p className="product-modal__desc">{product.description}</p>

          <div className="product-modal__actions">
            <div className="product-modal__pricing">
              <span className="product-modal__price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="product-modal__original-price">
                    {formatPrice(product.originalPrice)}
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
