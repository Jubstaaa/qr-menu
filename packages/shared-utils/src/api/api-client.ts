import { config } from "@qr-menu/shared-config";
import { ApiResponse } from "@qr-menu/shared-types";

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  credentials?: "omit" | "same-origin" | "include";
  subdomain?: string;
  query?: Record<string, any>;
  pathParams?: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = config.API_URL) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    pathParams?: Record<string, string>,
    query?: Record<string, any>
  ): string {
    let url = `${this.baseUrl}${endpoint}`;

    if (pathParams) {
      Object.entries(pathParams).forEach(([k, v]) => {
        url = url.replace(`:${k}`, v);
      });
    }

    if (query) {
      const search = new URLSearchParams();
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== null) search.append(k, String(v));
      });
      if (Array.from(search).length > 0) {
        url += `?${search.toString()}`;
      }
    }

    return url;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<ApiResponse<T>> {
    const {
      method = "GET",
      headers = {},
      body,
      credentials,
      subdomain,
      pathParams,
      query,
    } = options;

    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (subdomain) {
      finalHeaders["x-subdomain"] = subdomain;
    }

    const url = this.buildUrl(endpoint, pathParams, query);

    const config: RequestInit = {
      method,
      headers: finalHeaders,
      credentials,
    };

    if (method !== "GET" && body) {
      if (typeof FormData !== "undefined" && body instanceof FormData) {
        delete (config.headers as any)["Content-Type"];
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    try {
      const res = await fetch(url, config);
      const json = (await res.json()) as ApiResponse<T>;

      if (!res.ok) {
        return {
          data: undefined as unknown as T,
          message: json.message || `HTTP ${res.status}`,
        };
      }

      return {
        data: json.data,
        message: json.message,
      };
    } catch (err) {
      return {
        data: undefined as unknown as T,
        message: err instanceof Error ? err.message : "Network error",
      };
    }
  }

  get<T>(endpoint: string, args?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...args, method: "GET" });
  }

  post<T, B = any>(
    endpoint: string,
    body?: B,
    args?: Omit<RequestOptions, "method" | "body">
  ) {
    return this.request<T>(endpoint, { ...args, method: "POST", body });
  }

  put<T, B = any>(
    endpoint: string,
    body?: B,
    args?: Omit<RequestOptions, "method" | "body">
  ) {
    return this.request<T>(endpoint, { ...args, method: "PUT", body });
  }

  patch<T, B = any>(
    endpoint: string,
    body?: B,
    args?: Omit<RequestOptions, "method" | "body">
  ) {
    return this.request<T>(endpoint, { ...args, method: "PATCH", body });
  }

  delete<T>(endpoint: string, args?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...args, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
