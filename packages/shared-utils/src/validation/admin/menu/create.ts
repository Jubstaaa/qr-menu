import { ApiValidation } from "@qr-menu/shared-validation";

export const create = {
  request: {
    data: (data: any) =>
      ApiValidation.Admin.Menu.Create.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Admin.Menu.Create.Request.Params.parse(data),
  },
  response: (data: any) => ApiValidation.Admin.Menu.Create.Response.parse(data),
};
