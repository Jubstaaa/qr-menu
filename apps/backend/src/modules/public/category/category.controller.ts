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
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";

@Controller("public/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async get(
    @Headers() headers: ApiType.Public.Category.Get.Request.Headers
  ): Promise<ApiType.Public.Category.Get.Response> {
    const result = await this.categoryService.findAll(headers);
    return new ZodResponseValidationPipe(
      ApiValidation.Public.Category.Get.Response
    ).transform(result);
  }

  @Get(":slug")
  async getBySlug(
    @Param() params: ApiType.Public.Category.GetBySlug.Request.Params,
    @Headers() headers: ApiType.Public.Category.GetBySlug.Request.Headers
  ) {
    const result = await this.categoryService.findBySlug(params, headers);
    return new ZodResponseValidationPipe(
      ApiValidation.Public.Category.GetBySlug.Response
    ).transform(result);
  }

  @Get(":slug/items")
  async getItemsByCategory(
    @Param(
      new ZodValidationPipe(
        ApiValidation.Public.Category.GetItemsByCategory.Request.Params
      )
    )
    params: ApiType.Public.Category.GetItemsByCategory.Request.Params,
    @Headers()
    headers: ApiType.Public.Category.GetItemsByCategory.Request.Headers
  ): Promise<ApiType.Public.Category.GetItemsByCategory.Response> {
    const result = await this.categoryService.findItemsByCategorySlug(
      params,
      headers
    );
    return new ZodResponseValidationPipe(
      ApiValidation.Public.Category.GetItemsByCategory.Response
    ).transform(result);
  }
}
