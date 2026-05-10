import React from 'react';
import { SectionHeader } from './CareerPage';
import { HeartPulse, Moon, Waves, Footprints, Flame, Smile, Edit2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export const HealthPage = () => {
  const { data, updateData } = useApp();

  const toggleFoundation = (label: string) => {
    updateData(prev => ({
      ...prev,
      health: {
        ...prev.health,
        foundations: {
          ...prev.health.foundations,
          [label]: !prev.health.foundations[label]
        }
      }
    }));
  };

  return (
    <div className="space-y-16">
      <SectionHeader title="Моя Энергия" subtitle="Здоровье и ясность ума" icon={HeartPulse} />

      <div className="flex justify-center">
        <div className="w-full max-w-xl space-y-8">
          <h3 className="text-2xl font-serif italic text-luxury-burgundy text-center">Фундамент энергии</h3>
          <div className="bg-white p-8 rounded-3xl border border-luxury-beige space-y-6">
              {Object.entries(data.health.foundations).map(([label, checked]) => (
                <FoundationItem 
                  key={label} 
                  label={label} 
                  checked={checked} 
                  onClick={() => toggleFoundation(label)}
                />
              ))}
          </div>
          <div className="p-8 bg-luxury-burgundy text-white rounded-3xl italic text-center">
            «Ваша энергия — ваше преимущество. Оберегайте, питайте и уважайте её.»
          </div>
        </div>
      </div>
    </div>
  );
};

const FoundationItem = ({ label, checked, onClick }: any) => (
  <div 
    onClick={onClick}
    className="flex items-center gap-4 cursor-pointer group"
  >
    <div className={cn(
      "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
      checked ? "bg-luxury-burgundy border-luxury-burgundy" : "border-luxury-beige"
    )}>
      {checked && <Flame size={10} className="text-white" />}
    </div>
    <span className={cn("text-sm transition-opacity font-medium", !checked && "opacity-40 group-hover:opacity-60")}>{label}</span>
  </div>
);
