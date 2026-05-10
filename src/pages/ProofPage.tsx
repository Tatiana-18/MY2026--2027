import React, { useState } from 'react';
import { SectionHeader } from './CareerPage';
import { CheckCircle2, Star, Ticket, MessageSquare, Image, Award, Trash2, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const ProofPage = () => {
  return (
    <div className="space-y-16 py-10">
      <SectionHeader 
        title="Доказательства Эволюции" 
        subtitle="Свидетельства того, что моя жизнь меняется" 
        icon={CheckCircle2} 
      />

      <div className="max-w-3xl mx-auto space-y-12">
        <div className="bg-luxury-burgundy text-white p-8 md:p-16 rounded-[24px] md:rounded-[40px] text-center space-y-6 md:space-y-8 shadow-2xl">
          <Award className="mx-auto text-white/40 md:block hidden" size={64} />
          <Award className="mx-auto text-white/40 md:hidden" size={48} />
          <h2 className="text-2xl md:text-5xl font-serif italic font-normal leading-tight">
            «Я строю жизнь, о которой раньше только мечтала»
          </h2>
          <div className="pt-2 md:pt-4">
            <span className="font-sans tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold border-t border-white/20 pt-4 px-4 md:px-8 inline-block">
              Главная цель достигнута
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProofCard = ({ title, date, icon: Icon, desc, image, onDelete }: any) => (
  <div className="bg-white overflow-hidden rounded-3xl border border-luxury-beige hover:border-luxury-burgundy/20 transition-all group relative flex flex-col h-full">
    <button 
      onClick={onDelete}
      className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-luxury-graphite/40 hover:text-red-500"
    >
      <Trash2 size={16} />
    </button>

    {image && (
      <div className="aspect-video w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
      </div>
    )}
    
    <div className="p-8 space-y-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-2xl bg-luxury-beige/50 flex items-center justify-center text-luxury-burgundy shrink-0">
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-luxury-graphite/40 font-sans">{date}</span>
      </div>
      <div className="space-y-3 flex-1">
        <h4 className="text-lg font-serif italic text-luxury-burgundy leading-tight">{title}</h4>
        <p className="text-sm text-luxury-graphite/60 leading-relaxed italic">«{desc}»</p>
      </div>
    </div>
  </div>
);
