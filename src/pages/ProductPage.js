import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: 'var(--highlight)', marginTop: 12, display: 'inline-block' }}>← Back to shop</Link>
      </div>
    );
  }

  const related = products.filter(p => p.id !== product.id).slice(0, 4);
  const isWishlisted = wishlist.some(p => p.id === product.id);
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  return (
    <div className="product-detail">
      <div className="container">
        <button className="product-detail-back" onClick={() => navigate('/')}>
          ← Return to Shop
        </button>

        <div className="product-detail-grid">
          <div className="product-detail-img">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-name">{product.name}</h1>

            <div className="product-detail-rating">
              <span className="rating-stars">{stars}</span>
              <span className="rating-label">({product.rating}) · {product.reviews} reviews</span>
            </div>

            <div className="product-detail-price">${product.price.toFixed(2)}</div>
            <p className="product-detail-desc">{product.description}</p>

            <div className="qty-row">
              <span className="qty-label">Quantity</span>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

<div className="product-detail-actions">

  <a
    href={product.amazonLink}
    target="_blank"
    rel="noreferrer"
    className="btn-marketplace amazon"
  >
    Buy on Amazon
  </a>

  <a
    href={product.flipkartLink}
    target="_blank"
    rel="noreferrer"
    className="btn-marketplace flipkart"
  >
    Buy on Flipkart
  </a>

  <a
    href={product.meeshoLink}
    target="_blank"
    rel="noreferrer"
    className="btn-marketplace meesho"
  >
    Buy on Meesho
  </a>

  <a
    href={product.myntraLink}
    target="_blank"
    rel="noreferrer"
    className="btn-marketplace myntra"
  >
    Buy on Myntra
  </a>

</div>

            <div className="product-perks">
              <div className="perk-item">
                <div className="perk-icon">🚚</div>
                <div className="perk-title">Free Shipping</div>
                <div className="perk-sub">On orders over $50</div>
              </div>
              <div className="perk-item">
                <div className="perk-icon">🛡️</div>
                <div className="perk-title">Warranty</div>
                <div className="perk-sub">1 year guarantee</div>
              </div>
              <div className="perk-item">
                <div className="perk-icon">↩️</div>
                <div className="perk-title">Easy Returns</div>
                <div className="perk-sub">30-day policy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="section" style={{ paddingTop: 64 }}>
          <div className="section-header">
            <div>
              <p className="section-eyebrow">You May Also Like</p>
              <h2 className="section-title">Related Products</h2>
            </div>
            <Link to="/" className="view-all-link">View All →</Link>
          </div>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
