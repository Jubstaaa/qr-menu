import { Module } from "@nestjs/common";
import { ItemModule } from "./item/item.module";
import { MenuModule } from "./menu/menu.module";
import { CategoryModule } from "./category/category.module";
@Module({
  imports: [CategoryModule, ItemModule, MenuModule],
})
export class PublicModule {}
