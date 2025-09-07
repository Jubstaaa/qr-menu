

-- 1. SELECT: Kullanıcılar sadece kendi menülerinin kategorilerini görebilir
DROP POLICY IF EXISTS "Users can view own menu categories" ON menu_categories;
CREATE POLICY "Users can view own menu categories" ON menu_categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

-- 2. INSERT: Kullanıcılar sadece kendi menülerine kategori ekleyebilir
DROP POLICY IF EXISTS "Users can insert own menu categories" ON menu_categories;
CREATE POLICY "Users can insert own menu categories" ON menu_categories
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

-- 3. UPDATE: Kullanıcılar sadece kendi menülerinin kategorilerini güncelleyebilir
DROP POLICY IF EXISTS "Users can update own menu categories" ON menu_categories;
CREATE POLICY "Users can update own menu categories" ON menu_categories
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

-- 4. DELETE: Kullanıcılar sadece kendi menülerinin kategorilerini silebilir
DROP POLICY IF EXISTS "Users can delete own menu categories" ON menu_categories;
CREATE POLICY "Users can delete own menu categories" ON menu_categories
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM menus 
      WHERE menus.id = menu_categories.menu_id 
      AND menus.user_id = auth.uid()
    )
  );

-- MENU_ITEMS için sadece admin CRUD politikaları

-- 1. SELECT: Kullanıcılar sadece kendi menülerinin ürünlerini görebilir
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

-- 2. INSERT: Kullanıcılar sadece kendi menülerinin kategorilerine ürün ekleyebilir
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

-- 3. UPDATE: Kullanıcılar sadece kendi menülerinin ürünlerini güncelleyebilir
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

-- 4. DELETE: Kullanıcılar sadece kendi menülerinin ürünlerini silebilir
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
