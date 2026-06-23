import React, { useState } from 'react';
import { useAppContext } from '../../store';
import { ShoppingBag, Search, Cake, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import ClientBottomNav from '../../components/ClientBottomNav';

export default function ClientCatalog() {
  const { navigate, isStoreOpen, products, addToCart, cartTotal, cart } = useAppContext();
  
  // Local quantity state per product, simplifying for UI template: 
  // We can just use an inner component for each product card to hold its own quantity state.

  return (
    <div className="flex-1 flex flex-col bg-surface-50 relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Cake className="w-4 h-4 text-primary-700" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-primary-900 leading-none">Amor em Camadas</h1>
              <span className="text-[10px] uppercase tracking-widest text-primary-600 font-medium">Boutique</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('login')}
            className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-surface-900 hover:bg-surface-200 transition-colors"
          >
            <span className="text-sm font-medium">U</span>
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input 
            type="text" 
            placeholder="Buscar delícias..." 
            className="w-full bg-surface-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-shadow"
          />
        </div>
      </div>

      {/* Store Closed Banner */}
      {!isStoreOpen && (
        <div className="bg-amber-100/80 border-b border-amber-200 px-4 py-3 text-center">
          <p className="text-amber-900 text-sm font-medium">
            No momento estamos fechados.<br/>Retorne durante nosso horário de atendimento.
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4">
        {products.filter(p => p.isAvailable).length > 0 ? (
          <div className="space-y-4">
            {products.filter(p => p.isAvailable).map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
            <div className="w-20 h-20 bg-primary-100/50 rounded-full flex items-center justify-center mb-6 text-primary-400">
              <Cake className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-serif font-medium text-surface-900 mb-3">Vitrine sendo preparada</h3>
            <p className="text-sm text-surface-500 max-w-[260px] leading-relaxed">
              Nossas delícias estão no forno. Volte em breve para conferir os melhores bolos de pote!
            </p>
          </div>
        )}
      </div>

      <ClientBottomNav />
    </div>
  );
}

const ProductCard: React.FC<{ product: Product, addToCart: (p: Product, q: number) => void }> = ({ product, addToCart }) => {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
      <div className="h-40 bg-surface-100 w-full relative flex items-center justify-center text-surface-400">
        <Cake className="w-12 h-12 opacity-50" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-surface-900">{product.name}</h3>
            <p className="text-sm text-surface-500 line-clamp-2 mt-1">{product.description}</p>
          </div>
        </div>
        <div className="font-semibold text-lg text-primary-700 mb-4">R$ {product.price.toFixed(2).replace('.', ',')}</div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-50 border border-surface-200 rounded-xl px-2 py-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-surface-600 hover:text-surface-900 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium text-surface-900">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-surface-600 hover:text-surface-900 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={() => {
              addToCart(product, quantity);
              setQuantity(1);
            }}
            className="flex-1 bg-primary-600 text-white font-medium rounded-xl py-3 shadow-md shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
