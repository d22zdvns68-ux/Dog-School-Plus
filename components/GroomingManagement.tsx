
import React from 'react';
import { Scissors, Clock, User, CheckCircle, Tag, Package, Star } from 'lucide-react';

const GroomingManagement: React.FC = () => {
  const schedule = [
    { id: 101, pet: 'Luna', service: 'Banho + Tosa Máquina', time: '09:00', groomer: 'Claudio', status: 'done', price: 95 },
    { id: 102, pet: 'Bento', service: 'Corte de Unha', time: '10:15', groomer: 'Mayara', status: 'in_progress', price: 25 },
    { id: 103, pet: 'Pipoca', service: 'Banho Avulso', time: '11:00', groomer: 'Mayara', status: 'waiting', price: 60 },
    { id: 104, pet: 'Thor', service: 'Tosa Tesoura Premium', time: '14:30', groomer: 'Claudio', status: 'waiting', price: 150 },
  ];

  const professionals = [
    { name: 'Claudio', commission: 'R$ 840,00', services: 42, rating: 4.9 },
    { name: 'Mayara', commission: 'R$ 720,00', services: 38, rating: 5.0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Banho & Tosa</h1>
          <p className="text-slate-500">Agendamentos, controle de execução e comissões.</p>
        </div>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-sky-500/20">
          <Clock size={20} /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Agenda do Dia</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Finalizado</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">Em Andamento</span>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {schedule.map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-16 text-center">
                       <p className="text-sm font-black text-slate-900">{item.time}</p>
                       <p className="text-[10px] text-slate-400 font-bold">Início</p>
                     </div>
                     <div className="w-px h-8 bg-slate-100"></div>
                     <div>
                       <p className="font-bold text-slate-800 flex items-center gap-2">
                         {item.pet} 
                         {item.status === 'done' && <CheckCircle size={14} className="text-emerald-500" />}
                       </p>
                       <p className="text-xs text-slate-500">{item.service}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="text-right">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Profissional</p>
                       <p className="text-sm font-semibold text-slate-700">{item.groomer}</p>
                     </div>
                     <div className="text-right w-24">
                       <p className="text-sm font-black text-sky-600">R$ {item.price.toFixed(2)}</p>
                       <button className="text-[10px] font-bold text-slate-400 hover:text-sky-600">Detalhes</button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
               <User size={18} className="text-sky-500" /> Profissionais & Comissões
             </h3>
             <div className="space-y-4">
               {professionals.map(pro => (
                 <div key={pro.name} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-slate-900">{pro.name}</p>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                        <Star size={12} fill="currentColor" /> {pro.rating}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-medium">{pro.services} serviços</span>
                      <span className="text-emerald-600 font-black">{pro.commission}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-[#0F172A] p-6 rounded-2xl text-white shadow-xl">
             <h3 className="font-bold mb-4 flex items-center gap-2">
               <Package size={18} className="text-sky-400" /> Pacotes de Serviços
             </h3>
             <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">Plano Mensal</p>
                  <p className="font-bold text-sm">4 Banhos + 1 Tosa Higiênica</p>
                  <p className="text-xs text-slate-500 mt-1">12 pets ativos</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">Plano Combo</p>
                  <p className="font-bold text-sm">2 Banhos + Hidratação</p>
                  <p className="text-xs text-slate-500 mt-1">5 pets ativos</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroomingManagement;
