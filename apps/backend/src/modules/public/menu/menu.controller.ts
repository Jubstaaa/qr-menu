import {
  Controller,
  Get,
  Headers,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
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
    const result = await this.menuService.find(headers);
    return new ZodResponseValidationPipe(
      ApiValidation.Public.Menu.Get.Response
    ).transform(result);
  }
}
