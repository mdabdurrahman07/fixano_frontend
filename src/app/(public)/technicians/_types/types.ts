// TechnicianDetails Page types

export interface Availability {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
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

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName?: string;
  userAvatar?: string;
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
  reviews: Review[];
  availabilities: Availability[];
  services: Service[];
  name?: string;
  avatar?: string;
  title?: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
