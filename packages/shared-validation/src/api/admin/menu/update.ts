import { z } from "zod";

// Update Menu Request Schema
export const Update = {
  Request: {
    Data: z.object({
      restaurant_name: z.string().min(1, "Restoran adı zorunludur").optional(),
      restaurant_description: z.string().optional(),
      restaurant_address: z.string().optional(),
      restaurant_phone: z.string().optional(),
      restaurant_email: z
        .string()
        .email("Geçerli email adresi gerekli")
        .optional(),
      logo_url: z.string().nullable().optional(),
      opening_time: z.string().optional(),
      closing_time: z.string().optional(),
      wifi_ssid: z.string().optional(),
      wifi_password: z.string().optional(),
      custom_css: z.string().optional(),
      is_active: z.boolean().optional(),
      theme_color: z.string().optional(),
      subdomain: z.string().min(1, "Subdomain zorunludur").optional(),
    }),
    Params: z.object({
      id: z.string().uuid("Geçerli ID gerekli"),
    }),
  },
  Response: z.object({
    id: z.string(),
    restaurant_name: z.string(),
    restaurant_description: z.string().nullable(),
    restaurant_address: z.string().nullable(),
    restaurant_phone: z.string().nullable(),
    restaurant_email: z
      .string()
      .email("Geçerli email adresi gerekli")
      .nullable(),
    logo_url: z.string().nullable(),
    opening_time: z.string().nullable(),
    closing_time: z.string().nullable(),
    wifi_ssid: z.string().nullable(),
    wifi_password: z.string().nullable(),
    custom_css: z.string().nullable(),
    is_active: z.boolean().nullable(),
    theme_color: z.string().nullable(),
    subdomain: z.string().min(1, "Subdomain zorunludur").nullable(),
  }),
};
