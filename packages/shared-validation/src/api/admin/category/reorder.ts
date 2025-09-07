import { z } from "zod";

export const Reorder = {
  Request: {
    Params: z.object({}),
    Data: z
      .array(
        z.object({
          id: z.string().uuid("Geçerli kategori ID gerekli"),
          newSortOrder: z
            .number()
            .int("Sıralama tam sayı olmalıdır")
            .min(0, "Sıralama negatif olamaz"),
        })
      )
      .min(1, "En az bir değişiklik gerekli"),
  },
  Response: z.object({}),
};
