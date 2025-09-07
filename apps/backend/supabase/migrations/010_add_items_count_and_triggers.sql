-- 1) Add items_count column to menu_categories
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS items_count integer NOT NULL DEFAULT 0;

-- 1b) Backfill existing categories with current item counts
UPDATE menu_categories c
SET items_count = (
  SELECT COUNT(*)
  FROM menu_items m
  WHERE m.category_id = c.id
);

-- 2) Create or replace trigger function to maintain items_count
CREATE OR REPLACE FUNCTION update_items_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE menu_categories
    SET items_count = items_count + 1
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE menu_categories
    SET items_count = items_count - 1
    WHERE id = OLD.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 3) Create triggers for inserts and deletes on menu_items
DROP TRIGGER IF EXISTS trg_menu_items_insert ON menu_items;
DROP TRIGGER IF EXISTS trg_menu_items_delete ON menu_items;

CREATE TRIGGER trg_menu_items_insert
AFTER INSERT ON menu_items
FOR EACH ROW EXECUTE FUNCTION update_items_count();

CREATE TRIGGER trg_menu_items_delete
AFTER DELETE ON menu_items
FOR EACH ROW EXECUTE FUNCTION update_items_count();


