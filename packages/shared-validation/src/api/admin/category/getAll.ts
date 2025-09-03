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
          description: z.string().nullable(),
          image_url: z.string().nullable(),
          category_id: z.string(),
          is_available: z.boolean().nullable(),
          is_popular: z.boolean().nullable(),
          is_chef_special: z.boolean().nullable(),
          preparation_time: z.number().nullable(),
          sort_order: z.number().nullable(),
          created_at: z.string().nullable(),
          updated_at: z.string().nullable(),
          price: z.number().nullable(),
        })
      ),
    })
  ),
};
