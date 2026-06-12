import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubbed(true); setEmail(''); }
  };

  return (
    <>
      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <h2>Stay in the loop</h2>
            <p>Subscribe for exclusive offers, new arrivals, and style inspiration.</p>
            {subbed ? (
              <p style={{ color: '#86efac', fontWeight: 600 }}>✓ You're subscribed!</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  className="newsletter-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-newsletter">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-logo">One<span>Look</span></div>
              <p className="footer-brand-desc">Discover unique clothing that inspires your lifestyle. Quality craftsmanship meets modern design.</p>
              <p className="footer-contact-item">📍 123 Fashion Street, Style City, SC 12345</p>
              <p className="footer-contact-item">📞 +1 (555) 123-4567</p>
              <p className="footer-contact-item">✉️ hello@onelook.com</p>
              <div className="footer-socials">
                {['𝕏','f','in','▶'].map((s, i) => (
                  <a key={i} href="#!" className="social-btn">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Shop</div>
              <ul className="footer-links">
                <li><Link to="/">All Products</Link></li>
                <li><a href="#!">New Arrivals</a></li>
                <li><a href="#!">Sale</a></li>
                <li><a href="#!">Featured</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Customer Care</div>
              <ul className="footer-links">
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#!">Help Center</a></li>
                <li><a href="#!">Shipping Info</a></li>
                <li><a href="#!">Returns & Exchanges</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#!">About Us</a></li>
                <li><a href="#!">Careers</a></li>
                <li><a href="#!">Blog</a></li>
                <li><a href="#!">Press</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Legal</div>
              <ul className="footer-links">
                <li><a href="#!">Privacy Policy</a></li>
                <li><a href="#!">Terms & Conditions</a></li>
                <li><a href="#!">Cookie Policy</a></li>
                <li><a href="#!">Accessibility</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">© 2025 OneLook™. All Rights Reserved.</span>
            <div className="footer-bottom-links">
              <a href="#!">Privacy</a>
              <a href="#!">Terms</a>
              <a href="#!">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
