import React from 'react';
import AdminLayout from './AdminLayout';
import { useAppContext } from '../../store';
import { Store, TrendingUp, ShoppingBag, DollarSign, Package, ClipboardList, Cake, Ticket } from 'lucide-react';

export default function AdminDashboard() {
  const { isStoreOpen, toggleStoreOpen, navigate } = useAppContext();

  return (
    <AdminLayout title="Dashboard">
      <div className="p-4 space-y-6">
        
        {/* Store Toggle */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isStoreOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-medium text-surface-900">Controle da Loja</h2>
                <p className="text-sm text-surface-500">{isStoreOpen ? 'Aberta para pedidos' : 'Fechada no momento'}</p>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <button 
              onClick={toggleStoreOpen}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${isStoreOpen ? 'bg-emerald-500' : 'bg-surface-300'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${isStoreOpen ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => navigate('admin-orders')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-surface-200 flex flex-col items-center justify-center text-center gap-2 hover:bg-surface-50 transition-colors"
          >
             <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
               <ClipboardList className="w-5 h-5" />
             </div>
             <span className="text-[11px] font-semibold text-surface-700 uppercase tracking-wider">Pedidos</span>
          </button>
          
          <button 
            onClick={() => navigate('admin-products')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-surface-200 flex flex-col items-center justify-center text-center gap-2 hover:bg-surface-50 transition-colors"
          >
             <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
               <Cake className="w-5 h-5" />
             </div>
             <span className="text-[11px] font-semibold text-surface-700 uppercase tracking-wider">Produtos</span>
          </button>

          <button 
            onClick={() => navigate('admin-coupons')}
            className="bg-white p-3 rounded-2xl shadow-sm border border-surface-200 flex flex-col items-center justify-center text-center gap-2 hover:bg-surface-50 transition-colors"
          >
             <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
               <Ticket className="w-5 h-5" />
             </div>
             <span className="text-[11px] font-semibold text-surface-700 uppercase tracking-wider">Cupons</span>
          </button>
        </section>

        {/* Stats Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-surface-900">Resumo de Hoje</h3>
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-md line-clamp-1 truncate max-w-[100px]">Atualizado</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface-200">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-primary-500" />
                <span className="text-xs text-surface-500 font-medium uppercase min-w-0 truncate">Pedidos</span>
              </div>
              <div className="text-2xl font-bold text-surface-900">0</div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-surface-500 font-medium uppercase min-w-0 truncate">Faturamento</span>
              </div>
              <div className="text-2xl font-bold text-surface-900">R$ 0,00</div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface-200">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-surface-500 font-medium uppercase min-w-0 truncate">Itens Vendidos</span>
              </div>
              <div className="text-2xl font-bold text-surface-900">0</div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-surface-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-surface-500 font-medium uppercase min-w-0 truncate">Ticket Médio</span>
              </div>
              <div className="text-2xl font-bold text-surface-900">R$ 0,00</div>
            </div>
          </div>
        </section>

        {/* Top Products Empty State */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200">
          <h3 className="font-medium text-surface-900 mb-4">Produtos Mais Vendidos</h3>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 bg-surface-100 text-surface-300 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm text-surface-500">Nenhum dado de venda<br/>disponível para hoje.</p>
          </div>
        </section>

      </div>
    </AdminLayout>
  );
}
