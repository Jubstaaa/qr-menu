import { Module } from "@nestjs/common";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";
import { SupabaseService } from "../../../common/services/supabase.service";

@Module({
  controllers: [ItemController],
  providers: [ItemService, SupabaseService],
  exports: [ItemService, SupabaseService],
})
export class ItemModule {}
