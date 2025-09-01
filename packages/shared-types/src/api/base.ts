// Base API Response Type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

// Base API Error Type
export interface ApiError {
  message: string;
}
