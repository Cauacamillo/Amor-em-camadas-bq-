import React from 'react';
import { Store, ShoppingBag, ClipboardList, Truck } from 'lucide-react';
import { useAppContext } from '../store';

export default function ClientBottomNav() {
  const { currentView, navigate, cart } = useAppContext();

  const tabs = [
    { id: 'catalog', label: 'Catálogo', icon: Store },
    { id: 'cart', label: 'Carrinho', icon: ShoppingBag },
    { id: 'my-orders', label: 'Meus Pedidos', icon: ClipboardList },
    { id: 'order-tracking', label: 'Acompanhar', icon: Truck },
  ];

  const cartQuantity = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="bg-white border-t border-surface-200 flex justify-around items-center px-1 py-1 sm:py-2 z-30 shrink-0 sticky bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentView === tab.id;
        return (
          <button 
            key={tab.id}
            onClick={() => navigate(tab.id as any)}
            className={`relative flex flex-col items-center p-2 rounded-xl transition-colors ${isActive ? 'text-primary-600' : 'text-surface-400 hover:text-primary-500 hover:bg-surface-50'}`}
          >
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider ${isActive ? 'font-bold' : 'font-semibold'}`}>
              {tab.label}
            </span>
            {tab.id === 'cart' && cartQuantity > 0 && (
              <span className="absolute top-0.5 right-1 sm:right-2 w-4 h-4 bg-primary-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
