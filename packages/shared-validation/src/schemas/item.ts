import { z } from "zod";

export const createItemSchema = z.object({
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
  is_available: z.boolean(),
  is_popular: z.boolean(),
  is_chef_special: z.boolean(),
  preparation_time: z
    .number()
    .int("Hazırlama süresi tam sayı olmalıdır")
    .min(0, "Hazırlama süresi negatif olamaz")
    .max(180, "Hazırlama süresi 180 dakikadan uzun olamaz")
    .optional(),
  spice_level: z
    .number()
    .int("Acı seviyesi tam sayı olmalıdır")
    .min(0, "Acı seviyesi 0'dan küçük olamaz")
    .max(5, "Acı seviyesi 5'ten büyük olamaz")
    .optional(),
  allergens: z.array(z.string().min(1, "Alerjen adı boş olamaz")).optional(),
  nutrition_info: z.string().optional(),
  sort_order: z
    .number()
    .int("Sıralama tam sayı olmalıdır")
    .min(0, "Sıralama negatif olamaz")
    .optional(),
});

export const updateItemSchema = z.object({
  name: z
    .string()
    .min(1, "Ürün adı zorunludur")
    .max(100, "Ürün adı 100 karakterden uzun olamaz")
    .optional(),
  description: z.string().optional(),
  price: z
    .number()
    .positive("Fiyat 0'dan büyük olmalıdır")
    .min(0.01, "Fiyat en az 0.01 olmalıdır")
    .optional(),
  category_id: z.string().uuid("Geçerli kategori ID gerekli").optional(),
  is_available: z.boolean().optional(),
  is_popular: z.boolean().optional(),
  is_chef_special: z.boolean().optional(),
  preparation_time: z
    .number()
    .int("Hazırlama süresi tam sayı olmalıdır")
    .min(0, "Hazırlama süresi negatif olamaz")
    .max(180, "Hazırlama süresi 180 dakikadan uzun olamaz")
    .optional(),
  spice_level: z
    .number()
    .int("Acı seviyesi tam sayı olmalıdır")
    .min(0, "Acı seviyesi 0'dan küçük olamaz")
    .max(5, "Acı seviyesi 5'ten büyük olamaz")
    .optional(),
  allergens: z.array(z.string().min(1, "Alerjen adı boş olamaz")).optional(),
  nutrition_info: z.string().optional(),
  image_url: z.string().nullable().optional(),
});

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;

export const validateCreateItem = (data: unknown): CreateItemDto => {
  return createItemSchema.parse(data);
};

export const validateUpdateItem = (data: unknown): UpdateItemDto => {
  return updateItemSchema.parse(data);
};
