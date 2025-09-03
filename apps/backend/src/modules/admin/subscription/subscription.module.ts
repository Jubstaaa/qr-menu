import { Module } from "@nestjs/common";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import { SupabaseService } from "../../../common/services/supabase.service";

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SupabaseService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
