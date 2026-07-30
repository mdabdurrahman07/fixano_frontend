"use client";

import { useEffect } from "react";
import { useAuthStore, AuthUser } from "@/store/auth.store";

interface Props {
  user: AuthUser | null;
  children: React.ReactNode;
}

export default function AuthProvider({ user, children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
