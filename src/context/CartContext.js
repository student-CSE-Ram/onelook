import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      if (action.quantity < 1) return { ...state, items: state.items.filter(i => i.id !== action.id) };
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty = (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`, 'info');
        return prev.filter(p => p.id !== product.id);
      }
      showToast(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  };

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart: state.items,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      wishlist,
      toggleWishlist,
      user,
      setUser,
      toast,
      showToast,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
