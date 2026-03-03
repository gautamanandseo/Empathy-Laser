import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to safely update state
  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    // Initial session check
    const getSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
           console.warn("Session check warning:", error.message);
        }
        
        await handleSession(currentSession);
      } catch (error) {
        console.error("Session check critical error:", error);
        if (mounted) setLoading(false);
      }
    };

    getSession();

    // Real-time auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (mounted) {
            await handleSession(currentSession);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [handleSession]);

  // Standard Email/Password Sign Up
  const signUp = useCallback(async (email, password, options) => {
    try {
      const safeOptions = {
        data: options?.data || {},
        emailRedirectTo: options?.emailRedirectTo
      };

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: safeOptions,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
      return { success: false, error };
    }
  }, [toast]);

  // Standard Email/Password Sign In
  const signIn = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  }, []);

  // Standard Sign Out
  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      return { success: true };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
      return { success: false, error };
    }
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    isLoading: loading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    login: signIn,
    signOut,
    logout: signOut,
  }), [user, session, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};