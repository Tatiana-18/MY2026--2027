import React, { createContext, useContext } from 'react';
import { UserData } from '../types';
import { useUserData } from '../hooks/useUserData';

interface AppContextType {
  data: UserData;
  updateData: (updater: (prev: UserData) => UserData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, updateData } = useUserData();

  return (
    <AppContext.Provider value={{ data, updateData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
