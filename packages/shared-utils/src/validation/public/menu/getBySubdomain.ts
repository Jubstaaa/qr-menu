import { ApiValidation } from "@qr-menu/shared-validation";

export const getBySubdomain = {
  request: {
    data: (data: any) =>
      ApiValidation.Public.Menu.GetBySubdomain.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Public.Menu.GetBySubdomain.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Public.Menu.GetBySubdomain.Response.parse(data),
};
