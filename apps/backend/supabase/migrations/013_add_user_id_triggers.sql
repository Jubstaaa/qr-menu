-- Migration: Add automatic user_id and menu_id triggers
-- Bu migration menus ve menu_categories için trigger'ları ekler

-- Menus tablosu için trigger
CREATE OR REPLACE FUNCTION public.set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Menu categories için trigger
CREATE OR REPLACE FUNCTION public.set_menu_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Kullanıcının menüsünü al
  SELECT id INTO NEW.menu_id 
  FROM menus 
  WHERE user_id = auth.uid() 
  LIMIT 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Menus için trigger oluştur
DROP TRIGGER IF EXISTS set_menus_user_id ON menus;
CREATE TRIGGER set_menus_user_id
  BEFORE INSERT ON menus
  FOR EACH ROW
  EXECUTE FUNCTION public.set_user_id();

-- Menu categories için trigger oluştur
DROP TRIGGER IF EXISTS set_categories_menu_id ON menu_categories;
CREATE TRIGGER set_categories_menu_id
  BEFORE INSERT ON menu_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_menu_id();
