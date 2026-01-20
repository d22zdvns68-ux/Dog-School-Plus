
import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { Pet } from '../types';

const mockPets: Pet[] = [
  { id: '1', name: 'Thor', species: 'Dog', breed: 'Golden Retriever', age: 3, tutor: 'Maria Oliveira', mood: 'Agitado', status: 'active', lastVisit: '2023-11-20', vaccines: [{ name: 'V10', date: '2023-10-10', status: 'ok' }] },
  { id: '2', name: 'Luna', species: 'Dog', breed: 'Bulldog Francês', age: 2, tutor: 'João Silva', mood: 'Calmo', status: 'daycare', lastVisit: '2023-11-21', vaccines: [{ name: 'Raiva', date: '2022-05-15', status: 'expired' }] },
  { id: '3', name: 'Mingau', species: 'Cat', breed: 'Persa', age: 4, tutor: 'Ana Santos', mood: 'Tímido', status: 'clinic', lastVisit: '2023-11-15', vaccines: [{ name: 'Quádrupla', date: '2023-01-20', status: 'ok' }] },
  { id: '4', name: 'Bento', species: 'Dog', breed: 'Beagle', age: 1, tutor: 'Carlos Lima', mood: 'Brincalhão', status: 'active', lastVisit: '2023-11-22', vaccines: [{ name: 'Gripe', date: '2023-08-12', status: 'ok' }] },
];

const PetManagement: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Pets & Tutores</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Base de Dados Centralizada</p>
        </div>
        <button className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black shadow-xl shadow-pink-900/20 transition-all active:scale-95">
          <Plus size={20} />
          Novo Cadastro
        </button>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/50">
          <div className="flex gap-2 w-full md:w-auto">
            <button className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-700 transition-all">
              <Filter size={18} className="text-pink-500" />
              Filtrar por Status
            </button>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Nome, tutor ou raça..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-pink-500/50 outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-800/20">
                <th className="px-8 py-5">Identificação</th>
                <th className="px-8 py-5">Perfil</th>
                <th className="px-8 py-5">Tutor Responsável</th>
                <th className="px-8 py-5">Localização</th>
                <th className="px-8 py-5">Saúde</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {mockPets.map((pet) => (
                <tr key={pet.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://picsum.photos/seed/${pet.name}/80/80`} 
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-pink-500 transition-all shadow-lg"
                        alt={pet.name}
                      />
                      <div>
                        <p className="font-black text-slate-100 text-lg leading-tight">{pet.name}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{pet.age} ANOS • {pet.mood}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-300 uppercase tracking-wider">{pet.species}</span>
                        <span className="text-[10px] font-bold text-slate-500">{pet.breed}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-200">
                    {pet.tutor}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      pet.status === 'daycare' ? 'bg-orange-600/10 text-orange-400 border-orange-500/20' :
                      pet.status === 'clinic' ? 'bg-rose-600/10 text-rose-400 border-rose-500/20' :
                      'bg-emerald-600/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {pet.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    {pet.vaccines.some(v => v.status === 'expired') ? (
                      <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase tracking-widest bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 w-fit shadow-lg shadow-rose-900/10">
                        <AlertCircle size={14} /> Alerta Vacina
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                        <CheckCircle2 size={14} /> Vacinação OK
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-600 hover:text-white transition-all p-2 rounded-xl hover:bg-slate-800">
                      <MoreHorizontal size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>{mockPets.length} de 124 Pets Listados</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:text-white transition-all">Anterior</button>
            <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:text-white transition-all">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetManagement;
