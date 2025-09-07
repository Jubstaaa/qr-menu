import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { SupabaseService } from "../services/supabase.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.auth_token;

    if (!token) {
      throw new UnauthorizedException("Authorization token gerekli");
    }

    const { user, error } = await this.supabaseService.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException("Geçersiz token");
    }

    request.user = user;

    return true;
  }
}
