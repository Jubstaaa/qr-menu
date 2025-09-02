import { ApiValidation } from "@qr-menu/shared-validation";

export const checkAuth = {
  request: {
    data: (data: any) =>
      ApiValidation.Common.Auth.CheckAuth.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Common.Auth.CheckAuth.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Common.Auth.CheckAuth.Response.parse(data),
};
