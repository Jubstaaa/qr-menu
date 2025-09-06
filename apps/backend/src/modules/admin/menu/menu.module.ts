import { Module } from "@nestjs/common";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { SupabaseService } from "@/common/services/supabase.service";

@Module({
  controllers: [MenuController],
  providers: [MenuService, SupabaseService],
  exports: [MenuService],
})
export class MenuModule {}
