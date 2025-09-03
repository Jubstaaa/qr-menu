import { GetBySlug as GetBySlugNamespace } from "./getBySlug";
import { Get as GetNamespace } from "./get";
import { GetItemsByCategory as GetItemsByCategoryNamespace } from "./getItemsByCategory";

export namespace Category {
  export import GetBySlug = GetBySlugNamespace;
  export import Get = GetNamespace;
  export import GetItemsByCategory = GetItemsByCategoryNamespace;
}
