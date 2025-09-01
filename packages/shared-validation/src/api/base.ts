import { z } from "zod";

// Base API Request Schemas
export const baseRequestSchema = z.object({});

export type BaseRequest = z.infer<typeof baseRequestSchema>;
