import { z } from "zod";

// Reorder Items Request Schema
export const Reorder = {
  Request: {
    Data: z.object({
      itemIds: z.array(z.string().uuid("Geçerli ürün ID gerekli")),
    }),
    Params: z.object({}),
  },
  Response: z.object({}),
};
