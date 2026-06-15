import React from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft } from 'lucide-react';

export default function ClientRegister() {
  const { navigate } = useAppContext();

  return (
    <div className="flex-1 flex flex-col bg-surface-50">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b border-surface-100 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate('login')}
          className="p-2 -ml-2 text-surface-900 hover:bg-surface-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-2 text-lg font-serif font-medium text-primary-900">Criar Conta</h2>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Nome completo</label>
            <input 
              type="text" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Telefone</label>
            <input 
              type="tel" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">E-mail</label>
            <input 
              type="email" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Confirmar senha</label>
            <input 
              type="password" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
        </div>

        <div className="mt-8 pb-4">
          <button 
            onClick={() => navigate('login')}
            className="w-full bg-primary-600 text-white font-medium rounded-xl px-4 py-3.5 shadow-md shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
