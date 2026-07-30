import { Suspense } from "react";
import { getServerUser } from "@/lib/auth/getServerUser";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "../Navbar";

async function NavbarWithUser() {
  const user = await getServerUser(); // cookies() call isolated here
  return <AuthProvider user={user}><Navbar /></AuthProvider>;
}

export default function NavbarServer() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarWithUser />
    </Suspense>
  );
}

function NavbarSkeleton() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border h-16" />
  );
}