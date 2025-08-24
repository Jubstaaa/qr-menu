-- Create menus table
CREATE TABLE IF NOT EXISTS menus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  restaurant_name TEXT NOT NULL,
  restaurant_description TEXT,
  restaurant_address TEXT,
  restaurant_phone TEXT,
  restaurant_email TEXT,
  restaurant_category TEXT NOT NULL,
  subdomain TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on subdomain for fast lookups
CREATE INDEX IF NOT EXISTS idx_menus_subdomain ON menus(subdomain);

-- Create index on user_id for fast user queries
CREATE INDEX IF NOT EXISTS idx_menus_user_id ON menus(user_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_menus_status ON menus(status);

-- Enable Row Level Security (RLS)
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own menus
DROP POLICY IF EXISTS "Users can view own menus" ON menus;
CREATE POLICY "Users can view own menus" ON menus
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own menus
DROP POLICY IF EXISTS "Users can insert own menus" ON menus;
CREATE POLICY "Users can insert own menus" ON menus
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own menus
DROP POLICY IF EXISTS "Users can update own menus" ON menus;
CREATE POLICY "Users can update own menus" ON menus
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own menus
DROP POLICY IF EXISTS "Users can delete own menus" ON menus;
CREATE POLICY "Users can delete own menus" ON menus
  FOR DELETE USING (auth.uid() = user_id);

-- Public can view active menus by subdomain (for public access)
DROP POLICY IF EXISTS "Public can view active menus" ON menus;
CREATE POLICY "Public can view active menus" ON menus
  FOR SELECT USING (status = 'active');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at 
DROP TRIGGER IF EXISTS update_menus_updated_at ON menus;
CREATE TRIGGER update_menus_updated_at 
  BEFORE UPDATE ON menus 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 