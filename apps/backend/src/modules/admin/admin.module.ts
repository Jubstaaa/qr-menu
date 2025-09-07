import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { CategoryModule } from "./category/category.module";
import { ItemModule } from "./item/item.module";
import { MenuModule } from "./menu/menu.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { SupabaseService } from "@/common/services/supabase.service";
import { AuthGuard } from "@/common/guards/auth.guard";

@Module({
  imports: [CategoryModule, ItemModule, MenuModule, SubscriptionModule],
  providers: [
    SupabaseService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [SupabaseService],
})
export class AdminModule {}
