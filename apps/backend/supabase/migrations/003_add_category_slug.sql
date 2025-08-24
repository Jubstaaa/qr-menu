-- Add slug column to menu_categories
ALTER TABLE menu_categories
  ADD COLUMN IF NOT EXISTS slug TEXT;

-- Ensure unaccent extension for proper slug generation
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Create or replace a function to generate slugs
CREATE OR REPLACE FUNCTION public.slugify(input TEXT)
RETURNS TEXT AS $$
DECLARE
  s TEXT;
BEGIN
  -- Convert to ASCII-ish using unaccent, lower case, replace non-alphanumerics with '-'
  s := lower(regexp_replace(unaccent(input), '[^a-z0-9]+', '-', 'g'));
  -- Trim leading/trailing '-'
  s := regexp_replace(s, '(^-+|-+$)', '', 'g');
  RETURN s;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Backfill slug values for existing rows where slug is NULL
UPDATE menu_categories
SET slug = slugify(name)
WHERE slug IS NULL;

-- Create unique index to prevent duplicate slugs within the same menu
CREATE UNIQUE INDEX IF NOT EXISTS idx_categories_menu_id_slug
  ON menu_categories(menu_id, slug);

-- Trigger to auto-set slug on INSERT/UPDATE when name changes or slug is NULL
CREATE OR REPLACE FUNCTION public.set_menu_category_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
      NEW.slug := slugify(NEW.name);
    END IF;
  ELSIF (TG_OP = 'UPDATE') THEN
    IF (NEW.name IS DISTINCT FROM OLD.name) OR NEW.slug IS NULL OR NEW.slug = '' THEN
      NEW.slug := slugify(NEW.name);
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_menu_category_slug ON menu_categories;
CREATE TRIGGER trg_set_menu_category_slug
BEFORE INSERT OR UPDATE ON menu_categories
FOR EACH ROW
EXECUTE FUNCTION public.set_menu_category_slug(); 