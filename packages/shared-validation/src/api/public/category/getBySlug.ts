import { z } from "zod";

// Get Category By Slug Request Schema
export const GetBySlug = {
  Request: {
    Params: z.object({
      slug: z.string().min(1, "Slug zorunludur"),
    }),
    Headers: z.object({
      subdomain: z.string().min(1, "Subdomain zorunludur"),
    }),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    slug: z.string(),
    image_url: z.string().nullable(),
    menu_items: z.array(
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
      })
    ),
  }),
};
