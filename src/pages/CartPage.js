import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQty } = useCart();
  const [checkout, setCheckout] = useState(false);

  const shipping = cartTotal >= 50 ? 0 : 9.99;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', textDecoration: 'none', borderRadius: 50 }}>
          Continue Shopping →
        </Link>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 28 }}>
          <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>🚚 Free shipping over $50</span>
          <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>🔒 Secure checkout</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="cart-page-title">Your Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})</h1>

      <div className="cart-grid">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
                <div className="cart-item-row">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 'auto' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-title">Order Summary</div>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: -6, marginBottom: 8 }}>
              Add ${(50 - cartTotal).toFixed(2)} more for free shipping
            </p>
          )}
          <div className="cart-summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={() => setCheckout(true)}>
            Proceed to Checkout →
          </button>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: 13, color: 'var(--gray-600)', textDecoration: 'underline' }}>
              Continue Shopping
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
            {['🔒 Secure', '🚚 Fast', '↩️ Easy Returns'].map(t => (
              <span key={t} style={{ fontSize: 11, color: 'var(--gray-400)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {checkout && <CheckoutModal onClose={() => setCheckout(false)} />}
    </div>
  );
}
