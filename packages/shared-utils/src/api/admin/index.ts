// Export all schemas
import * as Category from "./category";
import * as Item from "./item";
import * as Menu from "./menu";
import * as Subscription from "./subscription";

// Create apiValidation object
export const Admin = {
  Category: Category,
  Item: Item,
  Menu: Menu,
  Subscription: Subscription,
};
