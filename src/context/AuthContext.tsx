"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/types";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isDemoUser: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  enterDemoMode: (role?: "student" | "admin") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  useEffect(() => {
    // Check if demo user saved
    const savedDemo = localStorage.getItem("nihon_nex_demo_user");
    if (savedDemo) {
      try {
        setUser(JSON.parse(savedDemo));
        setIsDemoUser(true);
        setIsLoading(false);
        return;
      } catch {
        // Fallback
      }
    }

    // Try Supabase Auth check
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data, error }) => {
        if (data?.user && !error) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "Learner",
            targetJLPT: "N5",
            role: (data.user.user_metadata?.role as "student" | "admin") || "student",
          });
        }
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    } catch {
      setIsLoading(false);
    }
  }, []);

  const signInWithEmail = async (email: string): Promise<{ error?: string }> => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: "user-password",
      });

      if (error) {
        // Provide friendly fallback if credentials are placeholders
        enterDemoMode("student");
        setIsLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || email.split("@")[0],
          targetJLPT: "N5",
          role: "student",
        });
      }
      setIsLoading(false);
      return {};
    } catch (err: unknown) {
      enterDemoMode("student");
      setIsLoading(false);
      return { error: (err as Error)?.message || "Auth error" };
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string): Promise<{ error?: string }> => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: { full_name: name, role: "student" },
        },
      });

      if (error) {
        enterDemoMode("student");
        setIsLoading(false);
        return { error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: name || email.split("@")[0],
          targetJLPT: "N5",
          role: "student",
        });
      }
      setIsLoading(false);
      return {};
    } catch (err: unknown) {
      enterDemoMode("student");
      setIsLoading(false);
      return { error: (err as Error)?.message || "Auth error" };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch {
      enterDemoMode("student");
    }
  };

  const enterDemoMode = (role: "student" | "admin" = "student") => {
    const demoUser: UserProfile = {
      id: "demo-user-123",
      email: role === "admin" ? "admin@nihonnex.com" : "learner@nihonnex.com",
      name: role === "admin" ? "Sensei Admin" : "Sakib Rahman (সাকিব)",
      targetJLPT: "N5",
      role: role,
    };
    setUser(demoUser);
    setIsDemoUser(true);
    localStorage.setItem("nihon_nex_demo_user", JSON.stringify(demoUser));
  };

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    setIsDemoUser(false);
    localStorage.removeItem("nihon_nex_demo_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemoUser,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        enterDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
