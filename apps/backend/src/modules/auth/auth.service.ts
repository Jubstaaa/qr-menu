import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { SupabaseService } from "../../common/services/supabase.service";
import { ApiType } from "@qr-menu/shared-types";
import { Database } from "@qr-menu/shared-types";

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async login(
    loginDto: ApiType.Common.Auth.Login.Request.Data
  ): Promise<ApiType.Common.Auth.Login.Response> {
    const { email, password } = loginDto;

    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      throw new UnauthorizedException("Geçersiz email veya şifre");
    }

    const { menu } = await this.supabaseService.getMenuByUserId(data.user.id);

    return {
      session: {
        access_token: data.session.access_token,
        expires_in: data.session.expires_in,
      },
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      menu: menu
        ? {
            id: menu.id,
            restaurant_name: menu.restaurant_name,
            subdomain: menu.subdomain,
          }
        : undefined,
    };
  }

  async register(
    registerDto: ApiType.Common.Auth.Register.Request.Data
  ): Promise<ApiType.Common.Auth.Register.Response> {
    const { email, password } = registerDto;

    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      throw new UnauthorizedException("Kayıt işlemi başarısız");
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  }

  async logout(): Promise<void> {
    const supabase = this.supabaseService.getClient();
    await supabase.auth.signOut();
  }

  async checkAuth(): Promise<ApiType.Common.Auth.CheckAuth.Response> {
    const token = this.request.cookies?.auth_token;

    if (!token) {
      throw new UnauthorizedException("Authorization token gerekli");
    }

    const { user, error } = await this.supabaseService.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException("Geçersiz token");
    }

    const { menu } = await this.supabaseService.getMenuByUserId(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      menu: menu || null,
    };
  }
}
