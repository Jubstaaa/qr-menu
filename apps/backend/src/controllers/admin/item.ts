import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { ItemAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../utils/upload";
import { itemValidation } from "@qr-menu/shared-utils";

export const adminItemController = {
  async getItemsByMenu(
    req: Request<{}, {}, ItemAPI.Admin.GetAllItemsRequest>,
    res: Response<ApiResponse<ItemAPI.Admin.GetAllItemsResponse> | ApiError>
  ) {
    try {
      const { data: items, error } = await supabase
        .from("menu_items")
        .select(
          `
          id,
          name,
          description,
          price,
          category_id,
          image_url,
          is_popular,
          is_chef_special,
          spice_level,
          created_at,
          menu_categories!inner(
            id,
            name,
            menu_id
          )
        `
        )
        .eq("menu_categories.menu_id", req.userMenu!.id)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Get menu items error:", error);
        return res.status(500).json({
          message: "Menü ürünleri getirilemedi",
        });
      }

      res.json({
        data: items || [],
        message: "Ürünler başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get menu items error:", error);
      res.status(500).json({
        message: "Menü ürünleri getirilemedi",
      });
    }
  },

  async createItem(
    req: Request<{}, {}, ItemAPI.Admin.CreateItemRequest>,
    res: Response<ApiResponse<ItemAPI.Admin.CreateItemResponse> | ApiError>
  ) {
    try {
      const requestData: ItemAPI.Admin.CreateItemRequest = req.body;

      if (!requestData.name || !requestData.price || !requestData.category_id) {
        return res.status(400).json({
          message: "Ürün adı, fiyat ve kategori gerekli",
        });
      }

      const { data: category, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id")
        .eq("id", requestData.category_id)
        .eq("menu_id", req.userMenu!.id)
        .single();

      if (categoryError || !category) {
        return res.status(400).json({
          message: "Geçersiz kategori",
        });
      }

      let uploadedUrl: string | null = null;
      try {
        uploadedUrl = await uploadImage({
          req,
          folder: "items",
          menuId: req.userMenu!.id,
        });
      } catch (e) {
        console.error("Item image upload error:", e);
      }

      const { data: item, error: createError } = await supabase
        .from("menu_items")
        .insert({
          ...requestData,
          image_url: uploadedUrl ?? requestData.image_url ?? null,
        })
        .select()
        .single();

      if (createError) {
        console.error("Item creation error:", createError);
        return res.status(500).json({
          message: "Ürün oluşturulamadı",
        });
      }

      res.status(201).json({
        data: item,
        message: "Ürün başarıyla oluşturuldu!",
      });
    } catch (error: any) {
      console.error("Create item error:", error);
      res.status(500).json({
        message: "Ürün oluşturulamadı",
      });
    }
  },

  async updateItem(
    req: Request<{ id: string }, {}, ItemAPI.Admin.UpdateItemRequest>,
    res: Response<ApiResponse<ItemAPI.Admin.UpdateItemResponse> | ApiError>
  ) {
    try {
      const { id } = req.params;
      const requestData: ItemAPI.Admin.UpdateItemRequest = req.body;

      let updateData;
      try {
        updateData = itemValidation.validateUpdateItemRequest(requestData);
      } catch (validationError: any) {
        return res.status(400).json({
          message: "Geçersiz veri formatı",
        });
      }

      const { data: existingItem, error: itemError } = await supabase
        .from("menu_items")
        .select("id, image_url")
        .eq("id", id)
        .single();

      if (itemError || !existingItem) {
        return res.status(404).json({
          message: "Ürün bulunamadı",
        });
      }

      let finalImageUrl: string | null = updateData.image_url as any;

      const hasNewFile = (req as any).file;

      if (hasNewFile) {
        try {
          const uploadedUrl = await uploadImage({
            req,
            folder: "items",
            menuId: req.userMenu!.id,
          });

          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;

            if (existingItem.image_url) {
              await deleteImage({
                imageUrl: existingItem.image_url,
                folder: "items",
                menuId: req.userMenu!.id,
              });
            }
          }
        } catch (uploadError: any) {
          console.error("Item image upload error:", uploadError);
        }
      } else if (updateData.image_url === null) {
        finalImageUrl = null;

        if (existingItem.image_url) {
          await deleteImage({
            imageUrl: existingItem.image_url,
            folder: "items",
            menuId: req.userMenu!.id,
          });
        }
      }

      const { data: updatedItem, error: updateError } = await supabase
        .from("menu_items")
        .update({
          ...updateData,
          image_url: finalImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        return res.status(500).json({
          message: "Ürün güncellenemedi",
        });
      }

      res.json({
        data: updatedItem,
        message: "Ürün başarıyla güncellendi!",
      });
    } catch (error: any) {
      console.error("Update item error:", error);
      res.status(500).json({
        message: "Ürün güncellenemedi",
      });
    }
  },

  async deleteItem(
    req: Request<{ id: string }, {}, {}>,
    res: Response<ApiResponse<ItemAPI.Admin.DeleteItemResponse> | ApiError>
  ) {
    try {
      const { id } = req.params;

      const { data: item, error: itemError } = await supabase
        .from("menu_items")
        .select("id, image_url")
        .eq("id", id)
        .single();

      if (itemError || !item) {
        return res.status(404).json({
          message: "Ürün bulunamadı",
        });
      }

      const { error: deleteError } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Item deletion error:", deleteError);
        return res.status(500).json({
          message: "Ürün silinemedi",
        });
      }

      res.json({
        data: {
          success: true,
        },
        message: "Ürün başarıyla silindi!",
      });
    } catch (error: any) {
      console.error("Delete item error:", error);
      res.status(500).json({
        message: "Ürün silinemedi",
      });
    }
  },

  async reorderItemsInCategory(
    req: Request<{}, {}, ItemAPI.Admin.ReorderItemsRequest>,
    res: Response<ApiResponse<ItemAPI.Admin.ReorderItemsResponse> | ApiError>
  ) {
    try {
      const { changes } = req.body;

      if (!Array.isArray(changes) || changes.length === 0) {
        return res.status(400).json({
          message: "Değişiklik listesi gerekli",
        });
      }

      const itemIds = changes.map((c) => c.id);
      const { data: existingItems, error: fetchError } = await supabase
        .from("menu_items")
        .select(
          `
          id, 
          category_id,
          menu_categories!inner(
            id,
            menu_id
          )
        `
        )
        .eq("menu_categories.menu_id", req.userMenu!.id)
        .in("id", itemIds);

      if (fetchError) {
        console.error("Fetch items error:", fetchError);
        return res.status(500).json({
          message: "Ürünler getirilemedi",
        });
      }

      if (existingItems.length !== changes.length) {
        return res.status(403).json({
          message: "Bazı ürünler size ait değil",
        });
      }

      const categoryIds = [
        ...new Set(existingItems.map((item) => item.category_id)),
      ];
      if (categoryIds.length > 1) {
        return res.status(400).json({
          message: "Tüm ürünler aynı kategoride olmalı",
        });
      }

      const updates = [];
      for (const change of changes) {
        const { error: updateError } = await supabase
          .from("menu_items")
          .update({ sort_order: change.newSortOrder })
          .eq("id", change.id);

        if (updateError) {
          console.error("Item reorder error:", updateError);
          return res.status(500).json({
            message: "Ürün sıralaması güncellenemedi",
          });
        }
        updates.push(change.id);
      }

      return res.json({
        data: {
          success: true,
        },
        message: "Sıralama başarıyla güncellendi",
      });
    } catch (error: any) {
      console.error("Reorder items error:", error);
      return res.status(500).json({
        message: "Sıralama güncellenemedi",
      });
    }
  },
};
