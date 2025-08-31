import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { Item } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../utils/upload";
import { validateUpdateItem } from "@qr-menu/shared-validation";

export const adminItemController = {
  async getItemsByMenu(req: Request, res: Response) {
    try {
      const { data: items, error } = await supabase
        .from("menu_items")
        .select(
          `
          *,
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
          error: "Menü ürünleri getirilemedi",
        });
      }

      res.json({
        message: "Ürünler başarıyla getirildi",
        data: items || [],
      });
    } catch (error: any) {
      console.error("Get menu items error:", error);
      res.status(500).json({
        error: "Menü ürünleri getirilemedi",
      });
    }
  },

  async createItem(req: Request, res: Response) {
    try {
      const data: Partial<Item> = req.body;

      if (!data.name || !data.price || !data.category_id) {
        return res.status(400).json({
          error: "Ürün adı, fiyat ve kategori gerekli",
        });
      }

      const { data: category, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id")
        .eq("id", data.category_id)
        .eq("menu_id", req.userMenu!.id)
        .single();

      if (categoryError || !category) {
        return res.status(400).json({
          error: "Geçersiz kategori",
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
          ...data,
          sort_order: data.sort_order || 0,
          image_url: uploadedUrl ?? data.image_url ?? null,
        })
        .select()
        .single();

      if (createError) {
        console.error("Item creation error:", createError);
        return res.status(500).json({
          error: "Ürün oluşturulamadı",
        });
      }

      res.status(201).json({
        message: "Ürün başarıyla oluşturuldu!",
        data: item,
      });
    } catch (error: any) {
      console.error("Create item error:", error);
      res.status(500).json({
        error: "Ürün oluşturulamadı",
      });
    }
  },

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let updateData;
      try {
        updateData = validateUpdateItem(req.body);
      } catch (validationError: any) {
        return res.status(400).json({
          error: "Geçersiz veri formatı",
          details: validationError.errors,
        });
      }

      const { data: existingItem, error: itemError } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", id)
        .single();

      if (itemError || !existingItem) {
        return res.status(404).json({
          error: "Ürün bulunamadı",
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
          return res.status(500).json({
            error: "Ürün resmi yüklenemedi",
          });
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
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Item update error:", updateError);
        return res.status(500).json({
          error: "Ürün güncellenemedi",
        });
      }

      res.json({
        message: "Ürün başarıyla güncellendi!",
        data: updatedItem,
      });
    } catch (error: any) {
      console.error("Update item error:", error);
      res.status(500).json({
        error: "Ürün güncellenemedi",
      });
    }
  },

  async reorderItemsInCategory(req: Request, res: Response) {
    try {
      const { changes } = req.body as {
        changes: Array<{ id: string; newSortOrder: number }>;
      };

      if (!Array.isArray(changes) || changes.length === 0) {
        return res.status(400).json({
          error: "Değişiklik listesi gerekli",
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
          error: "Ürünler getirilemedi",
        });
      }

      if (existingItems.length !== changes.length) {
        return res.status(403).json({
          error: "Bazı ürünler size ait değil",
        });
      }

      const categoryIds = [
        ...new Set(existingItems.map((item) => item.category_id)),
      ];
      if (categoryIds.length > 1) {
        return res.status(400).json({
          error: "Tüm ürünler aynı kategoride olmalı",
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
            error: "Ürün sıralaması güncellenemedi",
          });
        }
        updates.push(change.id);
      }

      return res.json({
        message: "Sıralama başarıyla güncellendi",
        data: { updatedCount: updates.length },
      });
    } catch (error: any) {
      console.error("Reorder items error:", error);
      return res.status(500).json({ error: "Sıralama güncellenemedi" });
    }
  },

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { data: item, error: itemError } = await supabase
        .from("menu_items")
        .select("id")
        .eq("id", id)
        .single();

      if (itemError || !item) {
        return res.status(404).json({
          error: "Ürün bulunamadı",
        });
      }

      const { error: deleteError } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Item deletion error:", deleteError);
        return res.status(500).json({
          error: "Ürün silinemedi",
        });
      }

      res.json({
        message: "Ürün başarıyla silindi!",
      });
    } catch (error: any) {
      console.error("Delete item error:", error);
      res.status(500).json({
        error: "Ürün silinemedi",
      });
    }
  },
};
