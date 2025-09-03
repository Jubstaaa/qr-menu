import { z } from "zod";

export const Delete = {
  Request: {
    Data: z.object({}),
    Params: z.object({
      id: z.string().uuid("Geçerli kategori ID gerekli"),
    }),
  },
  Response: z.object({}),
};
