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
  Headers,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AuthGuard } from "@/common/guards/auth.guard";
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { SetResponseMessage } from "@/common";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ApiType } from "@qr-menu/shared-types";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";

@Controller("admin/categories")
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @SetResponseMessage("Kategori başarıyla oluşturuldu")
  async create(
    @Body(
      new ZodValidationPipe(ApiValidation.Admin.Category.Create.Request.Data)
    )
    createCategoryDto: ApiType.Admin.Category.Create.Request.Data
  ): Promise<ApiType.Admin.Category.Create.Response> {
    const result = await this.categoryService.create(createCategoryDto);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Category.Create.Response
    ).transform(result);
  }

  @Get()
  async findAll(): Promise<ApiType.Admin.Category.GetAll.Response> {
    const result = await this.categoryService.findAll();
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Category.GetAll.Response
    ).transform(result);
  }

  @Get(":id")
  async findOne(
    @Param(
      "id",
      new ZodValidationPipe(ApiValidation.Admin.Category.GetById.Request.Params)
    )
    id: string
  ): Promise<ApiType.Admin.Category.GetById.Response> {
    const result = await this.categoryService.findOne(id);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Category.GetById.Response
    ).transform(result);
  }

  @Put(":id")
  @SetResponseMessage("Kategori başarıyla güncellendi")
  async update(
    @Param(
      "id",
      new ZodValidationPipe(ApiValidation.Admin.Category.Update.Request.Params)
    )
    params: ApiType.Admin.Category.Update.Request.Params,
    @Body(
      new ZodValidationPipe(ApiValidation.Admin.Category.Update.Request.Data)
    )
    updateCategoryDto: ApiType.Admin.Category.Update.Request.Data
  ): Promise<ApiType.Admin.Category.Update.Response> {
    const result = await this.categoryService.update(params, updateCategoryDto);
    return new ZodResponseValidationPipe(
      ApiValidation.Admin.Category.Update.Response
    ).transform(result);
  }

  @Delete(":id")
  @SetResponseMessage("Kategori başarıyla silindi")
  async remove(
    @Param(
      "id",
      new ZodValidationPipe(ApiValidation.Admin.Category.Delete.Request.Params)
    )
    params: ApiType.Admin.Category.Delete.Request.Params
  ): Promise<void> {
    return this.categoryService.remove(params);
  }
}
