import { z } from "zod";

export const createRestaurantSchema = z.object({
  restaurant_name: z
    .string()
    .min(1, "Restoran adı zorunludur")
    .max(100, "Restoran adı 100 karakterden uzun olamaz"),
  restaurant_description: z
    .string()
    .max(500, "Açıklama 500 karakterden uzun olamaz")
    .optional(),
  restaurant_address: z
    .string()
    .min(1, "Adres zorunludur")
    .max(200, "Adres 200 karakterden uzun olamaz"),
  restaurant_phone: z
    .string()
    .max(20, "Telefon 20 karakterden uzun olamaz")
    .optional(),
  restaurant_email: z
    .string()
    .email("Geçerli bir e-posta girin")
    .max(100, "E-posta 100 karakterden uzun olamaz")
    .optional()
    .or(z.literal("")),
  logo_url: z.string().url("Geçerli logo URL'i gerekli").nullable().optional(),
  opening_time: z
    .string()
    .max(10, "Açılış saati 10 karakterden uzun olamaz")
    .optional(),
  closing_time: z
    .string()
    .max(10, "Kapanış saati 10 karakterden uzun olamaz")
    .optional(),
  wifi_ssid: z
    .string()
    .max(50, "WiFi SSID 50 karakterden uzun olamaz")
    .optional(),
  wifi_password: z
    .string()
    .max(50, "WiFi şifresi 50 karakterden uzun olamaz")
    .optional(),
});

export const updateRestaurantSchema = z.object({
  restaurant_name: z
    .string()
    .min(1, "Restoran adı zorunludur")
    .max(100, "Restoran adı 100 karakterden uzun olamaz")
    .optional(),
  restaurant_description: z
    .string()
    .max(500, "Açıklama 500 karakterden uzun olamaz")
    .optional(),
  restaurant_address: z
    .string()
    .min(1, "Adres zorunludur")
    .max(200, "Adres 200 karakterden uzun olamaz")
    .optional(),
  restaurant_phone: z
    .string()
    .max(20, "Telefon 20 karakterden uzun olamaz")
    .optional(),
  restaurant_email: z
    .string()
    .email("Geçerli bir e-posta girin")
    .max(100, "E-posta 100 karakterden uzun olamaz")
    .optional()
    .or(z.literal("")),
  logo_url: z.string().nullable().optional(),
  opening_time: z
    .string()
    .max(10, "Açılış saati 10 karakterden uzun olamaz")
    .optional(),
  closing_time: z
    .string()
    .max(10, "Kapanış saati 10 karakterden uzun olamaz")
    .optional(),
  wifi_ssid: z
    .string()
    .max(50, "WiFi SSID 50 karakterden uzun olamaz")
    .optional(),
  wifi_password: z
    .string()
    .max(50, "WiFi şifresi 50 karakterden uzun olamaz")
    .optional(),
});

export type CreateRestaurantDto = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantDto = z.infer<typeof updateRestaurantSchema>;

export const validateCreateRestaurant = (
  data: unknown
): CreateRestaurantDto => {
  return createRestaurantSchema.parse(data);
};

export const validateUpdateRestaurant = (
  data: unknown
): UpdateRestaurantDto => {
  return updateRestaurantSchema.parse(data);
};
