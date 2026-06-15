import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Plus, Ticket, Search, Trash2 } from 'lucide-react';
import { useAppContext } from '../../store';

export default function AdminCoupons() {
  const { coupons, addCoupon, removeCoupon } = useAppContext();
  const [isAddingMode, setIsAddingMode] = useState(false);
  
  const [couponType, setCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [maxUses, setMaxUses] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSave = () => {
    if (!code || !value) return;
    addCoupon({
      code: code.toUpperCase(),
      type: couponType,
      value: parseFloat(value.replace(',', '.')),
      expirationDate,
      maxUses: maxUses ? parseInt(maxUses) : 999,
      isActive
    });
    setIsAddingMode(false);
    setCode('');
    setValue('');
  };

  return (
    <AdminLayout title="Cupons">
      {isAddingMode ? (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium text-surface-900">Novo Cupom</h2>
            <button 
              onClick={() => setIsAddingMode(false)}
              className="text-sm font-medium text-surface-500 hover:text-surface-900"
            >
              Cancelar
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-200 space-y-4 shadow-sm">
            <div>
              <label className="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Código do Cupom</label>
              <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Ex: BOLO10" className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 font-mono uppercase text-surface-900 focus:outline-none focus:border-primary-300 focus:bg-white" />
            </div>

            <div>
              <label className="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-2">Tipo de Desconto</label>
              <div className="grid grid-cols-2 gap-2 bg-surface-100 p-1 rounded-xl">
                <button 
                  onClick={() => setCouponType('percentage')}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${couponType === 'percentage' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500 hover:text-surface-700'}`}
                >
                  Porcentagem (%)
                </button>
                <button 
                  onClick={() => setCouponType('fixed')}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${couponType === 'fixed' ? 'bg-white shadow-sm text-surface-900' : 'text-surface-500 hover:text-surface-700'}`}
                >
                  Valor Fixo (R$)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Valor do Desconto</label>
              <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder={couponType === 'percentage' ? '10' : '15,00'} className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-surface-900 focus:outline-none focus:border-primary-300 focus:bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Validade</label>
                <input type="date" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-3 text-sm text-surface-900 focus:outline-none focus:border-primary-300 focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Qtd. Máxima</label>
                <input type="number" value={maxUses} onChange={e => setMaxUses(e.target.value)} placeholder="Ilimitado" className="w-full bg-surface-50 border border-surface-200 rounded-xl px-3 py-3 text-sm text-surface-900 focus:outline-none focus:border-primary-300 focus:bg-white" />
              </div>
            </div>

            <div 
              className="flex items-center justify-between p-3 bg-surface-50 rounded-xl border border-surface-200 mt-2 cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              <span className="text-sm font-medium text-surface-700">Cupom Ativo</span>
              <button className={`w-10 h-6 rounded-full p-1 transition-colors ${isActive ? 'bg-emerald-500' : 'bg-surface-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            <button 
              onClick={handleSave}
              disabled={!code || !value}
              className={`w-full font-medium rounded-xl px-4 py-3 shadow-sm mt-4 transition-colors ${code && value ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-surface-200 text-surface-400 cursor-not-allowed'}`}
            >
              Salvar Cupom
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Buscar cupons..." 
                className="w-full bg-white border border-surface-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary-300"
              />
            </div>
            <button 
              onClick={() => setIsAddingMode(true)}
              className="bg-primary-900 text-white p-2 rounded-xl h-full shadow-sm hover:bg-primary-800 flex items-center justify-center min-w-[44px]"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {coupons.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 border-2 border-dashed border-surface-300 rounded-full flex items-center justify-center mb-4 text-surface-400 bg-surface-100">
                <Ticket className="w-8 h-8 opacity-50 text-primary-500" />
              </div>
              <h3 className="font-medium text-surface-900 mb-1">Nenhum cupom ativo</h3>
              <p className="text-sm text-surface-500 mb-6 px-4">
                Crie cupons de desconto para fidelizar clientes e impulsionar suas vendas.
              </p>
              <button 
                onClick={() => setIsAddingMode(true)}
                className="bg-primary-50 text-primary-700 border border-primary-200 font-medium rounded-xl px-4 py-2 hover:bg-primary-100 transition-colors"
              >
                Criar Novo Cupom
              </button>
            </div>
          ) : (
            <div className="space-y-3 pb-20">
              {coupons.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-2xl border border-surface-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-surface-900">{c.code}</h4>
                      <p className="text-sm text-surface-500">Desconto de {c.type === 'percentage' ? `${c.value}%` : `R$ ${c.value.toFixed(2).replace('.', ',')}`}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { if(confirm('Remover cupom?')) removeCoupon(c.id) }}
                    className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
