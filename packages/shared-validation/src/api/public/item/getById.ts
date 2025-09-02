import { z } from "zod";

// Get Item By ID Request Schema
export const GetById = {
  Request: {
    Data: z.object({}),
    Params: z.object({
      itemId: z.string().uuid("Geçerli ürün ID gerekli"),
    }),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    image_url: z.string().nullable(),
  }),
};
