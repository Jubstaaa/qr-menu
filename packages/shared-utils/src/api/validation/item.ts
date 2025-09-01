import {
  createItemRequestSchema,
  updateItemRequestSchema,
  deleteItemRequestSchema,
  reorderItemsRequestSchema,
  getItemByIdRequestSchema,
  getItemBySubdomainAndIdRequestSchema,
} from "@qr-menu/shared-validation";

// Item API Validation Functions
export const itemValidation = {
  validateCreateItemRequest: (data: unknown) => {
    return createItemRequestSchema.parse(data);
  },
  validateUpdateItemRequest: (data: unknown) => {
    return updateItemRequestSchema.parse(data);
  },
  validateDeleteItemRequest: (data: unknown) => {
    return deleteItemRequestSchema.parse(data);
  },
  validateReorderItemsRequest: (data: unknown) => {
    return reorderItemsRequestSchema.parse(data);
  },
  validateGetItemByIdRequest: (data: unknown) => {
    return getItemByIdRequestSchema.parse(data);
  },
  validateGetItemBySubdomainAndIdRequest: (data: unknown) => {
    return getItemBySubdomainAndIdRequestSchema.parse(data);
  },
};
