import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Item API Validation Functions
export const create = (data: ApiType.Admin.Item.Create.Request) => {
  return ApiValidation.Admin.Item.Create.parse(data);
};

export const update = (data: ApiType.Admin.Item.Update.Request) => {
  return ApiValidation.Admin.Item.Update.parse(data);
};

export const remove = (data: ApiType.Admin.Item.Delete.Request) => {
  return ApiValidation.Admin.Item.Delete.parse(data);
};

export const reorder = (data: ApiType.Admin.Item.Reorder.Request) => {
  return ApiValidation.Admin.Item.Reorder.parse(data);
};

export const getById = (data: ApiType.Admin.Item.GetById.Request) => {
  return ApiValidation.Admin.Item.GetById.parse(data);
};
