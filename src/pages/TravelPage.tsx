import React from 'react';
import { SectionHeader } from './CareerPage';
import { MapPin, Plane, Camera, Heart, PlusCircle, Trash2, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export const TravelPage = () => {
  const { data, updateData } = useApp();

  const handleAddWish = () => {
    const brand = prompt("Название/Бренд:");
    const desc = prompt("Описание:");
    if (brand && desc) {
      updateData(prev => ({
        ...prev,
        travel: {
          ...prev.travel,
          wishlist: [...prev.travel.wishlist, { id: Date.now().toString(), brand, desc }]
        }
      }));
    }
  };

  const handleDeleteWish = (id: string) => {
    updateData(prev => ({
      ...prev,
      travel: {
        ...prev.travel,
        wishlist: prev.travel.wishlist.filter(w => w.id !== id)
      }
    }));
  };

  const handleUpdateWish = (id: string, oldBrand: string, oldDesc: string) => {
    const brand = prompt("Название/Бренд:", oldBrand);
    const desc = prompt("Описание:", oldDesc);
    if (brand && desc) {
      updateData(prev => ({
        ...prev,
        travel: {
          ...prev.travel,
          wishlist: prev.travel.wishlist.map(w => w.id === id ? { ...w, brand, desc } : w)
        }
      }));
    }
  };

  return (
    <div className="space-y-16">
      <SectionHeader title="Жизнь мечты" subtitle="Курирование эстетического пути" icon={MapPin} />

      {/* Paris Main Section */}
      <section className="space-y-6 md:space-y-8">
        <div className="relative group rounded-[24px] md:rounded-[40px] overflow-hidden aspect-[4/3] md:aspect-[16/7]">
           <img 
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000" 
            alt="Paris" 
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
            <h2 className="text-3xl md:text-6xl font-serif italic mb-2 md:mb-4">Парижская эра</h2>
            <p className="text-[10px] md:text-sm font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-80">Эйфелева башня • Эстетика кафе • Диснейленд</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <MoodImage src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800" label="Французское настроение" />
          <MoodImage src="https://images.unsplash.com/photo-1547638375-ebf04735d792?auto=format&fit=crop&q=80&w=800" label="Эстетика круассанов" />
          <MoodImage src="https://images.unsplash.com/photo-1544081044-173d849fa598?auto=format&fit=crop&q=80&w=800" label="Мечта о Диснейленде" />
          <MoodImage src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800" label="Вечерние образы" />
        </div>
      </section>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
        <DestinationCard 
          title="Москва" 
          tags={["Лучшие локации", "Прогулки", "Атмосфера", "Музеи"]}
          color="bg-luxury-burgundy text-white"
        />
        <DestinationCard 
          title="Питер" 
          tags={["СЕМЕЙНЫЕ МОМЕНТЫ", "УЮТНЫЕ КАФЕ", "ДУХ ИСКУССТВА", "КЛАССИЧЕСКИЕ ОБРАЗЫ"]}
          color="bg-luxury-beige text-luxury-graphite"
        />
        <DestinationCard 
          title="Таиланд" 
          tags={["Восстановление", "НОВЫЕ ВПЕЧАТЛЕНИЯ", "Острова", "Том-ям"]}
          color="bg-luxury-graphite text-white"
        />
      </div>

    </div>
  );
};

const MoodImage = ({ src, label }: any) => (
  <div className="relative group aspect-square rounded-2xl overflow-hidden shadow-sm">
    <img src={src} alt={label} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
      <span className="text-white text-[10px] md:text-xs font-serif italic text-center leading-tight drop-shadow-sm">{label}</span>
    </div>
  </div>
);

const DestinationCard = ({ title, tags, color }: any) => (
  <div className={cn("p-6 md:p-10 rounded-[24px] md:rounded-[40px] space-y-4 md:space-y-6 flex flex-col justify-between h-[300px] md:h-[400px]", color)}>
    <h3 className="text-3xl md:text-4xl font-serif">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string, i: number) => (
        <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 border border-current opacity-60 rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const WishlistItem = ({ brand, desc, onDelete, onEdit }: any) => (
  <div className="space-y-2 relative group">
    <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={onEdit} className="p-1.5 bg-white shadow-sm border border-luxury-beige rounded-full hover:text-luxury-burgundy">
        <Edit2 size={10} />
      </button>
      <button onClick={onDelete} className="p-1.5 bg-white shadow-sm border border-luxury-beige rounded-full hover:text-red-500">
        <Trash2 size={10} />
      </button>
    </div>
    <p className="font-serif text-lg italic text-luxury-burgundy">{brand}</p>
    <p className="text-[10px] text-luxury-graphite/40 uppercase tracking-widest font-bold font-sans">{desc}</p>
  </div>
);
