import { Bell, Search } from "lucide-react";
import DashboardNav from "./_components/Dashboards/DashboardNav";
import { getServerUser } from "@/lib/auth/getServerUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-['Inter'] min-h-screen overflow-x-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8 md:ml-64">
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[20px] text-[#006948] tracking-tight">
              Fixano
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <div className="flex items-center bg-[#eceef0] px-4 py-2 rounded-full w-64 border border-[#bccac0]/30">
                <span className="material-symbols-outlined text-[#3d4a42] mr-2">
                  <Search />
                </span>
                <input
                  type="text"
                  placeholder="Don't Search..."
                  className="w-full bg-transparent outline-none text-[#191c1e] text-[14px]"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00855d] text-white rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">
                  <Bell />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {user && <DashboardNav user={user} />}

      {/* Main Content Canvas */}
      <main className="md:ml-64 pt-24 pb-20 md:pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">{children}</div>
      </main>
    </div>
  );
}
