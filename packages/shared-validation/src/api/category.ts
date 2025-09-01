import { z } from "zod";

// Category API Request Schemas
export const createCategoryRequestSchema = z.object({
  name: z.string().min(1, "Kategori adı zorunludur"),
  description: z.string().optional(),
  image_url: z.string().nullable().optional(),
  is_active: z.boolean().optional(),
});

export const updateCategoryRequestSchema = z.object({
  name: z.string().min(1, "Kategori adı zorunludur").optional(),
  description: z.string().optional(),
  image_url: z.string().nullable().optional(),
  is_active: z.boolean().optional().nullable(),
});

export const deleteCategoryRequestSchema = z.object({
  id: z.string().uuid("Geçerli kategori ID gerekli"),
});

export const reorderCategoriesRequestSchema = z.object({
  changes: z
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
});

export const getCategoryBySlugRequestSchema = z.object({
  slug: z.string().min(1, "Slug zorunludur"),
});
