
import React from 'react';
import { Search, Plus, AlertTriangle, Package, Calendar, Tag } from 'lucide-react';
import { InventoryItem } from '../types';

const InventoryManagement: React.FC = () => {
  // Fix: Added missing 'price' property to satisfy InventoryItem interface
  const items: InventoryItem[] = [
    { id: '1', name: 'Ração Premier Adulto 15kg', category: 'Alimentação', quantity: 12, minQuantity: 5, price: 285.90 },
    { id: '2', name: 'Vermífugo Drontal Plus', category: 'Medicamentos', quantity: 3, minQuantity: 10, expiryDate: '2024-05-20', price: 42.00 },
    { id: '3', name: 'Shampoo Neutro 5L', category: 'Banho & Tosa', quantity: 2, minQuantity: 2, price: 110.00 },
    { id: '4', name: 'Peitoral Ergonômico G', category: 'Acessórios', quantity: 8, minQuantity: 3, price: 89.90 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Estoque de Produtos</h1>
          <p className="text-slate-500">Controle entradas, saídas e alertas de reposição.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2">
          <Plus size={20} />
          Cadastrar Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
             <Package size={24} />
           </div>
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total em Estoque</p>
             <p className="text-xl font-bold text-slate-900">458 itens</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
             <AlertTriangle size={24} />
           </div>
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reposição Crítica</p>
             <p className="text-xl font-bold text-orange-600">07 produtos</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
             <Tag size={24} />
           </div>
           <div>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Valor em Estoque</p>
             <p className="text-xl font-bold text-slate-900">R$ 24.500</p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/30">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Filtrar produtos..." 
               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
             />
           </div>
           <div className="flex gap-2">
             <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 text-slate-600">Exportar PDF</button>
             <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 text-slate-600">Relatório Excel</button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-50">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Estoque</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Validade</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">SKU: DSP-{item.id}00X</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {item.quantity} un
                  </td>
                  <td className="px-6 py-4">
                    {item.quantity <= item.minQuantity ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-600 border border-orange-200">
                        Baixo Estoque
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-600 border border-emerald-200">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.expiryDate ? (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                         <Calendar size={14} className="text-purple-400" />
                         {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
