import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Put,
  Param,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import { AuthGuard } from "../../../common/guards/auth.guard";
import { ApiType } from "@qr-menu/shared-types";
import { ZodResponseValidationPipe } from "../../../common/pipes/zod-response-validation.pipe";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ZodValidationPipe } from "../../../common/pipes/zod-validation.pipe";

@Controller("admin/menu")
@UseGuards(AuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async get(): Promise<ApiType.Admin.Menu.Get.Response> {
    const result = await this.menuService.get();
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Menu.Get.Response
    ).transform(result);
  }

  @Post()
  async createMenu(
    @Body(new ZodValidationPipe(ApiValidation.Admin.Menu.Create.Request.Data))
    createMenuDto: ApiType.Admin.Menu.Create.Request.Data
  ) {
    const result = await this.menuService.createMenu(createMenuDto);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Menu.Create.Response
    ).transform(result);
  }

  @Put()
  async update(
    @Body(new ZodValidationPipe(ApiValidation.Admin.Menu.Update.Request.Data))
    data: ApiType.Admin.Menu.Update.Request.Data
  ) {
    const result = await this.menuService.update(data);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Menu.Update.Response
    ).transform(result);
  }
}
