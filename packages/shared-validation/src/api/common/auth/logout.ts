import { z } from "zod";

// Check Auth Request Schema
export const Logout = {
  Request: {
    Data: z.object({}),
    Params: z.object({}),
  },
  Response: z.object({}),
};
