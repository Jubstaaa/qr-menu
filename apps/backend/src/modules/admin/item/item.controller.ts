import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { ZodRequestValidationPipe } from "@/common/pipes/zod-request-validation.pipe";
import { SetResponseMessage } from "@/common";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ApiType } from "@qr-menu/shared-types";

@Controller("admin/items")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @SetResponseMessage("Ürün başarıyla oluşturuldu")
  async create(
    @Body(
      new ZodRequestValidationPipe(ApiValidation.Admin.Item.Create.Request.Data)
    )
    data: ApiType.Admin.Item.Create.Request.Data
  ): Promise<ApiType.Admin.Item.Create.Response> {
    return await this.itemService.create(data);
  }

  @Get()
  @SetResponseMessage("Ürünler başarıyla getirildi")
  async findAll(): Promise<ApiType.Admin.Item.GetAll.Response> {
    return await this.itemService.findAll();
  }

  @Get(":id")
  @SetResponseMessage("Ürün başarıyla getirildi")
  async findOne(
    @Param(
      "id",
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Item.GetById.Request.Params
      )
    )
    params: ApiType.Admin.Item.GetById.Request.Params
  ): Promise<ApiType.Admin.Item.GetById.Response> {
    return await this.itemService.findOne(params);
  }

  @Put("reorder")
  @SetResponseMessage("Ürün sıralaması başarıyla güncellendi")
  async reorder(
    @Body(
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Item.Reorder.Request.Data
      )
    )
    data: ApiType.Admin.Item.Reorder.Request.Data
  ): Promise<void> {
    return this.itemService.reorder(data);
  }

  @Put(":id")
  @SetResponseMessage("Ürün başarıyla güncellendi")
  async update(
    @Param(
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Item.Update.Request.Params
      )
    )
    params: ApiType.Admin.Item.Update.Request.Params,
    @Body(
      new ZodRequestValidationPipe(ApiValidation.Admin.Item.Update.Request.Data)
    )
    updateItemDto: ApiType.Admin.Item.Update.Request.Data
  ): Promise<ApiType.Admin.Item.Update.Response> {
    return await this.itemService.update(params, updateItemDto);
  }

  @Delete(":id")
  @SetResponseMessage("Ürün başarıyla silindi")
  async remove(
    @Param(
      "id",
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Item.Delete.Request.Params
      )
    )
    params: ApiType.Admin.Item.Delete.Request.Params
  ): Promise<void> {
    return this.itemService.remove(params);
  }
}
