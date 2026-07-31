import { UserRole } from "@/app/types/types";
import {
  Users,
  CalendarDays,
  Shapes,
  PlusCircle,
  Wrench,
  User,
  Clock,
  Star,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";

export const getRoutesByRole = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return [
        { name: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
        {
          name: "All Users",
          href: "/admin-dashboard/getAllUsers",
          icon: Users,
        },
        {
          name: "All Bookings",
          href: "/admin-dashboard/getAllBookings",
          icon: CalendarDays,
        },
        {
          name: "Categories",
          href: "/admin-dashboard/getAllCategories",
          icon: Shapes,
        },
        {
          name: "Add Category",
          href: "/admin-dashboard/addNewCategory",
          icon: PlusCircle,
        },
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
        {
          name: "My Bookings",
          href: "/technician-dashboard/myBookings",
          icon: CalendarDays,
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
        { name: "My Reviews", href: "/user-dashboard/addReview", icon: Star },
      ];
    default:
      return [];
  }
};
