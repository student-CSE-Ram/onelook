import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const badgeClass =
    product.badge === 'Sale'
      ? 'product-badge sale'
      : product.badge === 'Best Seller'
      ? 'product-badge best'
      : 'product-badge';

  return (
    <div className="product-card">
      <div
        className="product-card-img"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        {product.badge && (
          <span className={badgeClass}>
            {product.badge}
          </span>
        )}

        <span className="product-quick-view">
          Quick View
        </span>
      </div>

      <div className="product-card-body">
        <div className="product-card-name">
          {product.name}
        </div>

        <div className="product-card-meta">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>

          <span className="product-rating">
            <span className="star">★</span>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="product-card-actions">
          <button
            className="btn-view-product"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
}