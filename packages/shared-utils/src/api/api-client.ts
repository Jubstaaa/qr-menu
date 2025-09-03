import { config } from "@qr-menu/shared-config";
import { ApiResponse } from "@qr-menu/shared-types";

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
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
    const { method = "GET", headers = {}, body, pathParams, query } = options;

    const finalHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    const url = this.buildUrl(endpoint, pathParams, query);

    const config: RequestInit = {
      method,
      headers: finalHeaders,
      credentials: "include",
    };

    if (method !== "GET" && body) {
      if (typeof FormData !== "undefined" && body instanceof FormData) {
        delete (config.headers as any)["Content-Type"];
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    const res = await fetch(url, config);
    let json: any = null;

    try {
      json = await res.json();
    } catch {
      // body yoksa veya geçersiz JSON
    }

    if (!res.ok) {
      // 200 dışında error fırlat
      const message =
        (json && (json.message || json.error?.message)) ||
        res.statusText ||
        `HTTP ${res.status}`;
      throw new Error(message);
    }

    return {
      data: (json?.data ?? json) as T,
      message: json?.message,
    };
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
