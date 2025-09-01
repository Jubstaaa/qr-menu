import { z } from "zod";
import {
  loginRequestSchema,
  registerRequestSchema,
  checkAuthRequestSchema,
  getUserMenusRequestSchema,
  baseRequestSchema,
} from "@qr-menu/shared-validation";

// Auth API Types
export namespace AuthAPI {
  // Request Types (from Zod schemas)
  export type LoginRequest = z.infer<typeof loginRequestSchema>;
  export type RegisterRequest = z.infer<typeof registerRequestSchema>;
  export type CheckAuthRequest = z.infer<typeof checkAuthRequestSchema>;
  export type GetUserMenusRequest = z.infer<typeof getUserMenusRequestSchema>;
  export type GetAllUsersRequest = z.infer<typeof baseRequestSchema>;
  export type LogoutRequest = z.infer<typeof baseRequestSchema>;
  export type GetCurrentUserRequest = z.infer<typeof baseRequestSchema>;

  // Response Types
  export type LoginResponse = {
    user: {
      id: string;
      email: string;
    };
    menu?: {
      id: string;
      restaurant_name: string;
      subdomain: string;
    };
  };

  export type RegisterResponse = {
    user: {
      id: string;
      email: string;
    };
  };

  export type LogoutResponse = {};

  export type GetCurrentUserResponse = {
    user: {
      id: string;
      email: string;
    };
    menu?: {
      id: string;
      restaurant_name: string;
      subdomain: string;
    };
  } | null;

  // Check Auth
  export type CheckAuthResponse = {
    user: {
      id: string;
      email: string;
    };
    menu?: {
      id: string;
      restaurant_name: string;
      subdomain: string;
    };
  };

  // Get User Menus
  export type GetUserMenusResponse = {
    user: {
      id: string;
      email: string;
    };
    menus: Array<{
      id: string;
      restaurant_name: string;
      subdomain: string;
    }>;
  };
}
