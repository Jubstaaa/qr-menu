import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Kategori adı zorunludur")
    .max(50, "Kategori adı 50 karakterden uzun olamaz"),
  description: z
    .string()
    .max(200, "Açıklama 200 karakterden uzun olamaz")
    .optional(),
  is_active: z.boolean(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Kategori adı zorunludur")
    .max(50, "Kategori adı 50 karakterden uzun olamaz")
    .optional(),
  description: z
    .string()
    .max(200, "Açıklama 200 karakterden uzun olamaz")
    .optional(),
  is_active: z.boolean().optional(),
  image_url: z.string().nullable().optional(),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;

export const validateCreateCategory = (data: unknown): CreateCategoryDto => {
  return createCategorySchema.parse(data);
};

export const validateUpdateCategory = (data: unknown): UpdateCategoryDto => {
  return updateCategorySchema.parse(data);
};
