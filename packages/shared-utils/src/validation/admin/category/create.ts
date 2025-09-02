import { ApiValidation } from "@qr-menu/shared-validation";

export const create = {
  request: {
    data: (data: any) =>
      ApiValidation.Admin.Category.Create.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Admin.Category.Create.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Category.Create.Response.parse(data),
};
