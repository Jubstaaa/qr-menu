import { ApiValidation } from "@qr-menu/shared-validation";

export const logout = {
  request: {
    data: (data: any) =>
      ApiValidation.Common.Auth.Logout.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Common.Auth.Logout.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Common.Auth.Logout.Response.parse(data),
};
