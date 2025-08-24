import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Kategori adı gerekli")
    .max(50, "Kategori adı çok uzun"),
  description: z.string().optional(),
  is_active: z.boolean(),
});

export const itemSchema = z.object({
  name: z.string().min(1, "Ürün adı gerekli").max(100, "Ürün adı çok uzun"),
  description: z.string().optional(),
  price: z.number().min(0, "Fiyat 0'dan küçük olamaz"),
  image_url: z
    .string()
    .url("Geçerli bir URL girin")
    .optional()
    .or(z.literal("")),
  is_available: z.boolean(),
  is_popular: z.boolean(),
  is_chef_special: z.boolean(),
  preparation_time: z.number().min(0, "Hazırlama süresi 0'dan küçük olamaz"),
  category_id: z.string().min(1, "Kategori seçimi gerekli"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
export type ItemFormData = z.infer<typeof itemSchema>;
