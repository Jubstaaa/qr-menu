import {
  createCategoryRequestSchema,
  updateCategoryRequestSchema,
  deleteCategoryRequestSchema,
  reorderCategoriesRequestSchema,
  getCategoryBySlugRequestSchema,
} from "@qr-menu/shared-validation";

// Category API Validation Functions
export const categoryValidation = {
  validateCreateCategoryRequest: (data: unknown) => {
    return createCategoryRequestSchema.parse(data);
  },
  validateUpdateCategoryRequest: (data: unknown) => {
    return updateCategoryRequestSchema.parse(data);
  },
  validateDeleteCategoryRequest: (data: unknown) => {
    return deleteCategoryRequestSchema.parse(data);
  },
  validateReorderCategoriesRequest: (data: unknown) => {
    return reorderCategoriesRequestSchema.parse(data);
  },
  validateGetCategoryBySlugRequest: (data: unknown) => {
    return getCategoryBySlugRequestSchema.parse(data);
  },
};
