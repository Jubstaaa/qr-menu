import { z } from "zod";

// Get Category By Slug Request Schema
export const Get = {
  Request: {
    Headers: z.object({
      subdomain: z.string().min(1, "Subdomain zorunludur"),
    }),
  },
  Response: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      slug: z.string(),
      image_url: z.string().nullable(),
      items_count: z.number(),
    })
  ),
};
