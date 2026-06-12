import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AuthModal from './components/AuthModal';
import './index.css';

function AppInner() {
  const [authModal, setAuthModal] = useState(null); // null | 'signin' | 'signup'
  const { toast } = useCart();

  return (
    <BrowserRouter>
      <Navbar onAuthClick={(mode) => setAuthModal(mode)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />

      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />}
      {toast && <div className={`toast${toast.type !== 'success' ? ` ${toast.type}` : ''}`}>{toast.msg}</div>}
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
