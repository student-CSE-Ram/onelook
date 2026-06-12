import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

export default function CheckoutModal({ onClose }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '' });
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleShipping = (e) => {
    e.preventDefault();
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.zip) {
      setError('Please fill all shipping fields.'); return;
    }
    setError('');
    setStep(1);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!payment.card || !payment.expiry || !payment.cvv) {
      setError('Please fill all payment fields.'); return;
    }
    setError('');
    setStep(2);
  };

  const handleOrder = () => {
    clearCart();
    setDone(true);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 480 }}>
        <button className="modal-close" onClick={onClose}>×</button>

        {done ? (
          <div>
            <div className="success-icon">🎉</div>
            <div className="success-title">Order Placed!</div>
            <p className="success-sub">Thank you for your order. You'll receive a confirmation email shortly.</p>
            <button className="btn-submit" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="modal-logo" style={{ marginBottom: 16 }}>One<span style={{ color: 'var(--highlight)' }}>Look</span> Checkout</div>

            <div className="checkout-steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`checkout-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
                  {i < step ? '✓ ' : ''}{s}
                </div>
              ))}
            </div>

            {step === 0 && (
              <form onSubmit={handleShipping}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Jane Doe" value={shipping.name} onChange={e => setShipping(s => ({ ...s, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input className="form-input" placeholder="123 Fashion St" value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input className="form-input" placeholder="Style City" value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP</label>
                    <input className="form-input" placeholder="12345" value={shipping.zip} onChange={e => setShipping(s => ({ ...s, zip: e.target.value }))} />
                  </div>
                </div>
                {error && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 10 }}>{error}</p>}
                <button type="submit" className="btn-submit">Continue to Payment →</button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={handlePayment}>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input className="form-input" placeholder="4242 4242 4242 4242" maxLength={19} value={payment.card} onChange={e => setPayment(p => ({ ...p, card: e.target.value }))} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Expiry</label>
                    <input className="form-input" placeholder="MM/YY" maxLength={5} value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input className="form-input" placeholder="123" maxLength={3} value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value }))} />
                  </div>
                </div>
                {error && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 10 }}>{error}</p>}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" className="btn-outline-action" style={{ flex: 1 }} onClick={() => setStep(0)}>← Back</button>
                  <button type="submit" className="btn-submit" style={{ flex: 2 }}>Review Order →</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div>
                <p style={{ fontSize: 14, color: 'var(--gray-600)', marginBottom: 16 }}>Please review your order before confirming.</p>
                <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                      <span>{item.name} × {item.quantity}</span>
                      <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 10, marginTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal >= 50 ? 0 : 9.99)).toFixed(2)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-outline-action" style={{ flex: 1 }} onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-submit" style={{ flex: 2 }} onClick={handleOrder}>Place Order 🎉</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
