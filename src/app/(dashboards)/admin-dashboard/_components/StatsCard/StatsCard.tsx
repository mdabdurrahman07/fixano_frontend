import {
  LucideIcon,
  Users,
  CalendarCheck,
  Layers,
  DollarSign,
} from "lucide-react";
import {
  GetAllBookingsResponse,
  GetAllCategoriesResponse,
  GetAllUsersResponse,
} from "../../adminTypes/adminTypes";

interface StatCardsProps {
  users: GetAllUsersResponse;
  bookings: GetAllBookingsResponse;
  categories: GetAllCategoriesResponse;
}

interface StatItem {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatCards({
  users,
  bookings,
  categories,
}: StatCardsProps) {
  const totalUsers = users?.data?.length || 0;
  const totalBookings = bookings?.data?.length || 0;
  const totalCategories = categories?.data?.length || 0;

  const totalEarnings = (bookings?.data || [])
    .filter((b) => b.status === "PAID")
    .reduce((sum, b) => sum + parseFloat(b.totalAmount || "0"), 0);

  const stats: StatItem[] = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: CalendarCheck,
      color: "text-emerald-600",
    },
    {
      title: "Total Categories",
      value: totalCategories,
      icon: Layers,
      color: "text-purple-600",
    },
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className=" bg-white rounded-xl p-6  border border-slate-200 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-gray-500 ">
                {stat.title}
              </p>
              <p className="text-2xl font-bold mt-1 text-gray-900">
                {stat.value}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
