import { Create as CreateNamespace } from "./create";
import { Update as UpdateNamespace } from "./update";
import { Delete as DeleteNamespace } from "./delete";
import { Reorder as ReorderNamespace } from "./reorder";
import { GetAll as GetAllNamespace } from "./getAll";
import { GetById as GetByIdNamespace } from "./getById";

export namespace Item {
  export import Create = CreateNamespace;
  export import Update = UpdateNamespace;
  export import Delete = DeleteNamespace;
  export import Reorder = ReorderNamespace;
  export import GetAll = GetAllNamespace;
  export import GetById = GetByIdNamespace;
}
