
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            localStorage.removeItem('user');
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (profile) {
        setUser({
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          address: profile.address || '',
          gender: profile.gender || 'other',
          role: profile.role,
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid')) {
          toast.error('Invalid email or password');
        } else {
          toast.error('Login failed. Please try again.');
        }
        return false;
      }

      if (data.user) {
        await loadUserProfile(data.user.id);
        toast.success('Welcome back!');
        return true;
      }

      return false;
    } catch (error) {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      let registeredUsers = [];

      if (registeredUsersJson) {
        try {
          registeredUsers = JSON.parse(registeredUsersJson);
        } catch (error) {
          console.error('Failed to parse registered users', error);
        }
      }

      if (email === 'admin@nextcommerce.com' && password === 'admin2024!') {
        const mockUser: User = {
          id: 'admin-001',
          firstName: 'Admin',
          lastName: 'User',
          email,
          address: 'NextCommerce HQ, 123 Business Street',
          gender: 'other',
          role: 'admin'
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success(`Welcome back, Admin!`);
        return true;
      }

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
        localStorage.setItem('user', JSON.stringify(userObj));
        toast.success(`Welcome back, ${foundUser.firstName}!`);
        return true;
      } else {
        toast.error(foundUser ? 'Invalid password' : 'Account not found. Please register first.');
        return false;
      }
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    if (userData.email && userData.password.length >= 6 && userData.firstName && userData.lastName) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              first_name: userData.firstName,
              last_name: userData.lastName,
            },
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Email already registered. Please login instead.');
          } else {
            toast.error('Registration failed. Please try again.');
          }
          return false;
        }

        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            address: userData.address,
            gender: userData.gender,
            role: 'user',
          });

          toast.success('Registration successful! Please login to continue.');
          return true;
        }

        return false;
      } catch (error) {
        const registeredUsersJson = localStorage.getItem('registeredUsers');
        let registeredUsers = [];

        if (registeredUsersJson) {
          try {
            registeredUsers = JSON.parse(registeredUsersJson);
          } catch (error) {
            console.error('Failed to parse registered users', error);
          }
        }

        const emailExists = registeredUsers.some((user: RegisterData) => user.email === userData.email);
        if (emailExists) {
          toast.error('Email already registered. Please login instead.');
          return false;
        }

        registeredUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        toast.success('Registration successful! Please login to continue.');
        return true;
      }
    } else {
      toast.error('Please fill all required fields. Password must be at least 6 characters.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
    setUser(null);
    localStorage.removeItem('user');
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
