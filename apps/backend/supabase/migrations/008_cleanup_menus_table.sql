-- Drop policies that depend on status column
DROP POLICY IF EXISTS "Public can view active menus" ON menus;
DROP POLICY IF EXISTS "Users can view their own menus" ON menus;
DROP POLICY IF EXISTS "Users can update their own menus" ON menus;

-- Remove unnecessary columns from menus table
ALTER TABLE menus DROP COLUMN IF EXISTS status;
ALTER TABLE menus DROP COLUMN IF EXISTS brand_name;
ALTER TABLE menus DROP COLUMN IF EXISTS plan;

-- Add is_active column to menus table
ALTER TABLE menus ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Recreate policies with is_active column
CREATE POLICY "Public can view active menus" ON menus
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view their own menus" ON menus
  FOR SELECT USING (auth.uid() = user_id AND is_active = true);

CREATE POLICY "Users can update their own menus" ON menus
  FOR UPDATE USING (auth.uid() = user_id);
