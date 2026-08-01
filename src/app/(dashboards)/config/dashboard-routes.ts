import { UserRole } from "@/app/types/types";
import {
  CalendarDays,
  Shapes,
  PlusCircle,
  Wrench,
  User,
  Clock,
  Star,
  LayoutDashboard,
} from "lucide-react";

export const getRoutesByRole = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return [
        { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
        {
          name: "All Bookings",
          href: "/admin-dashboard/getAllBookings",
          icon: CalendarDays,
        },
        {
          name: "Categories",
          href: "/admin-dashboard/Categories",
          icon: Shapes,
        }
      ];
    case "TECHNICIAN":
      return [
        {
          name: "Dashboard",
          href: "/technician-dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Add Service",
          href: "/technician-dashboard/addService",
          icon: Wrench,
        },
        {
          name: "Update Profile",
          href: "/technician-dashboard/updateProfile",
          icon: User,
        },
        {
          name: "Availability",
          href: "/technician-dashboard/setAvailability",
          icon: Clock,
        },
      ];
    case "CUSTOMER":
      return [
        { name: "Dashboard", href: "/user-dashboard", icon: LayoutDashboard },
        {
          name: "Create Booking",
          href: "/user-dashboard/createBooking",
          icon: PlusCircle,
        },
        { name: "My Reviews", href: "/user-dashboard/myReview", icon: Star },
      ];
    default:
      return [];
  }
};
