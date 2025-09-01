import { ENDPOINT_CONFIG, ApiEndpoint, config } from "@qr-menu/shared-config";
import { ApiResponse } from "@qr-menu/shared-types";
import { extractSubdomain } from "./subdomain";

// Request Options Interface
export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
  subdomain?: string;
}

// Default Options
const defaultOptions: RequestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

// Base API Client Interface
export interface ApiClient {
  get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  post<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  put<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  patch<T>(url: string, data?: any): Promise<ApiResponse<T>>;
  delete<T>(url: string): Promise<ApiResponse<T>>;
}

// API Client Implementation
export class QrMenuApiClient implements ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || config.API_URL;
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    params?: Record<string, any>,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const finalOptions = { ...defaultOptions, ...options, method };

    const headers = { ...finalOptions.headers };

    // Subdomain handling
    if (finalOptions.subdomain) {
      headers["x-subdomain"] = finalOptions.subdomain;
    } else if (typeof window !== "undefined") {
      headers["x-subdomain"] = extractSubdomain(window.location.host);
    }

    let requestUrl = url;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        requestUrl += `?${queryString}`;
      }
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: finalOptions.credentials,
    };

    // Body handling
    if (method !== "GET" && data) {
      if (typeof FormData !== "undefined" && data instanceof FormData) {
        if (config.headers && (config.headers as any)["Content-Type"]) {
          delete (config.headers as any)["Content-Type"];
        }
        config.body = data as any;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(requestUrl, config);
      const responseData = await response.json();

      if (!response.ok) {
        return {
          data: undefined as T,
          message: (responseData as any)?.message || `HTTP ${response.status}`,
        };
      }

      return {
        data: (responseData as any)?.data || (responseData as T),
        message: (responseData as any)?.message,
      };
    } catch (error) {
      return {
        data: undefined as T,
        message: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, params, options);
  }

  async post<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, undefined, options);
  }

  async put<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, undefined, options);
  }

  async patch<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", url, data, undefined, options);
  }

  async delete<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, undefined, undefined, options);
  }

  // Helper method to build URL with endpoint config
  buildUrl(endpointName: string, params?: Record<string, string>): string {
    const endpoint = ENDPOINT_CONFIG[endpointName];
    if (!endpoint) {
      throw new Error(`Endpoint ${endpointName} not found`);
    }

    let url = `${this.baseUrl}${endpoint.path}`;

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }

    return url;
  }

  // Helper method to check if endpoint requires auth
  requiresAuth(endpointName: string): boolean {
    const endpoint = ENDPOINT_CONFIG[endpointName];
    return endpoint?.requiresAuth || false;
  }

  // Helper methods that return data directly
  async getData<T>(
    url: string,
    params?: Record<string, any>,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.get<T>(url, params, options);
    if (!response.data) {
      throw new Error(response.message || "Request failed");
    }
    return response.data;
  }

  async postData<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.post<T>(url, data, options);
    if (!response.data) {
      throw new Error(response.message || "Request failed");
    }
    return response.data;
  }

  async putData<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.put<T>(url, data, options);
    if (!response.data) {
      throw new Error(response.message || "Request failed");
    }
    return response.data;
  }

  async patchData<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.patch<T>(url, data, options);
    if (!response.data) {
      throw new Error(response.message || "Request failed");
    }
    return response.data;
  }

  async deleteData<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.delete<T>(url, options);
    if (!response.data) {
      throw new Error(response.message || "Request failed");
    }
    return response.data;
  }
}

// Default API Client Instance - config.API_URL kullanır
export const apiClient = new QrMenuApiClient();

// Legacy function for backward compatibility
export const createApiClient = (baseUrl?: string) => {
  return new QrMenuApiClient(baseUrl);
};
