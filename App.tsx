
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Dog, 
  Calendar, 
  DollarSign, 
  Package, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search,
  Bed,
  Stethoscope,
  Scissors,
  ShoppingBag,
  Users as UsersIcon,
  LogOut
} from 'lucide-react';
import { View, User } from './types';
import Dashboard from './components/Dashboard';
import PetManagement from './components/PetManagement';
import DaycareManagement from './components/DaycareManagement';
import HospedagemManagement from './components/HospedagemManagement';
import ClinicManagement from './components/ClinicManagement';
import GroomingManagement from './components/GroomingManagement';
import POSSystem from './components/POSSystem';
import FinanceManagement from './components/FinanceManagement';
import InventoryManagement from './components/InventoryManagement';
import UserManagement from './components/UserManagement';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  const menuItems = [
    { id: View.Dashboard, label: 'Dashboard', icon: LayoutDashboard, color: 'hover:text-indigo-400', active: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50' },
    { id: View.Pets, label: 'Pets & Tutores', icon: Dog, color: 'hover:text-pink-400', active: 'bg-pink-600/20 text-pink-400 border-pink-500/50' },
    { id: View.POS, label: 'Vendas / PDV', icon: ShoppingBag, color: 'hover:text-yellow-400', active: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50' },
    { id: View.Daycare, label: 'Creche', icon: Calendar, color: 'hover:text-orange-400', active: 'bg-orange-600/20 text-orange-400 border-orange-500/50' },
    { id: View.Hospedagem, label: 'Hospedagem', icon: Bed, color: 'hover:text-cyan-400', active: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/50' },
    { id: View.Clinic, label: 'Clínica Vet', icon: Stethoscope, color: 'hover:text-rose-400', active: 'bg-rose-600/20 text-rose-400 border-rose-500/50' },
    { id: View.Grooming, label: 'Banho & Tosa', icon: Scissors, color: 'hover:text-sky-400', active: 'bg-sky-600/20 text-sky-400 border-sky-500/50' },
    { id: View.Finance, label: 'Financeiro', icon: DollarSign, color: 'hover:text-emerald-400', active: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50' },
    { id: View.Inventory, label: 'Estoque', icon: Package, color: 'hover:text-purple-400', active: 'bg-purple-600/20 text-purple-400 border-purple-500/50' },
    { id: View.Users, label: 'Usuários', icon: UsersIcon, color: 'hover:text-indigo-300', active: 'bg-indigo-500/30 text-indigo-300 border-indigo-400/50' },
    { id: View.Settings, label: 'Ajustes', icon: Settings, color: 'hover:text-slate-400', active: 'bg-slate-600/20 text-slate-400 border-slate-500/50' },
  ];

  // Filtra os itens do menu com base nas permissões do usuário logado
  const allowedMenuItems = menuItems.filter(item => 
    currentUser.permissions.includes(item.id)
  );

  const renderContent = () => {
    switch (activeView) {
      case View.Dashboard: return <Dashboard />;
      case View.Pets: return <PetManagement />;
      case View.Daycare: return <DaycareManagement />;
      case View.Hospedagem: return <HospedagemManagement />;
      case View.Clinic: return <ClinicManagement />;
      case View.Grooming: return <GroomingManagement />;
      case View.POS: return <POSSystem />;
      case View.Finance: return <FinanceManagement />;
      case View.Inventory: return <InventoryManagement />;
      case View.Users: return <UserManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-900/20">
            <Dog className="text-white" size={24} />
          </div>
          {isSidebarOpen && (
            <span className="font-extrabold text-xl tracking-tight text-white whitespace-nowrap">
              Dog School <span className="text-orange-500">Plus</span>
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 mt-2 overflow-y-auto custom-scrollbar pb-6 space-y-1">
          {allowedMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border border-transparent ${
                activeView === item.id 
                  ? `${item.active} shadow-xl` 
                  : `text-slate-500 ${item.color} hover:bg-slate-800/50`
              }`}
            >
              <item.icon size={22} className="shrink-0" />
              {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-2">
          <button 
            onClick={() => setCurrentUser(null)}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all font-bold"
          >
            <LogOut size={22} className="shrink-0" />
            {isSidebarOpen && <span className="text-sm">Sair do Sistema</span>}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar em todo o sistema..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
              <Bell size={22} /><span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-600 border-2 border-slate-950 rounded-full"></span>
            </button>
            <div className="h-10 w-[1px] bg-slate-800"></div>
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{currentUser.username}</p>
                <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">{currentUser.role}</p>
              </div>
              <div className="relative">
                <img src={`https://picsum.photos/seed/${currentUser.username}/40/40`} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-slate-800 group-hover:border-indigo-500 transition-all" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#020617]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
