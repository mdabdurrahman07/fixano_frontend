export interface IUpdateTechnicianPayload {
  bio?: string | null;
  yearsExperience?: number;
  hourlyRate?: number | string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
}

export interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
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
}

export interface TechnicianUser {
  avatarUrl: string | null;
  name: string;
}

export interface Technician {
  id: string;
  bio: string;
  yearsExperience: number;
  hourlyRate: string | number;
  avgRating: number;
  totalReviews: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: TechnicianUser;
  reviews?: Review[];
  availabilities?: Availability[];
  services?: ServiceItem[];
}

export interface TechniciansResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Technician[];
}