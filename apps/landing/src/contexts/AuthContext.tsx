"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@qr-menu/shared-utils";
import { User } from "@qr-menu/shared-types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const { data } = await apiClient.publicCheckAuth();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.publicLogin(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.publicRegister(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.publicLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
