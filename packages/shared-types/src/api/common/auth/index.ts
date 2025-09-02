import { CheckAuth as CheckAuthNamespace } from "./checkAuth";
import { Login as LoginNamespace } from "./login";
import { Register as RegisterNamespace } from "./register";
import { Logout as LogoutNamespace } from "./logout";

export namespace Auth {
  export import CheckAuth = CheckAuthNamespace;
  export import Login = LoginNamespace;
  export import Register = RegisterNamespace;
  export import Logout = LogoutNamespace;
}
