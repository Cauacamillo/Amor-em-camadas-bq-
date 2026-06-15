import React from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft, CheckCircle2, Clock, ChefHat, ShoppingBag, Truck, Home } from 'lucide-react';
import { OrderStatus } from '../../types';
import ClientBottomNav from '../../components/ClientBottomNav';

export default function ClientOrderTracking() {
  const { navigate, orders } = useAppContext();
  
  // Get latest order for tracking (simplification for template)
  const order = orders[0];
  const currentStatus: OrderStatus = order ? order.status : 'received';

  const steps = [
    { id: 'received', label: 'Pedido Recebido', icon: Clock, desc: 'Aguardando confirmação' },
    { id: 'preparing', label: 'Em Preparação', icon: ChefHat, desc: 'Preparando com amor' },
    { id: 'ready', label: 'Pronto', icon: ShoppingBag, desc: 'Pronto para você' },
    { id: 'out-for-delivery', label: 'Saiu para Entrega', icon: Truck, desc: 'A caminho do endereço' },
    { id: 'delivered', label: 'Entregue', icon: Home, desc: 'Bom apetite!' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStatus);

  return (
    <div className="flex-1 flex flex-col bg-surface-50">
      <div className="flex items-center p-4 bg-white border-b border-surface-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate('catalog')} className="p-2 -ml-2 text-surface-900 hover:bg-surface-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-2 text-lg font-serif font-medium text-primary-900">Acompanhar Pedido</h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-semibold text-primary-900 mb-1">Pedido #{order?.id || '0001'}</h3>
            <p className="text-sm text-surface-500">Realizado hoje</p>
          </div>

          <div className="relative pl-6">
            {/* V-line connecting steps */}
            <div className="absolute top-4 bottom-4 left-[2.25rem] w-0.5 bg-surface-100 -translate-x-1/2 z-0" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex || currentStatus === 'canceled'; 
              const isCurrent = index === currentStepIndex && currentStatus !== 'canceled';
              const isPending = index > currentStepIndex;

              if (currentStatus === 'canceled') {
                return null; // Skip drawing standard steps if canceled
              }

              return (
                <div key={step.id} className="relative z-10 flex gap-4 mb-8 last:mb-0">
                  <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-4 ${
                    isCompleted ? 'bg-primary-500 border-white text-white' : 
                    isCurrent ? 'bg-white border-primary-200 text-primary-600 ring-4 ring-primary-50' : 
                    'bg-white border-surface-50 text-surface-300'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="pt-2">
                    <h4 className={`font-medium ${isPending ? 'text-surface-400' : 'text-surface-900'}`}>{step.label}</h4>
                    <p className={`text-sm ${isPending ? 'text-surface-300' : 'text-surface-500'}`}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
            {currentStatus === 'canceled' && (
              <div className="text-center text-red-500 py-6 font-medium">
                Este pedido foi cancelado pela loja.
              </div>
            )}
          </div>
        </div>
      </div>

      <ClientBottomNav />
    </div>
  );
}
