import {
  createMenuRequestSchema,
  updateMenuRequestSchema,
  getMenuBySubdomainRequestSchema,
  getMenusByUserRequestSchema,
} from "@qr-menu/shared-validation";

// Menu API Validation Functions
export const menuValidation = {
  validateCreateMenuRequest: (data: unknown) => {
    return createMenuRequestSchema.parse(data);
  },
  validateUpdateMenuRequest: (data: unknown) => {
    return updateMenuRequestSchema.parse(data);
  },
  validateGetMenuBySubdomainRequest: (data: unknown) => {
    return getMenuBySubdomainRequestSchema.parse(data);
  },
  validateGetMenusByUserRequest: (data: unknown) => {
    return getMenusByUserRequestSchema.parse(data);
  },
};
