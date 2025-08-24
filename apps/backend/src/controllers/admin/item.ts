import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { Item } from "@qr-menu/shared-types";

export const adminItemController = {
  // Get all items by menu (admin - all items)
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

  // Create item
  async createItem(req: Request, res: Response) {
    try {
      const data: Partial<Item> = req.body;

      if (!data.name || !data.price || !data.category_id) {
        return res.status(400).json({
          error: "Ürün adı, fiyat ve kategori gerekli",
        });
      }

      // Check if category exists and belongs to user's menu
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

      // Create item
      const { data: item, error: createError } = await supabase
        .from("menu_items")
        .insert({
          ...data,
          sort_order: data.sort_order || 0,
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

  // Update item
  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      // Check if item exists and user owns it
      const { data: item, error: itemError } = await supabase
        .from("menu_items")
        .select("*")
        .eq("id", id)
        .single();

      if (itemError || !item) {
        return res.status(404).json({
          error: "Ürün bulunamadı",
        });
      }

      // Update item
      const { data: updatedItem, error: updateError } = await supabase
        .from("menu_items")
        .update(data)
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

  // Reorder items in category
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

      // Check if all items belong to user's menu and same category
      const itemIds = changes.map((c) => c.id);
      const { data: existingItems, error: fetchError } = await supabase
        .from("menu_items")
        .select("id, category_id")
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

      // Check if all items are in the same category
      const categoryIds = [...new Set(existingItems.map((item) => item.category_id))];
      if (categoryIds.length > 1) {
        return res.status(400).json({
          error: "Tüm ürünler aynı kategoride olmalı",
        });
      }

      // Update sort_order for each item
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

  // Delete item
  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if item exists and user owns it
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

      // Delete item
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
