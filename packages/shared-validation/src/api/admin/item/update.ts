import { SpiceLevel } from "@/enums";
import { z } from "zod";

// Update Item Request Schema
export const Update = {
  Request: {
    Data: z.object({
      name: z
        .string()
        .min(1, "Ürün adı zorunludur")
        .max(100, "Ürün adı 100 karakterden uzun olamaz")
        .nullable(),
      description: z.string().nullable(),
      price: z
        .number()
        .positive("Fiyat 0'dan büyük olmalıdır")
        .min(0.01, "Fiyat en az 0.01 olmalıdır")
        .nullable(),
      category_id: z.string().uuid("Geçerli kategori ID gerekli").nullable(),
      image_url: z.string().nullable().nullable(),
      is_popular: z.boolean().nullable(),
      is_chef_special: z.boolean().nullable(),
      spice_level: z.enum(SpiceLevel).nullable(),
      preparation_time: z
        .number()
        .int("Hazırlama süresi tam sayı olmalıdır")
        .min(0, "Hazırlama süresi negatif olamaz")
        .max(180, "Hazırlama süresi 180 dakikadan uzun olamaz")
        .nullable(),
      allergens: z
        .array(z.string().min(1, "Alerjen adı boş olamaz"))
        .nullable(),
      nutrition_info: z.record(z.string(), z.string()).nullable(),
      is_available: z.boolean().nullable(),
    }),
    Params: z.object({
      id: z.uuid("Geçerli ID gerekli"),
    }),
  },
  Response: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    category_id: z.uuid("Geçerli kategori ID gerekli"),
    image_url: z.string().nullable(),
    is_popular: z.boolean().nullable(),
    is_chef_special: z.boolean().nullable(),
    spice_level: z.enum(SpiceLevel).nullable(),
    sort_order: z.number().nullable(),
    is_available: z.boolean().nullable(),
    preparation_time: z.number().nullable(),
    allergens: z.array(z.string()).nullable(),
    nutrition_info: z.record(z.string(), z.string()).nullable(),
    is_active: z.boolean(),
  }),
};
