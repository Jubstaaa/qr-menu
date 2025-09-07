import { z } from "zod";

export const GetAll = {
  Request: {
    Data: z.object({}),
    Params: z.object({}),
  },
  Response: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Kategori adı zorunludur"),
      description: z.string().nullable(),
      image_url: z.string().nullable(),
      menu_id: z.string(),
      slug: z.string().nullable(),
      sort_order: z.number().nullable(),
      is_active: z.boolean().nullable(),
      created_at: z.string().nullable(),
      updated_at: z.string().nullable(),
    })
  ),
};
