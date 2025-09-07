-- Migration: Add RLS policies for menus table
-- Bu migration menus tablosu için RLS politikalarını ekler

-- MENUS için admin CRUD politikaları

-- 1. SELECT: Kullanıcılar sadece kendi menülerini görebilir
DROP POLICY IF EXISTS "Users can view own menus" ON menus;
CREATE POLICY "Users can view own menus" ON menus
  FOR SELECT USING (auth.uid() = user_id);

-- 2. INSERT: Kullanıcılar sadece kendi menülerini ekleyebilir
DROP POLICY IF EXISTS "Users can insert own menus" ON menus;
CREATE POLICY "Users can insert own menus" ON menus
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE: Kullanıcılar sadece kendi menülerini güncelleyebilir
DROP POLICY IF EXISTS "Users can update own menus" ON menus;
CREATE POLICY "Users can update own menus" ON menus
  FOR UPDATE USING (auth.uid() = user_id);

-- 4. DELETE: Kullanıcılar sadece kendi menülerini silebilir
DROP POLICY IF EXISTS "Users can delete own menus" ON menus;
CREATE POLICY "Users can delete own menus" ON menus
  FOR DELETE USING (auth.uid() = user_id);
