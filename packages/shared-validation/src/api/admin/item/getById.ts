import { z } from "zod";
import { SpiceLevel } from "@/enums";

// Get Item By ID Request Schema
export const GetById = {
  Request: {
    Params: z.object({
      id: z.string().uuid("Geçerli ürün ID gerekli"),
    }),
    Data: z.object({}),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    category_id: z.string(),
    image_url: z.string().nullable(),
    is_popular: z.boolean().nullable(),
    is_chef_special: z.boolean().nullable(),
    spice_level: z.enum(SpiceLevel).nullable(),
    sort_order: z.number().nullable(),
    is_available: z.boolean().nullable(),
    preparation_time: z.number().nullable(),
    allergens: z.array(z.string()).nullable(),
    nutrition_info: z.record(z.string(), z.string()).nullable(),
    is_active: z.boolean(),
  }),
};
