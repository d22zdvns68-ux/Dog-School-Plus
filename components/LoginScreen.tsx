
import React, { useState } from 'react';
import { Dog, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';
import { User, View } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - Em um sistema real, isso validaria contra o BD
    if (username === 'admin' && password === '1234') {
      onLogin({
        id: '1',
        username: 'Administrador Master',
        role: 'master',
        // Fix: Removed 'require' and used imported View enum for browser environment compatibility
        permissions: Object.values(View) as any
      });
    } else if (username === 'user' && password === '1234') {
      onLogin({
        id: '2',
        username: 'Atendente João',
        role: 'atendente',
        // Fix: Use View enum for type safety and consistency
        permissions: [View.Dashboard, View.Pets, View.POS, View.Daycare] as any
      });
    } else {
      setError('Credenciais inválidas. Tente admin/1234 ou user/1234');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl shadow-black/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl flex items-center justify-center shadow-lg shadow-orange-900/40 mb-4 rotate-3 hover:rotate-0 transition-transform duration-500">
              <Dog className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              Dog School <span className="text-orange-500">Plus</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em] mt-2">Login do Sistema</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Usuário</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-700 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-bold"
                  placeholder="Seu login..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-700 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-900/30 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
            >
              <ShieldCheck size={24} />
              ACESSAR PAINEL
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-800/50 text-center">
            <p className="text-slate-600 text-xs font-bold">
              PROBLEMAS COM O ACESSO? <br />
              <span className="text-orange-500 cursor-pointer hover:underline">CONTATE O ADMINISTRADOR MASTER</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
