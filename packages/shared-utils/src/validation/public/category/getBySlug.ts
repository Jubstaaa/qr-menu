import { ApiValidation } from "@qr-menu/shared-validation";

export const getBySlug = {
  request: {
    data: (data: any) =>
      ApiValidation.Public.Category.GetBySlug.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Public.Category.GetBySlug.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Public.Category.GetBySlug.Response.parse(data),
};
