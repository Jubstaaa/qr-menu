-- Migration: Remove unused columns from menus table
-- Remove columns that are not needed for restaurant menu functionality

-- Remove payment_method column (replaced by plan-based system)
ALTER TABLE menus DROP COLUMN IF EXISTS payment_method;

-- Remove delivery_info column (not needed for in-restaurant menus)
ALTER TABLE menus DROP COLUMN IF EXISTS delivery_info;

-- Remove parking_info column (not needed for in-restaurant menus)
ALTER TABLE menus DROP COLUMN IF EXISTS parking_info;

-- Remove payment_methods column (not needed for in-restaurant menus)
ALTER TABLE menus DROP COLUMN IF EXISTS payment_methods;

-- Remove special_features column (not needed for in-restaurant menus)
ALTER TABLE menus DROP COLUMN IF EXISTS special_features;

-- Add wifi_ssid and wifi_password columns if they don't exist
ALTER TABLE menus 
ADD COLUMN IF NOT EXISTS wifi_ssid TEXT,
ADD COLUMN IF NOT EXISTS wifi_password TEXT;

-- Add comments for documentation
COMMENT ON COLUMN menus.wifi_ssid IS 'Wi-Fi SSID';
COMMENT ON COLUMN menus.wifi_password IS 'Wi-Fi şifresi'; 