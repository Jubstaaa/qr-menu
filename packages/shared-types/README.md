# QR Menu Shared Types

Bu paket, QR Menu projesi için tüm shared type'ları içerir.

## API Types Yapısı

### Klasör Yapısı

```
src/
├── api/
│   ├── base.ts          # Temel API type'ları
│   ├── auth.ts          # Auth API type'ları
│   ├── menu.ts          # Menu API type'ları
│   ├── category.ts      # Category API type'ları
│   ├── item.ts          # Item API type'ları
│   ├── subscription.ts  # Subscription API type'ları
│   └── index.ts         # API exports
├── common.ts            # Ortak type'lar
├── utils.ts             # Utility type'lar
└── index.ts             # Ana exports
```

### Kullanım Örnekleri

#### 1. Type Safety ile API Types

```typescript
import { AuthAPI, MenuAPI, CategoryAPI, ItemAPI } from "@qr-menu/shared-types";

// Auth types
const loginRequest: AuthAPI.LoginRequest = {
  email: "user@example.com",
  password: "password",
};

// Menu types
const createMenuRequest: MenuAPI.CreateMenuRequest = {
  name: "Restoran Adı",
  subdomain: "restoran",
};

// Category types
const createCategoryRequest: CategoryAPI.CreateCategoryRequest = {
  name: "Ana Yemekler",
  description: "Lezzetli ana yemekler",
};

// Item types
const createItemRequest: ItemAPI.CreateItemRequest = {
  name: "Kebap",
  description: "Özel baharatlarla hazırlanmış kebap",
  price: 45.99,
  category_id: "category-id",
  is_popular: true,
};
```

#### 2. API Response Types

```typescript
import { AuthAPI, MenuAPI } from "@qr-menu/shared-types";

// Login response type
const loginResponse: AuthAPI.LoginResponse = {
  user: {
    id: "user-id",
    email: "user@example.com",
    created_at: "2024-01-01T00:00:00Z",
  },
  menu: {
    id: "menu-id",
    restaurant_name: "Restoran Adı",
    subdomain: "restoran",
  },
};

// Menu response type
const menuResponse: MenuAPI.GetMenuBySubdomainResponse = {
  menu: {
    id: "menu-id",
    restaurant_name: "Restoran Adı",
    restaurant_description: "Lezzetli yemekler",
    restaurant_phone: "+90 555 123 4567",
    restaurant_address: "İstanbul, Türkiye",
    opening_time: "09:00",
    closing_time: "22:00",
    wifi_ssid: "Restoran_WiFi",
    wifi_password: "12345678",
    subdomain: "restoran",
    created_at: "2024-01-01T00:00:00Z",
  },
};
```

### Type Safety

Tüm API type'ları tamamen type-safe'dir:

```typescript
// ✅ Doğru kullanım
const request: AuthAPI.LoginRequest = {
  email: "user@example.com",
  password: "password",
};

// ❌ Hatalı kullanım - TypeScript hata verir
const request: AuthAPI.LoginRequest = {
  email: "user@example.com",
  // password eksik - hata!
};
```

## Geliştirme

### Yeni API Modülü Ekleme

1. `api/` klasöründe yeni dosya oluştur (örn: `payment.ts`)
2. Request/response type'larını namespace içinde tanımla
3. `api/index.ts` dosyasında export et

### Örnek Yeni API Modülü

```typescript
// api/payment.ts
export namespace PaymentAPI {
  export interface CreatePaymentRequest {
    amount: number;
    currency: string;
    payment_method: string;
  }

  export interface CreatePaymentResponse {
    payment: {
      id: string;
      amount: number;
      currency: string;
      status: "pending" | "completed" | "failed";
      created_at: string;
    };
  }
}
```
