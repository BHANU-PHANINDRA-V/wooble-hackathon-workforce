"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SessionUser } from "@/types";
import { useRouter } from "next/navigation";

interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: "WORKER" | "EMPLOYER";
  primaryOccupation?: string;
  locationCity?: string;
  companyName?: string;
  industry?: string;
}

interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
  demoLogin: (role: "WORKER" | "EMPLOYER" | "ADMIN") => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => ({ success: false }),
  demoLogin: async () => false,
  logout: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password = "Demo@1234"): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.user.role === "WORKER") router.push("/worker/dashboard");
        else if (data.user.role === "EMPLOYER") router.push("/employer/dashboard");
        else if (data.user.role === "ADMIN") router.push("/admin/dashboard");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (payload: RegisterPayload): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        if (payload.role === "WORKER") router.push("/worker/dashboard");
        else if (payload.role === "EMPLOYER") router.push("/employer/dashboard");
        return { success: true };
      }
      return { success: false, error: data.error || "Registration failed" };
    } catch {
      return { success: false, error: "Network error during registration. Please try again." };
    }
  };

  const demoLogin = async (role: "WORKER" | "EMPLOYER" | "ADMIN"): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (role === "WORKER") router.push("/worker/dashboard");
        else if (role === "EMPLOYER") router.push("/employer/dashboard");
        else if (role === "ADMIN") router.push("/admin/dashboard");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, logout, refreshUser: fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
