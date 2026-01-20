
import React, { useState } from 'react';
import { Users, UserPlus, Shield, Check, X, ShieldAlert, Key } from 'lucide-react';
import { User, View } from '../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'admin_master', role: 'master', permissions: Object.values(View) },
    { id: '2', username: 'joao_atendente', role: 'atendente', permissions: [View.Dashboard, View.Pets, View.POS] },
    { id: '3', username: 'dra_amanda', role: 'veterinario', permissions: [View.Dashboard, View.Pets, View.Clinic] },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    username: '',
    role: 'atendente',
    permissions: [View.Dashboard]
  });

  const availableModules = [
    { id: View.Dashboard, label: 'Dashboard', color: 'bg-indigo-500' },
    { id: View.Pets, label: 'Pets & Tutores', color: 'bg-pink-500' },
    { id: View.POS, label: 'Vendas / PDV', color: 'bg-yellow-500' },
    { id: View.Daycare, label: 'Creche', color: 'bg-orange-500' },
    { id: View.Hospedagem, label: 'Hospedagem', color: 'bg-cyan-500' },
    { id: View.Clinic, label: 'Clínica Vet', color: 'bg-rose-500' },
    { id: View.Grooming, label: 'Banho & Tosa', color: 'bg-sky-500' },
    { id: View.Finance, label: 'Financeiro', color: 'bg-emerald-500' },
    { id: View.Inventory, label: 'Estoque', color: 'bg-purple-500' },
    { id: View.Users, label: 'Gestão Usuários', color: 'bg-slate-500' },
  ];

  const togglePermission = (moduleId: View) => {
    setNewUser(prev => {
      const current = prev.permissions || [];
      if (current.includes(moduleId)) {
        return { ...prev, permissions: current.filter(id => id !== moduleId) };
      } else {
        return { ...prev, permissions: [...current, moduleId] };
      }
    });
  };

  const handleSave = () => {
    if (!newUser.username) return;
    const userToSave = {
      ...newUser,
      id: Math.random().toString(36).substr(2, 9),
    } as User;
    setUsers([...users, userToSave]);
    setIsAdding(false);
    setNewUser({ username: '', role: 'atendente', permissions: [View.Dashboard] });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Gestão de Usuários</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Controle de Acessos e Permissões Master</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-indigo-900/20 transition-all active:scale-95"
        >
          <UserPlus size={20} /> Novo Usuário
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-4">
          {users.map(user => (
            <div key={user.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between hover:border-slate-700 transition-all group">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${user.role === 'master' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  {user.username[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-slate-100">{user.username}</p>
                    {user.role === 'master' && <Shield size={14} className="text-orange-500" />}
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 max-w-[400px] flex-wrap justify-end">
                {user.permissions.map(perm => (
                  <span key={perm} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-slate-800 text-slate-400 rounded-lg border border-slate-700 group-hover:border-slate-600">
                    {perm}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 ml-4">
                <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"><Key size={18} /></button>
                <button className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"><X size={18} /></button>
              </div>
            </div>
          ))}
        </div>

        {isAdding && (
          <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 h-fit space-y-6 animate-in slide-in-from-right-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <ShieldAlert size={24} />
              <h3 className="font-black text-lg">Configurar Acesso</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Nome de Usuário</label>
                <input 
                  type="text" 
                  value={newUser.username}
                  onChange={e => setNewUser({...newUser, username: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none text-sm font-bold"
                  placeholder="ex: pedro_vendas"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Perfil de Cargo</label>
                <select 
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value as any})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none text-sm font-bold cursor-pointer"
                >
                  <option value="atendente">Atendente / Recepção</option>
                  <option value="veterinario">Veterinário(a)</option>
                  <option value="tosador">Tosador / Banhista</option>
                  <option value="master">Master (Total)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Permissões de Módulos</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableModules.map(module => (
                    <button
                      key={module.id}
                      onClick={() => togglePermission(module.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-[10px] font-black uppercase transition-all ${
                        newUser.permissions?.includes(module.id)
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                          : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      {newUser.permissions?.includes(module.id) ? <Check size={14} /> : <div className="w-3.5 h-3.5" />}
                      {module.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-slate-800 text-slate-300 py-3 rounded-xl font-black text-sm hover:bg-slate-700 transition-all"
              >
                CANCELAR
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-black text-sm hover:bg-indigo-500 transition-all"
              >
                CRIAR LOGIN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
