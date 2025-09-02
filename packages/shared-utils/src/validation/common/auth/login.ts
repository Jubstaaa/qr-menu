import { ApiValidation } from "@qr-menu/shared-validation";

export const login = {
  request: {
    data: (data: any) =>
      ApiValidation.Common.Auth.Login.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Common.Auth.Login.Request.Params.parse(data),
  },
  response: (data: any) => ApiValidation.Common.Auth.Login.Response.parse(data),
};
