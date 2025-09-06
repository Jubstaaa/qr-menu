import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { ItemModule } from "./item/item.module";
import { MenuModule } from "./menu/menu.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { SupabaseService } from "@/common/services/supabase.service";

@Module({
  imports: [CategoryModule, ItemModule, MenuModule, SubscriptionModule],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class AdminModule {}
