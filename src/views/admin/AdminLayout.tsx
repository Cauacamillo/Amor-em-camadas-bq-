import React from 'react';
import { useAppContext } from '../../store';
import { LayoutDashboard, Cake, ClipboardList, Ticket, LineChart } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { currentView, navigate } = useAppContext();

  const tabs = [
    { id: 'admin-dashboard', icon: LayoutDashboard, label: 'Início' },
    { id: 'admin-products', icon: Cake, label: 'Produtos' },
    { id: 'admin-orders', icon: ClipboardList, label: 'Pedidos' },
    { id: 'admin-coupons', icon: Ticket, label: 'Cupons' },
    { id: 'admin-reports', icon: LineChart, label: 'Vendas' },
  ] as const;

  return (
    <div className="flex-1 flex flex-col bg-surface-50 relative pb-20">
      {/* Header */}
      <div className="bg-surface-900 text-white px-4 py-4 sticky top-0 z-20 flex items-center justify-between shadow-md">
        <h1 className="font-serif font-medium text-lg tracking-wide">{title}</h1>
        <button onClick={() => navigate('login')} className="text-xs font-semibold text-primary-300 hover:text-primary-200">
          Sair
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface-900 border-t border-surface-800 flex justify-around items-center px-2 py-3 z-30">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          
          return (
            <button 
              key={tab.id}
              onClick={() => navigate(tab.id as any)}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${isActive ? 'text-white drop-shadow-md' : 'text-white/60 hover:text-white'}`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] uppercase font-semibold tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
