import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuAPI } from "@qr-menu/shared-types";
import { createMenuRequestSchema } from "@qr-menu/shared-validation";

export const useRestaurantForm = () => {
  const form = useForm<MenuAPI.Admin.CreateMenuRequest>({
    resolver: zodResolver(createMenuRequestSchema),
    defaultValues: {
      name: "",
      subdomain: "",
    },
  });

  return form;
};
