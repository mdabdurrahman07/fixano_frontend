export interface TechnicianAvailability {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string;   // "18:00"
}

export interface ServiceData {
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
  technician: {
    availabilities: TechnicianAvailability[];
  };
}

export interface SingleServiceResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: ServiceData;
}

export interface CreateBookingPayload {
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes?: string;
}

export interface Booking {
  id: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes?: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  price: string;
  createdAt: string;
}

export interface FormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  booking?: Booking;
}