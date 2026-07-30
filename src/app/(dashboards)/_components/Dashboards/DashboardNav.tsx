"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User as UserIcon, LogOut } from "lucide-react"; // Fallback icons for the shell
import { getRoutesByRole } from "../../config/dashboard-routes";
import { useAuthStore } from "@/store/auth.store";
import { logoutAction } from "@/app/(auth)/_authActions/authAction";
import { useRouter } from "next/navigation";

export default function DashboardNav() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pathname = usePathname();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const routes = getRoutesByRole(user.role);
  const handleLogout = async () => {
    await logoutAction();
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#2d3133] border-r border-[#bccac0] shadow-md z-40 py-8">
        <div className="px-6 mb-10 mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#006948]/20 border border-[#006948]/30 flex items-center justify-center">
              <UserIcon className="text-[#85f8c4]" size={20} />
            </div>
            <div>
              <div className="font-['Inter'] font-semibold text-[14px] text-white">
                {user.name}
              </div>
              <div className="font-['Inter'] font-medium text-[12px] text-[#bccac0]">
                {user.role}
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-4">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            const Icon = route.icon; // Capitalize to render as a component

            return (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#006948] text-white"
                    : "text-[#bccac0] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-['Inter'] font-medium text-[14px]">
                  {route.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full h-12 bg-[#006948]/20 border border-[#006948]/30 hover:bg-[#006948]/40 transition-colors rounded-xl flex items-center justify-center gap-2 text-[#85f8c4] font-['Inter'] text-[14px] font-semibold"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-[#f7f9fb]/80 backdrop-blur-xl border-t border-white/20 shadow-lg md:hidden z-50">
        {routes.slice(0, 4).map((route) => {
          const isActive = pathname === route.href;
          const Icon = route.icon;

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex flex-col items-center justify-center p-2 ${
                isActive ? "text-[#006948]" : "text-[#3d4a42]"
              }`}
            >
              <Icon size={24} />
              <span className="font-['Inter'] font-medium text-[12px] mt-1">
                {route.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
