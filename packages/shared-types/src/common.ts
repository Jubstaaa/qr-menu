export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  field: string;
  value: any;
  operator: "eq" | "ne" | "gt" | "lt" | "gte" | "lte" | "contains" | "in";
}

export interface PaginationConfig {
  page: number;
  limit: number;
}

export interface Theme {
  mode: "light" | "dark" | "system";
  primary: string;
  secondary: string;
  accent: string;
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  isVisible: boolean;
}
