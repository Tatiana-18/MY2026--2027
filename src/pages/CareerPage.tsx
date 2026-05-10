import React, { useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Briefcase, Target, Layers, TrendingUp, Edit2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CareerPage = () => {
  const { data, updateData } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const incomeData = Object.entries(data.income).map(([month, amount]) => ({
    month,
    amount
  }));

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-16">
      <SectionHeader title="Карьерный Дашборд" subtitle="Построение цифровой империи" icon={Briefcase} />

      {/* Top Stats */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group">
          <StatCard 
            title="Активные клиенты" 
            value={isEditing ? (
              <input 
                type="number"
                value={data.career.activeClients}
                onChange={(e) => updateData(prev => ({ ...prev, career: { ...prev.career, activeClients: parseInt(e.target.value) || 0 } }))}
                className="bg-transparent border-b border-luxury-burgundy focus:outline-none w-24 text-3xl font-serif"
              />
            ) : data.career.activeClients.toString()}
            sub="Фокус на высокую эффективность" 
          />
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-luxury-beige/20 rounded-full hover:bg-luxury-beige/40"
          >
            {isEditing ? <Check size={16} /> : <Edit2 size={16} />}
          </button>
        </div>
        
        <div className="relative group">
          <StatCard 
            title="Средний чек" 
            value={isEditing ? (
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  value={data.career.avgCheck}
                  onChange={(e) => updateData(prev => ({ ...prev, career: { ...prev.career, avgCheck: parseInt(e.target.value) || 0 } }))}
                  className="bg-transparent border-b border-luxury-burgundy focus:outline-none w-32 text-3xl font-serif"
                />
                <span className="text-xl">₽</span>
              </div>
            ) : `${data.career.avgCheck.toLocaleString()} ₽`}
            sub="Рост экспертности" 
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card title="Скиллы" items={["Продвинутые продажи", "Анализ рынка", "Таргет (Новый уровень)", "Английский (Speaking)"]}>
          <Target className="text-luxury-burgundy" size={20} />
        </Card>
        <Card title="Проект приложения" items={["Этап разработки", "Релиз: Июль 2026", "Стратегия монетизации", "Рекламная кампания"]}>
          <Layers className="text-luxury-burgundy" size={20} />
        </Card>
      </div>
    </div>
  );
};

export const SectionHeader = ({ title, subtitle, icon: Icon }: any) => (
  <div className="space-y-1 md:space-y-2">
    <div className="flex items-center gap-3 md:gap-4">
      {Icon && (
        <>
          <Icon className="text-luxury-burgundy shrink-0 md:hidden" size={24} />
          <Icon className="text-luxury-burgundy shrink-0 hidden md:block" size={32} />
        </>
      )}
      <h1 className="text-2xl md:text-5xl font-serif">{title}</h1>
    </div>
    <p className="text-luxury-graphite/40 font-serif italic text-sm md:text-lg">{subtitle}</p>
  </div>
);

const StatCard = ({ title, value, sub }: any) => (
  <div className="p-6 md:p-8 bg-white border border-luxury-beige rounded-[24px] md:rounded-[32px] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-center">
    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-graphite/40 mb-3 md:mb-4">{title}</p>
    <div className="text-2xl md:text-3xl font-serif mb-2">{value}</div>
    <p className="text-[10px] md:text-xs text-luxury-burgundy italic">{sub}</p>
  </div>
);

const Card = ({ title, items, children }: any) => (
  <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-luxury-beige hover:border-luxury-burgundy/20 transition-all">
    <div className="flex justify-between items-start mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-serif italic text-luxury-burgundy">{title}</h3>
      {children}
    </div>
    <ul className="space-y-2 md:space-y-3">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-center gap-2 md:gap-3 text-[13px] md:text-sm text-luxury-graphite/80 font-serif italic md:font-sans md:not-italic">
          <div className="w-1 h-1 rounded-full bg-luxury-burgundy shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);
