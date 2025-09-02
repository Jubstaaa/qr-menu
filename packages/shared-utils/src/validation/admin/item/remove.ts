import { ApiValidation } from "@qr-menu/shared-validation";

export const remove = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Item.Delete.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Item.Delete.Request.Data.parse(data),
  },
  response: (data: any) => ApiValidation.Admin.Item.Delete.Response.parse(data),
};
