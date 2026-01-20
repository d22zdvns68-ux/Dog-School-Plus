
import React, { useState } from 'react';
import { X, FileSignature, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';

interface DigitalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: (signature: string) => void;
  petName: string;
  tutorName: string;
}

const DigitalTermsModal: React.FC<DigitalTermsModalProps> = ({ isOpen, onClose, onSign, petName, tutorName }) => {
  const [signature, setSignature] = useState('');
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accepted && signature.length > 3) {
      onSign(signature);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-cyan-500/30 w-full max-w-2xl rounded-[2.5rem] shadow-2xl shadow-cyan-900/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20">
              <FileSignature size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Termo de Hospedagem</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contrato Digital de Responsabilidade</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-500 transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-6 text-slate-300 text-sm leading-relaxed">
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <p className="font-bold text-cyan-400">1. DO OBJETO</p>
            <p>
              O presente termo visa autorizar a hospedagem do pet <span className="text-white font-black underline">{petName}</span> sob os cuidados da Dog School Plus. O tutor <span className="text-white font-black">{tutorName}</span> declara que as informações de saúde e comportamento fornecidas são verídicas.
            </p>
            
            <p className="font-bold text-cyan-400">2. DA SAÚDE E EMERGÊNCIAS</p>
            <p>
              Em caso de emergência veterinária, a Dog School Plus está autorizada a encaminhar o pet à clínica conveniada. Os custos de procedimentos emergenciais serão de inteira responsabilidade do tutor. O pet deve estar com as vacinas (V10, Raiva, Gripe) e vermifugação em dia.
            </p>

            <p className="font-bold text-cyan-400">3. DAS REGRAS DE CONVIVÊNCIA</p>
            <p>
              A hospedagem inclui socialização monitorada. Caso o pet apresente comportamento agressivo persistente que coloque em risco outros hóspedes, o tutor será notificado para retirada imediata ou isolamento em área especial com custos adicionais.
            </p>

            <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400 text-xs italic">
              <AlertTriangle size={18} className="shrink-0" />
              <p>O tutor declara estar ciente de que a socialização envolve riscos naturais de interação animal, isentando a Dog School Plus de incidentes menores decorrentes da natureza da espécie.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-6 h-6 rounded-lg bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500/50 border-2 transition-all"
              />
              <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-wider">
                Li e concordo com todos os termos e condições citados acima.
              </span>
            </label>

            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Assinatura Digital (Digite seu nome completo)</label>
              <div className="relative">
                <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${signature.length > 3 ? 'text-cyan-400' : 'text-slate-700'}`} size={20} />
                <input 
                  type="text" 
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder={tutorName}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-800 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all font-bold tracking-wide"
                />
              </div>
            </div>

            <button
              disabled={!accepted || signature.length < 4}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-cyan-900/30 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <CheckCircle size={24} />
              CONFIRMAR E ASSINAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DigitalTermsModal;
