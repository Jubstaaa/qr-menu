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
      menu_id: z.string(),
      slug: z.string().nullable().optional(),
      sort_order: z.number().nullable().optional(),
      is_active: z.boolean().nullable().optional(),
      created_at: z.string().nullable(),
      updated_at: z.string().nullable(),
      menu_items: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      ),
    })
  ),
};
