-- Migration: Enable RLS for all tables
-- Bu migration tüm tablolarda RLS'yi aktif eder

-- RLS'yi aktif et
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
