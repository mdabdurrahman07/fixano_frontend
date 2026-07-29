export type loginFormPrevState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  redirectTo?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
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
