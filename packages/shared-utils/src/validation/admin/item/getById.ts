import { ApiValidation } from "@qr-menu/shared-validation";

export const getById = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Item.GetById.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Item.GetById.Request.Data.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Item.GetById.Response.parse(data),
};
