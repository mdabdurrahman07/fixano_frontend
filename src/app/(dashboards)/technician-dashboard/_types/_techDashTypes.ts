export type BookingStatus = 
  | "REQUESTED" 
  | "ACCEPTED" 
  | "IN_PROGRESS" 
  | "PAID" 
  | "COMPLETED" 
  | "DECLINED" 
  | "CANCELLED";

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

export interface Booking {
  id: string;
  status: BookingStatus;
  scheduledAt: string;
  address: string;
  notes?: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  customer: Customer;
  service: Service;
  reviews?: Review | null;
}

export interface ServerActionResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}