import { useState, useEffect } from 'react';
import { UserData } from '../types';
import { INITIAL_USER_DATA } from '../constants';

const STORAGE_KEY = 'aura_planner_user_data';

export const useUserData = () => {
  const [data, setData] = useState<UserData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Simple merge to ensure new top-level categories are present
        return { ...INITIAL_USER_DATA, ...parsed };
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
    return INITIAL_USER_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (updater: (prev: UserData) => UserData) => {
    setData(prev => updater(prev));
  };

  return { data, updateData };
};
