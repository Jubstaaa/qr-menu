import { Injectable, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SupabaseService } from "@/common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
import { ApiValidation } from "@qr-menu/shared-validation";

@Injectable()
export class MenuService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async get(): Promise<ApiType.Admin.Menu.Get.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: menu, error } = await supabase
      .from("menus")
      .select("*")
      .single();

    if (error) {
      throw new Error("Menü getirilirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Menu.Get.Response
    ).transform(menu);
  }

  async createMenu(createMenuDto: ApiType.Admin.Menu.Create.Request.Data) {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: menu, error } = await supabase
      .from("menus")
      .insert({
        restaurant_name: createMenuDto.restaurant_name,
        subdomain: createMenuDto.subdomain,
        user_id: null,
      })
      .select()
      .single();

    if (error) {
      throw new Error("Menü oluşturulurken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Menu.Create.Response
    ).transform(menu);
  }

  async update(
    data: ApiType.Admin.Menu.Update.Request.Data
  ): Promise<ApiType.Admin.Menu.Update.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const {
      data: { id },
      error: errorId,
    } = await supabase.from("menus").select("id").single();
    if (errorId) {
      throw new Error("Menü bulunamadı");
    }

    const { data: menu, error } = await supabase
      .from("menus")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error("Menü güncellenirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Menu.Update.Response
    ).transform(menu);
  }
}
