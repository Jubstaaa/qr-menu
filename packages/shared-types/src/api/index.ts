import { Admin as AdminNamespace } from "./admin";
import { Public as PublicNamespace } from "./public";
import { Common as CommonNamespace } from "./common";

export namespace ApiType {
  export import Admin = AdminNamespace;
  export import Public = PublicNamespace;
  export import Common = CommonNamespace;
}

export type ApiResponse<T = any> = {
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  message: string;
  error?: string;
};
