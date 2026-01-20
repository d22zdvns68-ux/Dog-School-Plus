
import React, { useState } from 'react';
import { CheckCircle, Clock, Smile, Frown, Camera, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const DaycareManagement: React.FC = () => {
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  const students = [
    { id: '1', name: 'Thor', status: 'present', mood: 'Agitado', checkIn: '08:15' },
    { id: '2', name: 'Luna', status: 'present', mood: 'Feliz', checkIn: '08:45' },
    { id: '3', name: 'Bento', status: 'absent', mood: 'N/A', checkIn: '-' },
    { id: '4', name: 'Pipoca', status: 'present', mood: 'Calmo', checkIn: '09:00' },
  ];

  const handleGenerateAIReport = async (petName: string) => {
    setLoadingAI(petName);
    try {
      // Fix: Strictly use process.env.API_KEY for initialization as per Google GenAI SDK guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Gere um breve relatório diário (max 50 palavras) para o tutor de um cão chamado ${petName} que está na creche pet. O humor dele hoje foi ótimo, brincou com outros cães e almoçou bem. Seja fofo e profissional. Em Português.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      alert(`Relatório IA para ${petName}:\n\n${response.text}`);
    } catch (error) {
      alert("Erro ao gerar relatório com IA.");
    } finally {
      setLoadingAI(null);
    }
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Chamada da Creche</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Controle de Frequência em Tempo Real</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-emerald-600/10 text-emerald-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <CheckCircle size={18} />
            18 Presentes
          </div>
          <div className="flex items-center gap-2 bg-orange-600/10 text-orange-400 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
            <Clock size={18} />
            5 A caminho
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {students.map((pet) => (
          <div key={pet.id} className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col group hover:border-orange-500/30 transition-all">
            <div className="h-44 bg-slate-800 relative overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${pet.name}creche/600/400`} 
                alt={pet.name} 
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${pet.status === 'absent' ? 'opacity-20 grayscale' : 'opacity-60'}`}
              />
              <div className="absolute top-4 left-4">
                 <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl ${
                   pet.status === 'present' ? 'bg-emerald-500 text-white shadow-emerald-900/40' : 'bg-slate-700 text-slate-300'
                 }`}>
                   {pet.status === 'present' ? 'Check-in Ativo' : 'Ausente'}
                 </span>
              </div>
              <div className="absolute bottom-4 left-6">
                <h3 className="text-2xl font-black text-white drop-shadow-lg">{pet.name}</h3>
              </div>
            </div>

            <div className="p-6 flex-1 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span className="uppercase tracking-widest">Humor Hoje</span>
                  <span className="text-slate-300">{pet.checkIn !== '-' ? `Entrou às ${pet.checkIn}` : '--:--'}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                   {pet.mood === 'Feliz' || pet.mood === 'Brincalhão' ? <Smile className="text-emerald-400" size={24} /> : <Frown className="text-orange-400" size={24} />}
                   <span className="text-sm font-black text-slate-200 uppercase tracking-wider">{pet.mood}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button 
                  className="col-span-1 bg-slate-800 hover:bg-indigo-600 text-indigo-400 hover:text-white p-3.5 rounded-2xl transition-all flex items-center justify-center disabled:opacity-30 active:scale-90"
                  onClick={() => handleGenerateAIReport(pet.name)}
                  disabled={pet.status === 'absent' || loadingAI === pet.name}
                  title="Gerar Relatório IA"
                >
                  {loadingAI === pet.name ? (
                    <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles size={20} />
                  )}
                </button>
                <button className="bg-slate-800 hover:bg-orange-600 text-orange-400 hover:text-white p-3.5 rounded-2xl transition-all active:scale-90 flex items-center justify-center">
                  <Camera size={20} />
                </button>
                <button className="bg-slate-800 hover:bg-emerald-600 text-emerald-400 hover:text-white p-3.5 rounded-2xl transition-all active:scale-90 flex items-center justify-center">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaycareManagement;
