import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import {
  ApiResult,
  CreateMenuDto,
  UpdateMenuDto,
  CreateMenuResponseDto,
  MenuWithCategoriesDto,
  CategoryWithItemsDto,
} from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../utils/upload";
import { validateUpdateRestaurant } from "@qr-menu/shared-validation";

export const menuController = {
  async createMenu(
    req: Request<{}, {}, CreateMenuDto>,
    res: Response<ApiResult<CreateMenuResponseDto>>
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
        message: "Menü başarıyla oluşturuldu!",
        data: {
          subdomain: menu.subdomain,
        },
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
    res: Response<ApiResult<MenuWithCategoriesDto>>
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
          logo_url,
          brand_name,
          menu_categories (
            id,
            name,
            slug,
            description,
            image_url,
            sort_order,
            is_active,
            created_at
          )
        `
        )
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .order("sort_order", {
          ascending: true,
          foreignTable: "menu_categories",
        })
        .single();

      if (error || !menu) {
        return res.status(404).json({
          message: "Menü bulunamadı",
        });
      }

      res.json({
        message: "Menü başarıyla getirildi",
        data: menu as MenuWithCategoriesDto,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Menü getirilemedi",
      });
    }
  },

  async getMenusByUser(req: Request, res: Response) {
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
          logo_url,
          opening_time,
          closing_time,
          wifi_ssid,
          wifi_password,
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
          error: "Menüler getirilemedi",
        });
      }

      res.json({ data: menu || [] });
    } catch (error: any) {
      console.error("Get user menus error:", error);
      res.status(500).json({
        error: "Menüler getirilemedi",
      });
    }
  },

  async getCategoryBySubdomainAndSlug(req: Request, res: Response) {
    try {
      const { subdomain, slug } = req.params as {
        subdomain: string;
        slug: string;
      };

      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, is_active")
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      if (menuError || !menu) {
        return res.status(404).json({ error: "Menü bulunamadı" });
      }

      let { data: category, error: catError } = await supabase
        .from("menu_categories")
        .select(
          `
          id,
          name,
          slug,
          description,
          image_url,
          sort_order,
          is_active,
          created_at,
          menu_items (
           *
          )
        `
        )
        .eq("menu_id", menu.id)
        .eq("is_active", true)
        .eq("slug", slug)
        .order("sort_order", { ascending: true, foreignTable: "menu_items" })
        .single();

      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          slug
        );
      if ((!category || catError) && isUuid) {
        const resp = await supabase
          .from("menu_categories")
          .select(
            `
            id,
            name,
            slug,
            description,
            image_url,
            sort_order,
            is_active,
            created_at,
            menu_items (
              id,
              name,
              description,
              price,
              image_url,
              sort_order,
              is_available
            )
          `
          )
          .eq("menu_id", menu.id)
          .eq("is_active", true)
          .eq("id", slug)
          .order("sort_order", { ascending: true, foreignTable: "menu_items" })
          .single();
        category = resp.data as any;
        catError = resp.error as any;
      }

      if (catError || !category) {
        return res.status(404).json({ error: "Kategori bulunamadı" });
      }

      return res.json({ category });
    } catch (error: any) {
      console.error("Get category by subdomain and slug error:", error);
      return res.status(500).json({ error: "Kategori getirilemedi" });
    }
  },

  async updateMenu(req: Request, res: Response) {
    try {
      let updateData;
      try {
        updateData = validateUpdateRestaurant(req.body);
      } catch (validationError: any) {
        return res.status(400).json({
          error: "Geçersiz veri formatı",
          details: validationError.errors,
        });
      }

      if (!req.userMenu) {
        return res.status(401).json({ error: "Kullanıcı menüsü bulunamadı" });
      }

      let logoUrl = updateData.logo_url;
      if ((req as any).file) {
        try {
          const uploadedLogoUrl = await uploadImage({
            req,
            folder: "logos",
            menuId: req.userMenu.id,
          });

          if (uploadedLogoUrl) {
            logoUrl = uploadedLogoUrl;

            if (updateData.logo_url && updateData.logo_url !== logoUrl) {
              await deleteImage({
                imageUrl: updateData.logo_url,
                folder: "logos",
                menuId: req.userMenu.id,
              });
            }
          }
        } catch (uploadError) {
          console.error("Logo upload error:", uploadError);
          return res.status(500).json({ error: "Logo yüklenemedi" });
        }
      }

      const finalUpdateData = {
        ...updateData,
        logo_url: logoUrl,
        updated_at: new Date().toISOString(),
      };

      const { data: updatedMenu, error: updateError } = await supabase
        .from("menus")
        .update(finalUpdateData)
        .eq("id", req.userMenu.id)
        .select()
        .single();

      if (updateError) {
        console.error("Menu update error:", updateError);
        return res.status(500).json({ error: "Menü güncellenemedi" });
      }

      return res.json({
        message: "Restoran başarıyla güncellendi",
        data: updatedMenu,
      });
    } catch (error: any) {
      console.error("Update menu error:", error);
      return res.status(500).json({ error: "Menü güncellenemedi" });
    }
  },
};
