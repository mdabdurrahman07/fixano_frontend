/* eslint-disable react-hooks/refs */
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createAuthStore, AuthStoreContext, type AuthUser } from "@/store/auth.store";

interface Props {
  user: AuthUser | null;
  children: ReactNode;
}

export default function AuthProvider({ user, children }: Props) {
  // createStore runs synchronously before any render
  // so Zustand is populated before the first paint
  const storeRef = useRef<ReturnType<typeof createAuthStore>>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthStore(user); // initialized with server user
  }

  useEffect(() => {
    storeRef.current?.getState().setUser(user ?? null);
  }, [user]);

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}