import React, { useState } from 'react';
import { useAppContext } from '../../store';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ClientRegister() {
  const { navigate, showToast } = useAppContext();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      showToast('Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      showToast('As senhas não coincidem.');
      return;
    }
    
    if (!supabase) {
      showToast('Supabase não configurado. Simulação de cadastro.');
      navigate('login');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
          }
        }
      });

      if (error) {
        // Se for erro de rate limit, avisamos o usuário
        if (error.status === 429 || error.message.toLowerCase().includes('rate limit') || error.message.toLowerCase().includes('too many requests')) {
          showToast('Limite de cadastros do Supabase atingido. Alteração deve ser feita no painel do Supabase. Entrando em modo local temporário...');
          navigate('catalog');
          return;
        }
        throw error;
      }

      showToast('Cadastro realizado com sucesso!');
      navigate('catalog');
    } catch (error: any) {
      console.error(error);
      showToast(error.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Telefone</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-900 mb-1">Confirmar senha</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white border border-surface-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-shadow"
            />
          </div>
        </div>

        <div className="mt-8 pb-4">
          <button 
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-primary-600 text-white font-medium rounded-xl px-4 py-3.5 shadow-md shadow-primary-200 hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
