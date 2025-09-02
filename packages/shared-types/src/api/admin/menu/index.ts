import { Create as CreateNamespace } from "./create";
import { Update as UpdateNamespace } from "./update";
import { GetByUser as GetByUserNamespace } from "./getByUser";

export namespace Menu {
  export import Create = CreateNamespace;
  export import Update = UpdateNamespace;
  export import GetByUser = GetByUserNamespace;
}
