import { ApiValidation } from "@qr-menu/shared-validation";

export const reorder = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Item.Reorder.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Item.Reorder.Request.Data.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Item.Reorder.Response.parse(data),
};
