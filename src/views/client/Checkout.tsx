import React, { useState } from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft, MapPin, Store } from 'lucide-react';

export default function ClientCheckout() {
  const { navigate, cartTotal, cart } = useAppContext();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <div className="flex-1 flex flex-col bg-surface-50">
      <div className="flex items-center p-4 bg-white border-b border-surface-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate('cart')} className="p-2 -ml-2 text-surface-900 hover:bg-surface-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-2 text-lg font-serif font-medium text-primary-900">Finalizar Compra</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        
        {/* Como deseja receber */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-surface-100">
          <h3 className="font-medium text-surface-900 mb-3">Como deseja receber seu pedido?</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setDeliveryMethod('delivery')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${deliveryMethod === 'delivery' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-surface-200 text-surface-500 hover:border-surface-300'}`}
            >
              <MapPin className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">Entrega</span>
            </button>
            <button 
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${deliveryMethod === 'pickup' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-surface-200 text-surface-500 hover:border-surface-300'}`}
            >
              <Store className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">Retirar na Loja</span>
            </button>
          </div>
        </section>

        {/* Endereço de Entrega */}
        {deliveryMethod === 'delivery' && (
          <section className="bg-white rounded-2xl p-4 shadow-sm border border-surface-100 space-y-4">
            <h3 className="font-medium text-surface-900">Endereço de Entrega</h3>
            <div className="space-y-3">
              <input type="text" placeholder="CEP" className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300" />
              <div className="flex gap-3">
                <input type="text" placeholder="Rua" className="w-2/3 bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300" />
                <input type="text" placeholder="Número" className="w-1/3 bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300" />
              </div>
              <input type="text" placeholder="Complemento e Ponto de Referência" className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300" />
            </div>
          </section>
        )}

        {/* Confirmação de dados */}
        <section className="bg-white rounded-2xl p-4 shadow-sm border border-surface-100">
          <h3 className="font-medium text-surface-900 mb-3">Resumo do Pedido</h3>
          <div className="text-sm text-surface-600 mb-2">{cart.reduce((a, b) => a + b.quantity, 0)} itens no carrinho</div>
          <div className="flex justify-between font-semibold tracking-tight text-surface-900 text-lg">
            <span>Total a pagar</span>
            <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
          </div>
        </section>

      </div>

      <div className="bg-white p-4 border-t border-surface-200 relative pb-6">
        <button 
          onClick={() => navigate('payment')}
          className="w-full bg-primary-600 text-white font-medium rounded-xl px-4 py-4 text-center shadow-md shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          Ir para Pagamento
        </button>
      </div>
    </div>
  );
}
