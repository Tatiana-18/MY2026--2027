import React, { useState } from 'react';
import { SectionHeader } from './CareerPage';
import { RotateCcw, Target, Zap, Gift, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';
import { ROADMAP_DATA } from '../constants';

export const ResetPage = () => {
  const { data, updateData } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(ROADMAP_DATA[0].month);

  const resetData = data.resets[selectedMonth] || {
    month: selectedMonth,
    theme: '',
    successMetric: '',
    goals: ['', '', ''],
    habits: {},
    reflection: '',
    reward: ''
  };

  const updateReset = (updater: (prev: any) => any) => {
    updateData(prev => ({
      ...prev,
      resets: {
        ...prev.resets,
        [selectedMonth]: updater(resetData)
      }
    }));
  };

  return (
    <div className="space-y-16 pb-20">
      <SectionHeader title="Ежемесячный Ресет" subtitle="Стратегическая сонастройка на месяц вперед" icon={RotateCcw} />

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {ROADMAP_DATA.map(m => (
          <button 
            key={m.month}
            onClick={() => setSelectedMonth(m.month)}
            className={cn(
              "px-6 py-2 rounded-full whitespace-nowrap transition-all uppercase text-[10px] tracking-widest font-bold",
              selectedMonth === m.month ? "bg-luxury-burgundy text-white" : "bg-luxury-beige/30 text-luxury-graphite hover:bg-luxury-beige/50"
            )}
          >
            {m.month}
          </button>
        ))}
      </div>

      <section className="bg-white p-12 lg:p-20 rounded-[60px] border border-luxury-beige shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <RotateCcw size={200} />
        </div>

        <div className="max-w-3xl space-y-16 relative z-10">
          <div className="space-y-4">
             <div className="text-5xl font-serif italic text-luxury-burgundy border-b border-luxury-beige pb-4">{selectedMonth}</div>
             <div className="grid sm:grid-cols-2 gap-12">
                <ResetField 
                  label="Тема" 
                  placeholder="дисциплина, рост, ресет..." 
                  value={resetData.theme}
                  onChange={(val: string) => updateReset(prev => ({ ...prev, theme: val }))}
                />
                <ResetField 
                  label="Метрика успеха" 
                  placeholder="Контент важнее идеала" 
                  value={resetData.successMetric}
                  onChange={(val: string) => updateReset(prev => ({ ...prev, successMetric: val }))}
                />
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
                <Target size={24} /> Главные цели
              </h3>
              <ul className="space-y-6">
                {(resetData.goals || ['', '', '']).map((goal: string, i: number) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <span className="text-luxury-burgundy font-serif">0{i+1}.</span>
                    <input 
                      type="text" 
                      placeholder="Детали цели..." 
                      value={goal}
                      onChange={(e) => {
                        const newGoals = [...(resetData.goals || ['', '', ''])];
                        newGoals[i] = e.target.value;
                        updateReset(prev => ({ ...prev, goals: newGoals }));
                      }}
                      className="flex-1 bg-transparent border-b border-luxury-beige focus:border-luxury-burgundy focus:outline-none pb-1 transition-all" 
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
                <Zap size={24} /> Привычки
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 {['Английский', 'Контент', 'Спорт', 'Питание', 'Чтение', 'Продажи'].map(habit => (
                   <HabitToggle 
                    key={habit} 
                    label={habit} 
                    active={!!resetData.habits[habit]}
                    onChange={() => updateReset(prev => ({
                      ...prev,
                      habits: { ...prev.habits, [habit]: !prev.habits[habit] }
                    }))}
                   />
                 ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 border-t border-luxury-beige pt-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
                 Что сделает этот месяц успешным?
              </h3>
              <textarea 
                className="w-full h-32 bg-luxury-beige/20 rounded-2xl p-6 text-sm italic focus:outline-none focus:ring-1 focus:ring-luxury-burgundy" 
                placeholder="Чувство безопасности или результат..."
                value={resetData.reflection}
                onChange={(e) => updateReset(prev => ({ ...prev, reflection: e.target.value }))}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
                <Gift size={24} /> Награда месяца
              </h3>
              <textarea 
                placeholder="Что я себе подарю?"
                value={resetData.reward}
                onChange={(e) => updateReset(prev => ({ ...prev, reward: e.target.value }))}
                className="w-full p-8 border-2 border-dashed border-luxury-beige rounded-3xl text-center italic text-lg focus:outline-none focus:border-luxury-burgundy transition-all bg-transparent min-h-[120px] resize-none"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ResetField = ({ label, placeholder, value, onChange }: any) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold uppercase tracking-widest text-luxury-graphite/40 font-sans">{label}</p>
    <input 
      type="text" 
      placeholder={placeholder} 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border-b border-luxury-beige focus:outline-none focus:border-luxury-burgundy italic text-lg w-full" 
    />
  </div>
);

const HabitToggle = ({ label, active, onChange }: any) => {
  return (
    <button 
      onClick={onChange}
      className={cn(
        "p-4 rounded-xl border flex justify-between items-center transition-all min-h-[56px]",
        active ? "bg-luxury-burgundy text-white border-luxury-burgundy" : "bg-white border-luxury-beige hover:border-luxury-burgundy/20"
      )}
    >
      <span className="text-[10px] font-bold uppercase tracking-tight font-sans flex-1 text-center leading-none px-1">{label}</span>
      {active && <CheckCircle2 size={14} className="ml-2 shrink-0" />}
    </button>
  );
};
