import { X, Trash2, ShoppingBag, Truck } from 'lucide-react';
import Logo from './Logo';
import { formatPrice } from '../utils/format';
import './CartDrawer.css';

/**
 * Slide-in cart drawer from the right side.
 */
export default function CartDrawer({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    let msg = `Hi Zico Sports, I'd like to place an order!\n\n*Order Details:*\n`;
    cart.forEach(item => {
      msg += `- ${item.name} (${item.brand}) - Qty: ${item.qty} - ₹${item.price * item.qty}\n`;
    });
    msg += `\n*Total Amount:* ₹${total}\n\nI want to pay via UPI (GPay/PhonePe). Please share your UPI ID or QR details!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/917987461287?text=${encoded}`, '_blank');
  };

  return (
    <div className="cart-overlay">
      <div className="cart-overlay__backdrop" onClick={onClose} />
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <div className="cart-drawer__header-left">
            <ShoppingBag size={20} className="cart-drawer__header-icon" />
            <span className="cart-drawer__title">Your Cart</span>
          </div>
          <button className="cart-drawer__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={40} className="cart-drawer__empty-icon" />
            <p>Your cart is empty</p>
            <span>Add some boots to get started!</span>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div
                    className="cart-item__thumb"
                  >
                    <img src={item.image || '/golden_boot.png'} alt={item.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
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
                      <Trash2 size={12} />
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
                <Truck size={12} />
                {total >= 1500
                  ? 'FREE DELIVERY APPLIED'
                  : `Add ${formatPrice(1500 - total)} more for free delivery`}
              </div>
              <button className="cart-drawer__checkout-btn" onClick={handleCheckout}>
                PAY VIA UPI / WHATSAPP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
