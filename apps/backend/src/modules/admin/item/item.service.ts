import { Injectable, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SupabaseService } from "@/common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
import { ApiValidation } from "@qr-menu/shared-validation";

@Injectable()
export class ItemService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async create(
    data: ApiType.Admin.Item.Create.Request.Data
  ): Promise<ApiType.Admin.Item.Create.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: item, error } = await supabase
      .from("menu_items")
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error("Ürün oluşturulurken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.Create.Response
    ).transform(item);
  }

  async findAll(): Promise<ApiType.Admin.Item.GetAll.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: items, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order");

    if (error) {
      throw new Error("Ürünler getirilirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.GetAll.Response
    ).transform(items);
  }

  async findOne(
    params: ApiType.Admin.Item.GetById.Request.Params
  ): Promise<ApiType.Admin.Item.GetById.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: item, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      throw new Error("Ürün getirilirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.GetById.Response
    ).transform(item);
  }

  async update(
    params: ApiType.Admin.Item.Update.Request.Params,
    data: ApiType.Admin.Item.Update.Request.Data
  ): Promise<ApiType.Admin.Item.Update.Response> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { data: item, error } = await supabase
      .from("menu_items")
      .update(data)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      throw new Error("Ürün güncellenirken bir hata oluştu");
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.Update.Response
    ).transform(item);
  }

  async remove(
    params: ApiType.Admin.Item.Delete.Request.Params
  ): Promise<void> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", params.id);

    if (error) {
      throw new Error("Ürün silinirken bir hata oluştu");
    }
  }

  async reorder(data: ApiType.Admin.Item.Reorder.Request.Data): Promise<void> {
    const supabase = this.supabaseService.getUserClient(
      this.request.cookies.auth_token
    );

    for (const change of data) {
      const { error } = await supabase
        .from("menu_items")
        .update({ sort_order: change.newSortOrder })
        .eq("id", change.id);

      if (error) {
        throw new Error("Ürün sıralaması güncellenirken bir hata oluştu");
      }
    }
  }
}
