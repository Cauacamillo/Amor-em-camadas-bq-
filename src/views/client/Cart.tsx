import React from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft, Trash2, Minus, Plus, Ticket, ShoppingBag } from 'lucide-react';
import ClientBottomNav from '../../components/ClientBottomNav';

export default function ClientCart() {
  const { navigate, isStoreOpen, cart, updateCartQuantity, removeFromCart, cartTotal } = useAppContext();

  return (
    <div className="flex-1 flex flex-col bg-surface-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b border-surface-100 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('catalog')}
          className="p-2 -ml-2 text-surface-900 hover:bg-surface-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-2 text-lg font-serif font-medium text-primary-900">Seu Carrinho</h2>
      </div>

      <div className="flex-1 flex flex-col pt-4">
        {cart.length > 0 ? (
          <div className="flex-1 px-4 pb-24 overflow-y-auto space-y-3">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-2xl p-3 shadow-sm border border-surface-200 flex gap-4 items-center">
                <div className="w-20 h-20 bg-surface-100 text-surface-300 rounded-xl shrink-0 flex items-center justify-center text-xs">
                  Foto
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-surface-900 line-clamp-1">{item.product.name}</h3>
                    <button 
                      onClick={() => { if(confirm('Remover item?')) removeFromCart(item.product.id) }}
                      className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-semibold text-primary-700 mb-2">R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</div>
                  <div className="flex items-center w-fit bg-surface-50 rounded-lg p-1 border border-surface-200">
                    <button 
                      onClick={() => item.quantity > 1 ? updateCartQuantity(item.product.id, item.quantity - 1) : removeFromCart(item.product.id)}
                      className="p-1 text-surface-600 hover:text-surface-900 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-surface-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 text-surface-600 hover:text-surface-900 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
             <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mb-6 text-surface-400">
               <ShoppingBag className="w-10 h-10 text-primary-300" strokeWidth={1.5} />
             </div>
             <h3 className="text-xl font-serif font-medium text-surface-900 mb-3">Seu carrinho está vazio</h3>
             <p className="text-sm text-surface-500 mb-8 max-w-[280px] leading-relaxed">
               Adicione algumas das nossas deliciosas sobremesas para continuar adoçando o seu dia.
             </p>
             <button 
               onClick={() => navigate('catalog')}
               className="bg-primary-50 text-primary-700 font-medium px-8 py-3.5 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors shadow-sm"
             >
               Ver Produtos
             </button>
          </div>
        )}

        {/* Footer totals */}
        <div className="bg-white border-t border-surface-200 p-4 pb-4 mt-auto">
          {/* Coupon */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Ticket className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Cupom de desconto" 
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary-300"
              />
            </div>
            <button className="bg-surface-900 text-white px-4 py-3 rounded-xl font-medium text-sm hover:bg-surface-800 transition-colors">
              Aplicar
            </button>
          </div>

          <div className="space-y-2 mb-4 text-sm px-2">
            <div className="flex justify-between text-surface-600">
              <span>Subtotal</span>
              <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-primary-600 font-medium">
              <span>Desconto</span>
              <span>- R$ 0,00</span>
            </div>
            <div className="pt-3 border-t border-surface-200 flex justify-between text-surface-900 font-semibold text-lg mt-2">
              <span>Total</span>
              <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {!isStoreOpen ? (
            <button disabled className="w-full bg-surface-200 text-surface-500 font-medium rounded-2xl px-4 py-4 text-center cursor-not-allowed">
              Loja Fechada no Momento
            </button>
          ) : (
            <button 
              onClick={() => navigate('checkout')}
              disabled={cart.length === 0}
              className={`w-full font-medium rounded-2xl px-4 py-4 text-center transition-all ${cart.length > 0 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] text-lg' : 'bg-surface-200 text-surface-400 cursor-not-allowed'}`}
            >
              Finalizar Pedido
            </button>
          )}
        </div>
      </div>
      <ClientBottomNav />
    </div>
  );
}
