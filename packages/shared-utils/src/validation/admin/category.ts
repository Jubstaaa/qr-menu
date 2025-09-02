import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Category API Validation Functions
export const create = {
  request: {
    data: (data: any) => {
      return ApiValidation.Admin.Category.Create.Request.Data.parse(data);
    },
    params: (data: any) => {
      return ApiValidation.Admin.Category.Create.Request.Params.parse(data);
    },
  },
  response: (data: any) => {
    return ApiValidation.Admin.Category.Create.Response.parse(data);
  },
};

export const update = {
  request: {
    params: (data: any) => {
      return ApiValidation.Admin.Category.Update.Request.Params.parse(data);
    },
    data: (data: any) => {
      return ApiValidation.Admin.Category.Update.Request.Data.parse(data);
    },
  },
  response: (data: any) => {
    return ApiValidation.Admin.Category.Update.Response.parse(data);
  },
};
export const remove = {
  request: {
    params: (data: any) => {
      return ApiValidation.Admin.Category.Delete.Request.Params.parse(data);
    },
    data: (data: any) => {
      return ApiValidation.Admin.Category.Delete.Request.Data.parse(data);
    },
  },
  response: (data: any) => {
    return ApiValidation.Admin.Category.Delete.Response.parse(data);
  },
};
export const reorder = {
  request: {
    params: (data: any) => {
      return ApiValidation.Admin.Category.Reorder.Request.Params.parse(data);
    },
    data: (data: any) => {
      return ApiValidation.Admin.Category.Reorder.Request.Data.parse(data);
    },
  },
  response: (data: any) => {
    return ApiValidation.Admin.Category.Reorder.Response.parse(data);
  },
};

export const getById = {
  request: {
    params: (data: any) => {
      return ApiValidation.Admin.Category.GetById.Request.Params.parse(data);
    },
    data: (data: any) => {
      return ApiValidation.Admin.Category.GetById.Request.Data.parse(data);
    },
  },
  response: (data: any) => {
    return ApiValidation.Admin.Category.GetById.Response.parse(data);
  },
};

export const getAll = {
  request: {
    data: (data: any) => {
      return ApiValidation.Admin.Category.GetAll.Request.Data.parse(data);
    },
    params: (data: any) => {
      return ApiValidation.Admin.Category.GetAll.Request.Params.parse(data);
    },
  },
  response: (data: any) => {
    return ApiValidation.Admin.Category.GetAll.Response.parse(data);
  },
};
