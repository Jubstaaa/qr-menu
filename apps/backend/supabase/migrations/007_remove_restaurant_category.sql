-- Remove restaurant_category column from menus table
ALTER TABLE menus DROP COLUMN IF EXISTS restaurant_category;
