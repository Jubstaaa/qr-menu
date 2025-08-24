export interface User {
  id: string;
  email: string;
  restaurant_name?: string;
  created_at: string;
  hasMenu?: boolean;
  menuSubdomain?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  menu: {
    id: string;
    user_id: string;
    restaurant_name: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}

export interface AuthCheckResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  menu: {
    id: string;
    user_id: string;
    restaurant_name: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Admin Auth Types
export interface AdminLoginResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  menu: {
    id: string;
    user_id: string;
    restaurant_name: string;
    subdomain: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}

export interface AdminAuthCheckResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  menu: {
    id: string;
    user_id: string;
    restaurant_name: string;
    subdomain: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface UserMenu {
  id: string;
  restaurant_name: string;
  subdomain: string;
  status: string;
}

export interface AdminGetUserMenusResponse {
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  menus: UserMenu[];
}
