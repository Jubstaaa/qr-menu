import { ApiValidation } from "@qr-menu/shared-validation";

export const getById = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Category.GetById.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Category.GetById.Request.Data.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Category.GetById.Response.parse(data),
};
