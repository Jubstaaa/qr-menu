import { Create } from "./create";
import { Update } from "./update";
import { Delete } from "./delete";
import { Reorder } from "./reorder";
import { GetById } from "./getById";
import { GetAll } from "./getAll";
// Export all schemas

// Create apiValidation object
export const Category = {
  Create,
  Update,
  Delete,
  Reorder,
  GetById,
  GetAll,
};
