import React from 'react';
import { motion } from 'motion/react';
import { ROADMAP_DATA } from '../constants';
import { useApp } from '../context/AppContext';

export const HomePage = () => {
  const { data } = useApp();
  
  const currentIncome = Object.values(data.income).reduce((a: number, b: number) => a + b, 0);
  const targetIncome = 150000; // Example target

  return (
    <div className="grid grid-cols-12 auto-rows-min gap-4 pb-20">
      {/* April 2027 Version of Me */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="col-span-12 lg:col-span-6 row-span-1 border border-luxury-beige rounded-2xl p-6 bg-white flex flex-col justify-center"
      >
        <h4 className="label-uppercase text-luxury-burgundy mb-3">Я в апреле 2027</h4>
        <p className="text-[14px] leading-relaxed italic text-luxury-graphite/80 font-serif">
          «Я просыпаюсь спокойной. У меня есть стабильный доход. Я уверенно работаю с клиентами. Я путешествую. Я чувствую себя красивой и взрослой. У меня есть моя машина. Я больше не боюсь больших целей. Я живу жизнью, которую сама себе построила.»
        </p>
      </motion.div>

      {/* Money / Car Fund */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="col-span-12 lg:col-span-6 row-span-1 bento-card-dark flex flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <span className="label-uppercase opacity-60">Фонд на {data.carFund.name}</span>
          <span className="text-xs">🚗 Цель {(data.carFund.target / 1000000).toFixed(1)}M ₽</span>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-luxury-burgundy h-full rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min(100, (data.carFund.current / data.carFund.target) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between label-uppercase opacity-60">
            <span>{data.carFund.current.toLocaleString()} ₽</span>
            <span>{((data.carFund.current / data.carFund.target) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-12 lg:col-span-4 border border-luxury-beige rounded-2xl p-6 bg-white"
      >
        <h4 className="label-uppercase text-luxury-graphite/40 mb-4">Ценности</h4>
        <div className="space-y-2">
           {["Уверенность", "Дисциплина", "Спокойствие", "Финансовая свобода"].map((val, i) => (
             <div key={i} className="flex items-center gap-3">
               <div className="w-1 h-1 bg-luxury-burgundy rounded-full" />
               <span className="text-xs font-serif italic">{val}</span>
             </div>
           ))}
        </div>
      </motion.div>

      {/* Anti-Burnout / Health Bento */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="col-span-12 lg:col-span-4 bento-card-burgundy flex items-center gap-4"
      >
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center shrink-0">
          <span className="text-xs italic font-serif">!</span>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest opacity-70">Анти-выгорание</p>
          <p className="text-xs leading-tight font-serif italic">Медленный прогресс — тоже прогресс.</p>
        </div>
      </motion.div>

      {/* Full 12-Month Roadmap Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-12 border border-luxury-beige rounded-3xl p-6 md:p-12 bg-white space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-serif italic text-luxury-burgundy uppercase tracking-[0.2em] break-words px-4">ДОРОЖНАЯ КАРТА: МАЙ 2026 → АПРЕЛЬ 2027</h2>
          <p className="text-lg md:text-xl font-serif italic text-luxury-graphite/60 font-normal">«ГОД ВЫХОДА НА НОВЫЙ УРОВЕНЬ»</p>
          <p className="max-w-2xl mx-auto text-[10px] md:text-sm text-luxury-graphite/40 uppercase tracking-widest">От старой версии себя → к самостоятельной, уверенной и финансово сильной версии.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {ROADMAP_DATA.map((month, idx) => (
            <div key={idx} className="p-6 md:p-8 border border-luxury-beige rounded-2xl space-y-6 hover:shadow-xl transition-all group hover:border-luxury-burgundy/20">
              <div className="flex justify-between items-center">
                <span className="text-2xl md:text-3xl font-serif italic text-luxury-burgundy shrink-0">{month.month}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-luxury-graphite/40 mb-2">Фокус:</p>
                  <p className="text-xs font-medium italic">{month.focus}</p>
                </div>

                <div className="space-y-3">
                  {month.goals.map((goalGroup, gIdx) => (
                    <div key={gIdx}>
                      <p className="text-[9px] uppercase font-bold text-luxury-burgundy/60 mb-1">{goalGroup.category}</p>
                      <ul className="space-y-1">
                        {goalGroup.items.map((item, iIdx) => (
                          <li key={iIdx} className="text-[11px] text-luxury-graphite/80 flex gap-2">
                            <span className="shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-luxury-beige">
                  <p className="text-[11px] font-serif italic text-luxury-burgundy/80">
                    {month.mainIdea}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12 border-t border-luxury-beige space-y-4">
          <h3 className="text-2xl font-serif italic text-luxury-burgundy">ФИНАЛ ГОДА</h3>
          <p className="max-w-3xl mx-auto text-sm italic text-luxury-graphite/60">
            К апрелю у меня есть клиенты, стабильный доход, сильные навыки, опыт, поездки, уверенность, дисциплина и ощущение, что я выросла. Этот год — не про «успеть всё». А про: «создать новую версию своей жизни».
          </p>
        </div>
      </motion.div>
    </div>
  );
};
