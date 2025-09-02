import { z } from "zod";

// Register Request Schema
export const Register = {
  Request: {
    Data: z
      .object({
        email: z.string().email("Geçerli email adresi gerekli"),
        password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
        confirmPassword: z.string().min(1, "Şifre tekrarı gerekli"),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Şifreler eşleşmiyor",
        path: ["confirmPassword"],
      }),
    Params: z.object({}),
  },

  Response: z.object({
    token: z.string(),
    user: z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
    }),
  }),
};
