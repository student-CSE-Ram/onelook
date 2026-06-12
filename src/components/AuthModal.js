import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AuthModal({ mode, onClose }) {
  const [tab, setTab] = useState(mode); // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser, showToast } = useCart();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (tab === 'signup') {
      if (!form.name || !form.email || !form.password) { setError('Please fill all fields.'); return; }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
      setUser({ name: form.name, email: form.email });
      onClose();
    } else {
      if (!form.email || !form.password) { setError('Please enter email and password.'); return; }
      // Demo: any credentials work
      setUser({ name: form.email.split('@')[0], email: form.email });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-logo">One<span>Look</span></div>
        <p className="modal-sub">Your style, your way.</p>

        <div className="modal-tabs">
          <button className={`modal-tab${tab === 'signin' ? ' active' : ''}`} onClick={() => { setTab('signin'); setError(''); }}>Sign In</button>
          <button className={`modal-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => { setTab('signup'); setError(''); }}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          </div>
          {error && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" className="btn-submit">
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {tab === 'signin' && (
          <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 10, textAlign: 'center' }}>
            Demo: any email/password works
          </p>
        )}
      </div>
    </div>
  );
}
