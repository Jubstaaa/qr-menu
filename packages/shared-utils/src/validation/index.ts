import { admin } from "./admin";
import { publicModule } from "./public";
import { common } from "./common";
// Export all schemas

// Create apiValidation object
export const validationUtils = {
  admin,
  publicModule,
  common,
};
