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
      sort_order: z.number().nullable(),
      is_available: z.boolean().nullable(),
    })
  ),
};
