import { Injectable, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SupabaseService } from "@/common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
import { ApiValidation } from "@qr-menu/shared-validation";

@Injectable()
export class CategoryService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async create(
    data: ApiType.Admin.Category.Create.Request.Data
  ): Promise<ApiType.Admin.Category.Create.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: category, error } = await supabase
      .from("menu_categories")
      .insert({
        ...data,
        menu_id: null,
      })
      .select()
      .single();

    if (error) {
      throw new Error("Kategori oluşturulurken bir hata oluştu");
    }

    return category;
  }

  async findAll(): Promise<ApiType.Admin.Category.GetAll.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: categories, error } = await supabase
      .from("menu_categories")
      .select(
        `
        *,
        menu_items (
          *
        )
      `
      )
      .order("sort_order");

    if (error) {
      throw new Error("Kategoriler getirilirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Category.GetAll.Response
    ).transform(categories);
  }

  async update(
    params: ApiType.Admin.Category.Update.Request.Params,
    data: ApiType.Admin.Category.Update.Request.Data
  ): Promise<ApiType.Admin.Category.Update.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: category, error } = await supabase
      .from("menu_categories")
      .update(data)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      throw new Error("Kategori güncellenirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Category.Update.Response
    ).transform(category);
  }

  async remove(
    params: ApiType.Admin.Category.Delete.Request.Params
  ): Promise<void> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", params.id);

    if (error) {
      throw new Error("Kategori silinirken bir hata oluştu");
    }
  }

  async reorder(
    data: ApiType.Admin.Category.Reorder.Request.Data
  ): Promise<void> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    for (const change of data) {
      const { error } = await supabase
        .from("menu_categories")
        .update({ sort_order: change.newSortOrder })
        .eq("id", change.id);

      if (error) {
        throw new Error("Kategori sıralaması güncellenirken bir hata oluştu");
      }
    }
  }
}
