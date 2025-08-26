// Item DTOs
export interface CreateItemDto {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  sort_order?: number;
  category_id: string;
}

export interface UpdateItemDto {
  name?: string;
  description?: string;
  price?: number;
  image_url?: string;
  sort_order?: number;
  is_available?: boolean;
}

export interface ItemDto {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  sort_order: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}
