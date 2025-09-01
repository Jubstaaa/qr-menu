import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { MenuAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../utils/upload";
import { menuValidation } from "@qr-menu/shared-utils";

export const menuController = {
  async createMenu(
    req: Request<{}, {}, MenuAPI.Admin.CreateMenuRequest>,
    res: Response<ApiResponse<MenuAPI.Admin.CreateMenuResponse> | ApiError>
  ) {
    try {
      const { name, subdomain } = req.body;

      if (!name || !subdomain) {
        return res.status(400).json({
          message: "Restoran bilgileri ve subdomain gerekli",
        });
      }

      if (!req.user) {
        return res.status(401).json({
          message: "Kullanıcı bilgisi bulunamadı",
        });
      }

      const { data: existingMenu, error: checkError } = await supabase
        .from("menus")
        .select("id")
        .eq("subdomain", subdomain)
        .single();

      if (existingMenu) {
        return res.status(400).json({
          message: "Bu subdomain zaten kullanılıyor",
        });
      }

      const { data: menu, error: createError } = await supabase
        .from("menus")
        .insert({
          user_id: req.user.id,
          restaurant_name: name,
          subdomain: subdomain,
          is_active: true,
        })
        .select()
        .single();

      if (createError) {
        console.error("Menu creation error:", createError);
        return res.status(500).json({
          message: "Menü oluşturulamadı",
        });
      }

      res.status(201).json({
        data: menu,
        message: "Menü başarıyla oluşturuldu!",
      });
    } catch (error: any) {
      console.error("Create menu error:", error);
      res.status(500).json({
        message: "Menü oluşturulamadı",
      });
    }
  },

  async getMenuBySubdomain(
    req: Request<{ subdomain: string }>,
    res: Response<
      ApiResponse<MenuAPI.Admin.GetMenuBySubdomainResponse> | ApiError
    >
  ) {
    try {
      const { subdomain } = req.params;

      const { data: menu, error } = await supabase
        .from("menus")
        .select(
          `
          id,
          subdomain,
          restaurant_name,
          restaurant_description,
          restaurant_address,
          restaurant_phone,
          restaurant_email,
          is_active,
          created_at,
          updated_at
        `
        )
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Get menu error:", error);
        return res.status(500).json({
          message: "Menü getirilemedi",
        });
      }

      if (!menu) {
        return res.status(404).json({
          message: "Menü bulunamadı",
        });
      }

      res.json({
        data: menu,
        message: "Menü başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get menu error:", error);
      res.status(500).json({
        message: "Menü getirilemedi",
      });
    }
  },

  async updateMenu(
    req: Request<{ id: string }, {}, MenuAPI.Admin.UpdateMenuRequest>,
    res: Response<ApiResponse<MenuAPI.Admin.UpdateMenuResponse> | ApiError>
  ) {
    try {
      const { id } = req.params;
      const requestData: MenuAPI.Admin.UpdateMenuRequest = req.body;

      let updateData;
      try {
        updateData = menuValidation.validateUpdateMenuRequest(requestData);
      } catch (validationError: any) {
        return res.status(400).json({
          message: "Geçersiz veri formatı",
        });
      }

      const { data: existingMenu, error: menuError } = await supabase
        .from("menus")
        .select("id, logo_url")
        .eq("id", id)
        .single();

      if (menuError || !existingMenu) {
        return res.status(404).json({
          message: "Menü bulunamadı",
        });
      }

      let finalLogoUrl: string | null = updateData.logo_url as any;

      const hasNewFile = (req as any).file;

      if (hasNewFile) {
        try {
          const uploadedUrl = await uploadImage({
            req,
            folder: "logos",
            menuId: id,
          });

          if (uploadedUrl) {
            finalLogoUrl = uploadedUrl;

            if (existingMenu.logo_url) {
              await deleteImage({
                imageUrl: existingMenu.logo_url,
                folder: "logos",
                menuId: id,
              });
            }
          }
        } catch (uploadError: any) {
          console.error("Menu logo upload error:", uploadError);
        }
      } else if (updateData.logo_url === null) {
        finalLogoUrl = null;

        if (existingMenu.logo_url) {
          await deleteImage({
            imageUrl: existingMenu.logo_url,
            folder: "logos",
            menuId: id,
          });
        }
      }

      const { data: updatedMenu, error: updateError } = await supabase
        .from("menus")
        .update({
          ...updateData,
          logo_url: finalLogoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        return res.status(500).json({
          message: "Menü güncellenemedi",
        });
      }

      res.json({
        data: updatedMenu,
        message: "Menü başarıyla güncellendi!",
      });
    } catch (error: any) {
      console.error("Update menu error:", error);
      res.status(500).json({
        message: "Menü güncellenemedi",
      });
    }
  },

  async getMenusByUser(
    req: Request,
    res: Response<ApiResponse<MenuAPI.Admin.GetMenusByUserResponse> | ApiError>
  ) {
    try {
      const { data: menu, error } = await supabase
        .from("menus")
        .select(
          `
          id,
          restaurant_name,
          restaurant_description,
          restaurant_address,
          restaurant_phone,
          restaurant_email,
          subdomain,
          is_active,
          created_at,
          updated_at
        `
        )
        .eq("id", req.userMenu!.id)
        .single();

      if (error) {
        console.error("Get user menus error:", error);
        return res.status(500).json({
          message: "Menüler getirilemedi",
        });
      }

      res.json({
        data: menu,
        message: "Menü başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get user menus error:", error);
      res.status(500).json({
        message: "Menüler getirilemedi",
      });
    }
  },
};
