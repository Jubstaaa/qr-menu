import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { SupabaseService } from "@/common/services/supabase.service";

@Module({
  controllers: [MenuController],
  providers: [MenuService, SupabaseService],
  exports: [MenuService, SupabaseService],
})
export class MenuModule {}
