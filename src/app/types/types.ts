export type loginFormPrevState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};
