import { z } from "zod";

export const GetById = {
  Request: {
    Params: z.object({
      id: z.string().uuid("Geçerli kategori ID gerekli"),
    }),
    Data: z.object({}),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    image_url: z.string().nullable(),
    menu_id: z.string(),
  }),
};
