import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiType } from "@qr-menu/shared-types";
import { SupabaseService } from "@/common/services/supabase.service";
import { ca } from "zod/v4/locales/index.cjs";

@Injectable()
export class CategoryService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(
    headers: ApiType.Public.Category.Get.Request.Headers
  ): Promise<ApiType.Public.Category.Get.Response> {
    const supabase = this.supabaseService.getClient();

    const { data: menu, error: menuError } = await supabase
      .from("menus")
      .select("id")
      .eq("subdomain", headers.subdomain)
      .eq("is_active", true)
      .single();

    if (menuError || !menu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .eq("menu_id", menu.id)
      .order("sort_order");

    if (error) {
      throw new Error("Kategoriler getirilirken hata");
    }

    return data;
  }

  async findBySlug(
    params: ApiType.Public.Category.GetBySlug.Request.Params,
    headers: ApiType.Public.Category.GetBySlug.Request.Headers
  ): Promise<ApiType.Public.Category.GetBySlug.Response> {
    const supabase = this.supabaseService.getClient();
    const { data: menu, error: menuError } = await supabase
      .from("menus")
      .select("id")
      .eq("subdomain", headers.subdomain)
      .eq("is_active", true)
      .single();

    if (menuError || !menu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: category, error } = await supabase
      .from("menu_categories")
      .select(
        `
          *,
          menu_items (
            *
          )
        `
      )
      .eq("slug", params.slug)
      .eq("menu_id", menu.id)
      .single();

    if (error || !category) {
      throw new NotFoundException(`Kategori bulunamadı`);
    }

    return category;
  }

  async findItemsByCategorySlug(
    params: ApiType.Public.Category.GetItemsByCategory.Request.Params,
    headers: ApiType.Public.Category.GetItemsByCategory.Request.Headers
  ): Promise<ApiType.Public.Category.GetItemsByCategory.Response> {
    const supabase = this.supabaseService.getClient();

    const { data: menu, error: menuError } = await supabase
      .from("menus")
      .select("id")
      .eq("subdomain", headers.subdomain)
      .eq("is_active", true)
      .single();

    if (menuError || !menu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: category, error } = await supabase
      .from("menu_categories")
      .select("id")
      .eq("slug", params.slug)
      .eq("menu_id", menu.id)
      .single();

    if (error || !category) {
      throw new NotFoundException(`Kategori bulunamadı`);
    }

    const { data: items } = await supabase
      .from("menu_items")
      .select("*")
      .eq("category_id", category.id)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error("Ürünler getirilirken hata");
    }

    return items;
  }
}
