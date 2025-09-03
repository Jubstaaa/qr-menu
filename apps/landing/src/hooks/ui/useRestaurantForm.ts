import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

export const useRestaurantForm = () => {
  const form = useForm<ApiType.Admin.Menu.Create.Request.Data>({
    resolver: zodResolver(ApiValidation.Admin.Menu.Create.Request.Data),
    defaultValues: {
      restaurant_name: "",
      subdomain: "",
    },
  });

  return form;
};
