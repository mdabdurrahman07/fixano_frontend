import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import { getServerUser } from "@/lib/auth/getServerUser";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fixano | Trusted Home Service Platform",
  description:
    "Find verified local professionals for plumbing, electrical, cleaning, and home maintenance tasks in minutes.",
  keywords: [
    "home services",
    "technicians",
    "plumber",
    "electrician",
    "handyman",
    "Fixano",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground font-sans antialiased selection:bg-emerald-500 selection:text-white min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <AuthBootstrap>{children}</AuthBootstrap>
        </Suspense>
      </body>
    </html>
  );
}

async function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();

  return (
    <AuthProvider user={user}>
      <Toaster position="top-center" richColors />
      {children}
    </AuthProvider>
  );
}
