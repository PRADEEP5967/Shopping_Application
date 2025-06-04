
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
    // Check if this email is registered
    const registeredUsersJson = localStorage.getItem('registeredUsers');
    let registeredUsers = [];
    
    if (registeredUsersJson) {
      try {
        registeredUsers = JSON.parse(registeredUsersJson);
      } catch (error) {
        console.error('Failed to parse registered users', error);
      }
    }
    
    // Admin login special case
    if (email === 'admin@admin.com' || email.includes('admin')) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: email.split('@')[0],
        lastName: 'Admin',
        email,
        address: '123 Main St',
        gender: 'other',
        role: 'admin'
      };
      setUser(mockUser);
      toast.success(`Welcome back, Admin!`);
      return true;
    }
    
    // For regular users, check registration
    const foundUser = registeredUsers.find((u: RegisterData) => u.email === email);
    
    if (foundUser && password.length >= 6) {
      const userObj: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        address: foundUser.address,
        gender: foundUser.gender,
        role: 'user'
      };
      setUser(userObj);
      toast.success(`Welcome back, ${foundUser.firstName}!`);
      return true;
    } else {
      toast.error(foundUser ? 'Invalid password' : 'Account not found. Please register first.');
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    if (userData.email && userData.password.length >= 6 && userData.firstName && userData.lastName) {
      // Save to "registered users" in localStorage
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      let registeredUsers = [];
      
      if (registeredUsersJson) {
        try {
          registeredUsers = JSON.parse(registeredUsersJson);
        } catch (error) {
          console.error('Failed to parse registered users', error);
        }
      }
      
      // Check if email already exists
      const emailExists = registeredUsers.some((user: RegisterData) => user.email === userData.email);
      if (emailExists) {
        toast.error('Email already registered. Please login instead.');
        return false;
      }
      
      // Add new user to registered users
      registeredUsers.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      toast.success('Registration successful! Please login to continue.');
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
        isAdmin: !!user && user.role === 'admin',
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
