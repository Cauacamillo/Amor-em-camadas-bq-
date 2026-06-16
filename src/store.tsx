import React, { createContext, useContext, useState, useEffect } from 'react';
import { ViewState, AppContextType, Product, CartItem, Order, Coupon, OrderStatus } from './types';
import { supabase } from './lib/supabase';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  // Carregar dados iniciais do Supabase
  useEffect(() => {
    if (!supabase) return;

    const carregarDados = async () => {
      try {
        const [resProducts, resOrders, resCoupons] = await Promise.all([
          supabase.from('products').select('*'),
          supabase.from('orders').select('*').order('date', { ascending: false }),
          supabase.from('coupons').select('*')
        ]);

        if (resProducts.data) setProducts(resProducts.data as Product[]);
        if (resOrders.data) setOrders(resOrders.data as Order[]);
        if (resCoupons.data) setCoupons(resCoupons.data as Coupon[]);
      } catch (error) {
        console.error('Erro ao carregar do supabase', error);
      }
    };
    
    carregarDados();
  }, []);

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
  const addProduct = async (p: Omit<Product, 'id'>) => {
    const newProduct = { ...p, id: crypto.randomUUID() };
    setProducts((prev) => [...prev, newProduct]);
    showToast('Produto salvo com sucesso!');

    if (supabase) {
      await supabase.from('products').insert([newProduct]);
    }
  };
  const removeProduct = async (id: string) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
    showToast('Produto removido.');

    if (supabase) {
      await supabase.from('products').delete().eq('id', id);
    }
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
  const addOrder = async (o: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...o,
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      date: new Date().toISOString(),
      status: 'received'
    };
    setOrders((prev) => [newOrder, ...prev]);

    if (supabase) {
      await supabase.from('orders').insert([newOrder]);
    }
  };
  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast('Status do pedido atualizado!');

    if (supabase) {
      await supabase.from('orders').update({ status }).eq('id', id);
    }
  };
  const removeOrder = async (id: string) => {
    setOrders((prev) => prev.filter(o => o.id !== id));
    showToast('Pedido removido.');

    if (supabase) {
      await supabase.from('orders').delete().eq('id', id);
    }
  };

  // Coupons
  const addCoupon = async (c: Omit<Coupon, 'id'>) => {
    const newCoupon = { ...c, id: crypto.randomUUID() };
    setCoupons((prev) => [...prev, newCoupon]);
    showToast('Cupom salvo com sucesso!');

    if (supabase) {
      await supabase.from('coupons').insert([newCoupon]);
    }
  };
  const removeCoupon = async (id: string) => {
    setCoupons((prev) => prev.filter(c => c.id !== id));
    showToast('Cupom removido.');

    if (supabase) {
      await supabase.from('coupons').delete().eq('id', id);
    }
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
