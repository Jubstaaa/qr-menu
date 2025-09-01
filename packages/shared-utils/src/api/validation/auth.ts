import {
  loginRequestSchema,
  registerRequestSchema,
  checkAuthRequestSchema,
  getUserMenusRequestSchema,
} from "@qr-menu/shared-validation";

// Auth API Validation Functions
export const authValidation = {
  validateLoginRequest: (data: unknown) => {
    return loginRequestSchema.parse(data);
  },
  validateRegisterRequest: (data: unknown) => {
    return registerRequestSchema.parse(data);
  },
  validateCheckAuthRequest: (data: unknown) => {
    return checkAuthRequestSchema.parse(data);
  },
  validateGetUserMenusRequest: (data: unknown) => {
    return getUserMenusRequestSchema.parse(data);
  },
};
