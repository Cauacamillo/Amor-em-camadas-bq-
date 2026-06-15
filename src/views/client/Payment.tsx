import React, { useState } from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react';

export default function ClientPayment() {
  const { navigate, cart, cartTotal, addOrder, clearCart, showToast } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState<'pix_qr' | 'infinit_credit' | 'infinit_debit' | 'infinit_pix' | null>(null);

  const handleConfirm = () => {
    if (!paymentMethod) return;
    
    addOrder({
      customerName: 'Cliente Convidado', // Simplification for template
      items: cart,
      totalValue: cartTotal,
      paymentMethod: paymentMethod
    });
    
    clearCart();
    showToast('Pedido finalizado com sucesso!');
    navigate('order-tracking');
  };

  return (
    <div className="flex-1 flex flex-col bg-surface-50">
      <div className="flex items-center p-4 bg-white border-b border-surface-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate('checkout')} className="p-2 -ml-2 text-surface-900 hover:bg-surface-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-2 text-lg font-serif font-medium text-primary-900">Pagamento</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        
        <section>
          <h3 className="font-medium text-sm text-surface-500 uppercase tracking-wider mb-3">PIX Direto</h3>
          <button 
            onClick={() => setPaymentMethod('pix_qr')}
            className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'pix_qr' ? 'border-primary-500 bg-primary-50' : 'border-surface-200 bg-white hover:border-surface-300'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${paymentMethod === 'pix_qr' ? 'bg-primary-200 text-primary-700' : 'bg-surface-100 text-surface-500'}`}>
              <QrCode className="w-5 h-5" />
            </div>
            <div className="text-left flex-1">
              <div className="font-medium text-surface-900">PIX por QR Code</div>
              <div className="text-xs text-surface-500">Aprovação imediata</div>
            </div>
          </button>
        </section>

        <section>
          <div className="flex items-center mb-3">
            <h3 className="font-medium text-sm text-surface-500 uppercase tracking-wider">Infinit Play</h3>
            <span className="ml-2 text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-semibold">SEGURO</span>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => setPaymentMethod('infinit_credit')}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'infinit_credit' ? 'border-primary-500 bg-primary-50' : 'border-surface-200 bg-white hover:border-surface-300'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${paymentMethod === 'infinit_credit' ? 'bg-primary-200 text-primary-700' : 'bg-surface-100 text-surface-500'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-surface-900">Cartão de Crédito</div>
                <div className="text-xs text-surface-500">Até 3x sem juros</div>
              </div>
            </button>

            <button 
              onClick={() => setPaymentMethod('infinit_debit')}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'infinit_debit' ? 'border-primary-500 bg-primary-50' : 'border-surface-200 bg-white hover:border-surface-300'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${paymentMethod === 'infinit_debit' ? 'bg-primary-200 text-primary-700' : 'bg-surface-100 text-surface-500'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-surface-900">Cartão de Débito</div>
                <div className="text-xs text-surface-500">Mastercard, Visa, Elo</div>
              </div>
            </button>

            <button 
              onClick={() => setPaymentMethod('infinit_pix')}
              className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'infinit_pix' ? 'border-primary-500 bg-primary-50' : 'border-surface-200 bg-white hover:border-surface-300'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${paymentMethod === 'infinit_pix' ? 'bg-primary-200 text-primary-700' : 'bg-surface-100 text-surface-500'}`}>
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-surface-900">PIX pela Infinit Pay</div>
                <div className="text-xs text-surface-500">Aprovação imediata</div>
              </div>
            </button>
          </div>
        </section>

      </div>

      <div className="bg-white p-4 border-t border-surface-200 pb-6">
        <button 
          onClick={handleConfirm}
          disabled={!paymentMethod}
          className={`w-full font-medium rounded-xl px-4 py-4 justify-center flex items-center transition-all ${paymentMethod ? 'bg-primary-600 text-white shadow-md shadow-primary-200 hover:bg-primary-700 active:scale-[0.98]' : 'bg-surface-200 text-surface-400 cursor-not-allowed'}`}
        >
          Confirmar Pagamento
        </button>
      </div>
    </div>
  );
}
