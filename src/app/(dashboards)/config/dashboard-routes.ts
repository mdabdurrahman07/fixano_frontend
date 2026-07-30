import { UserRole } from "@/app/types/types";
import { Home, Users, CalendarDays, Shapes, PlusCircle, Wrench, User, Clock, Star, CreditCard } from "lucide-react";

export const getRoutesByRole = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return [
        { name: "Home", href: "/admin-dashboard", icon: Home },
        { name: "All Users", href: "/admin-dashboard/getAllUsers", icon: Users },
        { name: "All Bookings", href: "/admin-dashboard/getAllBookings", icon: CalendarDays },
        { name: "Categories", href: "/admin-dashboard/getAllCategories", icon: Shapes },
        { name: "Add Category", href: "/admin-dashboard/addNewCategory", icon: PlusCircle },
      ];
    case "TECHNICIAN":
      return [
        { name: "Home", href: "/technician-dashboard", icon: Home },
        { name: "Add Service", href: "/technician-dashboard/addService", icon: Wrench },
        { name: "Update Profile", href: "/technician-dashboard/updateProfile", icon: User },
        { name: "Availability", href: "/technician-dashboard/setAvailability", icon: Clock },
        { name: "My Bookings", href: "/technician-dashboard/myBookings", icon: CalendarDays },
      ];
    case "CUSTOMER":
      return [
        { name: "Home", href: "/user-dashboard", icon: Home },
        { name: "Create Booking", href: "/user-dashboard/createBooking", icon: PlusCircle },
        { name: "Add Review", href: "/user-dashboard/addReview", icon: Star },
        { name: "My Bookings", href: "/user-dashboard/myBookings", icon: CalendarDays },
        { name: "My Payments", href: "/user-dashboard/myPayments", icon: CreditCard },
      ];
    default:
      return [];
  }
};