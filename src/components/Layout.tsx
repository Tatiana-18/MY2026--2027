import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Briefcase, 
  Wallet, 
  MapPin, 
  Sparkles, 
  HeartPulse, 
  RotateCcw, 
  Wind, 
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Главная' },
  { id: 'career', icon: Briefcase, label: 'Карьера' },
  { id: 'money', icon: Wallet, label: 'Финансы' },
  { id: 'travel', icon: MapPin, label: 'Путешествия' },
  { id: 'selfdev', icon: Sparkles, label: 'Становление' },
  { id: 'health', icon: HeartPulse, label: 'Энергия' },
  { id: 'reset', icon: RotateCcw, label: 'Ресет' },
  { id: 'burnout', icon: Wind, label: 'Анти-выгорание' },
  { id: 'proof', icon: CheckCircle2, label: 'Результаты' },
];

export const Layout = ({ children, activeTab, setActiveTab }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-luxury-cream overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-luxury-cream border-b border-luxury-beige z-[60]">
        <div className="text-[10px] uppercase font-bold tracking-widest text-luxury-burgundy">
          ЭРА 2026 → 2027
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-luxury-graphite"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 bg-luxury-cream md:hidden pt-20 px-6 overflow-y-auto"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-2xl transition-all",
                    activeTab === item.id 
                      ? "bg-luxury-burgundy text-white" 
                      : "bg-white text-luxury-graphite/60 border border-luxury-beige"
                  )}
                >
                  <span className="text-sm uppercase tracking-widest font-bold">
                    {item.label}
                  </span>
                  <item.icon size={20} />
                </button>
              ))}
            </div>
            <div className="mt-12 p-8 border-t border-luxury-beige text-center">
               <p className="text-[10px] uppercase tracking-widest opacity-40 leading-tight italic">
                «Я строю жизнь, о которой раньше только мечтала»
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation (Desktop only) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '80px' }}
        className="relative z-50 hidden md:flex flex-col bg-luxury-cream border-r border-luxury-beige"
      >
        <div className={cn(
          "flex items-center p-6 h-24",
          isSidebarOpen ? "justify-between" : "justify-center"
        )}>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-luxury-graphite text-white p-2 text-[10px] uppercase tracking-tighter text-center rounded w-full mr-4"
            >
              Панель управления
            </motion.div>
          )}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-luxury-beige text-luxury-graphite transition-colors flex-shrink-0"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-xl transition-all group",
                activeTab === item.id 
                  ? "bg-transparent text-luxury-burgundy border-l-2 border-luxury-burgundy rounded-none pl-4" 
                  : "text-luxury-graphite opacity-50 hover:opacity-100 pl-4 border-l-2 border-transparent"
              )}
            >
              <item.icon size={18} className={cn(
                "shrink-0",
                activeTab === item.id ? "text-luxury-burgundy" : "group-hover:text-luxury-burgundy"
              )} />
              {isSidebarOpen && (
                <span className="text-[11px] uppercase tracking-widest font-bold whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className={cn(
          "p-6 border-t border-luxury-beige",
          isSidebarOpen ? "block" : "hidden"
        )}>
          <p className="text-[9px] uppercase tracking-widest opacity-40 leading-tight">
            Главная цитата:<br />
            <span className="italic">«Я строю жизнь, о которой раньше только мечтала»</span>
          </p>
        </div>
      </motion.aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end p-6 md:p-8 pb-4 border-b border-luxury-beige mx-4 md:mx-8">
          <div className="space-y-1">
            <h1 className="text-[9px] md:label-uppercase opacity-60">ЛИЧНАЯ СТРАТЕГИЯ</h1>
            <h2 className="text-xl md:text-4xl font-serif tracking-tight text-luxury-graphite">
              ✧ МОЯ ЭРА 2026 <span className="text-luxury-burgundy">→</span> 2027 ✧
            </h2>
          </div>
          <div className="text-left md:text-right mt-4 md:mt-0">
            <p className="text-[9px] md:text-[11px] uppercase tracking-widest font-semibold opacity-60 md:opacity-100">Тема года</p>
            <p className="italic font-serif text-base md:text-lg text-luxury-burgundy">«Выход на новый уровень самостоятельности»</p>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 md:p-8 max-w-[1400px] mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="p-6 md:p-8 flex justify-center items-center text-[7px] uppercase tracking-[0.3em] font-bold opacity-30 border-t border-luxury-beige mx-4 md:mx-8 mt-auto shrink-0">
          <div>СТРАТЕГИЧЕСКАЯ ПАНЕЛЬ 2026 → 2027</div>
        </footer>
      </div>
    </div>
  );
};
