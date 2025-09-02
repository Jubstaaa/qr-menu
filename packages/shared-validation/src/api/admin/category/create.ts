import { z } from "zod";

export const Create = {
  Request: {
    Data: z.object({
      name: z.string().min(1, "Kategori adı zorunludur"),
      description: z.string().optional(),
      image_url: z.string().nullable().optional(),
      is_active: z.boolean().optional(),
    }),
    Params: z.object({}),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    image_url: z.string().nullable(),
    menu_id: z.string(),
    slug: z.string().nullable(),
    sort_order: z.number().nullable(),
    is_active: z.boolean().nullable(),
  }),
};
