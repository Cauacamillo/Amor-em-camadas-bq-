import React, { useState } from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft, LockKeyhole } from 'lucide-react';

export default function AdminLogin() {
  const { navigate } = useAppContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === '2009') {
      navigate('admin-dashboard');
    } else {
      setError('Senha incorreta.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-surface-900 text-white">
      <button 
        onClick={() => navigate('login')}
        className="absolute top-6 left-6 p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="w-16 h-16 bg-surface-800 rounded-full flex items-center justify-center mb-6">
          <LockKeyhole className="w-8 h-8 text-primary-400" />
        </div>
        <h1 className="text-2xl font-serif font-medium mb-1 text-center">Acesso Restrito</h1>
        <p className="text-surface-400 text-sm mb-8 text-center">Painel Administrativo da Loja</p>

        <div className="w-full space-y-4">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-800 border border-surface-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 text-center text-lg tracking-widest"
              placeholder="••••"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center font-medium animate-pulse">{error}</p>}

          <button 
            onClick={handleLogin}
            className="w-full bg-primary-600 text-white font-medium rounded-xl px-4 py-3.5 hover:bg-primary-500 active:scale-[0.98] transition-all"
          >
            Acessar Painel
          </button>
        </div>
      </div>
    </div>
  );
}
