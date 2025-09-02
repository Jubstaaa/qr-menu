// admin/index.ts
import { Category as CategoryNamespace } from "./category";
import { Item as ItemNamespace } from "./item";
import { Menu as MenuNamespace } from "./menu";

export namespace Admin {
  export import Category = CategoryNamespace;
  export import Item = ItemNamespace;
  export import Menu = MenuNamespace;
}
