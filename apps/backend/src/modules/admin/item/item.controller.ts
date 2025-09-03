import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { TransformInterceptor } from "../../../common/interceptors/transform.interceptor";
import { AuthGuard } from "../../../common/guards/auth.guard";
import { ZodValidationPipe } from "../../../common/pipes/zod-validation.pipe";
import { ZodResponseValidationPipe } from "../../../common/pipes/zod-response-validation.pipe";
import { SetResponseMessage } from "../../../common";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ApiType } from "@qr-menu/shared-types";

@Controller("admin/items")
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @SetResponseMessage("Ürün başarıyla oluşturuldu")
  async create(
    @Body(new ZodValidationPipe(ApiValidation.Admin.Item.Create.Request.Data))
    data: ApiType.Admin.Item.Create.Request.Data
  ): Promise<ApiType.Admin.Item.Create.Response> {
    const result = await this.itemService.create(data);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.Create.Response
    ).transform(result);
  }

  @Get()
  @SetResponseMessage("Ürünler başarıyla getirildi")
  async findAll(): Promise<ApiType.Admin.Item.GetAll.Response> {
    const result = await this.itemService.findAll();
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.GetAll.Response
    ).transform(result);
  }

  @Get(":id")
  @SetResponseMessage("Ürün başarıyla getirildi")
  async findOne(
    @Param(
      "id",
      new ZodValidationPipe(ApiValidation.Admin.Item.GetById.Request.Params)
    )
    params: ApiType.Admin.Item.GetById.Request.Params
  ): Promise<ApiType.Admin.Item.GetById.Response> {
    const result = await this.itemService.findOne(params);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.GetById.Response
    ).transform(result);
  }

  @Put(":id")
  @SetResponseMessage("Ürün başarıyla güncellendi")
  async update(
    @Param(
      "id",
      new ZodValidationPipe(ApiValidation.Admin.Item.Update.Request.Params)
    )
    params: ApiType.Admin.Item.Update.Request.Params,
    @Body(new ZodValidationPipe(ApiValidation.Admin.Item.Update.Request.Data))
    updateItemDto: ApiType.Admin.Item.Update.Request.Data
  ): Promise<ApiType.Admin.Item.Update.Response> {
    const result = await this.itemService.update(params, updateItemDto);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Item.Update.Response
    ).transform(result);
  }

  @Delete(":id")
  @SetResponseMessage("Ürün başarıyla silindi")
  async remove(
    @Param(
      "id",
      new ZodValidationPipe(ApiValidation.Admin.Item.Delete.Request.Params)
    )
    params: ApiType.Admin.Item.Delete.Request.Params
  ): Promise<void> {
    return this.itemService.remove(params);
  }
}
