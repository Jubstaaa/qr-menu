import { z } from "zod";

// Get Item By ID Request Schema
export const GetBySubdomain = {
  Request: {
    Data: z.object({}),
    Params: z.object({
      subdomain: z.string().uuid("Geçerli subdomain ID gerekli"),
    }),
  },
  Response: z.object({
    id: z.string(),
    subdomain: z.string(),
    restaurant_name: z.string(),
    description: z.string().nullable(),
    restaurant_description: z.string().nullable(),
    restaurant_address: z.string().nullable(),
    restaurant_phone: z.string().nullable(),
    restaurant_email: z.string().nullable(),
    is_active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
};
