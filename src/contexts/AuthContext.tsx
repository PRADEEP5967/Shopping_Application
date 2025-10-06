import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  roles: string[];
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        // Defer profile loading to prevent deadlocks
        setTimeout(() => {
          loadUserProfile(newSession.user.id);
        }, 0);
      } else {
        setUser(null);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      if (existingSession?.user) {
        loadUserProfile(existingSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) throw profileError;

      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      if (profile) {
        const validGender = ['male', 'female', 'other'].includes(profile.gender) 
          ? profile.gender as 'male' | 'female' | 'other'
          : 'other';
          
        setUser({
          id: profile.id,
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          email: profile.email,
          address: profile.address || '',
          gender: validGender,
          roles: rolesData?.map(r => r.role) || ['user'],
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(null);
    }
  };

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
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    if (!userData.email || !userData.password || userData.password.length < 6 || !userData.firstName || !userData.lastName) {
      toast.error('Please fill all required fields. Password must be at least 6 characters.');
      return false;
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            address: userData.address,
            gender: userData.gender,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Email already registered. Please login instead.');
        } else {
          toast.error(error.message || 'Registration failed. Please try again.');
        }
        return false;
      }

      if (data.user) {
        toast.success('Registration successful! You can now login.');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast.info('Successfully logged out');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        login,
        register,
        logout,
        isAuthenticated: !!session && !!user,
        isAdmin: !!user && user.roles.includes('admin'),
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
