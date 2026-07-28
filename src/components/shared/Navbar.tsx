"use client";

import { useState } from "react";
import Link from "next/link";

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

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "AUTHOR";
}

interface NavbarProps {
  user?: User;
  onLogout?: () => void;
}

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/technicians", label: "Technicians" },
  { href: "#how-it-works", label: "How it works" },
];

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getDashboardUrl = () => {
    if (!user) return "/";

    switch (user.role) {
      case "ADMIN":
        return "/dashboard-admin";
      case "AUTHOR":
        return "/dashboard-author";
      default:
        return "/dashboard-user";
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleLogout = () => {
    setIsOpen(false);
    setMobileOpen(false);
    onLogout?.();
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === "/services"
                  ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1"
                  : "text-slate-600 hover:text-emerald-600 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center">
          {!user ? (
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-emerald-700 active:scale-95"
            >
              Login
            </Link>
          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground transition-opacity hover:opacity-80">
                  {getInitials(user.name)}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href={getDashboardUrl()}>Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
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
                      link.href === "/services"
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                        {getInitials(user.name)}
                      </div>

                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Button asChild className="mb-3 w-full">
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
