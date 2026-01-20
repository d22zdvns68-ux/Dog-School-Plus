
import React, { useState } from 'react';
import { ShoppingBag, Search, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, Split } from 'lucide-react';

const POSSystem: React.FC = () => {
  const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const [paymentStep, setPaymentStep] = useState(false);

  const inventory = [
    { id: 'p1', name: 'Ração Premier 1kg', price: 45.90 },
    { id: 'p2', name: 'Brinquedo Mordedor', price: 29.90 },
    { id: 's1', name: 'Banho Avulso G', price: 85.00 },
    { id: 's2', name: 'Tosa Higiênica', price: 40.00 },
    { id: 'p3', name: 'Petisco Dental', price: 12.50 },
  ];

  const addToCart = (item: any) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i));
    } else {
      setCart([...cart, {...item, qty: 1}]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ponto de Venda (PDV)</h1>
          <p className="text-slate-500">Fluxo rápido para balcão e serviços.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
           <Search size={18} className="text-slate-400 ml-2" />
           <input type="text" placeholder="Cliente ou Pet..." className="bg-transparent outline-none text-sm font-medium w-48" />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col min-h-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-2">
            {inventory.map(item => (
              <button key={item.id} onClick={() => addToCart(item)} className="p-4 bg-slate-50 hover:bg-yellow-50 hover:border-yellow-200 border border-slate-100 rounded-2xl transition-all text-left flex flex-col justify-between group">
                <p className="font-bold text-slate-800 text-sm mb-4 leading-tight">{item.name}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-yellow-600">R$ {item.price.toFixed(2)}</span>
                  <div className="bg-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm transition-all"><Plus size={16} className="text-yellow-600" /></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[400px] bg-[#1E293B] rounded-2xl shadow-xl flex flex-col text-white overflow-hidden">
          <div className="p-6 bg-slate-800/50 flex items-center justify-between">
             <div className="flex items-center gap-2">
               <ShoppingBag className="text-yellow-500" />
               <h3 className="font-bold">Carrinho</h3>
             </div>
             <span className="bg-white/10 px-2 py-0.5 rounded-md text-xs font-bold">{cart.length} itens</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10">
                <ShoppingBag size={48} className="mb-4" />
                <p className="text-sm font-medium">O carrinho está vazio</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                 <div className="flex-1">
                   <p className="text-sm font-bold">{item.name}</p>
                   <p className="text-xs text-slate-400">{item.qty}x R$ {item.price.toFixed(2)}</p>
                 </div>
                 <div className="flex items-center gap-2">
                   <p className="font-bold text-sm">R$ {(item.price * item.qty).toFixed(2)}</p>
                   <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-500 p-1"><Trash2 size={16} /></button>
                 </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-800/80 border-t border-white/10 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="font-bold">R$ {total.toFixed(2)}</span>
             </div>
             <div className="flex items-center justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-yellow-500">R$ {total.toFixed(2)}</span>
             </div>

             {paymentStep ? (
               <div className="space-y-2 pt-2 animate-in slide-in-from-bottom-2">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Forma de Pagamento</p>
                 <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-emerald-500 transition-all rounded-xl text-xs font-bold"><Banknote size={16} /> Dinheiro</button>
                    <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-indigo-500 transition-all rounded-xl text-xs font-bold"><CreditCard size={16} /> Cartão</button>
                    <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-cyan-500 transition-all rounded-xl text-xs font-bold"><QrCode size={16} /> Pix</button>
                    <button className="flex items-center gap-2 p-3 bg-white/5 hover:bg-orange-500 transition-all rounded-xl text-xs font-bold"><Split size={16} /> Misto</button>
                 </div>
                 <button onClick={() => { alert('Venda Finalizada!'); setCart([]); setPaymentStep(false); }} className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-[#1E293B] py-3 rounded-xl font-black transition-all">FINALIZAR VENDA</button>
                 <button onClick={() => setPaymentStep(false)} className="w-full text-xs text-slate-500 hover:text-white font-bold py-2 transition-all">Voltar ao Carrinho</button>
               </div>
             ) : (
               <button 
                 onClick={() => cart.length > 0 && setPaymentStep(true)} 
                 disabled={cart.length === 0}
                 className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#1E293B] py-3 rounded-xl font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 PAGAMENTO
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;
