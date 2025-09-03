import { z } from "zod";

// Get Item By ID Request Schema
export const Get = {
  Request: {
    Headers: z.object({
      subdomain: z.string("Geçerli subdomain ID gerekli"),
    }),
  },
  Response: z.object({
    logo_url: z.string().nullable(),
    restaurant_name: z.string(),
    restaurant_description: z.string().nullable(),
    restaurant_address: z.string().nullable(),
    restaurant_phone: z.string().nullable(),
    restaurant_email: z.string().nullable(),
    wifi_ssid: z.string().nullable(),
    wifi_password: z.string().nullable(),
    opening_time: z.string().nullable(),
    closing_time: z.string().nullable(),
  }),
};
