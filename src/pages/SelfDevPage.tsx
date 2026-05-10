import React, { useState } from 'react';
import { SectionHeader } from './CareerPage';
import { Sparkles, Book as BookIcon, Languages, Award, PlusCircle, Trash2, Edit2, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';
import { Book } from '../types';

export const SelfDevPage = () => {
  const { data, updateData } = useApp();
  const [isEditingLevel, setIsEditingLevel] = useState(false);

  const handleBookUpdate = (idx: number, field: keyof Book, value: string) => {
    updateData(prev => {
      const newBooks = [...prev.selfDev.books];
      // Ensure the array has enough elements
      while (newBooks.length <= idx) {
        newBooks.push({ id: Math.random().toString(), title: '', author: '', month: '', status: 'В очереди' });
      }
      newBooks[idx] = { ...newBooks[idx], [field]: value };
      return {
        ...prev,
        selfDev: { ...prev.selfDev, books: newBooks }
      };
    });
  };

  const handleUpdateBookStatus = (idx: number, status: 'Читаю' | 'В очереди' | 'Прочитано') => {
    updateData(prev => {
      const newBooks = [...prev.selfDev.books];
      while (newBooks.length <= idx) {
        newBooks.push({ id: Math.random().toString(), title: '', author: '', month: '', status: 'В очереди' });
      }
      newBooks[idx] = { ...newBooks[idx], status };
      return {
        ...prev,
        selfDev: { ...prev.selfDev, books: newBooks }
      };
    });
  };

  return (
    <div className="space-y-16">
      <SectionHeader title="Становление Собой" subtitle="Развитие мышления и личности" icon={Sparkles} />

      <div className="grid lg:grid-cols-1 gap-12">
        <section className="space-y-8">
          <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
             <Languages size={24} /> Прогресс в английском
          </h3>
          <div className="bg-white p-10 rounded-[40px] border border-luxury-beige space-y-8 relative group">
            <button 
              onClick={() => setIsEditingLevel(!isEditingLevel)}
              className="absolute top-6 right-6 p-2 bg-luxury-beige/20 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-luxury-beige/40"
            >
              {isEditingLevel ? <Check size={16} /> : <Edit2 size={16} />}
            </button>
            
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-luxury-graphite/40 font-sans">Текущий уровень / Мышление</p>
                {isEditingLevel ? (
                  <input 
                    type="text"
                    value={data.selfDev.languageLevel}
                    onChange={(e) => updateData(prev => ({ ...prev, selfDev: { ...prev.selfDev, languageLevel: e.target.value } }))}
                    className="bg-transparent border-b border-luxury-burgundy focus:outline-none w-full text-3xl font-serif italic"
                  />
                ) : (
                  <div className="text-4xl font-serif italic text-luxury-burgundy">{data.selfDev.languageLevel}</div>
                )}
              </div>
            </div>
            <div className="p-6 bg-luxury-beige/10 rounded-2xl italic text-sm text-luxury-graphite/60 text-center">
              «Я не просто учу слова, я учусь думать и чувствовать на другом языке.»
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-serif italic text-luxury-burgundy flex items-center gap-3">
               <BookIcon size={24} /> 10 Книг Челлендж
            </h3>
          </div>
          <div className="bg-white rounded-3xl border border-luxury-beige overflow-x-auto shadow-sm">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-luxury-beige/10">
                  <th className="px-6 py-4 text-left text-[10px] uppercase font-bold tracking-widest text-luxury-graphite/40">Книга</th>
                  <th className="px-6 py-4 text-left text-[10px] uppercase font-bold tracking-widest text-luxury-graphite/40">Месяц</th>
                  <th className="px-6 py-4 text-right text-[10px] uppercase font-bold tracking-widest text-luxury-graphite/40">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-beige">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const book = data.selfDev.books[idx] || { title: '', author: '', month: '', status: 'В очереди' };
                  return (
                    <tr key={idx} className="group hover:bg-luxury-beige/10 transition-colors">
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <input 
                            type="text"
                            placeholder="Название книги"
                            value={book.title}
                            onChange={(e) => handleBookUpdate(idx, 'title', e.target.value)}
                            className="bg-transparent border-b border-transparent focus:border-luxury-burgundy w-full font-serif italic text-lg outline-none placeholder:text-luxury-graphite/20"
                          />
                          <input 
                            type="text"
                            placeholder="Автор"
                            value={book.author}
                            onChange={(e) => handleBookUpdate(idx, 'author', e.target.value)}
                            className="bg-transparent border-none w-full text-[10px] uppercase font-bold tracking-widest text-luxury-graphite/40 outline-none placeholder:text-luxury-graphite/20"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <input 
                          type="text"
                          placeholder="Месяц"
                          value={book.month}
                          onChange={(e) => handleBookUpdate(idx, 'month', e.target.value)}
                          className="bg-transparent border-none w-full italic text-luxury-graphite/60 outline-none placeholder:text-luxury-graphite/20"
                        />
                      </td>
                      <td className="px-6 py-5 text-right">
                         <select 
                           value={book.status}
                           onChange={(e) => handleUpdateBookStatus(idx, e.target.value as any)}
                           className={cn(
                             "text-[10px] font-bold uppercase tracking-widest bg-transparent cursor-pointer focus:outline-none",
                             book.status === 'Прочитано' ? 'text-green-600' : 
                             book.status === 'Читаю' ? 'text-luxury-burgundy' : 'text-luxury-graphite/30'
                           )}
                         >
                           <option value="В очереди">В очереди</option>
                           <option value="Читаю">Читаю</option>
                           <option value="Прочитано">Прочитано</option>
                         </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Soft Skills */}
      <section className="space-y-10">
        <h3 className="text-3xl font-serif text-center italic text-luxury-burgundy">Мастерство Soft Skills</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
           <SkillBadge title="Уверенность" color="bg-luxury-burgundy text-white shadow-xl" />
           <SkillBadge title="Продажи" color="bg-white border-luxury-burgundy/20" />
           <SkillBadge title="Маркетинг" color="bg-white border-luxury-beige" />
           <SkillBadge title="Женственность" color="bg-luxury-beige text-luxury-graphite" />
           <SkillBadge title="Дисциплина" color="bg-luxury-graphite text-white" />
        </div>
      </section>
    </div>
  );
};

const SkillBadge = ({ title, color }: any) => (
  <div className={cn("p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 transition-transform hover:scale-105 border", color)}>
    <Award size={24} />
    <span className="font-serif italic text-lg">{title}</span>
  </div>
);
