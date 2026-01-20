
import React from 'react';
import { Stethoscope, Calendar, Clipboard, FlaskConical, Pill, FilePlus, ChevronRight } from 'lucide-react';

const ClinicManagement: React.FC = () => {
  const appointments = [
    { id: 1, pet: 'Thor', type: 'Consulta Geral', time: '10:30', vet: 'Dr. Ricardo', status: 'waiting' },
    { id: 2, pet: 'Luna', type: 'Vacinação V10', time: '11:15', vet: 'Dra. Amanda', status: 'ready' },
    { id: 3, pet: 'Mingau', type: 'Exame de Sangue', time: '14:00', vet: 'Dra. Amanda', status: 'scheduled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clínica Veterinária</h1>
          <p className="text-slate-500">Prontuários eletrônicos, consultas e histórico clínico.</p>
        </div>
        <button className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-rose-500/20">
          <Calendar size={20} /> Agendar Consulta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <Calendar size={18} className="text-rose-500" /> Agenda de Hoje
             </h3>
             <div className="space-y-3">
               {appointments.map(app => (
                 <div key={app.id} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors border border-transparent hover:border-rose-200">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-slate-900">{app.time}</p>
                      <span className={`w-2 h-2 rounded-full ${app.status === 'waiting' ? 'bg-orange-500 animate-pulse' : app.status === 'ready' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{app.pet}</p>
                    <p className="text-xs text-slate-500">{app.type}</p>
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-rose-600 p-6 rounded-2xl text-white shadow-xl shadow-rose-600/20">
             <h3 className="font-bold mb-2">Acesso Rápido</h3>
             <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center gap-2 transition-all">
                  <Pill size={20} /> <span className="text-[10px] font-bold">Receita</span>
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center gap-2 transition-all">
                  <FlaskConical size={20} /> <span className="text-[10px] font-bold">Exames</span>
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center gap-2 transition-all">
                  <Clipboard size={20} /> <span className="text-[10px] font-bold">Laudo</span>
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl flex flex-col items-center gap-2 transition-all">
                  <FilePlus size={20} /> <span className="text-[10px] font-bold">Prontuário</span>
                </button>
             </div>
           </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Histórico Clínico Recente</h3>
            <button className="text-xs font-bold text-rose-500 hover:underline">Ver Prontuários Completos</button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { id: 101, pet: 'Bento', date: '21/11/2023', diagnosis: 'Dermatite atópica leve', treatment: 'Apoquel 3.6mg' },
              { id: 102, pet: 'Pipoca', date: '20/11/2023', diagnosis: 'Check-up Anual', treatment: 'Reforço V10 e Raiva' },
              { id: 103, pet: 'Thor', date: '18/11/2023', diagnosis: 'Otite externa bilateral', treatment: 'Limpador auricular + Otosyn' },
            ].map(history => (
              <div key={history.id} className="p-6 hover:bg-slate-50 transition-all flex items-start justify-between cursor-pointer group">
                 <div className="space-y-1">
                   <div className="flex items-center gap-2">
                     <span className="text-xs font-bold text-slate-400">{history.date}</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                     <span className="text-sm font-black text-rose-600">{history.pet}</span>
                   </div>
                   <p className="font-bold text-slate-800">{history.diagnosis}</p>
                   <p className="text-sm text-slate-500 italic">Conduta: {history.treatment}</p>
                 </div>
                 <ChevronRight className="text-slate-300 group-hover:text-rose-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicManagement;
