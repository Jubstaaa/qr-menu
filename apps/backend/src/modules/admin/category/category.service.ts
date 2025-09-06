import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SupabaseService } from "@/common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { AuthenticatedRequest } from "@/common/guards/auth.guard";

@Injectable()
export class CategoryService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: AuthenticatedRequest
  ) {}

  async create(
    data: ApiType.Admin.Category.Create.Request.Data
  ): Promise<ApiType.Admin.Category.Create.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: category, error } = await supabase
      .from("menu_categories")
      .insert({
        ...data,
        menu_id: this.request.userMenu.id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Kategori oluşturulurken hata: ${error.message}`);
    }

    return category;
  }

  async findAll(): Promise<ApiType.Admin.Category.GetAll.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

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
      .eq("menu_id", this.request.userMenu.id)
      .order("sort_order");

    if (error) {
      throw new Error(`Kategoriler getirilirken hata: ${error.message}`);
    }

    return categories;
  }

  async findOne(id: string): Promise<ApiType.Admin.Category.GetById.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: category, error } = await supabase
      .from("menu_categories")
      .select("*")
      .eq("id", id)
      .eq("menu_id", this.request.userMenu.id)
      .single();

    if (error || !category) {
      throw new NotFoundException(`ID ${id} ile kategori bulunamadı`);
    }

    return category;
  }

  async update(
    params: ApiType.Admin.Category.Update.Request.Params,
    data: ApiType.Admin.Category.Update.Request.Data
  ): Promise<ApiType.Admin.Category.Update.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: category, error } = await supabase
      .from("menu_categories")
      .update(data)
      .eq("id", params.id)
      .eq("menu_id", this.request.userMenu.id)
      .select()
      .single();

    if (error || !category) {
      throw new NotFoundException(`ID ${params.id} ile kategori bulunamadı`);
    }

    return category;
  }

  async remove(
    params: ApiType.Admin.Category.Delete.Request.Params
  ): Promise<void> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", params.id)
      .eq("menu_id", this.request.userMenu.id);

    if (error) {
      throw new Error("Kategori silinirken hata");
    }
  }
}
