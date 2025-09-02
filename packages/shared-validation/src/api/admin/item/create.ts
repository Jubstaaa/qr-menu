import { z } from "zod";

// Create Item Request Schema
export const Create = {
  Request: {
    Data: z.object({
      name: z
        .string()
        .min(1, "Ürün adı zorunludur")
        .max(100, "Ürün adı 100 karakterden uzun olamaz"),
      description: z.string().optional(),
      price: z
        .number()
        .positive("Fiyat 0'dan büyük olmalıdır")
        .min(0.01, "Fiyat en az 0.01 olmalıdır"),
      category_id: z.string().uuid("Geçerli kategori ID gerekli"),
      image_url: z.string().nullable().optional(),
      is_popular: z.boolean().optional(),
      is_chef_special: z.boolean().optional(),
      spice_level: z
        .number()
        .int("Acı seviyesi tam sayı olmalıdır")
        .min(0, "Acı seviyesi 0'dan küçük olamaz")
        .max(5, "Acı seviyesi 5'ten büyük olamaz")
        .optional(),
      preparation_time: z
        .number()
        .int("Hazırlama süresi tam sayı olmalıdır")
        .min(0, "Hazırlama süresi negatif olamaz")
        .max(180, "Hazırlama süresi 180 dakikadan uzun olamaz")
        .optional(),
      allergens: z
        .array(z.string().min(1, "Alerjen adı boş olamaz"))
        .optional(),
      nutrition_info: z.string().optional(),
      is_available: z.boolean().optional(),
    }),
    Params: z.object({}),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    category_id: z.string(),
    image_url: z.string().nullable(),
    is_popular: z.boolean().nullable(),
    is_chef_special: z.boolean().nullable(),
    spice_level: z.number().nullable(),
    sort_order: z.number().nullable(),
    is_available: z.boolean().nullable(),
    preparation_time: z.number().nullable(),
    allergens: z.array(z.string()).nullable(),
    nutrition_info: z.string().nullable(),
    is_active: z.boolean(),
  }),
};
