export interface SetAvailabilityInput {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // "09:30"
  endTime: string;   // "18:00"
}

export interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  technicianId: string;
}

export interface SetAvailabilityResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: AvailabilitySlot;
}