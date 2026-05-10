import React, { useState } from 'react';
import { SectionHeader } from './CareerPage';
import { Wallet, Car, PiggyBank, Scale, Edit2, Check, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const MoneyPage = () => {
  const { data, updateData } = useApp();
  const [isEditingCar, setIsEditingCar] = useState(false);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [isAddingSaving, setIsAddingSaving] = useState(false);

  const percentage = Math.round((data.carFund.current / data.carFund.target) * 100);

  const handleUpdateIncome = (month: string, value: string) => {
    const amount = parseInt(value) || 0;
    updateData(prev => ({
      ...prev,
      income: { ...prev.income, [month]: amount }
    }));
  };

  const handleAddSaving = () => {
    const label = prompt("Название сбережения:");
    const amountStr = prompt("Сумма:");
    if (label && amountStr) {
      updateData(prev => ({
        ...prev,
        savings: [...prev.savings, { id: Date.now().toString(), label, amount: parseInt(amountStr) || 0 }]
      }));
    }
  };

  const handleDeleteSaving = (id: string) => {
    updateData(prev => ({
      ...prev,
      savings: prev.savings.filter(s => s.id !== id)
    }));
  };

  const handleUpdateSaving = (id: string, label: string, amount: number) => {
    const newAmount = prompt(`Новая сумма для ${label}:`, amount.toString());
    if (newAmount !== null) {
      updateData(prev => ({
        ...prev,
        savings: prev.savings.map(s => s.id === id ? { ...s, amount: parseInt(newAmount) || 0 } : s)
      }));
    }
  };

  return (
    <div className="space-y-16">
      <SectionHeader title="Моя денежная эра" subtitle="Финансовая свобода и ценные активы" icon={Wallet} />

      {/* Car Fund */}
      <section className="bg-luxury-graphite text-white p-6 md:p-12 rounded-[24px] md:rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 md:p-8">
          <Car size={40} className="text-white/5 opacity-40 rotate-12 md:hidden" />
          <Car size={80} className="text-white/5 opacity-40 rotate-12 hidden md:block" />
        </div>
        <div className="relative z-10 space-y-6 md:space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1 md:space-y-2">
              <h2 className="text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-luxury-silver font-sans">Фонд на машину</h2>
              {isEditingCar ? (
                <input 
                  type="text"
                  value={data.carFund.name}
                  onChange={(e) => updateData(prev => ({ ...prev, carFund: { ...prev.carFund, name: e.target.value } }))}
                  className="bg-transparent border-b border-white focus:outline-none w-full text-2xl md:text-5xl font-serif"
                />
              ) : (
                <p className="text-2xl md:text-5xl font-serif">🚗 {data.carFund.name}</p>
              )}
            </div>
            <button 
              onClick={() => setIsEditingCar(!isEditingCar)}
              className="p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
            >
              {isEditingCar ? (
                <>
                  <Check size={16} className="md:hidden" />
                  <Check size={20} className="hidden md:block" />
                </>
              ) : (
                <>
                  <Edit2 size={16} className="md:hidden" />
                  <Edit2 size={20} className="hidden md:block" />
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-serif mb-4">
              <div className="space-y-1">
                <span className="opacity-60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest block font-sans">Текущие накопления:</span>
                {isEditingCar ? (
                  <input 
                    type="number"
                    value={data.carFund.current}
                    onChange={(e) => updateData(prev => ({ ...prev, carFund: { ...prev.carFund, current: parseInt(e.target.value) || 0 } }))}
                    className="bg-transparent border-b border-white focus:outline-none w-full text-lg md:text-xl"
                  />
                ) : (
                  <span className="text-lg md:text-xl">{data.carFund.current.toLocaleString()} ₽</span>
                )}
              </div>
              <div className="space-y-1">
                <span className="opacity-60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest block font-sans">Финансовая цель:</span>
                {isEditingCar ? (
                  <input 
                    type="number"
                    value={data.carFund.target}
                    onChange={(e) => updateData(prev => ({ ...prev, carFund: { ...prev.carFund, target: parseInt(e.target.value) || 0 } }))}
                    className="bg-transparent border-b border-white focus:outline-none w-full text-lg md:text-xl"
                  />
                ) : (
                  <span className="text-lg md:text-xl">{data.carFund.target.toLocaleString()} ₽</span>
                )}
              </div>
            </div>
            
            <div className="h-2.5 md:h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-luxury-burgundy to-white/40"
              />
            </div>
            <p className="text-right text-[10px] md:text-xs font-serif italic text-luxury-silver">{percentage}% Выполнено</p>
          </div>
        </div>
      </section>

        {/* Monthly Tracker */}
        <div className="space-y-8 col-span-full">
          <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
             Ежемесячный доход
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            {Object.entries(data.income).map(([month, amount], i) => (
              <div 
                key={month} 
                className="flex justify-between items-center p-6 bg-white border border-luxury-beige rounded-2xl hover:border-luxury-burgundy/20 transition-all group"
              >
                <span className="font-medium">{month}</span>
                <div className="text-right flex items-center gap-4">
                  {editingMonth === month ? (
                    <input 
                      autoFocus
                      type="number"
                      defaultValue={amount}
                      onBlur={(e) => {
                        handleUpdateIncome(month, e.target.value);
                        setEditingMonth(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateIncome(month, (e.target as HTMLInputElement).value);
                          setEditingMonth(null);
                        }
                      }}
                      className="w-32 bg-luxury-beige/20 border-b border-luxury-burgundy text-right focus:outline-none font-serif text-lg"
                    />
                  ) : (
                    <div 
                      onClick={() => setEditingMonth(month)}
                      className="cursor-pointer group flex items-center gap-3"
                    >
                      <div className="text-lg font-serif text-luxury-burgundy">{amount.toLocaleString()} ₽</div>
                      <Edit2 size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    </div>
                  )}
                  <div className="text-[10px] text-luxury-graphite/40 uppercase font-bold tracking-widest font-sans">Факт</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-6 col-span-full">
          <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
            <Scale size={24} /> Финансовые правила
          </h3>
          <div className="space-y-4 bg-white p-8 rounded-3xl border border-luxury-beige italic">
             <p className="flex items-center gap-4">
               <span className="text-luxury-burgundy font-bold">01.</span> 
               20% с каждого дохода сразу в накопления
             </p>
             <p className="flex items-center gap-4">
               <span className="text-luxury-burgundy font-bold">02.</span> 
               Никаких импульсивных покупок (ждем 48ч для люкса)
             </p>
             <p className="flex items-center gap-4">
               <span className="text-luxury-burgundy font-bold">03.</span> 
               Еженедельный учет расходов каждое воскресенье
             </p>
          </div>
        </div>
    </div>
  );
};
