import { z } from "zod";

// Login Request Schema
export const Login = {
  Request: {
    Data: z.object({
      email: z.string().email("Geçerli email adresi gerekli"),
      password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
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
