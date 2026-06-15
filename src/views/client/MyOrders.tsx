import React from 'react';
import { useAppContext } from '../../store';
import { ClipboardList, ChevronRight, Store } from 'lucide-react';
import ClientBottomNav from '../../components/ClientBottomNav';

export default function ClientMyOrders() {
  const { navigate, orders } = useAppContext();

  return (
    <div className="flex-1 flex flex-col bg-surface-50 h-full">
      <div className="p-4 bg-white border-b border-surface-100 shadow-sm sticky top-0 z-10 text-center">
        <h2 className="text-lg font-serif font-medium text-primary-900">Meus Pedidos</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-surface-200">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Pedido</span>
                    <h3 className="text-lg font-serif font-bold text-surface-900 leading-none">#{order.id}</h3>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    order.status === 'canceled' ? 'bg-red-50 text-red-600' : 
                    order.status === 'delivered' ? 'bg-primary-50 text-primary-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {order.status === 'canceled' ? 'Cancelado' : 
                     order.status === 'delivered' ? 'Entregue' : 'Em andamento'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-surface-600">{order.items.length} itens • R$ {order.totalValue.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-surface-500 mt-1">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                
                <button 
                  onClick={() => navigate('order-tracking')}
                  className="w-full flex items-center justify-center gap-2 bg-surface-50 text-surface-700 font-medium py-2.5 rounded-xl text-sm border border-surface-200 transition-colors hover:bg-surface-100"
                >
                  Ver Detalhes
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-surface-200 rounded-full flex items-center justify-center mb-6 text-surface-500">
               <ClipboardList className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-serif font-medium text-surface-900 mb-3">Nenhum Pedido</h3>
            <p className="text-sm text-surface-500 mb-8 max-w-[260px] leading-relaxed">
              Você ainda não realizou nenhum pedido. Que tal conhecer nossas delícias?
            </p>
            <button 
              onClick={() => navigate('catalog')}
              className="bg-primary-600 text-white font-medium px-8 py-3.5 rounded-full shadow-md shadow-primary-200 hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <Store className="w-5 h-5" />
              Ver Catálogo
            </button>
          </div>
        )}
      </div>

      <ClientBottomNav />
    </div>
  );
}
