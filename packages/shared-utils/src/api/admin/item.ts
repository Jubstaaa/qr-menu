import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";

// Admin Item API
export const adminItemApi = {
  // Get all items
  getAllItems: (): Promise<ApiType.Admin.Item.GetAll.Response> =>
    apiClient.getData<ApiType.Admin.Item.GetAll.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.ITEM.GET_ALL)
    ),

  // Get item by ID
  getItemById: (itemId: string): Promise<ApiType.Admin.Item.GetById.Response> =>
    apiClient.getData<ApiType.Admin.Item.GetById.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.ITEM.GET_BY_ID, { id: itemId })
    ),

  // Create item
  createItem: (
    data: ApiType.Admin.Item.Create.Request
  ): Promise<ApiType.Admin.Item.Create.Response> =>
    apiClient.postData<
      ApiType.Admin.Item.Create.Request,
      ApiType.Admin.Item.Create.Response
    >(apiClient.buildUrl(ENDPOINTS.ADMIN.ITEM.CREATE), data),

  // Update item
  updateItem: (
    itemId: string,
    data: ApiType.Admin.Item.Update.Request.Data
  ): Promise<ApiType.Admin.Item.Update.Response> =>
    apiClient.putData<
      ApiType.Admin.Item.Update.Request.Data,
      ApiType.Admin.Item.Update.Response
    >(
      apiClient.buildUrl<{ id: string }>(ENDPOINTS.ADMIN.ITEM.UPDATE, {
        id: itemId,
      }),
      data
    ),

  // Delete item
  deleteItem: (itemId: string): Promise<ApiType.Admin.Item.Delete.Response> =>
    apiClient.deleteData<ApiType.Admin.Item.Delete.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.ITEM.DELETE, { id: itemId })
    ),
};
