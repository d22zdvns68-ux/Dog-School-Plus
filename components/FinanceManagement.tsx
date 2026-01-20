
import React from 'react';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Receipt, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Daycare', value: 8500, color: '#4f46e5' },
  { name: 'Banho & Tosa', value: 4200, color: '#ec4899' },
  { name: 'Vendas Loja', value: 3100, color: '#10b981' },
  { name: 'Clínica', value: 2900, color: '#f59e0b' },
];

const FinanceManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-slate-500">Controle de entradas, saídas e faturamento por categoria.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
            <ArrowUpCircle size={20} />
            Nova Receita
          </button>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2">
            <ArrowDownCircle size={20} />
            Nova Despesa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Saldo Disponível</p>
                  <p className="text-2xl font-bold text-slate-900">R$ 12.840,00</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[75%]"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                  <Receipt size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Pendências de Tutores</p>
                  <p className="text-2xl font-bold text-slate-900 text-rose-600">R$ 1.150,00</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-medium">8 tutores com pagamento em atraso</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 font-bold text-slate-900 flex justify-between items-center">
               Últimas Movimentações
               <button className="text-indigo-600 text-sm hover:underline">Ver tudo</button>
            </div>
            <div className="divide-y divide-slate-100">
               {[
                 { id: 1, label: 'Mensalidade - Luna', cat: 'Daycare', value: 450, type: 'in', date: 'Hoje, 09:30' },
                 { id: 2, label: 'Fornecedor Rações', cat: 'Estoque', value: -1200, type: 'out', date: 'Hoje, 08:15' },
                 { id: 3, label: 'Consulta - Thor', cat: 'Clínica', value: 180, type: 'in', date: 'Ontem, 17:00' },
                 { id: 4, label: 'Banho & Tosa - Pipoca', cat: 'Serviços', value: 85, type: 'in', date: 'Ontem, 16:30' },
               ].map(item => (
                 <div key={item.id} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {item.type === 'in' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.cat} • {item.date}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${item.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.type === 'in' ? '+' : '-'} R$ {Math.abs(item.value).toFixed(2)}
                    </p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
           <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 self-start">
             <PieChartIcon size={20} className="text-indigo-600" />
             Receita por Categoria
           </h3>
           <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 space-y-3 w-full">
             {data.map((item) => (
               <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                     <span className="text-slate-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">R$ {item.value.toLocaleString()}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;
