import { ApiValidation } from "@qr-menu/shared-validation";

export const create = {
  request: {
    data: (data: any) =>
      ApiValidation.Admin.Item.Create.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Admin.Item.Create.Request.Params.parse(data),
  },
  response: (data: any) => ApiValidation.Admin.Item.Create.Response.parse(data),
};
