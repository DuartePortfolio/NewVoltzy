import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getToken } from '../backend/token';
import { housesService, House } from '../services/housesService';

interface User {
  id: number;
  name: string;
  email: string;
  profile_picture_url?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentHouse: House | null;
  setCurrentHouse: (house: House | null) => void;
  houses: House[];
  setHouses: (houses: House[]) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshHouses: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentHouse, setCurrentHouse] = useState<House | null>(null);
  const [houses, setHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;

  // Load houses when user is authenticated
  const refreshHouses = async () => {
    if (!user) return;

    try {
      const fetchedHouses = await housesService.getHouses();
      setHouses(fetchedHouses);

      // Set first house as current if none selected
      if (fetchedHouses.length > 0 && !currentHouse) {
        setCurrentHouse(fetchedHouses[0]);
      }
    } catch (error) {
      console.error('Failed to fetch houses:', error);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          // You might want to validate the token with the backend here
          // For now, we'll assume it's valid
          // In a real app, you'd fetch the user profile
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fetch houses when user changes
  useEffect(() => {
    if (user) {
      refreshHouses();
    }
  }, [user]);

  const value: AppContextType = {
    user,
    setUser,
    currentHouse,
    setCurrentHouse,
    houses,
    setHouses,
    isAuthenticated,
    isLoading,
    refreshHouses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
