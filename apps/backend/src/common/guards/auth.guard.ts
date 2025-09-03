import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { SupabaseService } from "../services/supabase.service";
import { getCookieConfig } from "@qr-menu/shared-config";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
  userMenu?: {
    id: string;
    user_id: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.cookies?.auth_token;

    if (!token) {
      throw new UnauthorizedException("Authorization token gerekli");
    }

    try {
      const { user, error } = await this.supabaseService.getUser(token);

      if (error || !user) {
        request.res?.clearCookie("auth_token", getCookieConfig());

        throw new UnauthorizedException("Geçersiz token");
      }

      // Get user's menu
      const { menu } = await this.supabaseService.getMenuByUserId(user.id);

      request.user = {
        id: user.id,
        email: user.email || "",
      };

      if (menu) {
        request.userMenu = {
          id: menu.id,
          user_id: menu.user_id,
        };
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error("Auth guard error:", error);
      throw new UnauthorizedException("Kimlik doğrulama hatası");
    }
  }
}
