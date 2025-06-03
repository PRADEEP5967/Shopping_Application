
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: 'male' | 'female' | 'other';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  password: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in a real app this would call an API
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: email.split('@')[0],
        lastName: 'User',
        email,
        address: '123 Main St',
        gender: 'other'
      };
      setUser(mockUser);
      toast.success('Successfully logged in!');
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Mock registration - in a real app this would call an API
    if (userData.email && userData.password.length >= 6 && userData.firstName && userData.lastName) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        address: userData.address,
        gender: userData.gender
      };
      setUser(mockUser);
      toast.success('Successfully registered and logged in!');
      return true;
    } else {
      toast.error('Please fill all required fields. Password must be at least 6 characters.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info('Successfully logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
