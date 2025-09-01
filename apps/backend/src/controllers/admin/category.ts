import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { CategoryAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../utils/upload";
import { categoryValidation } from "@qr-menu/shared-utils";

export const adminCategoryController = {
  async getCategories(
    req: Request<{}, {}, CategoryAPI.Admin.GetAllCategoriesRequest>,
    res: Response<
      ApiResponse<CategoryAPI.Admin.GetAllCategoriesResponse> | ApiError
    >
  ) {
    try {
      const { data: categories, error } = await supabase
        .from("menu_categories")
        .select(
          `
          id,
          name,
          description,
          image_url,
          menu_id,
          created_at,
          updated_at,
          menu_items(*)
        `
        )
        .eq("menu_id", req.userMenu!.id)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Get categories error:", error);
        return res.status(500).json({
          message: "Kategoriler getirilemedi",
        });
      }

      res.json({
        data: categories,
        message: "Kategoriler başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get categories error:", error);
      res.status(500).json({
        message: "Kategoriler getirilemedi",
      });
    }
  },

  async createCategory(
    req: Request<{}, {}, CategoryAPI.Admin.CreateCategoryRequest>,
    res: Response<
      ApiResponse<CategoryAPI.Admin.CreateCategoryResponse> | ApiError
    >
  ) {
    try {
      const requestData: CategoryAPI.Admin.CreateCategoryRequest = req.body;

      if (!requestData.name) {
        return res.status(400).json({
          message: "Kategori adı gerekli",
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
          ...requestData,
          menu_id: req.userMenu!.id,
          sort_order: 0,
          image_url: uploadedUrl ?? requestData.image_url ?? null,
        })
        .select()
        .single();

      if (createError) {
        console.error("Category creation error:", createError);
        return res.status(500).json({
          message: "Kategori oluşturulamadı",
        });
      }

      res.status(201).json({
        data: category,
        message: "Kategori başarıyla oluşturuldu!",
      });
    } catch (error: any) {
      console.error("Create category error:", error);
      res.status(500).json({
        message: "Kategori oluşturulamadı",
      });
    }
  },

  async updateCategory(
    req: Request<{ id: string }, {}, CategoryAPI.Admin.UpdateCategoryRequest>,
    res: Response<
      ApiResponse<CategoryAPI.Admin.UpdateCategoryResponse> | ApiError
    >
  ) {
    try {
      const { id } = req.params;
      const requestData: CategoryAPI.Admin.UpdateCategoryRequest = req.body;

      let updateData;
      try {
        updateData =
          categoryValidation.validateUpdateCategoryRequest(requestData);
      } catch (validationError: any) {
        return res.status(400).json({
          message: "Geçersiz veri formatı",
        });
      }

      const { data: existingCategory, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id, menu_id, image_url")
        .eq("id", id)
        .single();

      if (categoryError || !existingCategory) {
        return res.status(404).json({
          message: "Kategori bulunamadı",
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
          message: "Kategori güncellenemedi",
        });
      }

      res.json({
        data: updatedCategory,
        message: "Kategori başarıyla güncellendi!",
      });
    } catch (error: any) {
      console.error("Update category error:", error);
      res.status(500).json({
        message: "Kategori güncellenemedi",
      });
    }
  },

  async reorderCategories(
    req: Request<{}, {}, { category_ids: string[] }>,
    res: Response<ApiResponse<{ success: boolean }> | ApiError>
  ) {
    try {
      const requestData: { category_ids: string[] } = req.body;

      if (
        !Array.isArray(requestData.category_ids) ||
        requestData.category_ids.length === 0
      ) {
        return res.status(400).json({
          message: "Kategori ID listesi gerekli",
        });
      }

      const { data: existingCategories, error: fetchError } = await supabase
        .from("menu_categories")
        .select("id")
        .eq("menu_id", req.userMenu!.id)
        .in("id", requestData.category_ids);

      if (fetchError) {
        console.error("Fetch categories error:", fetchError);
        return res.status(500).json({
          message: "Kategoriler getirilemedi",
        });
      }

      if (existingCategories.length !== requestData.category_ids.length) {
        return res.status(403).json({
          message: "Bazı kategoriler size ait değil",
        });
      }

      const updates = [];
      for (let i = 0; i < requestData.category_ids.length; i++) {
        const { error: updateError } = await supabase
          .from("menu_categories")
          .update({ sort_order: i })
          .eq("id", requestData.category_ids[i]);

        if (updateError) {
          console.error("Category reorder error:", updateError);
          return res.status(500).json({
            message: "Kategori sıralaması güncellenemedi",
          });
        }
        updates.push(requestData.category_ids[i]);
      }

      return res.json({
        data: {
          success: true,
        },
        message: "Sıralama başarıyla güncellendi",
      });
    } catch (error: any) {
      console.error("Reorder categories error:", error);
      return res.status(500).json({
        message: "Sıralama güncellenemedi",
      });
    }
  },

  async deleteCategory(
    req: Request<{ id: string }, {}, {}>,
    res: Response<
      ApiResponse<CategoryAPI.Admin.DeleteCategoryResponse> | ApiError
    >
  ) {
    try {
      const { id } = req.params;

      const { data: category, error: categoryError } = await supabase
        .from("menu_categories")
        .select("id, menu_id")
        .eq("id", id)
        .single();

      if (categoryError || !category) {
        return res.status(404).json({
          message: "Kategori bulunamadı",
        });
      }

      const { error: deleteError } = await supabase
        .from("menu_categories")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error("Category deletion error:", deleteError);
        return res.status(500).json({
          message: "Kategori silinemedi",
        });
      }

      res.json({
        data: {
          success: true,
        },
        message: "Kategori başarıyla silindi!",
      });
    } catch (error: any) {
      console.error("Delete category error:", error);
      res.status(500).json({
        message: "Kategori silinemedi",
      });
    }
  },
};
