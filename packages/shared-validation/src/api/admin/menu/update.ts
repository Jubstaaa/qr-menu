import { z } from "zod";

// Update Menu Request Schema
export const Update = {
  Request: {
    Data: z.object({
      restaurant_name: z.string().min(1, "Restoran adı zorunludur"),
      restaurant_description: z.string().nullable(),
      restaurant_address: z.string().nullable(),
      restaurant_phone: z.string().nullable(),
      restaurant_email: z.email("Geçerli email adresi gerekli").nullable(),
      logo_url: z.string().nullable().nullable(),
      opening_time: z.string().nullable(),
      closing_time: z.string().nullable(),
      wifi_ssid: z.string().nullable(),
      wifi_password: z.string().nullable(),
      custom_css: z.string().nullable(),
      is_active: z.boolean().nullable(),
      theme_color: z.string().nullable(),
    }),
  },
  Response: z.object({
    id: z.string(),
    restaurant_name: z.string(),
    restaurant_description: z.string().nullable(),
    restaurant_address: z.string().nullable(),
    restaurant_phone: z.string().nullable(),
    restaurant_email: z.email("Geçerli email adresi gerekli").nullable(),
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
