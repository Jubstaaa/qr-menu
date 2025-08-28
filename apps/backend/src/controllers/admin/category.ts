import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { Category } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../utils/upload";
import { validateUpdateCategory } from "@qr-menu/shared-validation";

export const adminCategoryController = {
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

  async createCategory(req: Request, res: Response) {
    try {
      const data: Partial<Category> = req.body;

      if (!data.name) {
        return res.status(400).json({
          error: "Kategori adı gerekli",
        });
      }

      let uploadedUrl: string | null = null;
      try {
        uploadedUrl = await uploadImage({
          req,
          folder: "categories",
          menuId: req.userMenu!.id,
        });
      } catch (e) {
        console.error("Category image upload error:", e);
      }

      const { data: category, error: createError } = await supabase
        .from("menu_categories")
        .insert({
          ...data,
          menu_id: req.userMenu!.id,
          sort_order: data.sort_order || 0,
          image_url: uploadedUrl ?? data.image_url ?? null,
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

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let updateData;
      try {
        updateData = validateUpdateCategory(req.body);
      } catch (validationError: any) {
        return res.status(400).json({
          error: "Geçersiz veri formatı",
          details: validationError.errors,
        });
      }

      const { data: existingCategory, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id, menu_id, image_url")
        .eq("id", id)
        .single();

      if (categoryError || !existingCategory) {
        return res.status(404).json({
          error: "Kategori bulunamadı",
        });
      }

      let finalImageUrl: string | null = updateData.image_url as any;

      const hasNewFile = (req as any).file;

      if (hasNewFile) {
        try {
          const uploadedUrl = await uploadImage({
            req,
            folder: "categories",
            menuId: req.userMenu!.id,
          });

          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;

            if (existingCategory.image_url) {
              await deleteImage({
                imageUrl: existingCategory.image_url,
                folder: "categories",
                menuId: req.userMenu!.id,
              });
            }
          }
        } catch (uploadError: any) {
          console.error("Category image upload error:", uploadError);
        }
      } else if (updateData.image_url === null) {
        finalImageUrl = null;

        if (existingCategory.image_url) {
          await deleteImage({
            imageUrl: existingCategory.image_url,
            folder: "categories",
            menuId: req.userMenu!.id,
          });
        }
      }

      const { data: updatedCategory, error: updateError } = await supabase
        .from("menu_categories")
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

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

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
