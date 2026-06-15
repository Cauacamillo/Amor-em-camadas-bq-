import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Plus, Search, CakeSlice, Trash2 } from 'lucide-react';
import { useAppContext } from '../../store';

export default function AdminProducts() {
  const { products, addProduct, removeProduct } = useAppContext();
  const [isAddingMode, setIsAddingMode] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSave = () => {
    if (!name || !price) return;
    addProduct({
      name,
      description,
      category,
      price: parseFloat(price.replace(',', '.')),
      isAvailable
    });
    setIsAddingMode(false);
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setIsAvailable(true);
  };

  return (
    <AdminLayout title="Catálogo">
      {isAddingMode ? (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-medium text-surface-900">Novo Produto</h2>
            <button 
              onClick={() => setIsAddingMode(false)}
              className="text-sm font-medium text-surface-500 hover:text-surface-900"
            >
              Cancelar
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-surface-200 space-y-4 shadow-sm">
            <div className="w-full h-32 bg-surface-100 rounded-xl border-2 border-dashed border-surface-300 flex flex-col items-center justify-center text-surface-500 mb-4 cursor-pointer hover:bg-surface-200 transition-colors">
              <Plus className="w-6 h-6 mb-1 text-surface-400" />
              <span className="text-sm">Adicionar Foto</span>
            </div>
            
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Produto" className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300 focus:bg-white" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição detalhada..." rows={3} className="w-full bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300 focus:bg-white resize-none"></textarea>
            
            <div className="flex gap-3">
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Categoria" className="w-1/2 bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300 focus:bg-white" />
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Preço (R$)" className="w-1/2 bg-surface-50 border border-surface-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-300 focus:bg-white" />
            </div>
            
            <div 
              className="flex items-center justify-between p-3 bg-surface-50 rounded-xl border border-surface-200 cursor-pointer"
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <span className="text-sm font-medium text-surface-700">Produto Ativo (Visível)</span>
              <button className={`w-10 h-6 rounded-full p-1 transition-colors ${isAvailable ? 'bg-primary-500' : 'bg-surface-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isAvailable ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={!name || !price}
              className={`w-full font-medium rounded-xl px-4 py-3 shadow-sm transition-colors ${name && price ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-surface-200 text-surface-400 cursor-not-allowed'}`}
            >
              Salvar Produto
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
                placeholder="Buscar produtos..." 
                className="w-full bg-white border border-surface-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary-300"
              />
            </div>
            <button 
              onClick={() => setIsAddingMode(true)}
              className="bg-primary-900 text-white p-2 rounded-xl h-full shadow-sm hover:bg-primary-800"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {products.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 border-2 border-dashed border-surface-300 rounded-full flex items-center justify-center mb-4 text-surface-400">
                <CakeSlice className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="font-medium text-surface-900 mb-1">Catálogo Vazio</h3>
              <p className="text-sm text-surface-500 mb-6 px-4">
                Você ainda não cadastrou nenhum produto. Adicione o primeiro para começar a vender.
              </p>
              <button 
                onClick={() => setIsAddingMode(true)}
                className="bg-primary-50 text-primary-700 border border-primary-200 font-medium rounded-xl px-4 py-2 hover:bg-primary-100 transition-colors"
              >
                Adicionar Produto
              </button>
            </div>
          ) : (
            <div className="space-y-3 pb-20">
              {products.map(p => (
                <div key={p.id} className="bg-white p-3 rounded-2xl border border-surface-200 shadow-sm flex items-center gap-4">
                  <div className="w-16 h-16 bg-surface-100 rounded-xl flex items-center justify-center text-surface-400 shrink-0">
                    <CakeSlice className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif font-medium text-surface-900 line-clamp-1">{p.name}</h4>
                    <p className="text-primary-700 font-semibold text-sm mb-1">R$ {p.price.toFixed(2).replace('.', ',')}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${p.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-surface-200 text-surface-600'}`}>
                      {p.isAvailable ? 'Ativo' : 'Oculto'}
                    </span>
                  </div>
                  <button 
                    onClick={() => { if(confirm('Remover produto?')) removeProduct(p.id) }}
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
