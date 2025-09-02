import { z } from "zod";

// Delete Item Request Schema
export const Delete = {
  Request: {
    Params: z.object({
      id: z.string().uuid("Geçerli ürün ID gerekli"),
    }),
    Data: z.object({}),
  },
  Response: z.object({}),
};
