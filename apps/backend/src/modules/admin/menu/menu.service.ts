import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SupabaseService } from "../../../common/services/supabase.service";
import { AuthenticatedRequest } from "../../../common/guards/auth.guard";
import { ApiType } from "@qr-menu/shared-types";

@Injectable()
export class MenuService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async get(): Promise<ApiType.Admin.Menu.Get.Response> {
    const authenticatedRequest = this.request as AuthenticatedRequest;
    const userId = authenticatedRequest.user?.id;

    if (!userId) {
      throw new Error("Kullanıcı kimliği bulunamadı");
    }

    const supabase = this.supabaseService.getClient();
    const { data: menu, error } = await supabase
      .from("menus")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !menu) {
      throw new Error("Menü getirilemedi");
    }

    return menu;
  }

  async createMenu(createMenuDto: any) {
    const authenticatedRequest = this.request as AuthenticatedRequest;
    const userId = authenticatedRequest.user?.id;

    if (!userId) {
      throw new Error("Kullanıcı kimliği bulunamadı");
    }

    const supabase = this.supabaseService.getClient();
    // Yeni menü oluştur
    const { data: newMenu, error } = await supabase
      .from("menus")
      .insert({
        user_id: userId,
        restaurant_name: createMenuDto.name,
        subdomain: createMenuDto.subdomain,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      throw new Error("Menü oluşturulamadı");
    }

    return {
      id: newMenu.id,
      name: newMenu.restaurant_name,
      subdomain: newMenu.subdomain,
      categories: [],
      items: [],
    };
  }

  async update(
    data: ApiType.Admin.Menu.Update.Request.Data
  ): Promise<ApiType.Admin.Menu.Update.Response> {
    const supabase = this.supabaseService.getClient();

    const authenticatedRequest = this.request as AuthenticatedRequest;
    const userId = authenticatedRequest.user?.id;

    if (!userId) {
      throw new NotFoundException("Kullanıcı bulunamadı");
    }

    const { data: menu, error } = await supabase
      .from("menus")
      .update(data)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error("Menü güncellenemedi");
    }

    return menu;
  }
}
