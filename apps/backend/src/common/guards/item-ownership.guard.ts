import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '@/common/services/supabase.service';
import { AuthenticatedRequest } from './auth.guard';

@Injectable()
export class ItemOwnershipGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const { id } = request.params;
    const userMenuId = request.userMenu?.id;

    if (!userMenuId) {
      throw new ForbiddenException('Kimlik doğrulama gerekli');
    }

    try {
      const { item, error } = await this.supabaseService.checkItemOwnership(id, userMenuId);

      if (error || !item) {
        throw new ForbiddenException('Bu ürünü düzenleme yetkiniz yok');
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      console.error('Item ownership guard error:', error);
      throw new ForbiddenException('Yetki kontrolü hatası');
    }
  }
}
