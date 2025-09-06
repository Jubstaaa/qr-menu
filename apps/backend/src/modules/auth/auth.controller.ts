import { Controller, Post, Body, UseInterceptors, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { ZodResponseValidationPipe } from "@/common/pipes/zod-response-validation.pipe";
import { SetResponseMessage } from "@/common";
import { ApiValidation } from "@qr-menu/shared-validation";
import { ApiType } from "@qr-menu/shared-types";
import { Response } from "express";
import { getCookieConfig } from "@qr-menu/shared-config";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @SetResponseMessage("Giriş başarılı")
  async login(
    @Body(new ZodValidationPipe(ApiValidation.Common.Auth.Login.Request.Data))
    loginDto: ApiType.Common.Auth.Login.Request.Data,
    @Res({ passthrough: true }) res: Response
  ): Promise<ApiType.Common.Auth.Login.Response> {
    const result = await this.authService.login(loginDto);
    res.cookie(
      "auth_token",
      result.session.access_token,
      getCookieConfig(result.session.expires_in)
    );

    return new ZodResponseValidationPipe(
      ApiValidation.Common.Auth.Login.Response
    ).transform(result);
  }

  @Post("register")
  @SetResponseMessage("Kayıt başarılı")
  async register(
    @Body(
      new ZodValidationPipe(ApiValidation.Common.Auth.Register.Request.Data)
    )
    registerDto: ApiType.Common.Auth.Register.Request.Data
  ): Promise<ApiType.Common.Auth.Register.Response> {
    const result = await this.authService.register(registerDto);
    return new ZodResponseValidationPipe(
      ApiValidation.Common.Auth.Register.Response
    ).transform(result);
  }

  @Post("logout")
  @SetResponseMessage("Çıkış başarılı")
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    this.authService.logout();

    res.clearCookie("auth_token", getCookieConfig());
  }

  @Post("checkAuth")
  async checkAuth(): Promise<void> {
    const result = await this.authService.checkAuth();
    return new ZodResponseValidationPipe(
      ApiValidation.Common.Auth.CheckAuth.Response
    ).transform(result);
  }
}
