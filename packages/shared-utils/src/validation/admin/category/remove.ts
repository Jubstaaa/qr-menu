import { ApiValidation } from "@qr-menu/shared-validation";

export const remove = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Category.Delete.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Category.Delete.Request.Data.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Category.Delete.Response.parse(data),
};
