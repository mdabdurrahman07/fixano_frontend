// types/payment.ts

export type PaymentStatus = "COMPLETED" | "PENDING" | "PROCESSING" | "FAILED" | string;

export interface ServiceCategory {
  id: string;
  name: string;
}

export interface BookingService {
  id: string;
  title: string;
  category: ServiceCategory;
}

export interface Booking {
  id: string;
  status: string;
  totalAmount: string;
  service: BookingService;
}

export interface PaymentData {
  id: string;
  amount: string;
  provider: string;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
  customerId: string;
  booking: Booking;
}

export interface PaymentStatusApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: PaymentData;
}

export interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}