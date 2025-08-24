import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";

export const adminSubscriptionController = {
  // Get user subscription by userId from req
  async getUserSubscription(req: Request, res: Response) {
    try {
      const { data: subscription, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", req.user!.id)
        .single();

      if (error) {
        console.error("Get subscription error:", error);
        return res.status(500).json({
          error: "Database Error",
          message: "Abonelik bilgileri alınırken hata oluştu",
          status: 500,
        });
      }

      res.json({
        data: subscription,
        message: "Abonelik bilgileri başarıyla alındı",
        status: 200,
      });
    } catch (error) {
      console.error("Get user subscription error:", error);
      res.status(500).json({
        error: "Server Error",
        message: "Sunucu hatası oluştu",
        status: 500,
      });
    }
  },
};
