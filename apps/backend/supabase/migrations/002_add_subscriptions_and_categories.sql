-- Add new columns to menus table
ALTER TABLE menus 
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS brand_name TEXT,
ADD COLUMN IF NOT EXISTS theme_color TEXT DEFAULT '#3B82F6',
ADD COLUMN IF NOT EXISTS custom_css TEXT;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('starter', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Enable RLS for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for subscriptions
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own subscriptions" ON subscriptions;
CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own subscriptions" ON subscriptions;
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create menu categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for categories
CREATE INDEX IF NOT EXISTS idx_categories_menu_id ON menu_categories(menu_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON menu_categories(sort_order);

-- Enable RLS for categories
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for categories (users can only access categories of their own menus)
DROP POLICY IF EXISTS "Users can view own menu categories" ON menu_categories;
CREATE POLICY "Users can view own menu categories" ON menu_categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own menu categories" ON menu_categories;
CREATE POLICY "Users can insert own menu categories" ON menu_categories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own menu categories" ON menu_categories;
CREATE POLICY "Users can update own menu categories" ON menu_categories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete own menu categories" ON menu_categories;
CREATE POLICY "Users can delete own menu categories" ON menu_categories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

-- Create menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for items
CREATE INDEX IF NOT EXISTS idx_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_items_sort_order ON menu_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_items_available ON menu_items(is_available);

-- Enable RLS for items
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for items (users can only access items of their own menu categories)
DROP POLICY IF EXISTS "Users can view own menu items" ON menu_items;
CREATE POLICY "Users can view own menu items" ON menu_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM menu_categories 
      JOIN menus ON menus.id = menu_categories.menu_id
      WHERE menu_categories.id = menu_items.category_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own menu items" ON menu_items;
CREATE POLICY "Users can insert own menu items" ON menu_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM menu_categories 
      JOIN menus ON menus.id = menu_categories.menu_id
      WHERE menu_categories.id = menu_items.category_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own menu items" ON menu_items;
CREATE POLICY "Users can update own menu items" ON menu_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM menu_categories 
      JOIN menus ON menus.id = menu_categories.menu_id
      WHERE menu_categories.id = menu_items.category_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete own menu items" ON menu_items;
CREATE POLICY "Users can delete own menu items" ON menu_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM menu_categories 
      JOIN menus ON menus.id = menu_categories.menu_id
      WHERE menu_categories.id = menu_items.category_id 
      AND menus.user_id = auth.uid()
    )
  );

-- Create custom domains table
CREATE TABLE IF NOT EXISTS custom_domains (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  domain_name TEXT NOT NULL UNIQUE,
  vercel_domain_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'vercel_added', 'active', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for domains
CREATE INDEX IF NOT EXISTS idx_domains_menu_id ON custom_domains(menu_id);
CREATE INDEX IF NOT EXISTS idx_domains_domain_name ON custom_domains(domain_name);
CREATE INDEX IF NOT EXISTS idx_domains_status ON custom_domains(status);

-- Enable RLS for domains
ALTER TABLE custom_domains ENABLE ROW LEVEL SECURITY;

-- RLS policies for domains
DROP POLICY IF EXISTS "Users can view own custom domains" ON custom_domains;
CREATE POLICY "Users can view own custom domains" ON custom_domains
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = custom_domains.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own custom domains" ON custom_domains;
CREATE POLICY "Users can insert own custom domains" ON custom_domains
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = custom_domains.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own custom domains" ON custom_domains;
CREATE POLICY "Users can update own custom domains" ON custom_domains
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = custom_domains.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete own custom domains" ON custom_domains;
CREATE POLICY "Users can delete own custom domains" ON custom_domains
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = custom_domains.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

-- Public can view active domains for public access
DROP POLICY IF EXISTS "Public can view active custom domains" ON custom_domains;
CREATE POLICY "Public can view active custom domains" ON custom_domains
  FOR SELECT USING (status = 'active');

-- Create updated_at triggers for new tables
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON subscriptions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON menu_categories;
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON menu_categories 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_items_updated_at ON menu_items;
CREATE TRIGGER update_items_updated_at 
  BEFORE UPDATE ON menu_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_domains_updated_at ON custom_domains;
CREATE TRIGGER update_domains_updated_at 
  BEFORE UPDATE ON custom_domains 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column(); 