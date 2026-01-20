
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Users, 
  Dog, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  ClipboardCheck
} from 'lucide-react';

const data = [
  { name: 'Seg', income: 4000, pets: 24 },
  { name: 'Ter', income: 3000, pets: 18 },
  { name: 'Qua', income: 2000, pets: 22 },
  { name: 'Qui', income: 2780, pets: 25 },
  { name: 'Sex', income: 1890, pets: 29 },
  { name: 'Sab', income: 2390, pets: 15 },
];

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }: any) => (
  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 hover:border-slate-700 transition-all group overflow-hidden relative">
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3 rounded-xl ${color} shadow-lg shadow-black/20`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trendValue}
      </div>
    </div>
    <div className="mt-4 relative z-10">
      <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest">{title}</h3>
      <p className="text-2xl font-black text-white mt-1 tracking-tight">{value}</p>
    </div>
    <div className={`absolute -bottom-10 -right-10 w-32 h-32 opacity-[0.03] group-hover:opacity-10 transition-opacity rounded-full bg-white`}></div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Visão Geral</h1>
          <p className="text-slate-500 font-medium">Dog School Plus <span className="text-indigo-500">Insights</span></p>
        </div>
        <button className="bg-slate-800 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-700 hover:text-white transition-all font-bold text-sm">
          <ClipboardCheck size={20} className="text-indigo-400" />
          Exportar Dados
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Pets" value="124" icon={Dog} color="bg-indigo-600" trend="up" trendValue="+12%" />
        <StatCard title="Receita Mensal" value="R$ 15.420" icon={DollarSign} color="bg-emerald-600" trend="up" trendValue="+8.2%" />
        <StatCard title="Check-ins Hoje" value="28" icon={Calendar} color="bg-orange-600" trend="down" trendValue="-4%" />
        <StatCard title="Novos Tutores" value="14" icon={Users} color="bg-pink-600" trend="up" trendValue="+22%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white uppercase tracking-wider">Faturamento Diário</h3>
            <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-400 outline-none hover:border-slate-700 cursor-pointer">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#f1f5f9', fontWeight: 800 }}
                  labelStyle={{ color: '#64748b', marginBottom: '4px', fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="income" stroke="#6366f1" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={4} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">
          <h3 className="text-lg font-black text-white uppercase tracking-wider mb-8">Acessos Creche</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#1e293b', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}
                  itemStyle={{ color: '#f97316', fontWeight: 800 }}
                />
                <Bar dataKey="pets" fill="#f97316" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-10 rounded-3xl border border-indigo-500/20 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Sua gestão com <span className="text-orange-500 italic">Super Poderes</span></h2>
            <p className="text-slate-400 font-bold text-lg max-w-xl">Nosso sistema inteligente ajuda você a focar no que importa: <span className="text-white">o bem-estar dos pets</span>. Gerencie tudo em um só lugar.</p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3.5 rounded-2xl font-black transition-all shadow-xl shadow-orange-900/30 active:scale-95">
                Ver Indicadores
              </button>
              <button className="bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 px-8 py-3.5 rounded-2xl font-black transition-all active:scale-95">
                Suporte VIP
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
             <div className="w-56 h-56 bg-orange-600/10 rounded-full flex items-center justify-center border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                <Dog size={120} className="text-orange-500" />
             </div>
          </div>
        </div>
        
        {/* Retro Grid / Glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Dashboard;
