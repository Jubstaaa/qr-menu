import { ApiValidation } from "@qr-menu/shared-validation";

export const reorder = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Category.Reorder.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Category.Reorder.Request.Data.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Category.Reorder.Response.parse(data),
};
