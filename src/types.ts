export interface MonthReset {
  month: string;
  theme: string;
  successMetric: string;
  goals: string[];
  habits: { [key: string]: boolean };
  reflection: string;
  reward: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  iconType: 'star' | 'ticket' | 'message';
  image?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  month: string;
  status: 'Читаю' | 'В очереди' | 'Прочитано';
}

export interface WishlistItem {
  id: string;
  brand: string;
  desc: string;
}

export interface EnergyMetric {
  sleep: string;
  water: string;
  steps: string;
  mood: string;
}

export interface UserData {
  carFund: {
    target: number;
    current: number;
    name: string;
  };
  income: {
    [month: string]: number;
  };
  savings: {
    id: string;
    label: string;
    amount: number;
  }[];
  career: {
    activeClients: number;
    avgCheck: number;
  };
  selfDev: {
    languageLevel: string;
    books: Book[];
  };
  travel: {
    wishlist: WishlistItem[];
  };
  health: {
    metrics: EnergyMetric;
    metricLabels: EnergyMetric;
    weeklyEnergy: number[];
    foundations: { [key: string]: boolean };
  };
  achievements: Achievement[];
  resets: { [month: string]: MonthReset };
}
