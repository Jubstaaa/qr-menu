import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SupabaseService } from "@/common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { AuthenticatedRequest } from "@/common/guards/auth.guard";

@Injectable()
export class ItemService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: AuthenticatedRequest
  ) {}

  async create(
    data: ApiType.Admin.Item.Create.Request.Data
  ): Promise<ApiType.Admin.Item.Create.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: item, error } = await supabase
      .from("menu_items")
      .insert({
        ...data,
        menu_id: this.request.userMenu.id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Ürün oluşturulurken hata: ${error.message}`);
    }

    return this.mapDbItemToApiFull(item);
  }

  async findAll(): Promise<ApiType.Admin.Item.GetAll.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: items, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order");

    if (error) {
      throw new Error(`Ürünler getirilirken hata: ${error.message}`);
    }

    return (items ?? []).map((it) => this.mapDbItemToApiList(it));
  }

  async findOne(
    params: ApiType.Admin.Item.GetById.Request.Params
  ): Promise<ApiType.Admin.Item.GetById.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: item, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !item) {
      throw new NotFoundException(`ID ${params.id} ile ürün bulunamadı`);
    }

    return this.mapDbItemToApiFull(item);
  }

  async update(
    params: ApiType.Admin.Item.Update.Request.Params,
    data: ApiType.Admin.Item.Update.Request.Data
  ): Promise<ApiType.Admin.Item.Update.Response> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { data: item, error } = await supabase
      .from("menu_items")
      .update(data)
      .eq("id", params.id)
      .select()
      .single();

    if (error || !item) {
      throw new NotFoundException(`ID ${params.id} ile ürün bulunamadı`);
    }

    return this.mapDbItemToApiFull(item);
  }

  async remove(
    params: ApiType.Admin.Item.Delete.Request.Params
  ): Promise<void> {
    const supabase = this.supabaseService.getClient();

    if (!this.request.userMenu) {
      throw new NotFoundException("Menü bulunamadı");
    }

    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", params.id);

    if (error) {
      throw new Error("Ürün silinirken hata");
    }
  }

  // UNDER CONSTRUCTION
  // UNDER CONSTRUCTION
  // UNDER CONSTRUCTION
  // UNDER CONSTRUCTION
  // UNDER CONSTRUCTION

  // Map to full item response shape (create/getById/update)
  private mapDbItemToApiFull(
    item: DbItem
  ): ApiType.Admin.Item.GetById.Response {
    return {
      id: String(item.id),
      name: String(item.name),
      description: item.description ?? null,
      price: Number(item.price),
      category_id: String(item.category_id),
      image_url: item.image_url ?? null,
      is_popular: item.is_popular ?? null,
      is_chef_special: item.is_chef_special ?? null,
      spice_level: item.spice_level ?? null,
      sort_order: item.sort_order ?? null,
      is_available: item.is_available ?? null,
      preparation_time: item.preparation_time ?? null,
      allergens: normalizeAllergens(item.allergens),
      nutrition_info: item.nutrition_info ?? null,
      is_active: Boolean(item.is_active),
    };
  }

  // Map to list response shape (getAll)
  private mapDbItemToApiList(
    item: DbItem
  ): ApiType.Admin.Item.GetAll.Response[number] {
    return {
      id: String(item.id),
      name: String(item.name),
      description: item.description ?? null,
      image_url: item.image_url ?? null,
      category_id: String(item.category_id),
      sort_order: item.sort_order ?? null,
      is_available: item.is_available ?? null,
    };
  }
}

type DbItem = Record<string, any>;

function normalizeAllergens(value: unknown): string[] | null {
  if (value == null) return null;
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string") return [value];
  // Unsupported shape -> return null to satisfy schema
  return null;
}
// UNDER CONSTRUCTION
// UNDER CONSTRUCTION
// UNDER CONSTRUCTION
// UNDER CONSTRUCTION
