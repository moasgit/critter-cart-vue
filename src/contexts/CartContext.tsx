import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { CartItem, Cart, AnimalSize } from '@/types/animal';

interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeItem: (id: string, size: AnimalSize) => void;
  updateQuantity: (id: string, size: AnimalSize, quantity: number) => void;
  updateSize: (id: string, oldSize: AnimalSize, newSize: AnimalSize, newPrice: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Omit<CartItem, 'quantity'>; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: AnimalSize } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: AnimalSize; quantity: number } }
  | { type: 'UPDATE_SIZE'; payload: { id: string; oldSize: AnimalSize; newSize: AnimalSize; newPrice: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...state.items, { ...item, quantity }];
      }

      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_ITEM': {
      const { id, size } = action.payload;
      const newItems = state.items.filter(item => !(item.id === id && item.size === size));
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload;
      const newItems = state.items.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      );
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_SIZE': {
      const { id, oldSize, newSize, newPrice } = action.payload;
      const newItems = state.items.map(item =>
        item.id === id && item.size === oldSize
          ? { ...item, size: newSize, price: newPrice }
          : item
      );
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

const initialCart: Cart = { items: [], total: 0, itemCount: 0 };

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('djurshop-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('djurshop-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  };

  const removeItem = (id: string, size: AnimalSize) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  };

  const updateQuantity = (id: string, size: AnimalSize, quantity: number) => {
    if (quantity === 0) {
      removeItem(id, size);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
    }
  };

  const updateSize = (id: string, oldSize: AnimalSize, newSize: AnimalSize, newPrice: number) => {
    dispatch({ type: 'UPDATE_SIZE', payload: { id, oldSize, newSize, newPrice } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        updateSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};