"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wrench } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { logoutAction } from "@/app/(auth)/_authActions/authAction";
import { toast } from "sonner";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/technicians", label: "Technicians" },
  { href: "#how-it-works", label: "How it works" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuthStore();

  const getDashboardUrl = () => {
    if (!user) return "/";
    switch (user.role) {
      case "ADMIN":
        return "/admin-dashboard";
      case "TECHNICIAN":
        return "/technician-dashboard";
      default:
        return "/dashboard";
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    await logoutAction(); // deletes httpOnly cookies server-side
    logout(); // clears Zustand store
    router.push("/");
    toast.success("Logged Out Successfully");
    router.refresh(); // re-runs layout → getServerUser() returns null
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-tight text-emerald-600"
        >
          <Wrench className="h-6 w-6" />
          <span>Fixano</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                  : "text-slate-600 hover:text-emerald-600 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right — auth state */}
        <div className="hidden md:flex items-center">
          {!user ? (
            <Link
              href="/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95"
            >
              Login
            </Link>
          ) : (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white transition-opacity hover:opacity-80">
                  {getInitials(user.name)}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-emerald-600 font-medium capitalize">
                    {user.role.toLowerCase()}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href={getDashboardUrl()}>Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-70 flex-col bg-background p-6 border-0"
            >
              <div className="mt-8 flex flex-col gap-5 text-base font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      pathname === link.href
                        ? "font-semibold text-emerald-600"
                        : "text-slate-600 hover:text-emerald-600 transition-colors"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8">
                {user ? (
                  <>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="text-xs text-emerald-600 font-medium capitalize">
                          {user.role.toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="mb-3 w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Link
                        href={getDashboardUrl()}
                        onClick={() => setMobileOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
