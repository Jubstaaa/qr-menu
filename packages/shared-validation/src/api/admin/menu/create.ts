import { z } from "zod";

// Create Menu Request Schema
export const Create = {
  Request: {
    Data: z.object({
      name: z.string().min(1, "Restoran adı zorunludur"),
      subdomain: z.string().min(1, "Subdomain zorunludur"),
    }),
    Params: z.object({}),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    subdomain: z.string(),
  }),
};
