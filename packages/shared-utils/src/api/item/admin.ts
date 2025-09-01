import { apiClient } from "../../api-client";
import { ItemAPI } from "@qr-menu/shared-types";

// Admin Item API
export const adminItemApi = {
  // Get all items
  getAllItems: (): Promise<ItemAPI.Admin.GetAllItemsResponse> =>
    apiClient.getData<ItemAPI.Admin.GetAllItemsResponse>(
      apiClient.buildUrl("item.getAll")
    ),

  // Get item by ID
  getItemById: (itemId: string): Promise<ItemAPI.Admin.GetItemByIdResponse> =>
    apiClient.getData<ItemAPI.Admin.GetItemByIdResponse>(
      apiClient.buildUrl("item.getById", { id: itemId })
    ),

  // Create item
  createItem: (
    data: ItemAPI.Admin.CreateItemRequest
  ): Promise<ItemAPI.Admin.CreateItemResponse> =>
    apiClient.postData<ItemAPI.Admin.CreateItemResponse>(
      apiClient.buildUrl("item.create"),
      data
    ),

  // Update item
  updateItem: (
    itemId: string,
    data: ItemAPI.Admin.UpdateItemRequest
  ): Promise<ItemAPI.Admin.UpdateItemResponse> =>
    apiClient.putData<ItemAPI.Admin.UpdateItemResponse>(
      apiClient.buildUrl("item.update", { id: itemId }),
      data
    ),

  // Delete item
  deleteItem: (itemId: string): Promise<ItemAPI.Admin.DeleteItemResponse> =>
    apiClient.deleteData<ItemAPI.Admin.DeleteItemResponse>(
      apiClient.buildUrl("item.delete", { id: itemId })
    ),

  // Reorder items in category
  reorderItemsInCategory: (
    changes: Array<{ id: string; newSortOrder: number }>
  ): Promise<ItemAPI.Admin.ReorderItemsResponse> =>
    apiClient.postData<ItemAPI.Admin.ReorderItemsResponse>(
      apiClient.buildUrl("item.reorder"),
      { changes }
    ),
};
