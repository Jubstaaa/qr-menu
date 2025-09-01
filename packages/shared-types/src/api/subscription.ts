import { z } from "zod";
import { getUserSubscriptionRequestSchema } from "@qr-menu/shared-validation";

// Subscription API Types
export namespace SubscriptionAPI {
  // Response Types
  export namespace Admin {
    // Request Types (from Zod schemas)
    export type GetUserSubscriptionRequest = z.infer<
      typeof getUserSubscriptionRequestSchema
    >;

    // Get User Subscription
    export type GetUserSubscriptionResponse = {
      id: string;
      user_id: string;
      plan_type: string;
      status: string | null;
      start_date: string | null;
      end_date: string | null;
      created_at: string | null;
      updated_at: string | null;
    } | null;
  }
}
