
import React, { useState } from 'react';
import { Bed, LogIn, LogOut, FileText, Camera, Sparkles, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const HotelManagement: React.FC = () => {
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  const activeGuests = [
    { id: 'H1', name: 'Max', tutor: 'Carla Dias', checkIn: '2023-11-20', checkOut: '2023-11-25', status: 'In', room: 'Suíte 04', dailyRate: 120 },
    { id: 'H2', name: 'Bela', tutor: 'Marcos Rezende', checkIn: '2023-11-21', checkOut: '2023-11-23', status: 'In', room: 'Padrão 02', dailyRate: 85 },
    { id: 'H3', name: 'Fumaça', tutor: 'Silvia Nunes', checkIn: '2023-11-19', checkOut: '2023-11-22', status: 'Checking-out', room: 'VIP 01', dailyRate: 200 },
  ];

  const handleGenerateHotelAIReport = async (petName: string) => {
    setLoadingAI(petName);
    try {
      // Fix: Strictly use process.env.API_KEY for initialization as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Gere um relatório diário de hotel pet para o cão ${petName}. Ele dormiu bem, comeu toda a ração e participou das atividades recreativas da tarde. Use um tom carinhoso e profissional. Em Português.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      alert(`Relatório do Hotel para ${petName}:\n\n${response.text}`);
    } catch (error) {
      alert("Erro ao conectar com a IA.");
    } finally {
      setLoadingAI(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Hotel</h1>
          <p className="text-slate-500">Acompanhe as estadias, check-ins e check-outs.</p>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20">
          <LogIn size={20} /> Novo Check-in
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl"><Bed size={24} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hóspedes Atuais</p><p className="text-xl font-bold text-slate-900">08 Pets</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><LogOut size={24} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Check-outs Hoje</p><p className="text-xl font-bold text-slate-900">03 Pets</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><FileText size={24} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Receita Prevista</p><p className="text-xl font-bold text-slate-900">R$ 4.250</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Hóspede / Quarto</th>
              <th className="px-6 py-4">Tutor</th>
              <th className="px-6 py-4">Período</th>
              <th className="px-6 py-4">Total Estadia</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeGuests.map(guest => (
              <tr key={guest.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center font-bold">{guest.name[0]}</div>
                    <div>
                      <p className="font-bold text-slate-900">{guest.name}</p>
                      <p className="text-xs text-cyan-600 font-medium">{guest.room}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">{guest.tutor}</td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-500">{guest.checkIn} até {guest.checkOut}</td>
                <td className="px-6 py-4 font-bold text-slate-800">R$ {guest.dailyRate * 5}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${guest.status === 'In' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600 animate-pulse'}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleGenerateHotelAIReport(guest.name)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Relatório IA">
                      {loadingAI === guest.name ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Sparkles size={18} />}
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-all"><FileText size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelManagement;
