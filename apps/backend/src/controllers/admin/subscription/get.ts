import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiResponse, ApiError } from "@qr-menu/shared-types";

export const getSubscription = async (
  req: Request,
  res: Response<ApiResponse<any> | ApiError>
) => {
  try {
    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", req.user!.id)
      .single();

    if (error) {
      console.error("Get subscription error:", error);
      return res.status(500).json({
        message: "Abonelik bilgisi getirilemedi",
      });
    }

    res.json({
      data: subscription,
      message: "Abonelik bilgisi başarıyla getirildi",
    });
  } catch (error: any) {
    console.error("Get subscription error:", error);
    res.status(500).json({
      message: "Abonelik bilgisi getirilemedi",
    });
  }
};
