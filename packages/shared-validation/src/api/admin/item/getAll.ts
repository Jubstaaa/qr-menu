import { SpiceLevel } from "@/enums";
import { z } from "zod";

export const GetAll = {
  Request: {
    Data: z.object({}),
    Params: z.object({}),
  },
  Response: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      image_url: z.string().nullable(),
      category_id: z.string(),
      is_available: z.boolean().nullable(),
      is_popular: z.boolean().nullable(),
      is_chef_special: z.boolean().nullable(),
      spice_level: z.enum(SpiceLevel).nullable(),
      preparation_time: z.number().nullable(),
      allergens: z.array(z.string()).nullable(),
      sort_order: z.number().nullable(),
      created_at: z.string().nullable(),
      updated_at: z.string().nullable(),
      price: z.number().nullable(),
      nutrition_info: z.record(z.string(), z.string()).nullable(),
      is_active: z.boolean(),
    })
  ),
};
