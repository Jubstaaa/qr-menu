import { Create as CreateNamespace } from "./create";
import { Update as UpdateNamespace } from "./update";
import { Get as GetNamespace } from "./get";

export namespace Menu {
  export import Create = CreateNamespace;
  export import Update = UpdateNamespace;
  export import Get = GetNamespace;
}
