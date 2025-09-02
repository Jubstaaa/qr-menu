import { z } from "zod";

// Check Auth Request Schema
export const CheckAuth = {
  Request: {
    Data: z.object({}),
    Params: z.object({}),
  },
  Response: z.object({
    user: z.object({
      id: z.string(),
      email: z.string(),
    }),
    menu: z.object({
      id: z.string(),
      restaurant_name: z.string(),
      subdomain: z.string(),
    }),
  }),
};
