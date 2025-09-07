import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  Headers,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ZodRequestValidationPipe } from "@/common/pipes/zod-request-validation.pipe";
import { SetResponseMessage } from "@/common";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ApiType } from "@qr-menu/shared-types";

@Controller("admin/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @SetResponseMessage("Kategori başarıyla oluşturuldu")
  async create(
    @Body()
    createCategoryDto: ApiType.Admin.Category.Create.Request.Data
  ): Promise<ApiType.Admin.Category.Create.Response> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<ApiType.Admin.Category.GetAll.Response> {
    return await this.categoryService.findAll();
  }

  @Put("reorder")
  @SetResponseMessage("Kategori sıralaması başarıyla güncellendi")
  async reorder(
    @Body(
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Category.Reorder.Request.Data
      )
    )
    data: ApiType.Admin.Category.Reorder.Request.Data
  ): Promise<void> {
    return this.categoryService.reorder(data);
  }

  @Put(":id")
  @SetResponseMessage("Kategori başarıyla güncellendi")
  async update(
    @Param(
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Category.Update.Request.Params
      )
    )
    params: ApiType.Admin.Category.Update.Request.Params,
    @Body(
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Category.Update.Request.Data
      )
    )
    updateCategoryDto: ApiType.Admin.Category.Update.Request.Data
  ): Promise<ApiType.Admin.Category.Update.Response> {
    return await this.categoryService.update(params, updateCategoryDto);
  }

  @Delete(":id")
  @SetResponseMessage("Kategori başarıyla silindi")
  async remove(
    @Param(
      new ZodRequestValidationPipe(
        ApiValidation.Admin.Category.Delete.Request.Params
      )
    )
    params: ApiType.Admin.Category.Delete.Request.Params
  ): Promise<void> {
    return this.categoryService.remove(params);
  }
}
