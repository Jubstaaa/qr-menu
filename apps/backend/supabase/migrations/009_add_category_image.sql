-- Add image_url to menu_categories
ALTER TABLE menu_categories 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Helpful index if needed for filtering by has image
CREATE INDEX IF NOT EXISTS idx_categories_image_url ON menu_categories(image_url);

