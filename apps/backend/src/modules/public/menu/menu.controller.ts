import {
  Controller,
  Get,
  Headers,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { ZodRequestValidationPipe } from "@/common/pipes/zod-request-validation.pipe";
import { SetResponseMessage } from "@/common";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ApiType } from "@qr-menu/shared-types";

@Controller("public/menus")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get("")
  async get(
    @Headers() headers: ApiType.Public.Menu.Get.Request.Headers
  ): Promise<ApiType.Public.Menu.Get.Response> {
    return await this.menuService.find(headers);
  }
}
