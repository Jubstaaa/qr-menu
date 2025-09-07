import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SupabaseService } from "@/common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
import { ApiValidation } from "@qr-menu/shared-validation";

@Injectable()
export class MenuService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async find(
    headers: ApiType.Public.Menu.Get.Request.Headers
  ): Promise<ApiType.Public.Menu.Get.Response> {
    const supabase = this.supabaseService.getClient();

    const { data: menu, error } = await supabase
      .from("menus")
      .select(
        `
        *
      `
      )
      .eq("subdomain", headers.subdomain)
      .eq("is_active", true)
      .single();

    if (error || !menu) {
      throw new NotFoundException(
        `Subdomain ${headers.subdomain} ile menü bulunamadı`
      );
    }

    return new ZodResponseValidationPipe(
      ApiValidation.Public.Menu.Get.Response
    ).transform(menu);
  }
}
