import { Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { ItemService } from "./item.service";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";

@Controller("public/items")
@UseInterceptors(TransformInterceptor)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.itemService.findOne(id);
  }
}
