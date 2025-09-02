import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const getBySubdomain = () =>
  apiClient.get<ApiType.Public.Menu.GetBySubdomain.Response>(
    ENDPOINTS.PUBLIC.MENU.GET_BY_SUBDOMAIN
  );
