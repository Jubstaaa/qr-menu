import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { SupabaseService } from "../../../common/services/supabase.service";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, SupabaseService],
  exports: [CategoryService],
})
export class CategoryModule {}
