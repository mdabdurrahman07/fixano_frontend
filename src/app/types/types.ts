import { AuthUser } from "@/store/auth.store";

// loginPrevState
export type loginFormPrevState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  redirectTo?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  user?: AuthUser;
};

// regDataType
export type regData = {
  id: string;
  name: string;
  email: string;
  role: "TECHNICIAN" | "CUSTOMER";
  status: "ACTIVE" | "BANNED";
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  technician?: TechnicianDetails;
};

// regPrevState
export type regFormPrevState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: regData;
  errors?: Record<string, string[]>;
  redirectTo?: string;
};

// Role types
export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

// Services
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceTechnician {
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

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
  categoryId: string;
  category: ServiceCategory;
  technician: ServiceTechnician;
}

export interface ServicesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Service[];
}

export interface ServiceQuery {
  searchTerm?: string;
  sortby?: "createdAt" | "title" | "price";
  sortOrder?: "asc" | "desc";
  categoryId?: string;
  technicianId?: string;
  isActive?: boolean;
}

// Technicians related type and interface

export interface TechnicianUser {
  avatarUrl: string;
  name: string;
}

export interface TechnicianReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
}

export interface TechnicianAvailability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
}

export interface TechnicianService {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
  categoryId: string;
}

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
  reviews: TechnicianReview[];
  availabilities: TechnicianAvailability[];
  services: TechnicianService[];
  user: TechnicianUser;
}

export interface TechniciansResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Technician[];
}

export interface TechnicianQuery {
  searchTerm?: string;
  sortby?: "createdAt" | "avgRating" | "yearsExperience" | "hourlyRate";
  sortOrder?: "asc" | "desc";
  isVerified?: boolean;
}

export type TechnicianDetails = {
  id: string;
  bio?: string;
  yearsExperience?: number;
  hourlyRate?: string;
  avgRating?: number;
  totalReviews?: number;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  userId?: string;
};

// booking types

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

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

export interface Customer {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
  categoryId: string;
}

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
  technician: Technician;
  customer: Customer;
  service: Service;
  reviews: unknown[];
}

export interface MyBookingResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Booking[];
}

// Categories

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
  services: Service[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}