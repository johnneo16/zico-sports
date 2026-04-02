import Logo from './Logo';
import { formatPrice } from '../utils/format';
import './CartDrawer.css';

/**
 * Slide-in cart drawer from the right side.
 */
export default function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-overlay">
      <div className="cart-overlay__backdrop" onClick={onClose} />
      <div className="cart-drawer animate-slide-in">
        <div className="cart-drawer__header">
          <div className="cart-drawer__header-left">
            <Logo size={30} />
            <span className="cart-drawer__title">Your Cart</span>
          </div>
          <button className="cart-drawer__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">Your cart is empty ⚽</div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div
                    className="cart-item__thumb"
                    style={{ background: item.gradient }}
                  >
                    {item.emoji}
                  </div>
                  <div className="cart-item__info">
                    <div className="cart-item__brand">{item.brand}</div>
                    <div className="cart-item__name">{item.name}</div>
                    <div className="cart-item__qty">Qty: {item.qty}</div>
                  </div>
                  <div className="cart-item__right">
                    <div className="cart-item__price">
                      {formatPrice(item.price * item.qty)}
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={() => onRemove(item.id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total-row">
                <span className="cart-drawer__total-label">Total</span>
                <span className="cart-drawer__total-value">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="cart-drawer__delivery-note">
                {total >= 1500
                  ? '✓ FREE DELIVERY APPLIED'
                  : `Add ${formatPrice(1500 - total)} more for free delivery`}
              </div>
              <button className="cart-drawer__checkout-btn">CHECKOUT →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
