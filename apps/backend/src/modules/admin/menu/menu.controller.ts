import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Put,
  Param,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ZodRequestValidationPipe } from "@/common/pipes/zod-request-validation.pipe";
import { SetResponseMessage } from "@/common";

@Controller("admin/menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async get(): Promise<ApiType.Admin.Menu.Get.Response> {
    return await this.menuService.get();
  }

  @Post()
  async createMenu(
    @Body(
      new ZodRequestValidationPipe(ApiValidation.Admin.Menu.Create.Request.Data)
    )
    createMenuDto: ApiType.Admin.Menu.Create.Request.Data
  ) {
    return await this.menuService.createMenu(createMenuDto);
  }

  @Put()
  @SetResponseMessage("Menü başarıyla güncellendi")
  async update(
    @Body(
      new ZodRequestValidationPipe(ApiValidation.Admin.Menu.Update.Request.Data)
    )
    data: ApiType.Admin.Menu.Update.Request.Data
  ) {
    return await this.menuService.update(data);
  }
}
