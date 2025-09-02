import { ApiValidation } from "@qr-menu/shared-validation";

export const update = {
  request: {
    params: (data: any) =>
      ApiValidation.Admin.Menu.Update.Request.Params.parse(data),
    data: (data: any) =>
      ApiValidation.Admin.Menu.Update.Request.Data.parse(data),
  },
  response: (data: any) => ApiValidation.Admin.Menu.Update.Response.parse(data),
};
