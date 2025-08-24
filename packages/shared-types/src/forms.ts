export interface MenuFormData {
  name: string;
  description?: string;

  logo_url?: string;
  theme_color?: string;
  wifi_ssid?: string;
  wifi_password?: string;
  opening_time?: string;
  closing_time?: string;
  phone?: string;
  address?: string;
  website?: string;
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface CategoryFormData {
  name: string;
  description?: string;
  is_active: boolean;
}

export interface ItemFormData {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  ingredients?: string[];
  allergens?: string[];
  nutrition_info?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  preparation_time?: number;
  spice_level?: "mild" | "medium" | "hot" | "extra_hot";
  is_available: boolean;
  is_active: boolean;
  is_popular: boolean;
  is_chef_special: boolean;
}
