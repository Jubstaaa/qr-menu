import { ApiValidation } from "@qr-menu/shared-validation";

export const register = {
  request: {
    data: (data: any) =>
      ApiValidation.Common.Auth.Register.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Common.Auth.Register.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Common.Auth.Register.Response.parse(data),
};
