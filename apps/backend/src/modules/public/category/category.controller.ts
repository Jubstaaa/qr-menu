import {
  Controller,
  Get,
  Headers,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ZodRequestValidationPipe } from "@/common/pipes/zod-request-validation.pipe";

@Controller("public/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async get(
    @Headers() headers: ApiType.Public.Category.Get.Request.Headers
  ): Promise<ApiType.Public.Category.Get.Response> {
    return await this.categoryService.findAll(headers);
  }

  @Get(":slug")
  async getBySlug(
    @Param() params: ApiType.Public.Category.GetBySlug.Request.Params,
    @Headers() headers: ApiType.Public.Category.GetBySlug.Request.Headers
  ) {
    return await this.categoryService.findBySlug(params, headers);
  }

  @Get(":slug/items")
  async getItemsByCategory(
    @Param(
      new ZodRequestValidationPipe(
        ApiValidation.Public.Category.GetItemsByCategory.Request.Params
      )
    )
    params: ApiType.Public.Category.GetItemsByCategory.Request.Params,
    @Headers()
    headers: ApiType.Public.Category.GetItemsByCategory.Request.Headers
  ): Promise<ApiType.Public.Category.GetItemsByCategory.Response> {
    return await this.categoryService.findItemsByCategorySlug(params, headers);
  }
}
