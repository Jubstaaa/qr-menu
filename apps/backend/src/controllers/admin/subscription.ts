import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { SubscriptionAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const adminSubscriptionController = {
  async getUserSubscription(
    req: Request<{}, {}, SubscriptionAPI.Admin.GetUserSubscriptionRequest>,
    res: Response<
      ApiResponse<SubscriptionAPI.Admin.GetUserSubscriptionResponse> | ApiError
    >
  ) {
    try {
      const { data: subscription, error } = await supabase
        .from("subscriptions")
        .select(
          `
          id,
          user_id,
          plan_type,
          status,
          start_date,
          end_date,
          created_at,
          updated_at
        `
        )
        .eq("user_id", req.user!.id)
        .single();

      if (error) {
        console.error("Get subscription error:", error);
        return res.status(500).json({
          message: "Abonelik bilgileri alınırken hata oluştu",
        });
      }

      res.json({
        data: subscription,
        message: "Abonelik bilgileri başarıyla alındı",
      });
    } catch (error) {
      console.error("Get user subscription error:", error);
      res.status(500).json({
        message: "Sunucu hatası oluştu",
      });
    }
  },
};
