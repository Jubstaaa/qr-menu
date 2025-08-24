-- Migration: Add restaurant and item details
-- Add new fields to menus table
ALTER TABLE menus 
ADD COLUMN IF NOT EXISTS opening_time TIME DEFAULT '09:00:00',
ADD COLUMN IF NOT EXISTS closing_time TIME DEFAULT '22:00:00',
ADD COLUMN IF NOT EXISTS wifi_ssid TEXT,
ADD COLUMN IF NOT EXISTS wifi_password TEXT;

-- Add new fields to menu_items table
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS ingredients TEXT,
ADD COLUMN IF NOT EXISTS allergens JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS nutrition_info JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preparation_time INTEGER,
ADD COLUMN IF NOT EXISTS spice_level INTEGER CHECK (spice_level >= 1 AND spice_level <= 5),
ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_chef_special BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT true;

-- Add comments for documentation
COMMENT ON COLUMN menus.opening_time IS 'Açılış saati (24 saat formatında)';
COMMENT ON COLUMN menus.closing_time IS 'Kapanış saati (24 saat formatında)';
COMMENT ON COLUMN menus.wifi_ssid IS 'Wi-Fi SSID';
COMMENT ON COLUMN menus.wifi_password IS 'Wi-Fi şifresi';

COMMENT ON COLUMN menu_items.ingredients IS 'Ürün malzemeleri';
COMMENT ON COLUMN menu_items.allergens IS 'Alerjen bilgileri';
COMMENT ON COLUMN menu_items.nutrition_info IS 'Besin değerleri';
COMMENT ON COLUMN menu_items.preparation_time IS 'Hazırlama süresi (dakika)';
COMMENT ON COLUMN menu_items.spice_level IS 'Acı seviyesi (1-5)';
COMMENT ON COLUMN menu_items.is_popular IS 'Popüler ürün mü?';
COMMENT ON COLUMN menu_items.is_chef_special IS 'Şef özel mi?';
COMMENT ON COLUMN menu_items.is_available IS 'Ürün mevcut mu?';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_popular ON menu_items(is_popular) WHERE is_popular = true;
CREATE INDEX IF NOT EXISTS idx_menu_items_chef_special ON menu_items(is_chef_special) WHERE is_chef_special = true;
CREATE INDEX IF NOT EXISTS idx_menu_items_spice_level ON menu_items(spice_level);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available) WHERE is_available = true; 