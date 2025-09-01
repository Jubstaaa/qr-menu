import { z } from "zod";

// Menu API Request Schemas
export const createMenuRequestSchema = z.object({
  name: z.string().min(1, "Restoran adı zorunludur"),
  subdomain: z.string().min(1, "Subdomain zorunludur"),
});

export const updateMenuRequestSchema = z.object({
  restaurant_name: z.string().min(1, "Restoran adı zorunludur").optional(),
  restaurant_description: z.string().optional(),
  restaurant_address: z.string().optional(),
  restaurant_phone: z.string().optional(),
  restaurant_email: z.string().email("Geçerli email adresi gerekli").optional(),
  logo_url: z.string().nullable().optional(),
  opening_time: z.string().optional(),
  closing_time: z.string().optional(),
  wifi_ssid: z.string().optional(),
  wifi_password: z.string().optional(),
});

export const getMenuBySubdomainRequestSchema = z.object({
  subdomain: z.string().min(1, "Subdomain zorunludur"),
});

export const getMenusByUserRequestSchema = z.object({});
