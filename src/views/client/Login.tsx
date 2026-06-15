import React from 'react';
import { useAppContext } from '../../store';
import { CakeSlice } from 'lucide-react';

export default function ClientLogin() {
  const { navigate } = useAppContext();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-primary-50">
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <CakeSlice className="w-10 h-10 text-primary-700" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-serif text-primary-900 text-center leading-tight">
            Amor em<br />Camadas<br />
            <span className="text-sm font-sans tracking-widest uppercase text-primary-600 mt-2 block">BQ</span>
          </h1>
        </div>

        {/* Login Form */}
        <div className="w-full space-y-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Usuário / E-mail</label>
            <input 
              type="text" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="w-full max-w-sm flex justify-between items-center mt-3 mb-8">
          <button className="text-sm text-primary-700 font-medium hover:underline">Esqueci minha senha</button>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button 
            onClick={() => navigate('catalog')}
            className="w-full bg-primary-600 text-white font-medium rounded-xl px-4 py-3.5 shadow-md shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all"
          >
            Entrar
          </button>
          
          <p className="text-center text-sm text-surface-900">
            Não possui cadastro?{' '}
            <button onClick={() => navigate('register')} className="text-primary-700 font-medium hover:underline">
              Cadastre-se
            </button>
          </p>
        </div>
      </div>

      <div className="w-full pb-4 pt-10 flex justify-center">
        <button 
          onClick={() => navigate('admin-login')}
          className="text-xs font-semibold tracking-wider uppercase text-surface-900 bg-surface-200 px-4 py-2 rounded-full hover:bg-surface-300 transition-colors"
        >
          Login Administrativo
        </button>
      </div>
    </div>
  );
}
