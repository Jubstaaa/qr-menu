import { ApiValidation } from "@qr-menu/shared-validation";

export const getByUser = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Menu.GetByUser.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Menu.GetByUser.Request.Data.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Menu.GetByUser.Response.parse(data),
};
