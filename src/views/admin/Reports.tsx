import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Download, CalendarDays, LineChart as ChartIcon, TrendingUp, Filter } from 'lucide-react';
import { useAppContext } from '../../store';

export default function AdminReports() {
  const { showToast } = useAppContext();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <AdminLayout title="Fechamento de Vendas">
      <div className="p-4 space-y-4 pb-24">
        
        {/* Period Selector */}
        <div className="bg-surface-200 p-1 rounded-xl flex">
          <button 
            onClick={() => setPeriod('daily')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${period === 'daily' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'}`}
          >
            Diário
          </button>
          <button 
            onClick={() => setPeriod('weekly')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${period === 'weekly' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'}`}
          >
            Semanal
          </button>
          <button 
            onClick={() => setPeriod('monthly')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${period === 'monthly' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500'}`}
          >
            Mensal
          </button>
        </div>

        {/* Custom Date Filter */}
        <div className="flex gap-2">
          <div className="flex-1 bg-white border border-surface-200 rounded-xl px-3 py-2 flex items-center justify-between">
            <div className="flex items-center text-surface-500">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span className="text-sm">15 Jun 2026</span>
            </div>
          </div>
          <button className="bg-white border border-surface-200 p-2 rounded-xl text-surface-500 hover:bg-surface-50 flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Main Stats */}
        <div className="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm text-center">
          <p className="text-sm font-medium text-surface-500 uppercase tracking-widest mb-1">Total Faturado</p>
          <h2 className="text-3xl font-serif font-bold text-emerald-600 mb-4">R$ 0,00</h2>
          
          <div className="flex justify-between items-center border-t border-surface-100 pt-4">
            <div className="text-left">
              <p className="text-xs text-surface-500 uppercase font-medium">Pedidos Finalizados</p>
              <p className="text-xl font-bold text-surface-900 mt-1">0</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-surface-500 uppercase font-medium">Ticket Médio</p>
              <p className="text-xl font-bold text-surface-900 mt-1">R$ 0,00</p>
            </div>
          </div>
        </div>

        {/* Payment Methods Breakout */}
        <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
          <h3 className="font-medium text-surface-900 mb-3 flex items-center gap-2">
            <ChartIcon className="w-4 h-4 text-primary-500" />
            Por Forma de Pagamento
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-surface-600">PIX Direto</span>
              <span className="font-medium text-surface-900">R$ 0,00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-surface-600">Cartão de Crédito</span>
              <span className="font-medium text-surface-900">R$ 0,00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-surface-600">Cartão de Débito</span>
              <span className="font-medium text-surface-900">R$ 0,00</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button 
          onClick={() => showToast('Relatório exportado com sucesso! (Download CSV)')}
          className="w-full bg-primary-50 text-primary-700 font-medium rounded-xl px-4 py-3 border border-primary-200 hover:bg-primary-100 flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-5 h-5" />
          Exportar Relatório Completo (CSV)
        </button>

      </div>
    </AdminLayout>
  );
}
