import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

const filteredProducts =
  selectedCategory === 'All'
    ? products
    : products.filter(
        p => p.category === selectedCategory
      );
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-text">
              <p className="hero-eyebrow">
  Men's • Women's • Kids Collection
</p>
              <h1>
  Fashion For Every <em>Generation</em>
</h1>
              <p className="hero-sub">
               Explore premium fashion for men, women and kids. Trendy styles, quality fabrics and modern designs for every occasion.
              </p>
              <div className="hero-cta-row">
                <a href="#products" className="btn-primary">Shop Collection →</a>
                <Link to="/contact" className="btn-outline-white">Learn More</Link>
              </div>
              <div className="hero-stats">
                <div>
                  <div className="hero-stat-num">500+</div>
                  <div className="hero-stat-label">Products</div>
                </div>
                <div>
                  <div className="hero-stat-num">50K+</div>
                  <div className="hero-stat-label">Customers</div>
                </div>
                <div>
                  <div className="hero-stat-num">4.9★</div>
                  <div className="hero-stat-label">Avg Rating</div>
                </div>
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 340,
                height: 380,
                borderRadius: 24,
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.1)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop"
                  alt="Fashion"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Our Collection</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <a href="#products" className="view-all-link">View All →</a>
          </div>
          <div className="filter-chips">

  <button
    className={`chip ${selectedCategory === 'All' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('All')}
  >
    All
  </button>

  <button
    className={`chip ${selectedCategory === 'Men' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Men')}
  >
    Men
  </button>

  <button
    className={`chip ${selectedCategory === 'Women' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Women')}
  >
    Women
  </button>

  <button
    className={`chip ${selectedCategory === 'Kids' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Kids')}
  >
    Kids
  </button>

</div>
          <div className="product-grid">
           {filteredProducts.map(p =>
  <ProductCard key={p.id} product={p} />
)}
          </div>
        </div>
      </section>
    </>
  );
}
