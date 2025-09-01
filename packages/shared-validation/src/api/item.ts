import { z } from "zod";

// Item API Request Schemas
export const createItemRequestSchema = z.object({
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
  allergens: z.array(z.string().min(1, "Alerjen adı boş olamaz")).optional(),
  nutrition_info: z.string().optional(),
  is_available: z.boolean().optional(),
});

export const updateItemRequestSchema = z.object({
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
  allergens: z.array(z.string().min(1, "Alerjen adı boş olamaz")).optional(),
  nutrition_info: z.string().optional(),
  is_available: z.boolean().optional(),
});

export const deleteItemRequestSchema = z.object({
  id: z.string().uuid("Geçerli ürün ID gerekli"),
});

export const reorderItemsRequestSchema = z.object({
  changes: z
    .array(
      z.object({
        id: z.string().uuid("Geçerli ürün ID gerekli"),
        newSortOrder: z
          .number()
          .int("Sıralama tam sayı olmalıdır")
          .min(0, "Sıralama negatif olamaz"),
      })
    )
    .min(1, "En az bir değişiklik gerekli"),
});

export const getItemByIdRequestSchema = z.object({
  id: z.string().uuid("Geçerli ürün ID gerekli"),
});

export const getItemBySubdomainAndIdRequestSchema = z.object({
  itemId: z.string().uuid("Geçerli ürün ID gerekli"),
});
