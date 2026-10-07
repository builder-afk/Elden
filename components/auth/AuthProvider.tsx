'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthUser, UserRole } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email || '',
    role: (user.app_metadata?.role as UserRole) || 'customer',
    fullName: user.user_metadata?.full_name,
    avatarUrl: user.user_metadata?.avatar_url,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data?.session ?? null);
        setUser(mapUser(data?.session?.user ?? null));
      } catch (err) {
        // Safe fallback for demo/offline builds
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
          setUser(mapUser(newSession?.user ?? null));
          setIsLoading(false);
        }
      );
      return () => subscription.unsubscribe();
    } catch {
      // Safe fallback
    }
  }, [supabase]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, [supabase]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    return { error: error?.message ?? null };
  }, [supabase]);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
