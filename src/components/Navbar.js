import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ onAuthClick }) {
  const { cartCount, user, setUser } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">One<span>Look</span></Link>

        <div className="nav-links">
  <Link to="/contact">Contact</Link>
</div>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Hi, {user.name}</span>
              <button className="nav-auth-btn" onClick={() => setUser(null)}>Sign Out</button>
            </div>
          ) : (
            <div className="nav-auth-btns" style={{ display: 'flex', gap: 8 }}>
              <button className="nav-auth-btn" onClick={() => onAuthClick('signin')}>Sign In</button>
              <button className="nav-auth-btn" style={{ background: 'var(--black)', color: 'var(--white)', borderColor: 'var(--black)' }} onClick={() => onAuthClick('signup')}>Sign Up</button>
            </div>
          )}
          <Link to="/cart" className="nav-cart-btn">
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="nav-menu-btn" onClick={() => setMobileOpen(o => !o)}>☰</button>
        </div>
      </div>
    </nav>
  );
}
