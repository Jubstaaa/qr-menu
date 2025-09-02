import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const getByUser = () =>
  apiClient.get<ApiType.Admin.Menu.GetByUser.Response>(
    ENDPOINTS.ADMIN.MENU.GET_BY_USER
  );
