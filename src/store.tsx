import React, { createContext, useContext, useState } from 'react';
import { ViewState, AppContextType, Product, CartItem, Order, Coupon, OrderStatus } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const navigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const toggleStoreOpen = () => setIsStoreOpen((prev) => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Products
  const addProduct = (p: Omit<Product, 'id'>) => {
    setProducts((prev) => [...prev, { ...p, id: Math.random().toString(36).substr(2, 9) }]);
    showToast('Produto salvo com sucesso!');
  };
  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
    showToast('Produto removido.');
  };

  // Cart
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
    showToast('Adicionado ao carrinho!');
  };
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
    showToast('Item removido do carrinho.');
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Orders
  const addOrder = (o: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...o,
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      date: new Date().toISOString(),
      status: 'received'
    };
    setOrders((prev) => [newOrder, ...prev]);
  };
  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast('Status do pedido atualizado!');
  };
  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter(o => o.id !== id));
    showToast('Pedido removido.');
  };

  // Coupons
  const addCoupon = (c: Omit<Coupon, 'id'>) => {
    setCoupons((prev) => [...prev, { ...c, id: Math.random().toString(36).substr(2, 9) }]);
    showToast('Cupom salvo com sucesso!');
  };
  const removeCoupon = (id: string) => {
    setCoupons((prev) => prev.filter(c => c.id !== id));
    showToast('Cupom removido.');
  };

  return (
    <AppContext.Provider value={{
      currentView, navigate, isStoreOpen, toggleStoreOpen,
      products, addProduct, removeProduct,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart, cartTotal,
      orders, addOrder, updateOrderStatus, removeOrder,
      coupons, addCoupon, removeCoupon,
      toastMessage, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
