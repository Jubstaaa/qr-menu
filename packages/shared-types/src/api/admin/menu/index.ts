import { Create as CreateNamespace } from "./create";
import { Update as UpdateNamespace } from "./update";

export namespace Menu {
  export import Create = CreateNamespace;
  export import Update = UpdateNamespace;
}
