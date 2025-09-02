import { Menu as MenuNamespace } from "./menu";
import { Category as CategoryNamespace } from "./category";

export namespace Public {
  export import Menu = MenuNamespace;
  export import Category = CategoryNamespace;
}
