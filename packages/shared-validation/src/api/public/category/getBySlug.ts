import { z } from "zod";

// Get Category By Slug Request Schema
export const GetBySlug = {
  Request: {
    Data: z.object({}),
    Params: z.object({
      slug: z.string().min(1, "Slug zorunludur"),
    }),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    image_url: z.string().nullable(),
    sort_order: z.number(),
    items: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
        price: z.number(),
        image_url: z.string().nullable(),
        sort_order: z.number(),
      })
    ),
  }),
};
