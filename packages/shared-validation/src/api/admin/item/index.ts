import { Create } from "./create";
import { Update } from "./update";
import { Delete } from "./delete";
import { GetById } from "./getById";
import { Reorder } from "./reorder";
import { GetAll } from "./getAll";
// Export all schemas

// Create apiValidation object
export const Item = {
  Create,
  Update,
  Delete,
  GetById,
  Reorder,
  GetAll,
};
