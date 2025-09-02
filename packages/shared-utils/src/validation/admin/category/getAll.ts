import { ApiValidation } from "@qr-menu/shared-validation";

export const getAll = {
  request: {
    data: (data: any) =>
      ApiValidation.Admin.Category.GetAll.Request.Data.parse(data),
    params: (data: any) =>
      ApiValidation.Admin.Category.GetAll.Request.Params.parse(data),
  },
  response: (data: any) =>
    ApiValidation.Admin.Category.GetAll.Response.parse(data),
};
