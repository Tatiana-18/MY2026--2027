import React from 'react';
import { SectionHeader } from './CareerPage';
import { Wind, Coffee, Moon, CloudRain, Minimize2, Waves, Smartphone } from 'lucide-react';

export const AntiBurnoutPage = () => {
  return (
    <div className="space-y-16">
      <SectionHeader title="Когда я чувствую себя потерянной" subtitle="Мягкая навигация в тяжелые дни" icon={Wind} />

      <section className="grid lg:grid-cols-2 gap-12">
        <div className="bg-luxury-burgundy text-white p-16 rounded-[40px] space-y-12">
           <h3 className="text-4xl font-serif italic text-white">Чего НЕ делать</h3>
           <div className="space-y-8">
              <RuleItem icon={CloudRain} text="Не сравнивать себя с другими в их пике" />
              <RuleItem icon={Minimize2} text="Не бросать всё из-за одного плохого дня" />
              <RuleItem icon={Minimize2} text="Не обесценивать проделанный путь" />
           </div>
           <div className="pt-12 border-t border-white/10">
              <p className="font-serif italic text-xl opacity-60 text-white">«Твои сегодняшние трудности — это не твое постоянное состояние.»</p>
           </div>
        </div>

        <div className="bg-white p-16 rounded-[40px] border border-luxury-beige space-y-12 shadow-sm">
           <h3 className="text-4xl font-serif italic text-luxury-burgundy">План восстановления</h3>
           <div className="space-y-8">
              <PlanStep number="01" title="Снизить нагрузку" desc="Делать абсолютный минимум необходимого." />
              <PlanStep number="02" title="Сон и вода" desc="Сначала восстановите физическое состояние." />
              <PlanStep number="03" title="Медленное возвращение" desc="Одна маленькая задача за раз." />
           </div>
           <div className="bg-luxury-beige/30 p-8 rounded-3xl">
              <p className="text-sm font-medium tracking-widest uppercase text-luxury-graphite/40 mb-2">Напоминание</p>
              <p className="font-serif italic text-2xl">Медленный прогресс — тоже прогресс.</p>
           </div>
        </div>
      </section>

      <div className="text-center max-w-2xl mx-auto space-y-8">
         <div className="flex justify-center flex-wrap gap-8 md:gap-12">
            <ActionIcon icon={Waves} label="Выпить воды" />
            <ActionIcon icon={Moon} label="Лечь спать пораньше" />
            <ActionIcon icon={Smartphone} label="Отложить телефон" />
         </div>
      </div>
    </div>
  );
};

const RuleItem = ({ icon: Icon, text }: any) => (
  <div className="flex items-center gap-6 group">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
      <Icon size={18} />
    </div>
    <span className="text-xl font-light">{text}</span>
  </div>
);

const PlanStep = ({ number, title, desc }: any) => (
  <div className="flex gap-8">
    <span className="text-luxury-burgundy font-serif text-3xl font-bold opacity-20">{number}</span>
    <div>
      <h4 className="text-xl font-serif mb-1">{title}</h4>
      <p className="text-sm text-luxury-graphite/60">{desc}</p>
    </div>
  </div>
);

const ActionIcon = ({ icon: Icon, label }: any) => (
  <div className="flex flex-col items-center gap-3 group">
    <div className="w-16 h-16 rounded-full border border-luxury-beige flex items-center justify-center hover:bg-luxury-burgundy hover:text-white transition-all cursor-pointer">
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-graphite/40">{label}</span>
  </div>
);
