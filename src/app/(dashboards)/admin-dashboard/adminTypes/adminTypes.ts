// Enums / Literal Types
export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";
export type BookingStatus = "PAID" | "PENDING" | "CANCELLED" | "COMPLETED";

// Base Technician Model
export interface Technician {
  id: string;
  bio: string;
  yearsExperience: number;
  hourlyRate: string;
  avgRating: number;
  totalReviews: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  technician: Technician | null;
}

// Booking Model
export interface Booking {
  id: string;
  status: BookingStatus;
  scheduledAt: string;
  address: string;
  notes: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
}

// Category Model
export interface Category {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Base Action Response
export interface ActionResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

// Specific Responses
export type GetAllUsersResponse = ActionResponse<User[]>;
export type GetAllBookingsResponse = ActionResponse<Booking[]>;
export type GetAllCategoriesResponse = ActionResponse<Category[]>;
export type UpdateUserStatusResponse = ActionResponse<User>;