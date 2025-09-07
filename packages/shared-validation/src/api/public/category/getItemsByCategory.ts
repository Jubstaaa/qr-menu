import { z } from "zod";
import { SpiceLevel } from "@/enums";

// Get Category By Slug Request Schema
export const GetItemsByCategory = {
  Request: {
    Params: z.object({
      slug: z.string().min(1, "Slug zorunludur"),
    }),
    Headers: z.object({
      subdomain: z.string().min(1, "Subdomain zorunludur"),
    }),
  },
  Response: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      price: z.number(),
      image_url: z.string().nullable(),
      is_available: z.boolean(),
      is_popular: z.boolean(),
      is_chef_special: z.boolean(),
      preparation_time: z.number(),
      spice_level: z.enum(SpiceLevel).nullable(),
    })
  ),
};
