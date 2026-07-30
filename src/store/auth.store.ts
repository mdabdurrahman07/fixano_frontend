// src/store/auth.store.ts
import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

export type AuthStore = ReturnType<typeof createAuthStore>;

export const createAuthStore = (initialUser: AuthUser | null = null) =>
  createStore<AuthState>()((set) => ({
    user: initialUser,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  }));

// Context to pass the store instance through the tree
export const AuthStoreContext = createContext<AuthStore | null>(null);

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const store = useContext(AuthStoreContext);
  if (!store) throw new Error("useAuthStore must be used within AuthProvider");
  return useStore(store, selector);
}