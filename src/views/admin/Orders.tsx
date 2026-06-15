import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Filter, ClipboardList, Trash2, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../store';
import { OrderStatus } from '../../types';

export default function AdminOrders() {
  const { orders, removeOrder, updateOrderStatus } = useAppContext();
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true;
    if (filter === 'pending') return o.status === 'received';
    if (filter === 'prep') return o.status === 'preparing';
    if (filter === 'done') return o.status === 'delivered' || o.status === 'canceled';
    return true;
  });

  return (
    <AdminLayout title="Gestão de Pedidos">
      <div className="flex flex-col h-full bg-surface-50">
        
        {/* Filters Panel */}
        <div className="bg-white border-b border-surface-200 px-4 py-3 sticky top-0 z-10 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Nº Pedido ou Cliente" 
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary-300"
              />
            </div>
            <button className="bg-surface-100 text-surface-600 p-2 rounded-xl border border-surface-200 hover:bg-surface-200">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-sm">
            <button className={`px-4 py-1.5 rounded-full whitespace-nowrap border ${filter === 'all' ? 'bg-primary-900 border-primary-900 text-white font-medium' : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'}`} onClick={() => setFilter('all')}>
              Todos
            </button>
            <button className={`px-4 py-1.5 rounded-full whitespace-nowrap border ${filter === 'pending' ? 'bg-amber-100 border-amber-200 text-amber-800 font-medium' : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'}`} onClick={() => setFilter('pending')}>
              Novos
            </button>
            <button className={`px-4 py-1.5 rounded-full whitespace-nowrap border ${filter === 'prep' ? 'bg-blue-100 border-blue-200 text-blue-800 font-medium' : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'}`} onClick={() => setFilter('prep')}>
              Em Preparação
            </button>
            <button className={`px-4 py-1.5 rounded-full whitespace-nowrap border ${filter === 'done' ? 'bg-emerald-100 border-emerald-200 text-emerald-800 font-medium' : 'bg-white border-surface-200 text-surface-600 hover:bg-surface-50'}`} onClick={() => setFilter('done')}>
              Concluídos
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 p-4">
          <div className="space-y-4 pb-20">
            {filteredOrders.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-surface-200 rounded-full flex items-center justify-center mb-4 text-surface-400">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <h3 className="font-medium text-surface-900 mb-1">Nenhum Pedido</h3>
                <p className="text-sm text-surface-500 max-w-[250px]">
                  {filter === 'all' 
                    ? 'Você ainda não recebeu nenhum pedido hoje.' 
                    : 'Nenhum pedido encontrado com este filtro.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(o => (
                  <div key={o.id} className="bg-white border border-surface-200 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
                    
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Pedido</span>
                        <h3 className="text-lg font-serif font-bold text-surface-900 leading-none">#{o.id}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => { if(confirm('Tem certeza que deseja remover este pedido?')) removeOrder(o.id) }}
                          className="text-surface-400 hover:text-red-500 transition-colors" 
                          title="Remover Pedido"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-surface-900">{o.customerName}</span>
                        <span className="text-surface-500">{new Date(o.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      {o.items.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm">
                          <span className="text-surface-600">{item.quantity}x {item.product.name}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center text-sm pt-1">
                         <span className="font-medium">Total</span>
                         <span className="font-medium text-primary-700">R$ {o.totalValue.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-surface-500 text-xs mt-1">
                        <span>Método</span>
                        <span className="uppercase tracking-wider font-semibold">{o.paymentMethod.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-surface-100 flex flex-col gap-2">
                      <label className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Status do Pedido</label>
                      <div className="relative">
                        <select 
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="w-full appearance-none bg-surface-50 border border-surface-200 text-surface-900 text-sm rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary-300 cursor-pointer"
                        >
                          <option value="received">Recebido</option>
                          <option value="preparing">Em Preparação</option>
                          <option value="ready">Pronto</option>
                          <option value="out-for-delivery">Saiu para Entrega</option>
                          <option value="delivered">Entregue</option>
                          <option value="canceled">Cancelado</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-surface-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
