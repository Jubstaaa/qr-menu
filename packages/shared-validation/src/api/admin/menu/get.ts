import { z } from "zod";

export const Get = {
  Response: z.object({
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
  }),
};
