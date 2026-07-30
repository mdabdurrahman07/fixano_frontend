import { AuthUser } from "@/store/auth.store";

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

export type regFormPrevState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: regData;
  errors?: Record<string, string[]>;
  redirectTo?: string;
};

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

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
