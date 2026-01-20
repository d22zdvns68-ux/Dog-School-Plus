
import React, { useState } from 'react';
import { Bed, LogIn, LogOut, FileText, Camera, Sparkles, FileSignature, ShieldCheck, Plus, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import DigitalTermsModal from './DigitalTermsModal';

interface Guest {
  id: string;
  name: string;
  tutor: string;
  checkIn: string;
  checkOut: string;
  status: string;
  room: string;
  dailyRate: number;
  termsSigned: boolean;
}

const HospedagemManagement: React.FC = () => {
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const [selectedGuestForTerms, setSelectedGuestForTerms] = useState<Guest | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  
  // Form state for new check-in
  const [newCheckIn, setNewCheckIn] = useState({
    name: '',
    tutor: '',
    room: 'Padrão 01',
    checkOut: ''
  });

  const [guests, setGuests] = useState<Guest[]>([
    { id: 'H1', name: 'Max', tutor: 'Carla Dias', checkIn: '2023-11-20', checkOut: '2023-11-25', status: 'In', room: 'Suíte 04', dailyRate: 120, termsSigned: true },
    { id: 'H2', name: 'Bela', tutor: 'Marcos Rezende', checkIn: '2023-11-21', checkOut: '2023-11-23', status: 'In', room: 'Padrão 02', dailyRate: 85, termsSigned: false },
    { id: 'H3', name: 'Fumaça', tutor: 'Silvia Nunes', checkIn: '2023-11-19', checkOut: '2023-11-22', status: 'Checking-out', room: 'VIP 01', dailyRate: 200, termsSigned: true },
  ]);

  const handleGenerateHotelAIReport = async (petName: string) => {
    setLoadingAI(petName);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Gere um relatório diário de hotel pet para o cão ${petName}. Ele dormiu bem, comeu toda a ração e participou das atividades recreativas da tarde. Use um tom carinhoso e profissional. Em Português.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      alert(`Relatório da Hospedagem para ${petName}:\n\n${response.text}`);
    } catch (error) {
      alert("Erro ao conectar com a IA.");
    } finally {
      setLoadingAI(null);
    }
  };

  const openTerms = (guest: Guest) => {
    setSelectedGuestForTerms(guest);
    setIsTermsOpen(true);
  };

  const signTerms = (signature: string) => {
    if (selectedGuestForTerms) {
      setGuests(prev => prev.map(g => g.id === selectedGuestForTerms.id ? { ...g, termsSigned: true } : g));
      setIsTermsOpen(false);
      setSelectedGuestForTerms(null);
    }
  };

  const handleNewCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guest: Guest = {
      id: `H${Date.now()}`,
      name: newCheckIn.name,
      tutor: newCheckIn.tutor,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: newCheckIn.checkOut,
      status: 'In',
      room: newCheckIn.room,
      dailyRate: 100,
      termsSigned: false
    };
    
    setGuests([guest, ...guests]);
    setIsCheckInModalOpen(false);
    // Automatically trigger terms signing for the new guest
    openTerms(guest);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Hospedagem</h1>
          <p className="text-slate-500 font-bold">Gerencie check-ins, check-outs e diárias.</p>
        </div>
        <button 
          onClick={() => setIsCheckInModalOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-cyan-900/20 transition-all active:scale-95"
        >
          <LogIn size={20} /> Novo Check-in
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-cyan-900/30 text-cyan-400 rounded-2xl border border-cyan-500/20"><Bed size={24} /></div>
          <div><p className="text-xs font-black text-slate-500 uppercase tracking-widest">Hóspedes</p><p className="text-2xl font-black text-white">{guests.length} Pets</p></div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-orange-900/30 text-orange-400 rounded-2xl border border-orange-500/20"><LogOut size={24} /></div>
          <div><p className="text-xs font-black text-slate-500 uppercase tracking-widest">Saídas Hoje</p><p className="text-2xl font-black text-white">01 Pet</p></div>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4">
          <div className="p-4 bg-emerald-900/30 text-emerald-400 rounded-2xl border border-emerald-500/20"><FileText size={24} /></div>
          <div><p className="text-xs font-black text-slate-500 uppercase tracking-widest">Receita Prevista</p><p className="text-2xl font-black text-white">R$ 4.250</p></div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Hóspede / Quarto</th>
                <th className="px-8 py-5">Tutor</th>
                <th className="px-8 py-5">Contrato</th>
                <th className="px-8 py-5">Total Estadia</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {guests.map(guest => (
                <tr key={guest.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 text-cyan-400 rounded-xl flex items-center justify-center font-black text-lg border border-slate-700 group-hover:border-cyan-500/50 transition-all">{guest.name[0]}</div>
                      <div>
                        <p className="font-black text-slate-200">{guest.name}</p>
                        <p className="text-xs text-cyan-500 font-bold uppercase tracking-wider">{guest.room}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-400">{guest.tutor}</td>
                  <td className="px-8 py-6">
                    {guest.termsSigned ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                        <ShieldCheck size={14} /> Assinado
                      </div>
                    ) : (
                      <button 
                        onClick={() => openTerms(guest)}
                        className="flex items-center gap-2 text-orange-400 font-black text-[10px] uppercase tracking-widest bg-orange-400/10 px-3 py-1.5 rounded-xl border border-orange-500/20 w-fit hover:bg-orange-500/20 transition-all cursor-pointer animate-pulse"
                      >
                        <FileSignature size={14} /> Assinar Termos
                      </button>
                    )}
                  </td>
                  <td className="px-8 py-6 font-black text-slate-200">R$ {guest.dailyRate * 5}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      guest.status === 'In' 
                      ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-orange-600/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {guest.status === 'In' ? 'Check-in OK' : 'Saindo'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleGenerateHotelAIReport(guest.name)} className="p-2.5 text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all" title="Relatório IA">
                        {loadingAI === guest.name ? <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /> : <Sparkles size={20} />}
                      </button>
                      <button className="p-2.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded-xl transition-all"><FileText size={20} /></button>
                      <button className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"><LogOut size={20} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Check-in Modal */}
      {isCheckInModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
             <div className="p-8 border-b border-slate-800 flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="p-3 bg-cyan-600/10 text-cyan-400 rounded-2xl border border-cyan-500/20">
                   <LogIn size={24} />
                 </div>
                 <h3 className="text-xl font-black text-white">Novo Check-in</h3>
               </div>
               <button onClick={() => setIsCheckInModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                 <X size={24} className="text-slate-500" />
               </button>
             </div>
             
             <form onSubmit={handleNewCheckInSubmit} className="p-8 space-y-4">
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Pet</label>
                 <input 
                   required
                   type="text" 
                   value={newCheckIn.name}
                   onChange={e => setNewCheckIn({...newCheckIn, name: e.target.value})}
                   className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:border-cyan-500/50 outline-none"
                   placeholder="Ex: Rex"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Tutor</label>
                 <input 
                   required
                   type="text" 
                   value={newCheckIn.tutor}
                   onChange={e => setNewCheckIn({...newCheckIn, tutor: e.target.value})}
                   className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:border-cyan-500/50 outline-none"
                   placeholder="Ex: João Silva"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Acomodação</label>
                   <select 
                     value={newCheckIn.room}
                     onChange={e => setNewCheckIn({...newCheckIn, room: e.target.value})}
                     className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:border-cyan-500/50 outline-none"
                   >
                     <option>Suíte 01</option>
                     <option>Suíte 02</option>
                     <option>Padrão 01</option>
                     <option>Padrão 02</option>
                     <option>VIP 01</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Previsão Saída</label>
                   <input 
                     required
                     type="date" 
                     value={newCheckIn.checkOut}
                     onChange={e => setNewCheckIn({...newCheckIn, checkOut: e.target.value})}
                     className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:border-cyan-500/50 outline-none"
                   />
                 </div>
               </div>

               <div className="pt-4">
                  <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-cyan-900/20 active:scale-95">
                    INICIAR CHECK-IN
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-4 font-bold uppercase tracking-widest">
                    Após o início, o tutor deverá assinar os termos digitais.
                  </p>
               </div>
             </form>
           </div>
        </div>
      )}

      {selectedGuestForTerms && (
        <DigitalTermsModal 
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
          onSign={signTerms}
          petName={selectedGuestForTerms.name}
          tutorName={selectedGuestForTerms.tutor}
        />
      )}
    </div>
  );
};

export default HospedagemManagement;
