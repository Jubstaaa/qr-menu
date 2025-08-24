import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { Category } from "@qr-menu/shared-types";

export const adminCategoryController = {
  // Get all categories by menu (admin - all categories)
  async getCategories(req: Request, res: Response) {
    try {
      const { data: categories, error } = await supabase
        .from("menu_categories")
        .select(
          `
        *,
        menu_items(*)
      `
        )
        .eq("menu_id", req.userMenu!.id)
        .order("sort_order", { ascending: true })
        .order("sort_order", { foreignTable: "menu_items", ascending: true });

      if (error) {
        console.error("Get categories error:", error);
        return res.status(500).json({
          error: "Kategoriler getirilemedi",
        });
      }

      res.json({
        message: "Kategoriler başarıyla getirildi",
        data: categories || [],
      });
    } catch (error: any) {
      console.error("Get categories error:", error);
      res.status(500).json({
        error: "Kategoriler getirilemedi",
      });
    }
  },

  // Create category
  async createCategory(req: Request, res: Response) {
    try {
      const data: Partial<Category> = req.body;

      if (!data.name) {
        return res.status(400).json({
          error: "Kategori adı gerekli",
        });
      }

      // Create category
      const { data: category, error: createError } = await supabase
        .from("menu_categories")
        .insert({
          ...data,
          menu_id: req.userMenu!.id,
          sort_order: data.sort_order || 0,
        })
        .select()
        .single();

      if (createError) {
        console.error("Category creation error:", createError);
        return res.status(500).json({
          error: "Kategori oluşturulamadı",
        });
      }

      res.status(201).json({
        message: "Kategori başarıyla oluşturuldu!",
        data: category,
      });
    } catch (error: any) {
      console.error("Create category error:", error);
      res.status(500).json({
        error: "Kategori oluşturulamadı",
      });
    }
  },

  // Update category
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<Category> = req.body;

      // Check if category exists and user owns it
      const { data: category, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id, menu_id")
        .eq("id", id)
        .single();

      if (categoryError || !category) {
        return res.status(404).json({
          error: "Kategori bulunamadı",
        });
      }

      const { data: updatedCategory, error: updateError } = await supabase
        .from("menu_categories")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Category update error:", updateError);
        return res.status(500).json({
          error: "Kategori güncellenemedi",
        });
      }

      res.json({
        message: "Kategori başarıyla güncellendi!",
        data: updatedCategory,
      });
    } catch (error: any) {
      console.error("Update category error:", error);
      res.status(500).json({
        error: "Kategori güncellenemedi",
      });
    }
  },

  // Reorder categories
  async reorderCategories(req: Request, res: Response) {
    try {
      const { changes } = req.body as {
        changes: Array<{ id: string; newSortOrder: number }>;
      };

      if (!Array.isArray(changes) || changes.length === 0) {
        return res.status(400).json({
          error: "Değişiklik listesi gerekli",
        });
      }

      // Check if all categories belong to user's menu
      const categoryIds = changes.map((c) => c.id);
      const { data: existingCategories, error: fetchError } = await supabase
        .from("menu_categories")
        .select("id")
        .eq("menu_id", req.userMenu!.id)
        .in("id", categoryIds);

      if (fetchError) {
        console.error("Fetch categories error:", fetchError);
        return res.status(500).json({
          error: "Kategoriler getirilemedi",
        });
      }

      if (existingCategories.length !== changes.length) {
        return res.status(403).json({
          error: "Bazı kategoriler size ait değil",
        });
      }

      // Update sort_order for each category
      const updates = [];
      for (const change of changes) {
        const { error: updateError } = await supabase
          .from("menu_categories")
          .update({ sort_order: change.newSortOrder })
          .eq("id", change.id);

        if (updateError) {
          console.error("Category reorder error:", updateError);
          return res.status(500).json({
            error: "Kategori sıralaması güncellenemedi",
          });
        }
        updates.push(change.id);
      }

      return res.json({
        message: "Sıralama başarıyla güncellendi",
        data: { updatedCount: updates.length },
      });
    } catch (error: any) {
      console.error("Reorder categories error:", error);
      return res.status(500).json({ error: "Sıralama güncellenemedi" });
    }
  },

  // Delete category
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if category exists and user owns it
      const { data: category, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id, menu_id")
        .eq("id", id)
        .single();

      if (categoryError || !category) {
        return res.status(404).json({
          error: "Kategori bulunamadı",
        });
      }

      // Delete category
      const { error: deleteError } = await supabase
        .from("menu_categories")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Category deletion error:", deleteError);
        return res.status(500).json({
          error: "Kategori silinemedi",
        });
      }

      res.json({
        message: "Kategori başarıyla silindi!",
      });
    } catch (error: any) {
      console.error("Delete category error:", error);
      res.status(500).json({
        error: "Kategori silinemedi",
      });
    }
  },
};
