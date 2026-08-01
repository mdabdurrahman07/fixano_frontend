export interface Category {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface ServiceItem {
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
  category: Category;
  technician: ServiceTechnician;
}

export interface ServicesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ServiceItem[];
}

export interface CategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
}

export interface CreateServiceInput {
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
  categoryId: string;
}