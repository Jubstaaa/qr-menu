export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface AuthUserDto {
  email?: string;
}

export interface AuthMenuDto {
  subdomain?: string;
}

export interface AuthResponseDto {
  user: AuthUserDto;
  menu?: AuthMenuDto;
}
