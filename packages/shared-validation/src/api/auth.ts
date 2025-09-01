import { z } from "zod";

// Auth API Request Schemas
export const loginRequestSchema = z.object({
  email: z.string().email("Geçerli email adresi gerekli"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const registerRequestSchema = z
  .object({
    email: z.string().email("Geçerli email adresi gerekli"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string().min(1, "Şifre tekrarı gerekli"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export const checkAuthRequestSchema = z.object({});

export const getUserMenusRequestSchema = z.object({});
